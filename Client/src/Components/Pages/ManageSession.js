import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";

import Box from "@mui/material/Box";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { TextField } from "@mui/material";

import DataTable from "../UI/TableUI";
import axios from "axios";
import { Button } from "@mui/material";
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ManageSession() {
  const [sessionlist, setsessionlist] = useState([]);
  const [gettoken, settoken] = useState("");
  const [selectedobj, setselectedobj] = useState({});
  const [title, settitle] = useState("");
  const [description, setdescription] = useState("");
  const [status, setstatus] = useState("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [getprograms, setPrograms] = useState([]);

  const [psname, setpsname] = useState("");
  const [plname, setplname] = useState("");
  const [pdesc, setpdesc] = useState("");
  const [pminsem, setpminsem] = useState("");
  const [pmaxsem, setpmaxsem] = useState("");
  const [pdurat, setpdurat] = useState("");
  const [pcredit, setpcredit] = useState("");
  const [penable, setpenable] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    var { token } = user;
    console.log(token);
    settoken(token);

    axios
      .get("http://localhost:3000/sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("testing new get data");
        console.log(response.data);
        var newarr = response.data.map((obj) => ({
          ...obj,
          id: obj._id,
        }));
        console.log(newarr);
        setsessionlist(newarr);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateProgram = () => {
    var obj = {};
    if (title !== "") {
      obj.title = title;
      settitle("");
    }

    if (description != "") {
      obj.description = description;
      setdescription("");
    }

    if (status != "") {
      if (status == "enable") {
        obj.status = true;
        setstatus("");
      } else {
        obj.status = false;

        setstatus("");
      }
    }

    console.log(obj);

    axios
      .patch(
        "http://localhost:3000/sessions/updatesession/" + selectedobj._id,
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
        alert("Session Updated");
      })
      .catch((err) => console.log(err));
  };

  function getData() {
    const user = JSON.parse(localStorage.getItem("user"));

    var { token } = user;
    console.log(token);
    settoken(token);

    axios
      .get("http://localhost:3000/sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log("testing another get data");
        console.log(response.data);
        var newarr = response.data.map((obj) => ({
          ...obj,
          id: obj._id,
        }));
        console.log(newarr);
        setsessionlist(newarr);
      })
      .catch((err) => console.log(err));
  }

  const sessionHeader = [
    {
      field: "title",
      headerName: "Ttile",
      width: 300,
    },
    { field: "description", headerName: "Description", width: 300 },
    { field: "status", headerName: "Status", width: 300 },
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
                  "http://localhost:3000/sessions/deletesession/" +
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
                  alert("session deleted");
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

      // renderCell: (props) => (
      //   <Button style={{backgroundColor:"green"}}
      //    >
      //     Test
      //   </Button>
      // ),
    },
  ];

  /*  const handleSubmit = (event) => {
    event.preventDefault();
    alert("Submitted")
    const data = new FormData(event.currentTarget);
    const userEmail = data.get("email");
    const userPassword = data.get("password");
    axios.post("http://localhost:3000/auth/login", {
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
      });}; */
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            label="Title"
            variant="standard"
            color="secondary"
            focused
            sx={{ mt: 1 }}
            style={{ width: "100%" }}
            placeholder={selectedobj.title}
            value={title}
            onChange={(event) => {
              settitle(event.target.value);
            }}
          />
          <TextField
            label="Description"
            variant="standard"
            color="secondary"
            focused
            sx={{ mt: 1, mb: 1 }}
            style={{ width: "100%" }}
            placeholder={selectedobj.description}
            value={description}
            onChange={(event) => {
              setdescription(event.target.value);
            }}
          />

          <FormControl variant="standard" sx={{ width: 220, mt: 1.5 }}>
            <InputLabel color="secondary" id="cars">
              Enable Program?:
            </InputLabel>
            <Select
              variant="standard"
              name="cars"
              labelId="cars"
              id="cars"
              color="secondary"
              /* value={age} */
              onChange={(event) => {
                setpenable(event.target.value);
              }}
              label="Enable Program?:"
            >
              <MenuItem value="enable">enable</MenuItem>
              <MenuItem value="disable">disable</MenuItem>
            </Select>
          </FormControl>
          <br />
          <Button
            color="secondary"
            variant="contained"
            sx={{ mt: 1 }}
            onClick={(event) => {
              updateProgram();
            }}
          >
            Update
          </Button>
        </Box>
      </Modal>
      <div style={{ height: 400, width: "100%", backgroundColor: "white" }}>
        <DataTable header={sessionHeader} data={sessionlist} />
      </div>
    </div>
  );
}
