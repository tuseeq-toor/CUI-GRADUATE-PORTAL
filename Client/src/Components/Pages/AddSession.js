import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, Box } from "@mui/material";
import sessionsService from "../../API/sessions";
import BackdropModal from "../UI/BackdropModal";
export default function AddSession() {
  const [showAddModal, setShowAddModal] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState(false);

  const handleStatus = (event) => {
    setStatus(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await sessionsService.addSession({
      title,
      description,
      status,
    });
    console.log("response", res);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <TextField
        id="title"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Session Title"
        name="title"
        color="secondary"
        variant="outlined"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          console.log(title);
        }}
      />

      <TextField
        id="desc"
        sx={{ width: "100%", marginBottom: "15px" }}
        label="Description"
        name="description"
        color="secondary"
        variant="outlined"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          console.log(description);
        }}
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
      <BackdropModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        title={"Add!"}
      >
        The Program has been Added.
      </BackdropModal>
    </Box>
  );
}
