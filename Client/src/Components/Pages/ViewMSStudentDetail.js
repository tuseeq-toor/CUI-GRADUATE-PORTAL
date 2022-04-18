import React, { useEffect, useState } from "react";
import profile from "../../../src/avatar-1.jpg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { Autocomplete, Paper, TextField } from "@mui/material";
import synopsisService from "../../API/synopsis";
import { useSelector } from "react-redux";

const data = {
  candidateName: "Waqas Zafar",
  registrationNumber: "FA18-BCS-107",
  supervisor: "Dr. Nadeem Javaid",
  dated: "Mar 18, 2022",
  email: "waqaszafar@gmail.com",
  mobile: "090078601",
  profilePic: profile,
  synopsisTitle:
    "Efficient Electricity Theft Detection in Smart Grids using Data Driven Models",
  coursesPassed: ["CS-101, ", "CS-102, ", "PH-101, ", "PH-103, "],
  supervisoryCommittee: [
    "Dr. Nadeem Javaid, ",
    "Dr. Nadeem Javaid, ",
    "Dr. Nadeem Javaid, ",
  ],
  recommendations: [
    {
      comment:
        'The problem statement focuses on class imbalance, dimension reduction. These are generic issues. Rather the candidate should focus on the limitations of the techniques in literature. The manuscipt is written in a bt informal way. For example in the sentence "Therefore, ETD is an important thing and needs immediate attention to avoid ever-increasing electricity theft rate. Keeping this" avoid using the words like "thing" etc. Comparisons should be done with the relevant baseline techniques rather than any arbitrary techniques. Discussion on handling the identical issues should be is a way such that they are aligned with the objectives of the proposed research.',
      evaluatorName: "Dr. Assad Abbas",
      evaluationStatus: "Minor Changings",
      isRequiredAgain: "No",
    },
    {
      comment:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using "Content here, content here", making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for "lorem ipsum" will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
      evaluatorName: "Dr. Basit Raza",
      evaluationStatus: "Major Changings",
      isRequiredAgain: "Yes",
    },
  ],
};

export default function ViewMSStudent() {
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

      console.log(schd);
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
      if (
        reg === oneSchedule?.student_id?.registrationNo &&
        oneSchedule?.program_id?.programShortName === "MS(CS)"
      ) {
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
      <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <Box sx={{ mb: 4 }}>
          <Autocomplete
            {...defaultProps}
            id="controlled-demo"
            value={autocompleteValue}
            onChange={(value, newValue) => {
              let registrationNo = newValue?.student_id?.registrationNo;
              let programShortName = newValue?.program_id?.programShortName;

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
      </Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem",
        }}
      >
        <div>
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
              <h3 style={{ margin: "0 1rem 0 0" }}>Candidate:</h3>
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
              <h3 style={{ margin: "0 1rem 0 0" }}>Dated:</h3>
              <p style={{ margin: "0" }}>{"date"}</p>
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
              <h3 style={{ margin: "0 1rem 0 0" }}>Email:</h3>
              <p style={{ margin: "0" }}>
                {selectedSchedule?.student_id?.email}
              </p>
            </div>
            <h3
              style={{
                marginRight: "1rem",
                marginTop: "0",
                marginBottom: "0",
              }}
            >
              Mobile Number:
            </h3>
            <p style={{ marginTop: "0", marginBottom: "0" }}>
              {selectedSchedule?.student_id?.mobile}
            </p>
          </div>
        </div>
        {/* <div
          style={{
            display: "grid",
            placeContent: "center",
            color: "white",
            fontSize: "20px",
            borderRadius: "50%",
            backgroundColor: "gray",
            height: "6rem",
            width: "6rem",
          }}
        >
          A
        </div>*/}
        <img
          src={data.profilePic}
          alt=""
          style={{ objectFit: "contain", height: "6rem", borderRadius: "50%" }}
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        <div>
          <h3
            style={{
              margin: "1rem 1rem 0",
              fontSize: "1.1rem",
            }}
          >
            Courses Passed:
          </h3>
          <div
            style={{
              margin: "0.5rem 1rem 0",
              display: "flex",
              alignItems: "center",

              textAlign: "justify",
            }}
          >
            {data.coursesPassed}
          </div>
        </div>
      </Box>

      <Box sx={{ mt: 2 }}>
        <div>
          <h3
            style={{
              margin: "1rem 1rem 0",
              fontSize: "1.1rem",
            }}
          >
            Supervisory Committee:
          </h3>
          <div
            style={{
              margin: "0.5rem 1rem 0",
              display: "flex",
              alignItems: "center",

              textAlign: "justify",
            }}
          >
            {selectedSynopsis?.supervisor_id?.fullName}
          </div>
        </div>
      </Box>

      <Box sx={{ mt: 2 }}>
        <div>
          <h3
            style={{
              margin: "1rem 1rem 0",
              fontSize: "1.1rem",
            }}
          >
            Progress Reports:
          </h3>
          <div
            style={{
              margin: "0.5rem 1rem 0",
              display: "flex",
              alignItems: "center",

              textAlign: "justify",
            }}
          >
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
            adipisci ratione ipsum modi autem. Molestias.
          </div>
        </div>
        <div className="">
          <table
            cellSpacing={0}
            cellPadding={6}
            style={{
              margin: "1rem",
              color: "#333333",
              height: "50px",
            }}
          >
            <tbody>
              <tr style={{ color: "#333333", backgroundColor: "#F7F6F3" }}>
                <td
                  valign="top"
                  style={{
                    backgroundColor: "#E9ECF1",
                    fontWeight: "bold",
                    width: "20%",
                  }}
                >
                  Session
                </td>
                <td>FA15</td>
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
                  Status
                </td>
                <td>Regular</td>
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
                  Comments
                </td>
                <td>CSCL</td>
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
                  Synopsis Evaluation
                </td>
                <td>Successful</td>
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
                  Thesis Evaluation
                </td>
                <td>Successful</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Box>
    </>
  );
}
