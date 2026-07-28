const {
  Plugin,
  ItemView,
  Modal,
  Notice,
  PluginSettingTab,
  Setting,
  normalizePath,
  setIcon
} = require('obsidian');
const { translateText, localizeElement } = require('./i18n');
const { ImageRenameController } = require('./image-rename');
const { MindmapController } = require('./mindmap');

const VIEW_TYPE_MANAGE = 'open-obsidian-manage-view';
const DEFAULT_DATA_FOLDER = 'Archive/img/Open_Manager';
const MANAGEMENT_DATABASE = 'management.md';
const PLANNING_DATABASE = 'planning.md';
const FINANCE_DATABASE = 'finance.md';
const LEGACY_FUNDS_DATABASE = 'Personal_funds/records.md';

const DEFAULT_IMAGE_RENAME_SETTINGS = {
  enabled: false,
  targetFolder: 'Archive/img',
  filenameDisplayMode: 'hover',
  hidePngInFileList: true,
  baseNameStyleRules: [
    { extension: 'canvas', color: '#f9a8d4' },
    { extension: 'md', color: '#3f3f46' }
  ]
};

const DEFAULT_MINDMAP_SETTINGS = {
  enabled: true,
  direction: 'horizontal',
  spacingHorizontal: 150,
  spacingVertical: 28,
  initialExpandLevel: 4,
  showToolbar: true,
  titleAsRootNode: true,
  coloring: 'depth',
  depth1Color: '#9167f2',
  depth2Color: '#5b8def',
  depth3Color: '#42d38b',
  defaultColor: '#f2b84b'
};

const DEFAULT_DATA = {
  version: 1,
  projects: [],
  actions: [],
  ideas: [],
  finance: {
    records: [],
    fixedExpenses: [],
    expectedIncomes: [],
    expectedExpense: 0
  }
};

const FINANCE_TYPES = [
  ['income', '收入'],
  ['expense', '支出'],
  ['credit_expense', '信用卡支出'],
  ['repay_credit', '还信用卡'],
  ['lend_out', '借出'],
  ['collect_loan', '收回借出'],
  ['account_adjust', '账户调整']
];

const FINANCE_CATEGORIES = ['餐饮', '交通', '设备', '学习', '项目', '工资', '信用卡', '借出', '其他'];

const PROJECT_STATUSES = [
  ['planned', '待开始'],
  ['active', '进行中'],
  ['blocked', '阻塞'],
  ['done', '已完成']
];

const ACTION_STATUSES = [
  ['todo', '待处理'],
  ['doing', '进行中'],
  ['blocked', '阻塞'],
  ['done', '已完成']
];

const PRIORITIES = [
  ['P0', 'P0 · 紧急'],
  ['P1', 'P1 · 重要'],
  ['P2', 'P2 · 常规'],
  ['P3', 'P3 · 稍后']
];

const PRIORITY_WEIGHT = { P0: 0, P1: 1, P2: 2, P3: 3 };

