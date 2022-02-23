import { API } from "./auth";

const submitSynopsis = () => {
  API.post("/submit-synopsis", {
    email: userEmail,
    password: userPassword,
  })
    .then((res) => {
      const data = res.data.user;
      console.log(data);
      navigate("/Dashboard");
    })
    .catch((err) => {
      console.log(err);
    });
};
