# Open Obsidian Manage

Open Obsidian Manage is a full-window management suite that combines project execution, future planning, personal funds, image workflows, and Markdown mind maps in one Obsidian plugin.

## Modules

- **总览**：当前焦点、项目推进、下一步行动和资金快照。
- **项目进度**：项目概览、任务、问题与阻塞、项目资料。
- **未来规划**：规划概览、目标、时间线、想法验证。
- **个人资金**：概览、最近记录、固定支出、预计收入、账户管理。
- **设置**：中英文切换、数据文件夹、图片整理、思维导图和数据量统计。

Each module remembers its most recently opened secondary page while the workspace remains open.

## File database

Business data is stored in a configurable folder inside the vault. The default folder is:

```text
Archive/
└─ img/
   └─ Open_Manager/
      ├─ management.md
      ├─ planning.md
      └─ finance.md
```

- `management.md` stores projects and actions.
- `planning.md` stores ideas and future-planning data.
- `finance.md` stores records, fixed expenses, expected income, and projections.

Each file contains a readable Markdown heading and a fenced JSON database payload. This makes the data compatible with normal vault sync and backup tools.

The plugin's own `data.json` stores interface and feature settings only. Business records remain in the Markdown databases above.

## Changing the data folder

Change the folder from either:

- the plugin's **设置** module; or
- Obsidian Settings → Community plugins → Open Obsidian Manage.

When changing the folder, the plugin copies the current database to the new location and switches the new folder to the primary data source. It does not automatically delete the old folder.

## Migration and compatibility

Version 3.0.8 supports:

- migration of the earlier Manage `projects`, `actions`, `ideas`, and `finance` plugin data;
- import of `Personal_funds/records.md`, including records, fixed expenses, expected income, and expected-expense values;
- preserving existing management IDs, fields, statuses, and calculation rules.
- Chinese and English interface switching without changing stored business values.
- integrated automatic image renaming and Markdown/Canvas reference repair.
- an offline SVG mind-map view generated directly from Markdown headings and lists.

The finance calculation rules remain compatible with Personal Funds:

- current account changes with income, cash expenses, credit-card repayment, lending, collection, and account adjustments;
- credit-card spending increases credit-card balance without immediately reducing the current account;
- fixed expenses and expected income affect projections without changing recorded balances.

## Interface

- Full-height workspace with independent scrolling.
- 220px primary navigation on wide and medium panes.
- 64px icon navigation on narrow panes.
- Module-specific secondary navigation.
- Host-proof transparent navigation controls that remain consistent across Obsidian themes.
- Viewport-safe modals with fixed headers and actions plus an independently scrolling form body.
- Responsive cards, list-mode tables, fluid charts, and container-query typography.
- Restrained dark visual system with consistent states, forms, empty states, and confirmation dialogs.

## Installation

Copy these files into `.obsidian/plugins/open-obsidian-manage/`:

- `manifest.json`
- `main.js`
- `styles.css`

Reload Obsidian, enable **Open Obsidian Manage**, then run **打开管理中枢**.
