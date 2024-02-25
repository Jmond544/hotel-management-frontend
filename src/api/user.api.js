import { instanceAxios } from "./axiosInstance";

export const loginRequest = async ({ data }) => {
  try {
    const response = await instanceAxios.post("/api/user/login", data);
    console.log(response);
    return { message: response.data.message, status: response.status };
  } catch (error) {
    return {
      message: error.response.data.error,
      status: error.response.status,
    };
  }
};

export const verifyLoginRequest = async ({ data }) => {
  try {
    const response = await instanceAxios.post("/api/user/verify", data);
    return { message: response.data.message, status: response.status };
  } catch (error) {
    return {
      message: error.response.data.error,
      status: error.response.status,
    };
  }
}