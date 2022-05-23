import {
  TextField,
  Button,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

import studentService from "../../API/students";
import synopsisService from "../../API/synopsis";
import BackdropModal from "../UI/BackdropModal";

export default function SynopsisSubmission() {
  const [supervisors, setSupervisors] = useState([]);
  const [error, setError] = useState();
  const [isError, setIsError] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const getSupervisors = async () => {
    let data = await studentService.getSupervisors();
    console.table("SubmissionM", data?.supervisors);
    setSupervisors(data?.supervisors);
  };

  useEffect(() => {
    getSupervisors();
  }, []);

  const validationSchema = yup.object({
    synopsisTitle: yup.string().required(),
    supervisor: yup.string().required(),
    coSupervisor: yup.string().required(),
    synopsisTrack: yup.string().required(),
    // synopsisDocument: yup.array(),
    // synopsisPresentation: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      synopsisTitle: "",
      supervisor: "",
      coSupervisor: "",
      synopsisTrack: "",
      synopsisDocument: [],
      synopsisPresentation: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      let formData = new FormData();
      formData.append("synopsisTitle", values.synopsisTitle);
      formData.append("supervisor", values.supervisor);
      formData.append("coSupervisor", values.coSupervisor);
      formData.append("synopsisTrack", values.synopsisTrack);
      formData.append("synopsisDocument", values.synopsisDocument[0]);
      formData.append("synopsisPresentation", values.synopsisPresentation[0]);
      // console.log(values);
      let res = await synopsisService.submitSynopsis(formData);
      if (res?.status === 500) {
        setShowErrorModal(true);
        console.log(res);
      } else {
        setShowSubmitModal(true);
      }
      console.log(res);
      // studentService.uploadFile(formData);
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
        error={
          formik.touched.synopsisTitle && Boolean(formik.errors.synopsisTitle)
        }
        helperText={formik.touched.synopsisTitle && formik.errors.synopsisTitle}
      />
      <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth color="secondary">
          <InputLabel>Supervisor</InputLabel>
          <Select
            name="supervisor"
            label="Supervisor"
            value={formik.values.supervisor}
            onChange={formik.handleChange}
            error={
              formik.touched.supervisor && Boolean(formik.errors.supervisor)
            }
            helperText={formik.touched.supervisor && formik.errors.supervisor}
          >
            {supervisors?.map((item) => {
              return (
                <MenuItem key={item._id} value={item._id}>
                  {item.username}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth color="secondary">
          <InputLabel>Co-Supervisor</InputLabel>
          <Select
            name="coSupervisor"
            value={formik.values.coSupervisor}
            onChange={formik.handleChange}
            error={
              formik.touched.coSupervisor && Boolean(formik.errors.coSupervisor)
            }
            helperText={
              formik.touched.coSupervisor && formik.errors.coSupervisor
            }
            label="Co-Supervisor"
          >
            {supervisors?.map((item) => {
              return (
                <MenuItem key={item._id} value={item._id}>
                  {item.username}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <TextField
        sx={{ width: "100%", marginBottom: "15px" }}
        name="synopsisTrack"
        label="Synopsis Track"
        color="secondary"
        variant="outlined"
        value={formik.values.synopsisTrack}
        onChange={formik.handleChange}
        error={
          formik.touched.synopsisTrack && Boolean(formik.errors.synopsisTrack)
        }
        helperText={formik.touched.synopsisTrack && formik.errors.synopsisTrack}
      />
      <div>
        <div>Synopsis Document:</div>
        <input
          type="file"
          name="synopsisDocument"
          min={1}
          onChange={(event) => {
            formik.setFieldValue("synopsisDocument", event.currentTarget.files);
          }}
        />
        <div>Synopsis Presentation :</div>
        <input
          type="file"
          min={1}
          name="synopsisPresentation"
          onChange={(event) => {
            formik.setFieldValue("synopsisPresentation", event.target.files);
          }}
        />
      </div>
      <span style={{ color: "red" }}>{isError && error}</span>
      <Button
        type="submit"
        sx={{ ml: "80%", mt: "20px" }}
        variant="contained"
        size="large"
        color="secondary"
      >
        Submit
      </Button>

      <BackdropModal
        showModal={showSubmitModal}
        setShowModal={setShowSubmitModal}
        title={"Submit!"}
      >
        Synopsis has been submitted.
      </BackdropModal>
      <BackdropModal
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        title={"Error!"}
      >
        Something went wrong.
      </BackdropModal>
    </Box>
  );
}
