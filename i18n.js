'use strict';

const DEFAULT_LANGUAGE = 'zh-CN';

const LANGUAGE_OPTIONS = Object.freeze([
  Object.freeze({
    value: 'zh-CN',
    label: '中文（简体）',
    labels: Object.freeze({
      'zh-CN': '中文（简体）',
      en: 'Chinese (Simplified)'
    })
  }),
  Object.freeze({
    value: 'en',
    label: 'English',
    labels: Object.freeze({
      'zh-CN': 'English',
      en: 'English'
    })
  })
]);

/*
 * The existing plugin stores stable IDs for statuses, priorities and finance
 * types, but stores finance category names as Chinese strings. This table is
 * display-only: localizeElement never writes an input/option value, so existing
 * database payloads remain byte-for-byte compatible.
 */
const ENGLISH_TEXT = Object.freeze({
  // Brand, navigation and page names.
  '清晰地推进一件事': 'Move meaningful work forward',
  '多功能管理中枢': 'Integrated management workspace',
  '工作空间': 'Workspace',
  '总览': 'Overview',
  '全局概览': 'Global overview',
  '管理总览': 'Management overview',
  '工作台': 'Workspace',
  '项目': 'Project',
  '项目进度': 'Projects',
  '项目概览': 'Project overview',
  '任务': 'Tasks',
  '行动': 'Actions',
  '问题与阻塞': 'Issues & blockers',
  '项目资料': 'Project materials',
  '未来规划': 'Planning',
  '规划概览': 'Planning overview',
  '目标': 'Goals',
  '时间线': 'Timeline',
  '想法': 'Ideas',
  '个人资金': 'Personal finance',
  '个人资金概览': 'Personal finance overview',
  '最近记录': 'Recent activity',
  '固定支出': 'Fixed expenses',
  '预计收入': 'Expected income',
  '账户管理': 'Accounts',
  '设置': 'Settings',
  '系统': 'System',
  '管理中枢': 'Management hub',
  '页面导航': 'Page navigation',
  '概览': 'Overview',

  // Common actions and shared labels.
  '打开管理中枢': 'Open management hub',
  '读取数据': 'Read data',
  '读取数据失败，请检查数据文件夹中的 JSON 代码块': 'Could not read data. Check the JSON blocks in the data folder.',
  '刷新': 'Refresh',
  '保存': 'Save',
  '保存修改': 'Save changes',
  '保存记录': 'Save transaction',
  '保存并迁移': 'Save & migrate',
  '取消': 'Cancel',
  '编辑': 'Edit',
  '编辑项目': 'Edit project',
  '编辑行动': 'Edit action',
  '编辑想法': 'Edit idea',
  '删除': 'Delete',
  '删除项目': 'Delete project',
  '删除想法': 'Delete idea',
  '删除记录': 'Delete transaction',
  '确认删除': 'Delete',
  '标记完成': 'Mark complete',
  '重新打开': 'Reopen',
  '添加行动': 'Add action',
  '提升为项目': 'Promote to project',
  '进入个人资金': 'Open personal finance',
  '查看资金模块 →': 'Open finance →',
  '新建项目': 'New project',
  '新建行动': 'New action',
  '新建任务': 'New task',
  '创建项目': 'Create project',
  '创建行动': 'Create action',
  '记录想法': 'Capture idea',
  '记一笔': 'Add transaction',
  '添加固定支出': 'Add fixed expense',
  '添加预计收入': 'Add expected income',
  '设置预计支出': 'Set expected expense',
  '＋ 新建项目': '+ New project',
  '＋ 新建行动': '+ New action',
  '＋ 新建任务': '+ New task',
  '＋ 记录想法': '+ Capture idea',
  '＋ 记一笔': '+ Add transaction',
  '＋ 添加固定支出': '+ Add fixed expense',
  '＋ 添加预计收入': '+ Add expected income',
  '正在保存…': 'Saving…',
  '操作': 'Actions',

  // Filters, statuses and priorities.
  '全部': 'All',
  '全部类型': 'All types',
  '未完成': 'Open',
  '待处理': 'To do',
  '待开始': 'Planned',
  '进行中': 'In progress',
  '阻塞': 'Blocked',
  '已完成': 'Completed',
  '已立项': 'Promoted',
  '待验证': 'To validate',
  '未选择': 'None',
  'P0 · 紧急': 'P0 · Urgent',
  'P1 · 重要': 'P1 · Important',
  'P2 · 常规': 'P2 · Normal',
  'P3 · 稍后': 'P3 · Later',
  '状态': 'Status',
  '优先级': 'Priority',

  // Dates and generic form/table labels.
  '日期': 'Date',
  '截止日期': 'Due date',
  '更新时间': 'Updated',
  '无截止日期': 'No due date',
  '今天截止': 'Due today',
  '明天截止': 'Due tomorrow',
  '名称 *': 'Name *',
  '备注': 'Notes',
  '无备注': 'No notes',
  '可不填': 'Optional',
  '类型': 'Type',
  '记录类型': 'Transaction type',
  '分类': 'Category',
  '分类/对象': 'Category / person',
  '对象': 'Person',
  '金额': 'Amount',
  '金额 *': 'Amount *',
  '元': 'CNY',
  ' 元': ' CNY',
  '未填写': 'Not provided',
  '尚未填写': 'Not provided',
  '未指定': 'Unassigned',
  '未指定负责人': 'No owner',

  // General overview.
  '集中查看项目、行动、规划和资金状态': 'See projects, actions, plans and finances in one place',
  '当前最重要的一步': 'Most important next step',
  '先创建一个清晰、可以立即执行的行动': 'Create one clear action you can start now',
  '管理从明确下一步开始': 'Good management starts with a clear next step',
  '进行中项目': 'Active projects',
  '待完成行动': 'Open actions',
  '当前阻塞': 'Current blockers',
  '待验证想法': 'Ideas to validate',
  '待评估想法': 'Ideas to review',
  '本周聚焦': 'This week’s focus',
  '最多展示 3 个最重要行动': 'Up to 3 highest-priority actions',
  '项目健康度': 'Project health',
  '检查是否拥有清晰下一步': 'Check that every project has a clear next step',
  '需要处理的阻塞': 'Blockers to resolve',
  '先解除阻塞，再增加任务': 'Resolve blockers before adding more work',
  '最近想法': 'Recent ideas',
  '先做最小验证': 'Start with the smallest useful test',
  '正在推进': 'In progress',
  '活跃项目与完成进度': 'Active projects and completion',
  '接下来': 'Up next',
  '按优先级与截止日期排序': 'Sorted by priority and due date',
  '资金快照': 'Finance snapshot',
  '当前账户与未来预期': 'Current balance and upcoming commitments',
  '还没有待执行行动': 'No pending actions',
  '先创建一个足够具体的下一步。': 'Create a concrete next step first.',
  '还没有项目': 'No projects yet',
  '从一个明确结果开始建立项目。': 'Start a project with a clearly defined outcome.',
  '当前没有阻塞': 'No blockers right now',
  '保持下一步明确即可。': 'Keep the next step clear.',
  '想法收件箱为空': 'The idea inbox is empty',
  '随时记录，但不要急着全部立项。': 'Capture ideas freely without turning all of them into projects.',
  '保持克制，不要为了忙碌而增加任务。': 'Stay focused; do not add work just to stay busy.',

  // Projects.
  '查看项目状态、进度、负责人和明确下一步': 'Review project status, progress, owners and next steps',
  '用明确的结果和完成标准管理投入': 'Manage effort with clear outcomes and completion criteria',
  '项目名称 *': 'Project name *',
  '目标结果': 'Target outcome',
  '负责人': 'Owner',
  '下一步': 'Next step',
  '阻塞原因': 'Blocker',
  '尚未填写目标结果': 'No target outcome',
  '尚未填写下一步': 'No next step',
  '尚未填写阻塞原因': 'No blocker details',
  '未填写阻塞原因': 'No blocker details',
  '请补充阻塞原因': 'Add the reason for the blocker',
  '缺少下一步': 'Missing next step',
  '这个视图还没有项目': 'No projects in this view',
  '新建项目，写清结果、负责人和下一步。': 'Create a project with a clear outcome, owner and next step.',
  '汇总每个项目的目标、结果和执行上下文': 'Bring each project’s goals, outcomes and execution context together',
  '还没有项目资料': 'No project materials yet',
  '创建项目后，目标结果和执行信息会在这里汇总。': 'Project outcomes and execution details will appear here.',
  '项目与行动数据库': 'Projects and actions database',
  '先写清结果，再投入时间。': 'Define the outcome before investing time.',
  '例如：完成第一版可用原型': 'For example: Complete the first usable prototype',
  '完成后具体会得到什么？': 'What tangible result will completion produce?',
  '一个明确负责人': 'One accountable owner',
  '下一次专注时间里具体做什么？': 'What exactly will you do in the next focused session?',
  '仅在阻塞时填写': 'Only complete this when blocked',

  // Actions and blockers.
  '按优先级和截止日期推进具体行动': 'Move concrete actions forward by priority and due date',
  '把下一步拆成可以真正完成的小任务': 'Break next steps into actions you can actually finish',
  '行动名称 *': 'Action name *',
  '所属项目': 'Project',
  '独立行动': 'Independent action',
  '这个视图还没有行动': 'No actions in this view',
  '创建一个可以在一次专注时间内完成的动作。': 'Create an action that fits into one focused session.',
  '行动已经清空': 'All actions are complete',
  '用动词开头，例如：完成测试程序': 'Start with a verb, for example: Complete the test program',
  '行动应该小到可以一次完成。': 'An action should be small enough to finish in one session.',
  '补充完成标准或上下文': 'Add completion criteria or context',
  '集中处理影响项目推进的问题': 'Resolve issues that are preventing project progress',
  '保持项目下一步明确，问题出现时集中记录。': 'Keep next steps clear and capture issues as they appear.',
  '需要明确解除阻塞的行动': 'Define an action that removes the blocker',

  // Ideas and planning.
  '把未来方向收敛为可验证、可安排的计划': 'Turn future directions into testable, schedulable plans',
  '从项目结果中提取当前目标': 'Turn project outcomes into current goals',
  '按日期查看计划和关键节点': 'Review plans and milestones by date',
  '先验证问题和价值，再决定是否立项': 'Validate the problem and value before starting a project',
  '先验证，再决定是否投入成为项目': 'Validate first, then decide whether to invest',
  '待开始项目': 'Planned projects',
  '有截止日期': 'With due dates',
  '下一批方向': 'Possible next directions',
  '最近记录的待验证想法': 'Recently captured ideas to validate',
  '准备启动': 'Ready to start',
  '已经进入项目但尚未开始': 'Projects that are defined but not started',
  '暂无待验证想法': 'No ideas awaiting validation',
  '记录问题，再设计最小实验。': 'Capture the problem, then design the smallest experiment.',
  '暂无待开始项目': 'No planned projects',
  '不要一次启动过多项目。': 'Avoid starting too many projects at once.',
  '还没有明确目标': 'No clear goals yet',
  '在项目中填写可验证的目标结果。': 'Add a verifiable target outcome to a project.',
  '时间线为空': 'The timeline is empty',
  '为需要时间约束的项目设置截止日期。': 'Set due dates for projects that need a time constraint.',
  '想法名称 *': 'Idea name *',
  '要解决的问题': 'Problem to solve',
  '预期价值': 'Expected value',
  '最小实验': 'Smallest experiment',
  '一句话描述方向': 'Describe the direction in one sentence',
  '谁在什么场景下遇到什么问题？': 'Who experiences what problem, and in which situation?',
  '为什么值得验证？': 'Why is this worth validating?',
  '最便宜、最快的验证方式是什么？': 'What is the fastest, least expensive way to test it?',
  '记录问题、价值和最小实验，不急着立项。': 'Capture the problem, value and smallest experiment before committing.',
  '先记录问题和最小实验，不需要马上立项。': 'Capture the problem and smallest experiment without starting a project yet.',
  '还没有最小实验': 'No experiment defined',
  '缺少最小实验': 'Missing smallest experiment',

  // Personal finance.
  '查看账户、收支、固定支出和预计收入': 'Review balances, transactions, fixed expenses and expected income',
  '筛选和查看全部资金流水': 'Filter and review all transactions',
  '管理未来已确定的固定支出': 'Manage confirmed upcoming fixed expenses',
  '管理未来已确定但尚未到账的收入': 'Manage confirmed income that has not arrived yet',
  '查看账户余额、信用卡和借出资金': 'Review balances, credit cards and outstanding loans',
  '当前账户': 'Current balance',
  '信用卡待还': 'Credit card balance',
  '借出未收': 'Outstanding loans',
  '本月支出': 'Expenses this month',
  '本月收入': 'Income this month',
  '账户趋势': 'Balance trend',
  '预计支出': 'Expected expenses',
  '预计后余额': 'Projected balance',
  '预计收入合计': 'Total expected income',
  '固定与预计支出合计': 'Total fixed and expected expenses',
  '账户构成': 'Account breakdown',
  '按照现有资金记录计算': 'Calculated from existing transactions',
  '扣除预计支出后': 'After expected expenses',
  '余额趋势': 'Balance trend',
  '最近 5 条资金流水': '5 most recent transactions',
  '最近 7 天账户变化': 'Balance changes over the last 7 days',
  '最近 7 天': 'Last 7 days',
  '还没有资金记录': 'No transactions yet',
  '点击右上角“记一笔”开始记录。': 'Select “Add transaction” in the top-right to get started.',
  '还没有固定支出': 'No fixed expenses yet',
  '添加房租、订阅或其他已确定支出。': 'Add rent, subscriptions or other confirmed expenses.',
  '还没有预计收入': 'No expected income yet',
  '添加工资、项目款或其他确定收入。': 'Add salary, project payments or other confirmed income.',
  '其他预计支出': 'Other expected expenses',
  '汇总金额': 'Combined amount',
  '预计支出金额': 'Expected expense amount',
  '设置其他预计支出': 'Set other expected expenses',
  '该金额会计入预计支出，但不会改变当前账户。': 'This amount affects projections but does not change the current balance.',
  '记录一笔资金': 'Add a transaction',
  '使用与 Personal Funds 一致的收支口径。': 'Uses the same transaction rules as Personal Funds.',
  '记录未来已确定但尚未到账的收入。': 'Record confirmed income that has not arrived yet.',
  '记录未来已确定但尚未发生的支出。': 'Record confirmed expenses that have not occurred yet.',
  '例如：工资或项目款': 'For example: Salary or a project payment',
  '例如：房租或订阅': 'For example: Rent or a subscription',
  '个人资金数据库': 'Personal finance database',

  // Finance types. The IDs remain unchanged.
  '收入': 'Income',
  '支出': 'Expense',
  '信用卡支出': 'Credit card expense',
  '还信用卡': 'Credit card repayment',
  '借出': 'Loan out',
  '收回借出': 'Loan repayment received',
  '账户调整': 'Balance adjustment',

  // Finance category display names. Their underlying option values remain Chinese.
  '餐饮': 'Food & dining',
  '交通': 'Transport',
  '设备': 'Equipment',
  '学习': 'Learning',
  '工资': 'Salary',
  '信用卡': 'Credit card',
  '其他': 'Other',

  // Image renaming, Canvas and Bases integration.
  '图片与附件': 'Images & attachments',
  '自动命名、引用修复、Canvas 与 Base 工具':
    'Automatic naming, reference repair, Canvas and Bases tools',
  '启用自动图片重命名': 'Enable automatic image renaming',
  '新建或粘贴 PNG、JPG、JPEG 时，按当前笔记名和六位序号自动整理。':
    'Automatically organize new or pasted PNG, JPG and JPEG files using the current note name and a six-digit sequence.',
  '粘贴 PNG、JPG、JPEG 后自动命名为“笔记名_000001”。':
    'Automatically name pasted PNG, JPG and JPEG files as “Note name_000001”.',
  '图片目标文件夹': 'Image destination folder',
  '留空时保留在图片原目录；可填写例如 Mind/Images。':
    'Leave blank to keep images in their current folder, or enter a path such as Mind/Images.',
  '留空时保留图片原目录；支持例如 Mind/Images。':
    'Leave blank to keep images in their current folder. Paths such as Mind/Images are supported.',
  'Canvas 图片文件名': 'Canvas image filenames',
  '控制 Canvas 图片节点文件名的显示方式。':
    'Choose how filenames appear on Canvas image nodes.',
  '控制图片节点标签的显示方式。':
    'Choose how labels appear on image nodes.',
  '始终显示': 'Always show',
  '悬停显示': 'Show on hover',
  '隐藏': 'Hide',
  '在文件列表隐藏 PNG': 'Hide PNG files in the file explorer',
  '只在界面上隐藏，不会删除文件。':
    'Hides files in the interface only; no files are deleted.',
  '只隐藏文件树条目，不会删除任何图片。':
    'Only hides file-tree entries; no images are deleted.',
  'Base 名称样式': 'Bases name styling',
  '按文件扩展名为 Bases 的名称列设置颜色。':
    'Color the name column in Bases according to file extension.',
  '扩展名': 'Extension',
  '名称': 'Name',
  '文件反向链接': 'File backlinks',
  '修改时间': 'Modified',
  '颜色': 'Color',
  '创建 Base': 'Create Base',
  '创建 Files.base': 'Create Files.base',
  '创建默认 Files.base': 'Create default Files.base',
  '删除规则': 'Delete rule',
  '创建排除 PNG 和 Base 文件的 Obsidian Bases 默认视图。':
    'Create a default Obsidian Bases view that excludes PNG and Base files.',
  '整理当前笔记图片': 'Organize images in current note',
  '检查并整理': 'Review & organize',
  '检查并整理当前笔记': 'Review and organize current note',
  '检查 Markdown 或 Canvas 引用，并按出现顺序统一重命名。':
    'Review Markdown and Canvas references, then rename images consistently in order of appearance.',
  '图片设置已保存': 'Image settings saved',
  '没有找到当前文件。': 'No active file was found.',
  '当前文件不是 Markdown 或 Canvas。':
    'The current file is not a Markdown or Canvas file.',
  '整理当前文件中的图片失败，请查看控制台。':
    'Could not organize images in the current file. Check the console for details.',
  '创建 Files.base 失败，请查看控制台。':
    'Could not create Files.base. Check the console for details.',
  '图片自动重命名失败，请查看控制台。':
    'Automatic image renaming failed. Check the console for details.',
  '当前文件中没有找到图片。': 'No images were found in the current file.',

  // Mind map integration.
  '思维导图': 'Mind map',
  '离线 SVG 引擎，Markdown 就是数据源':
    'Offline SVG engine powered directly by Markdown',
  '启用思维导图': 'Enable mind maps',
  '将 Markdown 标题和缩进列表渲染为可交互 SVG 思维导图。':
    'Render Markdown headings and indented lists as an interactive SVG mind map.',
  '支持 Markdown 标题和缩进列表、缩放、拖动及节点折叠。':
    'Supports Markdown headings and indented lists, zooming, panning and collapsible nodes.',
  '跟随当前文件': 'Follow current file',
  '跟随当前 Markdown 文件，或将当前文件固定到一个导图页签。':
    'Follow the active Markdown file, or pin the current file to a mind-map tab.',
  '固定当前文件': 'Pin current file',
  '文档标题作为根节点': 'Use document title as root',
  '开启后使用文件名作为导图最上层节点。':
    'When enabled, the filename becomes the top-level mind-map node.',
  '导图方向': 'Map direction',
  '选择主要展开方向。': 'Choose the primary layout direction.',
  '选择从左向右或从上向下展开。':
    'Choose a left-to-right or top-to-bottom layout.',
  '横向': 'Horizontal',
  '纵向': 'Vertical',
  '从左向右': 'Left to right',
  '从上向下': 'Top to bottom',
  '初始展开层级': 'Initial expansion depth',
  '-1 表示全部展开。': '-1 expands all levels.',
  '显示导图工具栏': 'Show mind-map toolbar',
  '显示工具栏': 'Show toolbar',
  '显示适配、展开、折叠和缩放按钮。':
    'Show fit, expand, collapse and zoom buttons.',
  '显示适配、展开、折叠和缩放操作。':
    'Show fit, expand, collapse and zoom controls.',
  '打开思维导图': 'Open mind map',
  '适配视图': 'Fit view',
  '放大': 'Zoom in',
  '缩小': 'Zoom out',
  '展开': 'Expand',
  '折叠': 'Collapse',
  '展开全部': 'Expand all',
  '折叠全部': 'Collapse all',
  '固定': 'Pinned',
  '跟随': 'Following',
  '固定的 Markdown 文件不存在或已被移除':
    'The pinned Markdown file no longer exists or has been removed',
  '请先打开一个 Markdown 文件': 'Open a Markdown file first',
  '无法读取': 'Unable to read',
  '此笔记中还没有 ATX 标题或 Markdown 列表':
    'This note has no ATX headings or Markdown lists yet',
  '此 markmap 代码块中没有标题或列表':
    'This markmap block has no headings or lists',
  '请先在 Open Manage 设置中启用思维导图':
    'Enable mind maps in Open Manage settings first',

  // Settings and storage.
  '数据文件夹': 'Data folder',
  '界面与数据': 'Interface & data',
  '界面与语言': 'Interface & language',
  '界面语言': 'Interface language',
  '切换管理界面的显示语言。': 'Choose the language used by the management interface.',
  '管理页面、弹窗和功能设置使用同一语言。':
    'Use one language across pages, dialogs and feature settings.',
  '即时切换，不改变业务数据': 'Switch instantly without changing business data',
  '中文（简体）': 'Chinese (Simplified)',
  '项目、资金、图片整理和思维导图统一由一个插件管理。':
    'Manage projects, finances, image organization and mind maps in one plugin.',
  '业务数据保存在笔记库的独立文件夹中，插件 data.json 只保存文件夹设置。':
    'Business data is stored in a separate vault folder. The plugin data.json stores settings only.',
  '业务数据保存在可同步的独立文件中':
    'Business data is stored in separate files that can be synced',
  '包含 management.md、planning.md 和 finance.md。修改时会把当前数据复制到新文件夹，不删除旧目录。':
    'Contains management.md, planning.md and finance.md. Changing it copies current data to the new folder without deleting the old one.',
  '切换目录时会先复制当前数据，不会自动删除旧文件夹。':
    'Changing folders copies current data first and does not delete the old folder.',
  '当前数据': 'Current data',
  '只读统计': 'Read-only totals',
  '资金记录': 'Transactions',
  '纯本地插件数据，不生成笔记文件': 'Local plugin data only; no notes are generated',
  '数据文件夹不能为空': 'The data folder cannot be empty',
  '数据文件夹设置失败': 'Could not update the data folder',
  '查看插件数据与界面信息': 'Review plugin data and interface settings',
  '> Open Manage 的本地数据文件。可以随笔记库同步，请不要手动破坏 JSON 代码块。':
    '> Local Open Manage data. It can sync with the vault; do not manually damage the JSON code block.',

  // Modal prompts, validation and confirmations.
  '请填写名称': 'Enter a name',
  '请输入大于 0 的金额': 'Enter an amount greater than 0',
  '请输入大于或等于 0 的金额': 'Enter an amount greater than or equal to 0',
  '删除项目？': 'Delete project?',
  '删除行动？': 'Delete action?',
  '删除想法？': 'Delete idea?',
  '删除资金记录？': 'Delete transaction?',
  '删除这条项目？': 'Delete this item?',
  '关联行动会被保留，但不再归属该项目。':
    'Related actions will be kept, but they will no longer belong to this project.',
  '这项操作无法撤销。': 'This action cannot be undone.',

  // Notices.
  '管理数据读取失败，请检查数据文件夹中的 JSON 代码块':
    'Could not read management data. Check the JSON code blocks in the data folder.',
  '项目已创建': 'Project created',
  '项目已更新': 'Project updated',
  '项目已删除，关联行动已保留': 'Project deleted; related actions were kept',
  '行动已创建': 'Action created',
  '行动已更新': 'Action updated',
  '行动已删除': 'Action deleted',
  '行动已完成': 'Action completed',
  '行动已重新打开': 'Action reopened',
  '想法已记录': 'Idea captured',
  '想法已更新': 'Idea updated',
  '想法已删除': 'Idea deleted',
  '想法已提升为项目': 'Idea promoted to a project',
  '资金记录已保存': 'Transaction saved',
  '资金记录已删除': 'Transaction deleted',
  '固定支出已保存': 'Fixed expense saved',
  '固定支出已删除': 'Fixed expense deleted',
  '预计收入已保存': 'Expected income saved',
  '预计收入已删除': 'Expected income deleted',
  '预计支出已保存': 'Expected expense saved',

  // Database headings and remaining descriptive copy.
  '未来规划数据库': 'Planning database',
  '聚焦结果、阻塞和马上要做的下一步':
    'Focus on outcomes, blockers and the next action to take',
  '目标结果和执行信息会在这里汇总。':
    'Target outcomes and execution details will appear here.',
  '只启动真正需要投入的项目。': 'Only start projects that truly deserve attention.',
  '没有正在推进的项目': 'No active projects'
});

