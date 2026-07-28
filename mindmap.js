const {
  ItemView,
  MarkdownRenderChild,
  MarkdownView,
  Notice,
  setIcon
} = require('obsidian');

const MINDMAP_VIEW_TYPE = 'open-obsidian-markdown-mindmap';
const SVG_NS = 'http://www.w3.org/2000/svg';
const MIN_SCALE = 0.18;
const MAX_SCALE = 4;

function translate(plugin, text, english) {
  const translated = plugin.t?.(text) || text;
  if (plugin.settings?.language === 'en' && translated === text && english) return english;
  return translated;
}

function createElement(parent, tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  parent.appendChild(element);
  return element;
}

function createSvg(parent, tag, className) {
  const element = document.createElementNS(SVG_NS, tag);
  if (className) element.setAttribute('class', className);
  parent.appendChild(element);
  return element;
}

function isMarkdownFile(file) {
  return Boolean(file && file.extension === 'md' && typeof file.path === 'string');
}

function cleanLabel(value) {
  return String(value || '')
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '$2')
    .replace(/\[\[([^\]]+)\]\]/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/[`*_~]/g, '')
    .replace(/\s+\^[\w-]+\s*$/, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 280);
}

function parseMarkdown(markdown, title) {
  let sequence = 0;
  const makeNode = (text, kind, line) => ({
    id: `${kind}:${line}:${sequence += 1}:${text}`,
    text,
    kind,
    children: []
  });
  const root = {
    id: 'virtual-root',
    text: title || '',
    kind: title ? 'title' : 'virtual',
    virtual: !title,
    children: []
  };
  const lines = String(markdown || '').replace(/\r\n?/g, '\n').split('\n');
  const headingStack = [];
  let listStack = [];
  let inFence = false;
  let fenceMarker = '';
  let inFrontmatter = lines[0]?.trim() === '---';

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const trimmed = line.trim();

    if (inFrontmatter) {
      if (index > 0 && (trimmed === '---' || trimmed === '...')) inFrontmatter = false;
      continue;
    }

    const fence = trimmed.match(/^(`{3,}|~{3,})/);
    if (fence) {
      if (!inFence) {
        inFence = true;
        fenceMarker = fence[1][0];
      } else if (fence[1][0] === fenceMarker) {
        inFence = false;
      }
      continue;
    }
    if (inFence) continue;

    const headingMatch = line.match(/^\s{0,3}(#{1,6})[ \t]+(.+?)\s*#*\s*$/);
    if (headingMatch) {
      const text = cleanLabel(headingMatch[2]);
      if (!text) continue;
      const level = headingMatch[1].length;
      while (headingStack.length && headingStack[headingStack.length - 1].level >= level) {
        headingStack.pop();
      }
      const parent = headingStack.length ? headingStack[headingStack.length - 1].node : root;
      const node = makeNode(text, 'heading', index);
      parent.children.push(node);
      headingStack.push({ level, node });
      listStack = [];
      continue;
    }

    const listMatch = line.match(/^([ \t]*)(?:[-+*]|\d{1,9}[.)])[ \t]+(.+?)\s*$/);
    if (listMatch) {
      const text = cleanLabel(listMatch[2].replace(/^\[[ xX-]\]\s*/, ''));
      if (!text) continue;
      const indent = listMatch[1].replace(/\t/g, '    ').length;
      const headingParent = headingStack.length ? headingStack[headingStack.length - 1].node : root;
      while (listStack.length && listStack[listStack.length - 1].indent >= indent) listStack.pop();
      let parent = headingParent;
      if (listStack.length && listStack[listStack.length - 1].headingParent === headingParent) {
        parent = listStack[listStack.length - 1].node;
      }
      const node = makeNode(text, 'list', index);
      parent.children.push(node);
      listStack.push({ indent, node, headingParent });
      continue;
    }

    if (trimmed) listStack = [];
  }

  if (!root.children.length) return null;
  return root;
}

function textUnits(text) {
  let total = 0;
  for (const character of Array.from(text)) total += character.charCodeAt(0) > 255 ? 1 : 0.56;
  return total;
}

function wrapLabel(text, maxUnits) {
  const lines = [];
  let current = '';
  let units = 0;
  for (const character of Array.from(text)) {
    const width = character.charCodeAt(0) > 255 ? 1 : 0.56;
    if (current && units + width > maxUnits) {
      lines.push(current);
      current = character;
      units = width;
    } else {
      current += character;
      units += width;
    }
  }
  if (current) lines.push(current);
  if (lines.length <= 6) return lines;
  const visible = lines.slice(0, 6);
  visible[5] = `${visible[5].slice(0, Math.max(1, visible[5].length - 1))}…`;
  return visible;
}

