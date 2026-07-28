var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};

// i18n.js
var require_i18n = __commonJS({
  "i18n.js"(exports2, module2) {
    "use strict";
    var DEFAULT_LANGUAGE = "zh-CN";
    var LANGUAGE_OPTIONS = Object.freeze([
      Object.freeze({
        value: "zh-CN",
        label: "\u4E2D\u6587\uFF08\u7B80\u4F53\uFF09",
        labels: Object.freeze({
          "zh-CN": "\u4E2D\u6587\uFF08\u7B80\u4F53\uFF09",
          en: "Chinese (Simplified)"
        })
      }),
      Object.freeze({
        value: "en",
        label: "English",
        labels: Object.freeze({
          "zh-CN": "English",
          en: "English"
        })
      })
    ]);
    var ENGLISH_TEXT = Object.freeze({
      // Brand, navigation and page names.
      "\u6E05\u6670\u5730\u63A8\u8FDB\u4E00\u4EF6\u4E8B": "Move meaningful work forward",
      "\u591A\u529F\u80FD\u7BA1\u7406\u4E2D\u67A2": "Integrated management workspace",
      "\u5DE5\u4F5C\u7A7A\u95F4": "Workspace",
      "\u603B\u89C8": "Overview",
      "\u5168\u5C40\u6982\u89C8": "Global overview",
      "\u7BA1\u7406\u603B\u89C8": "Management overview",
      "\u5DE5\u4F5C\u53F0": "Workspace",
      "\u9879\u76EE": "Project",
      "\u9879\u76EE\u8FDB\u5EA6": "Projects",
      "\u9879\u76EE\u6982\u89C8": "Project overview",
      "\u4EFB\u52A1": "Tasks",
      "\u884C\u52A8": "Actions",
      "\u95EE\u9898\u4E0E\u963B\u585E": "Issues & blockers",
      "\u9879\u76EE\u8D44\u6599": "Project materials",
      "\u672A\u6765\u89C4\u5212": "Planning",
      "\u89C4\u5212\u6982\u89C8": "Planning overview",
      "\u76EE\u6807": "Goals",
      "\u65F6\u95F4\u7EBF": "Timeline",
      "\u60F3\u6CD5": "Ideas",
      "\u4E2A\u4EBA\u8D44\u91D1": "Personal finance",
      "\u4E2A\u4EBA\u8D44\u91D1\u6982\u89C8": "Personal finance overview",
      "\u6700\u8FD1\u8BB0\u5F55": "Recent activity",
      "\u56FA\u5B9A\u652F\u51FA": "Fixed expenses",
      "\u9884\u8BA1\u6536\u5165": "Expected income",
      "\u8D26\u6237\u7BA1\u7406": "Accounts",
      "\u8BBE\u7F6E": "Settings",
      "\u7CFB\u7EDF": "System",
      "\u7BA1\u7406\u4E2D\u67A2": "Management hub",
      "\u9875\u9762\u5BFC\u822A": "Page navigation",
      "\u6982\u89C8": "Overview",
      // Common actions and shared labels.
      "\u6253\u5F00\u7BA1\u7406\u4E2D\u67A2": "Open management hub",
      "\u8BFB\u53D6\u6570\u636E": "Read data",
      "\u8BFB\u53D6\u6570\u636E\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u6570\u636E\u6587\u4EF6\u5939\u4E2D\u7684 JSON \u4EE3\u7801\u5757": "Could not read data. Check the JSON blocks in the data folder.",
      "\u5237\u65B0": "Refresh",
      "\u4FDD\u5B58": "Save",
      "\u4FDD\u5B58\u4FEE\u6539": "Save changes",
      "\u4FDD\u5B58\u8BB0\u5F55": "Save transaction",
      "\u4FDD\u5B58\u5E76\u8FC1\u79FB": "Save & migrate",
      "\u53D6\u6D88": "Cancel",
      "\u7F16\u8F91": "Edit",
      "\u7F16\u8F91\u9879\u76EE": "Edit project",
      "\u7F16\u8F91\u884C\u52A8": "Edit action",
      "\u7F16\u8F91\u60F3\u6CD5": "Edit idea",
      "\u5220\u9664": "Delete",
      "\u5220\u9664\u9879\u76EE": "Delete project",
      "\u5220\u9664\u60F3\u6CD5": "Delete idea",
      "\u5220\u9664\u8BB0\u5F55": "Delete transaction",
      "\u786E\u8BA4\u5220\u9664": "Delete",
      "\u6807\u8BB0\u5B8C\u6210": "Mark complete",
      "\u91CD\u65B0\u6253\u5F00": "Reopen",
      "\u6DFB\u52A0\u884C\u52A8": "Add action",
      "\u63D0\u5347\u4E3A\u9879\u76EE": "Promote to project",
      "\u8FDB\u5165\u4E2A\u4EBA\u8D44\u91D1": "Open personal finance",
      "\u67E5\u770B\u8D44\u91D1\u6A21\u5757 \u2192": "Open finance \u2192",
      "\u65B0\u5EFA\u9879\u76EE": "New project",
      "\u65B0\u5EFA\u884C\u52A8": "New action",
      "\u65B0\u5EFA\u4EFB\u52A1": "New task",
      "\u521B\u5EFA\u9879\u76EE": "Create project",
      "\u521B\u5EFA\u884C\u52A8": "Create action",
      "\u8BB0\u5F55\u60F3\u6CD5": "Capture idea",
      "\u8BB0\u4E00\u7B14": "Add transaction",
      "\u6DFB\u52A0\u56FA\u5B9A\u652F\u51FA": "Add fixed expense",
      "\u6DFB\u52A0\u9884\u8BA1\u6536\u5165": "Add expected income",
      "\u8BBE\u7F6E\u9884\u8BA1\u652F\u51FA": "Set expected expense",
      "\uFF0B \u65B0\u5EFA\u9879\u76EE": "+ New project",
      "\uFF0B \u65B0\u5EFA\u884C\u52A8": "+ New action",
      "\uFF0B \u65B0\u5EFA\u4EFB\u52A1": "+ New task",
      "\uFF0B \u8BB0\u5F55\u60F3\u6CD5": "+ Capture idea",
      "\uFF0B \u8BB0\u4E00\u7B14": "+ Add transaction",
      "\uFF0B \u6DFB\u52A0\u56FA\u5B9A\u652F\u51FA": "+ Add fixed expense",
      "\uFF0B \u6DFB\u52A0\u9884\u8BA1\u6536\u5165": "+ Add expected income",
      "\u6B63\u5728\u4FDD\u5B58\u2026": "Saving\u2026",
      "\u64CD\u4F5C": "Actions",
      // Filters, statuses and priorities.
      "\u5168\u90E8": "All",
      "\u5168\u90E8\u7C7B\u578B": "All types",
      "\u672A\u5B8C\u6210": "Open",
      "\u5F85\u5904\u7406": "To do",
      "\u5F85\u5F00\u59CB": "Planned",
      "\u8FDB\u884C\u4E2D": "In progress",
      "\u963B\u585E": "Blocked",
      "\u5DF2\u5B8C\u6210": "Completed",
      "\u5DF2\u7ACB\u9879": "Promoted",
      "\u5F85\u9A8C\u8BC1": "To validate",
      "\u672A\u9009\u62E9": "None",
      "P0 \xB7 \u7D27\u6025": "P0 \xB7 Urgent",
      "P1 \xB7 \u91CD\u8981": "P1 \xB7 Important",
      "P2 \xB7 \u5E38\u89C4": "P2 \xB7 Normal",
      "P3 \xB7 \u7A0D\u540E": "P3 \xB7 Later",
      "\u72B6\u6001": "Status",
      "\u4F18\u5148\u7EA7": "Priority",
      // Dates and generic form/table labels.
      "\u65E5\u671F": "Date",
      "\u622A\u6B62\u65E5\u671F": "Due date",
      "\u66F4\u65B0\u65F6\u95F4": "Updated",
      "\u65E0\u622A\u6B62\u65E5\u671F": "No due date",
      "\u4ECA\u5929\u622A\u6B62": "Due today",
      "\u660E\u5929\u622A\u6B62": "Due tomorrow",
      "\u540D\u79F0 *": "Name *",
      "\u5907\u6CE8": "Notes",
      "\u65E0\u5907\u6CE8": "No notes",
      "\u53EF\u4E0D\u586B": "Optional",
      "\u7C7B\u578B": "Type",
      "\u8BB0\u5F55\u7C7B\u578B": "Transaction type",
      "\u5206\u7C7B": "Category",
      "\u5206\u7C7B/\u5BF9\u8C61": "Category / person",
      "\u5BF9\u8C61": "Person",
      "\u91D1\u989D": "Amount",
      "\u91D1\u989D *": "Amount *",
      "\u5143": "CNY",
      " \u5143": " CNY",
      "\u672A\u586B\u5199": "Not provided",
      "\u5C1A\u672A\u586B\u5199": "Not provided",
      "\u672A\u6307\u5B9A": "Unassigned",
      "\u672A\u6307\u5B9A\u8D1F\u8D23\u4EBA": "No owner",
      // General overview.
      "\u96C6\u4E2D\u67E5\u770B\u9879\u76EE\u3001\u884C\u52A8\u3001\u89C4\u5212\u548C\u8D44\u91D1\u72B6\u6001": "See projects, actions, plans and finances in one place",
      "\u5F53\u524D\u6700\u91CD\u8981\u7684\u4E00\u6B65": "Most important next step",
      "\u5148\u521B\u5EFA\u4E00\u4E2A\u6E05\u6670\u3001\u53EF\u4EE5\u7ACB\u5373\u6267\u884C\u7684\u884C\u52A8": "Create one clear action you can start now",
      "\u7BA1\u7406\u4ECE\u660E\u786E\u4E0B\u4E00\u6B65\u5F00\u59CB": "Good management starts with a clear next step",
      "\u8FDB\u884C\u4E2D\u9879\u76EE": "Active projects",
      "\u5F85\u5B8C\u6210\u884C\u52A8": "Open actions",
      "\u5F53\u524D\u963B\u585E": "Current blockers",
      "\u5F85\u9A8C\u8BC1\u60F3\u6CD5": "Ideas to validate",
      "\u5F85\u8BC4\u4F30\u60F3\u6CD5": "Ideas to review",
      "\u672C\u5468\u805A\u7126": "This week\u2019s focus",
      "\u6700\u591A\u5C55\u793A 3 \u4E2A\u6700\u91CD\u8981\u884C\u52A8": "Up to 3 highest-priority actions",
      "\u9879\u76EE\u5065\u5EB7\u5EA6": "Project health",
      "\u68C0\u67E5\u662F\u5426\u62E5\u6709\u6E05\u6670\u4E0B\u4E00\u6B65": "Check that every project has a clear next step",
      "\u9700\u8981\u5904\u7406\u7684\u963B\u585E": "Blockers to resolve",
      "\u5148\u89E3\u9664\u963B\u585E\uFF0C\u518D\u589E\u52A0\u4EFB\u52A1": "Resolve blockers before adding more work",
      "\u6700\u8FD1\u60F3\u6CD5": "Recent ideas",
      "\u5148\u505A\u6700\u5C0F\u9A8C\u8BC1": "Start with the smallest useful test",
      "\u6B63\u5728\u63A8\u8FDB": "In progress",
      "\u6D3B\u8DC3\u9879\u76EE\u4E0E\u5B8C\u6210\u8FDB\u5EA6": "Active projects and completion",
      "\u63A5\u4E0B\u6765": "Up next",
      "\u6309\u4F18\u5148\u7EA7\u4E0E\u622A\u6B62\u65E5\u671F\u6392\u5E8F": "Sorted by priority and due date",
      "\u8D44\u91D1\u5FEB\u7167": "Finance snapshot",
      "\u5F53\u524D\u8D26\u6237\u4E0E\u672A\u6765\u9884\u671F": "Current balance and upcoming commitments",
      "\u8FD8\u6CA1\u6709\u5F85\u6267\u884C\u884C\u52A8": "No pending actions",
      "\u5148\u521B\u5EFA\u4E00\u4E2A\u8DB3\u591F\u5177\u4F53\u7684\u4E0B\u4E00\u6B65\u3002": "Create a concrete next step first.",
      "\u8FD8\u6CA1\u6709\u9879\u76EE": "No projects yet",
      "\u4ECE\u4E00\u4E2A\u660E\u786E\u7ED3\u679C\u5F00\u59CB\u5EFA\u7ACB\u9879\u76EE\u3002": "Start a project with a clearly defined outcome.",
      "\u5F53\u524D\u6CA1\u6709\u963B\u585E": "No blockers right now",
      "\u4FDD\u6301\u4E0B\u4E00\u6B65\u660E\u786E\u5373\u53EF\u3002": "Keep the next step clear.",
      "\u60F3\u6CD5\u6536\u4EF6\u7BB1\u4E3A\u7A7A": "The idea inbox is empty",
      "\u968F\u65F6\u8BB0\u5F55\uFF0C\u4F46\u4E0D\u8981\u6025\u7740\u5168\u90E8\u7ACB\u9879\u3002": "Capture ideas freely without turning all of them into projects.",
      "\u4FDD\u6301\u514B\u5236\uFF0C\u4E0D\u8981\u4E3A\u4E86\u5FD9\u788C\u800C\u589E\u52A0\u4EFB\u52A1\u3002": "Stay focused; do not add work just to stay busy.",
      // Projects.
      "\u67E5\u770B\u9879\u76EE\u72B6\u6001\u3001\u8FDB\u5EA6\u3001\u8D1F\u8D23\u4EBA\u548C\u660E\u786E\u4E0B\u4E00\u6B65": "Review project status, progress, owners and next steps",
      "\u7528\u660E\u786E\u7684\u7ED3\u679C\u548C\u5B8C\u6210\u6807\u51C6\u7BA1\u7406\u6295\u5165": "Manage effort with clear outcomes and completion criteria",
      "\u9879\u76EE\u540D\u79F0 *": "Project name *",
      "\u76EE\u6807\u7ED3\u679C": "Target outcome",
      "\u8D1F\u8D23\u4EBA": "Owner",
      "\u4E0B\u4E00\u6B65": "Next step",
      "\u963B\u585E\u539F\u56E0": "Blocker",
      "\u5C1A\u672A\u586B\u5199\u76EE\u6807\u7ED3\u679C": "No target outcome",
      "\u5C1A\u672A\u586B\u5199\u4E0B\u4E00\u6B65": "No next step",
      "\u5C1A\u672A\u586B\u5199\u963B\u585E\u539F\u56E0": "No blocker details",
      "\u672A\u586B\u5199\u963B\u585E\u539F\u56E0": "No blocker details",
      "\u8BF7\u8865\u5145\u963B\u585E\u539F\u56E0": "Add the reason for the blocker",
      "\u7F3A\u5C11\u4E0B\u4E00\u6B65": "Missing next step",
      "\u8FD9\u4E2A\u89C6\u56FE\u8FD8\u6CA1\u6709\u9879\u76EE": "No projects in this view",
      "\u65B0\u5EFA\u9879\u76EE\uFF0C\u5199\u6E05\u7ED3\u679C\u3001\u8D1F\u8D23\u4EBA\u548C\u4E0B\u4E00\u6B65\u3002": "Create a project with a clear outcome, owner and next step.",
      "\u6C47\u603B\u6BCF\u4E2A\u9879\u76EE\u7684\u76EE\u6807\u3001\u7ED3\u679C\u548C\u6267\u884C\u4E0A\u4E0B\u6587": "Bring each project\u2019s goals, outcomes and execution context together",
      "\u8FD8\u6CA1\u6709\u9879\u76EE\u8D44\u6599": "No project materials yet",
      "\u521B\u5EFA\u9879\u76EE\u540E\uFF0C\u76EE\u6807\u7ED3\u679C\u548C\u6267\u884C\u4FE1\u606F\u4F1A\u5728\u8FD9\u91CC\u6C47\u603B\u3002": "Project outcomes and execution details will appear here.",
      "\u9879\u76EE\u4E0E\u884C\u52A8\u6570\u636E\u5E93": "Projects and actions database",
      "\u5148\u5199\u6E05\u7ED3\u679C\uFF0C\u518D\u6295\u5165\u65F6\u95F4\u3002": "Define the outcome before investing time.",
      "\u4F8B\u5982\uFF1A\u5B8C\u6210\u7B2C\u4E00\u7248\u53EF\u7528\u539F\u578B": "For example: Complete the first usable prototype",
      "\u5B8C\u6210\u540E\u5177\u4F53\u4F1A\u5F97\u5230\u4EC0\u4E48\uFF1F": "What tangible result will completion produce?",
      "\u4E00\u4E2A\u660E\u786E\u8D1F\u8D23\u4EBA": "One accountable owner",
      "\u4E0B\u4E00\u6B21\u4E13\u6CE8\u65F6\u95F4\u91CC\u5177\u4F53\u505A\u4EC0\u4E48\uFF1F": "What exactly will you do in the next focused session?",
      "\u4EC5\u5728\u963B\u585E\u65F6\u586B\u5199": "Only complete this when blocked",
      // Actions and blockers.
      "\u6309\u4F18\u5148\u7EA7\u548C\u622A\u6B62\u65E5\u671F\u63A8\u8FDB\u5177\u4F53\u884C\u52A8": "Move concrete actions forward by priority and due date",
      "\u628A\u4E0B\u4E00\u6B65\u62C6\u6210\u53EF\u4EE5\u771F\u6B63\u5B8C\u6210\u7684\u5C0F\u4EFB\u52A1": "Break next steps into actions you can actually finish",
      "\u884C\u52A8\u540D\u79F0 *": "Action name *",
      "\u6240\u5C5E\u9879\u76EE": "Project",
      "\u72EC\u7ACB\u884C\u52A8": "Independent action",
      "\u8FD9\u4E2A\u89C6\u56FE\u8FD8\u6CA1\u6709\u884C\u52A8": "No actions in this view",
      "\u521B\u5EFA\u4E00\u4E2A\u53EF\u4EE5\u5728\u4E00\u6B21\u4E13\u6CE8\u65F6\u95F4\u5185\u5B8C\u6210\u7684\u52A8\u4F5C\u3002": "Create an action that fits into one focused session.",
      "\u884C\u52A8\u5DF2\u7ECF\u6E05\u7A7A": "All actions are complete",
      "\u7528\u52A8\u8BCD\u5F00\u5934\uFF0C\u4F8B\u5982\uFF1A\u5B8C\u6210\u6D4B\u8BD5\u7A0B\u5E8F": "Start with a verb, for example: Complete the test program",
      "\u884C\u52A8\u5E94\u8BE5\u5C0F\u5230\u53EF\u4EE5\u4E00\u6B21\u5B8C\u6210\u3002": "An action should be small enough to finish in one session.",
      "\u8865\u5145\u5B8C\u6210\u6807\u51C6\u6216\u4E0A\u4E0B\u6587": "Add completion criteria or context",
      "\u96C6\u4E2D\u5904\u7406\u5F71\u54CD\u9879\u76EE\u63A8\u8FDB\u7684\u95EE\u9898": "Resolve issues that are preventing project progress",
      "\u4FDD\u6301\u9879\u76EE\u4E0B\u4E00\u6B65\u660E\u786E\uFF0C\u95EE\u9898\u51FA\u73B0\u65F6\u96C6\u4E2D\u8BB0\u5F55\u3002": "Keep next steps clear and capture issues as they appear.",
      "\u9700\u8981\u660E\u786E\u89E3\u9664\u963B\u585E\u7684\u884C\u52A8": "Define an action that removes the blocker",
      // Ideas and planning.
      "\u628A\u672A\u6765\u65B9\u5411\u6536\u655B\u4E3A\u53EF\u9A8C\u8BC1\u3001\u53EF\u5B89\u6392\u7684\u8BA1\u5212": "Turn future directions into testable, schedulable plans",
      "\u4ECE\u9879\u76EE\u7ED3\u679C\u4E2D\u63D0\u53D6\u5F53\u524D\u76EE\u6807": "Turn project outcomes into current goals",
      "\u6309\u65E5\u671F\u67E5\u770B\u8BA1\u5212\u548C\u5173\u952E\u8282\u70B9": "Review plans and milestones by date",
      "\u5148\u9A8C\u8BC1\u95EE\u9898\u548C\u4EF7\u503C\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u7ACB\u9879": "Validate the problem and value before starting a project",
      "\u5148\u9A8C\u8BC1\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u6295\u5165\u6210\u4E3A\u9879\u76EE": "Validate first, then decide whether to invest",
      "\u5F85\u5F00\u59CB\u9879\u76EE": "Planned projects",
      "\u6709\u622A\u6B62\u65E5\u671F": "With due dates",
      "\u4E0B\u4E00\u6279\u65B9\u5411": "Possible next directions",
      "\u6700\u8FD1\u8BB0\u5F55\u7684\u5F85\u9A8C\u8BC1\u60F3\u6CD5": "Recently captured ideas to validate",
      "\u51C6\u5907\u542F\u52A8": "Ready to start",
      "\u5DF2\u7ECF\u8FDB\u5165\u9879\u76EE\u4F46\u5C1A\u672A\u5F00\u59CB": "Projects that are defined but not started",
      "\u6682\u65E0\u5F85\u9A8C\u8BC1\u60F3\u6CD5": "No ideas awaiting validation",
      "\u8BB0\u5F55\u95EE\u9898\uFF0C\u518D\u8BBE\u8BA1\u6700\u5C0F\u5B9E\u9A8C\u3002": "Capture the problem, then design the smallest experiment.",
      "\u6682\u65E0\u5F85\u5F00\u59CB\u9879\u76EE": "No planned projects",
      "\u4E0D\u8981\u4E00\u6B21\u542F\u52A8\u8FC7\u591A\u9879\u76EE\u3002": "Avoid starting too many projects at once.",
      "\u8FD8\u6CA1\u6709\u660E\u786E\u76EE\u6807": "No clear goals yet",
      "\u5728\u9879\u76EE\u4E2D\u586B\u5199\u53EF\u9A8C\u8BC1\u7684\u76EE\u6807\u7ED3\u679C\u3002": "Add a verifiable target outcome to a project.",
      "\u65F6\u95F4\u7EBF\u4E3A\u7A7A": "The timeline is empty",
      "\u4E3A\u9700\u8981\u65F6\u95F4\u7EA6\u675F\u7684\u9879\u76EE\u8BBE\u7F6E\u622A\u6B62\u65E5\u671F\u3002": "Set due dates for projects that need a time constraint.",
      "\u60F3\u6CD5\u540D\u79F0 *": "Idea name *",
      "\u8981\u89E3\u51B3\u7684\u95EE\u9898": "Problem to solve",
      "\u9884\u671F\u4EF7\u503C": "Expected value",
      "\u6700\u5C0F\u5B9E\u9A8C": "Smallest experiment",
      "\u4E00\u53E5\u8BDD\u63CF\u8FF0\u65B9\u5411": "Describe the direction in one sentence",
      "\u8C01\u5728\u4EC0\u4E48\u573A\u666F\u4E0B\u9047\u5230\u4EC0\u4E48\u95EE\u9898\uFF1F": "Who experiences what problem, and in which situation?",
      "\u4E3A\u4EC0\u4E48\u503C\u5F97\u9A8C\u8BC1\uFF1F": "Why is this worth validating?",
      "\u6700\u4FBF\u5B9C\u3001\u6700\u5FEB\u7684\u9A8C\u8BC1\u65B9\u5F0F\u662F\u4EC0\u4E48\uFF1F": "What is the fastest, least expensive way to test it?",
      "\u8BB0\u5F55\u95EE\u9898\u3001\u4EF7\u503C\u548C\u6700\u5C0F\u5B9E\u9A8C\uFF0C\u4E0D\u6025\u7740\u7ACB\u9879\u3002": "Capture the problem, value and smallest experiment before committing.",
      "\u5148\u8BB0\u5F55\u95EE\u9898\u548C\u6700\u5C0F\u5B9E\u9A8C\uFF0C\u4E0D\u9700\u8981\u9A6C\u4E0A\u7ACB\u9879\u3002": "Capture the problem and smallest experiment without starting a project yet.",
      "\u8FD8\u6CA1\u6709\u6700\u5C0F\u5B9E\u9A8C": "No experiment defined",
      "\u7F3A\u5C11\u6700\u5C0F\u5B9E\u9A8C": "Missing smallest experiment",
      // Personal finance.
      "\u67E5\u770B\u8D26\u6237\u3001\u6536\u652F\u3001\u56FA\u5B9A\u652F\u51FA\u548C\u9884\u8BA1\u6536\u5165": "Review balances, transactions, fixed expenses and expected income",
      "\u7B5B\u9009\u548C\u67E5\u770B\u5168\u90E8\u8D44\u91D1\u6D41\u6C34": "Filter and review all transactions",
      "\u7BA1\u7406\u672A\u6765\u5DF2\u786E\u5B9A\u7684\u56FA\u5B9A\u652F\u51FA": "Manage confirmed upcoming fixed expenses",
      "\u7BA1\u7406\u672A\u6765\u5DF2\u786E\u5B9A\u4F46\u5C1A\u672A\u5230\u8D26\u7684\u6536\u5165": "Manage confirmed income that has not arrived yet",
      "\u67E5\u770B\u8D26\u6237\u4F59\u989D\u3001\u4FE1\u7528\u5361\u548C\u501F\u51FA\u8D44\u91D1": "Review balances, credit cards and outstanding loans",
      "\u5F53\u524D\u8D26\u6237": "Current balance",
      "\u4FE1\u7528\u5361\u5F85\u8FD8": "Credit card balance",
      "\u501F\u51FA\u672A\u6536": "Outstanding loans",
      "\u672C\u6708\u652F\u51FA": "Expenses this month",
      "\u672C\u6708\u6536\u5165": "Income this month",
      "\u8D26\u6237\u8D8B\u52BF": "Balance trend",
      "\u9884\u8BA1\u652F\u51FA": "Expected expenses",
      "\u9884\u8BA1\u540E\u4F59\u989D": "Projected balance",
      "\u9884\u8BA1\u6536\u5165\u5408\u8BA1": "Total expected income",
      "\u56FA\u5B9A\u4E0E\u9884\u8BA1\u652F\u51FA\u5408\u8BA1": "Total fixed and expected expenses",
      "\u8D26\u6237\u6784\u6210": "Account breakdown",
      "\u6309\u7167\u73B0\u6709\u8D44\u91D1\u8BB0\u5F55\u8BA1\u7B97": "Calculated from existing transactions",
      "\u6263\u9664\u9884\u8BA1\u652F\u51FA\u540E": "After expected expenses",
      "\u4F59\u989D\u8D8B\u52BF": "Balance trend",
      "\u6700\u8FD1 5 \u6761\u8D44\u91D1\u6D41\u6C34": "5 most recent transactions",
      "\u6700\u8FD1 7 \u5929\u8D26\u6237\u53D8\u5316": "Balance changes over the last 7 days",
      "\u6700\u8FD1 7 \u5929": "Last 7 days",
      "\u8FD8\u6CA1\u6709\u8D44\u91D1\u8BB0\u5F55": "No transactions yet",
      "\u70B9\u51FB\u53F3\u4E0A\u89D2\u201C\u8BB0\u4E00\u7B14\u201D\u5F00\u59CB\u8BB0\u5F55\u3002": "Select \u201CAdd transaction\u201D in the top-right to get started.",
      "\u8FD8\u6CA1\u6709\u56FA\u5B9A\u652F\u51FA": "No fixed expenses yet",
      "\u6DFB\u52A0\u623F\u79DF\u3001\u8BA2\u9605\u6216\u5176\u4ED6\u5DF2\u786E\u5B9A\u652F\u51FA\u3002": "Add rent, subscriptions or other confirmed expenses.",
      "\u8FD8\u6CA1\u6709\u9884\u8BA1\u6536\u5165": "No expected income yet",
      "\u6DFB\u52A0\u5DE5\u8D44\u3001\u9879\u76EE\u6B3E\u6216\u5176\u4ED6\u786E\u5B9A\u6536\u5165\u3002": "Add salary, project payments or other confirmed income.",
      "\u5176\u4ED6\u9884\u8BA1\u652F\u51FA": "Other expected expenses",
      "\u6C47\u603B\u91D1\u989D": "Combined amount",
      "\u9884\u8BA1\u652F\u51FA\u91D1\u989D": "Expected expense amount",
      "\u8BBE\u7F6E\u5176\u4ED6\u9884\u8BA1\u652F\u51FA": "Set other expected expenses",
      "\u8BE5\u91D1\u989D\u4F1A\u8BA1\u5165\u9884\u8BA1\u652F\u51FA\uFF0C\u4F46\u4E0D\u4F1A\u6539\u53D8\u5F53\u524D\u8D26\u6237\u3002": "This amount affects projections but does not change the current balance.",
      "\u8BB0\u5F55\u4E00\u7B14\u8D44\u91D1": "Add a transaction",
      "\u4F7F\u7528\u4E0E Personal Funds \u4E00\u81F4\u7684\u6536\u652F\u53E3\u5F84\u3002": "Uses the same transaction rules as Personal Funds.",
      "\u8BB0\u5F55\u672A\u6765\u5DF2\u786E\u5B9A\u4F46\u5C1A\u672A\u5230\u8D26\u7684\u6536\u5165\u3002": "Record confirmed income that has not arrived yet.",
      "\u8BB0\u5F55\u672A\u6765\u5DF2\u786E\u5B9A\u4F46\u5C1A\u672A\u53D1\u751F\u7684\u652F\u51FA\u3002": "Record confirmed expenses that have not occurred yet.",
      "\u4F8B\u5982\uFF1A\u5DE5\u8D44\u6216\u9879\u76EE\u6B3E": "For example: Salary or a project payment",
      "\u4F8B\u5982\uFF1A\u623F\u79DF\u6216\u8BA2\u9605": "For example: Rent or a subscription",
      "\u4E2A\u4EBA\u8D44\u91D1\u6570\u636E\u5E93": "Personal finance database",
      // Finance types. The IDs remain unchanged.
      "\u6536\u5165": "Income",
      "\u652F\u51FA": "Expense",
      "\u4FE1\u7528\u5361\u652F\u51FA": "Credit card expense",
      "\u8FD8\u4FE1\u7528\u5361": "Credit card repayment",
      "\u501F\u51FA": "Loan out",
      "\u6536\u56DE\u501F\u51FA": "Loan repayment received",
      "\u8D26\u6237\u8C03\u6574": "Balance adjustment",
      // Finance category display names. Their underlying option values remain Chinese.
      "\u9910\u996E": "Food & dining",
      "\u4EA4\u901A": "Transport",
      "\u8BBE\u5907": "Equipment",
      "\u5B66\u4E60": "Learning",
      "\u5DE5\u8D44": "Salary",
      "\u4FE1\u7528\u5361": "Credit card",
      "\u5176\u4ED6": "Other",
      // Image renaming, Canvas and Bases integration.
      "\u56FE\u7247\u4E0E\u9644\u4EF6": "Images & attachments",
      "\u81EA\u52A8\u547D\u540D\u3001\u5F15\u7528\u4FEE\u590D\u3001Canvas \u4E0E Base \u5DE5\u5177": "Automatic naming, reference repair, Canvas and Bases tools",
      "\u542F\u7528\u81EA\u52A8\u56FE\u7247\u91CD\u547D\u540D": "Enable automatic image renaming",
      "\u65B0\u5EFA\u6216\u7C98\u8D34 PNG\u3001JPG\u3001JPEG \u65F6\uFF0C\u6309\u5F53\u524D\u7B14\u8BB0\u540D\u548C\u516D\u4F4D\u5E8F\u53F7\u81EA\u52A8\u6574\u7406\u3002": "Automatically organize new or pasted PNG, JPG and JPEG files using the current note name and a six-digit sequence.",
      "\u7C98\u8D34 PNG\u3001JPG\u3001JPEG \u540E\u81EA\u52A8\u547D\u540D\u4E3A\u201C\u7B14\u8BB0\u540D_000001\u201D\u3002": "Automatically name pasted PNG, JPG and JPEG files as \u201CNote name_000001\u201D.",
      "\u56FE\u7247\u76EE\u6807\u6587\u4EF6\u5939": "Image destination folder",
      "\u7559\u7A7A\u65F6\u4FDD\u7559\u5728\u56FE\u7247\u539F\u76EE\u5F55\uFF1B\u53EF\u586B\u5199\u4F8B\u5982 Mind/Images\u3002": "Leave blank to keep images in their current folder, or enter a path such as Mind/Images.",
      "\u7559\u7A7A\u65F6\u4FDD\u7559\u56FE\u7247\u539F\u76EE\u5F55\uFF1B\u652F\u6301\u4F8B\u5982 Mind/Images\u3002": "Leave blank to keep images in their current folder. Paths such as Mind/Images are supported.",
      "Canvas \u56FE\u7247\u6587\u4EF6\u540D": "Canvas image filenames",
      "\u63A7\u5236 Canvas \u56FE\u7247\u8282\u70B9\u6587\u4EF6\u540D\u7684\u663E\u793A\u65B9\u5F0F\u3002": "Choose how filenames appear on Canvas image nodes.",
      "\u63A7\u5236\u56FE\u7247\u8282\u70B9\u6807\u7B7E\u7684\u663E\u793A\u65B9\u5F0F\u3002": "Choose how labels appear on image nodes.",
      "\u59CB\u7EC8\u663E\u793A": "Always show",
      "\u60AC\u505C\u663E\u793A": "Show on hover",
      "\u9690\u85CF": "Hide",
      "\u5728\u6587\u4EF6\u5217\u8868\u9690\u85CF PNG": "Hide PNG files in the file explorer",
      "\u53EA\u5728\u754C\u9762\u4E0A\u9690\u85CF\uFF0C\u4E0D\u4F1A\u5220\u9664\u6587\u4EF6\u3002": "Hides files in the interface only; no files are deleted.",
      "\u53EA\u9690\u85CF\u6587\u4EF6\u6811\u6761\u76EE\uFF0C\u4E0D\u4F1A\u5220\u9664\u4EFB\u4F55\u56FE\u7247\u3002": "Only hides file-tree entries; no images are deleted.",
      "Base \u540D\u79F0\u6837\u5F0F": "Bases name styling",
      "\u6309\u6587\u4EF6\u6269\u5C55\u540D\u4E3A Bases \u7684\u540D\u79F0\u5217\u8BBE\u7F6E\u989C\u8272\u3002": "Color the name column in Bases according to file extension.",
      "\u6269\u5C55\u540D": "Extension",
      "\u540D\u79F0": "Name",
      "\u6587\u4EF6\u53CD\u5411\u94FE\u63A5": "File backlinks",
      "\u4FEE\u6539\u65F6\u95F4": "Modified",
      "\u989C\u8272": "Color",
      "\u521B\u5EFA Base": "Create Base",
      "\u521B\u5EFA Files.base": "Create Files.base",
      "\u521B\u5EFA\u9ED8\u8BA4 Files.base": "Create default Files.base",
      "\u5220\u9664\u89C4\u5219": "Delete rule",
      "\u521B\u5EFA\u6392\u9664 PNG \u548C Base \u6587\u4EF6\u7684 Obsidian Bases \u9ED8\u8BA4\u89C6\u56FE\u3002": "Create a default Obsidian Bases view that excludes PNG and Base files.",
      "\u6574\u7406\u5F53\u524D\u7B14\u8BB0\u56FE\u7247": "Organize images in current note",
      "\u68C0\u67E5\u5E76\u6574\u7406": "Review & organize",
      "\u68C0\u67E5\u5E76\u6574\u7406\u5F53\u524D\u7B14\u8BB0": "Review and organize current note",
      "\u68C0\u67E5 Markdown \u6216 Canvas \u5F15\u7528\uFF0C\u5E76\u6309\u51FA\u73B0\u987A\u5E8F\u7EDF\u4E00\u91CD\u547D\u540D\u3002": "Review Markdown and Canvas references, then rename images consistently in order of appearance.",
      "\u56FE\u7247\u8BBE\u7F6E\u5DF2\u4FDD\u5B58": "Image settings saved",
      "\u6CA1\u6709\u627E\u5230\u5F53\u524D\u6587\u4EF6\u3002": "No active file was found.",
      "\u5F53\u524D\u6587\u4EF6\u4E0D\u662F Markdown \u6216 Canvas\u3002": "The current file is not a Markdown or Canvas file.",
      "\u6574\u7406\u5F53\u524D\u6587\u4EF6\u4E2D\u7684\u56FE\u7247\u5931\u8D25\uFF0C\u8BF7\u67E5\u770B\u63A7\u5236\u53F0\u3002": "Could not organize images in the current file. Check the console for details.",
      "\u521B\u5EFA Files.base \u5931\u8D25\uFF0C\u8BF7\u67E5\u770B\u63A7\u5236\u53F0\u3002": "Could not create Files.base. Check the console for details.",
      "\u56FE\u7247\u81EA\u52A8\u91CD\u547D\u540D\u5931\u8D25\uFF0C\u8BF7\u67E5\u770B\u63A7\u5236\u53F0\u3002": "Automatic image renaming failed. Check the console for details.",
      "\u5F53\u524D\u6587\u4EF6\u4E2D\u6CA1\u6709\u627E\u5230\u56FE\u7247\u3002": "No images were found in the current file.",
      // Mind map integration.
      "\u601D\u7EF4\u5BFC\u56FE": "Mind map",
      "\u79BB\u7EBF SVG \u5F15\u64CE\uFF0CMarkdown \u5C31\u662F\u6570\u636E\u6E90": "Offline SVG engine powered directly by Markdown",
      "\u542F\u7528\u601D\u7EF4\u5BFC\u56FE": "Enable mind maps",
      "\u5C06 Markdown \u6807\u9898\u548C\u7F29\u8FDB\u5217\u8868\u6E32\u67D3\u4E3A\u53EF\u4EA4\u4E92 SVG \u601D\u7EF4\u5BFC\u56FE\u3002": "Render Markdown headings and indented lists as an interactive SVG mind map.",
      "\u652F\u6301 Markdown \u6807\u9898\u548C\u7F29\u8FDB\u5217\u8868\u3001\u7F29\u653E\u3001\u62D6\u52A8\u53CA\u8282\u70B9\u6298\u53E0\u3002": "Supports Markdown headings and indented lists, zooming, panning and collapsible nodes.",
      "\u8DDF\u968F\u5F53\u524D\u6587\u4EF6": "Follow current file",
      "\u8DDF\u968F\u5F53\u524D Markdown \u6587\u4EF6\uFF0C\u6216\u5C06\u5F53\u524D\u6587\u4EF6\u56FA\u5B9A\u5230\u4E00\u4E2A\u5BFC\u56FE\u9875\u7B7E\u3002": "Follow the active Markdown file, or pin the current file to a mind-map tab.",
      "\u56FA\u5B9A\u5F53\u524D\u6587\u4EF6": "Pin current file",
      "\u6587\u6863\u6807\u9898\u4F5C\u4E3A\u6839\u8282\u70B9": "Use document title as root",
      "\u5F00\u542F\u540E\u4F7F\u7528\u6587\u4EF6\u540D\u4F5C\u4E3A\u5BFC\u56FE\u6700\u4E0A\u5C42\u8282\u70B9\u3002": "When enabled, the filename becomes the top-level mind-map node.",
      "\u5BFC\u56FE\u65B9\u5411": "Map direction",
      "\u9009\u62E9\u4E3B\u8981\u5C55\u5F00\u65B9\u5411\u3002": "Choose the primary layout direction.",
      "\u9009\u62E9\u4ECE\u5DE6\u5411\u53F3\u6216\u4ECE\u4E0A\u5411\u4E0B\u5C55\u5F00\u3002": "Choose a left-to-right or top-to-bottom layout.",
      "\u6A2A\u5411": "Horizontal",
      "\u7EB5\u5411": "Vertical",
      "\u4ECE\u5DE6\u5411\u53F3": "Left to right",
      "\u4ECE\u4E0A\u5411\u4E0B": "Top to bottom",
      "\u521D\u59CB\u5C55\u5F00\u5C42\u7EA7": "Initial expansion depth",
      "-1 \u8868\u793A\u5168\u90E8\u5C55\u5F00\u3002": "-1 expands all levels.",
      "\u663E\u793A\u5BFC\u56FE\u5DE5\u5177\u680F": "Show mind-map toolbar",
      "\u663E\u793A\u5DE5\u5177\u680F": "Show toolbar",
      "\u663E\u793A\u9002\u914D\u3001\u5C55\u5F00\u3001\u6298\u53E0\u548C\u7F29\u653E\u6309\u94AE\u3002": "Show fit, expand, collapse and zoom buttons.",
      "\u663E\u793A\u9002\u914D\u3001\u5C55\u5F00\u3001\u6298\u53E0\u548C\u7F29\u653E\u64CD\u4F5C\u3002": "Show fit, expand, collapse and zoom controls.",
      "\u6253\u5F00\u601D\u7EF4\u5BFC\u56FE": "Open mind map",
      "\u9002\u914D\u89C6\u56FE": "Fit view",
      "\u653E\u5927": "Zoom in",
      "\u7F29\u5C0F": "Zoom out",
      "\u5C55\u5F00": "Expand",
      "\u6298\u53E0": "Collapse",
      "\u5C55\u5F00\u5168\u90E8": "Expand all",
      "\u6298\u53E0\u5168\u90E8": "Collapse all",
      "\u56FA\u5B9A": "Pinned",
      "\u8DDF\u968F": "Following",
      "\u56FA\u5B9A\u7684 Markdown \u6587\u4EF6\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u79FB\u9664": "The pinned Markdown file no longer exists or has been removed",
      "\u8BF7\u5148\u6253\u5F00\u4E00\u4E2A Markdown \u6587\u4EF6": "Open a Markdown file first",
      "\u65E0\u6CD5\u8BFB\u53D6": "Unable to read",
      "\u6B64\u7B14\u8BB0\u4E2D\u8FD8\u6CA1\u6709 ATX \u6807\u9898\u6216 Markdown \u5217\u8868": "This note has no ATX headings or Markdown lists yet",
      "\u6B64 markmap \u4EE3\u7801\u5757\u4E2D\u6CA1\u6709\u6807\u9898\u6216\u5217\u8868": "This markmap block has no headings or lists",
      "\u8BF7\u5148\u5728 Open Obsidian Manage \u8BBE\u7F6E\u4E2D\u542F\u7528\u601D\u7EF4\u5BFC\u56FE": "Enable mind maps in Open Obsidian Manage settings first",
      // Settings and storage.
      "\u6570\u636E\u6587\u4EF6\u5939": "Data folder",
      "\u754C\u9762\u4E0E\u6570\u636E": "Interface & data",
      "\u754C\u9762\u4E0E\u8BED\u8A00": "Interface & language",
      "\u754C\u9762\u8BED\u8A00": "Interface language",
      "\u5207\u6362\u7BA1\u7406\u754C\u9762\u7684\u663E\u793A\u8BED\u8A00\u3002": "Choose the language used by the management interface.",
      "\u7BA1\u7406\u9875\u9762\u3001\u5F39\u7A97\u548C\u529F\u80FD\u8BBE\u7F6E\u4F7F\u7528\u540C\u4E00\u8BED\u8A00\u3002": "Use one language across pages, dialogs and feature settings.",
      "\u5373\u65F6\u5207\u6362\uFF0C\u4E0D\u6539\u53D8\u4E1A\u52A1\u6570\u636E": "Switch instantly without changing business data",
      "\u4E2D\u6587\uFF08\u7B80\u4F53\uFF09": "Chinese (Simplified)",
      "\u9879\u76EE\u3001\u8D44\u91D1\u3001\u56FE\u7247\u6574\u7406\u548C\u601D\u7EF4\u5BFC\u56FE\u7EDF\u4E00\u7531\u4E00\u4E2A\u63D2\u4EF6\u7BA1\u7406\u3002": "Manage projects, finances, image organization and mind maps in one plugin.",
      "\u4E1A\u52A1\u6570\u636E\u4FDD\u5B58\u5728\u7B14\u8BB0\u5E93\u7684\u72EC\u7ACB\u6587\u4EF6\u5939\u4E2D\uFF0C\u63D2\u4EF6 data.json \u53EA\u4FDD\u5B58\u6587\u4EF6\u5939\u8BBE\u7F6E\u3002": "Business data is stored in a separate vault folder. The plugin data.json stores settings only.",
      "\u4E1A\u52A1\u6570\u636E\u4FDD\u5B58\u5728\u53EF\u540C\u6B65\u7684\u72EC\u7ACB\u6587\u4EF6\u4E2D": "Business data is stored in separate files that can be synced",
      "\u5305\u542B management.md\u3001planning.md \u548C finance.md\u3002\u4FEE\u6539\u65F6\u4F1A\u628A\u5F53\u524D\u6570\u636E\u590D\u5236\u5230\u65B0\u6587\u4EF6\u5939\uFF0C\u4E0D\u5220\u9664\u65E7\u76EE\u5F55\u3002": "Contains management.md, planning.md and finance.md. Changing it copies current data to the new folder without deleting the old one.",
      "\u5207\u6362\u76EE\u5F55\u65F6\u4F1A\u5148\u590D\u5236\u5F53\u524D\u6570\u636E\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u5220\u9664\u65E7\u6587\u4EF6\u5939\u3002": "Changing folders copies current data first and does not delete the old folder.",
      "\u5F53\u524D\u6570\u636E": "Current data",
      "\u53EA\u8BFB\u7EDF\u8BA1": "Read-only totals",
      "\u8D44\u91D1\u8BB0\u5F55": "Transactions",
      "\u7EAF\u672C\u5730\u63D2\u4EF6\u6570\u636E\uFF0C\u4E0D\u751F\u6210\u7B14\u8BB0\u6587\u4EF6": "Local plugin data only; no notes are generated",
      "\u6570\u636E\u6587\u4EF6\u5939\u4E0D\u80FD\u4E3A\u7A7A": "The data folder cannot be empty",
      "\u6570\u636E\u6587\u4EF6\u5939\u8BBE\u7F6E\u5931\u8D25": "Could not update the data folder",
      "\u67E5\u770B\u63D2\u4EF6\u6570\u636E\u4E0E\u754C\u9762\u4FE1\u606F": "Review plugin data and interface settings",
      "> Open Obsidian Manage \u7684\u672C\u5730\u6570\u636E\u6587\u4EF6\u3002\u53EF\u4EE5\u968F\u7B14\u8BB0\u5E93\u540C\u6B65\uFF0C\u8BF7\u4E0D\u8981\u624B\u52A8\u7834\u574F JSON \u4EE3\u7801\u5757\u3002": "> Local Open Obsidian Manage data. It can sync with the vault; do not manually damage the JSON code block.",
      // Modal prompts, validation and confirmations.
      "\u8BF7\u586B\u5199\u540D\u79F0": "Enter a name",
      "\u8BF7\u8F93\u5165\u5927\u4E8E 0 \u7684\u91D1\u989D": "Enter an amount greater than 0",
      "\u8BF7\u8F93\u5165\u5927\u4E8E\u6216\u7B49\u4E8E 0 \u7684\u91D1\u989D": "Enter an amount greater than or equal to 0",
      "\u5220\u9664\u9879\u76EE\uFF1F": "Delete project?",
      "\u5220\u9664\u884C\u52A8\uFF1F": "Delete action?",
      "\u5220\u9664\u60F3\u6CD5\uFF1F": "Delete idea?",
      "\u5220\u9664\u8D44\u91D1\u8BB0\u5F55\uFF1F": "Delete transaction?",
      "\u5220\u9664\u8FD9\u6761\u9879\u76EE\uFF1F": "Delete this item?",
      "\u5173\u8054\u884C\u52A8\u4F1A\u88AB\u4FDD\u7559\uFF0C\u4F46\u4E0D\u518D\u5F52\u5C5E\u8BE5\u9879\u76EE\u3002": "Related actions will be kept, but they will no longer belong to this project.",
      "\u8FD9\u9879\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002": "This action cannot be undone.",
      // Notices.
      "\u7BA1\u7406\u6570\u636E\u8BFB\u53D6\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u6570\u636E\u6587\u4EF6\u5939\u4E2D\u7684 JSON \u4EE3\u7801\u5757": "Could not read management data. Check the JSON code blocks in the data folder.",
      "\u9879\u76EE\u5DF2\u521B\u5EFA": "Project created",
      "\u9879\u76EE\u5DF2\u66F4\u65B0": "Project updated",
      "\u9879\u76EE\u5DF2\u5220\u9664\uFF0C\u5173\u8054\u884C\u52A8\u5DF2\u4FDD\u7559": "Project deleted; related actions were kept",
      "\u884C\u52A8\u5DF2\u521B\u5EFA": "Action created",
      "\u884C\u52A8\u5DF2\u66F4\u65B0": "Action updated",
      "\u884C\u52A8\u5DF2\u5220\u9664": "Action deleted",
      "\u884C\u52A8\u5DF2\u5B8C\u6210": "Action completed",
      "\u884C\u52A8\u5DF2\u91CD\u65B0\u6253\u5F00": "Action reopened",
      "\u60F3\u6CD5\u5DF2\u8BB0\u5F55": "Idea captured",
      "\u60F3\u6CD5\u5DF2\u66F4\u65B0": "Idea updated",
      "\u60F3\u6CD5\u5DF2\u5220\u9664": "Idea deleted",
      "\u60F3\u6CD5\u5DF2\u63D0\u5347\u4E3A\u9879\u76EE": "Idea promoted to a project",
      "\u8D44\u91D1\u8BB0\u5F55\u5DF2\u4FDD\u5B58": "Transaction saved",
      "\u8D44\u91D1\u8BB0\u5F55\u5DF2\u5220\u9664": "Transaction deleted",
      "\u56FA\u5B9A\u652F\u51FA\u5DF2\u4FDD\u5B58": "Fixed expense saved",
      "\u56FA\u5B9A\u652F\u51FA\u5DF2\u5220\u9664": "Fixed expense deleted",
      "\u9884\u8BA1\u6536\u5165\u5DF2\u4FDD\u5B58": "Expected income saved",
      "\u9884\u8BA1\u6536\u5165\u5DF2\u5220\u9664": "Expected income deleted",
      "\u9884\u8BA1\u652F\u51FA\u5DF2\u4FDD\u5B58": "Expected expense saved",
      // Database headings and remaining descriptive copy.
      "\u672A\u6765\u89C4\u5212\u6570\u636E\u5E93": "Planning database",
      "\u805A\u7126\u7ED3\u679C\u3001\u963B\u585E\u548C\u9A6C\u4E0A\u8981\u505A\u7684\u4E0B\u4E00\u6B65": "Focus on outcomes, blockers and the next action to take",
      "\u76EE\u6807\u7ED3\u679C\u548C\u6267\u884C\u4FE1\u606F\u4F1A\u5728\u8FD9\u91CC\u6C47\u603B\u3002": "Target outcomes and execution details will appear here.",
      "\u53EA\u542F\u52A8\u771F\u6B63\u9700\u8981\u6295\u5165\u7684\u9879\u76EE\u3002": "Only start projects that truly deserve attention.",
      "\u6CA1\u6709\u6B63\u5728\u63A8\u8FDB\u7684\u9879\u76EE": "No active projects"
    });
    var DYNAMIC_TRANSLATIONS = Object.freeze([
      {
        pattern: /^逾期\s+(\d+)\s+天$/,
        replace: (match) => `${match[1]} ${Number(match[1]) === 1 ? "day" : "days"} overdue`
      },
      {
        pattern: /^(\d{4}-\d{2}-\d{2})\s+截止$/,
        replace: (match) => `Due ${match[1]}`
      },
      {
        pattern: /^(\d+)\/(\d+)\s+个行动$/,
        replace: (match) => `${match[1]}/${match[2]} actions`
      },
      {
        pattern: /^下一步：([\s\S]*)$/,
        replace: (match) => `Next: ${translateText2(match[1], "en")}`
      },
      {
        pattern: /^数据已迁移到\s+([\s\S]+)$/,
        replace: (match) => `Data migrated to ${match[1]}`
      },
      {
        pattern: /^数据已复制到\s+([\s\S]+)，并设为新的主数据文件夹$/,
        replace: (match) => `Data copied to ${match[1]} and set as the primary data folder`
      },
      {
        pattern: /^已创建\s+([\s\S]+)$/,
        replace: (match) => `Created ${match[1]}`
      },
      {
        pattern: /^已移除\s+(\d+)\s+个失效图片节点。$/,
        replace: (match) => `Removed ${match[1]} broken image ${Number(match[1]) === 1 ? "node" : "nodes"}.`
      },
      {
        pattern: /^已检查\s+(\d+)\s+张图片；重命名\s+(\d+)\s+张；未变化\s+(\d+)\s+张；移除失效节点\s+(\d+)\s+个。$/,
        replace: (match) => {
          const imageWord = Number(match[1]) === 1 ? "image" : "images";
          const nodeWord = Number(match[4]) === 1 ? "node" : "nodes";
          return `Checked ${match[1]} ${imageWord}; renamed ${match[2]}; unchanged ${match[3]}; removed ${match[4]} broken ${nodeWord}.`;
        }
      },
      {
        pattern: /^无法整理图片，目标已存在：([\s\S]+)$/,
        replace: (match) => `Could not organize the image because the destination already exists: ${match[1]}`
      },
      {
        pattern: /^([\s\S]+)，(展开|折叠)$/,
        replace: (match) => `${match[1]}, ${match[2] === "\u5C55\u5F00" ? "Expand" : "Collapse"}`
      },
      {
        pattern: /^＋\s+([\s\S]+)$/,
        replace: (match) => `+ ${translateText2(match[1], "en")}`
      },
      {
        pattern: /^最近\s+(\d+)\s+条资金流水$/,
        replace: (match) => `${match[1]} most recent transactions`
      },
      {
        pattern: /^最近\s+(\d+)\s+天账户变化$/,
        replace: (match) => `Balance changes over the last ${match[1]} days`
      },
      {
        pattern: /^最近\s+(\d+)\s+天$/,
        replace: (match) => `Last ${match[1]} days`
      },
      {
        pattern: /^最多展示\s+(\d+)\s+个最重要行动$/,
        replace: (match) => `Up to ${match[1]} highest-priority actions`
      }
    ]);
    var LOCALIZED_ATTRIBUTES = Object.freeze([
      "placeholder",
      "title",
      "aria-label",
      "data-label"
    ]);
    function normalizeLanguage(language) {
      const normalized = String(language || "").trim().toLowerCase();
      return normalized === "en" || normalized.startsWith("en-") ? "en" : DEFAULT_LANGUAGE;
    }
    function languageLabel(language, displayLanguage = language) {
      const value = normalizeLanguage(language);
      const display = normalizeLanguage(displayLanguage);
      const option = LANGUAGE_OPTIONS.find((item) => item.value === value) || LANGUAGE_OPTIONS[0];
      return option.labels[display] || option.label;
    }
    function translateText2(text, language) {
      if (normalizeLanguage(language) !== "en" || typeof text !== "string" || !text) {
        return text;
      }
      const whitespace = text.match(/^(\s*)([\s\S]*?)(\s*)$/);
      const leading = whitespace ? whitespace[1] : "";
      const source = whitespace ? whitespace[2] : text;
      const trailing = whitespace ? whitespace[3] : "";
      if (!source) return text;
      const exact = ENGLISH_TEXT[source];
      if (exact !== void 0) return `${leading}${exact}${trailing}`;
      for (const rule of DYNAMIC_TRANSLATIONS) {
        const match = source.match(rule.pattern);
        if (match) return `${leading}${rule.replace(match)}${trailing}`;
      }
      return text;
    }
    function shouldSkipChildren(element) {
      const tagName = String(element?.tagName || "").toUpperCase();
      return tagName === "SCRIPT" || tagName === "STYLE" || tagName === "CODE" || tagName === "PRE" || element?.hasAttribute?.("data-no-i18n");
    }
    function localizeElement2(root, language) {
      if (!root || normalizeLanguage(language) !== "en") return root;
      const visit = (node) => {
        if (!node) return;
        if (node.nodeType === 3) {
          const translated = translateText2(node.nodeValue, "en");
          if (translated !== node.nodeValue) node.nodeValue = translated;
          return;
        }
        if (node.nodeType !== 1 && node.nodeType !== 9 && node.nodeType !== 11) return;
        if (node.nodeType === 1) {
          for (const attribute of LOCALIZED_ATTRIBUTES) {
            if (!node.hasAttribute?.(attribute)) continue;
            const current = node.getAttribute(attribute);
            const translated = translateText2(current, "en");
            if (translated !== current) node.setAttribute(attribute, translated);
          }
          if (shouldSkipChildren(node)) return;
        }
        for (const child of Array.from(node.childNodes || [])) visit(child);
      };
      visit(root);
      return root;
    }
    module2.exports = {
      DEFAULT_LANGUAGE,
      LANGUAGE_OPTIONS,
      ENGLISH_TEXT,
      normalizeLanguage,
      languageLabel,
      translateText: translateText2,
      localizeElement: localizeElement2
    };
  }
});