const DYNAMIC_TRANSLATIONS = Object.freeze([
  {
    pattern: /^逾期\s+(\d+)\s+天$/,
    replace: match => `${match[1]} ${Number(match[1]) === 1 ? 'day' : 'days'} overdue`
  },
  {
    pattern: /^(\d{4}-\d{2}-\d{2})\s+截止$/,
    replace: match => `Due ${match[1]}`
  },
  {
    pattern: /^(\d+)\/(\d+)\s+个行动$/,
    replace: match => `${match[1]}/${match[2]} actions`
  },
  {
    pattern: /^下一步：([\s\S]*)$/,
    replace: match => `Next: ${translateText(match[1], 'en')}`
  },
  {
    pattern: /^数据已迁移到\s+([\s\S]+)$/,
    replace: match => `Data migrated to ${match[1]}`
  },
  {
    pattern: /^数据已复制到\s+([\s\S]+)，并设为新的主数据文件夹$/,
    replace: match => `Data copied to ${match[1]} and set as the primary data folder`
  },
  {
    pattern: /^已创建\s+([\s\S]+)$/,
    replace: match => `Created ${match[1]}`
  },
  {
    pattern: /^已移除\s+(\d+)\s+个失效图片节点。$/,
    replace: match =>
      `Removed ${match[1]} broken image ${Number(match[1]) === 1 ? 'node' : 'nodes'}.`
  },
  {
    pattern: /^已检查\s+(\d+)\s+张图片；重命名\s+(\d+)\s+张；未变化\s+(\d+)\s+张；移除失效节点\s+(\d+)\s+个。$/,
    replace: match => {
      const imageWord = Number(match[1]) === 1 ? 'image' : 'images';
      const nodeWord = Number(match[4]) === 1 ? 'node' : 'nodes';
      return `Checked ${match[1]} ${imageWord}; renamed ${match[2]}; unchanged ${match[3]}; removed ${match[4]} broken ${nodeWord}.`;
    }
  },
  {
    pattern: /^无法整理图片，目标已存在：([\s\S]+)$/,
    replace: match => `Could not organize the image because the destination already exists: ${match[1]}`
  },
  {
    pattern: /^([\s\S]+)，(展开|折叠)$/,
    replace: match => `${match[1]}, ${match[2] === '展开' ? 'Expand' : 'Collapse'}`
  },
  {
    pattern: /^＋\s+([\s\S]+)$/,
    replace: match => `+ ${translateText(match[1], 'en')}`
  },
  {
    pattern: /^最近\s+(\d+)\s+条资金流水$/,
    replace: match => `${match[1]} most recent transactions`
  },
  {
    pattern: /^最近\s+(\d+)\s+天账户变化$/,
    replace: match => `Balance changes over the last ${match[1]} days`
  },
  {
    pattern: /^最近\s+(\d+)\s+天$/,
    replace: match => `Last ${match[1]} days`
  },
  {
    pattern: /^最多展示\s+(\d+)\s+个最重要行动$/,
    replace: match => `Up to ${match[1]} highest-priority actions`
  }
]);

