import { API } from "./auth";

const submitSynopsis = (data) => {
  console.log(data + "apisubmit");
  API.post("students/submit-synopsis", data, {
    headers: { "Content-Type": "multipart/form-data" },
  })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const studentService = {
  submitSynopsis,
};

export default studentService;
