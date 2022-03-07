import React, { useState, useEffect } from "react";

import studentService from "../../API/students";
import { useFormik } from "formik";
import * as yup from "yup";
import { supervisorData, supervisorHeader } from "../DummyData/DummyData";
import DataTable from "../UI/TableUI";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

const superviseHeader = [
  {
    field: "id",
    headerName: "ID",
    width: 100,
  },
  {
    field: "facultyMember",
    headerName: "Faculty Member",
    width: 250,
  },
  { field: "designation", headerName: "Designation", width: 250 },
  /* { field: "edit", headerName: "Edit", width: 250 }, */
];

export default function ManageSupervisoryCommitteeStudent() {
  const [supervisorsList, setSupervisorsList] = useState([]);
  const [selectedSupervisor, setSelectedSupervisor] = useState("");
  const [supervisors, setSupervisors] = useState([]);
  const [superviseData, setSuperviseData] = useState([]);
  const [error, setError] = useState([]);
  const getSupervisors = async () => {
    let data = await studentService.getSupervisors();
    console.table("SubmissionM", data.supervisors);
    setSupervisors(data.supervisors);
  };
  useEffect(() => {
    getSupervisors();
  }, []);

  const validationSchema = yup.object({
    supervisor: yup.array().max(3, "Max nummber for members is"),
  });

  const formik = useFormik({
    initialValues: {
      supervisor: [],
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      let formData = new FormData();

      formData.append("supervisor", values.supervisor);

      // console.log(values);
      let res = await studentService.submitSynopsis(formData);
      setError(res);
      console.log(res);
      // studentService.uploadFile(formData);
    },
  });

  return (
    <>
      <Box
        component="form"
        encType="multipart/form-data"
        onSubmit={formik.handleSubmit}
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
            onChange={setSelectedSupervisor}
            label="Supervisor"
          >
            {supervisors.map((item) => {
              return (
                <MenuItem key={item._id} value={item.username}>
                  {item.username}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        <Box>
          <Button
            onClick={() => {
              supervisorsList.push(
                supervisors.map((item) => {
                  if (item.username === selectedSupervisor.target.value) {
                    return item._id;
                  }
                  return;
                })
              );
              setSuperviseData([
                ...superviseData,
                {
                  id: selectedSupervisor.target.value,
                  facultyMember: selectedSupervisor.target.value,
                  designation: "supervisor",
                  /* edit: <Button>delete</Button>, */
                },
              ]);
              /* superviseData.push({
                ...superviseData,
                // id: selectedSupervisor.target.value,
                id: "1",
                facultyMember: "4",
                designation: "supervisor",
              }); */
              console.log(selectedSupervisor);
              console.log("This is" + superviseData);
              console.log(supervisorsList);
            }}
            variant="contained"
            color="secondary"
          >
            Submit Supervisory Committee
          </Button>
        </Box>
      </Box>
      <DataTable header={superviseHeader} data={superviseData} />
    </>
  );
}
