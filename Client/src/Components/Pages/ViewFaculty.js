import { Button } from "@mui/material";
import React from "react";

import { facultyData } from "../DummyData/DummyData";
import DataTable from "../UI/TableUI";
export default function ViewFaculty() {
  const facultyHeader = [
    {
      field: "Session",
      headerName: "Name",
      width: 200,
    },
    { field: "Description", headerName: "Designation", width: 150 },
    { field: "Status", headerName: "Email", width: 300 },
    {
      field: "actions",
      headerName: "Action",
      width: 200,
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
            onClick={() => {}}
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
  return (
    <>
      <DataTable header={facultyHeader} data={facultyData} />
    </>
  );
}