function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function cloneDefault() {
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

function normalizeData(raw) {
  const data = raw && typeof raw === 'object' ? raw : cloneDefault();
  const finance = data.finance && typeof data.finance === 'object' ? data.finance : {};
  return {
    version: 1,
    projects: Array.isArray(data.projects) ? data.projects : [],
    actions: Array.isArray(data.actions) ? data.actions : [],
    ideas: Array.isArray(data.ideas) ? data.ideas : [],
    finance: {
      records: Array.isArray(finance.records) ? finance.records : [],
      fixedExpenses: Array.isArray(finance.fixedExpenses) ? finance.fixedExpenses : [],
      expectedIncomes: Array.isArray(finance.expectedIncomes) ? finance.expectedIncomes : [],
      expectedExpense: Number.isFinite(Number(finance.expectedExpense)) ? Math.max(0, Number(finance.expectedExpense)) : 0
    }
  };
}

function normalizeSettings(raw) {
  const source = raw?.settings && typeof raw.settings === 'object' ? raw.settings : raw || {};
  const folder = typeof source.dataFolder === 'string' ? source.dataFolder.trim() : '';
  const imageSource = source.imageRename && typeof source.imageRename === 'object' ? source.imageRename : {};
  const mindmapSource = source.mindmap && typeof source.mindmap === 'object' ? source.mindmap : {};
  const imageFolder = String(imageSource.targetFolder || '').trim();
  const filenameDisplayMode = ['show', 'hide', 'hover'].includes(imageSource.filenameDisplayMode)
    ? imageSource.filenameDisplayMode
    : DEFAULT_IMAGE_RENAME_SETTINGS.filenameDisplayMode;
  const baseNameStyleRules = Array.isArray(imageSource.baseNameStyleRules)
    ? imageSource.baseNameStyleRules
      .map(rule => ({
        extension: String(rule?.extension || '').trim().replace(/^\./, '').toLowerCase(),
        color: /^#[0-9a-f]{6}$/i.test(String(rule?.color || '')) ? String(rule.color) : '#3f3f46'
      }))
      .filter(rule => rule.extension)
    : DEFAULT_IMAGE_RENAME_SETTINGS.baseNameStyleRules.map(rule => ({ ...rule }));
  return {
    dataFolder: normalizePath(folder || DEFAULT_DATA_FOLDER).replace(/^\/+|\/+$/g, ''),
    language: source.language === 'en' ? 'en' : 'zh',
    imageRename: {
      enabled: typeof imageSource.enabled === 'boolean' ? imageSource.enabled : DEFAULT_IMAGE_RENAME_SETTINGS.enabled,
      targetFolder: imageFolder
        ? normalizePath(imageFolder).replace(/^\/+|\/+$/g, '')
        : DEFAULT_IMAGE_RENAME_SETTINGS.targetFolder,
      filenameDisplayMode,
      hidePngInFileList: typeof imageSource.hidePngInFileList === 'boolean'
        ? imageSource.hidePngInFileList
        : DEFAULT_IMAGE_RENAME_SETTINGS.hidePngInFileList,
      baseNameStyleRules
    },
    mindmap: {
      enabled: typeof mindmapSource.enabled === 'boolean' ? mindmapSource.enabled : DEFAULT_MINDMAP_SETTINGS.enabled,
      direction: mindmapSource.direction === 'vertical' ? 'vertical' : 'horizontal',
      spacingHorizontal: Math.min(320, Math.max(70, Number(mindmapSource.spacingHorizontal) || DEFAULT_MINDMAP_SETTINGS.spacingHorizontal)),
      spacingVertical: Math.min(100, Math.max(14, Number(mindmapSource.spacingVertical) || DEFAULT_MINDMAP_SETTINGS.spacingVertical)),
      initialExpandLevel: Math.min(12, Math.max(-1, Number.isFinite(Number(mindmapSource.initialExpandLevel))
        ? Number(mindmapSource.initialExpandLevel)
        : DEFAULT_MINDMAP_SETTINGS.initialExpandLevel)),
      showToolbar: typeof mindmapSource.showToolbar === 'boolean' ? mindmapSource.showToolbar : DEFAULT_MINDMAP_SETTINGS.showToolbar,
      titleAsRootNode: typeof mindmapSource.titleAsRootNode === 'boolean'
        ? mindmapSource.titleAsRootNode
        : DEFAULT_MINDMAP_SETTINGS.titleAsRootNode,
      coloring: ['depth', 'branch', 'single'].includes(mindmapSource.coloring) ? mindmapSource.coloring : 'depth',
      depth1Color: normalizeColor(mindmapSource.depth1Color, DEFAULT_MINDMAP_SETTINGS.depth1Color),
      depth2Color: normalizeColor(mindmapSource.depth2Color, DEFAULT_MINDMAP_SETTINGS.depth2Color),
      depth3Color: normalizeColor(mindmapSource.depth3Color, DEFAULT_MINDMAP_SETTINGS.depth3Color),
      defaultColor: normalizeColor(mindmapSource.defaultColor, DEFAULT_MINDMAP_SETTINGS.defaultColor)
    }
  };
}

function normalizeColor(value, fallback) {
  return /^#[0-9a-f]{6}$/i.test(String(value || '')) ? String(value) : fallback;
}

function statusLabel(value, options) {
  return options.find(([id]) => id === value)?.[1] || value;
}

function dueLabel(value) {
  if (!value) return '无截止日期';
  const due = new Date(`${value}T23:59:59`);
  const now = new Date();
  const days = Math.ceil((due - now) / 86400000);
  if (days < 0) return `逾期 ${Math.abs(days)} 天`;
  if (days === 0) return '今天截止';
  if (days === 1) return '明天截止';
  return `${value} 截止`;
}

function isOverdue(value, status) {
  return Boolean(value && status !== 'done' && new Date(`${value}T23:59:59`) < new Date());
}

function sortByPriorityAndDue(a, b) {
  const priority = (PRIORITY_WEIGHT[a.priority] ?? 9) - (PRIORITY_WEIGHT[b.priority] ?? 9);
  if (priority !== 0) return priority;
  if (!a.deadline && !b.deadline) return 0;
  if (!a.deadline) return 1;
  if (!b.deadline) return -1;
  return a.deadline.localeCompare(b.deadline);
}

function formatMoney(value) {
  return Number(value || 0).toLocaleString('zh-CN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function financeTypeLabel(type) {
  return FINANCE_TYPES.find(([id]) => id === type)?.[1] || type;
}

function iconButton(parent, icon, label, className, onClick) {
  const button = parent.createEl('button', {
    cls: `oom-icon-button ${className || ''}`.trim(),
    attr: { type: 'button', 'aria-label': label, title: label }
  });
  setIcon(button, icon);
  button.addEventListener('click', onClick);
  return button;
}

function textButton(parent, label, className, onClick) {
  const button = parent.createEl('button', {
    text: label,
    cls: className,
    attr: { type: 'button' }
  });
  button.addEventListener('click', onClick);
  return button;
}

module.exports = class OpenObsidianManagePlugin extends Plugin {
  async onload() {
    const stored = await this.loadData();
    this.settings = normalizeSettings(stored);
    this.data = await this.loadWorkspaceData(normalizeData(stored));
    await this.saveData({ settings: this.settings });
    this.settingTab = new ManageSettingTab(this.app, this);
    this.addSettingTab(this.settingTab);

    this.registerView(
      VIEW_TYPE_MANAGE,
      leaf => new ManageView(leaf, this)
    );

    this.imageRename = new ImageRenameController(this);
    this.mindmap = new MindmapController(this);
    await this.imageRename.start();
    await this.mindmap.start();

    this.addRibbonIcon('panel-top-open', this.t('打开管理中枢'), () => this.activateView());

    this.addCommand({
      id: 'open-manage-dashboard',
      name: this.t('打开管理中枢'),
      callback: () => this.activateView()
    });

    this.addCommand({
      id: 'add-manage-project',
      name: this.t('新建项目'),
      callback: () => new ProjectModal(this.app, this, null).open()
    });

    this.addCommand({
      id: 'add-manage-action',
      name: this.t('新建行动'),
      callback: () => new ActionModal(this.app, this, null).open()
    });

    this.addCommand({
      id: 'capture-manage-idea',
      name: this.t('记录想法'),
      callback: () => new IdeaModal(this.app, this, null).open()
    });
  }

  onunload() {
    this.imageRename?.stop();
    this.mindmap?.stop();
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_MANAGE);
  }

  t(text) {
    return translateText(text, this.settings?.language || 'zh');
  }

  localizeElement(root) {
    if (!root) return;
    root.setAttr?.('lang', this.settings.language === 'en' ? 'en' : 'zh-CN');
    localizeElement(root, this.settings.language);
  }

  async savePluginSettings(options = {}) {
    this.settings = normalizeSettings({ settings: this.settings });
    await this.saveData({ settings: this.settings });
    await this.imageRename?.applySettings?.();
    this.mindmap?.applySettings?.();
    if (options.refresh !== false) this.refreshViews();
  }

  async setLanguage(language) {
    this.settings.language = language === 'en' ? 'en' : 'zh';
    await this.savePluginSettings();
    this.settingTab?.display();
  }

  async activateView() {
    let leaf = this.app.workspace.getLeavesOfType(VIEW_TYPE_MANAGE)[0];
    if (!leaf) {
      leaf = this.app.workspace.getLeaf('tab');
      await leaf.setViewState({ type: VIEW_TYPE_MANAGE, active: true });
    }
    this.app.workspace.revealLeaf(leaf);
  }

  getDataFolder() {
    return normalizePath(this.settings.dataFolder || DEFAULT_DATA_FOLDER).replace(/^\/+|\/+$/g, '');
  }

  getDataPath(fileName) {
    return normalizePath(`${this.getDataFolder()}/${fileName}`);
  }

  async ensureFolder(path = this.getDataFolder()) {
    const parts = normalizePath(path).split('/').filter(Boolean);
    let current = '';
    for (const part of parts) {
      current = current ? `${current}/${part}` : part;
      if (!(await this.app.vault.adapter.exists(current))) {
        await this.app.vault.adapter.mkdir(current);
      }
    }
  }

  parseDatabase(raw, expectedKind) {
    const match = String(raw || '').match(/```json\s*([\s\S]*?)\s*```/i);
    const payload = match ? match[1] : raw;
    const parsed = JSON.parse(payload);
    if (!parsed || typeof parsed !== 'object') throw new Error('Database payload is not an object');
    if (expectedKind && parsed.kind && parsed.kind !== expectedKind) {
      throw new Error(`Unexpected database kind: ${parsed.kind}`);
    }
    return parsed;
  }

  serializeDatabase(title, kind, payload) {
    const body = {
      version: 1,
      kind,
      updatedAt: new Date().toISOString(),
      ...payload
    };
    return [
      `# ${title}`,
      '',
      '> Open Obsidian Manage 的本地数据文件。可以随笔记库同步，请不要手动破坏 JSON 代码块。',
      '',
      '```json',
      JSON.stringify(body, null, 2),
      '```',
      ''
    ].join('\n');
  }

  async readDatabase(fileName, kind) {
    const path = this.getDataPath(fileName);
    if (!(await this.app.vault.adapter.exists(path))) return null;
    return this.parseDatabase(await this.app.vault.adapter.read(path), kind);
  }

  async writeDatabase(fileName, title, kind, payload, folderReady = false) {
    if (!folderReady) await this.ensureFolder();
    const path = this.getDataPath(fileName);
    await this.app.vault.adapter.write(path, this.serializeDatabase(title, kind, payload));
  }

  hasLegacyManagementData(data) {
    return data.projects.length > 0 || data.actions.length > 0 || data.ideas.length > 0 ||
      data.finance.records.length > 0 || data.finance.fixedExpenses.length > 0 ||
      data.finance.expectedIncomes.length > 0 || data.finance.expectedExpense > 0;
  }

  async importLegacyFunds() {
    if (!(await this.app.vault.adapter.exists(LEGACY_FUNDS_DATABASE))) return null;
    try {
      const parsed = this.parseDatabase(
        await this.app.vault.adapter.read(LEGACY_FUNDS_DATABASE)
      );
      const settings = parsed.settings && typeof parsed.settings === 'object' ? parsed.settings : {};
      const records = Array.isArray(parsed.records) ? parsed.records : [];
      if (!records.length && !Array.isArray(settings.fixedExpenses) && !Array.isArray(settings.expectedIncomes)) {
        return null;
      }
      return {
        records,
        fixedExpenses: Array.isArray(settings.fixedExpenses) ? settings.fixedExpenses : [],
        expectedIncomes: Array.isArray(settings.expectedIncomes) ? settings.expectedIncomes : [],
        expectedExpense: Number.isFinite(Number(settings.expectedExpense))
          ? Math.max(0, Number(settings.expectedExpense))
          : 0
      };
    } catch (error) {
      console.error('Open Obsidian Manage: failed to import Personal Funds database', error);
      return null;
    }
  }

  async loadWorkspaceData(legacyData) {
    let management = null;
    let planning = null;
    let financeFile = null;
    try {
      [management, planning, financeFile] = await Promise.all([
        this.readDatabase(MANAGEMENT_DATABASE, 'management'),
        this.readDatabase(PLANNING_DATABASE, 'planning'),
        this.readDatabase(FINANCE_DATABASE, 'finance')
      ]);
    } catch (error) {
      console.error('Open Obsidian Manage: failed to read database', error);
      new Notice(this.t('管理数据读取失败，请检查数据文件夹中的 JSON 代码块'));
    }

    let finance = financeFile?.finance;
    if (!finance) finance = await this.importLegacyFunds();
    const data = normalizeData({
      projects: Array.isArray(management?.projects) ? management.projects : legacyData.projects,
      actions: Array.isArray(management?.actions) ? management.actions : legacyData.actions,
      ideas: Array.isArray(planning?.ideas) ? planning.ideas : legacyData.ideas,
      finance: finance || legacyData.finance
    });

    const databasesMissing = !management || !planning || !financeFile;
    if (databasesMissing && this.hasLegacyManagementData(data)) {
      this.data = data;
      await this.writeAllDatabases();
      new Notice(this.t(`数据已迁移到 ${this.getDataFolder()}`));
    }
    return data;
  }

  async writeAllDatabases() {
    await this.ensureFolder();
    await Promise.all([
      this.writeDatabase(MANAGEMENT_DATABASE, '项目与行动数据库', 'management', {
        projects: this.data.projects,
        actions: this.data.actions
      }, true),
      this.writeDatabase(PLANNING_DATABASE, '未来规划数据库', 'planning', {
        ideas: this.data.ideas
      }, true),
      this.writeDatabase(FINANCE_DATABASE, '个人资金数据库', 'finance', {
        finance: this.data.finance
      }, true)
    ]);
  }

  async reloadDataFromFiles() {
    try {
      const [management, planning, financeFile] = await Promise.all([
        this.readDatabase(MANAGEMENT_DATABASE, 'management'),
        this.readDatabase(PLANNING_DATABASE, 'planning'),
        this.readDatabase(FINANCE_DATABASE, 'finance')
      ]);
      if (!management || !planning || !financeFile?.finance) {
        throw new Error('数据文件不完整，请确认 management.md、planning.md 和 finance.md 都存在');
      }
      this.data = normalizeData({
        projects: management.projects,
        actions: management.actions,
        ideas: planning.ideas,
        finance: financeFile.finance
      });
      await this.saveData({ settings: this.settings });
      this.refreshViews();
      new Notice(this.t(`已从 ${this.getDataFolder()} 读取数据`));
      return true;
    } catch (error) {
      console.error('Open Obsidian Manage: failed to reload workspace data', error);
      new Notice(this.t(error.message || '读取数据失败，请检查数据文件夹中的 JSON 代码块'));
      return false;
    }
  }

  async setDataFolder(value) {
    const folder = normalizePath(String(value || '').trim() || DEFAULT_DATA_FOLDER).replace(/^\/+|\/+$/g, '');
    if (!folder) throw new Error('数据文件夹不能为空');
    this.settings.dataFolder = folder;
    await this.writeAllDatabases();
    await this.savePluginSettings({ refresh: false });
    this.refreshViews();
    new Notice(this.t(`数据已复制到 ${folder}，并设为新的主数据文件夹`));
  }

  async persist(message) {
    await this.writeAllDatabases();
    await this.saveData({ settings: this.settings });
    this.refreshViews();
    if (message) new Notice(this.t(message));
  }

  refreshViews() {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW_TYPE_MANAGE)) {
      if (leaf.view instanceof ManageView) leaf.view.render();
    }
  }

  async upsertProject(project) {
    const index = this.data.projects.findIndex(item => item.id === project.id);
    if (index >= 0) this.data.projects[index] = project;
    else this.data.projects.unshift(project);
    await this.persist(index >= 0 ? '项目已更新' : '项目已创建');
  }

  async upsertAction(action) {
    const index = this.data.actions.findIndex(item => item.id === action.id);
    if (index >= 0) this.data.actions[index] = action;
    else this.data.actions.unshift(action);
    await this.persist(index >= 0 ? '行动已更新' : '行动已创建');
  }

  async upsertIdea(idea) {
    const index = this.data.ideas.findIndex(item => item.id === idea.id);
    if (index >= 0) this.data.ideas[index] = idea;
    else this.data.ideas.unshift(idea);
    await this.persist(index >= 0 ? '想法已更新' : '想法已记录');
  }

  async deleteProject(id) {
    this.data.projects = this.data.projects.filter(item => item.id !== id);
    this.data.actions = this.data.actions.map(action =>
      action.projectId === id ? { ...action, projectId: '' } : action
    );
    await this.persist('项目已删除，关联行动已保留');
  }

  async deleteAction(id) {
    this.data.actions = this.data.actions.filter(item => item.id !== id);
    await this.persist('行动已删除');
  }

  async deleteIdea(id) {
    this.data.ideas = this.data.ideas.filter(item => item.id !== id);
    await this.persist('想法已删除');
  }

  async toggleAction(id) {
    const action = this.data.actions.find(item => item.id === id);
    if (!action) return;
    action.status = action.status === 'done' ? 'todo' : 'done';
    action.updatedAt = today();
    await this.persist(action.status === 'done' ? '行动已完成' : '行动已重新打开');
  }

  async promoteIdea(id) {
    const idea = this.data.ideas.find(item => item.id === id);
    if (!idea || idea.status === 'promoted') return;
    const project = {
      id: uid('project'),
      title: idea.title,
      outcome: idea.problem || idea.value || '',
      owner: '',
      status: 'planned',
      priority: idea.priority || 'P2',
      deadline: '',
      nextAction: idea.nextExperiment || '',
      createdAt: today(),
      updatedAt: today()
    };
    this.data.projects.unshift(project);
    idea.status = 'promoted';
    idea.projectId = project.id;
    idea.updatedAt = today();
    await this.persist('想法已提升为项目');
  }

  getFinanceSummary(records = this.data.finance.records) {
    const summary = { currentAccount: 0, creditCard: 0, expense: 0, income: 0, loanOut: 0 };
    for (const record of records) {
      const amount = Number(record.amount) || 0;
      if (record.type === 'income') {
        summary.currentAccount += amount;
        summary.income += amount;
      } else if (record.type === 'expense') {
        summary.currentAccount -= amount;
        summary.expense += amount;
      } else if (record.type === 'credit_expense') {
        summary.creditCard += amount;
        summary.expense += amount;
      } else if (record.type === 'repay_credit') {
        summary.currentAccount -= amount;
        summary.creditCard -= amount;
      } else if (record.type === 'lend_out') {
        summary.currentAccount -= amount;
        summary.loanOut += amount;
      } else if (record.type === 'collect_loan') {
        summary.currentAccount += amount;
        summary.loanOut -= amount;
      } else if (record.type === 'account_adjust') {
        summary.currentAccount += amount;
      }
    }
    return summary;
  }

  getMonthFinanceSummary() {
    const month = today().slice(0, 7);
    return this.getFinanceSummary(this.data.finance.records.filter(record => String(record.date || '').startsWith(month)));
  }

  getExpectedExpense() {
    return Number(this.data.finance.expectedExpense || 0) +
      this.data.finance.fixedExpenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }

  getExpectedIncome() {
    return this.data.finance.expectedIncomes.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }

  async addFinanceRecord(record) {
    this.data.finance.records.unshift(record);
    await this.persist('资金记录已保存');
  }

  async deleteFinanceRecord(id) {
    this.data.finance.records = this.data.finance.records.filter(item => item.id !== id);
    await this.persist('资金记录已删除');
  }

  async addFixedExpense(item) {
    this.data.finance.fixedExpenses.unshift(item);
    await this.persist('固定支出已保存');
  }

  async deleteFixedExpense(id) {
    this.data.finance.fixedExpenses = this.data.finance.fixedExpenses.filter(item => item.id !== id);
    await this.persist('固定支出已删除');
  }

  async addExpectedIncome(item) {
    this.data.finance.expectedIncomes.unshift(item);
    await this.persist('预计收入已保存');
  }

  async deleteExpectedIncome(id) {
    this.data.finance.expectedIncomes = this.data.finance.expectedIncomes.filter(item => item.id !== id);
    await this.persist('预计收入已删除');
  }
};

class ManageSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.addClass('oom-native-settings');
    containerEl.createEl('h2', { text: 'Open Obsidian Manage' });
    containerEl.createEl('p', {
      text: '项目、资金、图片整理和思维导图统一由一个插件管理。',
      cls: 'setting-item-description'
    });

    containerEl.createEl('h3', { text: '界面与数据' });
    new Setting(containerEl)
      .setName('界面语言')
      .setDesc('切换管理界面的显示语言。')
      .addDropdown(dropdown => dropdown
        .addOption('zh', '中文（简体）')
        .addOption('en', 'English')
        .setValue(this.plugin.settings.language)
        .onChange(value => this.plugin.setLanguage(value)));

    let nextFolder = this.plugin.getDataFolder();
    new Setting(containerEl)
      .setName('数据文件夹')
      .setDesc('包含 management.md、planning.md 和 finance.md。修改时会把当前数据复制到新文件夹，不删除旧目录。')
      .addText(text => text
        .setPlaceholder(DEFAULT_DATA_FOLDER)
        .setValue(nextFolder)
        .onChange(value => {
          nextFolder = value;
        }))
      .addButton(button => button
        .setButtonText('保存并迁移')
        .setCta()
        .onClick(async () => {
          try {
            await this.plugin.setDataFolder(nextFolder);
            this.display();
          } catch (error) {
            console.error(error);
            new Notice(this.plugin.t(error.message || '数据文件夹设置失败'));
          }
        }));

    containerEl.createEl('h3', { text: '图片与附件' });
    new Setting(containerEl)
      .setName('启用自动图片重命名')
      .setDesc('新建或粘贴 PNG、JPG、JPEG 时，按当前笔记名和六位序号自动整理。')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.imageRename.enabled)
        .onChange(async value => {
          this.plugin.settings.imageRename.enabled = value;
          await this.plugin.savePluginSettings();
        }));

    let imageFolder = this.plugin.settings.imageRename.targetFolder;
    new Setting(containerEl)
      .setName('图片目标文件夹')
      .setDesc('默认保存到 Archive/img；可填写其他库内目录。')
      .addText(text => text
        .setPlaceholder('Archive/img')
        .setValue(imageFolder)
        .onChange(value => {
          imageFolder = value;
        }))
      .addButton(button => button
        .setButtonText('保存')
        .onClick(async () => {
          this.plugin.settings.imageRename.targetFolder = imageFolder;
          await this.plugin.savePluginSettings();
        }));

    new Setting(containerEl)
      .setName('Canvas 图片文件名')
      .setDesc('控制 Canvas 图片节点文件名的显示方式。')
      .addDropdown(dropdown => dropdown
        .addOption('show', '始终显示')
        .addOption('hover', '悬停显示')
        .addOption('hide', '隐藏')
        .setValue(this.plugin.settings.imageRename.filenameDisplayMode)
        .onChange(async value => {
          this.plugin.settings.imageRename.filenameDisplayMode = value;
          await this.plugin.savePluginSettings({ refresh: false });
        }));

    new Setting(containerEl)
      .setName('在文件列表隐藏 PNG')
      .setDesc('只在界面上隐藏，不会删除文件。')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.imageRename.hidePngInFileList)
        .onChange(async value => {
          this.plugin.settings.imageRename.hidePngInFileList = value;
          await this.plugin.savePluginSettings({ refresh: false });
        }));

    new Setting(containerEl)
      .setName('整理当前笔记图片')
      .setDesc('检查 Markdown 或 Canvas 引用，并按出现顺序统一重命名。')
      .addButton(button => button
        .setButtonText('检查并整理')
        .setCta()
        .onClick(() => this.plugin.imageRename.renameImagesInActiveNote()));

    new Setting(containerEl)
      .setName('创建默认 Files.base')
      .setDesc('创建排除 PNG 和 Base 文件的 Obsidian Bases 默认视图。')
      .addButton(button => button
        .setButtonText('创建 Base')
        .onClick(() => this.plugin.imageRename.createDefaultBase()));

    containerEl.createEl('h3', { text: '思维导图' });
    new Setting(containerEl)
      .setName('启用思维导图')
      .setDesc('将 Markdown 标题和缩进列表渲染为可交互 SVG 思维导图。')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.mindmap.enabled)
        .onChange(async value => {
          this.plugin.settings.mindmap.enabled = value;
          await this.plugin.savePluginSettings();
        }));

    new Setting(containerEl)
      .setName('导图方向')
      .setDesc('选择从左向右或从上向下展开。')
      .addDropdown(dropdown => dropdown
        .addOption('horizontal', '横向')
        .addOption('vertical', '纵向')
        .setValue(this.plugin.settings.mindmap.direction)
        .onChange(async value => {
          this.plugin.settings.mindmap.direction = value;
          await this.plugin.savePluginSettings({ refresh: false });
        }));

    new Setting(containerEl)
      .setName('初始展开层级')
      .setDesc('-1 表示全部展开。')
      .addDropdown(dropdown => {
        dropdown.addOption('-1', '全部');
        for (let level = 1; level <= 8; level += 1) dropdown.addOption(String(level), String(level));
        dropdown
          .setValue(String(this.plugin.settings.mindmap.initialExpandLevel))
          .onChange(async value => {
            this.plugin.settings.mindmap.initialExpandLevel = Number(value);
            await this.plugin.savePluginSettings({ refresh: false });
          });
      });

    new Setting(containerEl)
      .setName('显示导图工具栏')
      .setDesc('显示适配、展开、折叠和缩放按钮。')
      .addToggle(toggle => toggle
        .setValue(this.plugin.settings.mindmap.showToolbar)
        .onChange(async value => {
          this.plugin.settings.mindmap.showToolbar = value;
          await this.plugin.savePluginSettings({ refresh: false });
        }));

    new Setting(containerEl)
      .setName('打开思维导图')
      .setDesc('跟随当前 Markdown 文件，或将当前文件固定到一个导图页签。')
      .addButton(button => button
        .setButtonText('跟随当前文件')
        .onClick(() => this.plugin.mindmap.open(false)))
      .addButton(button => button
        .setButtonText('固定当前文件')
        .setCta()
        .onClick(() => this.plugin.mindmap.open(true)));

    new Setting(containerEl)
      .setName('思维导图快捷键')
      .setDesc('默认 Ctrl/Cmd + Shift + M；可在 Obsidian 的“快捷键”设置中修改。');

    this.plugin.localizeElement(containerEl);
  }
}

