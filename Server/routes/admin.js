const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Student = require("../models/student");
const auth = require("../auth/authenticate");
const helpers = require("../helpers/helpers");
const SynopsisSubmission = require("../models/synopsisSubmission");
const Notification = require("../models/notification");
const Announcement = require("../models/announcement");

router.get("/", auth.verifyUser, auth.checkAdmin, (req, res) => {
  User.find({ _id: req.user._id }, { hash: 1, salt: 1, password: 1 })
    .populate("faculty_id")
    .exec()
    .then((admin) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(admin);
    })
    .catch((err) => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ success: false, message: err.message });
    });
});