function measureNode(node, mobile) {
  const fontSize = mobile ? 13 : 14;
  const lineHeight = mobile ? 19 : 20;
  const horizontalPadding = mobile ? 28 : 32;
  const lines = wrapLabel(node.text, mobile ? 15 : 20);
  const widest = Math.max(6, ...lines.map(textUnits));
  return {
    width: Math.max(100, Math.min(mobile ? 260 : 320, widest * fontSize + horizontalPadding)),
    height: Math.max(46, lines.length * lineHeight + 24),
    lines,
    fontSize,
    lineHeight,
    horizontalPadding
  };
}

function prepareVisibleTree(root, collapsed, mobile) {
  const nodes = [];
  const edges = [];
  const roots = root.virtual ? root.children : [root];
  const visit = (node, depth, branch, parent) => {
    const measured = measureNode(node, mobile);
    node.layout = {
      depth,
      branch,
      width: measured.width,
      height: measured.height,
      lines: measured.lines,
      fontSize: measured.fontSize,
      lineHeight: measured.lineHeight,
      horizontalPadding: measured.horizontalPadding,
      x: 0,
      y: 0
    };
    nodes.push(node);
    if (parent) edges.push([parent, node]);
    const visibleChildren = collapsed.has(node.id) ? [] : node.children;
    node.visibleChildren = visibleChildren;
    for (const child of visibleChildren) visit(child, depth + 1, branch, node);
  };
  roots.forEach((node, branch) => visit(node, 0, branch, null));
  return { nodes, edges, roots };
}

function layoutTree(root, collapsed, settings, mobile) {
  const prepared = prepareVisibleTree(root, collapsed, mobile);
  const { nodes, edges, roots } = prepared;
  const direction = settings.direction === 'vertical' ? 'vertical' : 'horizontal';
  const horizontalGap = Math.max(28, Number(settings.spacingHorizontal) || 150);
  const verticalGap = Math.max(14, Number(settings.spacingVertical) || 28);
  const maxWidth = [];
  const maxHeight = [];
  for (const node of nodes) {
    const { depth, width, height } = node.layout;
    maxWidth[depth] = Math.max(maxWidth[depth] || 0, width);
    maxHeight[depth] = Math.max(maxHeight[depth] || 0, height);
  }

  if (direction === 'horizontal') {
    const columns = [0];
    for (let depth = 1; depth < maxWidth.length; depth += 1) {
      columns[depth] = columns[depth - 1] + maxWidth[depth - 1] + horizontalGap;
    }
    let cursor = 0;
    const place = node => {
      const children = node.visibleChildren;
      for (const child of children) place(child);
      node.layout.x = columns[node.layout.depth];
      if (!children.length) {
        node.layout.y = cursor;
        cursor += node.layout.height + verticalGap;
      } else {
        const first = children[0].layout;
        const last = children[children.length - 1].layout;
        const center = (first.y + first.height / 2 + last.y + last.height / 2) / 2;
        node.layout.y = center - node.layout.height / 2;
      }
    };
    for (const rootNode of roots) {
      place(rootNode);
      cursor += verticalGap;
    }
  } else {
    const rows = [0];
    for (let depth = 1; depth < maxHeight.length; depth += 1) {
      rows[depth] = rows[depth - 1] + maxHeight[depth - 1] + verticalGap;
    }
    let cursor = 0;
    const place = node => {
      const children = node.visibleChildren;
      for (const child of children) place(child);
      node.layout.y = rows[node.layout.depth];
      if (!children.length) {
        node.layout.x = cursor;
        cursor += node.layout.width + horizontalGap;
      } else {
        const first = children[0].layout;
        const last = children[children.length - 1].layout;
        const center = (first.x + first.width / 2 + last.x + last.width / 2) / 2;
        node.layout.x = center - node.layout.width / 2;
      }
    };
    for (const rootNode of roots) {
      place(rootNode);
      cursor += horizontalGap;
    }
  }

  const minX = Math.min(...nodes.map(node => node.layout.x));
  const minY = Math.min(...nodes.map(node => node.layout.y));
  const maxX = Math.max(...nodes.map(node => node.layout.x + node.layout.width));
  const maxY = Math.max(...nodes.map(node => node.layout.y + node.layout.height));
  return {
    ...prepared,
    direction,
    bounds: { minX, minY, maxX, maxY }
  };
}

function nodeColor(node, settings) {
  const colors = [
    settings.depth1Color || '#9167f2',
    settings.depth2Color || '#5b8def',
    settings.depth3Color || '#42d38b',
    settings.defaultColor || '#f2b84b'
  ];
  if (settings.coloring === 'single') return colors[3];
  if (settings.coloring === 'branch') return colors[node.layout.depth ? node.layout.branch % colors.length : 0];
  return colors[Math.min(node.layout.depth, colors.length - 1)];
}

