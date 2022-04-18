import React, { useEffect, useState } from "react";
import { progressData, studentData } from "../DummyData/DummyData";
import DataTable from "../UI/TableUI";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
} from "@mui/material";
import Modal from "@mui/material/Modal";

import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { TextField } from "@mui/material";

const style = {
  position: "absolute",
  display: "flex",
  flexDirection: "column",
  /* gap: ".5rem", */
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",

  /* border: "2px solid #000", */
  boxShadow: 24,
  p: 4,
};

export default function ManageProgressReport() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [getprograms, setPrograms] = useState([]);
  const [gettoken, settoken] = useState("");
  const [student, setStudent] = useState("");
  const [session, setSession] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState("");

  const [selectedobj, setselectedobj] = useState({});
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    var { token } = user;
    console.log(token);
    settoken(token);

    axios
      .get("http://localhost:3000/programs/getprogram", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("testing new get data");
        console.log(response.data.programlist);
        var newarr = response.data.programlist.map((obj) => ({
          ...obj,
          id: obj._id,
        }));
        console.log(newarr);
        setPrograms(newarr);
      })
      .catch((err) => console.log(err));
  }, []);

  function getData() {
    const user = JSON.parse(localStorage.getItem("user"));

    var { token } = user;
    console.log(token);
    settoken(token);

    axios
      .get("http://localhost:3000/programs/getprogram", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("testing another get data");
        console.log(response.data.programlist);
        var newarr = response.data.programlist.map((obj) => ({
          ...obj,
          id: obj._id,
        }));
        console.log(newarr);
        setPrograms(newarr);
      })
      .catch((err) => console.log(err));
  }
  const progressHeader = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "Session",
      headerName: "Student",
      width: 200,
    },
    { field: "Description", headerName: "Session", width: 200 },
    { field: "Status", headerName: "Status", width: 200 },
    { field: "Comments", headerName: "Comments", width: 400 },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: (props) => (
        <>
          <Button
            onClick={() => {
              axios
                .delete(
                  "http://localhost:3000/programs/deleteprogram/" +
                    props.row.id,
                  {
                    headers: {
                      Authorization: `Bearer ${gettoken}`,
                    },
                  }
                )
                .then((response) => {
                  console.log(response.data.msg);

                  getData();
                  alert("Program deleted");
                })
                .catch((err) => console.log(err));
            }}
            variant="contained"
            color="secondary"
            size="small"
            style={{ marginLeft: 0 }}
          >
            Delete
          </Button>

          <Button
            onClick={() => {
              setselectedobj(props.row);
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

  const updateProgram = () => {
    var s = "";
    if (s == "") {
      console.log("checked");
    }
    var obj = {};
    if (student !== "") {
      obj.programShortName = student;
      setStudent("");
    }
    if (session != "") {
      obj.programLongName = session;
      setSession("");
    }
    if (comment != "") {
      obj.description = comment;
      setComment("");
    }
    if (status != "") {
      obj.minSemesters = status;
      setStatus("");
    }

    console.log(obj);

    axios
      .patch(
        "http://localhost:3000/programs/updateprogram/" + selectedobj._id,
        obj,
        {
          headers: {
            Authorization: `Bearer ${gettoken}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.msg);

        getData();
        alert("Program Updated");
      })
      .catch((err) => console.log(err));
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
        <DataTable header={progressHeader} data={progressData} />
      </div>
    </>
  );
}
