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
    return res;
  } catch (error) {
    return error.response;
  }
};
const addEvaluation = async (data) => {
  let token = getToken();
  try {
    const res = await API_SYNOPSIS.post("synopsis/add-evaluation", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error.response;
  }
};
const updateEvaluation = async (data) => {
  let token = getToken();
  try {
    const res = await API_SYNOPSIS.patch("synopsis/update-evaluation", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error.response;
  }
};

const getSubmittedSynopsis = async () => {
  let token = getToken();
  try {
    const { data } = await API_SYNOPSIS.get("synopsis/submitted-synopsis", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getSynopsisSchedules = async () => {
  let token = getToken();
  try {
    const { data } = await API_SYNOPSIS.get("synopsis/synopsis-schedule", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};
const getSynopsisEvaluations = async () => {
  let token = getToken();
  try {
    const { data } = await API_SYNOPSIS.get("synopsis/synopsis-evaluation", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

const synopsisService = {
  createSchedule,
  getSubmittedSynopsis,
  getSynopsisSchedules,
  addEvaluation,
  updateEvaluation,
  getSynopsisEvaluations,
};

export default synopsisService;
