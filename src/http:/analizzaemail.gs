/**
 * Email-to-CSV Report for Gmail
 * Edit the CONFIG block only.
 */
const CONFIG = {
  DATE_FROM: '2025/01/01',        // YYYY/MM/DD
  DATE_TO:   '2025/03/01',        // YYYY/MM/DD
  UNREAD_ONLY: false,             // true  -> process only unread messages
  MARK_AS_READ: false,            // true  -> mark processed mails as read
  OUTPUT_FILENAME: 'Email_Mittenti.csv',
  SKIP_SENDERS: [                 // add or remove as needed
    'sennar.pierp@gmail.com',
    // …
    'danelli.ornella@gmail.com'
  ]
};

function buildQuery() {
  let q = `after:${CONFIG.DATE_FROM} before:${CONFIG.DATE_TO}`;
  if (CONFIG.UNREAD_ONLY) q += ' is:unread';
  return q;
}

function collectStats() {
  const counts = {};
  GmailApp.search(buildQuery()).forEach(thread =>
    thread.getMessages().forEach(msg => {
      if (CONFIG.UNREAD_ONLY && !msg.isUnread()) return;
      const from = msg.getFrom().trim();
      if (CONFIG.SKIP_SENDERS.some(s => from.includes(s))) return;
      counts[from] = (counts[from] || 0) + 1;
      if (CONFIG.MARK_AS_READ) msg.markRead();
    })
  );
  return counts;
}

function saveCsv(counts) {
  const rows = [['Sender', 'EmailCount']];
  Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .forEach(([s, n]) => rows.push([s, n]));
  const csv = rows.map(r => r.join(',')).join('\n');
  DriveApp.createFile(CONFIG.OUTPUT_FILENAME, csv, MimeType.CSV);
}

function run() {
  saveCsv(collectStats());
}