function contrastColor(hex) {
  const match = /^#([0-9a-f]{6})$/i.exec(hex || '');
  if (!match) return '#ffffff';
  const value = Number.parseInt(match[1], 16);
  const red = (value >> 16) & 255;
  const green = (value >> 8) & 255;
  const blue = value & 255;
  return red * 0.299 + green * 0.587 + blue * 0.114 > 168 ? '#172033' : '#ffffff';
}

class MindmapSurface {
  constructor(viewport, settings, onToggle, mobile) {
    this.viewport = viewport;
    this.settings = settings;
    this.onToggle = onToggle;
    this.mobile = mobile;
    this.scale = 1;
    this.panX = 0;
    this.panY = 0;
    this.drag = null;
    this.wasDragged = false;
    this.layout = null;
    this.resizeObserver = null;

    this.svg = createSvg(viewport, 'svg', 'oom-mindmap-svg');
    this.svg.setAttribute('width', '100%');
    this.svg.setAttribute('height', '100%');
    this.svg.setAttribute('role', 'img');
    this.svg.setAttribute('aria-label', 'Markdown mind map');
    this.stage = createSvg(this.svg, 'g', 'oom-mindmap-stage');
    this.connectors = createSvg(this.stage, 'g', 'oom-mindmap-connectors');
    this.nodes = createSvg(this.stage, 'g', 'oom-mindmap-nodes');

    this.onWheel = event => {
      event.preventDefault();
      const rect = this.svg.getBoundingClientRect();
      const factor = Math.exp(-event.deltaY * 0.0015);
      this.zoomAt(factor, event.clientX - rect.left, event.clientY - rect.top);
    };
    this.onPointerDown = event => {
      if (event.button !== 0) return;
      if (event.target.closest?.('.oom-mindmap-node')) {
        this.wasDragged = false;
        return;
      }
      this.drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
      this.wasDragged = false;
      this.svg.setPointerCapture?.(event.pointerId);
      this.viewport.classList.add('oom-mindmap-is-panning');
    };
    this.onPointerMove = event => {
      if (!this.drag || this.drag.id !== event.pointerId) return;
      const dx = event.clientX - this.drag.x;
      const dy = event.clientY - this.drag.y;
      if (Math.abs(dx) + Math.abs(dy) > 2) this.wasDragged = true;
      this.drag.x = event.clientX;
      this.drag.y = event.clientY;
      this.panX += dx;
      this.panY += dy;
      this.applyTransform();
    };
    this.onPointerUp = event => {
      if (!this.drag || this.drag.id !== event.pointerId) return;
      this.svg.releasePointerCapture?.(event.pointerId);
      this.drag = null;
      this.viewport.classList.remove('oom-mindmap-is-panning');
      setTimeout(() => {
        this.wasDragged = false;
      }, 0);
    };
    this.svg.addEventListener('wheel', this.onWheel, { passive: false });
    this.svg.addEventListener('pointerdown', this.onPointerDown);
    this.svg.addEventListener('pointermove', this.onPointerMove);
    this.svg.addEventListener('pointerup', this.onPointerUp);
    this.svg.addEventListener('pointercancel', this.onPointerUp);
    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        if (!this.layout) return;
        requestAnimationFrame(() => this.fit());
      });
      this.resizeObserver.observe(this.viewport);
    }
  }

  render(root, collapsed, options = {}) {
    this.layout = layoutTree(root, collapsed, this.settings, this.mobile);
    this.connectors.replaceChildren();
    this.nodes.replaceChildren();

    for (const [parent, child] of this.layout.edges) {
      const from = parent.layout;
      const to = child.layout;
      const path = createSvg(this.connectors, 'path', 'oom-mindmap-connector');
      let data;
      if (this.layout.direction === 'horizontal') {
        const x1 = from.x + from.width;
        const y1 = from.y + from.height / 2;
        const x2 = to.x;
        const y2 = to.y + to.height / 2;
        const bend = (x1 + x2) / 2;
        data = `M ${x1} ${y1} C ${bend} ${y1}, ${bend} ${y2}, ${x2} ${y2}`;
      } else {
        const x1 = from.x + from.width / 2;
        const y1 = from.y + from.height;
        const x2 = to.x + to.width / 2;
        const y2 = to.y;
        const bend = (y1 + y2) / 2;
        data = `M ${x1} ${y1} C ${x1} ${bend}, ${x2} ${bend}, ${x2} ${y2}`;
      }
      path.setAttribute('d', data);
      path.setAttribute('fill', 'none');
      path.setAttribute('stroke', nodeColor(child, this.settings));
      path.setAttribute('stroke-width', '2');
      path.setAttribute('stroke-opacity', '0.62');
    }

    for (const node of this.layout.nodes) this.drawNode(node, collapsed);
    this.applyTransform();
    if (options.fit) requestAnimationFrame(() => this.fit());
  }

  drawNode(node, collapsed) {
    const layout = node.layout;
    const group = createSvg(this.nodes, 'g', 'oom-mindmap-node');
    group.setAttribute('transform', `translate(${layout.x} ${layout.y})`);
    group.setAttribute('role', 'button');
    group.setAttribute('tabindex', '0');
    group.setAttribute('pointer-events', 'all');
    group.setAttribute('aria-label', node.children.length
      ? `${node.text}，${collapsed.has(node.id) ? '展开' : '折叠'}`
      : node.text);
    group.style.cursor = node.children.length ? 'pointer' : 'default';

    const color = nodeColor(node, this.settings);
    const rect = createSvg(group, 'rect', 'oom-mindmap-node-rect');
    rect.setAttribute('width', String(layout.width));
    rect.setAttribute('height', String(layout.height));
    rect.setAttribute('rx', '11');
    rect.setAttribute('fill', color);
    rect.setAttribute('pointer-events', 'all');

    const title = createSvg(group, 'title');
    title.textContent = node.text;

    const label = createSvg(group, 'text', 'oom-mindmap-node-label');
    label.setAttribute('data-no-i18n', '');
    const textX = layout.horizontalPadding / 2;
    const textY = layout.height / 2 - ((layout.lines.length - 1) * layout.lineHeight) / 2 + layout.fontSize * 0.36;
    label.setAttribute('x', String(textX));
    label.setAttribute('y', String(textY));
    label.setAttribute('fill', contrastColor(color));
    label.setAttribute('font-size', String(layout.fontSize));
    label.setAttribute('font-family', 'var(--font-interface, sans-serif)');
    layout.lines.forEach((line, index) => {
      const span = createSvg(label, 'tspan', 'oom-mindmap-node-label-line');
      span.setAttribute('x', String(textX));
      if (index) span.setAttribute('dy', String(layout.lineHeight));
      span.textContent = line;
    });

    if (node.children.length) {
      const toggle = createSvg(group, 'g', 'oom-mindmap-node-toggle');
      const cx = this.layout.direction === 'horizontal' ? layout.width : layout.width / 2;
      const cy = this.layout.direction === 'horizontal' ? layout.height / 2 : layout.height;
      const circle = createSvg(toggle, 'circle', 'oom-mindmap-node-toggle-circle');
      circle.setAttribute('cx', String(cx));
      circle.setAttribute('cy', String(cy));
      circle.setAttribute('r', '8');
      circle.setAttribute('fill', 'var(--background-primary, #ffffff)');
      circle.setAttribute('stroke', color);
      circle.setAttribute('stroke-width', '2');
      const horizontal = createSvg(toggle, 'path', 'oom-mindmap-node-toggle-mark');
      horizontal.setAttribute('d', `M ${cx - 4} ${cy} L ${cx + 4} ${cy}`);
      horizontal.setAttribute('stroke', color);
      horizontal.setAttribute('stroke-width', '1.8');
      if (collapsed.has(node.id)) {
        const vertical = createSvg(toggle, 'path', 'oom-mindmap-node-toggle-mark');
        vertical.setAttribute('d', `M ${cx} ${cy - 4} L ${cx} ${cy + 4}`);
        vertical.setAttribute('stroke', color);
        vertical.setAttribute('stroke-width', '1.8');
      }
    }

    const toggleNode = event => {
      if (!node.children.length) return;
      event.preventDefault();
      event.stopPropagation();
      this.onToggle(node);
    };
    group.addEventListener('click', toggleNode);
    group.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleNode(event);
      }
    });
  }

  applyTransform() {
    this.stage.setAttribute('transform', `translate(${this.panX} ${this.panY}) scale(${this.scale})`);
  }

  fit() {
    if (!this.layout || !this.viewport.isConnected) return;
    const width = this.viewport.clientWidth;
    const height = this.viewport.clientHeight;
    if (width < 20 || height < 20) return;
    const bounds = this.layout.bounds;
    const contentWidth = Math.max(1, bounds.maxX - bounds.minX);
    const contentHeight = Math.max(1, bounds.maxY - bounds.minY);
    const padding = this.mobile ? 22 : 48;
    this.scale = Math.max(MIN_SCALE, Math.min(1.35, (width - padding * 2) / contentWidth, (height - padding * 2) / contentHeight));
    this.panX = (width - contentWidth * this.scale) / 2 - bounds.minX * this.scale;
    this.panY = (height - contentHeight * this.scale) / 2 - bounds.minY * this.scale;
    this.applyTransform();
  }

  zoomAt(factor, x, y) {
    const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, this.scale * factor));
    const localX = (x - this.panX) / this.scale;
    const localY = (y - this.panY) / this.scale;
    this.panX = x - localX * next;
    this.panY = y - localY * next;
    this.scale = next;
    this.applyTransform();
  }

  zoomBy(factor) {
    this.zoomAt(factor, this.viewport.clientWidth / 2, this.viewport.clientHeight / 2);
  }

  destroy() {
    this.svg.removeEventListener('wheel', this.onWheel);
    this.svg.removeEventListener('pointerdown', this.onPointerDown);
    this.svg.removeEventListener('pointermove', this.onPointerMove);
    this.svg.removeEventListener('pointerup', this.onPointerUp);
    this.svg.removeEventListener('pointercancel', this.onPointerUp);
    this.resizeObserver?.disconnect();
  }
}

