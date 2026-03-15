const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
// const PORT = 3000;
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "../school")));

/* ======================
DATABASE CONNECTION
====================== */

const db = new sqlite3.Database("users.db", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("SQLite Database Connected");
    }
});

/* create table */

db.run(`
CREATE TABLE IF NOT EXISTS logins (
id INTEGER PRIMARY KEY AUTOINCREMENT,
email TEXT,
password TEXT,
login_time DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);

app.post("/api/admission/register", (req, res) => {

    const { name, email, phone, address, classApplying } = req.body;

    const sql = `
        INSERT INTO admissions (name, email, phone, address, classApplying)
        VALUES (?, ?, ?, ?, ?)
    `;

    db.run(sql, [name, email, phone, address, classApplying], function(err) {

        if (err) {
            console.log(err);
            return res.json({ message: "Admission Failed" });
        }

        res.json({ message: "Admission Successful" });

    });

});

db.run(`
CREATE TABLE IF NOT EXISTS admissions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    classApplying TEXT
)
`);

/* ======================
EMAIL CONFIGURATION
====================== */

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "saloni95.aura@gmail.com",
        pass: "emjm eorl rrbn ufyw"
    }
});

/* ======================
LOGIN API
====================== */

app.post("/api/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and Password required" });
  }

  db.run(
    "INSERT INTO logins (email, password) VALUES (?, ?)",
    [email, password],
    function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json({ message: "Database Error" });
      }

      const mailOptions = {
        from: "saloni95.aura@gmail.com",
        to: email,
        subject: "Login Successful",
        text: `Hello,

You have successfully logged in.

Email: ${email}

If this was not you, please secure your account.`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Email error:", error);
          return res.status(500).json({ message: "Login Successful but email not sent" });
        } else {
          console.log("Email sent:", info.response);
          return res.status(200).json({ message: "Login Successful" });
        }
      });
    }
  );
});

/* ======================
START SERVER
====================== */

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});