const LOCALIZED_ATTRIBUTES = Object.freeze([
  'placeholder',
  'title',
  'aria-label',
  'data-label'
]);

function normalizeLanguage(language) {
  const normalized = String(language || '').trim().toLowerCase();
  return normalized === 'en' || normalized.startsWith('en-') ? 'en' : DEFAULT_LANGUAGE;
}

function languageLabel(language, displayLanguage = language) {
  const value = normalizeLanguage(language);
  const display = normalizeLanguage(displayLanguage);
  const option = LANGUAGE_OPTIONS.find(item => item.value === value) || LANGUAGE_OPTIONS[0];
  return option.labels[display] || option.label;
}

function translateText(text, language) {
  if (normalizeLanguage(language) !== 'en' || typeof text !== 'string' || !text) {
    return text;
  }

  const whitespace = text.match(/^(\s*)([\s\S]*?)(\s*)$/);
  const leading = whitespace ? whitespace[1] : '';
  const source = whitespace ? whitespace[2] : text;
  const trailing = whitespace ? whitespace[3] : '';

  if (!source) return text;

  const exact = ENGLISH_TEXT[source];
  if (exact !== undefined) return `${leading}${exact}${trailing}`;

  for (const rule of DYNAMIC_TRANSLATIONS) {
    const match = source.match(rule.pattern);
    if (match) return `${leading}${rule.replace(match)}${trailing}`;
  }

  return text;
}

