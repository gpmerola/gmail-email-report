
# gmail-email-report

Google Apps Script that scans Gmail for a chosen period and drops a Drive-hosted CSV counting how many messages arrived from each sender.

## Features
* Custom date window and filename  
* Skip-list for senders  
* **UNREAD_ONLY** to tally only unread mail  
* **MARK_AS_READ** to clear mail after processing  
* One-click time-driven automation via trigger

## Prerequisites
* A Google account with Gmail and Drive  
* [Node ≥ 16](https://nodejs.org)  
* [`@google/clasp`](https://github.com/google/clasp)

## Setup (5 min)
```bash
npm i -g @google/clasp
clasp login                       # opens browser
git clone https://github.com/<you>/gmail-email-report.git
cd gmail-email-report
clasp create --title "Gmail Email Report"
clasp push                        # uploads src/ + appsscript.json
```

1. In the Apps Script editor open **src/analizzaEmail.gs**.  
2. Edit the `CONFIG` block (dates, flags, skip list).  
3. Run **run()** once → accept Gmail & Drive scopes.  
4. Add a time-driven trigger if you want automatic daily/weekly runs.  
5. Find the resulting CSV in *My Drive* each time the script runs.

## Configuration
```javascript
const CONFIG = {
  DATE_FROM: '2025/01/01', // inclusive
  DATE_TO:   '2025/03/01', // exclusive
  UNREAD_ONLY: false,
  MARK_AS_READ: false,
  OUTPUT_FILENAME: 'Email_Mittenti.csv',
  SKIP_SENDERS: [ 'alice@example.com', /* … */ ]
};
```

## Required OAuth Scopes
| Flag            | Scope                                                   |
|-----------------|---------------------------------------------------------|
| default         | `https://www.googleapis.com/auth/gmail.readonly`        |
| MARK_AS_READ    | `https://www.googleapis.com/auth/gmail.modify`          |
| all             | `https://www.googleapis.com/auth/drive.file`            |

## License
[MIT](LICENSE)
