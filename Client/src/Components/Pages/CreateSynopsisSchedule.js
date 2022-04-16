import * as React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import DateTimePicker from "@mui/lab/DateTimePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import studentService from "../../API/students";
import synopsisService from "../../API/synopsis";
import programsService from "../../API/programs";

export default function CreateSynopsisSchedule() {
  const [students, setStudents] = useState([]);
  const [programs, setPrograms] = useState([]);

  const [data, setData] = React.useState({
    student_id: "",
    // session_id: "",
    program_id: "",
    defenseDate: new Date(),
  });

  const handleChange = (event) => {
    console.log(event.target.value);
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleChangeDate = (newValue) => {
    setData({ ...data, date: newValue });
  };
  useEffect(() => {
    async function fetchData() {
      const stds = await studentService.getStudents();
      const prog = await programsService.getPrograms();
      setStudents(stds);
      setPrograms(prog);
    }

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    synopsisService.createSchedule(data);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "2%",
        }}
      >
        <h1>Synopsis Schedule</h1>
      </div>
      {/* Form starts here */}
      <Box component="form" noValidate sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Session</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="session_id"
                value={data.session_id}
                label="Session"
                // onChange={handleChange}
              >
                {/* {students.map((oneStudent) => (
                  <MenuItem
                    selected="selected"
                    value={oneStudent.synopsisSession_id._id}
                  >
                    {oneStudent.synopsisSession_id.title}
                  </MenuItem>
                ))} */}
                <MenuItem value={10}>SP22</MenuItem>
                <MenuItem value={20}>FA22</MenuItem>
                <MenuItem value={30}>FA23</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} style={{ width: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                name="defenseDate"
                label="Defense Date"
                value={data.defenseDate}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Student</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={data.student_id}
                label="Student"
                name="student_id"
                onChange={handleChange}
              >
                {students.map((oneStudent) => (
                  <MenuItem selected="selected" value={oneStudent._id}>
                    {oneStudent.username}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Program</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="program_id"
                value={data.program_id}
                label="Program"
                onChange={handleChange}
              >
                {programs.map((program) => (
                  <MenuItem selected="selected" value={program._id}>
                    {program.programShortName}
                  </MenuItem>
                ))}
                {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Pinitial-body start */}
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          style={{ marginTop: "2%", width: "20%" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </>
  );
}
