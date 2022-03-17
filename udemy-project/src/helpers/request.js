import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:8001",
});
export default request;
