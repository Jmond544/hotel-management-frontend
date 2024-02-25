import axios from "axios";
import { API_URL } from "./config.js";

export const instanceAxios = axios.create({
  baseURL: API_URL,
  //timeout: 1000,
  headers: {
    "Content-Type": "application/json",
    "X-Access-Token": localStorage.getItem("token"),
  },
});
