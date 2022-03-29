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
const path = require("path");
const thesisSubmission = require("../models/thesisSubmission");
const session = require("../models/session");
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

var uploadProfile = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: (req, file, cb) => {
    // Allowed ext
    const filetypes = /jpeg|png|jgp/;
    // Check ext
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb("Error: File Format not Supported", false);
    }
  },
}).single("profilePic");

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
    .populate("faculty_id")
    .exec()

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

router.patch("/", auth.verifyUser, auth.checkStudent, async (req, res) => {
  uploadProfile(req, res, async function (err) {
    const body = req.body;

    if (err instanceof multer.MulterError) {
      console.log("mul", err);

      res.setHeader("Content-Type", "application/json");

      return res.status(500).json({ success: false, message: err });
    } else if (err) {
      res.setHeader("Content-Type", "application/json");

      return res.status(500).json({ success: false, message: err });
    } else {
      let needs = await helpers.studentUpdateNeeds(req);
      await User.findOneAndUpdate(
        { _id: req.user._id },
        { $set: { username: body.name } }
      )
        .then(async () => {
          await Student.findOneAndUpdate(
            { _id: needs.student_id },
            {
              $set: {
                username: body.name,
                fatherName: body.fatherName,
                mobile: body.mobile,
                supervisor_id: body.supervisor,
                coSupervisor_id: body.coSupervisor,
                synopsisTitle: body.synopsisTitle,
                thesisRegistration: body.thesisRegistration,
                thesisTrack: body.thesisTrack,
                profilePic: `public/uploads/${req.file.filename}`,
              },
            },
            { upsert: true }
          )
            .then((faculty) => {
              res.setHeader("Content-Type", "application/json");
              res
                .status(200)
                .json({ beforeUpdate: faculty, afterUpdate: body });
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
    }
  });
});

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

//view notifications
router.get("/notifications", auth.verifyUser, auth.checkStudent, (req, res) => {
  Notification.find({ sentTo: req.user._id })
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
router.get("/announcements", auth.verifyUser, auth.checkStudent, (req, res) => {
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

//get student session

router.get("/session/:stud_id", (req, res) => {
  Student.findOne({ synopsisSession_id: req.params.stud_id })
    .populate(synopsisSession_id)
    .select({ title: 1 })
    .exec()
    .then((session) => {
      res.setHeader("Content-Type", "application/json");
      res.status(200).json({ success: true, session });
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
