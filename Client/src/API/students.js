// import { API } from "./auth";
import axios from "axios";
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  if (user) {
    var { token } = user;
    console.log(token);
    return token;
  }
};

export const API_STUD = axios.create({
  baseURL: "http://localhost:3000/",
});
const submitSynopsis = (data) => {
  let token = getToken();
  console.log(data + "apisubmit");
  API_STUD.post("students/submit-synopsis", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getSupervisors = async () => {
  let token = getToken();
  try {
    const { data } = await API_STUD.get("students/supervisors", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};

const uploadFile = (data) => {
  console.log(data);
  API_STUD.post("/upload", data)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
const studentService = {
  submitSynopsis,
  uploadFile,
  getSupervisors,
};

export default studentService;