class LegacyManageView extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.section = 'overview';
    this.projectFilter = 'all';
    this.actionFilter = 'open';
  }

  getViewType() {
    return VIEW_TYPE_MANAGE;
  }

  getDisplayText() {
    return 'Open Obsidian Manage';
  }

  getIcon() {
    return 'panel-top-open';
  }

  async onOpen() {
    this.render();
  }

  render() {
    const root = this.containerEl.children[1];
    root.empty();
    root.addClass('oom-view');

    const shell = root.createDiv({ cls: 'oom-shell' });
    this.renderSidebar(shell);

    const workspace = shell.createDiv({ cls: 'oom-workspace' });
    this.renderHeader(workspace);
    const content = workspace.createDiv({ cls: 'oom-content' });

    if (this.section === 'overview') this.renderOverview(content);
    if (this.section === 'projects') this.renderProjects(content);
    if (this.section === 'actions') this.renderActions(content);
    if (this.section === 'ideas') this.renderIdeas(content);
  }

  renderSidebar(shell) {
    const sidebar = shell.createEl('aside', { cls: 'oom-sidebar' });
    const brand = sidebar.createDiv({ cls: 'oom-brand' });
    const mark = brand.createDiv({ cls: 'oom-brand-mark' });
    setIcon(mark, 'orbit');
    const brandCopy = brand.createDiv();
    brandCopy.createDiv({ text: 'Open Manage', cls: 'oom-brand-title' });
    brandCopy.createDiv({ text: '清晰地推进一件事', cls: 'oom-brand-subtitle' });

    const nav = sidebar.createEl('nav', { cls: 'oom-nav' });
    const items = [
      ['overview', 'layout-dashboard', '总览'],
      ['projects', 'folder-kanban', '项目'],
      ['actions', 'list-checks', '行动'],
      ['ideas', 'lightbulb', '想法']
    ];

    for (const [id, icon, label] of items) {
      const button = nav.createEl('button', {
        cls: `oom-nav-item ${this.section === id ? 'is-active' : ''}`,
        attr: { type: 'button' }
      });
      const iconEl = button.createSpan({ cls: 'oom-nav-icon' });
      setIcon(iconEl, icon);
      button.createSpan({ text: label });
      button.addEventListener('click', () => {
        this.section = id;
        this.render();
      });
    }

    const foot = sidebar.createDiv({ cls: 'oom-sidebar-foot' });
    const shield = foot.createSpan();
    setIcon(shield, 'shield-check');
    foot.createSpan({ text: '纯本地插件数据，不生成笔记文件' });
  }

  renderHeader(workspace) {
    const header = workspace.createEl('header', { cls: 'oom-header' });
    const copy = header.createDiv();
    const titles = {
      overview: ['管理总览', '聚焦结果、阻塞和马上要做的下一步'],
      projects: ['项目', '用明确的结果和完成标准管理投入'],
      actions: ['行动', '把下一步拆成可以真正完成的小任务'],
      ideas: ['想法', '先验证，再决定是否投入成为项目']
    };
    copy.createEl('h1', { text: titles[this.section][0] });
    copy.createEl('p', { text: titles[this.section][1] });

    const actions = header.createDiv({ cls: 'oom-header-actions' });
    iconButton(actions, 'download', this.plugin.t('读取数据'), '', () =>
      this.plugin.reloadDataFromFiles()
    );
    iconButton(actions, 'refresh-cw', '刷新', '', () => this.render());
    const addLabel = this.section === 'actions' ? '新建行动' : this.section === 'ideas' ? '记录想法' : '新建项目';
    const add = textButton(actions, `＋ ${addLabel}`, 'oom-primary-button', () => {
      if (this.section === 'actions') new ActionModal(this.app, this.plugin, null).open();
      else if (this.section === 'ideas') new IdeaModal(this.app, this.plugin, null).open();
      else new ProjectModal(this.app, this.plugin, null).open();
    });
    add.setAttr('aria-label', addLabel);
  }

  renderOverview(content) {
    const projects = this.plugin.data.projects;
    const actions = this.plugin.data.actions;
    const ideas = this.plugin.data.ideas;
    const openActions = actions.filter(item => item.status !== 'done');
    const blocked = projects.filter(item => item.status === 'blocked').length +
      actions.filter(item => item.status === 'blocked').length;

    const stats = content.createDiv({ cls: 'oom-stats' });
    this.statCard(stats, '进行中项目', projects.filter(item => item.status === 'active').length, 'folder-kanban', 'purple');
    this.statCard(stats, '待完成行动', openActions.length, 'list-checks', 'blue');
    this.statCard(stats, '当前阻塞', blocked, 'circle-alert', blocked ? 'red' : 'green');
    this.statCard(stats, '待评估想法', ideas.filter(item => item.status !== 'promoted').length, 'lightbulb', 'amber');

    const grid = content.createDiv({ cls: 'oom-overview-grid' });
    const focusPanel = this.panel(grid, '本周聚焦', '最多展示 3 个最重要行动');
    const focus = [...openActions].sort(sortByPriorityAndDue).slice(0, 3);
    if (!focus.length) {
      this.emptyState(focusPanel, 'target', '还没有待执行行动', '先创建一个足够具体的下一步。');
    } else {
      const list = focusPanel.createDiv({ cls: 'oom-focus-list' });
      for (const action of focus) this.renderFocusItem(list, action);
    }

    const healthPanel = this.panel(grid, '项目健康度', '检查是否拥有清晰下一步');
    const activeProjects = projects.filter(item => ['active', 'blocked', 'planned'].includes(item.status));
    if (!activeProjects.length) {
      this.emptyState(healthPanel, 'folder-plus', '还没有项目', '从一个明确结果开始建立项目。');
    } else {
      const list = healthPanel.createDiv({ cls: 'oom-health-list' });
      for (const project of activeProjects.slice(0, 5)) {
        const row = list.createDiv({ cls: 'oom-health-row' });
        const main = row.createDiv({ cls: 'oom-health-main' });
        main.createDiv({ text: project.title, cls: 'oom-health-title' });
        main.createDiv({
          text: project.nextAction || '缺少下一步',
          cls: `oom-health-next ${project.nextAction ? '' : 'is-missing'}`
        });
        row.createSpan({
          text: statusLabel(project.status, PROJECT_STATUSES),
          cls: `oom-badge is-${project.status}`
        });
      }
    }

    const lower = content.createDiv({ cls: 'oom-lower-grid' });
    const blockedPanel = this.panel(lower, '需要处理的阻塞', '先解除阻塞，再增加任务');
    const blockers = [
      ...projects.filter(item => item.status === 'blocked').map(item => ({ ...item, kind: '项目' })),
      ...actions.filter(item => item.status === 'blocked').map(item => ({ ...item, kind: '行动' }))
    ];
    if (!blockers.length) {
      this.emptyState(blockedPanel, 'shield-check', '当前没有阻塞', '保持下一步明确即可。');
    } else {
      for (const item of blockers.slice(0, 4)) {
        const row = blockedPanel.createDiv({ cls: 'oom-blocker-row' });
        row.createSpan({ text: item.kind, cls: 'oom-mini-label' });
        row.createSpan({ text: item.title, cls: 'oom-blocker-title' });
        row.createSpan({ text: item.blocker || '未填写阻塞原因', cls: 'oom-blocker-reason' });
      }
    }

    const ideaPanel = this.panel(lower, '最近想法', '先做最小验证');
    const recentIdeas = ideas.filter(item => item.status !== 'promoted').slice(0, 4);
    if (!recentIdeas.length) {
      this.emptyState(ideaPanel, 'sparkles', '想法收件箱为空', '随时记录，但不要急着全部立项。');
    } else {
      for (const idea of recentIdeas) {
        const row = ideaPanel.createDiv({ cls: 'oom-idea-row' });
        row.createDiv({ text: idea.title, cls: 'oom-idea-row-title' });
        row.createDiv({ text: idea.nextExperiment || '还没有最小实验', cls: 'oom-muted' });
      }
    }
  }

  statCard(parent, label, value, icon, tone) {
    const card = parent.createDiv({ cls: `oom-stat-card is-${tone}` });
    const iconEl = card.createDiv({ cls: 'oom-stat-icon' });
    setIcon(iconEl, icon);
    const copy = card.createDiv();
    copy.createDiv({ text: String(value), cls: 'oom-stat-value' });
    copy.createDiv({ text: label, cls: 'oom-stat-label' });
  }

  panel(parent, title, subtitle) {
    const panel = parent.createEl('section', { cls: 'oom-panel' });
    const heading = panel.createDiv({ cls: 'oom-panel-heading' });
    heading.createEl('h2', { text: title });
    heading.createSpan({ text: subtitle });
    return panel;
  }

  emptyState(parent, icon, title, text) {
    const box = parent.createDiv({ cls: 'oom-empty' });
    const iconEl = box.createDiv({ cls: 'oom-empty-icon' });
    setIcon(iconEl, icon);
    box.createDiv({ text: title, cls: 'oom-empty-title' });
    box.createDiv({ text, cls: 'oom-empty-text' });
  }

  renderFocusItem(parent, action) {
    const row = parent.createDiv({ cls: 'oom-focus-item' });
    const toggle = row.createEl('button', {
      cls: 'oom-check',
      attr: { type: 'button', 'aria-label': '标记完成' }
    });
    setIcon(toggle, 'circle');
    toggle.addEventListener('click', () => this.plugin.toggleAction(action.id));

    const copy = row.createDiv({ cls: 'oom-focus-copy' });
    copy.createDiv({ text: action.title, cls: 'oom-focus-title' });
    const project = this.plugin.data.projects.find(item => item.id === action.projectId);
    copy.createDiv({ text: project?.title || '独立行动', cls: 'oom-muted' });

    const meta = row.createDiv({ cls: 'oom-focus-meta' });
    meta.createSpan({ text: action.priority, cls: `oom-priority is-${action.priority.toLowerCase()}` });
    meta.createSpan({
      text: dueLabel(action.deadline),
      cls: isOverdue(action.deadline, action.status) ? 'is-overdue' : ''
    });
  }

  renderProjects(content) {
    this.renderFilterBar(content, [
      ['all', '全部'],
      ['active', '进行中'],
      ['planned', '待开始'],
      ['blocked', '阻塞'],
      ['done', '已完成']
    ], this.projectFilter, value => {
      this.projectFilter = value;
      this.render();
    });

    const projects = this.plugin.data.projects.filter(project =>
      this.projectFilter === 'all' || project.status === this.projectFilter
    );
    if (!projects.length) {
      this.emptyState(content, 'folder-plus', '这个视图还没有项目', '新建项目，写清结果、负责人和下一步。');
      return;
    }

    const grid = content.createDiv({ cls: 'oom-project-grid' });
    for (const project of projects) {
      const card = grid.createEl('article', { cls: `oom-project-card is-${project.status}` });
      const top = card.createDiv({ cls: 'oom-card-top' });
      const titleWrap = top.createDiv();
      titleWrap.createSpan({ text: project.priority, cls: `oom-priority is-${project.priority.toLowerCase()}` });
      titleWrap.createEl('h2', { text: project.title });
      top.createSpan({ text: statusLabel(project.status, PROJECT_STATUSES), cls: `oom-badge is-${project.status}` });

      card.createEl('p', {
        text: project.outcome || '尚未填写目标结果',
        cls: `oom-project-outcome ${project.outcome ? '' : 'is-missing'}`
      });

      const projectActions = this.plugin.data.actions.filter(item => item.projectId === project.id);
      const done = projectActions.filter(item => item.status === 'done').length;
      const progress = projectActions.length ? Math.round(done / projectActions.length * 100) : 0;
      const progressRow = card.createDiv({ cls: 'oom-progress-row' });
      progressRow.createSpan({ text: `${done}/${projectActions.length} 个行动` });
      progressRow.createSpan({ text: `${progress}%` });
      const track = card.createDiv({ cls: 'oom-progress-track' });
      track.createDiv({ cls: 'oom-progress-fill', attr: { style: `width:${progress}%` } });

      const facts = card.createDiv({ cls: 'oom-project-facts' });
      this.fact(facts, 'user-round', project.owner || '未指定负责人');
      this.fact(facts, 'calendar-days', dueLabel(project.deadline), isOverdue(project.deadline, project.status));

      const next = card.createDiv({ cls: 'oom-next-action' });
      next.createSpan({ text: '下一步' });
      next.createDiv({ text: project.nextAction || '尚未填写下一步', cls: project.nextAction ? '' : 'is-missing' });

      if (project.status === 'blocked') {
        const blocker = card.createDiv({ cls: 'oom-blocker-callout' });
        const icon = blocker.createSpan();
        setIcon(icon, 'circle-alert');
        blocker.createSpan({ text: project.blocker || '请补充阻塞原因' });
      }

      const buttons = card.createDiv({ cls: 'oom-card-actions' });
      textButton(buttons, '编辑', 'oom-secondary-button', () => new ProjectModal(this.app, this.plugin, project).open());
      textButton(buttons, '添加行动', 'oom-secondary-button', () => new ActionModal(this.app, this.plugin, null, project.id).open());
      iconButton(buttons, 'trash-2', '删除项目', 'oom-danger-button', () => {
        new ConfirmModal(this.app, '删除项目？', '关联行动会被保留，但不再归属该项目。', () => this.plugin.deleteProject(project.id)).open();
      });
    }
  }

  renderActions(content) {
    this.renderFilterBar(content, [
      ['open', '未完成'],
      ['doing', '进行中'],
      ['blocked', '阻塞'],
      ['done', '已完成'],
      ['all', '全部']
    ], this.actionFilter, value => {
      this.actionFilter = value;
      this.render();
    });

    let actions = [...this.plugin.data.actions];
    if (this.actionFilter === 'open') actions = actions.filter(item => item.status !== 'done');
    else if (this.actionFilter !== 'all') actions = actions.filter(item => item.status === this.actionFilter);
    actions.sort(sortByPriorityAndDue);

    if (!actions.length) {
      this.emptyState(content, 'list-plus', '这个视图还没有行动', '创建一个可以在一次专注时间内完成的动作。');
      return;
    }

    const table = content.createDiv({ cls: 'oom-action-table' });
    const header = table.createDiv({ cls: 'oom-action-row oom-action-header' });
    ['状态', '行动', '项目', '优先级', '截止日期', ''].forEach(text => header.createSpan({ text }));

    for (const action of actions) {
      const row = table.createDiv({ cls: `oom-action-row ${action.status === 'done' ? 'is-done' : ''}` });
      const toggleWrap = row.createDiv();
      const toggle = toggleWrap.createEl('button', {
        cls: 'oom-check',
        attr: { type: 'button', 'aria-label': action.status === 'done' ? '重新打开' : '标记完成' }
      });
      setIcon(toggle, action.status === 'done' ? 'circle-check-big' : 'circle');
      toggle.addEventListener('click', () => this.plugin.toggleAction(action.id));

      const title = row.createDiv({ cls: 'oom-action-title-cell' });
      title.createDiv({ text: action.title, cls: 'oom-action-title' });
      if (action.note) title.createDiv({ text: action.note, cls: 'oom-muted' });

      const project = this.plugin.data.projects.find(item => item.id === action.projectId);
      row.createSpan({ text: project?.title || '独立行动', cls: 'oom-action-project' });
      row.createSpan({ text: action.priority, cls: `oom-priority is-${action.priority.toLowerCase()}` });
      row.createSpan({
        text: dueLabel(action.deadline),
        cls: isOverdue(action.deadline, action.status) ? 'is-overdue' : ''
      });

      const actionsCell = row.createDiv({ cls: 'oom-row-actions' });
      iconButton(actionsCell, 'pencil', '编辑', '', () => new ActionModal(this.app, this.plugin, action).open());
      iconButton(actionsCell, 'trash-2', '删除', 'oom-danger-button', () => {
        new ConfirmModal(this.app, '删除行动？', '这项操作无法撤销。', () => this.plugin.deleteAction(action.id)).open();
      });
    }
  }

  renderIdeas(content) {
    const ideas = this.plugin.data.ideas;
    if (!ideas.length) {
      this.emptyState(content, 'lightbulb', '想法收件箱为空', '先记录问题和最小实验，不需要马上立项。');
      return;
    }

    const grid = content.createDiv({ cls: 'oom-idea-grid' });
    for (const idea of ideas) {
      const card = grid.createEl('article', { cls: `oom-idea-card ${idea.status === 'promoted' ? 'is-promoted' : ''}` });
      const top = card.createDiv({ cls: 'oom-card-top' });
      const title = top.createDiv();
      title.createSpan({ text: idea.priority, cls: `oom-priority is-${idea.priority.toLowerCase()}` });
      title.createEl('h2', { text: idea.title });
      top.createSpan({
        text: idea.status === 'promoted' ? '已立项' : '待验证',
        cls: `oom-badge ${idea.status === 'promoted' ? 'is-done' : 'is-planned'}`
      });

      this.ideaSection(card, '要解决的问题', idea.problem || '尚未填写');
      this.ideaSection(card, '预期价值', idea.value || '尚未填写');
      this.ideaSection(card, '最小实验', idea.nextExperiment || '尚未填写');

      const buttons = card.createDiv({ cls: 'oom-card-actions' });
      if (idea.status !== 'promoted') {
        textButton(buttons, '提升为项目', 'oom-primary-button oom-small-button', () => this.plugin.promoteIdea(idea.id));
      }
      textButton(buttons, '编辑', 'oom-secondary-button', () => new IdeaModal(this.app, this.plugin, idea).open());
      iconButton(buttons, 'trash-2', '删除想法', 'oom-danger-button', () => {
        new ConfirmModal(this.app, '删除想法？', '这项操作无法撤销。', () => this.plugin.deleteIdea(idea.id)).open();
      });
    }
  }

  ideaSection(parent, label, value) {
    const section = parent.createDiv({ cls: 'oom-idea-section' });
    section.createDiv({ text: label, cls: 'oom-mini-label' });
    section.createDiv({ text: value });
  }

  fact(parent, icon, text, danger) {
    const fact = parent.createDiv({ cls: `oom-fact ${danger ? 'is-overdue' : ''}` });
    const iconEl = fact.createSpan();
    setIcon(iconEl, icon);
    fact.createSpan({ text });
  }

  renderFilterBar(parent, items, selected, onSelect) {
    const bar = parent.createDiv({ cls: 'oom-filter-bar' });
    for (const [id, label] of items) {
      textButton(bar, label, `oom-filter ${selected === id ? 'is-active' : ''}`, () => onSelect(id));
    }
  }
}

class ManageView extends LegacyManageView {
  constructor(leaf, plugin) {
    super(leaf, plugin);
    this.primary = 'overview';
    this.secondary = {
      projects: 'overview',
      planning: 'overview',
      finance: 'overview'
    };
    this.financeTypeFilter = 'all';
  }

  render() {
    const root = this.containerEl.children[1];
    root.empty();
    root.addClass('oom-view');

    const shell = root.createDiv({ cls: 'oom-shell oom-multifunction-shell' });
    this.renderPrimaryNavigation(shell);

    const main = shell.createEl('main', { cls: 'oom-module-main' });
    const subpages = this.getSubpages();
    if (subpages.length) this.renderSecondaryNavigation(main, subpages);
    this.renderModuleHeader(main);

    const content = main.createDiv({ cls: 'oom-content oom-module-content' });
    this.renderActivePage(content);
    this.plugin.localizeElement(root);
  }

  getSubpages() {
    const pages = {
      projects: [
        ['overview', '项目概览'],
        ['tasks', '任务'],
        ['issues', '问题与阻塞'],
        ['materials', '项目资料']
      ],
      planning: [
        ['overview', '规划概览'],
        ['goals', '目标'],
        ['timeline', '时间线'],
        ['ideas', '想法']
      ],
      finance: [
        ['overview', '概览'],
        ['records', '最近记录'],
        ['fixed', '固定支出'],
        ['income', '预计收入'],
        ['accounts', '账户管理']
      ]
    };
    return pages[this.primary] || [];
  }

  activePage() {
    return this.secondary[this.primary] || 'overview';
  }

  renderPrimaryNavigation(shell) {
    const sidebar = shell.createEl('aside', { cls: 'oom-sidebar oom-primary-sidebar' });
    const brand = sidebar.createDiv({ cls: 'oom-brand' });
    const mark = brand.createDiv({ cls: 'oom-brand-mark' });
    setIcon(mark, 'orbit');
    const copy = brand.createDiv({ cls: 'oom-brand-copy' });
    copy.createDiv({ text: 'Open Manage', cls: 'oom-brand-title' });

    sidebar.createDiv({ text: '工作空间', cls: 'oom-nav-caption' });
    const nav = sidebar.createEl('nav', { cls: 'oom-nav oom-primary-nav' });
    const modules = [
      ['overview', 'layout-dashboard', '总览'],
      ['projects', 'folder-kanban', '项目进度'],
      ['planning', 'route', '未来规划'],
      ['finance', 'wallet-cards', '个人资金'],
      ['settings', 'settings-2', '设置']
    ];

    for (const [id, icon, label] of modules) {
      const button = nav.createEl('button', {
        cls: `oom-nav-item oom-primary-nav-item ${this.primary === id ? 'is-active' : ''}`,
        attr: { type: 'button', 'aria-label': label, title: label }
      });
      if (this.primary === id) button.setAttr('aria-current', 'page');
      const iconEl = button.createSpan({ cls: 'oom-nav-icon' });
      setIcon(iconEl, icon);
      button.createSpan({ text: label, cls: 'oom-nav-label' });
      button.addEventListener('click', () => {
        this.primary = id;
        this.render();
      });
    }
  }

