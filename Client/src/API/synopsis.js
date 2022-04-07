import axios from "axios";
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    var { token } = user;
    console.log(token);
    return token;
  }
};

export const API_SYNOPSIS = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

const createSchedule = async (data) => {
  let token = getToken();
  try {
    const res = await API_SYNOPSIS.post("synopsis/add-SynopsisSchedule", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    return res;
  } catch (error) {
    return error.response;
  }
};

const synopsisService = {
  createSchedule,
};

export default synopsisService;
