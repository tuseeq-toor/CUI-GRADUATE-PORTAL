import axios from "axios";
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    var { token } = user;
    console.log(token);
    return token;
  }
};

export const API_ADMIN = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

const scheduleSynopsisMS = async (data) => {
  let token = getToken();
  try {
    const res = await API_ADMIN.post("admin/add-session", data, {
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
const addSupervisoryCommittee = async (data, id) => {
  console.log(data);
  let token = getToken();
  try {
    const res = await API_ADMIN.post(`admin/addcommittee/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res;
  } catch (error) {
    return error.response;
  }
};
const adminService = {
  scheduleSynopsisMS,
  addSupervisoryCommittee,
};

export default adminService;
