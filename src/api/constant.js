import axios from "axios";

// Localhost
let domain = "http://localhost:8080/";

// Paras's device
// let domain = "http://192.168.18.56:5000/";

const instance = axios.create({
  // baseURL: domain + "manglacrm/api",
  baseURL: domain ,
  // withCredentials: true // send cookies with requests
});

const baseUrl = () => {
  return domain;
}

export default instance;
export {
  baseUrl
}