  renderSecondaryNavigation(main, pages) {
    const wrap = main.createDiv({ cls: 'oom-secondary-wrap' });
    const nav = wrap.createEl('nav', { cls: 'oom-secondary-nav', attr: { 'aria-label': '页面导航' } });
    const active = this.activePage();
    for (const [id, label] of pages) {
      const button = nav.createEl('button', {
        text: label,
        cls: `oom-secondary-item ${active === id ? 'is-active' : ''}`,
        attr: { type: 'button' }
      });
      if (active === id) button.setAttr('aria-current', 'page');
      button.addEventListener('click', () => {
        this.secondary[this.primary] = id;
        this.render();
      });
    }
  }

  getPageMeta() {
    const page = this.activePage();
    const meta = {
      overview: {
        overview: ['全局概览', '集中查看项目、行动、规划和资金状态']
      },
      projects: {
        overview: ['项目概览', '查看项目状态、进度、负责人和明确下一步'],
        tasks: ['任务', '按优先级和截止日期推进具体行动'],
        issues: ['问题与阻塞', '集中处理影响项目推进的问题'],
        materials: ['项目资料', '汇总每个项目的目标、结果和执行上下文']
      },
      planning: {
        overview: ['规划概览', '把未来方向收敛为可验证、可安排的计划'],
        goals: ['目标', '从项目结果中提取当前目标'],
        timeline: ['时间线', '按日期查看计划和关键节点'],
        ideas: ['想法', '先验证问题和价值，再决定是否立项']
      },
      finance: {
        overview: ['个人资金概览', '查看账户、收支、固定支出和预计收入'],
        records: ['最近记录', '筛选和查看全部资金流水'],
        fixed: ['固定支出', '管理未来已确定的固定支出'],
        income: ['预计收入', '管理未来已确定但尚未到账的收入'],
        accounts: ['账户管理', '查看账户余额、信用卡和借出资金']
      },
      settings: {
        overview: ['设置', '查看插件数据与界面信息']
      }
    };
    return meta[this.primary]?.[page] || ['管理中枢', ''];
  }

  renderModuleHeader(main) {
    const [title, subtitle] = this.getPageMeta();
    const header = main.createEl('header', { cls: 'oom-header oom-module-header' });
    const copy = header.createDiv({ cls: 'oom-header-copy' });
    const moduleLabels = {
      overview: '工作台',
      projects: '项目进度',
      planning: '未来规划',
      finance: '个人资金',
      settings: '系统'
    };
    copy.createDiv({ text: moduleLabels[this.primary], cls: 'oom-page-eyebrow' });
    copy.createEl('h1', { text: title });
    copy.createEl('p', { text: subtitle });

    const actions = header.createDiv({ cls: 'oom-header-actions' });
    iconButton(actions, 'download', this.plugin.t('读取数据'), '', () =>
      this.plugin.reloadDataFromFiles()
    );
    iconButton(actions, 'refresh-cw', '刷新', '', () => this.render());

    const page = this.activePage();
    if (this.primary === 'finance') {
      if (page === 'fixed') {
        textButton(actions, '设置预计支出', 'oom-secondary-button', () =>
          new ExpectedExpenseModal(this.app, this.plugin).open()
        );
        textButton(actions, '＋ 添加固定支出', 'oom-primary-button', () =>
          new FinanceItemModal(this.app, this.plugin, 'fixed').open()
        );
      } else if (page === 'income') {
        textButton(actions, '＋ 添加预计收入', 'oom-primary-button', () =>
          new FinanceItemModal(this.app, this.plugin, 'income').open()
        );
      } else {
        textButton(actions, '＋ 记一笔', 'oom-primary-button', () =>
          new FinanceRecordModal(this.app, this.plugin).open()
        );
      }
    } else if (this.primary === 'projects') {
      if (page === 'tasks') {
        textButton(actions, '＋ 新建任务', 'oom-primary-button', () =>
          new ActionModal(this.app, this.plugin, null).open()
        );
      } else {
        textButton(actions, '＋ 新建项目', 'oom-primary-button', () =>
          new ProjectModal(this.app, this.plugin, null).open()
        );
      }
    } else if (this.primary === 'planning') {
      textButton(actions, '＋ 记录想法', 'oom-primary-button', () =>
        new IdeaModal(this.app, this.plugin, null).open()
      );
    } else if (this.primary === 'overview') {
      textButton(actions, '＋ 新建项目', 'oom-primary-button', () =>
        new ProjectModal(this.app, this.plugin, null).open()
      );
    }
  }

  renderActivePage(content) {
    const page = this.activePage();
    if (this.primary === 'overview') {
      this.renderExecutiveOverview(content);
      return;
    }
    if (this.primary === 'projects') {
      if (page === 'overview') super.renderProjects(content);
      if (page === 'tasks') super.renderActions(content);
      if (page === 'issues') this.renderIssues(content);
      if (page === 'materials') this.renderProjectMaterials(content);
      return;
    }
    if (this.primary === 'planning') {
      if (page === 'overview') this.renderPlanningOverview(content);
      if (page === 'goals') this.renderGoals(content);
      if (page === 'timeline') this.renderTimeline(content);
      if (page === 'ideas') super.renderIdeas(content);
      return;
    }
    if (this.primary === 'finance') {
      if (page === 'overview') this.renderFinanceOverview(content);
      if (page === 'records') this.renderFinanceRecords(content);
      if (page === 'fixed') this.renderFixedExpenses(content);
      if (page === 'income') this.renderExpectedIncomes(content);
      if (page === 'accounts') this.renderAccountManagement(content);
      return;
    }
    this.renderSettings(content);
  }

  renderExecutiveOverview(content) {
    const projects = this.plugin.data.projects;
    const actions = this.plugin.data.actions;
    const ideas = this.plugin.data.ideas;
    const openActions = actions.filter(item => item.status !== 'done').sort(sortByPriorityAndDue);
    const primaryAction = openActions[0];
    const primaryProject = primaryAction
      ? projects.find(item => item.id === primaryAction.projectId)
      : null;

    const hero = content.createEl('section', { cls: 'oom-command-hero' });
    const focus = hero.createDiv({ cls: 'oom-command-focus' });
    focus.createDiv({ text: '当前最重要的一步', cls: 'oom-command-kicker' });
    focus.createEl('h2', { text: primaryAction?.title || '先创建一个清晰、可以立即执行的行动' });
    focus.createDiv({
      text: primaryProject?.title || (primaryAction ? '独立行动' : '管理从明确下一步开始'),
      cls: 'oom-command-context'
    });
    const focusMeta = focus.createDiv({ cls: 'oom-command-meta' });
    if (primaryAction) {
      focusMeta.createSpan({
        text: primaryAction.priority,
        cls: `oom-priority is-${primaryAction.priority.toLowerCase()}`
      });
      focusMeta.createSpan({ text: dueLabel(primaryAction.deadline) });
      textButton(focusMeta, '标记完成', 'oom-focus-complete', () =>
        this.plugin.toggleAction(primaryAction.id)
      );
    } else {
      textButton(focusMeta, '新建行动', 'oom-focus-complete', () =>
        new ActionModal(this.app, this.plugin, null).open()
      );
    }

    const summary = hero.createDiv({ cls: 'oom-command-summary' });
    [
      ['进行中项目', projects.filter(item => item.status === 'active').length, 'folder-kanban'],
      ['待完成行动', openActions.length, 'list-checks'],
      ['当前阻塞', projects.filter(item => item.status === 'blocked').length + actions.filter(item => item.status === 'blocked').length, 'circle-alert'],
      ['待验证想法', ideas.filter(item => item.status !== 'promoted').length, 'lightbulb']
    ].forEach(([label, value, icon]) => {
      const item = summary.createDiv({ cls: 'oom-command-stat' });
      const iconEl = item.createDiv({ cls: 'oom-command-stat-icon' });
      setIcon(iconEl, icon);
      const copy = item.createDiv();
      copy.createDiv({ text: String(value), cls: 'oom-command-stat-value' });
      copy.createDiv({ text: label, cls: 'oom-command-stat-label' });
    });

    const grid = content.createDiv({ cls: 'oom-command-grid' });
    const projectPanel = this.panel(grid, '正在推进', '活跃项目与完成进度');
    const active = projects.filter(item => ['active', 'blocked'].includes(item.status)).slice(0, 5);
    if (!active.length) {
      this.emptyState(projectPanel, 'folder-plus', '没有正在推进的项目', '只启动真正需要投入的项目。');
    } else {
      for (const project of active) {
        const projectActions = actions.filter(item => item.projectId === project.id);
        const done = projectActions.filter(item => item.status === 'done').length;
        const progress = projectActions.length ? Math.round(done / projectActions.length * 100) : 0;
        const row = projectPanel.createDiv({ cls: 'oom-command-project' });
        const copy = row.createDiv({ cls: 'oom-command-project-copy' });
        copy.createDiv({ text: project.title, cls: 'oom-health-title' });
        copy.createDiv({ text: project.nextAction || '缺少下一步', cls: 'oom-muted' });
        const progressWrap = row.createDiv({ cls: 'oom-command-progress' });
        progressWrap.createSpan({ text: `${progress}%` });
        const track = progressWrap.createDiv({ cls: 'oom-progress-track' });
        track.createDiv({ cls: 'oom-progress-fill', attr: { style: `width:${progress}%` } });
      }
    }

    const actionPanel = this.panel(grid, '接下来', '按优先级与截止日期排序');
    if (!openActions.length) {
      this.emptyState(actionPanel, 'circle-check-big', '行动已经清空', '保持克制，不要为了忙碌而增加任务。');
    } else {
      for (const action of openActions.slice(0, 5)) this.renderFocusItem(actionPanel, action);
    }

    const financePanel = this.panel(grid, '资金快照', '当前账户与未来预期');
    const finance = this.plugin.getFinanceSummary();
    const financeRows = [
      ['当前账户', finance.currentAccount, 'wallet'],
      ['预计支出', this.plugin.getExpectedExpense(), 'calendar-minus'],
      ['预计收入', this.plugin.getExpectedIncome(), 'calendar-plus']
    ];
    for (const [label, value, icon] of financeRows) {
      const row = financePanel.createDiv({ cls: 'oom-command-money-row' });
      const iconEl = row.createDiv({ cls: 'oom-command-money-icon' });
      setIcon(iconEl, icon);
      row.createSpan({ text: label });
      const amount = row.createSpan({ cls: 'oom-command-money-value' });
      amount.createSpan({ text: formatMoney(value) });
      amount.createSpan({ text: '元', cls: 'oom-money-unit' });
    }
    const openFinance = financePanel.createEl('button', {
      text: '进入个人资金',
      cls: 'oom-panel-action'
    });
    openFinance.addEventListener('click', () => {
      this.primary = 'finance';
      this.render();
    });
  }

  renderGlobalFinanceStrip(content) {
    const summary = this.plugin.getFinanceSummary();
    const strip = content.createEl('section', { cls: 'oom-global-finance-strip' });
    const heading = strip.createDiv({ cls: 'oom-panel-heading' });
    heading.createEl('h2', { text: '个人资金' });
    const link = heading.createEl('button', { text: '查看资金模块 →', cls: 'oom-inline-link' });
    link.addEventListener('click', () => {
      this.primary = 'finance';
      this.render();
    });
    const metrics = strip.createDiv({ cls: 'oom-compact-metrics' });
    this.moneyMetric(metrics, '当前账户', summary.currentAccount, 'wallet', 'purple');
    this.moneyMetric(metrics, '信用卡待还', summary.creditCard, 'credit-card', 'blue');
    this.moneyMetric(metrics, '借出未收', summary.loanOut, 'users-round', 'amber');
  }

  renderIssues(content) {
    const issues = [
      ...this.plugin.data.projects.filter(item => item.status === 'blocked').map(item => ({
        kind: '项目',
        title: item.title,
        owner: item.owner,
        reason: item.blocker,
        next: item.nextAction
      })),
      ...this.plugin.data.actions.filter(item => item.status === 'blocked').map(item => ({
        kind: '任务',
        title: item.title,
        owner: '',
        reason: item.blocker,
        next: item.note
      }))
    ];
    if (!issues.length) {
      this.emptyState(content, 'shield-check', '当前没有阻塞', '保持项目下一步明确，问题出现时集中记录。');
      return;
    }
    const list = content.createDiv({ cls: 'oom-issue-list' });
    for (const issue of issues) {
      const row = list.createDiv({ cls: 'oom-issue-item' });
      const icon = row.createDiv({ cls: 'oom-issue-icon' });
      setIcon(icon, 'circle-alert');
      const main = row.createDiv({ cls: 'oom-issue-main' });
      const top = main.createDiv({ cls: 'oom-issue-title-row' });
      top.createSpan({ text: issue.kind, cls: 'oom-mini-label' });
      top.createEl('h2', { text: issue.title });
      main.createDiv({ text: issue.reason || '尚未填写阻塞原因', cls: 'oom-issue-reason' });
      main.createDiv({ text: `下一步：${issue.next || '需要明确解除阻塞的行动'}`, cls: 'oom-muted' });
      row.createSpan({ text: issue.owner || '未指定负责人', cls: 'oom-issue-owner' });
    }
  }

