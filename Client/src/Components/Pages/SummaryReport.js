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
import sessionsService from "../../API/sessions";

export default function SummaryReport() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const [reportType, setReportType] = useState("Synopsis");
  const [selectedReport, setselectedReport] = useState([]);
  const [submittedSynopsis, setSubmittedSynopsis] = useState([]);
  const [submittedThesis, setSubmittedThesis] = useState([]);
  const [submittedReport, setSubmittedReport] = useState([]);
  const [filteredSynopsis, setFilteredSynopsis] = useState([]);
  const [filteredThesis, setFilteredThesis] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [students, setStudents] = useState([]);
  const [autocompleteSessionValue, setAutocompleteSessionValue] =
    useState(null);

  useEffect(() => {
    async function fetchData() {
      const sessions = await sessionsService.getSessions();
      const students = await studentService.getStudents();
      const submittedSynopsis = await synopsisService.getSubmittedSynopsis();
      const submittedThesis = await thesisService.getSubmittedThesis();

      setStudents(students);
      setSessions(sessions);
      setSubmittedSynopsis(submittedSynopsis);
      setSubmittedThesis(submittedThesis);

      if (reportType === "Synopsis") {
        setSubmittedReport(submittedSynopsis);
      } else {
        setSubmittedReport(submittedThesis);
      }

      setLoading(true);
    }
    fetchData();
  }, [reportType]);

  console.log(submittedSynopsis);
  console.log(submittedThesis);
  console.log(submittedReport);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  console.log(selectedReport);
  const handleRegistrationNo = (e) => {
    // setselectedReport([]);
    console.log(filteredSynopsis);
    console.log(filteredThesis);

    if (filteredSynopsis.length > 0 || filteredThesis.length > 0) {
      filteredSynopsis.forEach((synopsis) => {
        if (autocompleteSessionValue === synopsis.student_id.session_id.title) {
          if (reportType === "Synopsis") {
            let array = filteredSynopsis.filter(
              (oneSynopsis) => e.target.value === oneSynopsis.synopsisStatus
            );
            setselectedReport(array);
          } else {
            let array = filteredThesis.filter(
              (oneThesis) => e.target.value === oneThesis.thesisStatus
            );
            setselectedReport(array);
          }
        }
      });
      filteredThesis.forEach((thesis) => {
        if (autocompleteSessionValue === thesis.student_id.session_id.title) {
          if (reportType !== "Synopsis") {
            let array = filteredThesis.filter(
              (oneSynopsis) => e.target.value === oneSynopsis.synopsisStatus
            );
            setselectedReport(array);
          } else {
            let array = filteredThesis.filter(
              (oneThesis) => e.target.value === oneThesis.thesisStatus
            );
            setselectedReport(array);
          }
        }
      });

      if (reportType === "Synopsis") {
        let array = filteredSynopsis.filter(
          (oneSynopsis) => e.target.value === oneSynopsis.synopsisStatus
        );
        setselectedReport(array);
      } else {
        let array = filteredThesis.filter(
          (oneThesis) => e.target.value === oneThesis.thesisStatus
        );
        setselectedReport(array);
      }
    } else {
      if (reportType === "Synopsis") {
        let array = submittedSynopsis.filter(
          (oneSynopsis) => e.target.value === oneSynopsis.synopsisStatus
        );
        setselectedReport(array);
      } else {
        let array = submittedThesis.filter(
          (oneThesis) => e.target.value === oneThesis.thesisStatus
        );
        setselectedReport(array);
      }
    }
  };
  console.log(selectedReport);

  const handleStudentSessions = (selectedSession) => {
    setFilteredSynopsis([]);
    setFilteredThesis([]);
    let selectedStudents = [];

    students.forEach((student) => {
      if (student?.session_id?.title === selectedSession?.title) {
        let filteredSynopsis = submittedSynopsis.filter(
          (synopsis) => synopsis.student_id._id === student._id
        );
        let filteredThesis = submittedThesis.filter(
          (synopsis) => synopsis.student_id._id === student._id
        );
        console.log(filteredSynopsis);
        console.log(filteredThesis);

        if (filteredSynopsis.length > 0 || filteredThesis.length > 0) {
          selectedStudents.push({
            student_id:
              filteredSynopsis[0].student_id ||
              filteredThesis[0].student_id ||
              [],
            synopsis: filteredSynopsis[0] || [],
            thesis: filteredThesis[0] || [],
          });
        }
      }
    });
    console.log(selectedStudents);

    setFilteredSynopsis(selectedStudents.map((student) => student.synopsis));
    setFilteredThesis(selectedStudents.map((student) => student.thesis));

    if (selectedStudents.length === 0) {
      setselectedReport([]);
    }

    console.log(filteredSynopsis);
    console.log(filteredThesis);
  };

  const defaultProps = {
    options: sessions,
    getOptionLabel: (session) => session?.title || "",
  };

  return (
    <>
      <Box sx={{ minWidth: 120, mb: 6 }}>
        <Typography
          sx={{ mb: 4, color: "#572E74", fontWeight: "500" }}
          textAlign={"center"}
          variant="h5"
        >
          Summary Report
        </Typography>
        <FormControl sx={{ mb: 1 }}>
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
        </FormControl>
        {/* <Box sx={{ mb: 4 }}>
 
          <Autocomplete
            {...defaultProps}
            id="controlled-demo"
            value={autocompleteSessionValue}
            onCl
            onChange={(value, newValue) => {
              let session = newValue;
              console.log(session);
              setAutocompleteSessionValue(session);
              handleStudentSessions(session);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Session"
                variant="outlined"
                color="secondary"
              />
            )}
          />
        </Box> */}
        <FormControl fullWidth>
          <InputLabel color="secondary">Select Status</InputLabel>
          <Select
            color="secondary"
            value={selectedReport.thesisStatus || selectedReport.syopsisStatus}
            name="thesisStatus"
            label="Select Status"
            onChange={handleRegistrationNo}
          >
            <MenuItem value={"Synopsis Evaluation"}>
              Synopsis Evaluation
            </MenuItem>
            <MenuItem value={"Internal Evaluation"}>
              Internal Evaluation
            </MenuItem>
            <MenuItem value={"External Evaluation"}>
              External Evaluation
            </MenuItem>
            <MenuItem value={"Pass Out"}>Pass Out</MenuItem>
            <MenuItem value={"Dismissed"}>Dismissed</MenuItem>
            <MenuItem value={"Synopsis Not Submitted for GAC"}>
              Synopsis Not Submitted for GAC
            </MenuItem>
            <MenuItem value={"Unscheduled"}>Unscheduled</MenuItem>
            <MenuItem value={"Scheduled"}>Scheduled</MenuItem>
            <MenuItem value={"Conducted"}>Conducted</MenuItem>
            <MenuItem value={"Approved By GAC"}>Approved By GAC</MenuItem>
            <MenuItem value={"Minor Changes"}>Minor Changes</MenuItem>
            <MenuItem value={"Synopsis Not Submitted for DEAN office"}>
              Synopsis Not Submitted for DEAN office
            </MenuItem>
            <MenuItem value={"Synopsis Submitted for DEAN office"}>
              Synopsis Submitted for DEAN office
            </MenuItem>
            <MenuItem value={"Forwarded to DEAN Office "}>
              Forwarded to DEAN Office
            </MenuItem>
            <MenuItem value={"Changes suggested by DEAN office"}>
              Changes suggested by DEAN office
            </MenuItem>
            <MenuItem value={"Approved By DEAN"}>Approved By DEAN</MenuItem>
            <MenuItem value={"Thesis Not Submitted for Internal"}>
              Thesis Not Submitted for Internal
            </MenuItem>
            <MenuItem value={"Thesis Submitted for Internal"}>
              Thesis Submitted for Internal
            </MenuItem>
            <MenuItem value={"Accepted by Internal"}>
              Accepted by Internal
            </MenuItem>
            <MenuItem value={"Thesis not Submitted for Internal"}>
              Thesis not Submitted for Internal
            </MenuItem>
            <MenuItem value={"Thesis Submitted for Internal"}>
              Thesis Submitted for Internal
            </MenuItem>
            <MenuItem value={"Deffered"}>Deffered</MenuItem>
            <MenuItem value={"Accepted"}>Accepted</MenuItem>
            <MenuItem value={"Major Changes"}>Major Changes</MenuItem>
            <MenuItem value={"Rejected"}>Rejected</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {selectedReport.map((report) => {
        return (
          <>
            <div ref={componentRef} className="supervisorWiseReport">
              <Paper
                variant="outlined"
                elevation={3}
                key={report?.student_id?._id}
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
                              report?.student_id?.profilePicture || ""
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
                      <td>{report?.student_id?.username}</td>
                      <td
                        valign="middle"
                        style={{
                          backgroundColor: "#E9ECF1",
                          fontWeight: "bold",
                        }}
                      >
                        Email
                      </td>
                      <td>{report?.student_id?.email}</td>
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
                      <td>{report?.student_id?.fatherName}</td>
                      <td
                        valign="middle"
                        style={{
                          backgroundColor: "#E9ECF1",
                          fontWeight: "bold",
                        }}
                      >
                        Supervisor
                      </td>
                      <td>{report?.student_id?.supervisor_id?.username}</td>
                    </tr>
                    <tr
                      style={{ color: "#333333", backgroundColor: "#F7F6F3" }}
                    >
                      <td
                        valign="middle"
                        style={{
                          backgroundColor: "#E9ECF1",
                          fontWeight: "bold",
                        }}
                      >
                        Registration No.
                      </td>
                      <td>{report?.student_id?.registrationNo}</td>
                      <td
                        valign="middle"
                        style={{
                          backgroundColor: "#E9ECF1",
                          fontWeight: "bold",
                        }}
                      >
                        Mobile No.
                      </td>
                      <td>{report?.student_id?.mobile}</td>
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
                      <td>{report?.student_id?.thesisRegistration}</td>
                      <td
                        valign="middle"
                        style={{
                          backgroundColor: "#E9ECF1",
                          fontWeight: "bold",
                        }}
                      >
                        Track
                      </td>
                      <td>{report?.student_id?.thesisTrack}</td>
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
                        {reportType === "Synopsis" ? (
                          <>Synopsis Status</>
                        ) : (
                          <>Thesis Status</>
                        )}
                      </td>
                      <td>{report.thesisStatus || report.synopsisStatus}</td>
                      <td
                        valign="middle"
                        style={{
                          backgroundColor: "#E9ECF1",
                          fontWeight: "bold",
                        }}
                      >
                        {reportType === "Synopsis" ? (
                          <>Synopsis Title</>
                        ) : (
                          <>Thesis Title</>
                        )}
                      </td>
                      <td>{report.thesisTitle || report.synopsisTitle}</td>
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