function shouldSkipChildren(element) {
  const tagName = String(element?.tagName || '').toUpperCase();
  return tagName === 'SCRIPT' ||
    tagName === 'STYLE' ||
    tagName === 'CODE' ||
    tagName === 'PRE' ||
    element?.hasAttribute?.('data-no-i18n');
}

function localizeElement(root, language) {
  if (!root || normalizeLanguage(language) !== 'en') return root;

  const visit = node => {
    if (!node) return;

    // Text node. Values held by form controls are properties, not these nodes.
    if (node.nodeType === 3) {
      const translated = translateText(node.nodeValue, 'en');
      if (translated !== node.nodeValue) node.nodeValue = translated;
      return;
    }

    // Only elements (1), documents (9) and document fragments (11) can contain
    // localizable descendants. This avoids depending on browser Node constants.
    if (node.nodeType !== 1 && node.nodeType !== 9 && node.nodeType !== 11) return;

    if (node.nodeType === 1) {
      for (const attribute of LOCALIZED_ATTRIBUTES) {
        if (!node.hasAttribute?.(attribute)) continue;
        const current = node.getAttribute(attribute);
        const translated = translateText(current, 'en');
        if (translated !== current) node.setAttribute(attribute, translated);
      }
      if (shouldSkipChildren(node)) return;
    }

    // Snapshot the collection so a host implementation cannot invalidate the
    // traversal while text nodes are being updated.
    for (const child of Array.from(node.childNodes || [])) visit(child);
  };

  visit(root);
  return root;
}

module.exports = {
  DEFAULT_LANGUAGE,
  LANGUAGE_OPTIONS,
  ENGLISH_TEXT,
  normalizeLanguage,
  languageLabel,
  translateText,
  localizeElement
};
