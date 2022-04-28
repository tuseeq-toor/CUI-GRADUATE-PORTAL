import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import { FormLabel, Radio, RadioGroup } from "@mui/material";
import { useFormik } from "formik";
import authSlice, { Signup } from "../../Store/authSlice";

import * as yup from "yup";
import programsService from "../../API/programs";
import sessionsService from "../../API/sessions";
import studentService from "../../API/students";
import { useDispatch, useSelector } from "react-redux";
import BackdropModal from "../UI/BackdropModal";

export default function AddStudent() {
  const { success } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showAddModal, setShowAddModal] = useState(false);

  const [studentType, setStudentType] = useState("MS");
  const [sessions, setSessions] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [supervisors, setSupervisors] = useState([]);

  const validationSchema = yup.object({
    email: yup.string("Enter your email"),
    /* .email("Enter a valid email")
      .required("Email is required"), */
    password: yup
      .string("Enter your password")
      .min(4, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      fatherName: "",
      password: "dummy",
      mobile: "",
      supervisor_id: "",
      coSupervisor_id: "",
      userRole: "STUDENT",
      program_id: "",
      thesisRegistration: "",
      totalPublications: "",
      impactFactorPublications: "",
      thesisTrack: "",
    },
    enableReinitialize: true,
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(Signup(values));
      setShowAddModal(true);
    },
  });

  useEffect(() => {
    async function getData() {
      const prog = await programsService.getPrograms();
      const sess = await sessionsService.getSessions();
      let data = await studentService.getSupervisors();

      setSupervisors(data.supervisors);
      setSessions(sess);
      setPrograms(prog);
    }
    getData();
  }, []);

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      noValidate
      sx={{ mt: 1 }}
    >
      <FormControl sx={{ mb: 1 }}>
        <FormLabel color="secondary">Student</FormLabel>
        <RadioGroup
          row
          name="studentType"
          value={studentType}
          onChange={(e) => setStudentType(e.target.value)}
        >
          <FormControlLabel
            value="MS"
            control={<Radio color="secondary" />}
            label="MS"
          />
          <FormControlLabel
            value="PhD"
            control={<Radio color="secondary" />}
            label="PhD"
          />
        </RadioGroup>
      </FormControl>
      <TextField
        id="standard-basic"
        sx={{
          width: "100%",
          marginBottom: "15px",
        }}
        label="Registration No."
        color="secondary"
        variant="outlined"
        name="registrationNo"
        value={formik.values.registrationNo}
        onChange={formik.handleChange}
      />
      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Name"
        color="secondary"
        variant="outlined"
        name="username"
        value={formik.values.username}
        onChange={formik.handleChange}
      />
      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Father Name"
        color="secondary"
        variant="outlined"
        name="fatherName"
        value={formik.values.fatherName}
        onChange={formik.handleChange}
      />
      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Email"
        color="secondary"
        variant="outlined"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />
      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Mobile"
        color="secondary"
        variant="outlined"
        name="mobile"
        value={formik.values.mobile}
        onChange={formik.handleChange}
      />
      <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth color="secondary">
          <InputLabel id="demo-simple-select-label">Program</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Program"
            name="program_id"
            value={formik.values.program_id}
            onChange={formik.handleChange}
          >
            {programs?.map((program) => (
              <MenuItem value={program._id}>
                {program.programShortName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/* <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth color="secondary">
          <InputLabel id="demo-simple-select-label">
            Course Work Completion
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Course Work Completion"
            value={formik.values.courseWorkCompletion}
            onChange={formik.handleChange}
          >
            <MenuItem value="1">N/A</MenuItem>
            <MenuItem value="15">SP11</MenuItem>
            <MenuItem value="16">FA11</MenuItem>
          </Select>
        </FormControl>
      </Box> */}
      <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth color="secondary">
          <InputLabel id="demo-simple-select-label">Supervisor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Supervisor"
            name="supervisor_id"
            value={formik.values.supervisor_id}
            onChange={formik.handleChange}
          >
            {supervisors?.map((supervisor) => (
              <MenuItem value={supervisor._id}>{supervisor.username}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth color="secondary">
          <InputLabel id="demo-simple-select-label">Co-Supervisor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Co-Supervisor"
            name="coSupervisor_id"
            value={formik.values.coSupervisor_id}
            onChange={formik.handleChange}
          >
            {supervisors?.map((supervisor) => (
              <MenuItem value={supervisor._id}>{supervisor.username}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {/*   <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Thesis Title"
        color="secondary"
        variant="outlined"
        value={formik.values.supervisor_id}
        onChange={formik.handleChange}
      /> */}
      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Thesis Registration"
        color="secondary"
        variant="outlined"
        name="thesisRegistration"
        value={formik.values.thesisRegistration}
        onChange={formik.handleChange}
      />{" "}
      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Thesis Track"
        color="secondary"
        variant="outlined"
        name="thesisTrack"
        value={formik.values.thesisTrack}
        onChange={formik.handleChange}
      />
      {studentType === "PhD" && (
        <>
          <TextField
            id="standard-basic"
            sx={{ width: "100%", marginBottom: "15px" }}
            label="Total Publication (during PhD)"
            color="secondary"
            name="totalPublications"
            variant="outlined"
            value={formik.values.totalPublications}
            onChange={formik.handleChange}
          />
          <TextField
            id="standard-basic"
            sx={{ width: "100%", marginBottom: "15px" }}
            label="Impact Factor Publications (after synopsis approval)"
            name="impactFactorPublications"
            color="secondary"
            variant="outlined"
            value={formik.values.impactFactorPublications}
            onChange={formik.handleChange}
          />

          {/*   <TextField
            id="standard-basic"
            sx={{ width: "100%", marginBottom: "15px" }}
            label="Area of Specialization"
            color="secondary"
            variant="outlined"
            value={formik.values.supervisor_id}
            onChange={formik.handleChange}
          /> */}
          {/*   <TextField
            id="standard-basic"
            sx={{ width: "100%", marginBottom: "15px" }}
            label="Comprehensive"
            color="secondary"
            variant="outlined"
          /> */}
          {/*    <TextField
            id="standard-basic"
            sx={{ width: "100%", marginBottom: "15px" }}
            label="Foriegn Submission"
            color="secondary"
            variant="outlined"
          /> */}
          {/*    <TextField
            id="standard-basic"
            sx={{ width: "100%", marginBottom: "15px" }}
            label="Other Issue"
            color="secondary"
            variant="outlined"
          /> */}
        </>
      )}
      <Button type="submit" variant="contained" size="large" color="secondary">
        Add Student
      </Button>
      <BackdropModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        title={"Add!"}
      >
        Student has been Added.
      </BackdropModal>
    </Box>
  );
}
