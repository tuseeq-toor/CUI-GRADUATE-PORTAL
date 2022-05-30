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
import { useSelector } from "react-redux";

export default function SynopsisSubmission() {
  const {
    user: {
      user: {
        student: {
          program_id: { programShortName },
        },
      },
    },
  } = useSelector((state) => state.auth);
  const [supervisors, setSupervisors] = useState([]);
  const [deadlines, setDeadlines] = useState([]);
  const [error, setError] = useState();
  const [isError, setIsError] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const getSupervisors = async () => {
    let data = await studentService.getSupervisors();
    console.table("SubmissionM", data?.supervisors);
    setSupervisors(data?.supervisors);
  };
  const getDeadlinesData = async () => {
    let res = await synopsisService.getDeadlines();
    console.log(res);
    let filteredDeadlines = [];
    if (programShortName.toLowerCase().includes("ms")) {
      filteredDeadlines = res.filter((item) => item.program === "Masters");
    } else {
      filteredDeadlines = res.filter((item) => item.program === "PhD");
    }
    setDeadlines(filteredDeadlines);
  };

  useEffect(() => {
    getSupervisors();
    getDeadlinesData();
  }, [programShortName]);

  const validationSchema = yup.object({
    thesisTitle: yup.string().required(),
    supervisor: yup.string().required(),
    coSupervisor: yup.string().required(),
    thesisTrack: yup.string().required(),
    // thesisDocument: yup.string(),
    // synopsisNotification: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      thesisTitle: "",
      supervisor: "",
      coSupervisor: "",
      thesisTrack: "",
      thesisDocument: [],
      synopsisNotification: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      let formData = new FormData();
      formData.append("thesisTitle", values.thesisTitle);
      formData.append("supervisor", values.supervisor);
      formData.append("coSupervisor", values.coSupervisor);
      formData.append("thesisTrack", values.thesisTrack);
      formData.append("thesisDocument", values.thesisDocument[0]);
      formData.append("synopsisNotification", values.synopsisNotification[0]);
      console.log(values);
      let res = await synopsisService.submitThesis(formData);
      if (res?.status === 500) {
        setShowErrorModal(true);
        console.log(res);
      } else {
        setShowSubmitModal(true);
      }
      console.log(res);
    },
  });

  return (
    <>
      {deadlines[0] ? (
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
            name="thesisTitle"
            label="Thesis Title"
            color="secondary"
            variant="outlined"
            value={formik.values.thesisTitle}
            onChange={formik.handleChange}
            error={
              formik.touched.thesisTitle && Boolean(formik.errors.thesisTitle)
            }
            helperText={formik.touched.thesisTitle && formik.errors.thesisTitle}
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
                helperText={
                  formik.touched.supervisor && formik.errors.supervisor
                }
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
                  formik.touched.coSupervisor &&
                  Boolean(formik.errors.coSupervisor)
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
            name="thesisTrack"
            label="Thesis Track"
            color="secondary"
            variant="outlined"
            value={formik.values.thesisTrack}
            onChange={formik.handleChange}
            error={
              formik.touched.thesisTrack && Boolean(formik.errors.thesisTrack)
            }
            helperText={formik.touched.thesisTrack && formik.errors.thesisTrack}
          />
          <div>
            <div>Synopsis Approval Notification:</div>
            <input
              type="file"
              name="synopsisNotification"
              min={1}
              onChange={(event) => {
                formik.setFieldValue(
                  "synopsisNotification",
                  event.currentTarget.files
                );
              }}
            />
            <div>Thesis Document :</div>
            <input
              type="file"
              min={1}
              name="thesisDocument"
              onChange={(event) => {
                formik.setFieldValue("thesisDocument", event.target.files);
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
            Thesis has been submitted.
          </BackdropModal>
          <BackdropModal
            showModal={showErrorModal}
            setShowModal={setShowErrorModal}
            title={"Error!"}
          >
            Something went wrong.
          </BackdropModal>
        </Box>
      ) : (
        <div
          style={{
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "500",
          }}
        >
          Nothing to submit right now
        </div>
      )}
    </>
  );
}
