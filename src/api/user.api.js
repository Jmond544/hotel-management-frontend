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
    return { message: response.data.message, status: response.status, token: response.data.token};
  } catch (error) {
    return {
      message: error.response.data.error,
      status: error.response.status,
    };
  }
}

export const getProfileRequest = async () => {
  try {
    const response = await instanceAxios.get("/api/user/profile");
    console.log(response)
    return { data: response.data, status: response.status};
  } catch (error) {
    return {
      message: error.response.data.error,
      status: error.response.status,
    };
  }
}