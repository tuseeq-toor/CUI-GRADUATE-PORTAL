import axios from "axios";
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    var { token } = user;
    console.log(token);
    return token;
  }
};
const API_PdfReports = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

const generateSynopsisReport = async (data) => {
  let token = getToken();
  try {
    const res = await API_PdfReports.post(
      "pdfReports/generate-synopsis-report",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error.response;
  }
};
const downlaodSynopsisReport = async (registrationNo) => {
  console.log("registraitionNO", registrationNo);
  window.open(
    `${process.env.REACT_APP_URL}/pdfReports/generate-synopsis-report/${registrationNo}`
  );
};

const generateThesisReport = async (data) => {
  let token = getToken();
  try {
    const res = await API_PdfReports.post(
      "pdfReports/generate-thesis-report",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    return error.response;
  }
};
const downlaodThesisReport = async (registrationNo) => {
  console.log("registraitionNO", registrationNo);
  window.open(
    `${process.env.REACT_APP_URL}/pdfReports/generate-thesis-report/${registrationNo}`
  );
};
const pdfReportsService = {
  generateSynopsisReport,
  downlaodSynopsisReport,
  generateThesisReport,
  downlaodThesisReport,
};
export default pdfReportsService;
