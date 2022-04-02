import React from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, Box } from "@mui/material";

export default function AddSession() {

  const [title,setTitle] = 
  const handleChange=()=> {

  }
  const handleSubmit = (event) => {
  
  };
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Session Title"
        color="secondary"
        variant="outlined"
        onChange={handleChange}
      />

      <TextField
        id="standard-basic"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Description"
        color="secondary"
        variant="outlined"
      />

      <FormGroup sx={{ marginBottom: "15px" }}>
        <FormControlLabel
          control={<Checkbox color="secondary" />}
          label="Status"
        />
      </FormGroup>

      <Button type="submit" variant="contained" size="large" color="secondary">
        Add Session
      </Button>
    </Box>
  );
}
