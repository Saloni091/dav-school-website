const express = require("express");
const router = express.Router();

const { createStudent } = require("../models/Student");

router.post("/register", (req, res) => {

  const studentData = req.body;

  createStudent(studentData, (err, result) => {

    if (err) {
      return res.status(500).json({ message: err.message });
    }

    res.json({ message: "Admission Successful" });

  });

});

module.exports = router;