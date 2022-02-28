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

import studentService from "../../API/students";

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

      studentService.submitSynopsis(values);
    },
  });

  return (
    <Box
      component="form"
      encType="multipart/form-data"
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
        value={formik.values.synopsisTitle}
        onChange={formik.handleChange}
      />
      <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth color="secondary">
          <InputLabel id="demo-simple-select-label">Supervisor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="supervisor"
            label="Supervisor"
            value={formik.values.supervisor}
            onChange={formik.handleChange}
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
            value={formik.values.coSupervisor}
            onChange={formik.handleChange}
            label="Co-Supervisor"
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
        value={formik.values.synopsisTrack}
        onChange={formik.handleChange}
      />
      <div className="mt-4">Synopsis Document:</div>
      <input
        className=" form-control-sm  col-md-10 col-sm-8"
        type="file"
        min={0}
        name="synopsisDocument"
        onChange={(event) => {
          formik.setFieldValue(
            "synopsisDocument",
            event.currentTarget.files[0]
          );
        }}
      />
      <div className="col-md-2 col-sm-4 mt-4">Synopsis Presentation :</div>
      <input
        className=" form-control-sm  col-md-10 col-sm-8"
        type="file"
        min={0}
        name="synopsisPresentation"
        // onChange={formik.handleChange}
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