function applyInitialCollapse(root, collapsed, level) {
  collapsed.clear();
  if (level < 0) return;
  const roots = root.virtual ? root.children : [root];
  const visit = (node, depth) => {
    if (node.children.length && depth >= level) collapsed.add(node.id);
    for (const child of node.children) visit(child, depth + 1);
  };
  roots.forEach(node => visit(node, 0));
}

function addToolbarButton(parent, icon, label, callback) {
  const button = createElement(parent, 'button', 'oom-mindmap-toolbar-button');
  button.type = 'button';
  button.setAttribute('aria-label', label);
  button.setAttribute('title', label);
  setIcon(button, icon);
  button.addEventListener('click', callback);
  return button;
}

class MindmapView extends ItemView {
  constructor(leaf, controller) {
    super(leaf);
    this.controller = controller;
    this.plugin = controller.plugin;
    this.pinned = false;
    this.filePath = '';
    this.currentFilePath = '';
    this.collapsed = new Set();
    this.collapseKey = '';
    this.renderToken = 0;
    this.surface = null;
    this.tree = null;
  }

  getViewType() {
    return MINDMAP_VIEW_TYPE;
  }

  getDisplayText() {
    if (this.pinned && this.filePath) {
      const file = this.app.vault.getAbstractFileByPath(this.filePath);
      return `${translate(this.plugin, '思维导图', 'Mind map')} · ${file?.basename || this.filePath.split('/').pop()?.replace(/\.md$/i, '')}`;
    }
    return `${translate(this.plugin, '思维导图', 'Mind map')} · ${translate(this.plugin, '跟随当前文件', 'Follow current file')}`;
  }

