import React, { useEffect, useState } from "react";
import { studentData } from "../DummyData/DummyData";
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
import BackdropModal from "../UI/BackdropModal";

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

export default function ManageStudent() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [getprograms, setPrograms] = useState([]);
  const [gettoken, settoken] = useState("");
  const [registrationNo, setRegistrationNo] = useState("");
  const [name, setName] = useState("");
  const [mail, setmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [status, setStatus] = useState("");
  const [program, setProgram] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [cosupervisor, setCosupervisor] = useState("");
  const [thesisTitle, setThesisTitle] = useState("");
  const [thesisReg, setThesisReg] = useState("");
  const [thesisTrack, setThesisTrack] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [comprehensive, setComprehensive] = useState("");
  const [foriegn, setForiegn] = useState("");
  const [issue, setIssue] = useState("");
  const [synopsisStatus, setSynopsisStatus] = useState("");
  const [thesisStatus, setThesisStatus] = useState("");

  const [selectedobj, setselectedobj] = useState({});
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    var { token } = user;
    console.log(token);
    settoken(token);

    axios
      .get(`${process.env.REACT_APP_URL}/programs/getprogram`, {
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
      .get(`${process.env.REACT_APP_URL}/programs/getprogram`, {
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

  const studentHeader = [
    {
      field: "id",
      headerName: "ID",
      width: 80,
    },
    {
      field: "Session",
      headerName: "Name",
      width: 300,
    },
    { field: "Description", headerName: "Registration No.", width: 300 },
    { field: "Status", headerName: "Email", width: 300 },
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
                  `${process.env.REACT_APP_URL}/programs/deleteprogram/` +
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
                  if (response.status === 200) {
                    setShowDeleteModal(true);
                  }
                  // alert("Program deleted");
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
    if (registrationNo !== "") {
      obj.programShortName = registrationNo;
      setRegistrationNo("");
    }
    if (name != "") {
      obj.programLongName = name;
      setName("");
    }
    if (mail != "") {
      obj.description = mail;
      setmail("");
    }
    if (mobile != "") {
      obj.minSemesters = mobile;
      setMobile("");
    }
    if (status != "") {
      obj.maxSemesters = status;
      setStatus("");
    }
    if (program != "") {
      obj.duration = program;
      setProgram("");
    }
    if (supervisor != "") {
      obj.credits = supervisor;
      setSupervisor("");
    }
    if (cosupervisor != "") {
      if (cosupervisor == "enable") {
        obj.enable = true;
        setCosupervisor("");
      } else {
        obj.enable = false;

        setCosupervisor("");
      }
    }
    if (status != "") {
      obj.maxSemesters = status;
      setStatus("");
    }
    if (program != "") {
      obj.duration = program;
      setProgram("");
    }
    if (supervisor != "") {
      obj.credits = supervisor;
      setSupervisor("");
    }
    if (status != "") {
      obj.maxSemesters = status;
      setStatus("");
    }
    if (program != "") {
      obj.duration = program;
      setProgram("");
    }
    if (supervisor != "") {
      obj.credits = supervisor;
      setSupervisor("");
    }

    console.log(obj);

    axios
      .patch(
        `${process.env.REACT_APP_URL}/programs/updateprogram/` +
          selectedobj._id,
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
        if (response.status === 200) {
          setShowUpdateModal(true);
        }
        // alert("Program Updated");
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
          <Box>
            <FormControl>
              <FormLabel color="secondary">Student</FormLabel>
              <RadioGroup
                row
                name="studentType"
                /* value={formik.values.studentType}
                onChange={formik.handleChange} */
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

            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Box sx={{ width: "50%" }}>
                <TextField
                  id="standard-basic"
                  sx={{
                    width: "100%",
                    marginBottom: "5px",
                  }}
                  label="Registration No."
                  color="secondary"
                  variant="standard"
                />

                <TextField
                  id="standard-basic"
                  sx={{ width: "100%", marginBottom: "5px" }}
                  label="Name"
                  color="secondary"
                  variant="standard"
                />
                <TextField
                  id="standard-basic"
                  sx={{ width: "100%", marginBottom: "5px" }}
                  label="Email"
                  color="secondary"
                  variant="standard"
                />
                <TextField
                  id="standard-basic"
                  sx={{ width: "100%", marginBottom: "5px" }}
                  label="Mobile"
                  color="secondary"
                  variant="standard"
                />
                <TextField
                  id="standard-basic"
                  sx={{ width: "100%", marginBottom: "5px" }}
                  label="Status"
                  color="secondary"
                  variant="standard"
                />
                <Box
                  sx={{ minWidth: 120, marginBottom: "5px", marginTop: "10px" }}
                >
                  <FormControl fullWidth color="secondary">
                    <InputLabel id="demo-simple-select-label">
                      Program
                    </InputLabel>
                    <Select
                      variant="standard"
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
                </Box>
                <Box
                  sx={{ minWidth: 120, marginBottom: "5px", marginTop: "10px" }}
                >
                  <FormControl fullWidth color="secondary">
                    <InputLabel id="demo-simple-select-label">
                      Course Work Completion
                    </InputLabel>
                    <Select
                      variant="standard"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      //value={Program}
                      label="Course Work Completion"
                      //onChange={handleChange}
                    >
                      <MenuItem value="1">N/A</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Box
                  sx={{ minWidth: 120, marginBottom: "5px", marginTop: "10px" }}
                >
                  <FormControl fullWidth color="secondary">
                    <InputLabel id="demo-simple-select-label">
                      Supervisor
                    </InputLabel>
                    <Select
                      variant="standard"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      //value={Program}
                      label="Supervisor"
                      //onChange={handleChange}
                    >
                      <MenuItem value="237">-</MenuItem>
                      <MenuItem value="4209">Dr. Adeel Anjum</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                <Box
                  sx={{ minWidth: 120, marginBottom: "5px", marginTop: "10px" }}
                >
                  <FormControl fullWidth color="secondary">
                    <InputLabel id="demo-simple-select-label">
                      Co-Supervisor
                    </InputLabel>
                    <Select
                      variant="standard"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      //value={Program}
                      label="Co-Supervisor"
                      //onChange={handleChange}
                    >
                      <MenuItem value="237">-</MenuItem>
                      <MenuItem value="4209">Dr. Adeel Anjum</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </Box>
              <Box sx={{ width: "50%" }}>
                <TextField
                  id="standard-basic"
                  sx={{ width: "100%", marginBottom: "5px" }}
                  label="Thesis Title"
                  color="secondary"
                  variant="standard"
                />
                <TextField
                  id="standard-basic"
                  sx={{ width: "100%", marginBottom: "5px" }}
                  label="Thesis Registration"
                  color="secondary"
                  variant="standard"
                />
                <>
                  <TextField
                    id="standard-basic"
                    sx={{ width: "100%", marginBottom: "5px" }}
                    label="Thesis Track"
                    color="secondary"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    sx={{ width: "100%", marginBottom: "5px" }}
                    label="Area of Specialization"
                    color="secondary"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    sx={{ width: "100%", marginBottom: "5px" }}
                    label="Comprehensive"
                    color="secondary"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    sx={{ width: "100%", marginBottom: "5px" }}
                    label="Foriegn Submission"
                    color="secondary"
                    variant="standard"
                  />
                  <TextField
                    id="standard-basic"
                    sx={{ width: "100%", marginBottom: "5px" }}
                    label="Other Issue"
                    color="secondary"
                    variant="standard"
                  />
                </>

                <TextField
                  id="standard-basic"
                  sx={{ width: "100%", marginBottom: "5px" }}
                  label="Synopsis Status"
                  color="secondary"
                  variant="standard"
                />
                <TextField
                  id="standard-basic"
                  sx={{ width: "100%", marginBottom: "5px" }}
                  label="Thesis Status"
                  color="secondary"
                  variant="standard"
                />
              </Box>
            </Box>
          </Box>
          <Box>
            <Button
              variant="contained"
              color="secondary"
              sx={{ mt: 1.5 }}
              onClick={(event) => {
                updateProgram();
              }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Modal>
      <div style={{ height: 400, width: "100%", backgroundColor: "white" }}>
        <DataTable
          header={studentHeader}
          data={studentData} /* data={studentData} */
        />
      </div>
      <BackdropModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        title={"Delete!"}
      >
        Student has been Deleted.
      </BackdropModal>
      <BackdropModal
        showModal={showUpdateModal}
        setShowModal={setShowUpdateModal}
        title={"Update!"}
      >
        Student has been Updated.
      </BackdropModal>
    </>
  );
}
