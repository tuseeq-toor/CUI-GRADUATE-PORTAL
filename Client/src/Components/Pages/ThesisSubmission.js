import React from "react";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { supervisor } from "../DummyData/facultyData";

export default function ThesisSubmission() {
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Submitted");
    const data = new FormData(event.currentTarget);
    const userEmail = data.get("email");
    const userPassword = data.get("password");
    /* axios
      .post("http://localhost:3000/auth/login", {
        email: userEmail,
        password: userPassword,
      })
      .then((res) => {
        const data = res.data.user;
        console.log(data);
        navigate("/Dashboard");
      })
      .catch((err) => {
        console.log(err);
      }); */
  };
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Thesis Title"
        color="secondary"
        variant="outlined"
      />

      <Box sx={{ minWidth: 120, marginBottom: "15px" }}>
        <FormControl fullWidth color="secondary">
          <InputLabel id="demo-simple-select-label">Supervisor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
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
        label="Thesis Track"
        color="secondary"
        variant="outlined"
      />

      <div className="col-md-2 col-sm-4 mt-4">
        Synopsis Approval Notification :
      </div>
      <input
        className=" form-control-sm  col-md-10 col-sm-8"
        type="file"
        min={0}
        name="tutionFeePaid"
        // value={saveModal.tutionFeePaid}
        // onChange={this.changeHandler}
      />
      <div className="col-md-2 col-sm-4 mt-4">Thesis Presentation :</div>
      <input
        className=" form-control-sm  col-md-10 col-sm-8"
        type="file"
        min={0}
        name="tutionFeePaid"
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
