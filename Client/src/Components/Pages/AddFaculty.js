import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Checkbox, FormControlLabel, valueToPercent } from "@mui/material";
import { Field, useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addFaculty } from "../../Store/authSlice";

export default function AddStudent() {
  const dispatch = useDispatch();

  const [admin, setAdmin] = React.useState(false);
  const [gac, setGac] = React.useState(false);
  const [go, setGo] = React.useState(false);
  const [ms, setMs] = React.useState(false);
  const [phd, setPhd] = React.useState(false);
  const [supervisor, setSupervisor] = React.useState(false);
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
  const userRole = [
    {
      role: "ADMIN",
      enable: admin,
    },
    {
      role: "GAC",
      enable: gac,
    },
    {
      role: "GO",
      enable: go,
    },
    {
      role: "MS",
      enable: ms,
    },
    {
      role: "PhD",
      enable: phd,
    },
    {
      role: "SUPERVISOR",
      enable: supervisor,
    },
  ];
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      fullName: this.firstName + " " + this.lastName,
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
    onSubmit: (values) => {
      values.userRole = userRole;
      console.log(values);
      dispatch(addFaculty(values))
        // .unwrap()
        .then((res) => {
          console.log(res);

          /* navigate("/"); */
        })
        .catch((err) => {
          console.log(err);
        });
    },
  });

  return (
    <>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        noValidate
        sx={{ mt: 1 }}
      >
        <TextField
          fullWidth
          margin="dense"
          id="firstName"
          label="First Name"
          name="firstName"
          color="secondary"
          variant="outlined"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />

        <TextField
          margin="dense"
          fullWidth
          id="lastName"
          label="Last Name"
          name="lastName"
          color="secondary"
          variant="outlined"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />

        <TextField
          margin="dense"
          fullWidth
          id="fatherName"
          label="Father/Husband Name"
          name="fatherName"
          color="secondary"
          variant="outlined"
          value={formik.values.fatherName}
          onChange={formik.handleChange}
          error={formik.touched.fatherName && Boolean(formik.errors.fatherName)}
          helperText={formik.touched.fatherName && formik.errors.fatherName}
        />

        <TextField
          margin="dense"
          fullWidth
          id="nationality"
          label="Nationality"
          name="nationality"
          color="secondary"
          variant="outlined"
          value={formik.values.nationality}
          onChange={formik.handleChange}
          error={
            formik.touched.nationality && Boolean(formik.errors.nationality)
          }
          helperText={formik.touched.nationality && formik.errors.nationality}
        />

        <TextField
          margin="dense"
          fullWidth
          id="city"
          label="City"
          name="city"
          color="secondary"
          variant="outlined"
          value={formik.values.city}
          onChange={formik.handleChange}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
        />

        <TextField
          margin="dense"
          fullWidth
          id="email"
          label="Email"
          name="email"
          color="secondary"
          variant="outlined"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />

        <TextField
          margin="dense"
          fullWidth
          id="designation"
          label="Designation"
          name="designation"
          color="secondary"
          variant="outlined"
          value={formik.values.designation}
          onChange={formik.handleChange}
          error={
            formik.touched.designation && Boolean(formik.errors.designation)
          }
          helperText={formik.touched.designation && formik.errors.designation}
        />

        <TextField
          margin="dense"
          fullWidth
          id="department"
          label="Department"
          name="department"
          color="secondary"
          variant="outlined"
          value={formik.values.department}
          onChange={formik.handleChange}
          error={formik.touched.department && Boolean(formik.errors.department)}
          helperText={formik.touched.department && formik.errors.department}
        />

        <TextField
          margin="dense"
          fullWidth
          id="campus"
          label="Campus"
          name="campus"
          color="secondary"
          variant="outlined"
          value={formik.values.campus}
          onChange={formik.handleChange}
          error={formik.touched.campus && Boolean(formik.errors.campus)}
          helperText={formik.touched.campus && formik.errors.campus}
        />
        <div
          style={{
            margin: ".25rem .75rem .25rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "2.5rem",
            alignItems: "center",
          }}
        >
          <FormControlLabel
            control={<Checkbox color="secondary" />}
            label="Admin"
            name="isAdmin"
            onChange={() => setAdmin(!admin)}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" />}
            label="GAC"
            name="isGac"
            onChange={() => setGac(!gac)}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" />}
            label="GO"
            name="isGo"
            onChange={() => setGo(!go)}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" />}
            label="MS"
            name="isMsCor"
            onChange={() => setMs(!ms)}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" />}
            label="PhD"
            name="isPhdCor"
            onChange={() => setPhd(!phd)}
          />
          <FormControlLabel
            control={<Checkbox color="secondary" />}
            label="Supervisor"
            name="isSupervisor"
            onChange={() => setSupervisor(!supervisor)}
          />
        </div>
        <Button
          margin="normal"
          type="submit"
          variant="contained"
          size="large"
          color="secondary"
        >
          Add Faculty
        </Button>
      </Box>
    </>
  );
}