  getIcon() {
    return 'git-fork';
  }

  getState() {
    return { pinned: this.pinned, filePath: this.pinned ? this.filePath : '' };
  }

  async setState(state) {
    this.pinned = Boolean(state?.pinned);
    this.filePath = this.pinned && typeof state?.filePath === 'string' ? state.filePath : '';
    this.leaf.updateHeader?.();
    if (this.surface) await this.refresh({ forceFit: true });
  }

  async onOpen() {
    this.controller.attachView(this);
    this.buildShell();
    await this.refresh({ forceFit: true });
  }

  async onClose() {
    this.renderToken += 1;
    this.surface?.destroy();
    this.controller.detachView(this);
  }

  buildShell() {
    this.surface?.destroy();
    this.contentEl.replaceChildren();
    this.contentEl.classList.add('oom-mindmap-view');
    this.contentEl.classList.toggle('oom-mindmap-mobile', Boolean(this.app.isMobile));
    this.contentEl.style.padding = '0';
    this.contentEl.style.overflow = 'hidden';

    this.shell = createElement(this.contentEl, 'div', 'oom-mindmap-shell');
    this.shell.style.height = '100%';
    this.shell.style.minHeight = '240px';
    this.shell.style.display = 'flex';
    this.shell.style.flexDirection = 'column';

    this.header = createElement(this.shell, 'div', 'oom-mindmap-header');
    this.header.style.display = 'flex';
    this.header.style.alignItems = 'center';
    this.header.style.gap = '8px';
    this.header.style.padding = this.app.isMobile ? '8px' : '10px 12px';
    this.titleEl = createElement(
      this.header,
      'div',
      'oom-mindmap-title',
      translate(this.plugin, '思维导图', 'Mind map')
    );
    this.titleEl.style.fontWeight = '600';
    this.titleEl.style.minWidth = '0';
    this.titleEl.style.overflow = 'hidden';
    this.titleEl.style.textOverflow = 'ellipsis';
    this.titleEl.style.whiteSpace = 'nowrap';
    this.titleEl.setAttribute('data-no-i18n', '');
    this.modeEl = createElement(this.header, 'span', 'oom-mindmap-mode');
    this.modeEl.style.opacity = '0.65';
    this.modeEl.style.fontSize = '12px';

    this.toolbar = createElement(this.header, 'div', 'oom-mindmap-toolbar');
    this.toolbar.style.marginInlineStart = 'auto';
    this.toolbar.style.display = this.plugin.settings.mindmap.showToolbar ? 'flex' : 'none';
    this.toolbar.style.gap = '4px';
    this.toolbar.style.flex = '0 0 auto';
    this.toolbar.style.overflowX = 'auto';
    addToolbarButton(this.toolbar, 'scan', translate(this.plugin, '适配视图', 'Fit view'), () => this.surface?.fit());
    addToolbarButton(this.toolbar, 'zoom-in', translate(this.plugin, '放大', 'Zoom in'), () => this.surface?.zoomBy(1.2));
    addToolbarButton(this.toolbar, 'zoom-out', translate(this.plugin, '缩小', 'Zoom out'), () => this.surface?.zoomBy(1 / 1.2));
    addToolbarButton(this.toolbar, 'chevrons-down-up', translate(this.plugin, '展开全部', 'Expand all'), () => this.expandAll());
    addToolbarButton(this.toolbar, 'chevrons-up-down', translate(this.plugin, '折叠全部', 'Collapse all'), () => this.collapseAll());

    this.viewport = createElement(this.shell, 'div', 'oom-mindmap-viewport');
    this.viewport.style.position = 'relative';
    this.viewport.style.flex = '1 1 auto';
    this.viewport.style.minHeight = '0';
    this.viewport.style.overflow = 'hidden';
    this.viewport.style.touchAction = 'none';
    this.viewport.style.background = 'var(--background-primary)';
    this.emptyEl = createElement(this.viewport, 'div', 'oom-mindmap-empty');
    this.emptyEl.style.position = 'absolute';
    this.emptyEl.style.inset = '0';
    this.emptyEl.style.display = 'none';
    this.emptyEl.style.placeItems = 'center';
    this.emptyEl.style.padding = '24px';
    this.emptyEl.style.textAlign = 'center';
    this.emptyEl.style.color = 'var(--text-muted)';
    this.surface = new MindmapSurface(
      this.viewport,
      this.plugin.settings.mindmap,
      node => this.toggleNode(node),
      Boolean(this.app.isMobile)
    );
    this.plugin.localizeElement?.(this.contentEl);
  }

