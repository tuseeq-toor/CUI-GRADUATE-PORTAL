import React from "react";
import profile from "../../avatar-1.jpg";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import { Paper } from "@mui/material";

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

export default function ViewPhDStudent() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Submitted");
    const data = new FormData(event.currentTarget);
    const userEmail = data.get("email");
    const userPassword = data.get("password");
    /* axios.post("http://localhost:3000/auth/login", {
        email: userEmail,
        password: userPassword,
      })
      .then((res) => {
        const data = res.data.user;
	console.log(data);
        navigate("/Dashboard");
      })
      .catch((err) => {
        console.log(err);
      }); */
  };

  return (
    <>
      <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth>
          <InputLabel color="secondary" id="demo-simple-select-label">
            Registration
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //value={Registration}
            label="Registration"
            color="secondary"
            //onChange={handleChange}
          >
            <MenuItem selected="selected" value="2501">
              FA15-RCS-023
            </MenuItem>
            <MenuItem value="1476">FA15-RCS-029</MenuItem>
            <MenuItem value="1364">FA15-RIS-002</MenuItem>
            <MenuItem value="243">FA15-RIS-012</MenuItem>
            <MenuItem value="1384">FA16-RCS-002</MenuItem>
            <MenuItem value="1471">FA16-RCS-003</MenuItem>
            <MenuItem value="1418">FA16-RCS-006</MenuItem>
            <MenuItem value="3627">FA16-RCS-010</MenuItem>
            <MenuItem value="1419">FA16-RCS-011</MenuItem>
            <MenuItem value="1416">FA16-RCS-013</MenuItem>
          </Select>
        </FormControl>
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
              <p style={{ margin: "0" }}>{data.candidateName}</p>
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
              {data.registrationNumber}
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
              <p style={{ margin: "0" }}>{data.dated}</p>
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
              {data.supervisor}
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
              <p style={{ margin: "0" }}>{data.email}</p>
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
            <p style={{ marginTop: "0", marginBottom: "0" }}>{data.mobile}</p>
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
            {data.supervisoryCommittee}
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
