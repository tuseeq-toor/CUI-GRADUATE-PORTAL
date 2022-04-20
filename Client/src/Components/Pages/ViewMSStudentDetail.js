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
import studentService from "../../API/students";

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

  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const studs = await studentService.getStudents();
      setStudents(studs);
      setLoading(true);
    }
    fetchData();
  }, []);

  const handleRegistrationNo = (reg) => {
    students.forEach((oneStudent) => {
      if (
        reg === oneStudent.registrationNo &&
        oneStudent?.program_id?.programShortName.toLowerCase().includes("ms")
      ) {
        setSelectedStudent(oneStudent);

        console.log("Selected Schedule", selectedStudent);
        setData({ ...data, student_id: oneStudent._id });
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
  };

  const defaultProps = {
    options: students,
    getOptionLabel: (student) => student.registrationNo || "",
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
              let registrationNo = newValue?.registrationNo;

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
              <p style={{ margin: "0" }}>{selectedStudent?.username}</p>
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
              {selectedStudent?.registrationNo}
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
              {selectedStudent?.supervisor_id?.fullName}
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
              <p style={{ margin: "0" }}>{selectedStudent?.email}</p>
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
              {selectedStudent?.mobile}
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
          src={process.env.REACT_APP_URL + "/" + selectedStudent.profilePic}
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
            {selectedStudent?.supervisor_id?.fullName}
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
