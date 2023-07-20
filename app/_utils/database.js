// global singleton for the database
// https://nextjs.org/docs/getting-started/react-essentials#sharing-data-between-server-components

export const db = require('better-sqlite3')('skyhigh_dev.sqlite'/* , {verbose: console.log} */);
db.pragma('journal_mode = WAL');
