import React, { useState, useEffect, useRef } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import studentService from "../../API/students";
import profile from "../../../src/avatar-1.jpg";
import synopsisService from "../../API/synopsis";
import "../../Components/UI/ActiveTab.css";

import {
  Autocomplete,
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import thesisService from "../../API/thesis";
import { useReactToPrint } from "react-to-print";
import adminService from "../../API/admin";

export default function SuperivorWiseReports() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [autocompleteStudentValue, setAutocompleteStudentValue] =
    useState(null);
  const [supervisoryCommittee, setSupervisoryCommittee] = useState([]);
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [supervisors, setSupervisors] = useState([]);

  async function getSupervisoryCommittee() {
    const res = await adminService.getSupervisoryCommittee();

    console.log(res);

    console.log("reshere", res);

    const committeeData = res.data.map((data) => data.committee);

    const data = res?.data?.map((res) => {
      let members = res?.committee.map((data) => data.username);

      return {
        RegistrationNo: res.student_id?.registrationNo,
        StudentName: res.student_id?.username,
        committeeMembers: members,
        committee: res.committee,
        student_id: res.student_id,
        // id: res?._id,
      };
    });

    setCommitteeMembers(committeeData);

    setSupervisoryCommittee(data);
  }

  const getSupervisors = async () => {
    let data = await studentService.getSupervisors();

    console.table("SubmissionM", data?.supervisors);
    setSupervisors(data?.supervisors);
  };
  useEffect(() => {
    getSupervisors();
    getSupervisoryCommittee();
  }, []);

  console.log(committeeMembers);
  console.log(supervisoryCommittee);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleSupervisorStudents = (selectedSupervisor) => {
    setFilteredStudents([]);
    let supervisorStudents = [];

    supervisoryCommittee.forEach((committee) => {
      let supervisor = committee.committeeMembers.filter(
        (memberName) => selectedSupervisor.username === memberName
      );
      console.log(supervisor);
      if (supervisor.length > 0) {
        supervisorStudents.push(committee);
      }
    });

    console.log(supervisorStudents);
    setFilteredStudents(supervisorStudents);
  };

  const defaultProps = {
    options: supervisors,
    getOptionLabel: (supervisor) => supervisor?.username || "",
  };
  const defaultstudentProps = {
    options: filteredStudents,
    getOptionLabel: (student) => student?.StudentName || "",
  };
  console.log(selectedStudent);
  return (
    <>
      <Box sx={{ minWidth: 120, mb: 6 }}>
        <Box sx={{ mb: 4 }}>
          {/* <label>Select Supervisor</label> */}
          <Autocomplete
            {...defaultProps}
            id="controlled-demo"
            value={autocompleteValue}
            onCl
            onChange={(value, newValue) => {
              let supervisor = newValue;
              console.log(supervisor);
              setAutocompleteValue(supervisor);
              handleSupervisorStudents(supervisor);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Supervisor"
                variant="outlined"
                color="secondary"
              />
            )}
          />
        </Box>
        <Box sx={{ mb: 4 }}>
          {/* <label>Filter Student</label> */}
          <Autocomplete
            {...defaultstudentProps}
            id="controlled-demo"
            value={autocompleteStudentValue}
            onChange={(value, newValue) => {
              let student = newValue;
              console.log(student);
              setAutocompleteStudentValue(student);

              if (student) {
                setSelectedStudent([student]);
              } else {
                setSelectedStudent([]);
              }
            }}
            /* onClose={() => {
              setAutocompleteValue("");
              console.log(autocompleteValue);
            }} */
            renderInput={(params) => (
              <TextField
                {...params}
                label="Filter Student"
                variant="outlined"
                color="secondary"
              />
            )}
          />
        </Box>
        {/* <FormControl sx={{ mb: 1 }}>
          <FormLabel color="secondary">Student</FormLabel>
          <RadioGroup
            row
            name="studentType"
            value={reportType}
            onChange={(e) => {
              setReportType(e.target.value);
              if (e.target.value === "Synopsis") {
                setselectedReport([]);
                setSubmittedReport(submittedSynopsis);
              } else {
                setselectedReport([]);
                setSubmittedReport(submittedThesis);
              }
            }}
          >
            <FormControlLabel
              value="Synopsis"
              control={<Radio color="secondary" />}
              label="Synopsis"
            />
            <FormControlLabel
              value="Thesis"
              control={<Radio color="secondary" />}
              label="Thesis"
            />
          </RadioGroup>
        </FormControl> */}
      </Box>

      {/* {(filteredStudents || selectedStudent).map((student) => { */}
      {(
        (selectedStudent.length > 0 && selectedStudent) ||
        filteredStudents
      ).map((student) => {
        return (
          <>
            <div key={student?.student_id?._id} ref={componentRef}>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 1rem",
                }}
              >
                <div>
                  <img
                    src={
                      process.env.REACT_APP_URL +
                        "/" +
                        student?.student_id?.profilePicture || profile
                    }
                    alt="Student Profile"
                    style={{
                      height: "80px",
                      width: "80px",
                      borderRadius: "100%",
                      marginBottom: "1rem",
                    }}
                  />

                  <div
                    style={{
                      margin: "0",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "20rem",
                        margin: "0",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <h3 style={{ margin: "0 1rem 0 0" }}>Name:</h3>
                      <p style={{ margin: "0" }}>
                        {student?.student_id?.username}
                      </p>
                    </div>
                    <h3
                      style={{
                        marginRight: "1rem",
                        marginTop: "0",
                        marginBottom: "0",
                      }}
                    >
                      Registration Number:
                    </h3>
                    <p style={{ marginTop: "0", marginBottom: "0" }}>
                      {student?.student_id?.registrationNo}
                    </p>
                  </div>
                  <div
                    style={{
                      margin: "1rem 0 0 0",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "20rem",
                        margin: "0",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <h3 style={{ margin: "0 1rem 0 0" }}>Father Name:</h3>
                      <p style={{ margin: "0" }}>
                        {student?.student_id?.fatherName}
                      </p>
                    </div>
                    <h3
                      style={{
                        marginRight: "1rem",
                        marginTop: "0",
                        marginBottom: "0",
                      }}
                    >
                      Supervisor:
                    </h3>
                    <p style={{ marginTop: "0", marginBottom: "0" }}>
                      {student?.student_id?.supervisor_id?.fullName}
                    </p>
                  </div>
                </div>
              </Box>
              <table
                cellSpacing={0}
                cellPadding={4}
                style={{
                  color: "#333333",
                  borderCollapse: "separate",
                  margin: "1rem",
                }}
              >
                <tbody>
                  <tr
                    style={{
                      color: "#333333",
                    }}
                  >
                    <td
                      valign="top"
                      style={{
                        fontWeight: "bold",
                        width: "20%",
                      }}
                    ></td>
                  </tr>

                  <tr
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    <td
                      valign="top"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
                        width: "20%",
                      }}
                    >
                      Email
                    </td>
                    <td>{student?.student_id?.email}</td>
                  </tr>
                  <tr style={{ color: "#333333", backgroundColor: "#F7F6F3" }}>
                    <td
                      valign="top"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
                        width: "20%",
                      }}
                    >
                      Mobile No.
                    </td>
                    <td>{student?.student_id?.mobile}</td>
                  </tr>
                  <tr
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    <td
                      valign="top"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
                        width: "20%",
                      }}
                    >
                      Track
                    </td>
                    <td>{student?.student_id?.thesisTrack}</td>
                  </tr>

                  {/* <tr
                    style={{
                      color: "#333333",
                      backgroundColor: "#F7F6F3",
                    }}
                  >
                    <td
                      valign="top"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
                        width: "20%",
                      }}
                    >
                      {studentType === "Synopsis" ? (
                        <>Synopsis Title</>
                      ) : (
                        <>Thesis Title</>
                      )}
                    </td>
                    <td>{student.thesisTitle || student.synopsisTitle}</td>
                  </tr> */}
                  <tr
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    <td
                      valign="top"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
                        width: "20%",
                      }}
                    >
                      Registration Date
                    </td>
                    <td>{student?.student_id?.thesisRegistration}</td>
                  </tr>
                  {/* <tr style={{ color: "#333333", backgroundColor: "#F7F6F3" }}>
              <td
                valign="top"
                style={{
                  backgroundColor: "#E9ECF1",
                  fontWeight: "bold",
                  width: "20%",
                }}
              >
                External
              </td>
              <td> {selectedSchedule?.student_id?.studentTitle} </td>
            </tr> */}
                  {/* <tr
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    <td
                      valign="top"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
                        width: "20%",
                      }}
                    >
                      {reportType === "Synopsis" ? (
                        <>Synopsis Status</>
                      ) : (
                        <>Thesis Status</>
                      )}
                    </td>

                    <td>{report.thesisStatus || report.synopsisStatus}</td>
                  </tr> */}
                </tbody>
              </table>
              <div
                style={{
                  width: "10%",
                  minWidth: "6rem",
                  maxWidth: "10rem",
                  margin: "2rem auto",
                  borderTop: "8px dotted #572E74",
                }}
              />
            </div>
          </>
        );
      })}
      <Button
        type="button"
        variant="contained"
        color="secondary"
        sx={{ mb: 2 }}
        onClick={handlePrint}
      >
        Print PDF
      </Button>
    </>
  );
}
