import axios from "axios";
import { API_URL } from "./config.js";

// Crea una nueva instancia de Axios
export const instanceAxios = axios.create({
  baseURL: API_URL,
  //timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Agrega un interceptor para actualizar el token antes de cada solicitud
instanceAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["X-Access-Token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
