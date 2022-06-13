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
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
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
  const [submittedSynopsis, setSubmittedSynopsis] = useState([]);
  const [submittedThesis, setSubmittedThesis] = useState([]);

  async function getSupervisoryCommittee() {
    const res = await adminService.getSupervisoryCommittee();
    const submittedSynopsis = await synopsisService.getSubmittedSynopsis();
    const submittedThesis = await thesisService.getSubmittedThesis();

    setSubmittedSynopsis(submittedSynopsis);
    setSubmittedThesis(submittedThesis);

    console.log(submittedSynopsis);
    console.log(submittedThesis);

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
      let filteredSynopsis = submittedSynopsis.filter(
        (synopsis) => synopsis.student_id._id === committee.student_id._id
      );
      let filteredThesis = submittedThesis.filter(
        (synopsis) => synopsis.student_id._id === committee.student_id._id
      );
      console.log(supervisor);
      console.log(filteredSynopsis);
      if (supervisor.length > 0) {
        if (filteredSynopsis.length > 0 || filteredThesis.length > 0) {
          supervisorStudents.push({
            student_id:
              filteredSynopsis[0].student_id ||
              filteredThesis[0].student_id ||
              null,
            synopsis: filteredSynopsis[0] || null,
            thesis: filteredThesis[0] || null,
          });
        }
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
    getOptionLabel: (student) => student?.student_id?.username || "",
  };
  console.log(selectedStudent);
  return (
    <>
      <Box sx={{ minWidth: 120, mb: 2 }}>
        <Typography
          sx={{ mb: 4, color: "#572E74", fontWeight: "500" }}
          textAlign={"center"}
          variant="h5"
        >
          Supervisor Wise Report
        </Typography>
        <Box sx={{ mb: 4 }}>
          {/* <label>Select Supervisor</label> */}
          <Autocomplete
            {...defaultProps}
            id="controlled-demo"
            value={autocompleteValue}
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
        <Box>
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

      {/* checks if selectedStudent is empty then maps filteredStudents else maps selectedStudent */}
      <div ref={componentRef} className="supervisorWiseReport">
        {(
          (selectedStudent.length > 0 && selectedStudent) ||
          filteredStudents
        ).map((student) => {
          return (
            <Paper
              variant="outlined"
              elevation={3}
              key={student?.student_id?._id}
              style={{
                display: "grid",
                placeItems: "center",
                // placeContent: "center",
                marginBottom: "2rem",
              }}
            >
              <table
                cellSpacing={4}
                cellPadding={6}
                style={{
                  color: "#333333",
                  borderCollapse: "separate",
                  padding: ".5rem",
                  /* margin: "1rem", */
                  /* border: "2px solid #572E74",
                  borderRadius: "6px", */
                }}
              >
                <colgroup className="cols">
                  <col className="col1" />
                  <col className="col2" />
                  <col className="col3" />
                  <col className="col4" />
                </colgroup>
                <tbody>
                  <tr>
                    <td>
                      <img
                        src={
                          process.env.REACT_APP_URL +
                            "/" +
                            student?.student_id?.profilePicture || ""
                        }
                        alt="Student Profile"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          objectFit: "cover",
                          height: "8rem",
                          width: "8rem",
                          borderRadius: "100%",
                        }}
                      />
                    </td>
                  </tr>
                  <tr
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    <td
                      valign="middle"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
                      }}
                    >
                      Name
                    </td>
                    <td>{student?.student_id?.username}</td>
                    <td
                      valign="middle"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
                      }}
                    >
                      Email
                    </td>
                    <td>{student?.student_id?.email}</td>
                  </tr>
                  <tr
                    style={{
                      backgroundColor: "white",
                    }}
                  >
                    <td
                      valign="middle"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
                      }}
                    >
                      Father Name
                    </td>
                    <td>{student?.student_id?.fatherName}</td>
                    <td
                      valign="middle"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
                      }}
                    >
                      Supervisor
                    </td>
                    <td>{student?.student_id?.supervisor_id?.username}</td>
                  </tr>
                  <tr style={{ color: "#333333", backgroundColor: "#F7F6F3" }}>
                    <td
                      valign="middle"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
                      }}
                    >
                      Registration No.
                    </td>
                    <td>{student?.student_id?.registrationNo}</td>
                    <td
                      valign="middle"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
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
                      valign="middle"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
                      }}
                    >
                      Registration Date
                    </td>
                    <td>{student?.student_id?.thesisRegistration}</td>
                    <td
                      valign="middle"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
                      }}
                    >
                      Track
                    </td>
                    <td>{student?.student_id?.thesisTrack}</td>
                  </tr>

                  <tr
                    style={{
                      color: "#333333",
                      backgroundColor: "#F7F6F3",
                    }}
                  >
                    <td
                      valign="middle"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
                      }}
                    >
                      Synopsis Title
                    </td>
                    <td>{student?.synopsis?.synopsisTitle || "-"}</td>
                    <td
                      valign="middle"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
                      }}
                    >
                      Synopsis Status
                    </td>
                    <td>
                      {student?.synopsis?.synopsisStatus || "Not Submitted"}
                    </td>
                  </tr>
                  <tr
                    style={{
                      color: "#333333",
                      backgroundColor: "#F7F6F3",
                    }}
                  >
                    <td
                      valign="middle"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
                      }}
                    >
                      Thesis Title
                    </td>
                    <td>{student?.thesis?.thesisTitle || "-"}</td>
                    <td
                      valign="middle"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
                      }}
                    >
                      Thesis Status
                    </td>
                    <td>{student?.thesis?.thesisStatus || "Not Submitted"}</td>
                  </tr>
                  {/* <tr style={{ color: "#333333", backgroundColor: "#F7F6F3" }}>
              <td
                valign="middle"
                style={{
                  backgroundColor: "#E9ECF1",
                  fontWeight: "bold",
                  
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
                      valign="middle"
                      style={{
                        backgroundColor: "#E9ECF1",
                        fontWeight: "bold",
                        
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
              {/* <div
                style={{
                  width: "100%",
                  // minWidth: "6rem",
                  // maxWidth: "10rem",
                  margin: "2rem auto",
                  borderTop: "2px Dashed #572E74",
                }}
              /> */}
            </Paper>
          );
        })}
      </div>
      <Button
        type="button"
        variant="contained"
        color="secondary"
        sx={{ mb: 2, mt: 2 }}
        onClick={handlePrint}
      >
        Print PDF
      </Button>
    </>
  );
}
