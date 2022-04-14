import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Autocomplete } from "@mui/material";
import { top100Films } from "../DummyData/DummyData";
import synopsisService from "../../API/synopsis";
import programsService from "../../API/programs";
import sessionsService from "../../API/sessions";

export default function EvaluateSynopsisPhD() {
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
                  <td>FA17-PCS-005</td>
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
                    Name
                  </td>
                  <td>HAROON HAIDER KHAN</td>
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
                  <td>FA17-PCS-005@isbstudent.comsats.edu.pk</td>
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
                  <td>PhD (CS)</td>
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
                  <td>FA18</td>
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
                  <td>FALL 2019</td>
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
                  <td>
                    Handling Pixel Entropy with Deep Dynamic Semantic
                    Segmentation Model{" "}
                  </td>
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
                  <td>
                    ARTIFICIAL INTELLIGENCE , MACHINE LEARNING , DEEP LEARNING
                  </td>
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
                  <td>Dr. Majid Iqbal Khan</td>
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
                  <td>Dr. Tehseen Zia</td>
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
                      href="Files/PhD/Synopsis/Synopsis_fa17-pcs-005.pdf"
                      target="_blank"
                    >
                      Synopsis_fa17-pcs-005.pdf
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
          <table className="border table table-sm">
            <tbody>
              <tr>
                <th colSpan={4}>
                  <b>
                    After in depth examination of the manuscript following are
                    the recommendations of GAC member
                  </b>
                </th>
              </tr>
              <tr>
                <td>1</td>
                <td>
                  The candidate is recommended to do <b>minor</b> changings.
                </td>
                <td>
                  A candidate has to re-submit manuscript (e.g. within 4 weeks
                  for PhD student and 1 week for MS Student).
                </td>
                <td>
                  <input
                    id="ContentPlaceHolder1_rbtnMinor"
                    type="radio"
                    name="ctl00$ContentPlaceHolder1$againcb"
                    defaultValue="rbtnMinor"
                    defaultChecked="checked"
                  />
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>
                  The candidate is recommended to do <b>major</b> changings.
                </td>
                <td>Candidate has to appear in next semester. </td>
                <td>
                  <input
                    id="ContentPlaceHolder1_rbtnMajor"
                    type="radio"
                    name="ctl00$ContentPlaceHolder1$againcb"
                    defaultValue="rbtnMajor"
                  />
                </td>
              </tr>
              <tr>
                <td>3</td>
                <td>
                  The candidate is <b>not allowed</b> to resubmit the same
                  manuscript for reexamination
                </td>
                <td>
                  Candidate has to appear in next semester with different idea.
                </td>
                <td>
                  <input
                    id="ContentPlaceHolder1_rbtnNotAllowed"
                    type="radio"
                    name="ctl00$ContentPlaceHolder1$againcb"
                    defaultValue="rbtnNotAllowed"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <TextField
            fullWidth
            sx={{ mt: 4, mb: 2 }}
            multiline
            rows={6}
            label="GAC Decision and Recommendations"
            color="secondary"
            name="comment"
            variant="outlined"
            /* onChange={handleChange} */
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
          >
            Submit
          </Button>
        </div>
      </div>
    </Box>
  );
}