  async applySettings() {
    this.buildShell();
    await this.refresh({ forceFit: true });
  }

  resolveFile() {
    if (this.pinned) {
      const file = this.filePath ? this.app.vault.getAbstractFileByPath(this.filePath) : null;
      return isMarkdownFile(file) ? file : null;
    }
    return this.controller.getFollowFile();
  }

  async refresh(options = {}) {
    const token = ++this.renderToken;
    const file = this.resolveFile();
    this.modeEl.textContent = this.pinned
      ? translate(this.plugin, '固定', 'Pinned')
      : translate(this.plugin, '跟随', 'Following');
    this.contentEl.classList.toggle('oom-mindmap-pinned', this.pinned);
    this.contentEl.classList.toggle('oom-mindmap-following', !this.pinned);
    if (!file) {
      this.showEmpty(this.pinned
        ? translate(this.plugin, '固定的 Markdown 文件不存在或已被移除', 'The pinned Markdown file no longer exists')
        : translate(this.plugin, '请先打开一个 Markdown 文件', 'Open a Markdown file first'));
      return;
    }

    this.currentFilePath = file.path;
    if (this.pinned) this.filePath = file.path;
    this.titleEl.textContent = file.basename;
    this.leaf.updateHeader?.();
    let markdown;
    try {
      markdown = await this.controller.readMarkdown(file);
    } catch (error) {
      if (token === this.renderToken) {
        this.showEmpty(`${translate(this.plugin, '无法读取', 'Unable to read')} ${file.basename}`);
      }
      console.error('[Open Obsidian Manage] Failed to read mind map source', error);
      return;
    }
    if (token !== this.renderToken) return;

    const title = this.plugin.settings.mindmap.titleAsRootNode ? file.basename : '';
    const tree = parseMarkdown(markdown, title);
    if (!tree) {
      this.showEmpty(translate(
        this.plugin,
        '此笔记中还没有 ATX 标题或 Markdown 列表',
        'This note has no ATX headings or Markdown lists yet'
      ));
      return;
    }
    this.tree = tree;
    const initialLevel = Number(this.plugin.settings.mindmap.initialExpandLevel);
    const key = `${file.path}|${title}|${Number.isFinite(initialLevel) ? initialLevel : -1}`;
    if (this.collapseKey !== key) {
      this.collapseKey = key;
      applyInitialCollapse(tree, this.collapsed, Number.isFinite(initialLevel) ? initialLevel : -1);
    } else {
      const validIds = new Set();
      const collect = node => {
        validIds.add(node.id);
        node.children.forEach(collect);
      };
      if (tree.virtual) tree.children.forEach(collect);
      else collect(tree);
      for (const id of this.collapsed) if (!validIds.has(id)) this.collapsed.delete(id);
    }
    this.emptyEl.style.display = 'none';
    this.surface.svg.style.display = 'block';
    this.surface.render(tree, this.collapsed, { fit: Boolean(options.forceFit) });
    this.plugin.localizeElement?.(this.contentEl);
  }

