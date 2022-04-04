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

export default function CreateSynopsisSchedule() {
  const [students, setStudents] = useState([]);

  const alertHandler = () => {
    alert("Schedule Updated!");
  };
  const [age, setAge] = React.useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [value, setValue] = React.useState(new Date());

  const handleChangeDate = (newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    async function fetchData() {
      const stds = await studentService.getStudents();
      setStudents(stds);
    }

    fetchData();
  }, []);

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
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Session</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Session"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6} style={{ width: "100%" }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {" "}
              <DateTimePicker
                label="Defense Date"
                value={value}
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
                value={age}
                label="Session"
                onChange={handleChange}
              >
                {students.map((oneStudent) => (
                  <MenuItem
                    selected="selected"
                    value={oneStudent.registrationNo}
                  >
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
                value={age}
                label="Session"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Page-body start */}
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          type="submit"
          variant="contained"
          size="large"
          color="secondary"
          style={{ marginTop: "2%", width: "20%" }}
        >
          Submit
        </Button>
      </div>
    </>
  );
}
