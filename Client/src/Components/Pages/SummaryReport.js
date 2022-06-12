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

export default function SummaryReport() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const [reportType, setReportType] = useState("Synopsis");
  const [selectedReport, setselectedReport] = useState([]);
  const [submittedSynopsis, setSubmittedSynopsis] = useState([]);
  const [submittedThesis, setSubmittedThesis] = useState([]);
  const [submittedReport, setSubmittedReport] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const alreadysubmittedSynopsis =
        await synopsisService.getSubmittedSynopsis();
      const alreadysubmittedThesis = await thesisService.getSubmittedThesis();

      setSubmittedSynopsis(alreadysubmittedSynopsis);
      setSubmittedThesis(alreadysubmittedThesis);

      if (reportType === "Synopsis") {
        setSubmittedReport(alreadysubmittedSynopsis);
      } else {
        setSubmittedReport(alreadysubmittedThesis);
      }

      setLoading(true);
    }
    fetchData();
  }, []);

  console.log(submittedSynopsis);
  console.log(submittedThesis);
  console.log(submittedReport);

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handleRegistrationNo = (e) => {
    setselectedReport([]);
    if (reportType === "Synopsis") {
      let array = submittedSynopsis.filter(
        (oneSynopsis) => e.target.value === oneSynopsis.synopsisStatus
      );
      setselectedReport(array);
      // if (array.length !== 0) {
      //   setIsSelected(true);
      // }
    } else {
      let array = submittedThesis.filter(
        (oneThesis) => e.target.value === oneThesis.thesisStatus
      );
      setselectedReport(array);
      // if (array.length !== 0) {
      //   setIsSelected(true);
      // }
    }
  };

  return (
    <>
      <Box sx={{ minWidth: 120, mb: 6 }}>
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
            <MenuItem value={"unscheduled"}>Unscheduled</MenuItem>
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
            <div ref={componentRef}>
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
                        report?.student_id?.profilePicture || profile
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
                        {report?.student_id?.username}
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
                      {report?.student_id?.registrationNo}
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
                        {report?.student_id?.fatherName}
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
                      {report?.supervisor_id?.fullName}
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
                    <td>{report?.student_id?.email}</td>
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
                    <td>{report?.student_id?.mobile}</td>
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
                    <td>{report?.student_id?.thesisTrack}</td>
                  </tr>

                  <tr
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
                      {reportType === "Synopsis" ? (
                        <>Synopsis Title</>
                      ) : (
                        <>Thesis Title</>
                      )}
                    </td>
                    <td>{report.thesisTitle || report.synopsisTitle}</td>
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
                      Registration Date
                    </td>
                    <td>{report?.student_id?.thesisRegistration}</td>
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
              <td> {selectedSchedule?.student_id?.reportTitle} </td>
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
                      {reportType === "Synopsis" ? (
                        <>Synopsis Status</>
                      ) : (
                        <>Thesis Status</>
                      )}
                    </td>

                    <td>{report.thesisStatus || report.synopsisStatus}</td>
                  </tr>
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