  showEmpty(message) {
    this.tree = null;
    this.emptyEl.textContent = message;
    this.emptyEl.style.display = 'grid';
    this.surface.svg.style.display = 'none';
    this.plugin.localizeElement?.(this.contentEl);
  }

  toggleNode(node) {
    if (this.collapsed.has(node.id)) this.collapsed.delete(node.id);
    else this.collapsed.add(node.id);
    this.surface.render(this.tree, this.collapsed);
  }

  expandAll() {
    if (!this.tree) return;
    this.collapsed.clear();
    this.surface.render(this.tree, this.collapsed);
  }

  collapseAll() {
    if (!this.tree) return;
    this.collapsed.clear();
    const visit = node => {
      if (node.children.length) this.collapsed.add(node.id);
      node.children.forEach(visit);
    };
    if (this.tree.virtual) this.tree.children.forEach(visit);
    else visit(this.tree);
    this.surface.render(this.tree, this.collapsed);
  }

  handleRename(file, oldPath) {
    if (this.pinned && this.filePath === oldPath) {
      this.filePath = file.path;
      this.collapseKey = '';
      this.leaf.updateHeader?.();
    }
  }
}

class EmbeddedMindmap extends MarkdownRenderChild {
  constructor(container, source, plugin, mobile) {
    super(container);
    this.container = container;
    this.source = source;
    this.plugin = plugin;
    this.settings = plugin.settings.mindmap;
    this.mobile = mobile;
    this.collapsed = new Set();
    this.surface = null;
  }

  onload() {
    this.container.classList.add('oom-mindmap-embed');
    this.container.style.height = this.mobile ? '320px' : '420px';
    this.container.style.minHeight = '240px';
    this.container.style.position = 'relative';
    this.container.style.overflow = 'hidden';
    const tree = parseMarkdown(this.source, '');
    if (!tree) {
      const empty = createElement(
        this.container,
        'div',
        'oom-mindmap-empty',
        translate(this.plugin, '此 markmap 代码块中没有标题或列表', 'This markmap block has no headings or lists')
      );
      empty.style.padding = '24px';
      empty.style.textAlign = 'center';
      this.plugin.localizeElement?.(this.container);
      return;
    }
    applyInitialCollapse(tree, this.collapsed, Number(this.settings.initialExpandLevel));
    this.surface = new MindmapSurface(this.container, this.settings, node => {
      if (this.collapsed.has(node.id)) this.collapsed.delete(node.id);
      else this.collapsed.add(node.id);
      this.surface.render(tree, this.collapsed);
    }, this.mobile);
    this.surface.render(tree, this.collapsed, { fit: true });
    this.plugin.localizeElement?.(this.container);
  }

  onunload() {
    this.surface?.destroy();
  }
}

class MindmapController {
  constructor(plugin) {
    this.plugin = plugin;
    this.app = plugin.app;
    this.views = new Set();
    this.eventRefs = [];
    this.refreshTimer = null;
    this.lastMarkdownPath = '';
    this.started = false;
  }

  async start() {
    if (this.started) return;
    this.started = true;
    this.rememberMarkdown(this.app.workspace.getActiveFile());
    this.plugin.registerView(MINDMAP_VIEW_TYPE, leaf => new MindmapView(leaf, this));
    this.plugin.addCommand({
      id: 'open-mindmap-follow-current-markdown',
      name: `${this.plugin.t('打开思维导图')}：${this.plugin.t('跟随当前文件')}`,
      hotkeys: [{ modifiers: ['Mod', 'Shift'], key: 'm' }],
      callback: () => this.open(false)
    });
    this.plugin.addCommand({
      id: 'open-mindmap-pin-current-markdown',
      name: `${this.plugin.t('打开思维导图')}：${this.plugin.t('固定当前文件')}`,
      callback: () => this.open(true)
    });
    this.plugin.registerMarkdownCodeBlockProcessor('markmap', (source, element, context) => {
      if (!this.plugin.settings.mindmap.enabled) {
        const pre = element.createEl('pre');
        pre.createEl('code', { text: source });
        return;
      }
      const child = new EmbeddedMindmap(element, source, this.plugin, Boolean(this.app.isMobile));
      context.addChild(child);
    });

    this.listen(this.app.workspace, 'file-open', file => {
      this.rememberMarkdown(file);
      this.scheduleRefresh();
    });
    this.listen(this.app.workspace, 'active-leaf-change', leaf => {
      this.rememberMarkdown(leaf?.view?.file);
      this.scheduleRefresh();
    });
    this.listen(this.app.workspace, 'editor-change', (_editor, view) => {
      this.rememberMarkdown(view?.file);
      this.scheduleRefresh();
    });
    this.listen(this.app.vault, 'rename', (file, oldPath) => {
      if (this.lastMarkdownPath === oldPath) this.lastMarkdownPath = file.path;
      for (const view of this.views) view.handleRename(file, oldPath);
      this.app.workspace.requestSaveLayout?.();
      this.scheduleRefresh();
    });
    this.listen(this.app.vault, 'modify', file => {
      if (isMarkdownFile(file)) this.scheduleRefresh();
    });
  }

