/*
 * Image-renaming workflow adapted from Open-Obsidian-ImgRename / Rename Img
 * by MiLin (version 1.1.3).
 * Copyright (c) 2026 Contributors
 *
 * MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

const {
  Notice,
  TFile,
  TFolder,
  normalizePath
} = require('obsidian');

const IMAGE_EXTENSIONS = new Set(['png', 'jpg', 'jpeg']);
const PROCESSED_NAME_PATTERN = /^.+_\d{6}$/;
const DEFAULT_BASE_FILE_NAME = 'Files.base';
const DEFAULT_BASE_CONTENT = `filters:
  and:
    - 'file.ext != "png"'
    - 'file.ext != "base"'
properties:
  file.name:
    displayName: "名称"
  file.ext:
    displayName: "扩展名"
  file.tags:
    displayName: "tags"
  note.aliases:
    displayName: "aliases"
  file.backlinks:
    displayName: "文件反向链接"
  file.mtime:
    displayName: "修改时间"
views:
  - type: table
    name: "Files"
    order:
      - file.name
      - file.ext
      - file.tags
      - note.aliases
      - file.backlinks
      - file.mtime
`;

const BODY_FILENAME_CLASSES = [
  'oom-image-filename-hide',
  'oom-image-filename-hover'
];

class ImageRenameController {
  constructor(plugin) {
    this.plugin = plugin;
    this.app = plugin.app;
    this.settings = this.readSettings();
    this.started = false;
    this.lifecycle = 0;
    this.renameQueue = Promise.resolve();
    this.processingPaths = new Set();
    this.eventRefs = [];
    this.createEventRef = null;
    this.fileListObserver = null;
    this.fileListDocument = null;
    this.hiddenFileListElements = new Set();
    this.baseStyleObserver = null;
    this.baseStyleDocument = null;
    this.baseStyleTimer = null;
    this.baseStyleRetryTimers = [];
    this.baseStyledElements = new Set();
    this.filenameDocuments = new Set();
  }

  async start() {
    if (this.started) {
      await this.applySettings();
      return;
    }

    this.started = true;
    const lifecycle = ++this.lifecycle;
    this.registerWorkspaceEvents();
    this.startBaseStyleObserver();
    await this.applySettings();

    const registerCreateEvent = () => {
      if (!this.started || this.lifecycle !== lifecycle || this.createEventRef) return;
      this.createEventRef = this.registerEvent(this.app.vault, 'create', file => {
        if (file instanceof TFile) this.enqueueRename(file);
      });
      this.scheduleBaseStyleRefresh();
    };

    if (typeof this.app.workspace.onLayoutReady === 'function') {
      this.app.workspace.onLayoutReady(registerCreateEvent);
    } else {
      registerCreateEvent();
    }
  }

  stop() {
    if (!this.started && this.eventRefs.length === 0) {
      this.removeDomEffects();
      return;
    }

    this.started = false;
    this.lifecycle += 1;
    for (const entry of this.eventRefs.splice(0)) {
      try {
        if (typeof entry.emitter?.offref === 'function') entry.emitter.offref(entry.ref);
        else if (typeof entry.ref === 'function') entry.ref();
      } catch (error) {
        console.debug('Open Manage: failed to unregister image event', error);
      }
    }
    this.createEventRef = null;
    this.removeDomEffects();
  }

  async applySettings() {
    this.settings = this.readSettings();
    if (!this.started) return;

    this.applyFilenameDisplayCss();
    this.applyFileListCss();
    this.startBaseStyleObserver();
    this.scheduleBaseStyleRefresh();
  }

  async renameImagesInActiveNote() {
    const activeFile = this.app.workspace.getActiveFile();
    if (!(activeFile instanceof TFile)) {
      this.showNotice('没有找到当前文件。');
      return;
    }
    if (activeFile.extension !== 'md' && activeFile.extension !== 'canvas') {
      this.showNotice('当前文件不是 Markdown 或 Canvas。');
      return;
    }

    const operation = this.renameQueue.then(() => this.renameImagesInFile(activeFile));
    this.renameQueue = operation.catch(error => {
      console.error('Open Manage: failed to organize images in active file', error);
      this.showNotice('整理当前文件中的图片失败，请查看控制台。');
    });
    await this.renameQueue;
  }

  async createDefaultBase() {
    try {
      const path = await this.getAvailableBasePath(DEFAULT_BASE_FILE_NAME);
      const translate = text => typeof this.plugin.t === 'function' ? this.plugin.t(text) : text;
      const content = DEFAULT_BASE_CONTENT
        .replace('displayName: "名称"', `displayName: "${translate('名称')}"`)
        .replace('displayName: "扩展名"', `displayName: "${translate('扩展名')}"`)
        .replace('displayName: "文件反向链接"', `displayName: "${translate('文件反向链接')}"`)
        .replace('displayName: "修改时间"', `displayName: "${translate('修改时间')}"`);
      const baseFile = await this.app.vault.create(path, content);
      const leaf = this.app.workspace.getLeaf(true);
      if (leaf?.openFile) await leaf.openFile(baseFile);
      this.showNotice(`已创建 ${path}`);
      return baseFile;
    } catch (error) {
      console.error('Open Manage: failed to create default Base', error);
      this.showNotice('创建 Files.base 失败，请查看控制台。');
      return null;
    }
  }

  readSettings() {
    const source = this.plugin.settings?.imageRename || {};
    const filenameDisplayMode = ['show', 'hide', 'hover'].includes(source.filenameDisplayMode)
      ? source.filenameDisplayMode
      : 'hover';
    const rules = Array.isArray(source.baseNameStyleRules)
      ? source.baseNameStyleRules
        .map(rule => ({
          extension: String(rule?.extension || '').trim().replace(/^\./, '').toLowerCase(),
          color: /^#[0-9a-f]{6}$/i.test(String(rule?.color || '')) ? String(rule.color) : '#3f3f46'
        }))
        .filter(rule => rule.extension)
      : [];

    return {
      enabled: source.enabled === true,
      targetFolder: this.normalizeFolderPath(String(source.targetFolder || '')),
      filenameDisplayMode,
      hidePngInFileList: source.hidePngInFileList !== false,
      baseNameStyleRules: rules
    };
  }

  registerWorkspaceEvents() {
    for (const eventName of ['layout-change', 'file-open', 'active-leaf-change']) {
      this.registerEvent(this.app.workspace, eventName, () => {
        if (!this.started) return;
        this.applyFilenameDisplayCss();
        this.applyFileListCss();
        this.startBaseStyleObserver();
        this.scheduleBaseStyleRefresh();
      });
    }
  }

  registerEvent(emitter, eventName, callback) {
    if (!emitter || typeof emitter.on !== 'function') return null;
    const ref = emitter.on(eventName, callback);
    if (ref) this.eventRefs.push({ emitter, ref });
    return ref;
  }

  enqueueRename(file) {
    if (!this.started || !this.settings.enabled || !this.shouldProcess(file)) return;
    const sourceFile = this.getActiveReferenceSource(file);
    const lifecycle = this.lifecycle;

    this.renameQueue = this.renameQueue
      .then(async () => {
        if (!this.started || this.lifecycle !== lifecycle || !this.settings.enabled) return;
        const renameResult = await this.renameImage(file, sourceFile);
        if (renameResult && sourceFile) {
          await this.repairAutoRenameReferences(sourceFile, renameResult, lifecycle)
            .catch(error => console.error(
              'Open Manage: failed to repair an image reference',
              error
            ));
        }
      })
      .catch(error => {
        console.error('Open Manage: image rename queue failed', error);
      });
  }

  getActiveReferenceSource(imageFile) {
    const activeFile = this.app.workspace.getActiveFile();
    if (!(activeFile instanceof TFile) || activeFile.path === imageFile.path) return undefined;
    return activeFile.extension === 'md' || activeFile.extension === 'canvas'
      ? activeFile
      : undefined;
  }

  async renameImage(file, noteFile) {
    if (!this.shouldProcess(file)) return null;
    const sourcePath = file.path;
    if (this.processingPaths.has(sourcePath)) return null;
    this.processingPaths.add(sourcePath);

    try {
      const currentFile = this.app.vault.getAbstractFileByPath(sourcePath);
      if (!(currentFile instanceof TFile) || !this.shouldProcess(currentFile)) return null;

      const targetFolderPath = await this.getTargetFolderPath(currentFile);
      const sourceFile = noteFile || this.app.workspace.getActiveFile() || undefined;
      const noteName = this.getCurrentNoteName(currentFile, sourceFile);
      const extension = currentFile.extension.toLowerCase();
      let sequence = await this.getNextSequence(noteName, targetFolderPath, sourceFile);
      let targetPath;

      do {
        const fileName = `${noteName}_${this.formatSequence(sequence)}.${extension}`;
        targetPath = targetFolderPath ? `${targetFolderPath}/${fileName}` : fileName;
        sequence += 1;
      } while (await this.app.vault.adapter.exists(targetPath));

      if (targetPath === sourcePath) return null;
      await this.app.vault.rename(currentFile, targetPath);
      return { sourcePath, targetPath };
    } catch (error) {
      console.error('Open Manage: automatic image rename failed', error);
      this.showNotice('图片自动重命名失败，请查看控制台。');
      return null;
    } finally {
      this.processingPaths.delete(sourcePath);
    }
  }

  async renameImagesInFile(sourceFile) {
    const originalContent = await this.app.vault.cachedRead(sourceFile);
    const removedMissingCount = sourceFile.extension === 'canvas'
      ? await this.removeMissingCanvasImageNodes(sourceFile)
      : 0;
    const imageFiles = await this.getImageFilesInFile(sourceFile);

    if (imageFiles.length === 0) {
      this.showNotice(removedMissingCount > 0
        ? `已移除 ${removedMissingCount} 个失效图片节点。`
        : '当前文件中没有找到图片。');
      return [];
    }

    const renameResults = await this.normalizeImageSequence(sourceFile, imageFiles);
    if (renameResults.length > 0) {
      await this.repairManualReferences(sourceFile, renameResults, originalContent);
    }
    if (removedMissingCount > 0 || renameResults.length > 0) {
      await this.refreshOpenFileView(sourceFile);
    }

    this.showNotice(
      `已检查 ${imageFiles.length} 张图片；重命名 ${renameResults.length} 张；` +
      `未变化 ${imageFiles.length - renameResults.length} 张；移除失效节点 ${removedMissingCount} 个。`
    );
    return renameResults;
  }

  async getImageFilesInFile(sourceFile) {
    if (sourceFile.extension === 'canvas') return this.getImageFilesInCanvas(sourceFile);
    if (sourceFile.extension === 'md') return this.getImageFilesInMarkdown(sourceFile);
    return [];
  }

  getImageFilesInMarkdown(sourceFile) {
    const cache = this.app.metadataCache.getFileCache(sourceFile);
    const imageFiles = new Map();
    for (const embed of cache?.embeds || []) {
      const linkedFile = this.app.metadataCache.getFirstLinkpathDest(embed.link, sourceFile.path);
      if (linkedFile instanceof TFile && IMAGE_EXTENSIONS.has(linkedFile.extension.toLowerCase())) {
        imageFiles.set(linkedFile.path, linkedFile);
      }
    }
    return [...imageFiles.values()];
  }

  async getImageFilesInCanvas(canvasFile) {
    const canvasData = await this.readCanvasData(canvasFile);
    const imageFiles = new Map();
    for (const node of canvasData.nodes || []) {
      if (node.type !== 'file' || !node.file) continue;
      const linkedFile = this.resolveLinkedFile(node.file, canvasFile.path);
      if (linkedFile instanceof TFile && IMAGE_EXTENSIONS.has(linkedFile.extension.toLowerCase())) {
        imageFiles.set(linkedFile.path, linkedFile);
      }
    }
    return [...imageFiles.values()];
  }

  resolveLinkedFile(link, sourcePath) {
    const directFile = this.app.vault.getAbstractFileByPath(normalizePath(link));
    if (directFile instanceof TFile) return directFile;
    return this.app.metadataCache.getFirstLinkpathDest(link, sourcePath);
  }

  async readCanvasData(canvasFile) {
    return JSON.parse(await this.app.vault.cachedRead(canvasFile));
  }

  async removeMissingCanvasImageNodes(canvasFile) {
    const canvasData = await this.readCanvasData(canvasFile);
    const originalNodes = canvasData.nodes || [];
    const removedNodeIds = new Set();
    const remainingNodes = originalNodes.filter(node => {
      if (node.type !== 'file' || !node.file || !this.isImagePath(node.file)) return true;
      if (this.resolveLinkedFile(node.file, canvasFile.path) instanceof TFile) return true;
      if (node.id) removedNodeIds.add(node.id);
      return false;
    });

    if (remainingNodes.length === originalNodes.length) return 0;
    canvasData.nodes = remainingNodes;
    canvasData.edges = (canvasData.edges || []).filter(edge =>
      !removedNodeIds.has(edge.fromNode || '') && !removedNodeIds.has(edge.toNode || '')
    );
    await this.app.vault.modify(canvasFile, JSON.stringify(canvasData, null, '\t'));
    return originalNodes.length - remainingNodes.length;
  }

  async normalizeImageSequence(sourceFile, imageFiles) {
    const noteName = this.getCurrentNoteName(imageFiles[0], sourceFile);
    const sourcePaths = new Set(imageFiles.map(file => file.path));
    const plans = [];

    for (const [index, imageFile] of imageFiles.entries()) {
      const targetFolderPath = await this.getTargetFolderPath(imageFile);
      const targetPath = normalizePath(
        `${targetFolderPath ? `${targetFolderPath}/` : ''}` +
        `${noteName}_${this.formatSequence(index + 1)}.${imageFile.extension.toLowerCase()}`
      );
      if (targetPath === imageFile.path) continue;
      if ((await this.app.vault.adapter.exists(targetPath)) && !sourcePaths.has(targetPath)) {
        this.showNotice(`无法整理图片，目标已存在：${targetPath}`);
        return [];
      }
      plans.push({ sourcePath: imageFile.path, targetPath });
    }

    if (plans.length === 0) return [];
    const tempPlans = [];
    for (const [index, plan] of plans.entries()) {
      const source = this.app.vault.getAbstractFileByPath(plan.sourcePath);
      if (!(source instanceof TFile)) {
        throw new Error(`Image disappeared while organizing: ${plan.sourcePath}`);
      }
      const slash = plan.targetPath.lastIndexOf('/');
      const folderPath = slash === -1 ? '' : plan.targetPath.slice(0, slash);
      const tempPath = await this.getAvailableTempPath(folderPath, source.extension, index);
      await this.app.vault.rename(source, tempPath);
      tempPlans.push({ ...plan, tempPath });
    }

    const completed = [];
    for (const plan of tempPlans) {
      const tempFile = this.app.vault.getAbstractFileByPath(plan.tempPath);
      if (!(tempFile instanceof TFile)) {
        throw new Error(`Temporary image disappeared: ${plan.tempPath}`);
      }
      await this.app.vault.rename(tempFile, plan.targetPath);
      completed.push({ sourcePath: plan.sourcePath, targetPath: plan.targetPath });
    }
    return completed;
  }

  async getAvailableTempPath(folderPath, extension, index) {
    let attempt = 0;
    while (true) {
      const fileName = `.oom-image-rename-${Date.now()}-${index}-${attempt}.${extension.toLowerCase()}`;
      const path = folderPath ? `${folderPath}/${fileName}` : fileName;
      if (!(await this.app.vault.adapter.exists(path))) return path;
      attempt += 1;
    }
  }

  async repairManualReferences(sourceFile, renameResults, originalContent) {
    const liveFile = this.app.vault.getAbstractFileByPath(sourceFile.path);
    if (!(liveFile instanceof TFile)) return false;
    const latestContent = await this.app.vault.cachedRead(liveFile);

    if (sourceFile.extension === 'canvas') {
      const expected = this.replaceCanvasImageReferences(originalContent, renameResults);
      if (latestContent === expected) return false;
      const updated = latestContent === originalContent
        ? expected
        : this.replaceCanvasImageReferences(latestContent, renameResults);
      if (updated !== latestContent) await this.app.vault.modify(liveFile, updated);
      return updated !== latestContent;
    }

    const expected = this.replaceMarkdownImageReferences(originalContent, renameResults);
    if (latestContent === expected) return false;
    const updated = latestContent === originalContent
      ? expected
      : this.replaceMarkdownImageReferences(latestContent, renameResults);
    if (updated !== latestContent) await this.app.vault.modify(liveFile, updated);
    return updated !== latestContent;
  }

  async repairAutoRenameReferences(sourceFile, renameResult, lifecycle) {
    for (const delay of [0, 100, 300, 700, 1500]) {
      await this.sleep(delay);
      if (!this.started || this.lifecycle !== lifecycle) return false;
      const latestSourceFile = this.app.vault.getAbstractFileByPath(sourceFile.path);
      if (!(latestSourceFile instanceof TFile)) return false;
      if (await this.updateRenamedImageReferences(latestSourceFile, [renameResult])) return true;
    }
    return false;
  }

  async updateRenamedImageReferences(sourceFile, renameResults) {
    const content = await this.app.vault.cachedRead(sourceFile);
    const updated = sourceFile.extension === 'canvas'
      ? this.replaceCanvasImageReferences(content, renameResults)
      : sourceFile.extension === 'md'
        ? this.replaceMarkdownImageReferences(content, renameResults)
        : content;
    if (updated === content) {
      return renameResults.every(result =>
        this.hasImageReference(content, sourceFile.extension, result.targetPath)
      );
    }
    await this.app.vault.modify(sourceFile, updated);
    return true;
  }

  hasImageReference(content, sourceExtension, targetPath) {
    if (sourceExtension === 'canvas') {
      try {
        const canvasData = JSON.parse(content);
        return (canvasData.nodes || []).some(node =>
          node.type === 'file' && node.file && this.linkMatchesPath(node.file, targetPath)
        );
      } catch {
        return false;
      }
    }
    if (sourceExtension !== 'md') return false;

    const wikiPattern = /!\[\[([^\]]+)\]\]/g;
    for (const match of content.matchAll(wikiPattern)) {
      const link = match[1].split('|')[0].split('#')[0];
      if (this.linkMatchesPath(link, targetPath)) return true;
    }
    const markdownPattern = /!\[[^\]]*\]\(([^)]+)\)/g;
    for (const match of content.matchAll(markdownPattern)) {
      const parsed = this.parseMarkdownDestination(match[1]);
      if (this.linkMatchesPath(parsed.path.split('#')[0], targetPath)) return true;
    }
    return false;
  }

  linkMatchesPath(linkPath, filePath) {
    const normalizedLink = this.normalizeLinkPath(linkPath);
    const normalizedPath = normalizePath(filePath);
    const fileName = normalizedPath.split('/').pop() || normalizedPath;
    return normalizedLink === normalizedPath ||
      normalizedLink === fileName ||
      normalizedLink.endsWith(`/${fileName}`);
  }

  replaceCanvasImageReferences(content, renameResults) {
    let canvasData;
    try {
      canvasData = JSON.parse(content);
    } catch {
      return content;
    }
    let changed = false;
    for (const node of canvasData.nodes || []) {
      if (node.type !== 'file' || !node.file) continue;
      const result = this.findRenameResult(node.file, renameResults);
      if (result && node.file !== result.targetPath) {
        node.file = result.targetPath;
        changed = true;
      }
    }
    return changed ? JSON.stringify(canvasData, null, '\t') : content;
  }

  replaceMarkdownImageReferences(content, renameResults) {
    const wikiLinkPattern = /(!\[\[)([^\]]+)(\]\])/g;
    const markdownImagePattern = /(!\[[^\]]*\]\()([^)]+)(\))/g;
    return content
      .replace(wikiLinkPattern, (match, open, inner, close) => {
        const separatorIndex = inner.indexOf('|');
        const linkPart = separatorIndex === -1 ? inner : inner.slice(0, separatorIndex);
        const aliasPart = separatorIndex === -1 ? '' : inner.slice(separatorIndex);
        const headingIndex = linkPart.indexOf('#');
        const pathPart = headingIndex === -1 ? linkPart : linkPart.slice(0, headingIndex);
        const subpathPart = headingIndex === -1 ? '' : linkPart.slice(headingIndex);
        const result = this.findRenameResult(pathPart, renameResults);
        return result ? `${open}${result.targetPath}${subpathPart}${aliasPart}${close}` : match;
      })
      .replace(markdownImagePattern, (match, open, destination, close) => {
        const parsed = this.parseMarkdownDestination(destination);
        const fragmentIndex = parsed.path.indexOf('#');
        const pathPart = fragmentIndex === -1 ? parsed.path : parsed.path.slice(0, fragmentIndex);
        const fragment = fragmentIndex === -1 ? '' : parsed.path.slice(fragmentIndex);
        const result = this.findRenameResult(pathPart, renameResults);
        if (!result) return match;
        return `${open}${this.formatMarkdownDestination(result.targetPath + fragment, parsed)}${close}`;
      });
  }

  parseMarkdownDestination(destination) {
    const trimmed = destination.trim();
    if (trimmed.startsWith('<')) {
      const closingIndex = trimmed.indexOf('>');
      if (closingIndex !== -1) {
        return {
          path: trimmed.slice(1, closingIndex),
          prefix: '<',
          suffix: `>${trimmed.slice(closingIndex + 1)}`
        };
      }
    }
    const titleMatch = trimmed.match(/^(\S+)(\s+["'][\s\S]+)$/);
    return {
      path: titleMatch ? titleMatch[1] : trimmed,
      prefix: '',
      suffix: titleMatch ? titleMatch[2] : ''
    };
  }

  formatMarkdownDestination(targetPath, parsed) {
    if (parsed.prefix === '<') return `<${targetPath}>${parsed.suffix.slice(1)}`;
    return `${encodeURI(targetPath)}${parsed.suffix}`;
  }

  findRenameResult(linkPath, renameResults) {
    const normalizedLinkPath = this.normalizeLinkPath(linkPath);
    for (const result of renameResults) {
      if (normalizedLinkPath === normalizePath(result.sourcePath)) return result;
    }
    const candidates = renameResults.filter(result => {
      const sourcePath = normalizePath(result.sourcePath);
      const sourceName = sourcePath.split('/').pop() || sourcePath;
      return normalizedLinkPath === sourceName || normalizedLinkPath.endsWith(`/${sourceName}`);
    });
    return candidates.length === 1 ? candidates[0] : null;
  }

  normalizeLinkPath(linkPath) {
    let decoded = String(linkPath || '').trim();
    try {
      decoded = decodeURI(decoded);
    } catch {
      // Keep malformed percent escapes unchanged.
    }
    return normalizePath(decoded);
  }

  async getNextSequence(noteName, targetFolderPath, sourceFile) {
    const usedSequences = new Set();
    if (sourceFile instanceof TFile && (sourceFile.extension === 'md' || sourceFile.extension === 'canvas')) {
      for (const basename of await this.getReferencedImageBasenamesInFile(sourceFile)) {
        this.addSequenceFromBasename(usedSequences, noteName, basename);
      }
      for (const imageFile of await this.getImageFilesInFile(sourceFile)) {
        this.addSequenceFromBasename(usedSequences, noteName, imageFile.basename);
      }
    }

    const folder = targetFolderPath
      ? this.app.vault.getAbstractFileByPath(targetFolderPath)
      : this.app.vault.getRoot();
    if (folder instanceof TFolder) {
      for (const child of folder.children) {
        if (child instanceof TFile && IMAGE_EXTENSIONS.has(child.extension.toLowerCase())) {
          this.addSequenceFromBasename(usedSequences, noteName, child.basename);
        }
      }
    }
    return Math.max(0, ...usedSequences) + 1;
  }

  async getReferencedImageBasenamesInFile(sourceFile) {
    if (sourceFile.extension === 'canvas') {
      const canvasData = await this.readCanvasData(sourceFile);
      return (canvasData.nodes || [])
        .filter(node => node.type === 'file' && node.file && this.isImagePath(node.file))
        .map(node => this.getBasenameFromPath(node.file))
        .filter(Boolean);
    }
    const cache = this.app.metadataCache.getFileCache(sourceFile);
    return (cache?.embeds || [])
      .map(embed => embed.link)
      .filter(link => this.isImagePath(link))
      .map(link => this.getBasenameFromPath(link))
      .filter(Boolean);
  }

  isImagePath(path) {
    const cleanPath = String(path || '').split('#')[0].split('|')[0];
    const extension = cleanPath.split('.').pop()?.toLowerCase() || '';
    return IMAGE_EXTENSIONS.has(extension);
  }

  getBasenameFromPath(path) {
    const cleanPath = normalizePath(String(path || '').split('#')[0].split('|')[0]);
    const fileName = cleanPath.split('/').pop() || '';
    const extensionIndex = fileName.lastIndexOf('.');
    return extensionIndex === -1 ? fileName : fileName.slice(0, extensionIndex);
  }

  addSequenceFromBasename(sequences, noteName, basename) {
    const match = String(basename || '').match(
      new RegExp(`^${this.escapeRegExp(noteName)}_(\\d{6})$`)
    );
    if (!match) return;
    const sequence = Number.parseInt(match[1], 10);
    if (Number.isFinite(sequence) && sequence > 0) sequences.add(sequence);
  }

  shouldProcess(file) {
    return file instanceof TFile &&
      IMAGE_EXTENSIONS.has(file.extension.toLowerCase()) &&
      !PROCESSED_NAME_PATTERN.test(file.basename);
  }

  formatSequence(sequence) {
    return String(sequence).padStart(6, '0').slice(-6);
  }

  getCurrentNoteName(imageFile, noteFile) {
    const activeFile = noteFile instanceof TFile ? noteFile : this.app.workspace.getActiveFile();
    const rawName = activeFile instanceof TFile
      ? activeFile.basename
      : imageFile.parent?.name || 'Vault';
    const safeName = String(rawName || '')
      .trim()
      .replace(/[\\/:*?"<>|#^[\]]+/g, '-')
      .replace(/\s+/g, '-');
    return safeName || 'Vault';
  }

  escapeRegExp(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  async getTargetFolderPath(file) {
    const targetFolderPath = this.settings.targetFolder || file.parent?.path || '';
    await this.ensureFolderExists(targetFolderPath);
    return targetFolderPath;
  }

  normalizeFolderPath(folderPath) {
    const normalized = normalizePath(String(folderPath || '').trim());
    if (!normalized || normalized === '.' || normalized === '/') return '';
    const clean = normalized.replace(/^\/+|\/+$/g, '');
    if (clean.split('/').some(part => part === '..')) {
      throw new Error(`Invalid target folder: ${folderPath}`);
    }
    return clean;
  }

  async ensureFolderExists(folderPath) {
    if (!folderPath) return;
    const existing = this.app.vault.getAbstractFileByPath(folderPath);
    if (existing instanceof TFolder) return;
    if (existing) throw new Error(`Target path is not a folder: ${folderPath}`);

    let currentPath = '';
    for (const part of folderPath.split('/').filter(Boolean)) {
      currentPath = currentPath ? `${currentPath}/${part}` : part;
      const current = this.app.vault.getAbstractFileByPath(currentPath);
      if (!current) await this.app.vault.createFolder(currentPath);
      else if (!(current instanceof TFolder)) {
        throw new Error(`Target path is not a folder: ${currentPath}`);
      }
    }
  }

  async getAvailableBasePath(fileName) {
    const extensionIndex = fileName.lastIndexOf('.');
    const basename = extensionIndex === -1 ? fileName : fileName.slice(0, extensionIndex);
    const extension = extensionIndex === -1 ? '' : fileName.slice(extensionIndex);
    let path = fileName;
    let index = 1;
    while (await this.app.vault.adapter.exists(path)) {
      path = `${basename} ${index}${extension}`;
      index += 1;
    }
    return path;
  }

  async refreshOpenFileView(file) {
    const viewType = file.extension === 'canvas' ? 'canvas' : 'markdown';
    const leaves = this.app.workspace.getLeavesOfType(viewType) || [];
    const currentLeaf = this.app.workspace.getLeaf(false);
    for (const leaf of leaves) {
      const leafFile = leaf.view && 'file' in leaf.view ? leaf.view.file : null;
      if (leafFile instanceof TFile && leafFile.path === file.path && leaf.openFile) {
        await leaf.openFile(file, { active: leaf === currentLeaf });
      }
    }
  }

  getActiveDocument() {
    if (typeof activeDocument !== 'undefined' && activeDocument?.body) return activeDocument;
    if (typeof document !== 'undefined' && document?.body) return document;
    return null;
  }

  getMutationObserver(documentRef) {
    return documentRef?.defaultView?.MutationObserver ||
      (typeof MutationObserver !== 'undefined' ? MutationObserver : null);
  }

  applyFilenameDisplayCss() {
    const documentRef = this.getActiveDocument();
    if (!documentRef?.body) return;
    for (const previousDocument of this.filenameDocuments) {
      if (previousDocument !== documentRef) {
        previousDocument.body?.classList.remove(...BODY_FILENAME_CLASSES);
        this.filenameDocuments.delete(previousDocument);
      }
    }
    documentRef.body.classList.remove(...BODY_FILENAME_CLASSES);
    if (this.settings.filenameDisplayMode === 'hide') {
      documentRef.body.classList.add('oom-image-filename-hide');
    } else if (this.settings.filenameDisplayMode === 'hover') {
      documentRef.body.classList.add('oom-image-filename-hover');
    }
    this.filenameDocuments.add(documentRef);
  }

  removeFilenameDisplayCss() {
    const active = this.getActiveDocument();
    if (active) this.filenameDocuments.add(active);
    for (const documentRef of this.filenameDocuments) {
      documentRef.body?.classList.remove(...BODY_FILENAME_CLASSES);
    }
    this.filenameDocuments.clear();
  }

  applyFileListCss() {
    if (!this.settings.hidePngInFileList) {
      this.stopFileListObserver();
      return;
    }
    this.startFileListObserver();
    this.refreshFileListVisibility();
  }

  startFileListObserver() {
    const documentRef = this.getActiveDocument();
    if (!documentRef?.body) return;
    if (this.fileListObserver && this.fileListDocument === documentRef) return;
    this.stopFileListObserver();
    const Observer = this.getMutationObserver(documentRef);
    if (!Observer) return;
    this.fileListObserver = new Observer(() => {
      if (this.started) this.refreshFileListVisibility();
    });
    this.fileListObserver.observe(documentRef.body, { childList: true, subtree: true });
    this.fileListDocument = documentRef;
  }

  stopFileListObserver() {
    this.fileListObserver?.disconnect();
    this.fileListObserver = null;
    this.fileListDocument = null;
    this.clearHiddenFileListElements();
  }

  refreshFileListVisibility() {
    this.clearHiddenFileListElements();
    if (!this.settings.hidePngInFileList) return;
    const documentRef = this.getActiveDocument();
    if (!documentRef) return;
    const selector = '.nav-file-title[data-path], .tree-item-self[data-path]';
    for (const element of documentRef.querySelectorAll(selector)) {
      const path = element.getAttribute('data-path') || '';
      if (!path.toLowerCase().endsWith('.png')) continue;
      element.classList.add('oom-image-hidden-file');
      this.hiddenFileListElements.add(element);
      const container = element.closest('.nav-file, .tree-item');
      if (container) {
        container.classList.add('oom-image-hidden-file-container');
        this.hiddenFileListElements.add(container);
      }
    }
  }

  clearHiddenFileListElements() {
    for (const element of this.hiddenFileListElements) {
      element.classList.remove('oom-image-hidden-file', 'oom-image-hidden-file-container');
    }
    this.hiddenFileListElements.clear();
  }

  startBaseStyleObserver() {
    const documentRef = this.getActiveDocument();
    if (!documentRef?.body) return;
    if (this.baseStyleObserver && this.baseStyleDocument === documentRef) return;
    this.stopBaseStyleObserver();
    const Observer = this.getMutationObserver(documentRef);
    if (!Observer) return;
    this.baseStyleObserver = new Observer(() => this.queueApplyBaseNameStyles());
    this.baseStyleObserver.observe(documentRef.body, { childList: true, subtree: true });
    this.baseStyleDocument = documentRef;
  }

  stopBaseStyleObserver() {
    this.baseStyleObserver?.disconnect();
    this.baseStyleObserver = null;
    this.baseStyleDocument = null;
    if (this.baseStyleTimer !== null) clearTimeout(this.baseStyleTimer);
    this.baseStyleTimer = null;
    for (const timer of this.baseStyleRetryTimers) clearTimeout(timer);
    this.baseStyleRetryTimers = [];
    this.clearBaseNameStyles();
  }

  scheduleBaseStyleRefresh() {
    if (!this.started) return;
    for (const timer of this.baseStyleRetryTimers) clearTimeout(timer);
    this.baseStyleRetryTimers = [];
    this.queueApplyBaseNameStyles();
    for (const delay of [250, 1000, 2500]) {
      const timer = setTimeout(() => {
        this.baseStyleRetryTimers = this.baseStyleRetryTimers.filter(item => item !== timer);
        this.queueApplyBaseNameStyles();
      }, delay);
      this.baseStyleRetryTimers.push(timer);
    }
  }

  queueApplyBaseNameStyles() {
    if (!this.started || this.baseStyleTimer !== null) return;
    this.baseStyleTimer = setTimeout(() => {
      this.baseStyleTimer = null;
      this.applyBaseNameStyles();
    }, 100);
  }

  applyBaseNameStyles() {
    this.clearBaseNameStyles();
    const documentRef = this.getActiveDocument();
    if (!documentRef) return;
    const ruleMap = new Map(this.settings.baseNameStyleRules.map(rule => [rule.extension, rule.color]));
    if (ruleMap.size === 0) return;
    const attributes = [
      'data-property',
      'data-property-key',
      'data-property-name',
      'data-column-id',
      'data-column-key',
      'aria-label'
    ];
    const selectorFor = properties => properties
      .flatMap(property => attributes.map(attribute => `[${attribute}='${property}']`))
      .join(', ');
    const extensionSelector = selectorFor(['file.ext', 'file.extension']);
    const nameSelector = selectorFor(['file.name', 'file.path']);

    for (const extensionCell of documentRef.querySelectorAll(extensionSelector)) {
      const row = extensionCell.closest('.bases-tr, .bases-table-row, tr, [role="row"]');
      if (!row) continue;
      const extension = String(extensionCell.textContent || '')
        .trim()
        .replace(/^\./, '')
        .toLowerCase();
      const color = ruleMap.get(extension);
      const nameCell = row.querySelector(nameSelector);
      if (!color || !nameCell) continue;
      for (const element of [nameCell, ...nameCell.querySelectorAll('a, span, div')]) {
        element.classList.add('oom-image-base-name-styled');
        element.style?.setProperty('--oom-image-base-name-color', color);
        element.setAttribute('data-oom-image-base-name-style', 'true');
        this.baseStyledElements.add(element);
      }
    }
  }

  clearBaseNameStyles() {
    for (const element of this.baseStyledElements) {
      element.classList.remove('oom-image-base-name-styled');
      element.style?.removeProperty('--oom-image-base-name-color');
      element.removeAttribute('data-oom-image-base-name-style');
    }
    this.baseStyledElements.clear();
  }

  removeDomEffects() {
    this.removeFilenameDisplayCss();
    this.stopFileListObserver();
    this.stopBaseStyleObserver();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  showNotice(message) {
    const translated = typeof this.plugin.t === 'function' ? this.plugin.t(message) : message;
    new Notice(translated);
  }
}

module.exports = { ImageRenameController };