  renderProjectMaterials(content) {
    const projects = this.plugin.data.projects;
    if (!projects.length) {
      this.emptyState(content, 'files', '还没有项目资料', '创建项目后，目标结果和执行信息会在这里汇总。');
      return;
    }
    const table = content.createDiv({ cls: 'oom-material-table oom-responsive-table' });
    const header = table.createDiv({ cls: 'oom-material-row oom-table-header' });
    ['项目', '目标结果', '负责人', '下一步', '更新时间'].forEach(text => header.createSpan({ text }));
    for (const project of projects) {
      const row = table.createDiv({ cls: 'oom-material-row' });
      row.createSpan({ text: project.title, cls: 'oom-table-primary', attr: { 'data-label': '项目' } });
      row.createSpan({ text: project.outcome || '未填写', attr: { 'data-label': '目标结果' } });
      row.createSpan({ text: project.owner || '未指定', attr: { 'data-label': '负责人' } });
      row.createSpan({ text: project.nextAction || '未填写', attr: { 'data-label': '下一步' } });
      row.createSpan({ text: project.updatedAt || '-', attr: { 'data-label': '更新时间' } });
    }
  }

  renderPlanningOverview(content) {
    const ideas = this.plugin.data.ideas.filter(item => item.status !== 'promoted');
    const planned = this.plugin.data.projects.filter(item => item.status === 'planned');
    const stats = content.createDiv({ cls: 'oom-stats oom-planning-stats' });
    this.statCard(stats, '待验证想法', ideas.length, 'lightbulb', 'amber');
    this.statCard(stats, '待开始项目', planned.length, 'calendar-clock', 'purple');
    this.statCard(stats, '有截止日期', this.plugin.data.projects.filter(item => item.deadline).length, 'calendar-check-2', 'blue');
    this.statCard(stats, '缺少下一步', this.plugin.data.projects.filter(item => !item.nextAction && item.status !== 'done').length, 'circle-help', 'red');

    const grid = content.createDiv({ cls: 'oom-overview-grid' });
    const ideaPanel = this.panel(grid, '下一批方向', '最近记录的待验证想法');
    if (!ideas.length) this.emptyState(ideaPanel, 'sparkles', '暂无待验证想法', '记录问题，再设计最小实验。');
    for (const idea of ideas.slice(0, 5)) {
      const row = ideaPanel.createDiv({ cls: 'oom-planning-row' });
      row.createDiv({ text: idea.title, cls: 'oom-health-title' });
      row.createDiv({ text: idea.nextExperiment || '缺少最小实验', cls: 'oom-muted' });
      row.createSpan({ text: idea.priority, cls: `oom-priority is-${idea.priority.toLowerCase()}` });
    }
    const plannedPanel = this.panel(grid, '准备启动', '已经进入项目但尚未开始');
    if (!planned.length) this.emptyState(plannedPanel, 'route', '暂无待开始项目', '不要一次启动过多项目。');
    for (const project of planned.slice(0, 5)) {
      const row = plannedPanel.createDiv({ cls: 'oom-planning-row' });
      row.createDiv({ text: project.title, cls: 'oom-health-title' });
      row.createDiv({ text: project.nextAction || '缺少下一步', cls: 'oom-muted' });
      row.createSpan({ text: dueLabel(project.deadline) });
    }
  }

  renderGoals(content) {
    const goals = this.plugin.data.projects.filter(item => item.outcome && item.status !== 'done');
    if (!goals.length) {
      this.emptyState(content, 'target', '还没有明确目标', '在项目中填写可验证的目标结果。');
      return;
    }
    const list = content.createDiv({ cls: 'oom-goal-list' });
    for (const project of goals) {
      const item = list.createEl('article', { cls: 'oom-goal-item' });
      const icon = item.createDiv({ cls: 'oom-goal-icon' });
      setIcon(icon, 'target');
      const main = item.createDiv({ cls: 'oom-goal-main' });
      main.createEl('h2', { text: project.outcome });
      main.createDiv({ text: project.title, cls: 'oom-muted' });
      item.createSpan({ text: statusLabel(project.status, PROJECT_STATUSES), cls: `oom-badge is-${project.status}` });
    }
  }

  renderTimeline(content) {
    const entries = this.plugin.data.projects
      .filter(item => item.deadline)
      .sort((a, b) => a.deadline.localeCompare(b.deadline));
    if (!entries.length) {
      this.emptyState(content, 'calendar-range', '时间线为空', '为需要时间约束的项目设置截止日期。');
      return;
    }
    const timeline = content.createDiv({ cls: 'oom-timeline' });
    for (const project of entries) {
      const item = timeline.createDiv({ cls: 'oom-timeline-item' });
      item.createDiv({ cls: 'oom-timeline-dot' });
      const date = item.createDiv({ cls: 'oom-timeline-date' });
      date.createSpan({ text: project.deadline });
      date.createSpan({ text: dueLabel(project.deadline), cls: isOverdue(project.deadline, project.status) ? 'is-overdue' : '' });
      const body = item.createDiv({ cls: 'oom-timeline-body' });
      body.createEl('h2', { text: project.title });
      body.createDiv({ text: project.nextAction || project.outcome || '缺少下一步', cls: 'oom-muted' });
      body.createSpan({ text: statusLabel(project.status, PROJECT_STATUSES), cls: `oom-badge is-${project.status}` });
    }
  }

  renderFinanceOverview(content) {
    const summary = this.plugin.getFinanceSummary();
    const month = this.plugin.getMonthFinanceSummary();
    const stats = content.createDiv({ cls: 'oom-finance-stats' });
    this.moneyMetric(stats, '当前账户', summary.currentAccount, 'wallet', 'purple');
    this.moneyMetric(stats, '信用卡待还', summary.creditCard, 'credit-card', 'red');
    this.moneyMetric(stats, '本月支出', month.expense, 'trending-down', 'amber');
    this.moneyMetric(stats, '本月收入', month.income, 'trending-up', 'green');
    this.moneyMetric(stats, '借出未收', summary.loanOut, 'users-round', 'blue');

    const grid = content.createDiv({ cls: 'oom-finance-overview-grid' });
    const recordsPanel = this.panel(grid, '最近记录', '最近 5 条资金流水');
    this.renderFinanceRecordList(recordsPanel, this.plugin.data.finance.records.slice(0, 5), false);

    const trendPanel = this.panel(grid, '账户趋势', '最近 7 天账户变化');
    this.renderFinanceTrend(trendPanel);

    const projection = content.createEl('section', { cls: 'oom-finance-projection' });
    this.moneyMetric(projection, '预计支出', this.plugin.getExpectedExpense(), 'calendar-minus', 'amber');
    this.moneyMetric(projection, '预计收入', this.plugin.getExpectedIncome(), 'calendar-plus', 'green');
    this.moneyMetric(projection, '预计后余额', summary.currentAccount - this.plugin.getExpectedExpense() + this.plugin.getExpectedIncome(), 'circle-dollar-sign', 'purple');
  }

  moneyMetric(parent, label, value, icon, tone) {
    const card = parent.createDiv({ cls: `oom-money-metric is-${tone}` });
    const iconEl = card.createDiv({ cls: 'oom-money-icon' });
    setIcon(iconEl, icon);
    const copy = card.createDiv({ cls: 'oom-money-copy' });
    copy.createDiv({ text: label, cls: 'oom-money-label' });
    const valueEl = copy.createDiv({ cls: 'oom-money-value' });
    valueEl.createSpan({ text: formatMoney(value) });
    valueEl.createSpan({ text: '元', cls: 'oom-money-unit' });
  }

  renderFinanceRecords(content) {
    const bar = content.createDiv({ cls: 'oom-finance-filter-bar' });
    const select = bar.createEl('select', { attr: { 'aria-label': '记录类型' } });
    select.createEl('option', { text: '全部类型', attr: { value: 'all' } });
    for (const [id, label] of FINANCE_TYPES) select.createEl('option', { text: label, attr: { value: id } });
    select.value = this.financeTypeFilter;
    select.addEventListener('change', () => {
      this.financeTypeFilter = select.value;
      this.render();
    });

    const records = this.plugin.data.finance.records.filter(item =>
      this.financeTypeFilter === 'all' || item.type === this.financeTypeFilter
    );
    const panel = content.createEl('section', { cls: 'oom-panel oom-finance-record-panel' });
    this.renderFinanceRecordList(panel, records, true);
  }

  renderFinanceRecordList(parent, records, allowDelete) {
    if (!records.length) {
      this.emptyState(parent, 'receipt-text', '还没有资金记录', '点击右上角“记一笔”开始记录。');
      return;
    }
    if (!allowDelete) {
      const compact = parent.createDiv({ cls: 'oom-finance-compact-list' });
      for (const record of records) {
        const row = compact.createDiv({ cls: 'oom-finance-compact-row' });
        const icon = row.createDiv({ cls: `oom-finance-compact-icon is-${record.type}` });
        setIcon(icon, ['income', 'collect_loan'].includes(record.type) ? 'arrow-down-left' : 'arrow-up-right');
        const copy = row.createDiv({ cls: 'oom-finance-compact-copy' });
        copy.createDiv({ text: financeTypeLabel(record.type), cls: 'oom-health-title' });
        copy.createDiv({
          text: [record.date, record.category, record.person].filter(Boolean).join(' · '),
          cls: 'oom-muted'
        });
        const amount = row.createDiv({ cls: `oom-finance-compact-value is-${record.type}` });
        amount.createSpan({ text: formatMoney(record.amount) });
        amount.createSpan({ text: '元', cls: 'oom-money-unit' });
      }
      return;
    }
    const list = parent.createDiv({ cls: 'oom-finance-record-list oom-responsive-table' });
    const header = list.createDiv({ cls: 'oom-finance-record-row oom-table-header' });
    ['日期', '类型', '分类/对象', '备注', '金额', ''].forEach(text => header.createSpan({ text }));
    for (const record of records) {
      const row = list.createDiv({ cls: 'oom-finance-record-row' });
      row.createSpan({ text: record.date || '-', attr: { 'data-label': '日期' } });
      row.createSpan({ text: financeTypeLabel(record.type), attr: { 'data-label': '类型' } });
      row.createSpan({ text: [record.category, record.person].filter(Boolean).join(' · ') || '-', attr: { 'data-label': '分类/对象' } });
      row.createSpan({ text: record.note || '-', attr: { 'data-label': '备注' } });
      const amount = row.createSpan({ cls: `oom-record-amount is-${record.type}`, attr: { 'data-label': '金额' } });
      amount.createSpan({ text: formatMoney(record.amount) });
      amount.createSpan({ text: ' 元', cls: 'oom-money-unit' });
      const actions = row.createDiv({ cls: 'oom-row-actions', attr: { 'data-label': '操作' } });
      if (allowDelete) {
        iconButton(actions, 'trash-2', '删除记录', 'oom-danger-button', () =>
          new ConfirmModal(this.app, '删除资金记录？', '这项操作无法撤销。', () => this.plugin.deleteFinanceRecord(record.id)).open()
        );
      }
    }
  }

