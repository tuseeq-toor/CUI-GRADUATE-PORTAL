import axios from "axios";

export const API = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

const login = async (userEmail, userPassword) => {
  console.log("api" + userEmail, userPassword);
  try {
    const res = await API.post("auth/login", {
      email: userEmail,
      password: userPassword,
    });
    if (res) {
      console.log("Api " + res);
      localStorage.setItem("user", JSON.stringify(res.data));
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const signup = async (data) => {
  try {
    const res = await API.post("auth/signup", data);
    if (res) {
      console.log("Api " + res);
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};
const addFaculty = async (faculty) => {
  console.log("api" + faculty);
  try {
    const res = await API.post("auth/signup", faculty);
    if (res) {
      console.log("Api " + res);
      return res.data;
    }
  } catch (error) {
    console.log(error);
  }
};

const authService = {
  login,
  signup,
  addFaculty,
};
export default authService;