  listen(emitter, eventName, callback) {
    const reference = emitter.on(eventName, callback);
    this.eventRefs.push([emitter, reference]);
    this.plugin.registerEvent(reference);
  }

  stop() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = null;
    }
    for (const [emitter, reference] of this.eventRefs.splice(0)) emitter.offref?.(reference);
    this.app.workspace.detachLeavesOfType(MINDMAP_VIEW_TYPE);
    this.views.clear();
    this.started = false;
  }

  async applySettings() {
    if (!this.plugin.settings.mindmap.enabled) {
      this.app.workspace.detachLeavesOfType(MINDMAP_VIEW_TYPE);
      return;
    }
    await Promise.all(Array.from(this.views, view => view.applySettings()));
  }

  async open(pinned = false) {
    if (!this.plugin.settings.mindmap.enabled) {
      const source = '请先在 Open Obsidian Manage 设置中启用思维导图';
      const message = this.plugin.t(source);
      new Notice(this.plugin.settings.language === 'en' && message === source
        ? 'Enable mind maps in Open Obsidian Manage settings first'
        : message);
      return;
    }
    const file = this.getFollowFile();
    if (!file) {
      const source = '请先打开一个 Markdown 文件';
      const message = this.plugin.t(source);
      new Notice(this.plugin.settings.language === 'en' && message === source
        ? 'Open a Markdown file first'
        : message);
      return;
    }
    this.rememberMarkdown(file);
    const leaves = this.app.workspace.getLeavesOfType(MINDMAP_VIEW_TYPE);
    let leaf = leaves.find(candidate => {
      const view = candidate.view;
      return view instanceof MindmapView
        && view.pinned === Boolean(pinned)
        && (!pinned || view.filePath === file.path);
    });
    if (!leaf) {
      leaf = this.app.workspace.getLeaf('tab');
      await leaf.setViewState({
        type: MINDMAP_VIEW_TYPE,
        active: true,
        state: { pinned: Boolean(pinned), filePath: pinned ? file.path : '' }
      });
    } else {
      await leaf.view.refresh({ forceFit: false });
    }
    this.app.workspace.revealLeaf(leaf);
  }

  attachView(view) {
    this.views.add(view);
  }

  detachView(view) {
    this.views.delete(view);
  }

  rememberMarkdown(file) {
    if (isMarkdownFile(file)) this.lastMarkdownPath = file.path;
  }

  getFollowFile() {
    const active = this.app.workspace.getActiveFile();
    if (isMarkdownFile(active)) {
      this.rememberMarkdown(active);
      return active;
    }
    const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
    if (isMarkdownFile(activeView?.file)) {
      this.rememberMarkdown(activeView.file);
      return activeView.file;
    }
    const remembered = this.lastMarkdownPath
      ? this.app.vault.getAbstractFileByPath(this.lastMarkdownPath)
      : null;
    return isMarkdownFile(remembered) ? remembered : null;
  }

  async readMarkdown(file) {
    const leaves = this.app.workspace.getLeavesOfType('markdown');
    const openView = leaves
      .map(leaf => leaf.view)
      .find(view => view instanceof MarkdownView && view.file?.path === file.path && view.editor);
    if (openView) return openView.editor.getValue();
    return this.app.vault.cachedRead(file);
  }

  scheduleRefresh() {
    if (this.refreshTimer) clearTimeout(this.refreshTimer);
    this.refreshTimer = setTimeout(() => {
      this.refreshTimer = null;
      this.refreshViews();
    }, 300);
  }

  async refreshViews() {
    await Promise.all(Array.from(this.views, view => view.refresh()));
  }
}

module.exports = {
  MindmapController,
  MINDMAP_VIEW_TYPE
};
