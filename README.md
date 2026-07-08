# Personal Funds

Personal Funds is a local-first Obsidian plugin for tracking personal income, expenses, credit card payments, lending, and account adjustments.

## Features

- Record income, cash expenses, credit card expenses, credit card repayments, lending, loan collections, and account adjustments.
- View current account, credit card, expense, income, and lending summaries in a responsive modal.
- Generate a Markdown funds dashboard in your vault.
- Generate an Obsidian Canvas with the dashboard and usage guide.
- Save records to a configurable vault folder as `records.json`.
- Read records back from the vault database after plugin updates or reinstalls.
- Open and update separate Markdown summary notes from the five top summary cards.
- Preserve user-added files and Canvas nodes when updating generated dashboards.
- Switch between Chinese and English in the plugin interface.
- Store all data locally in your vault, with plugin data kept as a secondary copy.

## Usage

1. Click the wallet icon in the ribbon, or run `Open personal funds` from the command palette.
2. Choose a record type, enter the amount, category, person, and optional note.
3. Save the record to update the funds dashboard automatically.
4. Use `Update funds dashboard markdown`, `Create or update funds canvas`, or `Read funds database` from the command palette when needed.
   `Update funds dashboard markdown` only updates the default dashboard file.
5. Configure the data folder in the plugin settings if you want the database and generated files somewhere else.

## Generated Files

Personal Funds creates generated files under:

- `Personal_funds/Funds dashboard.md`
- `Personal_funds/Funds dashboard.canvas`
- `Personal_funds/records.json`
- `Personal_funds/Summary/*.md`

## Privacy

Personal Funds does not send data to external services. Records are saved locally in your vault database file and mirrored in Obsidian plugin data.

## Author

MI-Lin

## License

MIT
