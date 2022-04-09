const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Student = require("../models/student");
const auth = require("../auth/authenticate");

const Program = require("../models/program");

router.get("/", auth.verifyUser, (req, res) => {
  Program.find({})
    .then((program) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(program);
    })
    .catch((err) => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ success: false, message: err.message });
    });
});

router.post("/add-Program", auth.verifyUser, auth.checkAdmin, (req, res) => {
  Program.create(req.body)
    .then((program) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(program);
    })
    .catch((err) => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ success: false, message: err.message });
    });
});

module.exports = router;
