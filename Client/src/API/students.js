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
  baseURL: process.env.REACT_APP_URL,
});
const submitSynopsis = async (data) => {
  let token = getToken();
  try {
    console.log(data + "apisubmit");
    const res = await API_STUD.post("students/submit-synopsis", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
};
const submitThesis = async (data) => {
  let token = getToken();
  try {
    console.log(data + "thesisApiSubmit");
    const res = await API_STUD.post("students/submit-thesis", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    console.log(error.response);
    return error.response;
  }
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
  submitThesis,
};

export default studentService;
