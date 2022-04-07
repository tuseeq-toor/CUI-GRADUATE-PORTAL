import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import studentService from "../../API/students";
import programsService from "../../API/programs";
import sessionsService from "../../API/sessions";

export default function EvaluateSynopsisMS() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Submitted");
  };

  const [students, setStudents] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [decision, setDecision] = useState("");

  useEffect(() => {
    async function fetchData() {
      const stds = await studentService.getStudents();
      const prog = await programsService.getPrograms();
      const ses = await sessionsService.getSessions();
      setStudents(stds);
      setPrograms(prog);
      setSessions(ses);
    }
    fetchData();
  }, []);
  const handleRegistrationNo = (e) => {
    students.forEach((oneStudent) => {
      if (e.target.value === oneStudent.registrationNo) {
        // const updated = oneStudent;
        // updated["decision"] = decision;
        setSelectedStudent(oneStudent);
      }
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      {console.log(selectedStudent)}
      <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth color="secondary">
          <InputLabel id="demo-simple-select-label">Track</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //value={Program}
            label="Track"
            //onChange={handleChange}
          >
            <MenuItem value={12}>Regular</MenuItem>
            <MenuItem value={14}>By Publication</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth color="secondary">
          <InputLabel id="demo-simple-select-label">Program</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={programs}
            label="Program"
            // onChange={handleChange}
          >
            {programs?.map((program) => (
              <MenuItem selected="selected" value={program._id}>
                {program?.programShortName}
              </MenuItem>
            ))}
            {/* <MenuItem value={15}>MS (SE)</MenuItem>
            <MenuItem value={15}>MS (IS)</MenuItem> */}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth color="secondary">
          <InputLabel id="demo-simple-select-label">Session</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //value={Program}
            label="Session"
            //onChange={handleChange}
          >
            <MenuItem value={12}>Fall 2021</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth color="secondary">
          <InputLabel id="demo-simple-select-label">Registration No</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //value={Program}
            label="Registration No"
            onChange={(e) => handleRegistrationNo(e)}
          >
            {students.map((oneStudent) => (
              <MenuItem selected="selected" value={oneStudent.registrationNo}>
                {oneStudent.registrationNo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <div className="row">
        <div className="col-md-12 mt-3">
          <div className="border">
            <table
              className="small-12 medium-12 large-12 columns table table-sm"
              cellSpacing={0}
              cellPadding={4}
              id="ContentPlaceHolder1_DetailsView1"
              style={{ color: "#333333", borderCollapse: "collapse" }}
            >
              <tbody>
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
                    Registration No
                  </td>
                  <td>{selectedStudent?.registrationNo}</td>
                </tr>
                {console.log(selectedStudent)}
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
                  <td>{selectedStudent?.username}</td>
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
                    Email
                  </td>
                  <td>{selectedStudent?.email}</td>
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
                    Program
                  </td>
                  <td>{selectedStudent?.program_id?.programShortName}</td>
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
                    Course work completion
                  </td>
                  <td>SPRING 2019</td>
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
                    Comprehensive Exam
                  </td>
                  <td>N/A</td>
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
                    Synopsis Status
                  </td>
                  <td>N/A</td>
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
                    Thesis Title
                  </td>
                  <td>{selectedStudent?.thesisTitle}</td>
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
                    Area of Specialization
                  </td>
                  <td>Software Engineering</td>
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
                    Foreign Submission
                  </td>
                  <td>N/A</td>
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
                    GAT Subject
                  </td>
                  <td>N/A</td>
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
                  <td>&nbsp;</td>
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
                    Supervisor
                  </td>
                  <td>{selectedStudent?.supervisor_id?.fullName}</td>
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
                    Co-Supervisor
                  </td>
                  <td>{selectedStudent?.coSupervisor_id?.fullName}</td>
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
                    Synopsis File
                  </td>
                  <td>
                    <a
                      href="Files/MS/Synopsis/Synopsis_FA17-RSE-002.pdf"
                      target="_blank"
                    >
                      Synopsis_FA17-RSE-002.pdf
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 p-4">
          {" "}
          <table style={{ width: "100%" }} className="table table-sm">
            <tbody>
              <tr>
                <th colSpan={4}>
                  <b>
                    After in depth examination of the manuscript following are
                    the recommendations of GAC member
                  </b>
                </th>
              </tr>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <tr>
                    <td>1</td>
                    <td>
                      The candidate is recommended to do <b>minor</b> changings.
                    </td>
                    <td>
                      A Candidate has to submit a manuscript within 1 week.
                    </td>
                    <td>
                      <FormControlLabel
                        value="1"
                        control={<Radio />}
                        label=""
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      The candidate is recommended to do <b>major</b> changings.
                    </td>
                    <td>Candidate has to re-appear in next semester. </td>
                    <td>
                      <FormControlLabel
                        value="2"
                        control={<Radio />}
                        label=""
                      />
                    </td>
                  </tr>
                </RadioGroup>
              </FormControl>
            </tbody>
          </table>
          <TextField
            id="standard-basic"
            sx={{ width: "100%", marginBottom: "15px" }}
            label="GAC Decision and Recommendations"
            color="secondary"
            variant="outlined"
            onChange={(e) => {
              setDecision(e.target.value);
            }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="secondary"
          >
            Submit
          </Button>
        </div>
      </div>
      {console.log(decision)}
    </Box>
  );
}
