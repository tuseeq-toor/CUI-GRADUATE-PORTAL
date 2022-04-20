import React, { useEffect, useState } from "react";
import { progressData, studentData } from "../DummyData/DummyData";
import DataTable from "../UI/TableUI";
import axios from "axios";

import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Modal from "@mui/material/Modal";

import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import progressReportService from "../../API/progressReports";

export default function ManageProgressReport() {
  const [open, setOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {
    async function fetchData() {
      const res = await progressReportService.getReports();
      const data = res.map((res) => ({
        Student: res.student_id.username,
        Session: res.session_id.title,
        Status: res.status,
        Comment: res.comment,
        id: res._id,
      }));
      setReports(data);
      console.log("Progress Report data", data);
    }
    fetchData();
  }, []);

  const progressHeader = [
    {
      field: "Student",
      headerName: "Student",
      width: 200,
    },
    { field: "Session", headerName: "Session", width: 200 },
    { field: "Status", headerName: "Status", width: 200 },
    { field: "Comment", headerName: "Comment", width: 400 },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: (props) => (
        <>
          <Button
            onClick={() => {}}
            variant="contained"
            color="secondary"
            size="small"
            style={{ marginLeft: 0 }}
          >
            Delete
          </Button>

          <Button
            onClick={(p) => {
              handleOpen();
            }}
            variant="contained"
            color="secondary"
            size="small"
            style={{ marginLeft: 10 }}
          >
            Edit
          </Button>
        </>
      ),
    },
  ];

  const updateProgram = () => {};
  const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",

    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",

    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="standard-basic"
            color="secondary"
            label="Student"
            variant="standard"
            sx={{ width: "100%", marginBottom: "15px" }}
          />

          <TextField
            id="standard-basic"
            color="secondary"
            label="Session"
            variant="standard"
            sx={{ width: "100%", marginBottom: "15px" }}
          />

          <TextField
            variant="standard"
            color="secondary"
            fullWidth
            sx={{ marginBottom: "15px" }}
            id="outlined-multiline-flexible"
            label="Comment"
            multiline
            maxRows={8}
          />

          <Box>
            <FormControl
              color="secondary"
              fullWidth
              sx={{ marginBottom: "15px" }}
            >
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
              <Select
                variant="standard"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                //v
                label="Status"
                //onChange={handleChange}
              >
                <MenuItem value="Satisfactory">Satisfactory</MenuItem>
                <MenuItem value="Unsatisfactory">Unsatisfactory</MenuItem>
                <MenuItem value="Good">Good</MenuItem>
                <MenuItem value="Excellent">Excellent</MenuItem>
                <MenuItem value="Absent">Absent</MenuItem>
              </Select>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              onClick={(event) => {
                updateProgram();
              }}
            >
              Update Progress Report
            </Button>
          </Box>
        </Box>
      </Modal>
      <div style={{ height: 400, width: "100%", backgroundColor: "white" }}>
        <DataTable header={progressHeader} data={reports} />
      </div>
    </>
  );
}
