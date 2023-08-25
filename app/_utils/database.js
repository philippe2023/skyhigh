// global singleton for the database
// https://nextjs.org/docs/getting-started/react-essentials#sharing-data-between-server-components
const dbPath = process.env.NODE_ENV === 'production' ? '/data/skyhigh.sqlite' : 'skyhigh_dev.sqlite';
export const db = require('better-sqlite3')(dbPath);
db.pragma('journal_mode = WAL');
