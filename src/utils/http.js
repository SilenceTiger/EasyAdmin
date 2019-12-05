import axios from "axios";

// create an axios instance
const service = axios.create({
  baseURL: "",
  timeout: 15000, // request timeout
  withCredentials: true
});
service.interceptors.response.use(response => {
  let res = response.data;
  return res;
});

export default service;
