const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Student = require("../models/student");
const auth = require("../auth/authenticate");
const helpers = require("../helpers/helpers");
const SynopsisSubmission = require("../models/synopsisSubmission");
const Notification = require("../models/notification");
const Announcement = require("../models/announcement");
const Session = require("../models/session");

router.get("/", auth.verifyUser, (req, res) => {
  Session.find({})
    .then((session) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(session);
    })
    .catch((err) => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ success: false, message: err.message });
    });
});

router.post("/add-session", auth.verifyUser, auth.checkAdmin, (req, res) => {
  Session.create(req.body)
    .then((session) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(session);
    })
    .catch((err) => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ success: false, message: err.message });
    });
});

module.exports = router;
