import axios from "axios";

const baseUrl = axios.create({
  baseURL: "https://forumevaserver.yerosen.com/api",
  // baseURL: "http://localhost:5555/api",
});

export default baseUrl;
