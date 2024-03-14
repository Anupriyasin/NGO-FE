import axios from "axios";

export const getpincode = async (pin) =>
await axios
.get(`https://api.postalpincode.in/pincode/${pin}`)
.then((response) => {
  return response.data;
})
.catch((error) => {
  return "Error - " + error;
});

export const getbranchfromifsccode = async (ifsc) =>
await axios
.get(`https://ifsc.razorpay.com/${ifsc}`)
.then((response) => {
  return response.data;
})
.catch((error) => {
  return "Error - " + error;
});