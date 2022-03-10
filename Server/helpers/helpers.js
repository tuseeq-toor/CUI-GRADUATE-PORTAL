const Program = require("../models/program");
const Session = require("../models/session");
const Faculty = require("../models/faculty");
const User = require("../models/user");

// exports.checkUserRedirection = (req, res, next) => {
//   const user = req.user;

//   if (user.userRole.role === "Student") {
//     return "/students";
//   } else if (user.userRole.role === "Admin") {
//     return "/admin";
//   } else if (user.userRole.role === "MSCOR") {
//     return "/mscoordinator";
//   } else if (user.userRole.role === "GAC") {
//     return "/gac";
//   } else if (user.userRole.role === "PHDCOR") {
//     return "/admin";
//   } else if (user.userRole.role === "GO") {
//     return "/go";
//   }
// };

exports.studentSignUpNeeds = async (user) => {
  needs = {};
  let session = user.registrationNo.split("-")[0];
  console.log("session", session);
  needs.program = await Program.findOne(
    {
      programShortName: user.program,
    },
    { _id: 1 }
  );
  console.log("program" + user.program);

  /*  needs.supervisor = await Faculty.findOne(
    {
      username: user.supervisorName,
    },
    { _id: 1 }
  );
  needs.coSupervisor = await Faculty.findOne(
    {
      username: user.coSupervisorName,
    },
    { _id: 1 }
  ); */
  needs.session = await Session.findOne(
    {
      title: session,
    },
    { _id: 1 }
  );
  return needs;
};

exports.studentUpdateNeeds = async (req) => {
  const body = req.body;
  needs = {};
  needs.user = await User.findById({
    _id: req.user._id,
  });
  needs.student_id = needs.user.student_id;
  // needs.supervisor = await Faculty.findOne(
  //   {
  //     username: body.supervisorName,
  //   },
  //   { _id: 1 }
  // );
  // needs.coSupervisor = await Faculty.findOne(
  //   {
  //     username: body.coSupervisorName,
  //   },
  //   { _id: 1 }
  // );
  return needs;
};
