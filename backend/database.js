const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("./school.db", (err) => {
  if (err) {
    console.error("Database Error:", err.message);
  } else {
    console.log("SQLite Database Connected");
  }
});

module.exports = db;