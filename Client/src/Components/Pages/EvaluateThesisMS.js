import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import studentService from "../../API/students";
import programsService from "../../API/programs";
import sessionsService from "../../API/sessions";
import synopsisService from "../../API/synopsis";
import { setDate } from "date-fns/esm";
import { Autocomplete } from "@mui/material";
import { top100Films } from "../DummyData/DummyData";

export default function EvaluateThesisMS() {
  const defaultProps = {
    options: top100Films,
    getOptionLabel: (option) => option.title,
  };

  const [autocompleteValue, setAutocompleteValueValue] = useState(null);

  const [students, setStudents] = useState([]);
  const [schedules, setSchedule] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [synopsis, setSynopsis] = useState([]);
  const [selectedSynopsis, setSelectedSynopsis] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState({});
  const [selectedSchedule, setSelectedSchedule] = useState({});
  const [decision, setDecision] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      // const stds = await studentService.getStudents();
      const schd = await synopsisService.getSynopsisSchedules();
      const prog = await programsService.getPrograms();
      const ses = await sessionsService.getSessions();
      const syn = await synopsisService.getSubmittedSynopsis();

      // setStudents(stds);
      setSchedule(schd);
      setPrograms(prog);
      setSessions(ses);
      setSynopsis(syn);
    }
    fetchData();
  }, []);
  const handleRegistrationNo = (e) => {
    schedules.forEach((oneSchedule) => {
      if (e.target.value === oneSchedule.student_id.registrationNo) {
        // const updated = oneStudent;
        // updated["decision"] = decision;
        var schedule = oneSchedule;
        setSelectedSchedule(oneSchedule);
      }
      synopsis.forEach((synopsis) => {
        console.log("Selected Schedule", selectedSchedule);
        console.log("Selected Synopsis", synopsis);
        if (schedule.student_id._id === synopsis.student_id._id) {
          console.log(true);
          setSelectedSynopsis(synopsis);
          setData({ ...data, schedule_id: schedule._id });
        }
      });
    });
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    console.log(data);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const res = await synopsisService.addEvaluation(data);

    synopsisService.updateEvaluation({
      ...data,
      synopsisEvaluation_id: res.data.synopsisEvaluation._id,
      evaluationStatus: res.data.evaluationStatus._id,
    });
    // alert(JSON.stringify(data));
  };
  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Box sx={{ mb: 4 }}>
        <Autocomplete
          {...defaultProps}
          id="controlled-demo"
          value={autocompleteValue}
          onChange={(event, newValue) => {
            setAutocompleteValueValue(newValue);
            console.log(autocompleteValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              variant="outlined"
              color="secondary"
            />
          )}
        />
      </Box>

      <div className="row">
        <div className="col-md-12 mt-3">
          <div className="border">
            <table
              className="small-12 medium-12 large-12 columns table table-sm"
              cellSpacing={0}
              cellPadding={4}
              id="ContentPlaceHolder1_DetailsView1"
              style={{ color: "#333333", borderCollapse: "collapse" }}
            >
              <tbody>
                <tr
                  style={{
                    color: "#333333",
                    backgroundColor: "#F7F6F3",
                  }}
                >
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Registration No
                  </td>
                  <td>{selectedSchedule?.student_id?.registrationNo}</td>
                </tr>
                {console.log(selectedSchedule)}
                <tr style={{ backgroundColor: "White" }}>
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Name
                  </td>
                  <td>{selectedSchedule?.student_id?.username}</td>
                </tr>
                <tr
                  style={{
                    color: "#333333",
                    backgroundColor: "#F7F6F3",
                  }}
                >
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Email
                  </td>
                  <td>{selectedSchedule?.student_id?.email}</td>
                </tr>
                <tr style={{ backgroundColor: "White" }}>
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Program
                  </td>
                  <td>{selectedSchedule?.program_id?.programShortName}</td>
                </tr>
                <tr
                  style={{
                    color: "#333333",
                    backgroundColor: "#F7F6F3",
                  }}
                >
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Course work completion
                  </td>
                  <td>SPRING 2019</td>
                </tr>
                <tr style={{ backgroundColor: "White" }}>
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Comprehensive Exam
                  </td>
                  <td>N/A</td>
                </tr>
                <tr
                  style={{
                    color: "#333333",
                    backgroundColor: "#F7F6F3",
                  }}
                >
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Synopsis Status
                  </td>
                  <td>N/A</td>
                </tr>
                <tr style={{ backgroundColor: "White" }}>
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Thesis Title
                  </td>
                  <td>{selectedSchedule?.student_id?.synopsisTitle}</td>
                </tr>
                <tr
                  style={{
                    color: "#333333",
                    backgroundColor: "#F7F6F3",
                  }}
                >
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Area of Specialization
                  </td>
                  {console.log("selectedSynopsis", selectedSynopsis)}
                  <td>{selectedSynopsis?.specializationTrack}</td>
                </tr>
                <tr style={{ backgroundColor: "White" }}>
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Foreign Submission
                  </td>
                  <td>N/A</td>
                </tr>
                <tr
                  style={{
                    color: "#333333",
                    backgroundColor: "#F7F6F3",
                  }}
                >
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    GAT Subject
                  </td>
                  <td>N/A</td>
                </tr>
                <tr style={{ backgroundColor: "White" }}>
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Status
                  </td>
                  <td>&nbsp;</td>
                </tr>
                <tr
                  style={{
                    color: "#333333",
                    backgroundColor: "#F7F6F3",
                  }}
                >
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Supervisor
                  </td>
                  <td>{selectedSynopsis?.supervisor_id?.fullName}</td>
                </tr>
                <tr style={{ backgroundColor: "White" }}>
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Co-Supervisor
                  </td>
                  <td>{selectedSynopsis?.coSupervisor_id?.fullName}</td>
                </tr>
                <tr
                  style={{
                    color: "#333333",
                    backgroundColor: "#F7F6F3",
                  }}
                >
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Synopsis File
                  </td>
                  <td>
                    <a
                      href="Files/MS/Synopsis/Synopsis_FA17-RSE-002.pdf"
                      target="_blank"
                    >
                      {selectedSynopsis?.synopsisFileName}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 p-4">
          <table style={{ width: "100%" }} className="table table-sm">
            <tbody>
              <tr>
                <th colSpan={4}>
                  <b>
                    After in depth examination of the manuscript following are
                    the recommendations of GAC member
                  </b>
                </th>
              </tr>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <tr>
                    <td>1</td>
                    <td>
                      The candidate is recommended to do <b>minor</b> changings.
                    </td>
                    <td>
                      A Candidate has to submit a manuscript within 1 week.
                    </td>
                    <td>
                      <FormControlLabel
                        value="The candidate is recommended to do minor changings."
                        control={<Radio color="secondary" />}
                        label=""
                        name="evaluationStatus"
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      The candidate is recommended to do <b>major</b> changings.
                    </td>
                    <td>Candidate has to re-appear in next semester. </td>
                    <td>
                      <FormControlLabel
                        value="The candidate is recommended to do major changings."
                        control={<Radio color="secondary" />}
                        label=""
                        name="evaluationStatus"
                        onChange={handleChange}
                      />
                    </td>
                  </tr>
                </RadioGroup>
              </FormControl>
            </tbody>
          </table>
          <TextField
            fullWidth
            sx={{ my: 2 }}
            multiline
            rows={6}
            label="GAC Decision and Recommendations"
            color="secondary"
            name="comment"
            variant="outlined"
            onChange={handleChange}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="secondary"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </div>
      </div>
      {console.log(decision)}
    </Box>
  );
}