  renderFinanceTrend(parent) {
    const points = [];
    const records = [...this.plugin.data.finance.records].sort((a, b) => String(a.date).localeCompare(String(b.date)));
    for (let offset = 6; offset >= 0; offset -= 1) {
      const date = new Date();
      date.setDate(date.getDate() - offset);
      const key = date.toISOString().slice(0, 10);
      const summary = this.plugin.getFinanceSummary(records.filter(item => String(item.date || '') <= key));
      points.push({ date: key, value: summary.currentAccount });
    }
    const values = points.map(point => point.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const chart = parent.createDiv({ cls: 'oom-finance-chart' });
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 640 250');
    svg.setAttribute('preserveAspectRatio', 'none');
    const coords = points.map((point, index) => ({
      point,
      x: 24 + index * 592 / 6,
      y: 28 + (1 - (point.value - min) / range) * 154
    }));
    for (let index = 0; index < 4; index += 1) {
      const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      const y = 28 + index * 51;
      line.setAttribute('x1', '24');
      line.setAttribute('x2', '616');
      line.setAttribute('y1', String(y));
      line.setAttribute('y2', String(y));
      line.setAttribute('class', 'oom-chart-gridline');
      svg.appendChild(line);
    }
    const polyline = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    polyline.setAttribute('points', coords.map(item => `${item.x},${item.y}`).join(' '));
    polyline.setAttribute('class', 'oom-chart-line');
    svg.appendChild(polyline);
    for (const { point, x, y } of coords) {
      const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
      dot.setAttribute('cx', String(x));
      dot.setAttribute('cy', String(y));
      dot.setAttribute('r', '4');
      dot.setAttribute('class', 'oom-chart-dot');
      svg.appendChild(dot);
      const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('x', String(x));
      label.setAttribute('y', '222');
      label.setAttribute('text-anchor', 'middle');
      label.setAttribute('class', 'oom-chart-label');
      label.textContent = point.date.slice(5);
      svg.appendChild(label);
    }
    chart.appendChild(svg);
  }

  renderFixedExpenses(content) {
    const hero = content.createEl('section', { cls: 'oom-finance-hero' });
    this.moneyMetric(hero, '固定与预计支出合计', this.plugin.getExpectedExpense(), 'calendar-minus', 'amber');
    const list = content.createEl('section', { cls: 'oom-panel oom-finance-item-list' });
    const entries = this.plugin.data.finance.fixedExpenses;
    if (!entries.length && !this.plugin.data.finance.expectedExpense) {
      this.emptyState(list, 'calendar-minus', '还没有固定支出', '添加房租、订阅或其他已确定支出。');
      return;
    }
    if (this.plugin.data.finance.expectedExpense > 0) {
      this.renderFinanceItemRow(list, {
        id: 'manual',
        name: '其他预计支出',
        amount: this.plugin.data.finance.expectedExpense,
        note: '汇总金额'
      }, null);
    }
    for (const item of entries) this.renderFinanceItemRow(list, item, () => this.plugin.deleteFixedExpense(item.id));
  }

  renderExpectedIncomes(content) {
    const hero = content.createEl('section', { cls: 'oom-finance-hero' });
    this.moneyMetric(hero, '预计收入合计', this.plugin.getExpectedIncome(), 'calendar-plus', 'green');
    const list = content.createEl('section', { cls: 'oom-panel oom-finance-item-list' });
    const entries = this.plugin.data.finance.expectedIncomes;
    if (!entries.length) {
      this.emptyState(list, 'calendar-plus', '还没有预计收入', '添加工资、项目款或其他确定收入。');
      return;
    }
    for (const item of entries) this.renderFinanceItemRow(list, item, () => this.plugin.deleteExpectedIncome(item.id));
  }

  renderFinanceItemRow(parent, item, onDelete) {
    const row = parent.createDiv({ cls: 'oom-finance-item-row' });
    const copy = row.createDiv({ cls: 'oom-finance-item-copy' });
    copy.createDiv({ text: item.name, cls: 'oom-health-title' });
    copy.createDiv({ text: item.note || '无备注', cls: 'oom-muted' });
    const value = row.createDiv({ cls: 'oom-finance-item-value' });
    value.createSpan({ text: formatMoney(item.amount) });
    value.createSpan({ text: ' 元', cls: 'oom-money-unit' });
    if (onDelete) {
      iconButton(row, 'trash-2', '删除', 'oom-danger-button', () =>
        new ConfirmModal(this.app, '删除这条项目？', '这项操作无法撤销。', onDelete).open()
      );
    }
  }

  renderAccountManagement(content) {
    const summary = this.plugin.getFinanceSummary();
    const grid = content.createDiv({ cls: 'oom-account-grid' });
    const breakdown = this.panel(grid, '账户构成', '按照现有资金记录计算');
    [
      ['当前账户', summary.currentAccount, 'wallet'],
      ['扣除预计支出后', summary.currentAccount - this.plugin.getExpectedExpense(), 'circle-dollar-sign'],
      ['信用卡待还', summary.creditCard, 'credit-card'],
      ['借出未收', summary.loanOut, 'users-round']
    ].forEach(([label, value, icon]) => {
      const row = breakdown.createDiv({ cls: 'oom-account-row' });
      const iconEl = row.createDiv({ cls: 'oom-account-icon' });
      setIcon(iconEl, icon);
      row.createSpan({ text: label });
      const amount = row.createSpan({ cls: 'oom-account-value' });
      amount.createSpan({ text: formatMoney(value) });
      amount.createSpan({ text: ' 元', cls: 'oom-money-unit' });
    });
    const trend = this.panel(grid, '余额趋势', '最近 7 天');
    this.renderFinanceTrend(trend);
  }

  settingControl(parent, title, description) {
    const row = parent.createDiv({ cls: 'oom-feature-setting' });
    const copy = row.createDiv({ cls: 'oom-feature-setting-copy' });
    copy.createDiv({ text: title, cls: 'oom-feature-setting-title' });
    if (description) copy.createDiv({ text: description, cls: 'oom-feature-setting-desc' });
    return row.createDiv({ cls: 'oom-feature-setting-control' });
  }

  settingToggle(parent, title, description, value, onChange) {
    const control = this.settingControl(parent, title, description);
    const label = control.createEl('label', { cls: 'oom-switch' });
    const input = label.createEl('input', { attr: { type: 'checkbox', 'aria-label': title } });
    input.checked = Boolean(value);
    label.createSpan({ cls: 'oom-switch-track' });
    input.addEventListener('change', () => onChange(input.checked));
    return input;
  }

  settingSelect(parent, title, description, value, options, onChange) {
    const control = this.settingControl(parent, title, description);
    const select = control.createEl('select', { cls: 'oom-setting-select', attr: { 'aria-label': title } });
    for (const [id, label] of options) select.createEl('option', { text: label, attr: { value: id } });
    select.value = String(value);
    select.addEventListener('change', () => onChange(select.value));
    return select;
  }

  renderSettings(content) {
    const grid = content.createDiv({ cls: 'oom-settings-grid' });

    const interfacePanel = this.panel(grid, '界面与语言', '即时切换，不改变业务数据');
    this.settingSelect(
      interfacePanel,
      '界面语言',
      '管理页面、弹窗和功能设置使用同一语言。',
      this.plugin.settings.language,
      [['zh', '中文（简体）'], ['en', 'English']],
      value => this.plugin.setLanguage(value)
    );

    const storage = this.panel(grid, '数据文件夹', '业务数据保存在可同步的独立文件中');
    const status = storage.createDiv({ cls: 'oom-settings-status' });
    const icon = status.createDiv({ cls: 'oom-settings-icon' });
    setIcon(icon, 'folder-cog');
    const copy = status.createDiv();
    copy.createDiv({ text: this.plugin.getDataFolder(), cls: 'oom-health-title oom-storage-path' });
    copy.createDiv({ text: 'management.md · planning.md · finance.md', cls: 'oom-muted' });

    const folderForm = storage.createDiv({ cls: 'oom-folder-form' });
    const input = folderForm.createEl('input', {
      attr: {
        type: 'text',
        value: this.plugin.getDataFolder(),
        placeholder: DEFAULT_DATA_FOLDER,
        'aria-label': '数据文件夹'
      }
    });
    textButton(folderForm, '保存并迁移', 'oom-primary-button', async () => {
      try {
        await this.plugin.setDataFolder(input.value);
      } catch (error) {
        console.error(error);
        new Notice(this.plugin.t(error.message || '数据文件夹设置失败'));
      }
    });
    storage.createDiv({
      text: '切换目录时会先复制当前数据，不会自动删除旧文件夹。',
      cls: 'oom-setting-hint'
    });

    const imagePanel = this.panel(grid, '图片与附件', '自动命名、引用修复、Canvas 与 Base 工具');
    imagePanel.addClass('oom-settings-feature-panel');
    this.settingToggle(
      imagePanel,
      '启用自动图片重命名',
      '粘贴 PNG、JPG、JPEG 后自动命名为“笔记名_000001”。',
      this.plugin.settings.imageRename.enabled,
      async value => {
        this.plugin.settings.imageRename.enabled = value;
        await this.plugin.savePluginSettings();
      }
    );
    const imageFolderControl = this.settingControl(
      imagePanel,
      '图片目标文件夹',
      '默认保存到 Archive/img；可填写其他库内目录。'
    );
    const imageFolderInput = imageFolderControl.createEl('input', {
      cls: 'oom-setting-input',
      attr: {
        type: 'text',
        value: this.plugin.settings.imageRename.targetFolder,
        placeholder: 'Archive/img',
        'aria-label': '图片目标文件夹'
      }
    });
    textButton(imageFolderControl, '保存', 'oom-secondary-button oom-small-button', async () => {
      this.plugin.settings.imageRename.targetFolder = imageFolderInput.value;
      await this.plugin.savePluginSettings({ refresh: false });
      new Notice(this.plugin.t('图片设置已保存'));
    });
    this.settingSelect(
      imagePanel,
      'Canvas 图片文件名',
      '控制图片节点标签的显示方式。',
      this.plugin.settings.imageRename.filenameDisplayMode,
      [['show', '始终显示'], ['hover', '悬停显示'], ['hide', '隐藏']],
      async value => {
        this.plugin.settings.imageRename.filenameDisplayMode = value;
        await this.plugin.savePluginSettings({ refresh: false });
      }
    );
    this.settingToggle(
      imagePanel,
      '在文件列表隐藏 PNG',
      '只隐藏文件树条目，不会删除任何图片。',
      this.plugin.settings.imageRename.hidePngInFileList,
      async value => {
        this.plugin.settings.imageRename.hidePngInFileList = value;
        await this.plugin.savePluginSettings({ refresh: false });
      }
    );
    const imageActions = imagePanel.createDiv({ cls: 'oom-feature-actions' });
    textButton(imageActions, '检查并整理当前笔记', 'oom-primary-button', () =>
      this.plugin.imageRename.renameImagesInActiveNote()
    );
    textButton(imageActions, '创建 Files.base', 'oom-secondary-button', () =>
      this.plugin.imageRename.createDefaultBase()
    );

    const ruleArea = imagePanel.createDiv({ cls: 'oom-setting-rules' });
    ruleArea.createDiv({ text: 'Base 名称样式', cls: 'oom-feature-setting-title' });
    ruleArea.createDiv({
      text: '按文件扩展名为 Bases 的名称列设置颜色。',
      cls: 'oom-feature-setting-desc'
    });
    this.plugin.settings.imageRename.baseNameStyleRules.forEach((rule, index) => {
      const row = ruleArea.createDiv({ cls: 'oom-setting-rule' });
      const extension = row.createEl('input', {
        cls: 'oom-setting-input',
        attr: { type: 'text', value: rule.extension, placeholder: 'md', 'aria-label': '扩展名' }
      });
      const color = row.createEl('input', {
        cls: 'oom-setting-color',
        attr: { type: 'color', value: rule.color, 'aria-label': '颜色' }
      });
      extension.addEventListener('change', async () => {
        const current = this.plugin.settings.imageRename.baseNameStyleRules[index];
        if (current) current.extension = extension.value.trim().replace(/^\./, '').toLowerCase();
        await this.plugin.savePluginSettings({ refresh: false });
      });
      color.addEventListener('change', async () => {
        const current = this.plugin.settings.imageRename.baseNameStyleRules[index];
        if (current) current.color = color.value;
        await this.plugin.savePluginSettings({ refresh: false });
      });
      iconButton(row, 'trash-2', '删除规则', 'oom-danger-button', async () => {
        this.plugin.settings.imageRename.baseNameStyleRules.splice(index, 1);
        await this.plugin.savePluginSettings();
      });
    });
    textButton(ruleArea, '＋ 添加规则', 'oom-secondary-button oom-small-button', async () => {
      this.plugin.settings.imageRename.baseNameStyleRules.push({ extension: 'pdf', color: '#5b8def' });
      await this.plugin.savePluginSettings();
    });

    const mindmapPanel = this.panel(grid, '思维导图', '离线 SVG 引擎，Markdown 就是数据源');
    mindmapPanel.addClass('oom-settings-feature-panel');
    this.settingToggle(
      mindmapPanel,
      '启用思维导图',
      '支持 Markdown 标题和缩进列表、缩放、拖动及节点折叠。',
      this.plugin.settings.mindmap.enabled,
      async value => {
        this.plugin.settings.mindmap.enabled = value;
        await this.plugin.savePluginSettings();
      }
    );
    this.settingSelect(
      mindmapPanel,
      '导图方向',
      '选择主要展开方向。',
      this.plugin.settings.mindmap.direction,
      [['horizontal', '从左向右'], ['vertical', '从上向下']],
      async value => {
        this.plugin.settings.mindmap.direction = value;
        await this.plugin.savePluginSettings({ refresh: false });
      }
    );
    this.settingSelect(
      mindmapPanel,
      '初始展开层级',
      '-1 表示全部展开。',
      this.plugin.settings.mindmap.initialExpandLevel,
      [['-1', '全部'], ['1', '1'], ['2', '2'], ['3', '3'], ['4', '4'], ['5', '5'], ['6', '6']],
      async value => {
        this.plugin.settings.mindmap.initialExpandLevel = Number(value);
        await this.plugin.savePluginSettings({ refresh: false });
      }
    );
    this.settingToggle(
      mindmapPanel,
      '显示工具栏',
      '显示适配、展开、折叠和缩放操作。',
      this.plugin.settings.mindmap.showToolbar,
      async value => {
        this.plugin.settings.mindmap.showToolbar = value;
        await this.plugin.savePluginSettings({ refresh: false });
      }
    );
    this.settingToggle(
      mindmapPanel,
      '文档标题作为根节点',
      '开启后使用文件名作为导图最上层节点。',
      this.plugin.settings.mindmap.titleAsRootNode,
      async value => {
        this.plugin.settings.mindmap.titleAsRootNode = value;
        await this.plugin.savePluginSettings({ refresh: false });
      }
    );
    const mapActions = mindmapPanel.createDiv({ cls: 'oom-feature-actions' });
    textButton(mapActions, '跟随当前文件', 'oom-secondary-button', () => this.plugin.mindmap.open(false));
    textButton(mapActions, '固定当前文件', 'oom-primary-button', () => this.plugin.mindmap.open(true));
    mindmapPanel.createDiv({
      text: '快捷键：Ctrl/Cmd + Shift + M（可在 Obsidian 的“快捷键”设置中修改）',
      cls: 'oom-setting-hint'
    });

    const counts = this.panel(grid, '当前数据', '只读统计');
    const rows = [
      ['项目', this.plugin.data.projects.length],
      ['行动', this.plugin.data.actions.length],
      ['想法', this.plugin.data.ideas.length],
      ['资金记录', this.plugin.data.finance.records.length]
    ];
    for (const [label, value] of rows) {
      const row = counts.createDiv({ cls: 'oom-settings-row' });
      row.createSpan({ text: label });
      row.createSpan({ text: String(value) });
    }

    this.plugin.localizeElement(content);
  }
}

class EntityModal extends Modal {
  constructor(app, plugin, entity) {
    super(app);
    this.plugin = plugin;
    this.entity = entity;
    this.values = {};
  }

  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass('oom-modal');
    this.modalEl?.addClass('oom-manage-modal-frame');
    this.renderForm();
    this.plugin.localizeElement(this.contentEl);
  }

