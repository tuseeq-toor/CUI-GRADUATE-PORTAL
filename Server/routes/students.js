const express = require("express");
const router = express.Router();
const multer = require("multer");
const mongoose = require("mongoose");
const User = require("../models/user");
const Student = require("../models/student");
const auth = require("../auth/authenticate");
const helpers = require("../helpers/helpers");
const SynopsisSubmission = require("../models/synopsisSubmission");
const Notification = require("../models/notification");
const Announcement = require("../models/announcement");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
// var upload = multer({ storage: storage }).fields([
//   { name: "synopsisDocument" },
//   { name: "synopsisPresentation" },
// ]);
var upload = multer({ storage: storage }).fields([
  { name: "synopsisDocument" },
  { name: "synopsisPresentation" },
]);
//studentDashboard Route == /students

router.get("/", auth.verifyUser, auth.checkStudent, (req, res) => {
  User.find({ _id: req.user._id }, { hash: 1, salt: 1, password: 1 })
    .populate({
      path: "student_id",
      populate: [
        {
          path: "program_id",
          model: "Program",
        },
        {
          path: "synopsisSession_id",
          model: "Session",
        },
        {
          path: "supervisor_id",
          model: "Faculty",
        },
        {
          path: "coSupervisor_id",
          model: "Faculty",
        },
      ],
    })
    .exec()
    .then((student) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(student);
    })
    .catch((err) => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ success: false, message: err.message });
    });
});

router.get("/supervisors", auth.verifyUser, auth.checkStudent, (req, res) => {
  console.log("supervisors");
  User.find(
    { "userRole.role": "SUPERVISOR", "userRole.enable": true },
    { username: 1 }
  )

    .then((supervisors) => {
      console.log("here");
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({ success: true, supervisors });
    })
    .catch((err) => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ success: false, message: err.message });
    });
});
//signleStudent by ID route== students/:id

router.get("/:id", auth.verifyUser, auth.checkStudent, (req, res) => {
  Student.find({ _id: req.params._id })
    .then((students) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json(students);
    })
    .catch((err) => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ success: false, message: err.message });
    });
});
//get supervisors and coSupervisors

//update student profile route== students/:id

router.put("/:id", auth.verifyUser, auth.checkStudent, async (req, res) => {
  const body = req.body;
  let needs = await helpers.studentUpdateNeeds(req);
  await User.updateOne(
    { _id: req.user._id },
    { $set: { username: body.username } }
  )
    .then(async () => {
      await Student.findOneAndUpdate(
        { _id: needs.student_id },
        {
          $set: {
            ...body,
            supervisor_id: needs.supervisor._id,
            coSupervisor_id: needs.supervisor._id,
          },
        },
        { upsert: true }
      )
        .then((faculty) => {
          res.setHeader("Content-Type", "application/json");
          res.status(200).json({ beforeUpdate: faculty, afterUpdate: body });
        })
        .catch((err) => {
          res.setHeader("Content-Type", "application/json");
          res.status(500).json({ success: false, message: err.message });
        });
    })
    .catch((err) => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ success: false, message: err.message });
    });
});

router.post(
  "/submit-synopsis",
  auth.verifyUser,
  auth.checkStudent,
  async (req, res) => {
    const studentId = req.user._id;
    upload(req, res, async function (err) {
      const { synopsisTitle, supervisor, coSupervisor, synopsisTrack } =
        req.body;

      console.log(req.body);
      console.log(req.files);
      if (err instanceof multer.MulterError) {
        console.log(err);
        return res.status(500).json(err);
      } else if (err) {
        console.log(err);

        return res.status(500).json(err);
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
          .then((synopsis) => {
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

  (req, res, next) => {
    const body = req.body;
    const student = req.user._id;
    SynopsisSubmission.create({ ...body, student_id: student })
      .then((synopsis) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ success: true, message: "Submitted" });
      })
      .catch((err) => {
        res.setHeader("Content-Type", "application/json");
        res.status(500).json({ success: false, message: err.message });
      });
  }
);
//view notifications
router.get("/notifications", auth.checkStudent, (req, res) => {
  Notification.find({ student_id: req.user._id })
    .then((notifications) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({ success: true, notifications });
    })
    .catch((err) => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ success: false, message: err.message });
    });
});
//view announcements
router.get("/announcements", auth.checkStudent, (req, res) => {
  Announcement.find()
    .then((announcements) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({ success: true, announcements });
    })
    .catch((err) => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ success: false, message: err.message });
    });
});

//change password
router.post("/change-password", auth.checkStudent, (req, res) => {
  req.user
    .changePassword(req.body.oldPassword, req.body.newPassword)
    .then((user) => {
      Student.findOne({ _id: user.student_id })
        .then((student) => {
          res.setHeader("Content-Type", "application/json");
          res.status(200).json({ success: true, message: "Password Updated" });
        })
        .catch((err) => {
          res.setHeader("Content-Type", "application/json");
          res.status(500).json({ success: false, message: err.message });
        });
    })
    .catch((err) => {
      res.setHeader("Content-Type", "application/json");
      res.status(500).json({ success: false, message: err.message });
    });
});

module.exports = router;
