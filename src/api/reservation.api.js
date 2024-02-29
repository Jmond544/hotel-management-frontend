import { instanceAxios } from "./axiosInstance";

export const createReservationRequest = async ({ data }) => {
  try {
    const response = await instanceAxios.post("/api/reservation", data);
    return { message: response.data.message, status: response.status };
  } catch (error) {
    console.log(error.response.data.message);
    return {
      message: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const queryReservationsRequest = async ({
  tipoFiltro,
  valor,
  fechaInicio,
  fechaFin,
}) => {
  try {
    const response = await instanceAxios.get(
      `/api/reservation/query?tipoFiltro=${tipoFiltro}&valor=${valor}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const deleteReservationRequest = async ({ id }) => {
  try {
    const response = await instanceAxios.delete(`/api/reservation/${id}`);
    return { message: response.data.message, status: response.status };
  } catch (error) {
    console.log(error.response.data.message);
    return {
      message: error.response.data.message,
      status: error.response.status,
    };
  }
}