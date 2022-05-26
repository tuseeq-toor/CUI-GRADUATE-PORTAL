import { Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import synopsisService from "../../API/synopsis";
import thesisService from "../../API/thesis";

import { programWiseData } from "../DummyData/DummyData";
import BackdropModal from "../UI/BackdropModal";
import DataTable from "../UI/TableUI";

export default function SendThesisReport() {
  const { currentRole } = useSelector((state) => state.userRoles);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [evaluations, setEvaluations] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await thesisService.getThesisEvaluations();

      console.log(res);

      const goEvaluated = res.filter((item) => item?.goEvaluation?.isEvaluated);

      let filteredThesisEvaluation = [];
      if (currentRole.toLowerCase().includes("ms")) {
        filteredThesisEvaluation = goEvaluated.filter((item) =>
          item.schedule_id.student_id.program_id.programShortName
            .toLowerCase()
            .includes("ms")
        );
      } else if (currentRole.toLowerCase().includes("phd")) {
        filteredThesisEvaluation = goEvaluated.filter((item) =>
          item.schedule_id?.student_id?.program_id?.programShortName
            .toLowerCase()
            .includes("phd")
        );
      } else {
        filteredThesisEvaluation = goEvaluated;
      }

      console.log(filteredThesisEvaluation);

      const data = filteredThesisEvaluation.map((res) => ({
        name: res?.schedule_id?.student_id?.username,
        registrationNo: res?.schedule_id?.student_id?.registrationNo,
        email: res?.schedule_id?.student_id?.email,
        professor: res?.evaluator_id?.username,
        id: res?._id,
      }));

      setEvaluations(data);
    }

    fetchData();
  }, []);

  console.log(evaluations);

  const programWiseHeader = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },
    { field: "registrationNo", headerName: "Registration No.", width: 200 },
    { field: "email", headerName: "Email", width: 350 },
    { field: "professor", headerName: "Professor", width: 200 },
    {
      field: "actions",
      headerName: "Action",
      width: 200,
      renderCell: (props) => (
        <>
          <Button
            /* onClick={() => {
              setselectedobj(props.row);
              handleOpen();
            }} */
            variant="contained"
            color="secondary"
            size="small"
            style={{ marginLeft: 10 }}
          >
            Send Report
          </Button>
        </>
      ),
    },
  ];

  const sendReportHandler = () => {
    setShowReportModal(true);
  };

  return (
    <>
      <div style={{ height: 400, width: "100%", backgroundColor: "white" }}>
        <DataGrid
          rows={evaluations}
          columns={programWiseHeader}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
      <div>
        <Button
          sx={{ mt: 2 }}
          variant="contained"
          size="large"
          color="secondary"
          onClick={sendReportHandler}
        >
          Send Report
        </Button>
      </div>

      <BackdropModal
        showModal={showReportModal}
        setShowModal={setShowReportModal}
        title={"Report!"}
      >
        Report/Reports has been Sent.
      </BackdropModal>
      <BackdropModal
        showModal={showErrorModal}
        setShowModal={setShowErrorModal}
        title={"Error!"}
      >
        Something went wrong.
      </BackdropModal>
    </>
  );
}
