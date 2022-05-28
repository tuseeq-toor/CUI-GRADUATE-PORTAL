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
import {
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import synopsisService from "../../API/synopsis";
import programsService from "../../API/programs";

export default function ManageMsDeadline() {
  const [programs, setPrograms] = useState([]);

  const [data, setData] = useState({
    type: "Synopsis",
    currentDeadline: null,
    newDeadline: null,
    program_id: "",
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
      const prog = await programsService.getPrograms();

      setPrograms(prog);
    }

    fetchData();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(data);
    synopsisService.createDeadline(data);
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
        <h1>Submission Deadline</h1>
      </div>
      {/* Form starts here */}
      <Box component="form" noValidate sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <LocalizationProvider
              color="secondary"
              dateAdapter={AdapterDateFns}
            >
              <DateTimePicker
                color="secondary"
                name="currentDeadline"
                label="Current Deadine"
                value={data.defenseDate}
                onChange={() => {}}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} style={{ width: "100%" }}>
            <FormControl sx={{ mb: 1 }}>
              <FormLabel color="secondary">Type</FormLabel>
              <RadioGroup
                row
                name="type"
                value={data.type}
                onChange={handleChange}
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
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel color="secondary">Program</InputLabel>
              <Select
                color="secondary"
                label="Program"
                name="program_id"
                value={data.program_id}
                onChange={handleChange}
              >
                {programs.map((program) => (
                  <MenuItem key={program._id} value={program._id}>
                    {program.programShortName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider
              color="secondary"
              dateAdapter={AdapterDateFns}
            >
              <DateTimePicker
                color="secondary"
                name="newDeadline"
                label="New Submission Deadine"
                value={data.newDeadline}
                onChange={handleChangeDate}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </Box>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          size="large"
          color="secondary"
          sx={{ mt: 4, mb: 2 }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </div>
    </>
  );
}
