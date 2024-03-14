import axios from "./constant";

// axios.defaults.withCredentials = true;

export const loginApi = async (data) =>
  await axios
    .post("/login", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const sendOTP = async (data) =>
  await axios
    .post("/forgot_password_send_otp", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const validateOTP = async (data) =>
  await axios
    .post("/validate_otp", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });

export const resetPassword = async (data) =>
  await axios
    .post("/reset_password", data)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return "Error - " + error;
    });
