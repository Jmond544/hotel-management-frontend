import { instanceAxios } from "./axiosInstance";

export const createReservationRequest = async ({ data }) => {
  try {
    const response = await instanceAxios.post("/api/reservation", data);
    return { message: response.data.message , status: response.status};
    
  } catch (error) {
    console.log(error.response.data.message);
    return { message: error.response.data.message , status: error.response.status};
  }
};
