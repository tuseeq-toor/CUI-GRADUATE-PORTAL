import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import studentService from "../../API/students";
import profile from "../../../src/avatar-1.jpg";
import synopsisService from "../../API/synopsis";
import { Autocomplete, TextField } from "@mui/material";
import { useSelector } from "react-redux";

export default function SuperivorReport() {
  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const [autocompleteValue, setAutocompleteValue] = useState(null);
  const [schedules, setSchedules] = useState([]);

  const [hasEvaluatedSynopsis, setHasEvaluatedSynopsis] = useState(null);
  const [evaluations, setEvaluations] = useState([]);
  const [selectedSynopsis, setSelectedSynopsis] = useState([]);
  const [selectedSchedule, setSelectedSchedule] = useState({});
  const [submittedSynopsis, setSubmittedSynopsis] = useState({});
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const schd = await synopsisService.getSynopsisSchedules();
      const alreadyevaluatedSynopsis =
        await synopsisService.getSynopsisEvaluations();
      const alreadysubmittedSynopsis =
        await synopsisService.getSubmittedSynopsis();
      setEvaluations(alreadyevaluatedSynopsis);
      setSchedules(schd);
      setSubmittedSynopsis(alreadysubmittedSynopsis);

      setLoading(true);
    }
    fetchData();
  }, []);

  const handleRegistrationNo = (reg) => {
    setHasEvaluatedSynopsis(false);

    schedules.forEach((oneSchedule) => {
      if (reg === oneSchedule?.student_id?.registrationNo) {
        evaluations.forEach((evaluatedSynopsis) => {
          if (evaluatedSynopsis.schedule_id) {
            if (evaluatedSynopsis.schedule_id._id === oneSchedule._id) {
              if (evaluatedSynopsis.evaluator_id._id === user.user._id) {
                console.log(true);
                setHasEvaluatedSynopsis(true);
              }
            }
          }
        });

        setSelectedSchedule(oneSchedule);

        console.log("Selected Schedule", selectedSchedule);
        setData({ ...data, schedule_id: oneSchedule._id });

        submittedSynopsis.forEach((oneSynopsis) => {
          if (
            selectedSchedule.student_id?._id ===
            submittedSynopsis.student_id?._id
          ) {
            console.log("Selected Synopsis", oneSynopsis);
            setSelectedSynopsis(oneSynopsis);
          }
        });
      }
    });
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    console.log(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await synopsisService.addEvaluation(data);

    // synopsisService.updateEvaluation({
    //   ...data,
    //   synopsisEvaluation_id: res.data.synopsisEvaluation._id,
    //   evaluationStatus: res.data.evaluationStatus._id,
    // });
    // alert(JSON.stringify(data));
  };

  const defaultProps = {
    options: schedules,
    getOptionLabel: (schedule) => schedule?.student_id?.registrationNo || "",
  };

  return (
    <>
      <Box sx={{ minWidth: 120, mb: 6 }}>
        <Autocomplete
          {...defaultProps}
          id="controlled-demo"
          value={autocompleteValue}
          onChange={(value, newValue) => {
            let registrationNo = newValue?.student_id?.registrationNo;
            setAutocompleteValue(newValue);

            handleRegistrationNo(registrationNo);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              variant="outlined"
              color="secondary"
            />
          )}
        />
      </Box>

      <div>
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
              src={selectedSchedule?.student_id?.profilePicture || profile}
              alt=""
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
                  {selectedSchedule?.student_id?.username}
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
                {selectedSchedule?.student_id?.registrationNo}
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
                  {selectedSchedule?.student_id?.fatherName}
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
                {selectedSynopsis?.supervisor_id?.fullName}
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
                    Registration No
                  </td>
                  <td>{selectedSchedule?.student_id?.registrationNo}</td>
                </tr>
                <tr style={{ backgroundColor: "White" }}>
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Name
                  </td>
                  <td>{selectedSchedule?.student_id?.username}</td>
                </tr> */}

            {/* <tr style={{ color: "#333333", backgroundColor: "#F7F6F3" }}>
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Father's Name
                  </td>
                  <td>{selectedSchedule?.student_id?.fatherName}</td>
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
                Email
              </td>
              <td>{selectedSchedule?.student_id?.email}</td>
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
              <td>{selectedSchedule?.student_id?.mobile}</td>
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
              <td>{selectedSchedule?.student_id?.thesisTrack}</td>
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
                Thesis Title
              </td>
              <td>{selectedSchedule?.student_id?.synopsisTitle}</td>
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
              <td>{selectedSchedule?.student_id?.thesisRegistration}</td>
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
                External
              </td>
              <td>{/* {selectedSchedule?.student_id?.synopsisTitle} */}</td>
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
                Thesis Status
              </td>

              <td>{selectedSchedule?.thesisStatus}</td>
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
                    Supervisor
                  </td>
                  <td>{selectedSchedule?.supervisor_id?.fullName}</td>
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
}
