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

export const API_GAC = axios.create({
  baseURL: process.env.REACT_APP_URL,
});



const getStudents = async () => {
    let token = getToken();
    try {
      const { data } = await API_GAC.get("gac/students", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('fuck fuck fuck')
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  

  const gacService = {
    getStudents
  };
  
  export default gacService;
  