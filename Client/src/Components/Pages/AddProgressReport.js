import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import studentService from "../../API/students";
import sessionsService from "../../API/sessions";
import progressReportService from "../../API/progressReports";

export default function AddProgressReport() {
  const [students, setStudents] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const studs = await studentService.getStudents();
      const sess = await sessionsService.getSessions();
      console.log("Students", studs);
      setStudents(studs);
      setSessions(sess);
    }
    fetchData();
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await progressReportService.addProgressReport(data);
    console.log(res);
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    console.log("Data Progress Report", data);
  };
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Student</InputLabel>
        <Select
          sx={{ marginBottom: "15px" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={students.registrationNo}
          label="Student"
          name="student_id"
          onChange={handleChange}
        >
          {students.map((oneStudent) => (
            <MenuItem selected="selected" value={oneStudent._id}>
              {oneStudent.registrationNo}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Session</InputLabel>
        <Select
          sx={{ marginBottom: "15px" }}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={students.registrationNo}
          label="Session"
          name="session_id"
          onChange={handleChange}
        >
          {sessions.map((oneSession) => (
            <MenuItem selected="selected" value={oneSession._id}>
              {oneSession.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box>
        <FormControl color="secondary" fullWidth sx={{ marginBottom: "15px" }}>
          <InputLabel id="demo-simple-select-label">Status</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Status"
            name="status"
            onChange={handleChange}
          >
            <MenuItem value="Satisfactory">Satisfactory</MenuItem>
            <MenuItem value="Unsatisfactory">Unsatisfactory</MenuItem>
            <MenuItem value="Good">Good</MenuItem>
            <MenuItem value="Excellent">Excellent</MenuItem>
            <MenuItem value="Absent">Absent</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <TextField
        multiline
        color="secondary"
        fullWidth
        sx={{ marginBottom: "15px" }}
        id="outlined-multiline-flexible"
        label="Comment"
        name="comment"
        rows={6}
        maxRows={8}
        onChange={handleChange}
      />

      <Button type="submit" variant="contained" color="secondary" size="large">
        Add Progress Report
      </Button>
    </Box>
  );
}
