import React from "react";
import ViewAnnouncement from "./ViewAnnouncement";
import ViewNotification from "./ViewNotification";
import { useSelector } from "react-redux";

const HomePhdCor = () => {
  const { user } = useSelector((state) => state.auth);
  const userRole = user.user.userRole[0].role;
  let userProgram;
  if (userRole === "STUDENT") {
    userProgram = user.user.student.program_id.programShortName;
    // console.log(userRole);
  }
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Welcome!</h1>
      <p> {`Your are logged in as PhD Coordinator`}</p>

      <h3> Announcement </h3>
      <ViewAnnouncement />
    </div>
  );
};

export default HomePhdCor;
