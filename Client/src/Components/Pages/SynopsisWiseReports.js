import React, { useState, useEffect } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Box from "@mui/material/Box";
import studentService from "../../API/students";
import profile from "../../../src/avatar-1.jpg";

export default function SuperivorReport() {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    async function get() {
      var data = await studentService.getStudents();
      console.log("dataaa", data);
      // alert("helo");
      console.log("data", data[0]._id);
      setStudents(data);
    }
    get();
  }, []);

  return (
    <>
      <Box sx={{ minWidth: 120, mb: 6 }}>
        <FormControl fullWidth color="secondary">
          <InputLabel id="demo-simple-select-label">Supervisor</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            //value={age}
            label="Supervisor"
            //onChange={handleChange}
          >
            <MenuItem selected="selected" value="237">
              -
            </MenuItem>
            <MenuItem value="239">Dr. Abid Khan</MenuItem>
            <MenuItem value="4209">Dr. Adeel Anjum</MenuItem>
            <MenuItem value="25565">Dr. Adnan Akhunzada</MenuItem>
            <MenuItem value="2281">Dr. Ahmad R. Shahid</MenuItem>
            <MenuItem value="4208">Dr. Aimal Tariq Rextin</MenuItem>
            <MenuItem value="6925">Dr. Amir Hanif Dar</MenuItem>
            <MenuItem value="3014">Dr. Ashfaq Hussain Farooqi</MenuItem>
            <MenuItem value="663">Dr. Assad Abbas</MenuItem>
            <MenuItem value="3012">Dr. Basit Raza</MenuItem>
            <MenuItem value="2089">Dr. Farhana Jabeen</MenuItem>
            <MenuItem value="3343">Dr. Ghufran Ahmed</MenuItem>
            <MenuItem value="252">Dr. Hasan Ali Khattak</MenuItem>
            <MenuItem value="2187">Dr. Iftikhar Azim Niaz</MenuItem>
            <MenuItem value="253">Dr. Inayat-ur-Rehman</MenuItem>
            <MenuItem value="284">Dr. Javed Iqbal</MenuItem>
            <MenuItem value="654">Dr. Majid Iqbal Khan</MenuItem>
            <MenuItem value="3344">Dr. Malik Ahmad Kamran</MenuItem>
            <MenuItem value="633">Dr. Mansoor Ahmed</MenuItem>
            <MenuItem value="264">Dr. Mariam Akbar</MenuItem>
            <MenuItem value="4243">Dr. Masoom Alam</MenuItem>
            <MenuItem value="2678">Dr. Mubeen Ghafoor</MenuItem>
            <MenuItem value="282">Dr. Muhammad Asim Noor</MenuItem>
            <MenuItem value="263">Dr. Muhammad Imran</MenuItem>
            <MenuItem value="281">Dr. Muhammad Manzoor ilahi Tamimy</MenuItem>
            <MenuItem value="19074">Dr. Muhammad Waqar</MenuItem>
            <MenuItem value="3356">Dr. Munam Ali Shah</MenuItem>
            <MenuItem value="1211">Dr. Nadeem Javaid</MenuItem>
            <MenuItem value="659">Dr. Saif ur Rehman Khan</MenuItem>
            <MenuItem value="280">Dr. Saif Ur Rehman Malik</MenuItem>
            <MenuItem value="10430">Dr. Sajjad A. Madani</MenuItem>
            <MenuItem value="272">Dr. Shahid Hussain</MenuItem>
            <MenuItem value="19178">Dr. Sheneela Naz</MenuItem>
            <MenuItem value="240">Dr. Syed Sohaib Ali</MenuItem>
            <MenuItem value="245">Dr. Tahir Mustafa Madni</MenuItem>
            <MenuItem value="784">Dr. Tehseen Zia</MenuItem>
            <MenuItem value="19205">Dr. Usman Yaseen</MenuItem>
            <MenuItem value="273">Dr. Uzair Iqbal</MenuItem>
            <MenuItem value="3656">Dr. Zobia Rehman</MenuItem>
            <MenuItem value="4564">Prof. Dr. Sohail Asghar</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {students.map((student) => {
        return (
          <div>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 1rem",
              }}
            >
              <div>
                <img
                  src={profile || student?.profilePicture}
                  alt=""
                  style={{
                    height: "128px",
                    width: "128px",
                    borderRadius: "100%",
                    marginBottom: "1rem",
                  }}
                />
                <div
                  style={{
                    margin: "0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "20rem",
                      margin: "0",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h3 style={{ margin: "0 1rem 0 0" }}>Name:</h3>
                    <p style={{ margin: "0" }}>{student?.username}</p>
                  </div>
                  <h3
                    style={{
                      marginRight: "1rem",
                      marginTop: "0",
                      marginBottom: "0",
                    }}
                  >
                    Registration Number:
                  </h3>
                  <p style={{ marginTop: "0", marginBottom: "0" }}>
                    {student?.registrationNo}
                  </p>
                </div>
                <div
                  style={{
                    margin: "1rem 0 0 0",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "20rem",
                      margin: "0",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <h3 style={{ margin: "0 1rem 0 0" }}>Father Name:</h3>
                    <p style={{ margin: "0" }}>{student?.fatherName}</p>
                  </div>
                  <h3
                    style={{
                      marginRight: "1rem",
                      marginTop: "0",
                      marginBottom: "0",
                    }}
                  >
                    Supervisor:
                  </h3>
                  <p style={{ marginTop: "0", marginBottom: "0" }}>
                    {student.supervisor_id?.fullName}
                  </p>
                </div>
              </div>

              {/*  <img
                src={student?.profilePic}
                alt=""
                style={{
                  objectFit: "contain",
                  height: "6rem",
                  borderRadius: "50%",
                }}
              /> */}
            </Box>
            <table
              cellSpacing={0}
              cellPadding={4}
              style={{
                color: "#333333",
                borderCollapse: "separate",
                margin: "1rem",
              }}
            >
              <tbody>
                <tr
                  style={{
                    color: "#333333",
                  }}
                >
                  <td
                    valign="top"
                    style={{
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  ></td>
                </tr>

                {/* <tr
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
                  <td>{student?.registrationNo}</td>
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
                  <td>{student?.username}</td>
                </tr> */}

                {/* <tr style={{ color: "#333333", backgroundColor: "#F7F6F3" }}>
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Father's Name
                  </td>
                  <td>{student?.fatherName}</td>
                </tr> */}
                <tr
                  style={{
                    backgroundColor: "white",
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
                  <td>{student?.email}</td>
                </tr>
                <tr style={{ color: "#333333", backgroundColor: "#F7F6F3" }}>
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    Mobile No.
                  </td>
                  <td>{student?.mobile}</td>
                </tr>
                <tr
                  style={{
                    backgroundColor: "white",
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
                    Track
                  </td>
                  <td>{student?.thesisTrack}</td>
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
                    Thesis Title
                  </td>
                  <td>{student?.synopsisTitle}</td>
                </tr>
                <tr
                  style={{
                    backgroundColor: "white",
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
                    Registration Date
                  </td>
                  <td>{student?.thesisRegistration}</td>
                </tr>
                <tr style={{ color: "#333333", backgroundColor: "#F7F6F3" }}>
                  <td
                    valign="top"
                    style={{
                      backgroundColor: "#E9ECF1",
                      fontWeight: "bold",
                      width: "20%",
                    }}
                  >
                    External
                  </td>
                  <td>{/* {selectedSchedule?.student_id?.synopsisTitle} */}</td>
                </tr>
                <tr
                  style={{
                    backgroundColor: "white",
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
                    Thesis Status
                  </td>

                  <td>{/* {selectedSynopsis?.specializationTrack} */}</td>
                </tr>

                {/* <tr
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
                  <td>{student.supervisor_id?.fullName}</td>
                </tr> */}
              </tbody>
            </table>
            <div
              style={{
                width: "10%",
                minWidth: "6rem",
                maxWidth: "10rem",
                margin: "2rem auto",
                borderTop: "8px dotted #572E74",
              }}
            />
          </div>
        );
      })}
    </>
  );
}
