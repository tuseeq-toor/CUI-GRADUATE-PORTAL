import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, Box } from "@mui/material";

export default function AddSession() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  const handleTitle = (event) => {
    setTitle(event.target.valve);
  };
  const handleDescription = (event) => {
    setDescription(event.target.valve);
  };
  const handleStatus = (event) => {
    setStatus(event.target.checked);
    console.log(status);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Session Title"
        name="title"
        color="secondary"
        variant="outlined"
        onChange={handleTitle}
      />

      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Description"
        name="description"
        color="secondary"
        variant="outlined"
        onChange={handleDescription}
      />

      <FormGroup sx={{ marginBottom: "15px" }}>
        <FormControlLabel
          name="status"
          checked={status}
          control={<Checkbox color="secondary" />}
          label="Status"
          onChange={handleStatus}
        />
      </FormGroup>

      <Button type="submit" variant="contained" size="large" color="secondary">
        Add Session
      </Button>
    </Box>
  );
}
