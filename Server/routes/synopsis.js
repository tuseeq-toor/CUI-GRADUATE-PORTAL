const express = require("express");
const router = express.Router();
const User = require("../models/user");
const auth = require("../auth/authenticate");
const multer = require("multer");
const Student = require("../models/student");
const SynopsisSubmission = require("../models/synopsisSubmission");
const path = require("path");
const thesisSubmission = require("../models/thesisSubmission");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /docx|pdf|doc/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Please upload pdf or word files", false);
  }
}
var uploadSynopsis = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).fields([{ name: "synopsisDocument" }, { name: "synopsisPresentation" }]);

var uploadThesis = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  },
}).fields([{ name: "thesisDocument" }, { name: "synopsisNotification" }]);

const SynopsisSchedule = require("../models/synopsisSchedule");

router.get("/", auth.verifyUser, (req, res) => {
  SynopsisSchedule.find({})
    .then((synopsisSchedule) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(synopsisSchedule);
    })
    .catch((err) => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ success: false, message: err.message });
    });
});

router.post(
  "/add-SynopsisSchedule",
  auth.verifyUser,
  auth.checkAdmin,
  (req, res) => {
    let body = req.body;
    SynopsisSchedule.create({ ...body, scheduledBy: req.user._id })
      .then((synopsisSchedule) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(synopsisSchedule);
      })
      .catch((err) => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).json({ success: false, message: err.message });
      });
  }
);

router.post(
  "/submit-synopsis",
  auth.verifyUser,
  auth.checkStudent,
  async (req, res) => {
    const studentId = req.user._id;
    uploadSynopsis(req, res, async function (err) {
      const { synopsisTitle, supervisor, coSupervisor, synopsisTrack } =
        req.body;

      console.log(req.body);
      console.log(req.files);
      if (err instanceof multer.MulterError) {
        console.log("mul", err);

        res.setHeader("Content-Type", "application/json");

        return res.status(500).json({ success: false, message: err });
      } else if (err) {
        console.log("500", err);
        res.setHeader("Content-Type", "application/json");

        return res.status(500).json({ success: false, message: err });
      } else {
        let s_id = await User.findById({ _id: supervisor }, { faculty_id: 1 });
        let cs_id = await User.findById(
          { _id: coSupervisor },
          { faculty_id: 1 }
        );

        SynopsisSubmission.create({
          student_id: studentId,
          supervisor_id: s_id.faculty_id,
          coSupervisor_id: cs_id.faculty_id,
          synopsisTitle,
          SpecilizationTrack: synopsisTrack,
          isActive: false,
          synopsisFileName: `public/uploads/${req.files["synopsisDocument"][0].filename}`,
          synopsisPresentationFileName: `public/uploads/${req.files["synopsisPresentation"][0].filename}`,
        })
          .then(() => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json({ success: true, message: "Submitted" });
          })
          .catch((err) => {
            console.log(err.message);
            res.setHeader("Content-Type", "application/json");
            res.status(500).json({ success: false, message: err.message });
          });
      }
    });
  }
);

router.post(
  "/submit-thesis",
  auth.verifyUser,
  auth.checkStudent,
  async (req, res) => {
    const studentId = req.user._id;
    uploadThesis(req, res, async function (err) {
      const { thesisTitle, supervisor, coSupervisor, thesisTrack } = req.body;

      console.log(req.body);
      console.log(req.files);
      if (err instanceof multer.MulterError) {
        console.log("mul", err);

        res.setHeader("Content-Type", "application/json");

        return res.status(500).json({ success: false, message: err });
      } else if (err) {
        console.log("500", err);
        res.setHeader("Content-Type", "application/json");

        return res.status(500).json({ success: false, message: err });
      } else {
        let s_id = await User.findById({ _id: supervisor }, { faculty_id: 1 });
        let cs_id = await User.findById(
          { _id: coSupervisor },
          { faculty_id: 1 }
        );

        thesisSubmission
          .create({
            student_id: studentId,
            supervisor_id: s_id.faculty_id,
            coSupervisor_id: cs_id.faculty_id,
            thesisTitle,
            SpecilizationTrack: thesisTrack,
            isActive: false,
            thesisFileName: `public/uploads/${req.files["thesisDocument"][0].filename}`,
            synopsisNotification: `public/uploads/${req.files["synopsisNotification"][0].filename}`,
          })
          .then(() => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json({ success: true, message: "Submitted" });
          })
          .catch((err) => {
            console.log(err.message);
            res.setHeader("Content-Type", "application/json");
            res.status(500).json({ success: false, message: err.message });
          });
      }
    });
  }
);

module.exports = router;