// image-rename.js
var require_image_rename = __commonJS({
  "image-rename.js"(exports2, module2) {
    var {
      Notice: Notice2,
      TFile,
      TFolder,
      normalizePath: normalizePath2
    } = require("obsidian");
    var IMAGE_EXTENSIONS = /* @__PURE__ */ new Set(["png", "jpg", "jpeg"]);
    var PROCESSED_NAME_PATTERN = /^.+_\d{6}$/;
    var DEFAULT_BASE_FILE_NAME = "Files.base";
    var DEFAULT_BASE_CONTENT = `filters:
  and:
    - 'file.ext != "png"'
    - 'file.ext != "base"'
properties:
  file.name:
    displayName: "\u540D\u79F0"
  file.ext:
    displayName: "\u6269\u5C55\u540D"
  file.tags:
    displayName: "tags"
  note.aliases:
    displayName: "aliases"
  file.backlinks:
    displayName: "\u6587\u4EF6\u53CD\u5411\u94FE\u63A5"
  file.mtime:
    displayName: "\u4FEE\u6539\u65F6\u95F4"
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
    var BODY_FILENAME_CLASSES = [
      "oom-image-filename-hide",
      "oom-image-filename-hover"
    ];
    var ImageRenameController2 = class {
      constructor(plugin) {
        this.plugin = plugin;
        this.app = plugin.app;
        this.settings = this.readSettings();
        this.started = false;
        this.lifecycle = 0;
        this.renameQueue = Promise.resolve();
        this.processingPaths = /* @__PURE__ */ new Set();
        this.eventRefs = [];
        this.createEventRef = null;
        this.fileListObserver = null;
        this.fileListDocument = null;
        this.hiddenFileListElements = /* @__PURE__ */ new Set();
        this.baseStyleObserver = null;
        this.baseStyleDocument = null;
        this.baseStyleTimer = null;
        this.baseStyleRetryTimers = [];
        this.baseStyledElements = /* @__PURE__ */ new Set();
        this.filenameDocuments = /* @__PURE__ */ new Set();
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
          this.createEventRef = this.registerEvent(this.app.vault, "create", (file) => {
            if (file instanceof TFile) this.enqueueRename(file);
          });
          this.scheduleBaseStyleRefresh();
        };
        if (typeof this.app.workspace.onLayoutReady === "function") {
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
            if (typeof entry.emitter?.offref === "function") entry.emitter.offref(entry.ref);
            else if (typeof entry.ref === "function") entry.ref();
          } catch (error) {
            console.debug("Open Obsidian Manage: failed to unregister image event", error);
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
          this.showNotice("\u6CA1\u6709\u627E\u5230\u5F53\u524D\u6587\u4EF6\u3002");
          return;
        }
        if (activeFile.extension !== "md" && activeFile.extension !== "canvas") {
          this.showNotice("\u5F53\u524D\u6587\u4EF6\u4E0D\u662F Markdown \u6216 Canvas\u3002");
          return;
        }
        const operation = this.renameQueue.then(() => this.renameImagesInFile(activeFile));
        this.renameQueue = operation.catch((error) => {
          console.error("Open Obsidian Manage: failed to organize images in active file", error);
          this.showNotice("\u6574\u7406\u5F53\u524D\u6587\u4EF6\u4E2D\u7684\u56FE\u7247\u5931\u8D25\uFF0C\u8BF7\u67E5\u770B\u63A7\u5236\u53F0\u3002");
        });
        await this.renameQueue;
      }
      async createDefaultBase() {
        try {
          const path = await this.getAvailableBasePath(DEFAULT_BASE_FILE_NAME);
          const translate = (text) => typeof this.plugin.t === "function" ? this.plugin.t(text) : text;
          const content = DEFAULT_BASE_CONTENT.replace('displayName: "\u540D\u79F0"', `displayName: "${translate("\u540D\u79F0")}"`).replace('displayName: "\u6269\u5C55\u540D"', `displayName: "${translate("\u6269\u5C55\u540D")}"`).replace('displayName: "\u6587\u4EF6\u53CD\u5411\u94FE\u63A5"', `displayName: "${translate("\u6587\u4EF6\u53CD\u5411\u94FE\u63A5")}"`).replace('displayName: "\u4FEE\u6539\u65F6\u95F4"', `displayName: "${translate("\u4FEE\u6539\u65F6\u95F4")}"`);
          const baseFile = await this.app.vault.create(path, content);
          const leaf = this.app.workspace.getLeaf(true);
          if (leaf?.openFile) await leaf.openFile(baseFile);
          this.showNotice(`\u5DF2\u521B\u5EFA ${path}`);
          return baseFile;
        } catch (error) {
          console.error("Open Obsidian Manage: failed to create default Base", error);
          this.showNotice("\u521B\u5EFA Files.base \u5931\u8D25\uFF0C\u8BF7\u67E5\u770B\u63A7\u5236\u53F0\u3002");
          return null;
        }
      }
      readSettings() {
        const source = this.plugin.settings?.imageRename || {};
        const filenameDisplayMode = ["show", "hide", "hover"].includes(source.filenameDisplayMode) ? source.filenameDisplayMode : "hover";
        const rules = Array.isArray(source.baseNameStyleRules) ? source.baseNameStyleRules.map((rule) => ({
          extension: String(rule?.extension || "").trim().replace(/^\./, "").toLowerCase(),
          color: /^#[0-9a-f]{6}$/i.test(String(rule?.color || "")) ? String(rule.color) : "#3f3f46"
        })).filter((rule) => rule.extension) : [];
        return {
          enabled: source.enabled === true,
          targetFolder: this.normalizeFolderPath(String(source.targetFolder || "")),
          filenameDisplayMode,
          hidePngInFileList: source.hidePngInFileList !== false,
          baseNameStyleRules: rules
        };
      }
      registerWorkspaceEvents() {
        for (const eventName of ["layout-change", "file-open", "active-leaf-change"]) {
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
        if (!emitter || typeof emitter.on !== "function") return null;
        const ref = emitter.on(eventName, callback);
        if (ref) this.eventRefs.push({ emitter, ref });
        return ref;
      }
      enqueueRename(file) {
        if (!this.started || !this.settings.enabled || !this.shouldProcess(file)) return;
        const sourceFile = this.getActiveReferenceSource(file);
        const lifecycle = this.lifecycle;
        this.renameQueue = this.renameQueue.then(async () => {
          if (!this.started || this.lifecycle !== lifecycle || !this.settings.enabled) return;
          const renameResult = await this.renameImage(file, sourceFile);
          if (renameResult && sourceFile) {
            await this.repairAutoRenameReferences(sourceFile, renameResult, lifecycle).catch((error) => console.error(
              "Open Obsidian Manage: failed to repair an image reference",
              error
            ));
          }
        }).catch((error) => {
          console.error("Open Obsidian Manage: image rename queue failed", error);
        });
      }
      getActiveReferenceSource(imageFile) {
        const activeFile = this.app.workspace.getActiveFile();
        if (!(activeFile instanceof TFile) || activeFile.path === imageFile.path) return void 0;
        return activeFile.extension === "md" || activeFile.extension === "canvas" ? activeFile : void 0;
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
          const sourceFile = noteFile || this.app.workspace.getActiveFile() || void 0;
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
          console.error("Open Obsidian Manage: automatic image rename failed", error);
          this.showNotice("\u56FE\u7247\u81EA\u52A8\u91CD\u547D\u540D\u5931\u8D25\uFF0C\u8BF7\u67E5\u770B\u63A7\u5236\u53F0\u3002");
          return null;
        } finally {
          this.processingPaths.delete(sourcePath);
        }
      }
      async renameImagesInFile(sourceFile) {
        const originalContent = await this.app.vault.cachedRead(sourceFile);
        const removedMissingCount = sourceFile.extension === "canvas" ? await this.removeMissingCanvasImageNodes(sourceFile) : 0;
        const imageFiles = await this.getImageFilesInFile(sourceFile);
        if (imageFiles.length === 0) {
          this.showNotice(removedMissingCount > 0 ? `\u5DF2\u79FB\u9664 ${removedMissingCount} \u4E2A\u5931\u6548\u56FE\u7247\u8282\u70B9\u3002` : "\u5F53\u524D\u6587\u4EF6\u4E2D\u6CA1\u6709\u627E\u5230\u56FE\u7247\u3002");
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
          `\u5DF2\u68C0\u67E5 ${imageFiles.length} \u5F20\u56FE\u7247\uFF1B\u91CD\u547D\u540D ${renameResults.length} \u5F20\uFF1B\u672A\u53D8\u5316 ${imageFiles.length - renameResults.length} \u5F20\uFF1B\u79FB\u9664\u5931\u6548\u8282\u70B9 ${removedMissingCount} \u4E2A\u3002`
        );
        return renameResults;
      }
      async getImageFilesInFile(sourceFile) {
        if (sourceFile.extension === "canvas") return this.getImageFilesInCanvas(sourceFile);
        if (sourceFile.extension === "md") return this.getImageFilesInMarkdown(sourceFile);
        return [];
      }
      getImageFilesInMarkdown(sourceFile) {
        const cache = this.app.metadataCache.getFileCache(sourceFile);
        const imageFiles = /* @__PURE__ */ new Map();
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
        const imageFiles = /* @__PURE__ */ new Map();
        for (const node of canvasData.nodes || []) {
          if (node.type !== "file" || !node.file) continue;
          const linkedFile = this.resolveLinkedFile(node.file, canvasFile.path);
          if (linkedFile instanceof TFile && IMAGE_EXTENSIONS.has(linkedFile.extension.toLowerCase())) {
            imageFiles.set(linkedFile.path, linkedFile);
          }
        }
        return [...imageFiles.values()];
      }
      resolveLinkedFile(link, sourcePath) {
        const directFile = this.app.vault.getAbstractFileByPath(normalizePath2(link));
        if (directFile instanceof TFile) return directFile;
        return this.app.metadataCache.getFirstLinkpathDest(link, sourcePath);
      }
      async readCanvasData(canvasFile) {
        return JSON.parse(await this.app.vault.cachedRead(canvasFile));
      }
      async removeMissingCanvasImageNodes(canvasFile) {
        const canvasData = await this.readCanvasData(canvasFile);
        const originalNodes = canvasData.nodes || [];
        const removedNodeIds = /* @__PURE__ */ new Set();
        const remainingNodes = originalNodes.filter((node) => {
          if (node.type !== "file" || !node.file || !this.isImagePath(node.file)) return true;
          if (this.resolveLinkedFile(node.file, canvasFile.path) instanceof TFile) return true;
          if (node.id) removedNodeIds.add(node.id);
          return false;
        });
        if (remainingNodes.length === originalNodes.length) return 0;
        canvasData.nodes = remainingNodes;
        canvasData.edges = (canvasData.edges || []).filter(
          (edge) => !removedNodeIds.has(edge.fromNode || "") && !removedNodeIds.has(edge.toNode || "")
        );
        await this.app.vault.modify(canvasFile, JSON.stringify(canvasData, null, "	"));
        return originalNodes.length - remainingNodes.length;
      }
      async normalizeImageSequence(sourceFile, imageFiles) {
        const noteName = this.getCurrentNoteName(imageFiles[0], sourceFile);
        const sourcePaths = new Set(imageFiles.map((file) => file.path));
        const plans = [];
        for (const [index, imageFile] of imageFiles.entries()) {
          const targetFolderPath = await this.getTargetFolderPath(imageFile);
          const targetPath = normalizePath2(
            `${targetFolderPath ? `${targetFolderPath}/` : ""}${noteName}_${this.formatSequence(index + 1)}.${imageFile.extension.toLowerCase()}`
          );
          if (targetPath === imageFile.path) continue;
          if (await this.app.vault.adapter.exists(targetPath) && !sourcePaths.has(targetPath)) {
            this.showNotice(`\u65E0\u6CD5\u6574\u7406\u56FE\u7247\uFF0C\u76EE\u6807\u5DF2\u5B58\u5728\uFF1A${targetPath}`);
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
          const slash = plan.targetPath.lastIndexOf("/");
          const folderPath = slash === -1 ? "" : plan.targetPath.slice(0, slash);
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
          if (!await this.app.vault.adapter.exists(path)) return path;
          attempt += 1;
        }
      }
      async repairManualReferences(sourceFile, renameResults, originalContent) {
        const liveFile = this.app.vault.getAbstractFileByPath(sourceFile.path);
        if (!(liveFile instanceof TFile)) return false;
        const latestContent = await this.app.vault.cachedRead(liveFile);
        if (sourceFile.extension === "canvas") {
          const expected2 = this.replaceCanvasImageReferences(originalContent, renameResults);
          if (latestContent === expected2) return false;
          const updated2 = latestContent === originalContent ? expected2 : this.replaceCanvasImageReferences(latestContent, renameResults);
          if (updated2 !== latestContent) await this.app.vault.modify(liveFile, updated2);
          return updated2 !== latestContent;
        }
        const expected = this.replaceMarkdownImageReferences(originalContent, renameResults);
        if (latestContent === expected) return false;
        const updated = latestContent === originalContent ? expected : this.replaceMarkdownImageReferences(latestContent, renameResults);
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
        const updated = sourceFile.extension === "canvas" ? this.replaceCanvasImageReferences(content, renameResults) : sourceFile.extension === "md" ? this.replaceMarkdownImageReferences(content, renameResults) : content;
        if (updated === content) {
          return renameResults.every(
            (result) => this.hasImageReference(content, sourceFile.extension, result.targetPath)
          );
        }
        await this.app.vault.modify(sourceFile, updated);
        return true;
      }
      hasImageReference(content, sourceExtension, targetPath) {
        if (sourceExtension === "canvas") {
          try {
            const canvasData = JSON.parse(content);
            return (canvasData.nodes || []).some(
              (node) => node.type === "file" && node.file && this.linkMatchesPath(node.file, targetPath)
            );
          } catch {
            return false;
          }
        }
        if (sourceExtension !== "md") return false;
        const wikiPattern = /!\[\[([^\]]+)\]\]/g;
        for (const match of content.matchAll(wikiPattern)) {
          const link = match[1].split("|")[0].split("#")[0];
          if (this.linkMatchesPath(link, targetPath)) return true;
        }
        const markdownPattern = /!\[[^\]]*\]\(([^)]+)\)/g;
        for (const match of content.matchAll(markdownPattern)) {
          const parsed = this.parseMarkdownDestination(match[1]);
          if (this.linkMatchesPath(parsed.path.split("#")[0], targetPath)) return true;
        }
        return false;
      }
      linkMatchesPath(linkPath, filePath) {
        const normalizedLink = this.normalizeLinkPath(linkPath);
        const normalizedPath = normalizePath2(filePath);
        const fileName = normalizedPath.split("/").pop() || normalizedPath;
        return normalizedLink === normalizedPath || normalizedLink === fileName || normalizedLink.endsWith(`/${fileName}`);
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
          if (node.type !== "file" || !node.file) continue;
          const result = this.findRenameResult(node.file, renameResults);
          if (result && node.file !== result.targetPath) {
            node.file = result.targetPath;
            changed = true;
          }
        }
        return changed ? JSON.stringify(canvasData, null, "	") : content;
      }
      replaceMarkdownImageReferences(content, renameResults) {
        const wikiLinkPattern = /(!\[\[)([^\]]+)(\]\])/g;
        const markdownImagePattern = /(!\[[^\]]*\]\()([^)]+)(\))/g;
        return content.replace(wikiLinkPattern, (match, open, inner, close) => {
          const separatorIndex = inner.indexOf("|");
          const linkPart = separatorIndex === -1 ? inner : inner.slice(0, separatorIndex);
          const aliasPart = separatorIndex === -1 ? "" : inner.slice(separatorIndex);
          const headingIndex = linkPart.indexOf("#");
          const pathPart = headingIndex === -1 ? linkPart : linkPart.slice(0, headingIndex);
          const subpathPart = headingIndex === -1 ? "" : linkPart.slice(headingIndex);
          const result = this.findRenameResult(pathPart, renameResults);
          return result ? `${open}${result.targetPath}${subpathPart}${aliasPart}${close}` : match;
        }).replace(markdownImagePattern, (match, open, destination, close) => {
          const parsed = this.parseMarkdownDestination(destination);
          const fragmentIndex = parsed.path.indexOf("#");
          const pathPart = fragmentIndex === -1 ? parsed.path : parsed.path.slice(0, fragmentIndex);
          const fragment = fragmentIndex === -1 ? "" : parsed.path.slice(fragmentIndex);
          const result = this.findRenameResult(pathPart, renameResults);
          if (!result) return match;
          return `${open}${this.formatMarkdownDestination(result.targetPath + fragment, parsed)}${close}`;
        });
      }
      parseMarkdownDestination(destination) {
        const trimmed = destination.trim();
        if (trimmed.startsWith("<")) {
          const closingIndex = trimmed.indexOf(">");
          if (closingIndex !== -1) {
            return {
              path: trimmed.slice(1, closingIndex),
              prefix: "<",
              suffix: `>${trimmed.slice(closingIndex + 1)}`
            };
          }
        }
        const titleMatch = trimmed.match(/^(\S+)(\s+["'][\s\S]+)$/);
        return {
          path: titleMatch ? titleMatch[1] : trimmed,
          prefix: "",
          suffix: titleMatch ? titleMatch[2] : ""
        };
      }
      formatMarkdownDestination(targetPath, parsed) {
        if (parsed.prefix === "<") return `<${targetPath}>${parsed.suffix.slice(1)}`;
        return `${encodeURI(targetPath)}${parsed.suffix}`;
      }
      findRenameResult(linkPath, renameResults) {
        const normalizedLinkPath = this.normalizeLinkPath(linkPath);
        for (const result of renameResults) {
          if (normalizedLinkPath === normalizePath2(result.sourcePath)) return result;
        }
        const candidates = renameResults.filter((result) => {
          const sourcePath = normalizePath2(result.sourcePath);
          const sourceName = sourcePath.split("/").pop() || sourcePath;
          return normalizedLinkPath === sourceName || normalizedLinkPath.endsWith(`/${sourceName}`);
        });
        return candidates.length === 1 ? candidates[0] : null;
      }
      normalizeLinkPath(linkPath) {
        let decoded = String(linkPath || "").trim();
        try {
          decoded = decodeURI(decoded);
        } catch {
        }
        return normalizePath2(decoded);
      }
      async getNextSequence(noteName, targetFolderPath, sourceFile) {
        const usedSequences = /* @__PURE__ */ new Set();
        if (sourceFile instanceof TFile && (sourceFile.extension === "md" || sourceFile.extension === "canvas")) {
          for (const basename of await this.getReferencedImageBasenamesInFile(sourceFile)) {
            this.addSequenceFromBasename(usedSequences, noteName, basename);
          }
          for (const imageFile of await this.getImageFilesInFile(sourceFile)) {
            this.addSequenceFromBasename(usedSequences, noteName, imageFile.basename);
          }
        }
        const folder = targetFolderPath ? this.app.vault.getAbstractFileByPath(targetFolderPath) : this.app.vault.getRoot();
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
        if (sourceFile.extension === "canvas") {
          const canvasData = await this.readCanvasData(sourceFile);
          return (canvasData.nodes || []).filter((node) => node.type === "file" && node.file && this.isImagePath(node.file)).map((node) => this.getBasenameFromPath(node.file)).filter(Boolean);
        }
        const cache = this.app.metadataCache.getFileCache(sourceFile);
        return (cache?.embeds || []).map((embed) => embed.link).filter((link) => this.isImagePath(link)).map((link) => this.getBasenameFromPath(link)).filter(Boolean);
      }
      isImagePath(path) {
        const cleanPath = String(path || "").split("#")[0].split("|")[0];
        const extension = cleanPath.split(".").pop()?.toLowerCase() || "";
        return IMAGE_EXTENSIONS.has(extension);
      }
      getBasenameFromPath(path) {
        const cleanPath = normalizePath2(String(path || "").split("#")[0].split("|")[0]);
        const fileName = cleanPath.split("/").pop() || "";
        const extensionIndex = fileName.lastIndexOf(".");
        return extensionIndex === -1 ? fileName : fileName.slice(0, extensionIndex);
      }
      addSequenceFromBasename(sequences, noteName, basename) {
        const match = String(basename || "").match(
          new RegExp(`^${this.escapeRegExp(noteName)}_(\\d{6})$`)
        );
        if (!match) return;
        const sequence = Number.parseInt(match[1], 10);
        if (Number.isFinite(sequence) && sequence > 0) sequences.add(sequence);
      }
      shouldProcess(file) {
        return file instanceof TFile && IMAGE_EXTENSIONS.has(file.extension.toLowerCase()) && !PROCESSED_NAME_PATTERN.test(file.basename);
      }
      formatSequence(sequence) {
        return String(sequence).padStart(6, "0").slice(-6);
      }
      getCurrentNoteName(imageFile, noteFile) {
        const activeFile = noteFile instanceof TFile ? noteFile : this.app.workspace.getActiveFile();
        const rawName = activeFile instanceof TFile ? activeFile.basename : imageFile.parent?.name || "Vault";
        const safeName = String(rawName || "").trim().replace(/[\\/:*?"<>|#^[\]]+/g, "-").replace(/\s+/g, "-");
        return safeName || "Vault";
      }
      escapeRegExp(value) {
        return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
      async getTargetFolderPath(file) {
        const targetFolderPath = this.settings.targetFolder || file.parent?.path || "";
        await this.ensureFolderExists(targetFolderPath);
        return targetFolderPath;
      }
      normalizeFolderPath(folderPath) {
        const normalized = normalizePath2(String(folderPath || "").trim());
        if (!normalized || normalized === "." || normalized === "/") return "";
        const clean = normalized.replace(/^\/+|\/+$/g, "");
        if (clean.split("/").some((part) => part === "..")) {
          throw new Error(`Invalid target folder: ${folderPath}`);
        }
        return clean;
      }
      async ensureFolderExists(folderPath) {
        if (!folderPath) return;
        const existing = this.app.vault.getAbstractFileByPath(folderPath);
        if (existing instanceof TFolder) return;
        if (existing) throw new Error(`Target path is not a folder: ${folderPath}`);
        let currentPath = "";
        for (const part of folderPath.split("/").filter(Boolean)) {
          currentPath = currentPath ? `${currentPath}/${part}` : part;
          const current = this.app.vault.getAbstractFileByPath(currentPath);
          if (!current) await this.app.vault.createFolder(currentPath);
          else if (!(current instanceof TFolder)) {
            throw new Error(`Target path is not a folder: ${currentPath}`);
          }
        }
      }
      async getAvailableBasePath(fileName) {
        const extensionIndex = fileName.lastIndexOf(".");
        const basename = extensionIndex === -1 ? fileName : fileName.slice(0, extensionIndex);
        const extension = extensionIndex === -1 ? "" : fileName.slice(extensionIndex);
        let path = fileName;
        let index = 1;
        while (await this.app.vault.adapter.exists(path)) {
          path = `${basename} ${index}${extension}`;
          index += 1;
        }
        return path;
      }
      async refreshOpenFileView(file) {
        const viewType = file.extension === "canvas" ? "canvas" : "markdown";
        const leaves = this.app.workspace.getLeavesOfType(viewType) || [];
        const currentLeaf = this.app.workspace.getLeaf(false);
        for (const leaf of leaves) {
          const leafFile = leaf.view && "file" in leaf.view ? leaf.view.file : null;
          if (leafFile instanceof TFile && leafFile.path === file.path && leaf.openFile) {
            await leaf.openFile(file, { active: leaf === currentLeaf });
          }
        }
      }
      getActiveDocument() {
        if (typeof activeDocument !== "undefined" && activeDocument?.body) return activeDocument;
        if (typeof document !== "undefined" && document?.body) return document;
        return null;
      }
      getMutationObserver(documentRef) {
        return documentRef?.defaultView?.MutationObserver || (typeof MutationObserver !== "undefined" ? MutationObserver : null);
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
        if (this.settings.filenameDisplayMode === "hide") {
          documentRef.body.classList.add("oom-image-filename-hide");
        } else if (this.settings.filenameDisplayMode === "hover") {
          documentRef.body.classList.add("oom-image-filename-hover");
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
        const selector = ".nav-file-title[data-path], .tree-item-self[data-path]";
        for (const element of documentRef.querySelectorAll(selector)) {
          const path = element.getAttribute("data-path") || "";
          if (!path.toLowerCase().endsWith(".png")) continue;
          element.classList.add("oom-image-hidden-file");
          this.hiddenFileListElements.add(element);
          const container = element.closest(".nav-file, .tree-item");
          if (container) {
            container.classList.add("oom-image-hidden-file-container");
            this.hiddenFileListElements.add(container);
          }
        }
      }
      clearHiddenFileListElements() {
        for (const element of this.hiddenFileListElements) {
          element.classList.remove("oom-image-hidden-file", "oom-image-hidden-file-container");
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
        for (const delay of [250, 1e3, 2500]) {
          const timer = setTimeout(() => {
            this.baseStyleRetryTimers = this.baseStyleRetryTimers.filter((item) => item !== timer);
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
        const ruleMap = new Map(this.settings.baseNameStyleRules.map((rule) => [rule.extension, rule.color]));
        if (ruleMap.size === 0) return;
        const attributes = [
          "data-property",
          "data-property-key",
          "data-property-name",
          "data-column-id",
          "data-column-key",
          "aria-label"
        ];
        const selectorFor = (properties) => properties.flatMap((property) => attributes.map((attribute) => `[${attribute}='${property}']`)).join(", ");
        const extensionSelector = selectorFor(["file.ext", "file.extension"]);
        const nameSelector = selectorFor(["file.name", "file.path"]);
        for (const extensionCell of documentRef.querySelectorAll(extensionSelector)) {
          const row = extensionCell.closest('.bases-tr, .bases-table-row, tr, [role="row"]');
          if (!row) continue;
          const extension = String(extensionCell.textContent || "").trim().replace(/^\./, "").toLowerCase();
          const color = ruleMap.get(extension);
          const nameCell = row.querySelector(nameSelector);
          if (!color || !nameCell) continue;
          for (const element of [nameCell, ...nameCell.querySelectorAll("a, span, div")]) {
            element.classList.add("oom-image-base-name-styled");
            element.style?.setProperty("--oom-image-base-name-color", color);
            element.setAttribute("data-oom-image-base-name-style", "true");
            this.baseStyledElements.add(element);
          }
        }
      }
      clearBaseNameStyles() {
        for (const element of this.baseStyledElements) {
          element.classList.remove("oom-image-base-name-styled");
          element.style?.removeProperty("--oom-image-base-name-color");
          element.removeAttribute("data-oom-image-base-name-style");
        }
        this.baseStyledElements.clear();
      }
      removeDomEffects() {
        this.removeFilenameDisplayCss();
        this.stopFileListObserver();
        this.stopBaseStyleObserver();
      }
      sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
      showNotice(message) {
        const translated = typeof this.plugin.t === "function" ? this.plugin.t(message) : message;
        new Notice2(translated);
      }
    };
    module2.exports = { ImageRenameController: ImageRenameController2 };
  }
});

// mindmap.js
var require_mindmap = __commonJS({
  "mindmap.js"(exports2, module2) {
    var {
      ItemView: ItemView2,
      MarkdownRenderChild,
      MarkdownView,
      Notice: Notice2,
      setIcon: setIcon2
    } = require("obsidian");
    var MINDMAP_VIEW_TYPE = "open-obsidian-markdown-mindmap";
    var SVG_NS = "http://www.w3.org/2000/svg";
    var MIN_SCALE = 0.18;
    var MAX_SCALE = 4;
    function translate(plugin, text, english) {
      const translated = plugin.t?.(text) || text;
      if (plugin.settings?.language === "en" && translated === text && english) return english;
      return translated;
    }
    function createElement(parent, tag, className, text) {
      const element = document.createElement(tag);
      if (className) element.className = className;
      if (text !== void 0) element.textContent = text;
      parent.appendChild(element);
      return element;
    }
    function createSvg(parent, tag, className) {
      const element = document.createElementNS(SVG_NS, tag);
      if (className) element.setAttribute("class", className);
      parent.appendChild(element);
      return element;
    }
    function isMarkdownFile(file) {
      return Boolean(file && file.extension === "md" && typeof file.path === "string");
    }
    function cleanLabel(value) {
      return String(value || "").replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2").replace(/\[\[([^\]]+)\]\]/g, "$1").replace(/<[^>]+>/g, "").replace(/[`*_~]/g, "").replace(/\s+\^[\w-]+\s*$/, "").replace(/\s+/g, " ").trim().slice(0, 280);
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
        id: "virtual-root",
        text: title || "",
        kind: title ? "title" : "virtual",
        virtual: !title,
        children: []
      };
      const lines = String(markdown || "").replace(/\r\n?/g, "\n").split("\n");
      const headingStack = [];
      let listStack = [];
      let inFence = false;
      let fenceMarker = "";
      let inFrontmatter = lines[0]?.trim() === "---";
      for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index];
        const trimmed = line.trim();
        if (inFrontmatter) {
          if (index > 0 && (trimmed === "---" || trimmed === "...")) inFrontmatter = false;
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
          const node = makeNode(text, "heading", index);
          parent.children.push(node);
          headingStack.push({ level, node });
          listStack = [];
          continue;
        }
        const listMatch = line.match(/^([ \t]*)(?:[-+*]|\d{1,9}[.)])[ \t]+(.+?)\s*$/);
        if (listMatch) {
          const text = cleanLabel(listMatch[2].replace(/^\[[ xX-]\]\s*/, ""));
          if (!text) continue;
          const indent = listMatch[1].replace(/\t/g, "    ").length;
          const headingParent = headingStack.length ? headingStack[headingStack.length - 1].node : root;
          while (listStack.length && listStack[listStack.length - 1].indent >= indent) listStack.pop();
          let parent = headingParent;
          if (listStack.length && listStack[listStack.length - 1].headingParent === headingParent) {
            parent = listStack[listStack.length - 1].node;
          }
          const node = makeNode(text, "list", index);
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
      let current = "";
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
      visible[5] = `${visible[5].slice(0, Math.max(1, visible[5].length - 1))}\u2026`;
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
      const direction = settings.direction === "vertical" ? "vertical" : "horizontal";
      const horizontalGap = Math.max(28, Number(settings.spacingHorizontal) || 150);
      const verticalGap = Math.max(14, Number(settings.spacingVertical) || 28);
      const maxWidth = [];
      const maxHeight = [];
      for (const node of nodes) {
        const { depth, width, height } = node.layout;
        maxWidth[depth] = Math.max(maxWidth[depth] || 0, width);
        maxHeight[depth] = Math.max(maxHeight[depth] || 0, height);
      }
      if (direction === "horizontal") {
        const columns = [0];
        for (let depth = 1; depth < maxWidth.length; depth += 1) {
          columns[depth] = columns[depth - 1] + maxWidth[depth - 1] + horizontalGap;
        }
        let cursor = 0;
        const place = (node) => {
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
        const place = (node) => {
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
      const minX = Math.min(...nodes.map((node) => node.layout.x));
      const minY = Math.min(...nodes.map((node) => node.layout.y));
      const maxX = Math.max(...nodes.map((node) => node.layout.x + node.layout.width));
      const maxY = Math.max(...nodes.map((node) => node.layout.y + node.layout.height));
      return {
        ...prepared,
        direction,
        bounds: { minX, minY, maxX, maxY }
      };
    }
    function nodeColor(node, settings) {
      const colors = [
        settings.depth1Color || "#9167f2",
        settings.depth2Color || "#5b8def",
        settings.depth3Color || "#42d38b",
        settings.defaultColor || "#f2b84b"
      ];
      if (settings.coloring === "single") return colors[3];
      if (settings.coloring === "branch") return colors[node.layout.depth ? node.layout.branch % colors.length : 0];
      return colors[Math.min(node.layout.depth, colors.length - 1)];
    }
    function contrastColor(hex) {
      const match = /^#([0-9a-f]{6})$/i.exec(hex || "");
      if (!match) return "#ffffff";
      const value = Number.parseInt(match[1], 16);
      const red = value >> 16 & 255;
      const green = value >> 8 & 255;
      const blue = value & 255;
      return red * 0.299 + green * 0.587 + blue * 0.114 > 168 ? "#172033" : "#ffffff";
    }
    var MindmapSurface = class {
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
        this.svg = createSvg(viewport, "svg", "oom-mindmap-svg");
        this.svg.setAttribute("width", "100%");
        this.svg.setAttribute("height", "100%");
        this.svg.setAttribute("role", "img");
        this.svg.setAttribute("aria-label", "Markdown mind map");
        this.stage = createSvg(this.svg, "g", "oom-mindmap-stage");
        this.connectors = createSvg(this.stage, "g", "oom-mindmap-connectors");
        this.nodes = createSvg(this.stage, "g", "oom-mindmap-nodes");
        this.onWheel = (event) => {
          event.preventDefault();
          const rect = this.svg.getBoundingClientRect();
          const factor = Math.exp(-event.deltaY * 15e-4);
          this.zoomAt(factor, event.clientX - rect.left, event.clientY - rect.top);
        };
        this.onPointerDown = (event) => {
          if (event.button !== 0) return;
          if (event.target.closest?.(".oom-mindmap-node")) {
            this.wasDragged = false;
            return;
          }
          this.drag = { id: event.pointerId, x: event.clientX, y: event.clientY };
          this.wasDragged = false;
          this.svg.setPointerCapture?.(event.pointerId);
          this.viewport.classList.add("oom-mindmap-is-panning");
        };
        this.onPointerMove = (event) => {
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
        this.onPointerUp = (event) => {
          if (!this.drag || this.drag.id !== event.pointerId) return;
          this.svg.releasePointerCapture?.(event.pointerId);
          this.drag = null;
          this.viewport.classList.remove("oom-mindmap-is-panning");
          setTimeout(() => {
            this.wasDragged = false;
          }, 0);
        };
        this.svg.addEventListener("wheel", this.onWheel, { passive: false });
        this.svg.addEventListener("pointerdown", this.onPointerDown);
        this.svg.addEventListener("pointermove", this.onPointerMove);
        this.svg.addEventListener("pointerup", this.onPointerUp);
        this.svg.addEventListener("pointercancel", this.onPointerUp);
        if (typeof ResizeObserver !== "undefined") {
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
          const path = createSvg(this.connectors, "path", "oom-mindmap-connector");
          let data;
          if (this.layout.direction === "horizontal") {
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
          path.setAttribute("d", data);
          path.setAttribute("fill", "none");
          path.setAttribute("stroke", nodeColor(child, this.settings));
          path.setAttribute("stroke-width", "2");
          path.setAttribute("stroke-opacity", "0.62");
        }
        for (const node of this.layout.nodes) this.drawNode(node, collapsed);
        this.applyTransform();
        if (options.fit) requestAnimationFrame(() => this.fit());
      }
      drawNode(node, collapsed) {
        const layout = node.layout;
        const group = createSvg(this.nodes, "g", "oom-mindmap-node");
        group.setAttribute("transform", `translate(${layout.x} ${layout.y})`);
        group.setAttribute("role", "button");
        group.setAttribute("tabindex", "0");
        group.setAttribute("pointer-events", "all");
        group.setAttribute("aria-label", node.children.length ? `${node.text}\uFF0C${collapsed.has(node.id) ? "\u5C55\u5F00" : "\u6298\u53E0"}` : node.text);
        group.style.cursor = node.children.length ? "pointer" : "default";
        const color = nodeColor(node, this.settings);
        const rect = createSvg(group, "rect", "oom-mindmap-node-rect");
        rect.setAttribute("width", String(layout.width));
        rect.setAttribute("height", String(layout.height));
        rect.setAttribute("rx", "11");
        rect.setAttribute("fill", color);
        rect.setAttribute("pointer-events", "all");
        const title = createSvg(group, "title");
        title.textContent = node.text;
        const label = createSvg(group, "text", "oom-mindmap-node-label");
        label.setAttribute("data-no-i18n", "");
        const textX = layout.horizontalPadding / 2;
        const textY = layout.height / 2 - (layout.lines.length - 1) * layout.lineHeight / 2 + layout.fontSize * 0.36;
        label.setAttribute("x", String(textX));
        label.setAttribute("y", String(textY));
        label.setAttribute("fill", contrastColor(color));
        label.setAttribute("font-size", String(layout.fontSize));
        label.setAttribute("font-family", "var(--font-interface, sans-serif)");
        layout.lines.forEach((line, index) => {
          const span = createSvg(label, "tspan", "oom-mindmap-node-label-line");
          span.setAttribute("x", String(textX));
          if (index) span.setAttribute("dy", String(layout.lineHeight));
          span.textContent = line;
        });
        if (node.children.length) {
          const toggle = createSvg(group, "g", "oom-mindmap-node-toggle");
          const cx = this.layout.direction === "horizontal" ? layout.width : layout.width / 2;
          const cy = this.layout.direction === "horizontal" ? layout.height / 2 : layout.height;
          const circle = createSvg(toggle, "circle", "oom-mindmap-node-toggle-circle");
          circle.setAttribute("cx", String(cx));
          circle.setAttribute("cy", String(cy));
          circle.setAttribute("r", "8");
          circle.setAttribute("fill", "var(--background-primary, #ffffff)");
          circle.setAttribute("stroke", color);
          circle.setAttribute("stroke-width", "2");
          const horizontal = createSvg(toggle, "path", "oom-mindmap-node-toggle-mark");
          horizontal.setAttribute("d", `M ${cx - 4} ${cy} L ${cx + 4} ${cy}`);
          horizontal.setAttribute("stroke", color);
          horizontal.setAttribute("stroke-width", "1.8");
          if (collapsed.has(node.id)) {
            const vertical = createSvg(toggle, "path", "oom-mindmap-node-toggle-mark");
            vertical.setAttribute("d", `M ${cx} ${cy - 4} L ${cx} ${cy + 4}`);
            vertical.setAttribute("stroke", color);
            vertical.setAttribute("stroke-width", "1.8");
          }
        }
        const toggleNode = (event) => {
          if (!node.children.length) return;
          event.preventDefault();
          event.stopPropagation();
          this.onToggle(node);
        };
        group.addEventListener("click", toggleNode);
        group.addEventListener("keydown", (event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            toggleNode(event);
          }
        });
      }
      applyTransform() {
        this.stage.setAttribute("transform", `translate(${this.panX} ${this.panY}) scale(${this.scale})`);
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
        this.svg.removeEventListener("wheel", this.onWheel);
        this.svg.removeEventListener("pointerdown", this.onPointerDown);
        this.svg.removeEventListener("pointermove", this.onPointerMove);
        this.svg.removeEventListener("pointerup", this.onPointerUp);
        this.svg.removeEventListener("pointercancel", this.onPointerUp);
        this.resizeObserver?.disconnect();
      }
    };
    function applyInitialCollapse(root, collapsed, level) {
      collapsed.clear();
      if (level < 0) return;
      const roots = root.virtual ? root.children : [root];
      const visit = (node, depth) => {
        if (node.children.length && depth >= level) collapsed.add(node.id);
        for (const child of node.children) visit(child, depth + 1);
      };
      roots.forEach((node) => visit(node, 0));
    }
    function addToolbarButton(parent, icon, label, callback) {
      const button = createElement(parent, "button", "oom-mindmap-toolbar-button");
      button.type = "button";
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
      setIcon2(button, icon);
      button.addEventListener("click", callback);
      return button;
    }
    var MindmapView = class extends ItemView2 {
      constructor(leaf, controller) {
        super(leaf);
        this.controller = controller;
        this.plugin = controller.plugin;
        this.pinned = false;
        this.filePath = "";
        this.currentFilePath = "";
        this.collapsed = /* @__PURE__ */ new Set();
        this.collapseKey = "";
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
          return `${translate(this.plugin, "\u601D\u7EF4\u5BFC\u56FE", "Mind map")} \xB7 ${file?.basename || this.filePath.split("/").pop()?.replace(/\.md$/i, "")}`;
        }
        return `${translate(this.plugin, "\u601D\u7EF4\u5BFC\u56FE", "Mind map")} \xB7 ${translate(this.plugin, "\u8DDF\u968F\u5F53\u524D\u6587\u4EF6", "Follow current file")}`;
      }
      getIcon() {
        return "git-fork";
      }
      getState() {
        return { pinned: this.pinned, filePath: this.pinned ? this.filePath : "" };
      }
      async setState(state) {
        this.pinned = Boolean(state?.pinned);
        this.filePath = this.pinned && typeof state?.filePath === "string" ? state.filePath : "";
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
        this.contentEl.classList.add("oom-mindmap-view");
        this.contentEl.classList.toggle("oom-mindmap-mobile", Boolean(this.app.isMobile));
        this.contentEl.style.padding = "0";
        this.contentEl.style.overflow = "hidden";
        this.shell = createElement(this.contentEl, "div", "oom-mindmap-shell");
        this.shell.style.height = "100%";
        this.shell.style.minHeight = "240px";
        this.shell.style.display = "flex";
        this.shell.style.flexDirection = "column";
        this.header = createElement(this.shell, "div", "oom-mindmap-header");
        this.header.style.display = "flex";
        this.header.style.alignItems = "center";
        this.header.style.gap = "8px";
        this.header.style.padding = this.app.isMobile ? "8px" : "10px 12px";
        this.titleEl = createElement(
          this.header,
          "div",
          "oom-mindmap-title",
          translate(this.plugin, "\u601D\u7EF4\u5BFC\u56FE", "Mind map")
        );
        this.titleEl.style.fontWeight = "600";
        this.titleEl.style.minWidth = "0";
        this.titleEl.style.overflow = "hidden";
        this.titleEl.style.textOverflow = "ellipsis";
        this.titleEl.style.whiteSpace = "nowrap";
        this.titleEl.setAttribute("data-no-i18n", "");
        this.modeEl = createElement(this.header, "span", "oom-mindmap-mode");
        this.modeEl.style.opacity = "0.65";
        this.modeEl.style.fontSize = "12px";
        this.toolbar = createElement(this.header, "div", "oom-mindmap-toolbar");
        this.toolbar.style.marginInlineStart = "auto";
        this.toolbar.style.display = this.plugin.settings.mindmap.showToolbar ? "flex" : "none";
        this.toolbar.style.gap = "4px";
        this.toolbar.style.flex = "0 0 auto";
        this.toolbar.style.overflowX = "auto";
        addToolbarButton(this.toolbar, "scan", translate(this.plugin, "\u9002\u914D\u89C6\u56FE", "Fit view"), () => this.surface?.fit());
        addToolbarButton(this.toolbar, "zoom-in", translate(this.plugin, "\u653E\u5927", "Zoom in"), () => this.surface?.zoomBy(1.2));
        addToolbarButton(this.toolbar, "zoom-out", translate(this.plugin, "\u7F29\u5C0F", "Zoom out"), () => this.surface?.zoomBy(1 / 1.2));
        addToolbarButton(this.toolbar, "chevrons-down-up", translate(this.plugin, "\u5C55\u5F00\u5168\u90E8", "Expand all"), () => this.expandAll());
        addToolbarButton(this.toolbar, "chevrons-up-down", translate(this.plugin, "\u6298\u53E0\u5168\u90E8", "Collapse all"), () => this.collapseAll());
        this.viewport = createElement(this.shell, "div", "oom-mindmap-viewport");
        this.viewport.style.position = "relative";
        this.viewport.style.flex = "1 1 auto";
        this.viewport.style.minHeight = "0";
        this.viewport.style.overflow = "hidden";
        this.viewport.style.touchAction = "none";
        this.viewport.style.background = "var(--background-primary)";
        this.emptyEl = createElement(this.viewport, "div", "oom-mindmap-empty");
        this.emptyEl.style.position = "absolute";
        this.emptyEl.style.inset = "0";
        this.emptyEl.style.display = "none";
        this.emptyEl.style.placeItems = "center";
        this.emptyEl.style.padding = "24px";
        this.emptyEl.style.textAlign = "center";
        this.emptyEl.style.color = "var(--text-muted)";
        this.surface = new MindmapSurface(
          this.viewport,
          this.plugin.settings.mindmap,
          (node) => this.toggleNode(node),
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
        this.modeEl.textContent = this.pinned ? translate(this.plugin, "\u56FA\u5B9A", "Pinned") : translate(this.plugin, "\u8DDF\u968F", "Following");
        this.contentEl.classList.toggle("oom-mindmap-pinned", this.pinned);
        this.contentEl.classList.toggle("oom-mindmap-following", !this.pinned);
        if (!file) {
          this.showEmpty(this.pinned ? translate(this.plugin, "\u56FA\u5B9A\u7684 Markdown \u6587\u4EF6\u4E0D\u5B58\u5728\u6216\u5DF2\u88AB\u79FB\u9664", "The pinned Markdown file no longer exists") : translate(this.plugin, "\u8BF7\u5148\u6253\u5F00\u4E00\u4E2A Markdown \u6587\u4EF6", "Open a Markdown file first"));
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
            this.showEmpty(`${translate(this.plugin, "\u65E0\u6CD5\u8BFB\u53D6", "Unable to read")} ${file.basename}`);
          }
          console.error("[Open Obsidian Manage] Failed to read mind map source", error);
          return;
        }
        if (token !== this.renderToken) return;
        const title = this.plugin.settings.mindmap.titleAsRootNode ? file.basename : "";
        const tree = parseMarkdown(markdown, title);
        if (!tree) {
          this.showEmpty(translate(
            this.plugin,
            "\u6B64\u7B14\u8BB0\u4E2D\u8FD8\u6CA1\u6709 ATX \u6807\u9898\u6216 Markdown \u5217\u8868",
            "This note has no ATX headings or Markdown lists yet"
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
          const validIds = /* @__PURE__ */ new Set();
          const collect = (node) => {
            validIds.add(node.id);
            node.children.forEach(collect);
          };
          if (tree.virtual) tree.children.forEach(collect);
          else collect(tree);
          for (const id of this.collapsed) if (!validIds.has(id)) this.collapsed.delete(id);
        }
        this.emptyEl.style.display = "none";
        this.surface.svg.style.display = "block";
        this.surface.render(tree, this.collapsed, { fit: Boolean(options.forceFit) });
        this.plugin.localizeElement?.(this.contentEl);
      }
      showEmpty(message) {
        this.tree = null;
        this.emptyEl.textContent = message;
        this.emptyEl.style.display = "grid";
        this.surface.svg.style.display = "none";
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
        const visit = (node) => {
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
          this.collapseKey = "";
          this.leaf.updateHeader?.();
        }
      }
    };
    var EmbeddedMindmap = class extends MarkdownRenderChild {
      constructor(container, source, plugin, mobile) {
        super(container);
        this.container = container;
        this.source = source;
        this.plugin = plugin;
        this.settings = plugin.settings.mindmap;
        this.mobile = mobile;
        this.collapsed = /* @__PURE__ */ new Set();
        this.surface = null;
      }
      onload() {
        this.container.classList.add("oom-mindmap-embed");
        this.container.style.height = this.mobile ? "320px" : "420px";
        this.container.style.minHeight = "240px";
        this.container.style.position = "relative";
        this.container.style.overflow = "hidden";
        const tree = parseMarkdown(this.source, "");
        if (!tree) {
          const empty = createElement(
            this.container,
            "div",
            "oom-mindmap-empty",
            translate(this.plugin, "\u6B64 markmap \u4EE3\u7801\u5757\u4E2D\u6CA1\u6709\u6807\u9898\u6216\u5217\u8868", "This markmap block has no headings or lists")
          );
          empty.style.padding = "24px";
          empty.style.textAlign = "center";
          this.plugin.localizeElement?.(this.container);
          return;
        }
        applyInitialCollapse(tree, this.collapsed, Number(this.settings.initialExpandLevel));
        this.surface = new MindmapSurface(this.container, this.settings, (node) => {
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
    };
    var MindmapController2 = class {
      constructor(plugin) {
        this.plugin = plugin;
        this.app = plugin.app;
        this.views = /* @__PURE__ */ new Set();
        this.eventRefs = [];
        this.refreshTimer = null;
        this.lastMarkdownPath = "";
        this.started = false;
      }
      async start() {
        if (this.started) return;
        this.started = true;
        this.rememberMarkdown(this.app.workspace.getActiveFile());
        this.plugin.registerView(MINDMAP_VIEW_TYPE, (leaf) => new MindmapView(leaf, this));
        this.plugin.addCommand({
          id: "open-mindmap-follow-current-markdown",
          name: `${this.plugin.t("\u6253\u5F00\u601D\u7EF4\u5BFC\u56FE")}\uFF1A${this.plugin.t("\u8DDF\u968F\u5F53\u524D\u6587\u4EF6")}`,
          hotkeys: [{ modifiers: ["Mod", "Shift"], key: "m" }],
          callback: () => this.open(false)
        });
        this.plugin.addCommand({
          id: "open-mindmap-pin-current-markdown",
          name: `${this.plugin.t("\u6253\u5F00\u601D\u7EF4\u5BFC\u56FE")}\uFF1A${this.plugin.t("\u56FA\u5B9A\u5F53\u524D\u6587\u4EF6")}`,
          callback: () => this.open(true)
        });
        this.plugin.registerMarkdownCodeBlockProcessor("markmap", (source, element, context) => {
          if (!this.plugin.settings.mindmap.enabled) {
            const pre = element.createEl("pre");
            pre.createEl("code", { text: source });
            return;
          }
          const child = new EmbeddedMindmap(element, source, this.plugin, Boolean(this.app.isMobile));
          context.addChild(child);
        });
        this.listen(this.app.workspace, "file-open", (file) => {
          this.rememberMarkdown(file);
          this.scheduleRefresh();
        });
        this.listen(this.app.workspace, "active-leaf-change", (leaf) => {
          this.rememberMarkdown(leaf?.view?.file);
          this.scheduleRefresh();
        });
        this.listen(this.app.workspace, "editor-change", (_editor, view) => {
          this.rememberMarkdown(view?.file);
          this.scheduleRefresh();
        });
        this.listen(this.app.vault, "rename", (file, oldPath) => {
          if (this.lastMarkdownPath === oldPath) this.lastMarkdownPath = file.path;
          for (const view of this.views) view.handleRename(file, oldPath);
          this.app.workspace.requestSaveLayout?.();
          this.scheduleRefresh();
        });
        this.listen(this.app.vault, "modify", (file) => {
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
        await Promise.all(Array.from(this.views, (view) => view.applySettings()));
      }
      async open(pinned = false) {
        if (!this.plugin.settings.mindmap.enabled) {
          const source = "\u8BF7\u5148\u5728 Open Obsidian Manage \u8BBE\u7F6E\u4E2D\u542F\u7528\u601D\u7EF4\u5BFC\u56FE";
          const message = this.plugin.t(source);
          new Notice2(this.plugin.settings.language === "en" && message === source ? "Enable mind maps in Open Obsidian Manage settings first" : message);
          return;
        }
        const file = this.getFollowFile();
        if (!file) {
          const source = "\u8BF7\u5148\u6253\u5F00\u4E00\u4E2A Markdown \u6587\u4EF6";
          const message = this.plugin.t(source);
          new Notice2(this.plugin.settings.language === "en" && message === source ? "Open a Markdown file first" : message);
          return;
        }
        this.rememberMarkdown(file);
        const leaves = this.app.workspace.getLeavesOfType(MINDMAP_VIEW_TYPE);
        let leaf = leaves.find((candidate) => {
          const view = candidate.view;
          return view instanceof MindmapView && view.pinned === Boolean(pinned) && (!pinned || view.filePath === file.path);
        });
        if (!leaf) {
          leaf = this.app.workspace.getLeaf("tab");
          await leaf.setViewState({
            type: MINDMAP_VIEW_TYPE,
            active: true,
            state: { pinned: Boolean(pinned), filePath: pinned ? file.path : "" }
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
        const remembered = this.lastMarkdownPath ? this.app.vault.getAbstractFileByPath(this.lastMarkdownPath) : null;
        return isMarkdownFile(remembered) ? remembered : null;
      }
      async readMarkdown(file) {
        const leaves = this.app.workspace.getLeavesOfType("markdown");
        const openView = leaves.map((leaf) => leaf.view).find((view) => view instanceof MarkdownView && view.file?.path === file.path && view.editor);
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
        await Promise.all(Array.from(this.views, (view) => view.refresh()));
      }
    };
    module2.exports = {
      MindmapController: MindmapController2,
      MINDMAP_VIEW_TYPE
    };
  }
});

// main.source.js
var {
  Plugin,
  ItemView,
  Modal,
  Notice,
  PluginSettingTab,
  Setting,
  normalizePath,
  setIcon
} = require("obsidian");
var { translateText, localizeElement } = require_i18n();
var { ImageRenameController } = require_image_rename();
var { MindmapController } = require_mindmap();
var VIEW_TYPE_MANAGE = "open-obsidian-manage-view";
var DEFAULT_DATA_FOLDER = "Archive/img/Open_Manager";
var MANAGEMENT_DATABASE = "management.md";
var PLANNING_DATABASE = "planning.md";
var FINANCE_DATABASE = "finance.md";
var LEGACY_FUNDS_DATABASE = "Personal_funds/records.md";
var DEFAULT_IMAGE_RENAME_SETTINGS = {
  enabled: false,
  targetFolder: "Archive/img",
  filenameDisplayMode: "hover",
  hidePngInFileList: true,
  baseNameStyleRules: [
    { extension: "canvas", color: "#f9a8d4" },
    { extension: "md", color: "#3f3f46" }
  ]
};
var DEFAULT_MINDMAP_SETTINGS = {
  enabled: true,
  direction: "horizontal",
  spacingHorizontal: 150,
  spacingVertical: 28,
  initialExpandLevel: 4,
  showToolbar: true,
  titleAsRootNode: true,
  coloring: "depth",
  depth1Color: "#9167f2",
  depth2Color: "#5b8def",
  depth3Color: "#42d38b",
  defaultColor: "#f2b84b"
};
var DEFAULT_DATA = {
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
var FINANCE_TYPES = [
  ["income", "\u6536\u5165"],
  ["expense", "\u652F\u51FA"],
  ["credit_expense", "\u4FE1\u7528\u5361\u652F\u51FA"],
  ["repay_credit", "\u8FD8\u4FE1\u7528\u5361"],
  ["lend_out", "\u501F\u51FA"],
  ["collect_loan", "\u6536\u56DE\u501F\u51FA"],
  ["account_adjust", "\u8D26\u6237\u8C03\u6574"]
];
var FINANCE_CATEGORIES = ["\u9910\u996E", "\u4EA4\u901A", "\u8BBE\u5907", "\u5B66\u4E60", "\u9879\u76EE", "\u5DE5\u8D44", "\u4FE1\u7528\u5361", "\u501F\u51FA", "\u5176\u4ED6"];
var PROJECT_STATUSES = [
  ["planned", "\u5F85\u5F00\u59CB"],
  ["active", "\u8FDB\u884C\u4E2D"],
  ["blocked", "\u963B\u585E"],
  ["done", "\u5DF2\u5B8C\u6210"]
];
var ACTION_STATUSES = [
  ["todo", "\u5F85\u5904\u7406"],
  ["doing", "\u8FDB\u884C\u4E2D"],
  ["blocked", "\u963B\u585E"],
  ["done", "\u5DF2\u5B8C\u6210"]
];
var PRIORITIES = [
  ["P0", "P0 \xB7 \u7D27\u6025"],
  ["P1", "P1 \xB7 \u91CD\u8981"],
  ["P2", "P2 \xB7 \u5E38\u89C4"],
  ["P3", "P3 \xB7 \u7A0D\u540E"]
];
var PRIORITY_WEIGHT = { P0: 0, P1: 1, P2: 2, P3: 3 };
function uid(prefix) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function today() {
  return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
function cloneDefault() {
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}
function normalizeData(raw) {
  const data = raw && typeof raw === "object" ? raw : cloneDefault();
  const finance = data.finance && typeof data.finance === "object" ? data.finance : {};
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
  const source = raw?.settings && typeof raw.settings === "object" ? raw.settings : raw || {};
  const folder = typeof source.dataFolder === "string" ? source.dataFolder.trim() : "";
  const imageSource = source.imageRename && typeof source.imageRename === "object" ? source.imageRename : {};
  const mindmapSource = source.mindmap && typeof source.mindmap === "object" ? source.mindmap : {};
  const imageFolder = String(imageSource.targetFolder || "").trim();
  const filenameDisplayMode = ["show", "hide", "hover"].includes(imageSource.filenameDisplayMode) ? imageSource.filenameDisplayMode : DEFAULT_IMAGE_RENAME_SETTINGS.filenameDisplayMode;
  const baseNameStyleRules = Array.isArray(imageSource.baseNameStyleRules) ? imageSource.baseNameStyleRules.map((rule) => ({
    extension: String(rule?.extension || "").trim().replace(/^\./, "").toLowerCase(),
    color: /^#[0-9a-f]{6}$/i.test(String(rule?.color || "")) ? String(rule.color) : "#3f3f46"
  })).filter((rule) => rule.extension) : DEFAULT_IMAGE_RENAME_SETTINGS.baseNameStyleRules.map((rule) => ({ ...rule }));
  return {
    dataFolder: normalizePath(folder || DEFAULT_DATA_FOLDER).replace(/^\/+|\/+$/g, ""),
    language: source.language === "en" ? "en" : "zh",
    imageRename: {
      enabled: typeof imageSource.enabled === "boolean" ? imageSource.enabled : DEFAULT_IMAGE_RENAME_SETTINGS.enabled,
      targetFolder: imageFolder ? normalizePath(imageFolder).replace(/^\/+|\/+$/g, "") : DEFAULT_IMAGE_RENAME_SETTINGS.targetFolder,
      filenameDisplayMode,
      hidePngInFileList: typeof imageSource.hidePngInFileList === "boolean" ? imageSource.hidePngInFileList : DEFAULT_IMAGE_RENAME_SETTINGS.hidePngInFileList,
      baseNameStyleRules
    },
    mindmap: {
      enabled: typeof mindmapSource.enabled === "boolean" ? mindmapSource.enabled : DEFAULT_MINDMAP_SETTINGS.enabled,
      direction: mindmapSource.direction === "vertical" ? "vertical" : "horizontal",
      spacingHorizontal: Math.min(320, Math.max(70, Number(mindmapSource.spacingHorizontal) || DEFAULT_MINDMAP_SETTINGS.spacingHorizontal)),
      spacingVertical: Math.min(100, Math.max(14, Number(mindmapSource.spacingVertical) || DEFAULT_MINDMAP_SETTINGS.spacingVertical)),
      initialExpandLevel: Math.min(12, Math.max(-1, Number.isFinite(Number(mindmapSource.initialExpandLevel)) ? Number(mindmapSource.initialExpandLevel) : DEFAULT_MINDMAP_SETTINGS.initialExpandLevel)),
      showToolbar: typeof mindmapSource.showToolbar === "boolean" ? mindmapSource.showToolbar : DEFAULT_MINDMAP_SETTINGS.showToolbar,
      titleAsRootNode: typeof mindmapSource.titleAsRootNode === "boolean" ? mindmapSource.titleAsRootNode : DEFAULT_MINDMAP_SETTINGS.titleAsRootNode,
      coloring: ["depth", "branch", "single"].includes(mindmapSource.coloring) ? mindmapSource.coloring : "depth",
      depth1Color: normalizeColor(mindmapSource.depth1Color, DEFAULT_MINDMAP_SETTINGS.depth1Color),
      depth2Color: normalizeColor(mindmapSource.depth2Color, DEFAULT_MINDMAP_SETTINGS.depth2Color),
      depth3Color: normalizeColor(mindmapSource.depth3Color, DEFAULT_MINDMAP_SETTINGS.depth3Color),
      defaultColor: normalizeColor(mindmapSource.defaultColor, DEFAULT_MINDMAP_SETTINGS.defaultColor)
    }
  };
}
function normalizeColor(value, fallback) {
  return /^#[0-9a-f]{6}$/i.test(String(value || "")) ? String(value) : fallback;
}
function statusLabel(value, options) {
  return options.find(([id]) => id === value)?.[1] || value;
}
function dueLabel(value) {
  if (!value) return "\u65E0\u622A\u6B62\u65E5\u671F";
  const due = /* @__PURE__ */ new Date(`${value}T23:59:59`);
  const now = /* @__PURE__ */ new Date();
  const days = Math.ceil((due - now) / 864e5);
  if (days < 0) return `\u903E\u671F ${Math.abs(days)} \u5929`;
  if (days === 0) return "\u4ECA\u5929\u622A\u6B62";
  if (days === 1) return "\u660E\u5929\u622A\u6B62";
  return `${value} \u622A\u6B62`;
}
function isOverdue(value, status) {
  return Boolean(value && status !== "done" && /* @__PURE__ */ new Date(`${value}T23:59:59`) < /* @__PURE__ */ new Date());
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
  return Number(value || 0).toLocaleString("zh-CN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}
function financeTypeLabel(type) {
  return FINANCE_TYPES.find(([id]) => id === type)?.[1] || type;
}
function iconButton(parent, icon, label, className, onClick) {
  const button = parent.createEl("button", {
    cls: `oom-icon-button ${className || ""}`.trim(),
    attr: { type: "button", "aria-label": label, title: label }
  });
  setIcon(button, icon);
  button.addEventListener("click", onClick);
  return button;
}
function textButton(parent, label, className, onClick) {
  const button = parent.createEl("button", {
    text: label,
    cls: className,
    attr: { type: "button" }
  });
  button.addEventListener("click", onClick);
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
      (leaf) => new ManageView(leaf, this)
    );
    this.imageRename = new ImageRenameController(this);
    this.mindmap = new MindmapController(this);
    await this.imageRename.start();
    await this.mindmap.start();
    this.addRibbonIcon("panel-top-open", this.t("\u6253\u5F00\u7BA1\u7406\u4E2D\u67A2"), () => this.activateView());
    this.addCommand({
      id: "open-manage-dashboard",
      name: this.t("\u6253\u5F00\u7BA1\u7406\u4E2D\u67A2"),
      callback: () => this.activateView()
    });
    this.addCommand({
      id: "add-manage-project",
      name: this.t("\u65B0\u5EFA\u9879\u76EE"),
      callback: () => new ProjectModal(this.app, this, null).open()
    });
    this.addCommand({
      id: "add-manage-action",
      name: this.t("\u65B0\u5EFA\u884C\u52A8"),
      callback: () => new ActionModal(this.app, this, null).open()
    });
    this.addCommand({
      id: "capture-manage-idea",
      name: this.t("\u8BB0\u5F55\u60F3\u6CD5"),
      callback: () => new IdeaModal(this.app, this, null).open()
    });
  }
  onunload() {
    this.imageRename?.stop();
    this.mindmap?.stop();
    this.app.workspace.detachLeavesOfType(VIEW_TYPE_MANAGE);
  }
  t(text) {
    return translateText(text, this.settings?.language || "zh");
  }
  localizeElement(root) {
    if (!root) return;
    root.setAttr?.("lang", this.settings.language === "en" ? "en" : "zh-CN");
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
    this.settings.language = language === "en" ? "en" : "zh";
    await this.savePluginSettings();
    this.settingTab?.display();
  }
  async activateView() {
    let leaf = this.app.workspace.getLeavesOfType(VIEW_TYPE_MANAGE)[0];
    if (!leaf) {
      leaf = this.app.workspace.getLeaf("tab");
      await leaf.setViewState({ type: VIEW_TYPE_MANAGE, active: true });
    }
    this.app.workspace.revealLeaf(leaf);
  }
  getDataFolder() {
    return normalizePath(this.settings.dataFolder || DEFAULT_DATA_FOLDER).replace(/^\/+|\/+$/g, "");
  }
  getDataPath(fileName) {
    return normalizePath(`${this.getDataFolder()}/${fileName}`);
  }
  async ensureFolder(path = this.getDataFolder()) {
    const parts = normalizePath(path).split("/").filter(Boolean);
    let current = "";
    for (const part of parts) {
      current = current ? `${current}/${part}` : part;
      if (!await this.app.vault.adapter.exists(current)) {
        await this.app.vault.adapter.mkdir(current);
      }
    }
  }
  parseDatabase(raw, expectedKind) {
    const match = String(raw || "").match(/```json\s*([\s\S]*?)\s*```/i);
    const payload = match ? match[1] : raw;
    const parsed = JSON.parse(payload);
    if (!parsed || typeof parsed !== "object") throw new Error("Database payload is not an object");
    if (expectedKind && parsed.kind && parsed.kind !== expectedKind) {
      throw new Error(`Unexpected database kind: ${parsed.kind}`);
    }
    return parsed;
  }
  serializeDatabase(title, kind, payload) {
    const body = {
      version: 1,
      kind,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      ...payload
    };
    return [
      `# ${title}`,
      "",
      "> Open Obsidian Manage \u7684\u672C\u5730\u6570\u636E\u6587\u4EF6\u3002\u53EF\u4EE5\u968F\u7B14\u8BB0\u5E93\u540C\u6B65\uFF0C\u8BF7\u4E0D\u8981\u624B\u52A8\u7834\u574F JSON \u4EE3\u7801\u5757\u3002",
      "",
      "```json",
      JSON.stringify(body, null, 2),
      "```",
      ""
    ].join("\n");
  }
  async readDatabase(fileName, kind) {
    const path = this.getDataPath(fileName);
    if (!await this.app.vault.adapter.exists(path)) return null;
    return this.parseDatabase(await this.app.vault.adapter.read(path), kind);
  }
  async writeDatabase(fileName, title, kind, payload, folderReady = false) {
    if (!folderReady) await this.ensureFolder();
    const path = this.getDataPath(fileName);
    await this.app.vault.adapter.write(path, this.serializeDatabase(title, kind, payload));
  }
  hasLegacyManagementData(data) {
    return data.projects.length > 0 || data.actions.length > 0 || data.ideas.length > 0 || data.finance.records.length > 0 || data.finance.fixedExpenses.length > 0 || data.finance.expectedIncomes.length > 0 || data.finance.expectedExpense > 0;
  }
  async importLegacyFunds() {
    if (!await this.app.vault.adapter.exists(LEGACY_FUNDS_DATABASE)) return null;
    try {
      const parsed = this.parseDatabase(
        await this.app.vault.adapter.read(LEGACY_FUNDS_DATABASE)
      );
      const settings = parsed.settings && typeof parsed.settings === "object" ? parsed.settings : {};
      const records = Array.isArray(parsed.records) ? parsed.records : [];
      if (!records.length && !Array.isArray(settings.fixedExpenses) && !Array.isArray(settings.expectedIncomes)) {
        return null;
      }
      return {
        records,
        fixedExpenses: Array.isArray(settings.fixedExpenses) ? settings.fixedExpenses : [],
        expectedIncomes: Array.isArray(settings.expectedIncomes) ? settings.expectedIncomes : [],
        expectedExpense: Number.isFinite(Number(settings.expectedExpense)) ? Math.max(0, Number(settings.expectedExpense)) : 0
      };
    } catch (error) {
      console.error("Open Obsidian Manage: failed to import Personal Funds database", error);
      return null;
    }
  }
  async loadWorkspaceData(legacyData) {
    let management = null;
    let planning = null;
    let financeFile = null;
    try {
      [management, planning, financeFile] = await Promise.all([
        this.readDatabase(MANAGEMENT_DATABASE, "management"),
        this.readDatabase(PLANNING_DATABASE, "planning"),
        this.readDatabase(FINANCE_DATABASE, "finance")
      ]);
    } catch (error) {
      console.error("Open Obsidian Manage: failed to read database", error);
      new Notice(this.t("\u7BA1\u7406\u6570\u636E\u8BFB\u53D6\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u6570\u636E\u6587\u4EF6\u5939\u4E2D\u7684 JSON \u4EE3\u7801\u5757"));
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
      new Notice(this.t(`\u6570\u636E\u5DF2\u8FC1\u79FB\u5230 ${this.getDataFolder()}`));
    }
    return data;
  }
  async writeAllDatabases() {
    await this.ensureFolder();
    await Promise.all([
      this.writeDatabase(MANAGEMENT_DATABASE, "\u9879\u76EE\u4E0E\u884C\u52A8\u6570\u636E\u5E93", "management", {
        projects: this.data.projects,
        actions: this.data.actions
      }, true),
      this.writeDatabase(PLANNING_DATABASE, "\u672A\u6765\u89C4\u5212\u6570\u636E\u5E93", "planning", {
        ideas: this.data.ideas
      }, true),
      this.writeDatabase(FINANCE_DATABASE, "\u4E2A\u4EBA\u8D44\u91D1\u6570\u636E\u5E93", "finance", {
        finance: this.data.finance
      }, true)
    ]);
  }
  async reloadDataFromFiles() {
    try {
      const [management, planning, financeFile] = await Promise.all([
        this.readDatabase(MANAGEMENT_DATABASE, "management"),
        this.readDatabase(PLANNING_DATABASE, "planning"),
        this.readDatabase(FINANCE_DATABASE, "finance")
      ]);
      if (!management || !planning || !financeFile?.finance) {
        throw new Error("\u6570\u636E\u6587\u4EF6\u4E0D\u5B8C\u6574\uFF0C\u8BF7\u786E\u8BA4 management.md\u3001planning.md \u548C finance.md \u90FD\u5B58\u5728");
      }
      this.data = normalizeData({
        projects: management.projects,
        actions: management.actions,
        ideas: planning.ideas,
        finance: financeFile.finance
      });
      await this.saveData({ settings: this.settings });
      this.refreshViews();
      new Notice(this.t(`\u5DF2\u4ECE ${this.getDataFolder()} \u8BFB\u53D6\u6570\u636E`));
      return true;
    } catch (error) {
      console.error("Open Obsidian Manage: failed to reload workspace data", error);
      new Notice(this.t(error.message || "\u8BFB\u53D6\u6570\u636E\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u6570\u636E\u6587\u4EF6\u5939\u4E2D\u7684 JSON \u4EE3\u7801\u5757"));
      return false;
    }
  }
  async setDataFolder(value) {
    const folder = normalizePath(String(value || "").trim() || DEFAULT_DATA_FOLDER).replace(/^\/+|\/+$/g, "");
    if (!folder) throw new Error("\u6570\u636E\u6587\u4EF6\u5939\u4E0D\u80FD\u4E3A\u7A7A");
    this.settings.dataFolder = folder;
    await this.writeAllDatabases();
    await this.savePluginSettings({ refresh: false });
    this.refreshViews();
    new Notice(this.t(`\u6570\u636E\u5DF2\u590D\u5236\u5230 ${folder}\uFF0C\u5E76\u8BBE\u4E3A\u65B0\u7684\u4E3B\u6570\u636E\u6587\u4EF6\u5939`));
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
    const index = this.data.projects.findIndex((item) => item.id === project.id);
    if (index >= 0) this.data.projects[index] = project;
    else this.data.projects.unshift(project);
    await this.persist(index >= 0 ? "\u9879\u76EE\u5DF2\u66F4\u65B0" : "\u9879\u76EE\u5DF2\u521B\u5EFA");
  }
  async upsertAction(action) {
    const index = this.data.actions.findIndex((item) => item.id === action.id);
    if (index >= 0) this.data.actions[index] = action;
    else this.data.actions.unshift(action);
    await this.persist(index >= 0 ? "\u884C\u52A8\u5DF2\u66F4\u65B0" : "\u884C\u52A8\u5DF2\u521B\u5EFA");
  }
  async upsertIdea(idea) {
    const index = this.data.ideas.findIndex((item) => item.id === idea.id);
    if (index >= 0) this.data.ideas[index] = idea;
    else this.data.ideas.unshift(idea);
    await this.persist(index >= 0 ? "\u60F3\u6CD5\u5DF2\u66F4\u65B0" : "\u60F3\u6CD5\u5DF2\u8BB0\u5F55");
  }
  async deleteProject(id) {
    this.data.projects = this.data.projects.filter((item) => item.id !== id);
    this.data.actions = this.data.actions.map(
      (action) => action.projectId === id ? { ...action, projectId: "" } : action
    );
    await this.persist("\u9879\u76EE\u5DF2\u5220\u9664\uFF0C\u5173\u8054\u884C\u52A8\u5DF2\u4FDD\u7559");
  }
  async deleteAction(id) {
    this.data.actions = this.data.actions.filter((item) => item.id !== id);
    await this.persist("\u884C\u52A8\u5DF2\u5220\u9664");
  }
  async deleteIdea(id) {
    this.data.ideas = this.data.ideas.filter((item) => item.id !== id);
    await this.persist("\u60F3\u6CD5\u5DF2\u5220\u9664");
  }
  async toggleAction(id) {
    const action = this.data.actions.find((item) => item.id === id);
    if (!action) return;
    action.status = action.status === "done" ? "todo" : "done";
    action.updatedAt = today();
    await this.persist(action.status === "done" ? "\u884C\u52A8\u5DF2\u5B8C\u6210" : "\u884C\u52A8\u5DF2\u91CD\u65B0\u6253\u5F00");
  }
  async promoteIdea(id) {
    const idea = this.data.ideas.find((item) => item.id === id);
    if (!idea || idea.status === "promoted") return;
    const project = {
      id: uid("project"),
      title: idea.title,
      outcome: idea.problem || idea.value || "",
      owner: "",
      status: "planned",
      priority: idea.priority || "P2",
      deadline: "",
      nextAction: idea.nextExperiment || "",
      createdAt: today(),
      updatedAt: today()
    };
    this.data.projects.unshift(project);
    idea.status = "promoted";
    idea.projectId = project.id;
    idea.updatedAt = today();
    await this.persist("\u60F3\u6CD5\u5DF2\u63D0\u5347\u4E3A\u9879\u76EE");
  }
  getFinanceSummary(records = this.data.finance.records) {
    const summary = { currentAccount: 0, creditCard: 0, expense: 0, income: 0, loanOut: 0 };
    for (const record of records) {
      const amount = Number(record.amount) || 0;
      if (record.type === "income") {
        summary.currentAccount += amount;
        summary.income += amount;
      } else if (record.type === "expense") {
        summary.currentAccount -= amount;
        summary.expense += amount;
      } else if (record.type === "credit_expense") {
        summary.creditCard += amount;
        summary.expense += amount;
      } else if (record.type === "repay_credit") {
        summary.currentAccount -= amount;
        summary.creditCard -= amount;
      } else if (record.type === "lend_out") {
        summary.currentAccount -= amount;
        summary.loanOut += amount;
      } else if (record.type === "collect_loan") {
        summary.currentAccount += amount;
        summary.loanOut -= amount;
      } else if (record.type === "account_adjust") {
        summary.currentAccount += amount;
      }
    }
    return summary;
  }
  getMonthFinanceSummary() {
    const month = today().slice(0, 7);
    return this.getFinanceSummary(this.data.finance.records.filter((record) => String(record.date || "").startsWith(month)));
  }
  getExpectedExpense() {
    return Number(this.data.finance.expectedExpense || 0) + this.data.finance.fixedExpenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }
  getExpectedIncome() {
    return this.data.finance.expectedIncomes.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }
  async addFinanceRecord(record) {
    this.data.finance.records.unshift(record);
    await this.persist("\u8D44\u91D1\u8BB0\u5F55\u5DF2\u4FDD\u5B58");
  }
  async deleteFinanceRecord(id) {
    this.data.finance.records = this.data.finance.records.filter((item) => item.id !== id);
    await this.persist("\u8D44\u91D1\u8BB0\u5F55\u5DF2\u5220\u9664");
  }
  async addFixedExpense(item) {
    this.data.finance.fixedExpenses.unshift(item);
    await this.persist("\u56FA\u5B9A\u652F\u51FA\u5DF2\u4FDD\u5B58");
  }
  async deleteFixedExpense(id) {
    this.data.finance.fixedExpenses = this.data.finance.fixedExpenses.filter((item) => item.id !== id);
    await this.persist("\u56FA\u5B9A\u652F\u51FA\u5DF2\u5220\u9664");
  }
  async addExpectedIncome(item) {
    this.data.finance.expectedIncomes.unshift(item);
    await this.persist("\u9884\u8BA1\u6536\u5165\u5DF2\u4FDD\u5B58");
  }
  async deleteExpectedIncome(id) {
    this.data.finance.expectedIncomes = this.data.finance.expectedIncomes.filter((item) => item.id !== id);
    await this.persist("\u9884\u8BA1\u6536\u5165\u5DF2\u5220\u9664");
  }
};
var ManageSettingTab = class extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.addClass("oom-native-settings");
    containerEl.createEl("h2", { text: "Open Obsidian Manage" });
    containerEl.createEl("p", {
      text: "\u9879\u76EE\u3001\u8D44\u91D1\u3001\u56FE\u7247\u6574\u7406\u548C\u601D\u7EF4\u5BFC\u56FE\u7EDF\u4E00\u7531\u4E00\u4E2A\u63D2\u4EF6\u7BA1\u7406\u3002",
      cls: "setting-item-description"
    });
    containerEl.createEl("h3", { text: "\u754C\u9762\u4E0E\u6570\u636E" });
    new Setting(containerEl).setName("\u754C\u9762\u8BED\u8A00").setDesc("\u5207\u6362\u7BA1\u7406\u754C\u9762\u7684\u663E\u793A\u8BED\u8A00\u3002").addDropdown((dropdown) => dropdown.addOption("zh", "\u4E2D\u6587\uFF08\u7B80\u4F53\uFF09").addOption("en", "English").setValue(this.plugin.settings.language).onChange((value) => this.plugin.setLanguage(value)));
    let nextFolder = this.plugin.getDataFolder();
    new Setting(containerEl).setName("\u6570\u636E\u6587\u4EF6\u5939").setDesc("\u5305\u542B management.md\u3001planning.md \u548C finance.md\u3002\u4FEE\u6539\u65F6\u4F1A\u628A\u5F53\u524D\u6570\u636E\u590D\u5236\u5230\u65B0\u6587\u4EF6\u5939\uFF0C\u4E0D\u5220\u9664\u65E7\u76EE\u5F55\u3002").addText((text) => text.setPlaceholder(DEFAULT_DATA_FOLDER).setValue(nextFolder).onChange((value) => {
      nextFolder = value;
    })).addButton((button) => button.setButtonText("\u4FDD\u5B58\u5E76\u8FC1\u79FB").setCta().onClick(async () => {
      try {
        await this.plugin.setDataFolder(nextFolder);
        this.display();
      } catch (error) {
        console.error(error);
        new Notice(this.plugin.t(error.message || "\u6570\u636E\u6587\u4EF6\u5939\u8BBE\u7F6E\u5931\u8D25"));
      }
    }));
    containerEl.createEl("h3", { text: "\u56FE\u7247\u4E0E\u9644\u4EF6" });
    new Setting(containerEl).setName("\u542F\u7528\u81EA\u52A8\u56FE\u7247\u91CD\u547D\u540D").setDesc("\u65B0\u5EFA\u6216\u7C98\u8D34 PNG\u3001JPG\u3001JPEG \u65F6\uFF0C\u6309\u5F53\u524D\u7B14\u8BB0\u540D\u548C\u516D\u4F4D\u5E8F\u53F7\u81EA\u52A8\u6574\u7406\u3002").addToggle((toggle) => toggle.setValue(this.plugin.settings.imageRename.enabled).onChange(async (value) => {
      this.plugin.settings.imageRename.enabled = value;
      await this.plugin.savePluginSettings();
    }));
    let imageFolder = this.plugin.settings.imageRename.targetFolder;
    new Setting(containerEl).setName("\u56FE\u7247\u76EE\u6807\u6587\u4EF6\u5939").setDesc("\u9ED8\u8BA4\u4FDD\u5B58\u5230 Archive/img\uFF1B\u53EF\u586B\u5199\u5176\u4ED6\u5E93\u5185\u76EE\u5F55\u3002").addText((text) => text.setPlaceholder("Archive/img").setValue(imageFolder).onChange((value) => {
      imageFolder = value;
    })).addButton((button) => button.setButtonText("\u4FDD\u5B58").onClick(async () => {
      this.plugin.settings.imageRename.targetFolder = imageFolder;
      await this.plugin.savePluginSettings();
    }));
    new Setting(containerEl).setName("Canvas \u56FE\u7247\u6587\u4EF6\u540D").setDesc("\u63A7\u5236 Canvas \u56FE\u7247\u8282\u70B9\u6587\u4EF6\u540D\u7684\u663E\u793A\u65B9\u5F0F\u3002").addDropdown((dropdown) => dropdown.addOption("show", "\u59CB\u7EC8\u663E\u793A").addOption("hover", "\u60AC\u505C\u663E\u793A").addOption("hide", "\u9690\u85CF").setValue(this.plugin.settings.imageRename.filenameDisplayMode).onChange(async (value) => {
      this.plugin.settings.imageRename.filenameDisplayMode = value;
      await this.plugin.savePluginSettings({ refresh: false });
    }));
    new Setting(containerEl).setName("\u5728\u6587\u4EF6\u5217\u8868\u9690\u85CF PNG").setDesc("\u53EA\u5728\u754C\u9762\u4E0A\u9690\u85CF\uFF0C\u4E0D\u4F1A\u5220\u9664\u6587\u4EF6\u3002").addToggle((toggle) => toggle.setValue(this.plugin.settings.imageRename.hidePngInFileList).onChange(async (value) => {
      this.plugin.settings.imageRename.hidePngInFileList = value;
      await this.plugin.savePluginSettings({ refresh: false });
    }));
    new Setting(containerEl).setName("\u6574\u7406\u5F53\u524D\u7B14\u8BB0\u56FE\u7247").setDesc("\u68C0\u67E5 Markdown \u6216 Canvas \u5F15\u7528\uFF0C\u5E76\u6309\u51FA\u73B0\u987A\u5E8F\u7EDF\u4E00\u91CD\u547D\u540D\u3002").addButton((button) => button.setButtonText("\u68C0\u67E5\u5E76\u6574\u7406").setCta().onClick(() => this.plugin.imageRename.renameImagesInActiveNote()));
    new Setting(containerEl).setName("\u521B\u5EFA\u9ED8\u8BA4 Files.base").setDesc("\u521B\u5EFA\u6392\u9664 PNG \u548C Base \u6587\u4EF6\u7684 Obsidian Bases \u9ED8\u8BA4\u89C6\u56FE\u3002").addButton((button) => button.setButtonText("\u521B\u5EFA Base").onClick(() => this.plugin.imageRename.createDefaultBase()));
    containerEl.createEl("h3", { text: "\u601D\u7EF4\u5BFC\u56FE" });
    new Setting(containerEl).setName("\u542F\u7528\u601D\u7EF4\u5BFC\u56FE").setDesc("\u5C06 Markdown \u6807\u9898\u548C\u7F29\u8FDB\u5217\u8868\u6E32\u67D3\u4E3A\u53EF\u4EA4\u4E92 SVG \u601D\u7EF4\u5BFC\u56FE\u3002").addToggle((toggle) => toggle.setValue(this.plugin.settings.mindmap.enabled).onChange(async (value) => {
      this.plugin.settings.mindmap.enabled = value;
      await this.plugin.savePluginSettings();
    }));
    new Setting(containerEl).setName("\u5BFC\u56FE\u65B9\u5411").setDesc("\u9009\u62E9\u4ECE\u5DE6\u5411\u53F3\u6216\u4ECE\u4E0A\u5411\u4E0B\u5C55\u5F00\u3002").addDropdown((dropdown) => dropdown.addOption("horizontal", "\u6A2A\u5411").addOption("vertical", "\u7EB5\u5411").setValue(this.plugin.settings.mindmap.direction).onChange(async (value) => {
      this.plugin.settings.mindmap.direction = value;
      await this.plugin.savePluginSettings({ refresh: false });
    }));
    new Setting(containerEl).setName("\u521D\u59CB\u5C55\u5F00\u5C42\u7EA7").setDesc("-1 \u8868\u793A\u5168\u90E8\u5C55\u5F00\u3002").addDropdown((dropdown) => {
      dropdown.addOption("-1", "\u5168\u90E8");
      for (let level = 1; level <= 8; level += 1) dropdown.addOption(String(level), String(level));
      dropdown.setValue(String(this.plugin.settings.mindmap.initialExpandLevel)).onChange(async (value) => {
        this.plugin.settings.mindmap.initialExpandLevel = Number(value);
        await this.plugin.savePluginSettings({ refresh: false });
      });
    });
    new Setting(containerEl).setName("\u663E\u793A\u5BFC\u56FE\u5DE5\u5177\u680F").setDesc("\u663E\u793A\u9002\u914D\u3001\u5C55\u5F00\u3001\u6298\u53E0\u548C\u7F29\u653E\u6309\u94AE\u3002").addToggle((toggle) => toggle.setValue(this.plugin.settings.mindmap.showToolbar).onChange(async (value) => {
      this.plugin.settings.mindmap.showToolbar = value;
      await this.plugin.savePluginSettings({ refresh: false });
    }));
    new Setting(containerEl).setName("\u6253\u5F00\u601D\u7EF4\u5BFC\u56FE").setDesc("\u8DDF\u968F\u5F53\u524D Markdown \u6587\u4EF6\uFF0C\u6216\u5C06\u5F53\u524D\u6587\u4EF6\u56FA\u5B9A\u5230\u4E00\u4E2A\u5BFC\u56FE\u9875\u7B7E\u3002").addButton((button) => button.setButtonText("\u8DDF\u968F\u5F53\u524D\u6587\u4EF6").onClick(() => this.plugin.mindmap.open(false))).addButton((button) => button.setButtonText("\u56FA\u5B9A\u5F53\u524D\u6587\u4EF6").setCta().onClick(() => this.plugin.mindmap.open(true)));
    new Setting(containerEl).setName("\u601D\u7EF4\u5BFC\u56FE\u5FEB\u6377\u952E").setDesc("\u9ED8\u8BA4 Ctrl/Cmd + Shift + M\uFF1B\u53EF\u5728 Obsidian \u7684\u201C\u5FEB\u6377\u952E\u201D\u8BBE\u7F6E\u4E2D\u4FEE\u6539\u3002");
    this.plugin.localizeElement(containerEl);
  }
};
var LegacyManageView = class extends ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.section = "overview";
    this.projectFilter = "all";
    this.actionFilter = "open";
  }
  getViewType() {
    return VIEW_TYPE_MANAGE;
  }
  getDisplayText() {
    return "Open Obsidian Manage";
  }
  getIcon() {
    return "panel-top-open";
  }
  async onOpen() {
    this.render();
  }
  render() {
    const root = this.containerEl.children[1];
    root.empty();
    root.addClass("oom-view");
    const shell = root.createDiv({ cls: "oom-shell" });
    this.renderSidebar(shell);
    const workspace = shell.createDiv({ cls: "oom-workspace" });
    this.renderHeader(workspace);
    const content = workspace.createDiv({ cls: "oom-content" });
    if (this.section === "overview") this.renderOverview(content);
    if (this.section === "projects") this.renderProjects(content);
    if (this.section === "actions") this.renderActions(content);
    if (this.section === "ideas") this.renderIdeas(content);
  }
  renderSidebar(shell) {
    const sidebar = shell.createEl("aside", { cls: "oom-sidebar" });
    const brand = sidebar.createDiv({ cls: "oom-brand" });
    const mark = brand.createDiv({ cls: "oom-brand-mark" });
    setIcon(mark, "orbit");
    const brandCopy = brand.createDiv();
    brandCopy.createDiv({ text: "Open Manage", cls: "oom-brand-title" });
    brandCopy.createDiv({ text: "\u6E05\u6670\u5730\u63A8\u8FDB\u4E00\u4EF6\u4E8B", cls: "oom-brand-subtitle" });
    const nav = sidebar.createEl("nav", { cls: "oom-nav" });
    const items = [
      ["overview", "layout-dashboard", "\u603B\u89C8"],
      ["projects", "folder-kanban", "\u9879\u76EE"],
      ["actions", "list-checks", "\u884C\u52A8"],
      ["ideas", "lightbulb", "\u60F3\u6CD5"]
    ];
    for (const [id, icon, label] of items) {
      const button = nav.createEl("button", {
        cls: `oom-nav-item ${this.section === id ? "is-active" : ""}`,
        attr: { type: "button" }
      });
      const iconEl = button.createSpan({ cls: "oom-nav-icon" });
      setIcon(iconEl, icon);
      button.createSpan({ text: label });
      button.addEventListener("click", () => {
        this.section = id;
        this.render();
      });
    }
    const foot = sidebar.createDiv({ cls: "oom-sidebar-foot" });
    const shield = foot.createSpan();
    setIcon(shield, "shield-check");
    foot.createSpan({ text: "\u7EAF\u672C\u5730\u63D2\u4EF6\u6570\u636E\uFF0C\u4E0D\u751F\u6210\u7B14\u8BB0\u6587\u4EF6" });
  }
  renderHeader(workspace) {
    const header = workspace.createEl("header", { cls: "oom-header" });
    const copy = header.createDiv();
    const titles = {
      overview: ["\u7BA1\u7406\u603B\u89C8", "\u805A\u7126\u7ED3\u679C\u3001\u963B\u585E\u548C\u9A6C\u4E0A\u8981\u505A\u7684\u4E0B\u4E00\u6B65"],
      projects: ["\u9879\u76EE", "\u7528\u660E\u786E\u7684\u7ED3\u679C\u548C\u5B8C\u6210\u6807\u51C6\u7BA1\u7406\u6295\u5165"],
      actions: ["\u884C\u52A8", "\u628A\u4E0B\u4E00\u6B65\u62C6\u6210\u53EF\u4EE5\u771F\u6B63\u5B8C\u6210\u7684\u5C0F\u4EFB\u52A1"],
      ideas: ["\u60F3\u6CD5", "\u5148\u9A8C\u8BC1\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u6295\u5165\u6210\u4E3A\u9879\u76EE"]
    };
    copy.createEl("h1", { text: titles[this.section][0] });
    copy.createEl("p", { text: titles[this.section][1] });
    const actions = header.createDiv({ cls: "oom-header-actions" });
    iconButton(
      actions,
      "download",
      this.plugin.t("\u8BFB\u53D6\u6570\u636E"),
      "",
      () => this.plugin.reloadDataFromFiles()
    );
    iconButton(actions, "refresh-cw", "\u5237\u65B0", "", () => this.render());
    const addLabel = this.section === "actions" ? "\u65B0\u5EFA\u884C\u52A8" : this.section === "ideas" ? "\u8BB0\u5F55\u60F3\u6CD5" : "\u65B0\u5EFA\u9879\u76EE";
    const add = textButton(actions, `\uFF0B ${addLabel}`, "oom-primary-button", () => {
      if (this.section === "actions") new ActionModal(this.app, this.plugin, null).open();
      else if (this.section === "ideas") new IdeaModal(this.app, this.plugin, null).open();
      else new ProjectModal(this.app, this.plugin, null).open();
    });
    add.setAttr("aria-label", addLabel);
  }
  renderOverview(content) {
    const projects = this.plugin.data.projects;
    const actions = this.plugin.data.actions;
    const ideas = this.plugin.data.ideas;
    const openActions = actions.filter((item) => item.status !== "done");
    const blocked = projects.filter((item) => item.status === "blocked").length + actions.filter((item) => item.status === "blocked").length;
    const stats = content.createDiv({ cls: "oom-stats" });
    this.statCard(stats, "\u8FDB\u884C\u4E2D\u9879\u76EE", projects.filter((item) => item.status === "active").length, "folder-kanban", "purple");
    this.statCard(stats, "\u5F85\u5B8C\u6210\u884C\u52A8", openActions.length, "list-checks", "blue");
    this.statCard(stats, "\u5F53\u524D\u963B\u585E", blocked, "circle-alert", blocked ? "red" : "green");
    this.statCard(stats, "\u5F85\u8BC4\u4F30\u60F3\u6CD5", ideas.filter((item) => item.status !== "promoted").length, "lightbulb", "amber");
    const grid = content.createDiv({ cls: "oom-overview-grid" });
    const focusPanel = this.panel(grid, "\u672C\u5468\u805A\u7126", "\u6700\u591A\u5C55\u793A 3 \u4E2A\u6700\u91CD\u8981\u884C\u52A8");
    const focus = [...openActions].sort(sortByPriorityAndDue).slice(0, 3);
    if (!focus.length) {
      this.emptyState(focusPanel, "target", "\u8FD8\u6CA1\u6709\u5F85\u6267\u884C\u884C\u52A8", "\u5148\u521B\u5EFA\u4E00\u4E2A\u8DB3\u591F\u5177\u4F53\u7684\u4E0B\u4E00\u6B65\u3002");
    } else {
      const list = focusPanel.createDiv({ cls: "oom-focus-list" });
      for (const action of focus) this.renderFocusItem(list, action);
    }
    const healthPanel = this.panel(grid, "\u9879\u76EE\u5065\u5EB7\u5EA6", "\u68C0\u67E5\u662F\u5426\u62E5\u6709\u6E05\u6670\u4E0B\u4E00\u6B65");
    const activeProjects = projects.filter((item) => ["active", "blocked", "planned"].includes(item.status));
    if (!activeProjects.length) {
      this.emptyState(healthPanel, "folder-plus", "\u8FD8\u6CA1\u6709\u9879\u76EE", "\u4ECE\u4E00\u4E2A\u660E\u786E\u7ED3\u679C\u5F00\u59CB\u5EFA\u7ACB\u9879\u76EE\u3002");
    } else {
      const list = healthPanel.createDiv({ cls: "oom-health-list" });
      for (const project of activeProjects.slice(0, 5)) {
        const row = list.createDiv({ cls: "oom-health-row" });
        const main = row.createDiv({ cls: "oom-health-main" });
        main.createDiv({ text: project.title, cls: "oom-health-title" });
        main.createDiv({
          text: project.nextAction || "\u7F3A\u5C11\u4E0B\u4E00\u6B65",
          cls: `oom-health-next ${project.nextAction ? "" : "is-missing"}`
        });
        row.createSpan({
          text: statusLabel(project.status, PROJECT_STATUSES),
          cls: `oom-badge is-${project.status}`
        });
      }
    }
    const lower = content.createDiv({ cls: "oom-lower-grid" });
    const blockedPanel = this.panel(lower, "\u9700\u8981\u5904\u7406\u7684\u963B\u585E", "\u5148\u89E3\u9664\u963B\u585E\uFF0C\u518D\u589E\u52A0\u4EFB\u52A1");
    const blockers = [
      ...projects.filter((item) => item.status === "blocked").map((item) => ({ ...item, kind: "\u9879\u76EE" })),
      ...actions.filter((item) => item.status === "blocked").map((item) => ({ ...item, kind: "\u884C\u52A8" }))
    ];
    if (!blockers.length) {
      this.emptyState(blockedPanel, "shield-check", "\u5F53\u524D\u6CA1\u6709\u963B\u585E", "\u4FDD\u6301\u4E0B\u4E00\u6B65\u660E\u786E\u5373\u53EF\u3002");
    } else {
      for (const item of blockers.slice(0, 4)) {
        const row = blockedPanel.createDiv({ cls: "oom-blocker-row" });
        row.createSpan({ text: item.kind, cls: "oom-mini-label" });
        row.createSpan({ text: item.title, cls: "oom-blocker-title" });
        row.createSpan({ text: item.blocker || "\u672A\u586B\u5199\u963B\u585E\u539F\u56E0", cls: "oom-blocker-reason" });
      }
    }
    const ideaPanel = this.panel(lower, "\u6700\u8FD1\u60F3\u6CD5", "\u5148\u505A\u6700\u5C0F\u9A8C\u8BC1");
    const recentIdeas = ideas.filter((item) => item.status !== "promoted").slice(0, 4);
    if (!recentIdeas.length) {
      this.emptyState(ideaPanel, "sparkles", "\u60F3\u6CD5\u6536\u4EF6\u7BB1\u4E3A\u7A7A", "\u968F\u65F6\u8BB0\u5F55\uFF0C\u4F46\u4E0D\u8981\u6025\u7740\u5168\u90E8\u7ACB\u9879\u3002");
    } else {
      for (const idea of recentIdeas) {
        const row = ideaPanel.createDiv({ cls: "oom-idea-row" });
        row.createDiv({ text: idea.title, cls: "oom-idea-row-title" });
        row.createDiv({ text: idea.nextExperiment || "\u8FD8\u6CA1\u6709\u6700\u5C0F\u5B9E\u9A8C", cls: "oom-muted" });
      }
    }
  }
  statCard(parent, label, value, icon, tone) {
    const card = parent.createDiv({ cls: `oom-stat-card is-${tone}` });
    const iconEl = card.createDiv({ cls: "oom-stat-icon" });
    setIcon(iconEl, icon);
    const copy = card.createDiv();
    copy.createDiv({ text: String(value), cls: "oom-stat-value" });
    copy.createDiv({ text: label, cls: "oom-stat-label" });
  }
  panel(parent, title, subtitle) {
    const panel = parent.createEl("section", { cls: "oom-panel" });
    const heading = panel.createDiv({ cls: "oom-panel-heading" });
    heading.createEl("h2", { text: title });
    heading.createSpan({ text: subtitle });
    return panel;
  }
  emptyState(parent, icon, title, text) {
    const box = parent.createDiv({ cls: "oom-empty" });
    const iconEl = box.createDiv({ cls: "oom-empty-icon" });
    setIcon(iconEl, icon);
    box.createDiv({ text: title, cls: "oom-empty-title" });
    box.createDiv({ text, cls: "oom-empty-text" });
  }
  renderFocusItem(parent, action) {
    const row = parent.createDiv({ cls: "oom-focus-item" });
    const toggle = row.createEl("button", {
      cls: "oom-check",
      attr: { type: "button", "aria-label": "\u6807\u8BB0\u5B8C\u6210" }
    });
    setIcon(toggle, "circle");
    toggle.addEventListener("click", () => this.plugin.toggleAction(action.id));
    const copy = row.createDiv({ cls: "oom-focus-copy" });
    copy.createDiv({ text: action.title, cls: "oom-focus-title" });
    const project = this.plugin.data.projects.find((item) => item.id === action.projectId);
    copy.createDiv({ text: project?.title || "\u72EC\u7ACB\u884C\u52A8", cls: "oom-muted" });
    const meta = row.createDiv({ cls: "oom-focus-meta" });
    meta.createSpan({ text: action.priority, cls: `oom-priority is-${action.priority.toLowerCase()}` });
    meta.createSpan({
      text: dueLabel(action.deadline),
      cls: isOverdue(action.deadline, action.status) ? "is-overdue" : ""
    });
  }
  renderProjects(content) {
    this.renderFilterBar(content, [
      ["all", "\u5168\u90E8"],
      ["active", "\u8FDB\u884C\u4E2D"],
      ["planned", "\u5F85\u5F00\u59CB"],
      ["blocked", "\u963B\u585E"],
      ["done", "\u5DF2\u5B8C\u6210"]
    ], this.projectFilter, (value) => {
      this.projectFilter = value;
      this.render();
    });
    const projects = this.plugin.data.projects.filter(
      (project) => this.projectFilter === "all" || project.status === this.projectFilter
    );
    if (!projects.length) {
      this.emptyState(content, "folder-plus", "\u8FD9\u4E2A\u89C6\u56FE\u8FD8\u6CA1\u6709\u9879\u76EE", "\u65B0\u5EFA\u9879\u76EE\uFF0C\u5199\u6E05\u7ED3\u679C\u3001\u8D1F\u8D23\u4EBA\u548C\u4E0B\u4E00\u6B65\u3002");
      return;
    }
    const grid = content.createDiv({ cls: "oom-project-grid" });
    for (const project of projects) {
      const card = grid.createEl("article", { cls: `oom-project-card is-${project.status}` });
      const top = card.createDiv({ cls: "oom-card-top" });
      const titleWrap = top.createDiv();
      titleWrap.createSpan({ text: project.priority, cls: `oom-priority is-${project.priority.toLowerCase()}` });
      titleWrap.createEl("h2", { text: project.title });
      top.createSpan({ text: statusLabel(project.status, PROJECT_STATUSES), cls: `oom-badge is-${project.status}` });
      card.createEl("p", {
        text: project.outcome || "\u5C1A\u672A\u586B\u5199\u76EE\u6807\u7ED3\u679C",
        cls: `oom-project-outcome ${project.outcome ? "" : "is-missing"}`
      });
      const projectActions = this.plugin.data.actions.filter((item) => item.projectId === project.id);
      const done = projectActions.filter((item) => item.status === "done").length;
      const progress = projectActions.length ? Math.round(done / projectActions.length * 100) : 0;
      const progressRow = card.createDiv({ cls: "oom-progress-row" });
      progressRow.createSpan({ text: `${done}/${projectActions.length} \u4E2A\u884C\u52A8` });
      progressRow.createSpan({ text: `${progress}%` });
      const track = card.createDiv({ cls: "oom-progress-track" });
      track.createDiv({ cls: "oom-progress-fill", attr: { style: `width:${progress}%` } });
      const facts = card.createDiv({ cls: "oom-project-facts" });
      this.fact(facts, "user-round", project.owner || "\u672A\u6307\u5B9A\u8D1F\u8D23\u4EBA");
      this.fact(facts, "calendar-days", dueLabel(project.deadline), isOverdue(project.deadline, project.status));
      const next = card.createDiv({ cls: "oom-next-action" });
      next.createSpan({ text: "\u4E0B\u4E00\u6B65" });
      next.createDiv({ text: project.nextAction || "\u5C1A\u672A\u586B\u5199\u4E0B\u4E00\u6B65", cls: project.nextAction ? "" : "is-missing" });
      if (project.status === "blocked") {
        const blocker = card.createDiv({ cls: "oom-blocker-callout" });
        const icon = blocker.createSpan();
        setIcon(icon, "circle-alert");
        blocker.createSpan({ text: project.blocker || "\u8BF7\u8865\u5145\u963B\u585E\u539F\u56E0" });
      }
      const buttons = card.createDiv({ cls: "oom-card-actions" });
      textButton(buttons, "\u7F16\u8F91", "oom-secondary-button", () => new ProjectModal(this.app, this.plugin, project).open());
      textButton(buttons, "\u6DFB\u52A0\u884C\u52A8", "oom-secondary-button", () => new ActionModal(this.app, this.plugin, null, project.id).open());
      iconButton(buttons, "trash-2", "\u5220\u9664\u9879\u76EE", "oom-danger-button", () => {
        new ConfirmModal(this.app, "\u5220\u9664\u9879\u76EE\uFF1F", "\u5173\u8054\u884C\u52A8\u4F1A\u88AB\u4FDD\u7559\uFF0C\u4F46\u4E0D\u518D\u5F52\u5C5E\u8BE5\u9879\u76EE\u3002", () => this.plugin.deleteProject(project.id)).open();
      });
    }
  }
  renderActions(content) {
    this.renderFilterBar(content, [
      ["open", "\u672A\u5B8C\u6210"],
      ["doing", "\u8FDB\u884C\u4E2D"],
      ["blocked", "\u963B\u585E"],
      ["done", "\u5DF2\u5B8C\u6210"],
      ["all", "\u5168\u90E8"]
    ], this.actionFilter, (value) => {
      this.actionFilter = value;
      this.render();
    });
    let actions = [...this.plugin.data.actions];
    if (this.actionFilter === "open") actions = actions.filter((item) => item.status !== "done");
    else if (this.actionFilter !== "all") actions = actions.filter((item) => item.status === this.actionFilter);
    actions.sort(sortByPriorityAndDue);
    if (!actions.length) {
      this.emptyState(content, "list-plus", "\u8FD9\u4E2A\u89C6\u56FE\u8FD8\u6CA1\u6709\u884C\u52A8", "\u521B\u5EFA\u4E00\u4E2A\u53EF\u4EE5\u5728\u4E00\u6B21\u4E13\u6CE8\u65F6\u95F4\u5185\u5B8C\u6210\u7684\u52A8\u4F5C\u3002");
      return;
    }
    const table = content.createDiv({ cls: "oom-action-table" });
    const header = table.createDiv({ cls: "oom-action-row oom-action-header" });
    ["\u72B6\u6001", "\u884C\u52A8", "\u9879\u76EE", "\u4F18\u5148\u7EA7", "\u622A\u6B62\u65E5\u671F", ""].forEach((text) => header.createSpan({ text }));
    for (const action of actions) {
      const row = table.createDiv({ cls: `oom-action-row ${action.status === "done" ? "is-done" : ""}` });
      const toggleWrap = row.createDiv();
      const toggle = toggleWrap.createEl("button", {
        cls: "oom-check",
        attr: { type: "button", "aria-label": action.status === "done" ? "\u91CD\u65B0\u6253\u5F00" : "\u6807\u8BB0\u5B8C\u6210" }
      });
      setIcon(toggle, action.status === "done" ? "circle-check-big" : "circle");
      toggle.addEventListener("click", () => this.plugin.toggleAction(action.id));
      const title = row.createDiv({ cls: "oom-action-title-cell" });
      title.createDiv({ text: action.title, cls: "oom-action-title" });
      if (action.note) title.createDiv({ text: action.note, cls: "oom-muted" });
      const project = this.plugin.data.projects.find((item) => item.id === action.projectId);
      row.createSpan({ text: project?.title || "\u72EC\u7ACB\u884C\u52A8", cls: "oom-action-project" });
      row.createSpan({ text: action.priority, cls: `oom-priority is-${action.priority.toLowerCase()}` });
      row.createSpan({
        text: dueLabel(action.deadline),
        cls: isOverdue(action.deadline, action.status) ? "is-overdue" : ""
      });
      const actionsCell = row.createDiv({ cls: "oom-row-actions" });
      iconButton(actionsCell, "pencil", "\u7F16\u8F91", "", () => new ActionModal(this.app, this.plugin, action).open());
      iconButton(actionsCell, "trash-2", "\u5220\u9664", "oom-danger-button", () => {
        new ConfirmModal(this.app, "\u5220\u9664\u884C\u52A8\uFF1F", "\u8FD9\u9879\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002", () => this.plugin.deleteAction(action.id)).open();
      });
    }
  }
  renderIdeas(content) {
    const ideas = this.plugin.data.ideas;
    if (!ideas.length) {
      this.emptyState(content, "lightbulb", "\u60F3\u6CD5\u6536\u4EF6\u7BB1\u4E3A\u7A7A", "\u5148\u8BB0\u5F55\u95EE\u9898\u548C\u6700\u5C0F\u5B9E\u9A8C\uFF0C\u4E0D\u9700\u8981\u9A6C\u4E0A\u7ACB\u9879\u3002");
      return;
    }
    const grid = content.createDiv({ cls: "oom-idea-grid" });
    for (const idea of ideas) {
      const card = grid.createEl("article", { cls: `oom-idea-card ${idea.status === "promoted" ? "is-promoted" : ""}` });
      const top = card.createDiv({ cls: "oom-card-top" });
      const title = top.createDiv();
      title.createSpan({ text: idea.priority, cls: `oom-priority is-${idea.priority.toLowerCase()}` });
      title.createEl("h2", { text: idea.title });
      top.createSpan({
        text: idea.status === "promoted" ? "\u5DF2\u7ACB\u9879" : "\u5F85\u9A8C\u8BC1",
        cls: `oom-badge ${idea.status === "promoted" ? "is-done" : "is-planned"}`
      });
      this.ideaSection(card, "\u8981\u89E3\u51B3\u7684\u95EE\u9898", idea.problem || "\u5C1A\u672A\u586B\u5199");
      this.ideaSection(card, "\u9884\u671F\u4EF7\u503C", idea.value || "\u5C1A\u672A\u586B\u5199");
      this.ideaSection(card, "\u6700\u5C0F\u5B9E\u9A8C", idea.nextExperiment || "\u5C1A\u672A\u586B\u5199");
      const buttons = card.createDiv({ cls: "oom-card-actions" });
      if (idea.status !== "promoted") {
        textButton(buttons, "\u63D0\u5347\u4E3A\u9879\u76EE", "oom-primary-button oom-small-button", () => this.plugin.promoteIdea(idea.id));
      }
      textButton(buttons, "\u7F16\u8F91", "oom-secondary-button", () => new IdeaModal(this.app, this.plugin, idea).open());
      iconButton(buttons, "trash-2", "\u5220\u9664\u60F3\u6CD5", "oom-danger-button", () => {
        new ConfirmModal(this.app, "\u5220\u9664\u60F3\u6CD5\uFF1F", "\u8FD9\u9879\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002", () => this.plugin.deleteIdea(idea.id)).open();
      });
    }
  }
  ideaSection(parent, label, value) {
    const section = parent.createDiv({ cls: "oom-idea-section" });
    section.createDiv({ text: label, cls: "oom-mini-label" });
    section.createDiv({ text: value });
  }
  fact(parent, icon, text, danger) {
    const fact = parent.createDiv({ cls: `oom-fact ${danger ? "is-overdue" : ""}` });
    const iconEl = fact.createSpan();
    setIcon(iconEl, icon);
    fact.createSpan({ text });
  }
  renderFilterBar(parent, items, selected, onSelect) {
    const bar = parent.createDiv({ cls: "oom-filter-bar" });
    for (const [id, label] of items) {
      textButton(bar, label, `oom-filter ${selected === id ? "is-active" : ""}`, () => onSelect(id));
    }
  }
};
var ManageView = class extends LegacyManageView {
  constructor(leaf, plugin) {
    super(leaf, plugin);
    this.primary = "overview";
    this.secondary = {
      projects: "overview",
      planning: "overview",
      finance: "overview"
    };
    this.financeTypeFilter = "all";
  }
  render() {
    const root = this.containerEl.children[1];
    root.empty();
    root.addClass("oom-view");
    const shell = root.createDiv({ cls: "oom-shell oom-multifunction-shell" });
    this.renderPrimaryNavigation(shell);
    const main = shell.createEl("main", { cls: "oom-module-main" });
    const subpages = this.getSubpages();
    if (subpages.length) this.renderSecondaryNavigation(main, subpages);
    this.renderModuleHeader(main);
    const content = main.createDiv({ cls: "oom-content oom-module-content" });
    this.renderActivePage(content);
    this.plugin.localizeElement(root);
  }
  getSubpages() {
    const pages = {
      projects: [
        ["overview", "\u9879\u76EE\u6982\u89C8"],
        ["tasks", "\u4EFB\u52A1"],
        ["issues", "\u95EE\u9898\u4E0E\u963B\u585E"],
        ["materials", "\u9879\u76EE\u8D44\u6599"]
      ],
      planning: [
        ["overview", "\u89C4\u5212\u6982\u89C8"],
        ["goals", "\u76EE\u6807"],
        ["timeline", "\u65F6\u95F4\u7EBF"],
        ["ideas", "\u60F3\u6CD5"]
      ],
      finance: [
        ["overview", "\u6982\u89C8"],
        ["records", "\u6700\u8FD1\u8BB0\u5F55"],
        ["fixed", "\u56FA\u5B9A\u652F\u51FA"],
        ["income", "\u9884\u8BA1\u6536\u5165"],
        ["accounts", "\u8D26\u6237\u7BA1\u7406"]
      ]
    };
    return pages[this.primary] || [];
  }
  activePage() {
    return this.secondary[this.primary] || "overview";
  }
  renderPrimaryNavigation(shell) {
    const sidebar = shell.createEl("aside", { cls: "oom-sidebar oom-primary-sidebar" });
    const brand = sidebar.createDiv({ cls: "oom-brand" });
    const mark = brand.createDiv({ cls: "oom-brand-mark" });
    setIcon(mark, "orbit");
    const copy = brand.createDiv({ cls: "oom-brand-copy" });
    copy.createDiv({ text: "Open Manage", cls: "oom-brand-title" });
    sidebar.createDiv({ text: "\u5DE5\u4F5C\u7A7A\u95F4", cls: "oom-nav-caption" });
    const nav = sidebar.createEl("nav", { cls: "oom-nav oom-primary-nav" });
    const modules = [
      ["overview", "layout-dashboard", "\u603B\u89C8"],
      ["projects", "folder-kanban", "\u9879\u76EE\u8FDB\u5EA6"],
      ["planning", "route", "\u672A\u6765\u89C4\u5212"],
      ["finance", "wallet-cards", "\u4E2A\u4EBA\u8D44\u91D1"],
      ["settings", "settings-2", "\u8BBE\u7F6E"]
    ];
    for (const [id, icon, label] of modules) {
      const button = nav.createEl("button", {
        cls: `oom-nav-item oom-primary-nav-item ${this.primary === id ? "is-active" : ""}`,
        attr: { type: "button", "aria-label": label, title: label }
      });
      if (this.primary === id) button.setAttr("aria-current", "page");
      const iconEl = button.createSpan({ cls: "oom-nav-icon" });
      setIcon(iconEl, icon);
      button.createSpan({ text: label, cls: "oom-nav-label" });
      button.addEventListener("click", () => {
        this.primary = id;
        this.render();
      });
    }
  }
  renderSecondaryNavigation(main, pages) {
    const wrap = main.createDiv({ cls: "oom-secondary-wrap" });
    const nav = wrap.createEl("nav", { cls: "oom-secondary-nav", attr: { "aria-label": "\u9875\u9762\u5BFC\u822A" } });
    const active = this.activePage();
    for (const [id, label] of pages) {
      const button = nav.createEl("button", {
        text: label,
        cls: `oom-secondary-item ${active === id ? "is-active" : ""}`,
        attr: { type: "button" }
      });
      if (active === id) button.setAttr("aria-current", "page");
      button.addEventListener("click", () => {
        this.secondary[this.primary] = id;
        this.render();
      });
    }
  }
  getPageMeta() {
    const page = this.activePage();
    const meta = {
      overview: {
        overview: ["\u5168\u5C40\u6982\u89C8", "\u96C6\u4E2D\u67E5\u770B\u9879\u76EE\u3001\u884C\u52A8\u3001\u89C4\u5212\u548C\u8D44\u91D1\u72B6\u6001"]
      },
      projects: {
        overview: ["\u9879\u76EE\u6982\u89C8", "\u67E5\u770B\u9879\u76EE\u72B6\u6001\u3001\u8FDB\u5EA6\u3001\u8D1F\u8D23\u4EBA\u548C\u660E\u786E\u4E0B\u4E00\u6B65"],
        tasks: ["\u4EFB\u52A1", "\u6309\u4F18\u5148\u7EA7\u548C\u622A\u6B62\u65E5\u671F\u63A8\u8FDB\u5177\u4F53\u884C\u52A8"],
        issues: ["\u95EE\u9898\u4E0E\u963B\u585E", "\u96C6\u4E2D\u5904\u7406\u5F71\u54CD\u9879\u76EE\u63A8\u8FDB\u7684\u95EE\u9898"],
        materials: ["\u9879\u76EE\u8D44\u6599", "\u6C47\u603B\u6BCF\u4E2A\u9879\u76EE\u7684\u76EE\u6807\u3001\u7ED3\u679C\u548C\u6267\u884C\u4E0A\u4E0B\u6587"]
      },
      planning: {
        overview: ["\u89C4\u5212\u6982\u89C8", "\u628A\u672A\u6765\u65B9\u5411\u6536\u655B\u4E3A\u53EF\u9A8C\u8BC1\u3001\u53EF\u5B89\u6392\u7684\u8BA1\u5212"],
        goals: ["\u76EE\u6807", "\u4ECE\u9879\u76EE\u7ED3\u679C\u4E2D\u63D0\u53D6\u5F53\u524D\u76EE\u6807"],
        timeline: ["\u65F6\u95F4\u7EBF", "\u6309\u65E5\u671F\u67E5\u770B\u8BA1\u5212\u548C\u5173\u952E\u8282\u70B9"],
        ideas: ["\u60F3\u6CD5", "\u5148\u9A8C\u8BC1\u95EE\u9898\u548C\u4EF7\u503C\uFF0C\u518D\u51B3\u5B9A\u662F\u5426\u7ACB\u9879"]
      },
      finance: {
        overview: ["\u4E2A\u4EBA\u8D44\u91D1\u6982\u89C8", "\u67E5\u770B\u8D26\u6237\u3001\u6536\u652F\u3001\u56FA\u5B9A\u652F\u51FA\u548C\u9884\u8BA1\u6536\u5165"],
        records: ["\u6700\u8FD1\u8BB0\u5F55", "\u7B5B\u9009\u548C\u67E5\u770B\u5168\u90E8\u8D44\u91D1\u6D41\u6C34"],
        fixed: ["\u56FA\u5B9A\u652F\u51FA", "\u7BA1\u7406\u672A\u6765\u5DF2\u786E\u5B9A\u7684\u56FA\u5B9A\u652F\u51FA"],
        income: ["\u9884\u8BA1\u6536\u5165", "\u7BA1\u7406\u672A\u6765\u5DF2\u786E\u5B9A\u4F46\u5C1A\u672A\u5230\u8D26\u7684\u6536\u5165"],
        accounts: ["\u8D26\u6237\u7BA1\u7406", "\u67E5\u770B\u8D26\u6237\u4F59\u989D\u3001\u4FE1\u7528\u5361\u548C\u501F\u51FA\u8D44\u91D1"]
      },
      settings: {
        overview: ["\u8BBE\u7F6E", "\u67E5\u770B\u63D2\u4EF6\u6570\u636E\u4E0E\u754C\u9762\u4FE1\u606F"]
      }
    };
    return meta[this.primary]?.[page] || ["\u7BA1\u7406\u4E2D\u67A2", ""];
  }
  renderModuleHeader(main) {
    const [title, subtitle] = this.getPageMeta();
    const header = main.createEl("header", { cls: "oom-header oom-module-header" });
    const copy = header.createDiv({ cls: "oom-header-copy" });
    const moduleLabels = {
      overview: "\u5DE5\u4F5C\u53F0",
      projects: "\u9879\u76EE\u8FDB\u5EA6",
      planning: "\u672A\u6765\u89C4\u5212",
      finance: "\u4E2A\u4EBA\u8D44\u91D1",
      settings: "\u7CFB\u7EDF"
    };
    copy.createDiv({ text: moduleLabels[this.primary], cls: "oom-page-eyebrow" });
    copy.createEl("h1", { text: title });
    copy.createEl("p", { text: subtitle });
    const actions = header.createDiv({ cls: "oom-header-actions" });
    iconButton(
      actions,
      "download",
      this.plugin.t("\u8BFB\u53D6\u6570\u636E"),
      "",
      () => this.plugin.reloadDataFromFiles()
    );
    iconButton(actions, "refresh-cw", "\u5237\u65B0", "", () => this.render());
    const page = this.activePage();
    if (this.primary === "finance") {
      if (page === "fixed") {
        textButton(
          actions,
          "\u8BBE\u7F6E\u9884\u8BA1\u652F\u51FA",
          "oom-secondary-button",
          () => new ExpectedExpenseModal(this.app, this.plugin).open()
        );
        textButton(
          actions,
          "\uFF0B \u6DFB\u52A0\u56FA\u5B9A\u652F\u51FA",
          "oom-primary-button",
          () => new FinanceItemModal(this.app, this.plugin, "fixed").open()
        );
      } else if (page === "income") {
        textButton(
          actions,
          "\uFF0B \u6DFB\u52A0\u9884\u8BA1\u6536\u5165",
          "oom-primary-button",
          () => new FinanceItemModal(this.app, this.plugin, "income").open()
        );
      } else {
        textButton(
          actions,
          "\uFF0B \u8BB0\u4E00\u7B14",
          "oom-primary-button",
          () => new FinanceRecordModal(this.app, this.plugin).open()
        );
      }
    } else if (this.primary === "projects") {
      if (page === "tasks") {
        textButton(
          actions,
          "\uFF0B \u65B0\u5EFA\u4EFB\u52A1",
          "oom-primary-button",
          () => new ActionModal(this.app, this.plugin, null).open()
        );
      } else {
        textButton(
          actions,
          "\uFF0B \u65B0\u5EFA\u9879\u76EE",
          "oom-primary-button",
          () => new ProjectModal(this.app, this.plugin, null).open()
        );
      }
    } else if (this.primary === "planning") {
      textButton(
        actions,
        "\uFF0B \u8BB0\u5F55\u60F3\u6CD5",
        "oom-primary-button",
        () => new IdeaModal(this.app, this.plugin, null).open()
      );
    } else if (this.primary === "overview") {
      textButton(
        actions,
        "\uFF0B \u65B0\u5EFA\u9879\u76EE",
        "oom-primary-button",
        () => new ProjectModal(this.app, this.plugin, null).open()
      );
    }
  }
  renderActivePage(content) {
    const page = this.activePage();
    if (this.primary === "overview") {
      this.renderExecutiveOverview(content);
      return;
    }
    if (this.primary === "projects") {
      if (page === "overview") super.renderProjects(content);
      if (page === "tasks") super.renderActions(content);
      if (page === "issues") this.renderIssues(content);
      if (page === "materials") this.renderProjectMaterials(content);
      return;
    }
    if (this.primary === "planning") {
      if (page === "overview") this.renderPlanningOverview(content);
      if (page === "goals") this.renderGoals(content);
      if (page === "timeline") this.renderTimeline(content);
      if (page === "ideas") super.renderIdeas(content);
      return;
    }
    if (this.primary === "finance") {
      if (page === "overview") this.renderFinanceOverview(content);
      if (page === "records") this.renderFinanceRecords(content);
      if (page === "fixed") this.renderFixedExpenses(content);
      if (page === "income") this.renderExpectedIncomes(content);
      if (page === "accounts") this.renderAccountManagement(content);
      return;
    }
    this.renderSettings(content);
  }
  renderExecutiveOverview(content) {
    const projects = this.plugin.data.projects;
    const actions = this.plugin.data.actions;
    const ideas = this.plugin.data.ideas;
    const openActions = actions.filter((item) => item.status !== "done").sort(sortByPriorityAndDue);
    const primaryAction = openActions[0];
    const primaryProject = primaryAction ? projects.find((item) => item.id === primaryAction.projectId) : null;
    const hero = content.createEl("section", { cls: "oom-command-hero" });
    const focus = hero.createDiv({ cls: "oom-command-focus" });
    focus.createDiv({ text: "\u5F53\u524D\u6700\u91CD\u8981\u7684\u4E00\u6B65", cls: "oom-command-kicker" });
    focus.createEl("h2", { text: primaryAction?.title || "\u5148\u521B\u5EFA\u4E00\u4E2A\u6E05\u6670\u3001\u53EF\u4EE5\u7ACB\u5373\u6267\u884C\u7684\u884C\u52A8" });
    focus.createDiv({
      text: primaryProject?.title || (primaryAction ? "\u72EC\u7ACB\u884C\u52A8" : "\u7BA1\u7406\u4ECE\u660E\u786E\u4E0B\u4E00\u6B65\u5F00\u59CB"),
      cls: "oom-command-context"
    });
    const focusMeta = focus.createDiv({ cls: "oom-command-meta" });
    if (primaryAction) {
      focusMeta.createSpan({
        text: primaryAction.priority,
        cls: `oom-priority is-${primaryAction.priority.toLowerCase()}`
      });
      focusMeta.createSpan({ text: dueLabel(primaryAction.deadline) });
      textButton(
        focusMeta,
        "\u6807\u8BB0\u5B8C\u6210",
        "oom-focus-complete",
        () => this.plugin.toggleAction(primaryAction.id)
      );
    } else {
      textButton(
        focusMeta,
        "\u65B0\u5EFA\u884C\u52A8",
        "oom-focus-complete",
        () => new ActionModal(this.app, this.plugin, null).open()
      );
    }
    const summary = hero.createDiv({ cls: "oom-command-summary" });
    [
      ["\u8FDB\u884C\u4E2D\u9879\u76EE", projects.filter((item) => item.status === "active").length, "folder-kanban"],
      ["\u5F85\u5B8C\u6210\u884C\u52A8", openActions.length, "list-checks"],
      ["\u5F53\u524D\u963B\u585E", projects.filter((item) => item.status === "blocked").length + actions.filter((item) => item.status === "blocked").length, "circle-alert"],
      ["\u5F85\u9A8C\u8BC1\u60F3\u6CD5", ideas.filter((item) => item.status !== "promoted").length, "lightbulb"]
    ].forEach(([label, value, icon]) => {
      const item = summary.createDiv({ cls: "oom-command-stat" });
      const iconEl = item.createDiv({ cls: "oom-command-stat-icon" });
      setIcon(iconEl, icon);
      const copy = item.createDiv();
      copy.createDiv({ text: String(value), cls: "oom-command-stat-value" });
      copy.createDiv({ text: label, cls: "oom-command-stat-label" });
    });
    const grid = content.createDiv({ cls: "oom-command-grid" });
    const projectPanel = this.panel(grid, "\u6B63\u5728\u63A8\u8FDB", "\u6D3B\u8DC3\u9879\u76EE\u4E0E\u5B8C\u6210\u8FDB\u5EA6");
    const active = projects.filter((item) => ["active", "blocked"].includes(item.status)).slice(0, 5);
    if (!active.length) {
      this.emptyState(projectPanel, "folder-plus", "\u6CA1\u6709\u6B63\u5728\u63A8\u8FDB\u7684\u9879\u76EE", "\u53EA\u542F\u52A8\u771F\u6B63\u9700\u8981\u6295\u5165\u7684\u9879\u76EE\u3002");
    } else {
      for (const project of active) {
        const projectActions = actions.filter((item) => item.projectId === project.id);
        const done = projectActions.filter((item) => item.status === "done").length;
        const progress = projectActions.length ? Math.round(done / projectActions.length * 100) : 0;
        const row = projectPanel.createDiv({ cls: "oom-command-project" });
        const copy = row.createDiv({ cls: "oom-command-project-copy" });
        copy.createDiv({ text: project.title, cls: "oom-health-title" });
        copy.createDiv({ text: project.nextAction || "\u7F3A\u5C11\u4E0B\u4E00\u6B65", cls: "oom-muted" });
        const progressWrap = row.createDiv({ cls: "oom-command-progress" });
        progressWrap.createSpan({ text: `${progress}%` });
        const track = progressWrap.createDiv({ cls: "oom-progress-track" });
        track.createDiv({ cls: "oom-progress-fill", attr: { style: `width:${progress}%` } });
      }
    }
    const actionPanel = this.panel(grid, "\u63A5\u4E0B\u6765", "\u6309\u4F18\u5148\u7EA7\u4E0E\u622A\u6B62\u65E5\u671F\u6392\u5E8F");
    if (!openActions.length) {
      this.emptyState(actionPanel, "circle-check-big", "\u884C\u52A8\u5DF2\u7ECF\u6E05\u7A7A", "\u4FDD\u6301\u514B\u5236\uFF0C\u4E0D\u8981\u4E3A\u4E86\u5FD9\u788C\u800C\u589E\u52A0\u4EFB\u52A1\u3002");
    } else {
      for (const action of openActions.slice(0, 5)) this.renderFocusItem(actionPanel, action);
    }
    const financePanel = this.panel(grid, "\u8D44\u91D1\u5FEB\u7167", "\u5F53\u524D\u8D26\u6237\u4E0E\u672A\u6765\u9884\u671F");
    const finance = this.plugin.getFinanceSummary();
    const financeRows = [
      ["\u5F53\u524D\u8D26\u6237", finance.currentAccount, "wallet"],
      ["\u9884\u8BA1\u652F\u51FA", this.plugin.getExpectedExpense(), "calendar-minus"],
      ["\u9884\u8BA1\u6536\u5165", this.plugin.getExpectedIncome(), "calendar-plus"]
    ];
    for (const [label, value, icon] of financeRows) {
      const row = financePanel.createDiv({ cls: "oom-command-money-row" });
      const iconEl = row.createDiv({ cls: "oom-command-money-icon" });
      setIcon(iconEl, icon);
      row.createSpan({ text: label });
      const amount = row.createSpan({ cls: "oom-command-money-value" });
      amount.createSpan({ text: formatMoney(value) });
      amount.createSpan({ text: "\u5143", cls: "oom-money-unit" });
    }
    const openFinance = financePanel.createEl("button", {
      text: "\u8FDB\u5165\u4E2A\u4EBA\u8D44\u91D1",
      cls: "oom-panel-action"
    });
    openFinance.addEventListener("click", () => {
      this.primary = "finance";
      this.render();
    });
  }
  renderGlobalFinanceStrip(content) {
    const summary = this.plugin.getFinanceSummary();
    const strip = content.createEl("section", { cls: "oom-global-finance-strip" });
    const heading = strip.createDiv({ cls: "oom-panel-heading" });
    heading.createEl("h2", { text: "\u4E2A\u4EBA\u8D44\u91D1" });
    const link = heading.createEl("button", { text: "\u67E5\u770B\u8D44\u91D1\u6A21\u5757 \u2192", cls: "oom-inline-link" });
    link.addEventListener("click", () => {
      this.primary = "finance";
      this.render();
    });
    const metrics = strip.createDiv({ cls: "oom-compact-metrics" });
    this.moneyMetric(metrics, "\u5F53\u524D\u8D26\u6237", summary.currentAccount, "wallet", "purple");
    this.moneyMetric(metrics, "\u4FE1\u7528\u5361\u5F85\u8FD8", summary.creditCard, "credit-card", "blue");
    this.moneyMetric(metrics, "\u501F\u51FA\u672A\u6536", summary.loanOut, "users-round", "amber");
  }
  renderIssues(content) {
    const issues = [
      ...this.plugin.data.projects.filter((item) => item.status === "blocked").map((item) => ({
        kind: "\u9879\u76EE",
        title: item.title,
        owner: item.owner,
        reason: item.blocker,
        next: item.nextAction
      })),
      ...this.plugin.data.actions.filter((item) => item.status === "blocked").map((item) => ({
        kind: "\u4EFB\u52A1",
        title: item.title,
        owner: "",
        reason: item.blocker,
        next: item.note
      }))
    ];
    if (!issues.length) {
      this.emptyState(content, "shield-check", "\u5F53\u524D\u6CA1\u6709\u963B\u585E", "\u4FDD\u6301\u9879\u76EE\u4E0B\u4E00\u6B65\u660E\u786E\uFF0C\u95EE\u9898\u51FA\u73B0\u65F6\u96C6\u4E2D\u8BB0\u5F55\u3002");
      return;
    }
    const list = content.createDiv({ cls: "oom-issue-list" });
    for (const issue of issues) {
      const row = list.createDiv({ cls: "oom-issue-item" });
      const icon = row.createDiv({ cls: "oom-issue-icon" });
      setIcon(icon, "circle-alert");
      const main = row.createDiv({ cls: "oom-issue-main" });
      const top = main.createDiv({ cls: "oom-issue-title-row" });
      top.createSpan({ text: issue.kind, cls: "oom-mini-label" });
      top.createEl("h2", { text: issue.title });
      main.createDiv({ text: issue.reason || "\u5C1A\u672A\u586B\u5199\u963B\u585E\u539F\u56E0", cls: "oom-issue-reason" });
      main.createDiv({ text: `\u4E0B\u4E00\u6B65\uFF1A${issue.next || "\u9700\u8981\u660E\u786E\u89E3\u9664\u963B\u585E\u7684\u884C\u52A8"}`, cls: "oom-muted" });
      row.createSpan({ text: issue.owner || "\u672A\u6307\u5B9A\u8D1F\u8D23\u4EBA", cls: "oom-issue-owner" });
    }
  }
  renderProjectMaterials(content) {
    const projects = this.plugin.data.projects;
    if (!projects.length) {
      this.emptyState(content, "files", "\u8FD8\u6CA1\u6709\u9879\u76EE\u8D44\u6599", "\u521B\u5EFA\u9879\u76EE\u540E\uFF0C\u76EE\u6807\u7ED3\u679C\u548C\u6267\u884C\u4FE1\u606F\u4F1A\u5728\u8FD9\u91CC\u6C47\u603B\u3002");
      return;
    }
    const table = content.createDiv({ cls: "oom-material-table oom-responsive-table" });
    const header = table.createDiv({ cls: "oom-material-row oom-table-header" });
    ["\u9879\u76EE", "\u76EE\u6807\u7ED3\u679C", "\u8D1F\u8D23\u4EBA", "\u4E0B\u4E00\u6B65", "\u66F4\u65B0\u65F6\u95F4"].forEach((text) => header.createSpan({ text }));
    for (const project of projects) {
      const row = table.createDiv({ cls: "oom-material-row" });
      row.createSpan({ text: project.title, cls: "oom-table-primary", attr: { "data-label": "\u9879\u76EE" } });
      row.createSpan({ text: project.outcome || "\u672A\u586B\u5199", attr: { "data-label": "\u76EE\u6807\u7ED3\u679C" } });
      row.createSpan({ text: project.owner || "\u672A\u6307\u5B9A", attr: { "data-label": "\u8D1F\u8D23\u4EBA" } });
      row.createSpan({ text: project.nextAction || "\u672A\u586B\u5199", attr: { "data-label": "\u4E0B\u4E00\u6B65" } });
      row.createSpan({ text: project.updatedAt || "-", attr: { "data-label": "\u66F4\u65B0\u65F6\u95F4" } });
    }
  }
  renderPlanningOverview(content) {
    const ideas = this.plugin.data.ideas.filter((item) => item.status !== "promoted");
    const planned = this.plugin.data.projects.filter((item) => item.status === "planned");
    const stats = content.createDiv({ cls: "oom-stats oom-planning-stats" });
    this.statCard(stats, "\u5F85\u9A8C\u8BC1\u60F3\u6CD5", ideas.length, "lightbulb", "amber");
    this.statCard(stats, "\u5F85\u5F00\u59CB\u9879\u76EE", planned.length, "calendar-clock", "purple");
    this.statCard(stats, "\u6709\u622A\u6B62\u65E5\u671F", this.plugin.data.projects.filter((item) => item.deadline).length, "calendar-check-2", "blue");
    this.statCard(stats, "\u7F3A\u5C11\u4E0B\u4E00\u6B65", this.plugin.data.projects.filter((item) => !item.nextAction && item.status !== "done").length, "circle-help", "red");
    const grid = content.createDiv({ cls: "oom-overview-grid" });
    const ideaPanel = this.panel(grid, "\u4E0B\u4E00\u6279\u65B9\u5411", "\u6700\u8FD1\u8BB0\u5F55\u7684\u5F85\u9A8C\u8BC1\u60F3\u6CD5");
    if (!ideas.length) this.emptyState(ideaPanel, "sparkles", "\u6682\u65E0\u5F85\u9A8C\u8BC1\u60F3\u6CD5", "\u8BB0\u5F55\u95EE\u9898\uFF0C\u518D\u8BBE\u8BA1\u6700\u5C0F\u5B9E\u9A8C\u3002");
    for (const idea of ideas.slice(0, 5)) {
      const row = ideaPanel.createDiv({ cls: "oom-planning-row" });
      row.createDiv({ text: idea.title, cls: "oom-health-title" });
      row.createDiv({ text: idea.nextExperiment || "\u7F3A\u5C11\u6700\u5C0F\u5B9E\u9A8C", cls: "oom-muted" });
      row.createSpan({ text: idea.priority, cls: `oom-priority is-${idea.priority.toLowerCase()}` });
    }
    const plannedPanel = this.panel(grid, "\u51C6\u5907\u542F\u52A8", "\u5DF2\u7ECF\u8FDB\u5165\u9879\u76EE\u4F46\u5C1A\u672A\u5F00\u59CB");
    if (!planned.length) this.emptyState(plannedPanel, "route", "\u6682\u65E0\u5F85\u5F00\u59CB\u9879\u76EE", "\u4E0D\u8981\u4E00\u6B21\u542F\u52A8\u8FC7\u591A\u9879\u76EE\u3002");
    for (const project of planned.slice(0, 5)) {
      const row = plannedPanel.createDiv({ cls: "oom-planning-row" });
      row.createDiv({ text: project.title, cls: "oom-health-title" });
      row.createDiv({ text: project.nextAction || "\u7F3A\u5C11\u4E0B\u4E00\u6B65", cls: "oom-muted" });
      row.createSpan({ text: dueLabel(project.deadline) });
    }
  }
  renderGoals(content) {
    const goals = this.plugin.data.projects.filter((item) => item.outcome && item.status !== "done");
    if (!goals.length) {
      this.emptyState(content, "target", "\u8FD8\u6CA1\u6709\u660E\u786E\u76EE\u6807", "\u5728\u9879\u76EE\u4E2D\u586B\u5199\u53EF\u9A8C\u8BC1\u7684\u76EE\u6807\u7ED3\u679C\u3002");
      return;
    }
    const list = content.createDiv({ cls: "oom-goal-list" });
    for (const project of goals) {
      const item = list.createEl("article", { cls: "oom-goal-item" });
      const icon = item.createDiv({ cls: "oom-goal-icon" });
      setIcon(icon, "target");
      const main = item.createDiv({ cls: "oom-goal-main" });
      main.createEl("h2", { text: project.outcome });
      main.createDiv({ text: project.title, cls: "oom-muted" });
      item.createSpan({ text: statusLabel(project.status, PROJECT_STATUSES), cls: `oom-badge is-${project.status}` });
    }
  }
  renderTimeline(content) {
    const entries = this.plugin.data.projects.filter((item) => item.deadline).sort((a, b) => a.deadline.localeCompare(b.deadline));
    if (!entries.length) {
      this.emptyState(content, "calendar-range", "\u65F6\u95F4\u7EBF\u4E3A\u7A7A", "\u4E3A\u9700\u8981\u65F6\u95F4\u7EA6\u675F\u7684\u9879\u76EE\u8BBE\u7F6E\u622A\u6B62\u65E5\u671F\u3002");
      return;
    }
    const timeline = content.createDiv({ cls: "oom-timeline" });
    for (const project of entries) {
      const item = timeline.createDiv({ cls: "oom-timeline-item" });
      item.createDiv({ cls: "oom-timeline-dot" });
      const date = item.createDiv({ cls: "oom-timeline-date" });
      date.createSpan({ text: project.deadline });
      date.createSpan({ text: dueLabel(project.deadline), cls: isOverdue(project.deadline, project.status) ? "is-overdue" : "" });
      const body = item.createDiv({ cls: "oom-timeline-body" });
      body.createEl("h2", { text: project.title });
      body.createDiv({ text: project.nextAction || project.outcome || "\u7F3A\u5C11\u4E0B\u4E00\u6B65", cls: "oom-muted" });
      body.createSpan({ text: statusLabel(project.status, PROJECT_STATUSES), cls: `oom-badge is-${project.status}` });
    }
  }
  renderFinanceOverview(content) {
    const summary = this.plugin.getFinanceSummary();
    const month = this.plugin.getMonthFinanceSummary();
    const stats = content.createDiv({ cls: "oom-finance-stats" });
    this.moneyMetric(stats, "\u5F53\u524D\u8D26\u6237", summary.currentAccount, "wallet", "purple");
    this.moneyMetric(stats, "\u4FE1\u7528\u5361\u5F85\u8FD8", summary.creditCard, "credit-card", "red");
    this.moneyMetric(stats, "\u672C\u6708\u652F\u51FA", month.expense, "trending-down", "amber");
    this.moneyMetric(stats, "\u672C\u6708\u6536\u5165", month.income, "trending-up", "green");
    this.moneyMetric(stats, "\u501F\u51FA\u672A\u6536", summary.loanOut, "users-round", "blue");
    const grid = content.createDiv({ cls: "oom-finance-overview-grid" });
    const recordsPanel = this.panel(grid, "\u6700\u8FD1\u8BB0\u5F55", "\u6700\u8FD1 5 \u6761\u8D44\u91D1\u6D41\u6C34");
    this.renderFinanceRecordList(recordsPanel, this.plugin.data.finance.records.slice(0, 5), false);
    const trendPanel = this.panel(grid, "\u8D26\u6237\u8D8B\u52BF", "\u6700\u8FD1 7 \u5929\u8D26\u6237\u53D8\u5316");
    this.renderFinanceTrend(trendPanel);
    const projection = content.createEl("section", { cls: "oom-finance-projection" });
    this.moneyMetric(projection, "\u9884\u8BA1\u652F\u51FA", this.plugin.getExpectedExpense(), "calendar-minus", "amber");
    this.moneyMetric(projection, "\u9884\u8BA1\u6536\u5165", this.plugin.getExpectedIncome(), "calendar-plus", "green");
    this.moneyMetric(projection, "\u9884\u8BA1\u540E\u4F59\u989D", summary.currentAccount - this.plugin.getExpectedExpense() + this.plugin.getExpectedIncome(), "circle-dollar-sign", "purple");
  }
  moneyMetric(parent, label, value, icon, tone) {
    const card = parent.createDiv({ cls: `oom-money-metric is-${tone}` });
    const iconEl = card.createDiv({ cls: "oom-money-icon" });
    setIcon(iconEl, icon);
    const copy = card.createDiv({ cls: "oom-money-copy" });
    copy.createDiv({ text: label, cls: "oom-money-label" });
    const valueEl = copy.createDiv({ cls: "oom-money-value" });
    valueEl.createSpan({ text: formatMoney(value) });
    valueEl.createSpan({ text: "\u5143", cls: "oom-money-unit" });
  }
  renderFinanceRecords(content) {
    const bar = content.createDiv({ cls: "oom-finance-filter-bar" });
    const select = bar.createEl("select", { attr: { "aria-label": "\u8BB0\u5F55\u7C7B\u578B" } });
    select.createEl("option", { text: "\u5168\u90E8\u7C7B\u578B", attr: { value: "all" } });
    for (const [id, label] of FINANCE_TYPES) select.createEl("option", { text: label, attr: { value: id } });
    select.value = this.financeTypeFilter;
    select.addEventListener("change", () => {
      this.financeTypeFilter = select.value;
      this.render();
    });
    const records = this.plugin.data.finance.records.filter(
      (item) => this.financeTypeFilter === "all" || item.type === this.financeTypeFilter
    );
    const panel = content.createEl("section", { cls: "oom-panel oom-finance-record-panel" });
    this.renderFinanceRecordList(panel, records, true);
  }
  renderFinanceRecordList(parent, records, allowDelete) {
    if (!records.length) {
      this.emptyState(parent, "receipt-text", "\u8FD8\u6CA1\u6709\u8D44\u91D1\u8BB0\u5F55", "\u70B9\u51FB\u53F3\u4E0A\u89D2\u201C\u8BB0\u4E00\u7B14\u201D\u5F00\u59CB\u8BB0\u5F55\u3002");
      return;
    }
    if (!allowDelete) {
      const compact = parent.createDiv({ cls: "oom-finance-compact-list" });
      for (const record of records) {
        const row = compact.createDiv({ cls: "oom-finance-compact-row" });
        const icon = row.createDiv({ cls: `oom-finance-compact-icon is-${record.type}` });
        setIcon(icon, ["income", "collect_loan"].includes(record.type) ? "arrow-down-left" : "arrow-up-right");
        const copy = row.createDiv({ cls: "oom-finance-compact-copy" });
        copy.createDiv({ text: financeTypeLabel(record.type), cls: "oom-health-title" });
        copy.createDiv({
          text: [record.date, record.category, record.person].filter(Boolean).join(" \xB7 "),
          cls: "oom-muted"
        });
        const amount = row.createDiv({ cls: `oom-finance-compact-value is-${record.type}` });
        amount.createSpan({ text: formatMoney(record.amount) });
        amount.createSpan({ text: "\u5143", cls: "oom-money-unit" });
      }
      return;
    }
    const list = parent.createDiv({ cls: "oom-finance-record-list oom-responsive-table" });
    const header = list.createDiv({ cls: "oom-finance-record-row oom-table-header" });
    ["\u65E5\u671F", "\u7C7B\u578B", "\u5206\u7C7B/\u5BF9\u8C61", "\u5907\u6CE8", "\u91D1\u989D", ""].forEach((text) => header.createSpan({ text }));
    for (const record of records) {
      const row = list.createDiv({ cls: "oom-finance-record-row" });
      row.createSpan({ text: record.date || "-", attr: { "data-label": "\u65E5\u671F" } });
      row.createSpan({ text: financeTypeLabel(record.type), attr: { "data-label": "\u7C7B\u578B" } });
      row.createSpan({ text: [record.category, record.person].filter(Boolean).join(" \xB7 ") || "-", attr: { "data-label": "\u5206\u7C7B/\u5BF9\u8C61" } });
      row.createSpan({ text: record.note || "-", attr: { "data-label": "\u5907\u6CE8" } });
      const amount = row.createSpan({ cls: `oom-record-amount is-${record.type}`, attr: { "data-label": "\u91D1\u989D" } });
      amount.createSpan({ text: formatMoney(record.amount) });
      amount.createSpan({ text: " \u5143", cls: "oom-money-unit" });
      const actions = row.createDiv({ cls: "oom-row-actions", attr: { "data-label": "\u64CD\u4F5C" } });
      if (allowDelete) {
        iconButton(
          actions,
          "trash-2",
          "\u5220\u9664\u8BB0\u5F55",
          "oom-danger-button",
          () => new ConfirmModal(this.app, "\u5220\u9664\u8D44\u91D1\u8BB0\u5F55\uFF1F", "\u8FD9\u9879\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002", () => this.plugin.deleteFinanceRecord(record.id)).open()
        );
      }
    }
  }
  renderFinanceTrend(parent) {
    const points = [];
    const records = [...this.plugin.data.finance.records].sort((a, b) => String(a.date).localeCompare(String(b.date)));
    for (let offset = 6; offset >= 0; offset -= 1) {
      const date = /* @__PURE__ */ new Date();
      date.setDate(date.getDate() - offset);
      const key = date.toISOString().slice(0, 10);
      const summary = this.plugin.getFinanceSummary(records.filter((item) => String(item.date || "") <= key));
      points.push({ date: key, value: summary.currentAccount });
    }
    const values = points.map((point) => point.value);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const chart = parent.createDiv({ cls: "oom-finance-chart" });
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("viewBox", "0 0 640 250");
    svg.setAttribute("preserveAspectRatio", "none");
    const coords = points.map((point, index) => ({
      point,
      x: 24 + index * 592 / 6,
      y: 28 + (1 - (point.value - min) / range) * 154
    }));
    for (let index = 0; index < 4; index += 1) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
      const y = 28 + index * 51;
      line.setAttribute("x1", "24");
      line.setAttribute("x2", "616");
      line.setAttribute("y1", String(y));
      line.setAttribute("y2", String(y));
      line.setAttribute("class", "oom-chart-gridline");
      svg.appendChild(line);
    }
    const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    polyline.setAttribute("points", coords.map((item) => `${item.x},${item.y}`).join(" "));
    polyline.setAttribute("class", "oom-chart-line");
    svg.appendChild(polyline);
    for (const { point, x, y } of coords) {
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("cx", String(x));
      dot.setAttribute("cy", String(y));
      dot.setAttribute("r", "4");
      dot.setAttribute("class", "oom-chart-dot");
      svg.appendChild(dot);
      const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
      label.setAttribute("x", String(x));
      label.setAttribute("y", "222");
      label.setAttribute("text-anchor", "middle");
      label.setAttribute("class", "oom-chart-label");
      label.textContent = point.date.slice(5);
      svg.appendChild(label);
    }
    chart.appendChild(svg);
  }
  renderFixedExpenses(content) {
    const hero = content.createEl("section", { cls: "oom-finance-hero" });
    this.moneyMetric(hero, "\u56FA\u5B9A\u4E0E\u9884\u8BA1\u652F\u51FA\u5408\u8BA1", this.plugin.getExpectedExpense(), "calendar-minus", "amber");
    const list = content.createEl("section", { cls: "oom-panel oom-finance-item-list" });
    const entries = this.plugin.data.finance.fixedExpenses;
    if (!entries.length && !this.plugin.data.finance.expectedExpense) {
      this.emptyState(list, "calendar-minus", "\u8FD8\u6CA1\u6709\u56FA\u5B9A\u652F\u51FA", "\u6DFB\u52A0\u623F\u79DF\u3001\u8BA2\u9605\u6216\u5176\u4ED6\u5DF2\u786E\u5B9A\u652F\u51FA\u3002");
      return;
    }
    if (this.plugin.data.finance.expectedExpense > 0) {
      this.renderFinanceItemRow(list, {
        id: "manual",
        name: "\u5176\u4ED6\u9884\u8BA1\u652F\u51FA",
        amount: this.plugin.data.finance.expectedExpense,
        note: "\u6C47\u603B\u91D1\u989D"
      }, null);
    }
    for (const item of entries) this.renderFinanceItemRow(list, item, () => this.plugin.deleteFixedExpense(item.id));
  }
  renderExpectedIncomes(content) {
    const hero = content.createEl("section", { cls: "oom-finance-hero" });
    this.moneyMetric(hero, "\u9884\u8BA1\u6536\u5165\u5408\u8BA1", this.plugin.getExpectedIncome(), "calendar-plus", "green");
    const list = content.createEl("section", { cls: "oom-panel oom-finance-item-list" });
    const entries = this.plugin.data.finance.expectedIncomes;
    if (!entries.length) {
      this.emptyState(list, "calendar-plus", "\u8FD8\u6CA1\u6709\u9884\u8BA1\u6536\u5165", "\u6DFB\u52A0\u5DE5\u8D44\u3001\u9879\u76EE\u6B3E\u6216\u5176\u4ED6\u786E\u5B9A\u6536\u5165\u3002");
      return;
    }
    for (const item of entries) this.renderFinanceItemRow(list, item, () => this.plugin.deleteExpectedIncome(item.id));
  }
  renderFinanceItemRow(parent, item, onDelete) {
    const row = parent.createDiv({ cls: "oom-finance-item-row" });
    const copy = row.createDiv({ cls: "oom-finance-item-copy" });
    copy.createDiv({ text: item.name, cls: "oom-health-title" });
    copy.createDiv({ text: item.note || "\u65E0\u5907\u6CE8", cls: "oom-muted" });
    const value = row.createDiv({ cls: "oom-finance-item-value" });
    value.createSpan({ text: formatMoney(item.amount) });
    value.createSpan({ text: " \u5143", cls: "oom-money-unit" });
    if (onDelete) {
      iconButton(
        row,
        "trash-2",
        "\u5220\u9664",
        "oom-danger-button",
        () => new ConfirmModal(this.app, "\u5220\u9664\u8FD9\u6761\u9879\u76EE\uFF1F", "\u8FD9\u9879\u64CD\u4F5C\u65E0\u6CD5\u64A4\u9500\u3002", onDelete).open()
      );
    }
  }
  renderAccountManagement(content) {
    const summary = this.plugin.getFinanceSummary();
    const grid = content.createDiv({ cls: "oom-account-grid" });
    const breakdown = this.panel(grid, "\u8D26\u6237\u6784\u6210", "\u6309\u7167\u73B0\u6709\u8D44\u91D1\u8BB0\u5F55\u8BA1\u7B97");
    [
      ["\u5F53\u524D\u8D26\u6237", summary.currentAccount, "wallet"],
      ["\u6263\u9664\u9884\u8BA1\u652F\u51FA\u540E", summary.currentAccount - this.plugin.getExpectedExpense(), "circle-dollar-sign"],
      ["\u4FE1\u7528\u5361\u5F85\u8FD8", summary.creditCard, "credit-card"],
      ["\u501F\u51FA\u672A\u6536", summary.loanOut, "users-round"]
    ].forEach(([label, value, icon]) => {
      const row = breakdown.createDiv({ cls: "oom-account-row" });
      const iconEl = row.createDiv({ cls: "oom-account-icon" });
      setIcon(iconEl, icon);
      row.createSpan({ text: label });
      const amount = row.createSpan({ cls: "oom-account-value" });
      amount.createSpan({ text: formatMoney(value) });
      amount.createSpan({ text: " \u5143", cls: "oom-money-unit" });
    });
    const trend = this.panel(grid, "\u4F59\u989D\u8D8B\u52BF", "\u6700\u8FD1 7 \u5929");
    this.renderFinanceTrend(trend);
  }
  settingControl(parent, title, description) {
    const row = parent.createDiv({ cls: "oom-feature-setting" });
    const copy = row.createDiv({ cls: "oom-feature-setting-copy" });
    copy.createDiv({ text: title, cls: "oom-feature-setting-title" });
    if (description) copy.createDiv({ text: description, cls: "oom-feature-setting-desc" });
    return row.createDiv({ cls: "oom-feature-setting-control" });
  }
  settingToggle(parent, title, description, value, onChange) {
    const control = this.settingControl(parent, title, description);
    const label = control.createEl("label", { cls: "oom-switch" });
    const input = label.createEl("input", { attr: { type: "checkbox", "aria-label": title } });
    input.checked = Boolean(value);
    label.createSpan({ cls: "oom-switch-track" });
    input.addEventListener("change", () => onChange(input.checked));
    return input;
  }
  settingSelect(parent, title, description, value, options, onChange) {
    const control = this.settingControl(parent, title, description);
    const select = control.createEl("select", { cls: "oom-setting-select", attr: { "aria-label": title } });
    for (const [id, label] of options) select.createEl("option", { text: label, attr: { value: id } });
    select.value = String(value);
    select.addEventListener("change", () => onChange(select.value));
    return select;
  }
  renderSettings(content) {
    const grid = content.createDiv({ cls: "oom-settings-grid" });
    const interfacePanel = this.panel(grid, "\u754C\u9762\u4E0E\u8BED\u8A00", "\u5373\u65F6\u5207\u6362\uFF0C\u4E0D\u6539\u53D8\u4E1A\u52A1\u6570\u636E");
    this.settingSelect(
      interfacePanel,
      "\u754C\u9762\u8BED\u8A00",
      "\u7BA1\u7406\u9875\u9762\u3001\u5F39\u7A97\u548C\u529F\u80FD\u8BBE\u7F6E\u4F7F\u7528\u540C\u4E00\u8BED\u8A00\u3002",
      this.plugin.settings.language,
      [["zh", "\u4E2D\u6587\uFF08\u7B80\u4F53\uFF09"], ["en", "English"]],
      (value) => this.plugin.setLanguage(value)
    );
    const storage = this.panel(grid, "\u6570\u636E\u6587\u4EF6\u5939", "\u4E1A\u52A1\u6570\u636E\u4FDD\u5B58\u5728\u53EF\u540C\u6B65\u7684\u72EC\u7ACB\u6587\u4EF6\u4E2D");
    const status = storage.createDiv({ cls: "oom-settings-status" });
    const icon = status.createDiv({ cls: "oom-settings-icon" });
    setIcon(icon, "folder-cog");
    const copy = status.createDiv();
    copy.createDiv({ text: this.plugin.getDataFolder(), cls: "oom-health-title oom-storage-path" });
    copy.createDiv({ text: "management.md \xB7 planning.md \xB7 finance.md", cls: "oom-muted" });
    const folderForm = storage.createDiv({ cls: "oom-folder-form" });
    const input = folderForm.createEl("input", {
      attr: {
        type: "text",
        value: this.plugin.getDataFolder(),
        placeholder: DEFAULT_DATA_FOLDER,
        "aria-label": "\u6570\u636E\u6587\u4EF6\u5939"
      }
    });
    textButton(folderForm, "\u4FDD\u5B58\u5E76\u8FC1\u79FB", "oom-primary-button", async () => {
      try {
        await this.plugin.setDataFolder(input.value);
      } catch (error) {
        console.error(error);
        new Notice(this.plugin.t(error.message || "\u6570\u636E\u6587\u4EF6\u5939\u8BBE\u7F6E\u5931\u8D25"));
      }
    });
    storage.createDiv({
      text: "\u5207\u6362\u76EE\u5F55\u65F6\u4F1A\u5148\u590D\u5236\u5F53\u524D\u6570\u636E\uFF0C\u4E0D\u4F1A\u81EA\u52A8\u5220\u9664\u65E7\u6587\u4EF6\u5939\u3002",
      cls: "oom-setting-hint"
    });
    const imagePanel = this.panel(grid, "\u56FE\u7247\u4E0E\u9644\u4EF6", "\u81EA\u52A8\u547D\u540D\u3001\u5F15\u7528\u4FEE\u590D\u3001Canvas \u4E0E Base \u5DE5\u5177");
    imagePanel.addClass("oom-settings-feature-panel");
    this.settingToggle(
      imagePanel,
      "\u542F\u7528\u81EA\u52A8\u56FE\u7247\u91CD\u547D\u540D",
      "\u7C98\u8D34 PNG\u3001JPG\u3001JPEG \u540E\u81EA\u52A8\u547D\u540D\u4E3A\u201C\u7B14\u8BB0\u540D_000001\u201D\u3002",
      this.plugin.settings.imageRename.enabled,
      async (value) => {
        this.plugin.settings.imageRename.enabled = value;
        await this.plugin.savePluginSettings();
      }
    );
    const imageFolderControl = this.settingControl(
      imagePanel,
      "\u56FE\u7247\u76EE\u6807\u6587\u4EF6\u5939",
      "\u9ED8\u8BA4\u4FDD\u5B58\u5230 Archive/img\uFF1B\u53EF\u586B\u5199\u5176\u4ED6\u5E93\u5185\u76EE\u5F55\u3002"
    );
    const imageFolderInput = imageFolderControl.createEl("input", {
      cls: "oom-setting-input",
      attr: {
        type: "text",
        value: this.plugin.settings.imageRename.targetFolder,
        placeholder: "Archive/img",
        "aria-label": "\u56FE\u7247\u76EE\u6807\u6587\u4EF6\u5939"
      }
    });
    textButton(imageFolderControl, "\u4FDD\u5B58", "oom-secondary-button oom-small-button", async () => {
      this.plugin.settings.imageRename.targetFolder = imageFolderInput.value;
      await this.plugin.savePluginSettings({ refresh: false });
      new Notice(this.plugin.t("\u56FE\u7247\u8BBE\u7F6E\u5DF2\u4FDD\u5B58"));
    });
    this.settingSelect(
      imagePanel,
      "Canvas \u56FE\u7247\u6587\u4EF6\u540D",
      "\u63A7\u5236\u56FE\u7247\u8282\u70B9\u6807\u7B7E\u7684\u663E\u793A\u65B9\u5F0F\u3002",
      this.plugin.settings.imageRename.filenameDisplayMode,
      [["show", "\u59CB\u7EC8\u663E\u793A"], ["hover", "\u60AC\u505C\u663E\u793A"], ["hide", "\u9690\u85CF"]],
      async (value) => {
        this.plugin.settings.imageRename.filenameDisplayMode = value;
        await this.plugin.savePluginSettings({ refresh: false });
      }
    );
    this.settingToggle(
      imagePanel,
      "\u5728\u6587\u4EF6\u5217\u8868\u9690\u85CF PNG",
      "\u53EA\u9690\u85CF\u6587\u4EF6\u6811\u6761\u76EE\uFF0C\u4E0D\u4F1A\u5220\u9664\u4EFB\u4F55\u56FE\u7247\u3002",
      this.plugin.settings.imageRename.hidePngInFileList,
      async (value) => {
        this.plugin.settings.imageRename.hidePngInFileList = value;
        await this.plugin.savePluginSettings({ refresh: false });
      }
    );
    const imageActions = imagePanel.createDiv({ cls: "oom-feature-actions" });
    textButton(
      imageActions,
      "\u68C0\u67E5\u5E76\u6574\u7406\u5F53\u524D\u7B14\u8BB0",
      "oom-primary-button",
      () => this.plugin.imageRename.renameImagesInActiveNote()
    );
    textButton(
      imageActions,
      "\u521B\u5EFA Files.base",
      "oom-secondary-button",
      () => this.plugin.imageRename.createDefaultBase()
    );
    const ruleArea = imagePanel.createDiv({ cls: "oom-setting-rules" });
    ruleArea.createDiv({ text: "Base \u540D\u79F0\u6837\u5F0F", cls: "oom-feature-setting-title" });
    ruleArea.createDiv({
      text: "\u6309\u6587\u4EF6\u6269\u5C55\u540D\u4E3A Bases \u7684\u540D\u79F0\u5217\u8BBE\u7F6E\u989C\u8272\u3002",
      cls: "oom-feature-setting-desc"
    });
    this.plugin.settings.imageRename.baseNameStyleRules.forEach((rule, index) => {
      const row = ruleArea.createDiv({ cls: "oom-setting-rule" });
      const extension = row.createEl("input", {
        cls: "oom-setting-input",
        attr: { type: "text", value: rule.extension, placeholder: "md", "aria-label": "\u6269\u5C55\u540D" }
      });
      const color = row.createEl("input", {
        cls: "oom-setting-color",
        attr: { type: "color", value: rule.color, "aria-label": "\u989C\u8272" }
      });
      extension.addEventListener("change", async () => {
        const current = this.plugin.settings.imageRename.baseNameStyleRules[index];
        if (current) current.extension = extension.value.trim().replace(/^\./, "").toLowerCase();
        await this.plugin.savePluginSettings({ refresh: false });
      });
      color.addEventListener("change", async () => {
        const current = this.plugin.settings.imageRename.baseNameStyleRules[index];
        if (current) current.color = color.value;
        await this.plugin.savePluginSettings({ refresh: false });
      });
      iconButton(row, "trash-2", "\u5220\u9664\u89C4\u5219", "oom-danger-button", async () => {
        this.plugin.settings.imageRename.baseNameStyleRules.splice(index, 1);
        await this.plugin.savePluginSettings();
      });
    });
    textButton(ruleArea, "\uFF0B \u6DFB\u52A0\u89C4\u5219", "oom-secondary-button oom-small-button", async () => {
      this.plugin.settings.imageRename.baseNameStyleRules.push({ extension: "pdf", color: "#5b8def" });
      await this.plugin.savePluginSettings();
    });
    const mindmapPanel = this.panel(grid, "\u601D\u7EF4\u5BFC\u56FE", "\u79BB\u7EBF SVG \u5F15\u64CE\uFF0CMarkdown \u5C31\u662F\u6570\u636E\u6E90");
    mindmapPanel.addClass("oom-settings-feature-panel");
    this.settingToggle(
      mindmapPanel,
      "\u542F\u7528\u601D\u7EF4\u5BFC\u56FE",
      "\u652F\u6301 Markdown \u6807\u9898\u548C\u7F29\u8FDB\u5217\u8868\u3001\u7F29\u653E\u3001\u62D6\u52A8\u53CA\u8282\u70B9\u6298\u53E0\u3002",
      this.plugin.settings.mindmap.enabled,
      async (value) => {
        this.plugin.settings.mindmap.enabled = value;
        await this.plugin.savePluginSettings();
      }
    );
    this.settingSelect(
      mindmapPanel,
      "\u5BFC\u56FE\u65B9\u5411",
      "\u9009\u62E9\u4E3B\u8981\u5C55\u5F00\u65B9\u5411\u3002",
      this.plugin.settings.mindmap.direction,
      [["horizontal", "\u4ECE\u5DE6\u5411\u53F3"], ["vertical", "\u4ECE\u4E0A\u5411\u4E0B"]],
      async (value) => {
        this.plugin.settings.mindmap.direction = value;
        await this.plugin.savePluginSettings({ refresh: false });
      }
    );
    this.settingSelect(
      mindmapPanel,
      "\u521D\u59CB\u5C55\u5F00\u5C42\u7EA7",
      "-1 \u8868\u793A\u5168\u90E8\u5C55\u5F00\u3002",
      this.plugin.settings.mindmap.initialExpandLevel,
      [["-1", "\u5168\u90E8"], ["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"]],
      async (value) => {
        this.plugin.settings.mindmap.initialExpandLevel = Number(value);
        await this.plugin.savePluginSettings({ refresh: false });
      }
    );
    this.settingToggle(
      mindmapPanel,
      "\u663E\u793A\u5DE5\u5177\u680F",
      "\u663E\u793A\u9002\u914D\u3001\u5C55\u5F00\u3001\u6298\u53E0\u548C\u7F29\u653E\u64CD\u4F5C\u3002",
      this.plugin.settings.mindmap.showToolbar,
      async (value) => {
        this.plugin.settings.mindmap.showToolbar = value;
        await this.plugin.savePluginSettings({ refresh: false });
      }
    );
    this.settingToggle(
      mindmapPanel,
      "\u6587\u6863\u6807\u9898\u4F5C\u4E3A\u6839\u8282\u70B9",
      "\u5F00\u542F\u540E\u4F7F\u7528\u6587\u4EF6\u540D\u4F5C\u4E3A\u5BFC\u56FE\u6700\u4E0A\u5C42\u8282\u70B9\u3002",
      this.plugin.settings.mindmap.titleAsRootNode,
      async (value) => {
        this.plugin.settings.mindmap.titleAsRootNode = value;
        await this.plugin.savePluginSettings({ refresh: false });
      }
    );
    const mapActions = mindmapPanel.createDiv({ cls: "oom-feature-actions" });
    textButton(mapActions, "\u8DDF\u968F\u5F53\u524D\u6587\u4EF6", "oom-secondary-button", () => this.plugin.mindmap.open(false));
    textButton(mapActions, "\u56FA\u5B9A\u5F53\u524D\u6587\u4EF6", "oom-primary-button", () => this.plugin.mindmap.open(true));
    mindmapPanel.createDiv({
      text: "\u5FEB\u6377\u952E\uFF1ACtrl/Cmd + Shift + M\uFF08\u53EF\u5728 Obsidian \u7684\u201C\u5FEB\u6377\u952E\u201D\u8BBE\u7F6E\u4E2D\u4FEE\u6539\uFF09",
      cls: "oom-setting-hint"
    });
    const counts = this.panel(grid, "\u5F53\u524D\u6570\u636E", "\u53EA\u8BFB\u7EDF\u8BA1");
    const rows = [
      ["\u9879\u76EE", this.plugin.data.projects.length],
      ["\u884C\u52A8", this.plugin.data.actions.length],
      ["\u60F3\u6CD5", this.plugin.data.ideas.length],
      ["\u8D44\u91D1\u8BB0\u5F55", this.plugin.data.finance.records.length]
    ];
    for (const [label, value] of rows) {
      const row = counts.createDiv({ cls: "oom-settings-row" });
      row.createSpan({ text: label });
      row.createSpan({ text: String(value) });
    }
    this.plugin.localizeElement(content);
  }
};
var EntityModal = class extends Modal {
  constructor(app, plugin, entity) {
    super(app);
    this.plugin = plugin;
    this.entity = entity;
    this.values = {};
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("oom-modal");
    this.modalEl?.addClass("oom-manage-modal-frame");
    this.renderForm();
    this.plugin.localizeElement(this.contentEl);
  }
  formLayout(title, subtitle) {
    const heading = this.contentEl.createEl("header", { cls: "oom-modal-heading" });
    heading.createEl("h2", { text: title });
    heading.createEl("p", { text: subtitle, cls: "oom-modal-subtitle" });
    return this.contentEl.createDiv({
      cls: "oom-form-grid oom-modal-body",
      attr: { "aria-label": title }
    });
  }
  field(form, label, key, value, options = {}) {
    const wrap = form.createDiv({ cls: `oom-form-field ${options.full ? "is-full" : ""}` });
    wrap.createEl("label", { text: label });
    let input;
    if (options.type === "textarea") {
      input = wrap.createEl("textarea", { attr: { rows: options.rows || 3, placeholder: options.placeholder || "" } });
      input.value = value || "";
    } else if (options.options) {
      input = wrap.createEl("select");
      if (options.allowEmpty) input.createEl("option", { text: options.emptyLabel || "\u672A\u9009\u62E9", attr: { value: "" } });
      for (const [id, text] of options.options) input.createEl("option", { text, attr: { value: id } });
      input.value = value || "";
    } else {
      input = wrap.createEl("input", {
        attr: {
          type: options.type || "text",
          placeholder: options.placeholder || ""
        }
      });
      input.value = value || "";
    }
    input.addEventListener("input", () => {
      this.values[key] = input.value;
    });
    input.addEventListener("change", () => {
      this.values[key] = input.value;
    });
    this.values[key] = input.value;
    return input;
  }
  footer(_form, submitLabel, onSubmit) {
    const footer = this.contentEl.createDiv({ cls: "oom-modal-footer" });
    textButton(footer, "\u53D6\u6D88", "oom-secondary-button", () => this.close());
    let pending = false;
    const submit = textButton(footer, submitLabel, "oom-primary-button", async () => {
      if (pending) return;
      pending = true;
      submit.disabled = true;
      submit.addClass("is-loading");
      const originalLabel = submit.textContent;
      submit.textContent = "\u6B63\u5728\u4FDD\u5B58\u2026";
      try {
        const ok = await onSubmit();
        if (ok !== false) this.close();
      } finally {
        pending = false;
        submit.disabled = false;
        submit.removeClass("is-loading");
        submit.textContent = originalLabel;
      }
    });
  }
  requireTitle() {
    if (!String(this.values.title || "").trim()) {
      new Notice(this.plugin.t("\u8BF7\u586B\u5199\u540D\u79F0"));
      return false;
    }
    return true;
  }
};
var ProjectModal = class extends EntityModal {
  renderForm() {
    const item = this.entity || {};
    const form = this.formLayout(
      this.entity ? "\u7F16\u8F91\u9879\u76EE" : "\u65B0\u5EFA\u9879\u76EE",
      "\u5148\u5199\u6E05\u7ED3\u679C\uFF0C\u518D\u6295\u5165\u65F6\u95F4\u3002"
    );
    const title = this.field(form, "\u9879\u76EE\u540D\u79F0 *", "title", item.title, { full: true, placeholder: "\u4F8B\u5982\uFF1A\u5B8C\u6210\u7B2C\u4E00\u7248\u53EF\u7528\u539F\u578B" });
    this.field(form, "\u76EE\u6807\u7ED3\u679C", "outcome", item.outcome, { full: true, type: "textarea", placeholder: "\u5B8C\u6210\u540E\u5177\u4F53\u4F1A\u5F97\u5230\u4EC0\u4E48\uFF1F" });
    this.field(form, "\u8D1F\u8D23\u4EBA", "owner", item.owner, { placeholder: "\u4E00\u4E2A\u660E\u786E\u8D1F\u8D23\u4EBA" });
    this.field(form, "\u72B6\u6001", "status", item.status || "planned", { options: PROJECT_STATUSES });
    this.field(form, "\u4F18\u5148\u7EA7", "priority", item.priority || "P2", { options: PRIORITIES });
    this.field(form, "\u622A\u6B62\u65E5\u671F", "deadline", item.deadline, { type: "date" });
    this.field(form, "\u4E0B\u4E00\u6B65", "nextAction", item.nextAction, { full: true, placeholder: "\u4E0B\u4E00\u6B21\u4E13\u6CE8\u65F6\u95F4\u91CC\u5177\u4F53\u505A\u4EC0\u4E48\uFF1F" });
    this.field(form, "\u963B\u585E\u539F\u56E0", "blocker", item.blocker, { full: true, placeholder: "\u4EC5\u5728\u963B\u585E\u65F6\u586B\u5199" });
    this.footer(form, this.entity ? "\u4FDD\u5B58\u4FEE\u6539" : "\u521B\u5EFA\u9879\u76EE", async () => {
      if (!this.requireTitle()) return false;
      const project = {
        ...item,
        id: item.id || uid("project"),
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
};
var ActionModal = class extends EntityModal {
  constructor(app, plugin, entity, projectId = "") {
    super(app, plugin, entity);
    this.defaultProjectId = projectId;
  }
  renderForm() {
    const item = this.entity || {};
    const form = this.formLayout(
      this.entity ? "\u7F16\u8F91\u884C\u52A8" : "\u65B0\u5EFA\u884C\u52A8",
      "\u884C\u52A8\u5E94\u8BE5\u5C0F\u5230\u53EF\u4EE5\u4E00\u6B21\u5B8C\u6210\u3002"
    );
    const title = this.field(form, "\u884C\u52A8\u540D\u79F0 *", "title", item.title, { full: true, placeholder: "\u7528\u52A8\u8BCD\u5F00\u5934\uFF0C\u4F8B\u5982\uFF1A\u5B8C\u6210\u6D4B\u8BD5\u7A0B\u5E8F" });
    const projectOptions = this.plugin.data.projects.map((project) => [project.id, project.title]);
    this.field(form, "\u6240\u5C5E\u9879\u76EE", "projectId", item.projectId || this.defaultProjectId, {
      options: projectOptions,
      allowEmpty: true,
      emptyLabel: "\u72EC\u7ACB\u884C\u52A8"
    });
    this.field(form, "\u72B6\u6001", "status", item.status || "todo", { options: ACTION_STATUSES });
    this.field(form, "\u4F18\u5148\u7EA7", "priority", item.priority || "P2", { options: PRIORITIES });
    this.field(form, "\u622A\u6B62\u65E5\u671F", "deadline", item.deadline, { type: "date" });
    this.field(form, "\u5907\u6CE8", "note", item.note, { full: true, type: "textarea", rows: 2, placeholder: "\u8865\u5145\u5B8C\u6210\u6807\u51C6\u6216\u4E0A\u4E0B\u6587" });
    this.field(form, "\u963B\u585E\u539F\u56E0", "blocker", item.blocker, { full: true, placeholder: "\u4EC5\u5728\u963B\u585E\u65F6\u586B\u5199" });
    this.footer(form, this.entity ? "\u4FDD\u5B58\u4FEE\u6539" : "\u521B\u5EFA\u884C\u52A8", async () => {
      if (!this.requireTitle()) return false;
      const action = {
        ...item,
        id: item.id || uid("action"),
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
};
var IdeaModal = class extends EntityModal {
  renderForm() {
    const item = this.entity || {};
    const form = this.formLayout(
      this.entity ? "\u7F16\u8F91\u60F3\u6CD5" : "\u8BB0\u5F55\u60F3\u6CD5",
      "\u8BB0\u5F55\u95EE\u9898\u3001\u4EF7\u503C\u548C\u6700\u5C0F\u5B9E\u9A8C\uFF0C\u4E0D\u6025\u7740\u7ACB\u9879\u3002"
    );
    const title = this.field(form, "\u60F3\u6CD5\u540D\u79F0 *", "title", item.title, { full: true, placeholder: "\u4E00\u53E5\u8BDD\u63CF\u8FF0\u65B9\u5411" });
    this.field(form, "\u4F18\u5148\u7EA7", "priority", item.priority || "P2", { options: PRIORITIES });
    this.field(form, "\u8981\u89E3\u51B3\u7684\u95EE\u9898", "problem", item.problem, { full: true, type: "textarea", placeholder: "\u8C01\u5728\u4EC0\u4E48\u573A\u666F\u4E0B\u9047\u5230\u4EC0\u4E48\u95EE\u9898\uFF1F" });
    this.field(form, "\u9884\u671F\u4EF7\u503C", "value", item.value, { full: true, type: "textarea", rows: 2, placeholder: "\u4E3A\u4EC0\u4E48\u503C\u5F97\u9A8C\u8BC1\uFF1F" });
    this.field(form, "\u6700\u5C0F\u5B9E\u9A8C", "nextExperiment", item.nextExperiment, { full: true, type: "textarea", rows: 2, placeholder: "\u6700\u4FBF\u5B9C\u3001\u6700\u5FEB\u7684\u9A8C\u8BC1\u65B9\u5F0F\u662F\u4EC0\u4E48\uFF1F" });
    this.footer(form, this.entity ? "\u4FDD\u5B58\u4FEE\u6539" : "\u8BB0\u5F55\u60F3\u6CD5", async () => {
      if (!this.requireTitle()) return false;
      const idea = {
        ...item,
        id: item.id || uid("idea"),
        title: this.values.title.trim(),
        priority: this.values.priority,
        problem: this.values.problem.trim(),
        value: this.values.value.trim(),
        nextExperiment: this.values.nextExperiment.trim(),
        status: item.status || "inbox",
        createdAt: item.createdAt || today(),
        updatedAt: today()
      };
      await this.plugin.upsertIdea(idea);
      return true;
    });
    setTimeout(() => title.focus(), 0);
  }
};
var FinanceRecordModal = class extends EntityModal {
  renderForm() {
    const form = this.formLayout(
      "\u8BB0\u5F55\u4E00\u7B14\u8D44\u91D1",
      "\u4F7F\u7528\u4E0E Personal Funds \u4E00\u81F4\u7684\u6536\u652F\u53E3\u5F84\u3002"
    );
    this.field(form, "\u7C7B\u578B", "type", "expense", { options: FINANCE_TYPES });
    const amount = this.field(form, "\u91D1\u989D *", "amount", "", { type: "number", placeholder: "0.00" });
    this.field(form, "\u65E5\u671F", "date", today(), { type: "date" });
    this.field(form, "\u5206\u7C7B", "category", FINANCE_CATEGORIES[0], {
      options: FINANCE_CATEGORIES.map((item) => [item, item])
    });
    this.field(form, "\u5BF9\u8C61", "person", "", { placeholder: "\u53EF\u4E0D\u586B" });
    this.field(form, "\u5907\u6CE8", "note", "", { full: true, placeholder: "\u53EF\u4E0D\u586B" });
    this.footer(form, "\u4FDD\u5B58\u8BB0\u5F55", async () => {
      const numeric = Number(this.values.amount);
      if (!Number.isFinite(numeric) || numeric <= 0) {
        new Notice(this.plugin.t("\u8BF7\u8F93\u5165\u5927\u4E8E 0 \u7684\u91D1\u989D"));
        return false;
      }
      await this.plugin.addFinanceRecord({
        id: uid("finance"),
        type: this.values.type,
        amount: numeric,
        date: this.values.date || today(),
        category: this.values.category,
        person: this.values.person.trim(),
        note: this.values.note.trim(),
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      });
      return true;
    });
    setTimeout(() => amount.focus(), 0);
  }
};
var FinanceItemModal = class extends EntityModal {
  constructor(app, plugin, kind) {
    super(app, plugin, null);
    this.kind = kind;
  }
  renderForm() {
    const isIncome = this.kind === "income";
    const form = this.formLayout(
      isIncome ? "\u6DFB\u52A0\u9884\u8BA1\u6536\u5165" : "\u6DFB\u52A0\u56FA\u5B9A\u652F\u51FA",
      isIncome ? "\u8BB0\u5F55\u672A\u6765\u5DF2\u786E\u5B9A\u4F46\u5C1A\u672A\u5230\u8D26\u7684\u6536\u5165\u3002" : "\u8BB0\u5F55\u672A\u6765\u5DF2\u786E\u5B9A\u4F46\u5C1A\u672A\u53D1\u751F\u7684\u652F\u51FA\u3002"
    );
    const name = this.field(form, "\u540D\u79F0 *", "name", "", {
      full: true,
      placeholder: isIncome ? "\u4F8B\u5982\uFF1A\u5DE5\u8D44\u6216\u9879\u76EE\u6B3E" : "\u4F8B\u5982\uFF1A\u623F\u79DF\u6216\u8BA2\u9605"
    });
    this.field(form, "\u91D1\u989D *", "amount", "", { type: "number", placeholder: "0.00" });
    this.field(form, "\u5907\u6CE8", "note", "", { full: true, placeholder: "\u53EF\u4E0D\u586B" });
    this.footer(form, "\u4FDD\u5B58", async () => {
      const numeric = Number(this.values.amount);
      if (!this.values.name.trim()) {
        new Notice(this.plugin.t("\u8BF7\u586B\u5199\u540D\u79F0"));
        return false;
      }
      if (!Number.isFinite(numeric) || numeric <= 0) {
        new Notice(this.plugin.t("\u8BF7\u8F93\u5165\u5927\u4E8E 0 \u7684\u91D1\u989D"));
        return false;
      }
      const item = {
        id: uid(isIncome ? "income" : "expense"),
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
};
var ExpectedExpenseModal = class extends EntityModal {
  renderForm() {
    const form = this.formLayout(
      "\u8BBE\u7F6E\u5176\u4ED6\u9884\u8BA1\u652F\u51FA",
      "\u8BE5\u91D1\u989D\u4F1A\u8BA1\u5165\u9884\u8BA1\u652F\u51FA\uFF0C\u4F46\u4E0D\u4F1A\u6539\u53D8\u5F53\u524D\u8D26\u6237\u3002"
    );
    const amount = this.field(
      form,
      "\u9884\u8BA1\u652F\u51FA\u91D1\u989D",
      "amount",
      String(this.plugin.data.finance.expectedExpense || ""),
      { full: true, type: "number", placeholder: "0.00" }
    );
    this.footer(form, "\u4FDD\u5B58", async () => {
      const numeric = Number(this.values.amount || 0);
      if (!Number.isFinite(numeric) || numeric < 0) {
        new Notice(this.plugin.t("\u8BF7\u8F93\u5165\u5927\u4E8E\u6216\u7B49\u4E8E 0 \u7684\u91D1\u989D"));
        return false;
      }
      this.plugin.data.finance.expectedExpense = numeric;
      await this.plugin.persist("\u9884\u8BA1\u652F\u51FA\u5DF2\u4FDD\u5B58");
      return true;
    });
    setTimeout(() => amount.focus(), 0);
  }
};
var ConfirmModal = class extends Modal {
  constructor(app, title, message, onConfirm) {
    super(app);
    this.plugin = app.plugins?.plugins?.["open-obsidian-manage"] || null;
    this.title = title;
    this.message = message;
    this.onConfirm = onConfirm;
  }
  onOpen() {
    this.contentEl.empty();
    this.contentEl.addClass("oom-modal");
    this.contentEl.addClass("oom-confirm-modal");
    this.modalEl?.addClass("oom-manage-modal-frame");
    const heading = this.contentEl.createEl("header", { cls: "oom-modal-heading" });
    heading.createEl("h2", { text: this.title });
    heading.createEl("p", { text: this.message, cls: "oom-modal-subtitle" });
    const footer = this.contentEl.createDiv({ cls: "oom-modal-footer" });
    textButton(footer, "\u53D6\u6D88", "oom-secondary-button", () => this.close());
    textButton(footer, "\u786E\u8BA4\u5220\u9664", "oom-delete-button", async () => {
      await this.onConfirm();
      this.close();
    });
    this.plugin?.localizeElement(this.contentEl);
  }
};
