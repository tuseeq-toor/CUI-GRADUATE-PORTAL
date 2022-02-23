import {
  TextField,
  Button,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

import React from "react";
import { supervisor } from "../DummyData/facultyData";
import { useFormik } from "formik";
import * as yup from "yup";

export default function SynopsisSubmission() {
  const validationSchema = yup.object({
    synopsisTitle: yup.string(),
    supervisor: yup.string(),
    coSupervisor: yup.string(),
    synopsisTrack: yup.string(),
    synopsisDocument: yup.string(),
    synopsisPresentation: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      synopsisTitle: "",
      supervisor: "",
      coSupervisor: "",
      synopsisTrack: "",
      synopsisDocument: "",
      synopsisPresentation: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{ mt: 1 }}
    >
      <TextField
        id="standard-basic"
        sx={{
          width: "100%",
          marginBottom: "15px",
        }}
        name="synopsisTitle"
        label="Synopsis Title"
        color="secondary"
        variant="outlined"
      />
      <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth color="secondary">
          <InputLabel id="demo-simple-select-label">Supervisor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="supervisor"
            //value={Program}
            label="Supervisor"
            //onChange={handleChange}
          >
            {supervisor.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth color="secondary">
          <InputLabel id="demo-simple-select-label">Co-Supervisor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="coSupervisor"
            //value={Program}
            label="Co-Supervisor"
            //onChange={handleChange}
          >
            {supervisor.map((item) => {
              return <MenuItem value={item}>{item}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        name="synopsisTrack"
        label="Synopsis Track"
        color="secondary"
        variant="outlined"
      />
      <div className="mt-4">Synopsis Document:</div>
      <input
        className=" form-control-sm  col-md-10 col-sm-8"
        type="file"
        min={0}
        name="synopsisDocument"
        // value={saveModal.tutionFeePaid}
        // onChange={this.changeHandler}
      />
      <div className="col-md-2 col-sm-4 mt-4">Synopsis Presentation :</div>
      <input
        className=" form-control-sm  col-md-10 col-sm-8"
        type="file"
        min={0}
        name="synopsisPresentation"
        // value={saveModal.tutionFeePaid}
        // onChange={this.changeHandler}
      />
      <Button
        type="submit"
        sx={{ ml: "18%" }}
        variant="contained"
        size="large"
        color="secondary"
      >
        Submit
      </Button>
    </Box>
  );
}
