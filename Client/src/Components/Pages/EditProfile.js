import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import studentService from "../../API/students";
import { useSelector } from "react-redux";
import * as yup from "yup";
import { useFormik } from "formik";

export default function EditProfile() {
  const { user } = useSelector((state) => state.auth);
  const [supervisors, setSupervisors] = useState([]);

  const userProgram = user.user.student.program_id.programShortName;

  console.log(userProgram);

  const validationSchema = yup.object({
    firstName: yup.string(),
    lastName: yup.string(),
    fullName: yup.string(),
    fatherName: yup.string(),
    nationality: yup.string(),
    city: yup.string(),
    email: yup.string(),
    designation: yup.string(),
    department: yup.string(),
    campus: yup.string(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      fullName: this?.firstName + " " + this?.lastName,
      fatherName: "",
      nationality: "",
      city: "",
      email: "",
      designation: "",
      department: "",
      campus: "",
      userRole: [],
      password: "dummy",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {},
  });
  const getSupervisors = async () => {
    let data = await studentService.getSupervisors();

    console.table("SubmissionM", data?.supervisors);
    setSupervisors(data?.supervisors);
  };
  useEffect(() => {
    getSupervisors();
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Submitted");
  };
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Name"
        name="name"
        color="secondary"
        variant="outlined"
      />

      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Father's Name"
        name="fatherName"
        color="secondary"
        variant="outlined"
      />

      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Email"
        name="email"
        color="secondary"
        variant="outlined"
      />

      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Mobile"
        name="mobile"
        color="secondary"
        variant="outlined"
      />

      {/* <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth color="secondary">
          <InputLabel id="demo-simple-select-label">Program</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //value={Program}
            label="Program"
            //onChange={handleChange}
          >
            <MenuItem value={12}>PhD (CS)</MenuItem>
            <MenuItem value={14}>MS (CS)</MenuItem>
            <MenuItem value={15}>MS (SE)</MenuItem>
            <MenuItem value={15}>MS (IS)</MenuItem>
          </Select>
        </FormControl>
      </Box> */}

      <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth color="secondary">
          <InputLabel id="demo-simple-select-label">Supervisor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //value={Program}
            name="supervisor"
            label="Supervisor"
            //onChange={handleChange}
          >
            {supervisors.map((item) => {
              return (
                <MenuItem key={item._id} value={item}>
                  {item.username}
                </MenuItem>
              );
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
            //value={Program}
            name="coSupervisor"
            label="Co-Supervisor"
            //onChange={handleChange}
          >
            {supervisors.map((item) => {
              return (
                <MenuItem key={item._id} value={item}>
                  {item.username}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Synopsis Title"
        color="secondary"
        name="synopsisTitle"
        variant="outlined"
      />

      <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth color="secondary">
          <InputLabel id="demo-simple-select-label">Program</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="program"
            label="Program"
          >
            <MenuItem value={12}>N/A</MenuItem>
            <MenuItem value={14}>Regular</MenuItem>
            <MenuItem value={15}>Publication</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Thesis Registration"
        color="secondary"
        name="ThesisRegistration"
        variant="outlined"
      />

      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Thesis Track"
        name="thesisTrack"
        color="secondary"
        variant="outlined"
      />

      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Area of Specialization"
        name="specialization"
        color="secondary"
        variant="outlined"
      />

      <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth color="secondary">
          <InputLabel id="demo-simple-select-label">
            Comprehensive Passing Semester
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="passingSemester"
            label="Comprehensive Passing Semester"
          >
            <MenuItem value="1">N/A</MenuItem>
            <MenuItem value="15">SP11</MenuItem>
            <MenuItem value="16">FA11</MenuItem>
            <MenuItem value="17">SP12</MenuItem>
            <MenuItem value="18">FA12</MenuItem>
            <MenuItem value="19">SP13</MenuItem>
            <MenuItem value="20">FA13</MenuItem>
            <MenuItem value="21">SP14</MenuItem>
            <MenuItem value="22">FA14</MenuItem>
            <MenuItem value="23">SP15</MenuItem>
            <MenuItem value="24">FA15</MenuItem>
            <MenuItem value="25">SP16</MenuItem>
            <MenuItem value="26">FA16</MenuItem>
            <MenuItem value="27">SP17</MenuItem>
            <MenuItem value="28">FA17</MenuItem>
            <MenuItem value="29">SP18</MenuItem>
            <MenuItem value="30">FA18</MenuItem>
            <MenuItem value="31">SPRING 2019</MenuItem>
            <MenuItem value="32">FALL 2019</MenuItem>
            <MenuItem value="33">SPRING 2020</MenuItem>
            <MenuItem value="1033">FALL 2020</MenuItem>
            <MenuItem value="1034">SPRING 2021</MenuItem>
            <MenuItem value="1036">FALL 2021</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {userProgram !== "MS" && (
        <>
          <TextField
            id="standard-basic"
            sx={{ width: "100%", marginBottom: "15px" }}
            label="Total Publication (during PhD)"
            color="secondary"
            name="publications"
            variant="outlined"
          />
          <TextField
            id="standard-basic"
            sx={{ width: "100%", marginBottom: "15px" }}
            label="Impact Factor Publications (after synopsis approval)"
            name="impactFactor"
            color="secondary"
            variant="outlined"
          />
          {/* <TextField
            id="standard-basic"
            sx={{ width: "100%", marginBottom: "15px" }}
            label="Other Issue"

            color="secondary"
            variant="outlined"
          /> */}
        </>
      )}
      <label style={{ display: "flex", flexDirection: "column" }}>
        <div>Edit Profile Picture:</div>

        <input
          style={{ margin: ".5rem" }}
          type="file"
          min={0}
          name="profilePic"
          // onChange={formik.handleChange}
        />
        {}
      </label>

      <Button type="submit" variant="contained" size="large" color="secondary">
        Update Profile
      </Button>
    </Box>
  );
}