  formLayout(title, subtitle) {
    const heading = this.contentEl.createEl('header', { cls: 'oom-modal-heading' });
    heading.createEl('h2', { text: title });
    heading.createEl('p', { text: subtitle, cls: 'oom-modal-subtitle' });
    return this.contentEl.createDiv({
      cls: 'oom-form-grid oom-modal-body',
      attr: { 'aria-label': title }
    });
  }

  field(form, label, key, value, options = {}) {
    const wrap = form.createDiv({ cls: `oom-form-field ${options.full ? 'is-full' : ''}` });
    wrap.createEl('label', { text: label });
    let input;
    if (options.type === 'textarea') {
      input = wrap.createEl('textarea', { attr: { rows: options.rows || 3, placeholder: options.placeholder || '' } });
      input.value = value || '';
    } else if (options.options) {
      input = wrap.createEl('select');
      if (options.allowEmpty) input.createEl('option', { text: options.emptyLabel || '未选择', attr: { value: '' } });
      for (const [id, text] of options.options) input.createEl('option', { text, attr: { value: id } });
      input.value = value || '';
    } else {
      input = wrap.createEl('input', {
        attr: {
          type: options.type || 'text',
          placeholder: options.placeholder || ''
        }
      });
      input.value = value || '';
    }
    input.addEventListener('input', () => {
      this.values[key] = input.value;
    });
    input.addEventListener('change', () => {
      this.values[key] = input.value;
    });
    this.values[key] = input.value;
    return input;
  }

  footer(_form, submitLabel, onSubmit) {
    const footer = this.contentEl.createDiv({ cls: 'oom-modal-footer' });
    textButton(footer, '取消', 'oom-secondary-button', () => this.close());
    let pending = false;
    const submit = textButton(footer, submitLabel, 'oom-primary-button', async () => {
      if (pending) return;
      pending = true;
      submit.disabled = true;
      submit.addClass('is-loading');
      const originalLabel = submit.textContent;
      submit.textContent = '正在保存…';
      try {
        const ok = await onSubmit();
        if (ok !== false) this.close();
      } finally {
        pending = false;
        submit.disabled = false;
        submit.removeClass('is-loading');
        submit.textContent = originalLabel;
      }
    });
  }

  requireTitle() {
    if (!String(this.values.title || '').trim()) {
      new Notice(this.plugin.t('请填写名称'));
      return false;
    }
    return true;
  }
}

class ProjectModal extends EntityModal {
  renderForm() {
    const item = this.entity || {};
    const form = this.formLayout(
      this.entity ? '编辑项目' : '新建项目',
      '先写清结果，再投入时间。'
    );
    const title = this.field(form, '项目名称 *', 'title', item.title, { full: true, placeholder: '例如：完成第一版可用原型' });
    this.field(form, '目标结果', 'outcome', item.outcome, { full: true, type: 'textarea', placeholder: '完成后具体会得到什么？' });
    this.field(form, '负责人', 'owner', item.owner, { placeholder: '一个明确负责人' });
    this.field(form, '状态', 'status', item.status || 'planned', { options: PROJECT_STATUSES });
    this.field(form, '优先级', 'priority', item.priority || 'P2', { options: PRIORITIES });
    this.field(form, '截止日期', 'deadline', item.deadline, { type: 'date' });
    this.field(form, '下一步', 'nextAction', item.nextAction, { full: true, placeholder: '下一次专注时间里具体做什么？' });
    this.field(form, '阻塞原因', 'blocker', item.blocker, { full: true, placeholder: '仅在阻塞时填写' });
    this.footer(form, this.entity ? '保存修改' : '创建项目', async () => {
      if (!this.requireTitle()) return false;
      const project = {
        ...item,
        id: item.id || uid('project'),
        title: this.values.title.trim(),
        outcome: this.values.outcome.trim(),
        owner: this.values.owner.trim(),
        status: this.values.status,
        priority: this.values.priority,
        deadline: this.values.deadline,
        nextAction: this.values.nextAction.trim(),
        blocker: this.values.blocker.trim(),
        createdAt: item.createdAt || today(),
        updatedAt: today()
      };
      await this.plugin.upsertProject(project);
      return true;
    });
    setTimeout(() => title.focus(), 0);
  }
}

class ActionModal extends EntityModal {
  constructor(app, plugin, entity, projectId = '') {
    super(app, plugin, entity);
    this.defaultProjectId = projectId;
  }

  renderForm() {
    const item = this.entity || {};
    const form = this.formLayout(
      this.entity ? '编辑行动' : '新建行动',
      '行动应该小到可以一次完成。'
    );
    const title = this.field(form, '行动名称 *', 'title', item.title, { full: true, placeholder: '用动词开头，例如：完成测试程序' });
    const projectOptions = this.plugin.data.projects.map(project => [project.id, project.title]);
    this.field(form, '所属项目', 'projectId', item.projectId || this.defaultProjectId, {
      options: projectOptions,
      allowEmpty: true,
      emptyLabel: '独立行动'
    });
    this.field(form, '状态', 'status', item.status || 'todo', { options: ACTION_STATUSES });
    this.field(form, '优先级', 'priority', item.priority || 'P2', { options: PRIORITIES });
    this.field(form, '截止日期', 'deadline', item.deadline, { type: 'date' });
    this.field(form, '备注', 'note', item.note, { full: true, type: 'textarea', rows: 2, placeholder: '补充完成标准或上下文' });
    this.field(form, '阻塞原因', 'blocker', item.blocker, { full: true, placeholder: '仅在阻塞时填写' });
    this.footer(form, this.entity ? '保存修改' : '创建行动', async () => {
      if (!this.requireTitle()) return false;
      const action = {
        ...item,
        id: item.id || uid('action'),
        title: this.values.title.trim(),
        projectId: this.values.projectId,
        status: this.values.status,
        priority: this.values.priority,
        deadline: this.values.deadline,
        note: this.values.note.trim(),
        blocker: this.values.blocker.trim(),
        createdAt: item.createdAt || today(),
        updatedAt: today()
      };
      await this.plugin.upsertAction(action);
      return true;
    });
    setTimeout(() => title.focus(), 0);
  }
}

class IdeaModal extends EntityModal {
  renderForm() {
    const item = this.entity || {};
    const form = this.formLayout(
      this.entity ? '编辑想法' : '记录想法',
      '记录问题、价值和最小实验，不急着立项。'
    );
    const title = this.field(form, '想法名称 *', 'title', item.title, { full: true, placeholder: '一句话描述方向' });
    this.field(form, '优先级', 'priority', item.priority || 'P2', { options: PRIORITIES });
    this.field(form, '要解决的问题', 'problem', item.problem, { full: true, type: 'textarea', placeholder: '谁在什么场景下遇到什么问题？' });
    this.field(form, '预期价值', 'value', item.value, { full: true, type: 'textarea', rows: 2, placeholder: '为什么值得验证？' });
    this.field(form, '最小实验', 'nextExperiment', item.nextExperiment, { full: true, type: 'textarea', rows: 2, placeholder: '最便宜、最快的验证方式是什么？' });
    this.footer(form, this.entity ? '保存修改' : '记录想法', async () => {
      if (!this.requireTitle()) return false;
      const idea = {
        ...item,
        id: item.id || uid('idea'),
        title: this.values.title.trim(),
        priority: this.values.priority,
        problem: this.values.problem.trim(),
        value: this.values.value.trim(),
        nextExperiment: this.values.nextExperiment.trim(),
        status: item.status || 'inbox',
        createdAt: item.createdAt || today(),
        updatedAt: today()
      };
      await this.plugin.upsertIdea(idea);
      return true;
    });
    setTimeout(() => title.focus(), 0);
  }
}

class FinanceRecordModal extends EntityModal {
  renderForm() {
    const form = this.formLayout(
      '记录一笔资金',
      '使用与 Personal Funds 一致的收支口径。'
    );
    this.field(form, '类型', 'type', 'expense', { options: FINANCE_TYPES });
    const amount = this.field(form, '金额 *', 'amount', '', { type: 'number', placeholder: '0.00' });
    this.field(form, '日期', 'date', today(), { type: 'date' });
    this.field(form, '分类', 'category', FINANCE_CATEGORIES[0], {
      options: FINANCE_CATEGORIES.map(item => [item, item])
    });
    this.field(form, '对象', 'person', '', { placeholder: '可不填' });
    this.field(form, '备注', 'note', '', { full: true, placeholder: '可不填' });
    this.footer(form, '保存记录', async () => {
      const numeric = Number(this.values.amount);
      if (!Number.isFinite(numeric) || numeric <= 0) {
        new Notice(this.plugin.t('请输入大于 0 的金额'));
        return false;
      }
      await this.plugin.addFinanceRecord({
        id: uid('finance'),
        type: this.values.type,
        amount: numeric,
        date: this.values.date || today(),
        category: this.values.category,
        person: this.values.person.trim(),
        note: this.values.note.trim(),
        createdAt: new Date().toISOString()
      });
      return true;
    });
    setTimeout(() => amount.focus(), 0);
  }
}

class FinanceItemModal extends EntityModal {
  constructor(app, plugin, kind) {
    super(app, plugin, null);
    this.kind = kind;
  }

  renderForm() {
    const isIncome = this.kind === 'income';
    const form = this.formLayout(
      isIncome ? '添加预计收入' : '添加固定支出',
      isIncome ? '记录未来已确定但尚未到账的收入。' : '记录未来已确定但尚未发生的支出。'
    );
    const name = this.field(form, '名称 *', 'name', '', {
      full: true,
      placeholder: isIncome ? '例如：工资或项目款' : '例如：房租或订阅'
    });
    this.field(form, '金额 *', 'amount', '', { type: 'number', placeholder: '0.00' });
    this.field(form, '备注', 'note', '', { full: true, placeholder: '可不填' });
    this.footer(form, '保存', async () => {
      const numeric = Number(this.values.amount);
      if (!this.values.name.trim()) {
        new Notice(this.plugin.t('请填写名称'));
        return false;
      }
      if (!Number.isFinite(numeric) || numeric <= 0) {
        new Notice(this.plugin.t('请输入大于 0 的金额'));
        return false;
      }
      const item = {
        id: uid(isIncome ? 'income' : 'expense'),
        name: this.values.name.trim(),
        amount: numeric,
        note: this.values.note.trim()
      };
      if (isIncome) await this.plugin.addExpectedIncome(item);
      else await this.plugin.addFixedExpense(item);
      return true;
    });
    setTimeout(() => name.focus(), 0);
  }
}

class ExpectedExpenseModal extends EntityModal {
  renderForm() {
    const form = this.formLayout(
      '设置其他预计支出',
      '该金额会计入预计支出，但不会改变当前账户。'
    );
    const amount = this.field(
      form,
      '预计支出金额',
      'amount',
      String(this.plugin.data.finance.expectedExpense || ''),
      { full: true, type: 'number', placeholder: '0.00' }
    );
    this.footer(form, '保存', async () => {
      const numeric = Number(this.values.amount || 0);
      if (!Number.isFinite(numeric) || numeric < 0) {
        new Notice(this.plugin.t('请输入大于或等于 0 的金额'));
        return false;
      }
      this.plugin.data.finance.expectedExpense = numeric;
      await this.plugin.persist('预计支出已保存');
      return true;
    });
    setTimeout(() => amount.focus(), 0);
  }
}

class ConfirmModal extends Modal {
  constructor(app, title, message, onConfirm) {
    super(app);
    this.plugin = app.plugins?.plugins?.['open-obsidian-manage'] || null;
    this.title = title;
    this.message = message;
    this.onConfirm = onConfirm;
  }

  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass('oom-modal');
    this.contentEl.addClass('oom-confirm-modal');
    this.modalEl?.addClass('oom-manage-modal-frame');
    const heading = this.contentEl.createEl('header', { cls: 'oom-modal-heading' });
    heading.createEl('h2', { text: this.title });
    heading.createEl('p', { text: this.message, cls: 'oom-modal-subtitle' });
    const footer = this.contentEl.createDiv({ cls: 'oom-modal-footer' });
    textButton(footer, '取消', 'oom-secondary-button', () => this.close());
    textButton(footer, '确认删除', 'oom-delete-button', async () => {
      await this.onConfirm();
      this.close();
    });
    this.plugin?.localizeElement(this.contentEl);
  }
}
