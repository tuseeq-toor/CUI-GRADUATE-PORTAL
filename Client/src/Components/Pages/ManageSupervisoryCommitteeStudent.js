import React, { useState, useEffect } from "react";

import studentService from "../../API/students";
import DataTable from "../UI/TableUI";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { red } from "@mui/material/colors";

export default function ManageSupervisoryCommitteeStudent() {
  const [supervisorsList, setSupervisorsList] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState({});
  const [supervisors, setSupervisors] = useState([]);
  const [superviseData, setSuperviseData] = useState([]);
  const [error, setError] = useState(false);
  const superviseHeader = [
    {
      field: "id",
      headerName: "ID",
      width: 300,
    },
    {
      field: "facultyMember",
      headerName: "Faculty Member",
      width: 300,
    },
    {
      field: "designation",
      headerName: "Designation",
      width: 300,
    },
    {
      field: "actions",
      headerName: "Action",
      width: 300,
      renderCell: (props) => (
        <Button
          onClick={() => {
            var data = superviseData.filter((obj) => obj.id !== props.row.id);
            var list = supervisorsList.filter((id) => id !== props.row.id);

            setSupervisorsList(list);
            setSuperviseData(data);
          }}
          variant="contained"
          color="secondary"
          size="small"
          style={{ marginLeft: 0 }}
        >
          Delete
        </Button>
      ),
    },
  ];
  const getSupervisors = async () => {
    let data = await studentService.getSupervisors();

    console.table("SubmissionM", data?.supervisors);
    setSupervisors(data?.supervisors);
  };
  useEffect(() => {
    getSupervisors();
  }, []);

  const submitHandler = () => {
    alert("Selected Supervisors" + supervisorsList);
  };

  const updateList = () => {
    console.log(error, supervisorsList.length);
    if (supervisorsList.length > 2) {
      setError(true);
    } else {
      setError(false);
      setSupervisorsList([...supervisorsList, selectedSupervisor._id]);
      setSuperviseData([
        ...superviseData,
        {
          id: selectedSupervisor._id,
          facultyMember: selectedSupervisor.username,
          designation: "supervisor",
        },
      ]);
    }
  };

  return (
    <>
      <Box
        component="form"
        encType="multipart/form-data"
        onSubmit={submitHandler}
        noValidate
        sx={{ minWidth: 120, marginBottom: "15px" }}
      >
        <FormControl fullWidth color="secondary">
          <InputLabel id="demo-simple-select-label">Supervisor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="supervisor"
            /* value={selectedSupervisor} */

            onChange={(e) => {
              setSelectedSupervisor(e.target.value);
            }}
            label="Supervisor"
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
        <Box sx={{ marginTop: "16px", display: "grid", placeItems: "center" }}>
          <Button
            onClick={() => {
              updateList();
            }}
            variant="contained"
            color="secondary"
          >
            Add Supervisor
          </Button>
          <p style={{ marginBottom: "0px", color: red[400] }}>
            {error && "Maximun of 3 supervisors can be added"}
          </p>
        </Box>
      </Box>
      {console.log(supervisorsList)}
      <DataTable header={superviseHeader} data={superviseData} />
      <Box
        onClick={() => {
          alert(supervisorsList);
        }}
        sx={{ marginTop: "24px", display: "grid", placeItems: "center" }}
      >
        <Button type="submit" variant="contained" color="secondary">
          Submit Supervisory Committee
        </Button>
      </Box>
    </>
  );
}
