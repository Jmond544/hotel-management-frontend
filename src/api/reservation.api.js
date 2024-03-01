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
    console.log(tipoFiltro, valor, fechaInicio, fechaFin.toISOString().slice(0, 10));
    const response = await instanceAxios.get(
      `/api/reservation/query?tipoFiltro=${tipoFiltro}&valor=${valor}&fechaInicio=${fechaInicio}&fechaFin=${fechaFin.toISOString().slice(0, 10)}`
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
};

export const getReservationByIdRequest = async ({ id }) => {
  try {
    const response = await instanceAxios.get(`/api/reservation/${id}`);
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const updateStatusPayment = async ({ id, status }) => {
  try {
    const response = await instanceAxios.put(`/api/reservation/${id}`, {
      status,
    });
    return { message: response.data.message, status: response.status };
  } catch (error) {
    console.log(error.response.data.message);
    return {
      message: error.response.data.message,
      status: error.response.status,
    };
  }
};

export const updateReservationRequest = async ({
  id,
  tipoServicio,
  fechaInicio,
  fechaFin,
  mailPago,
  telefonoPago,
  habitaciones,
}) => {
  try {
    const formatHabitaciones = habitaciones.map((habitacion) => ({ numero: habitacion }));
    const response = await instanceAxios.put(`/api/reservation/update/${id}`, {
      tipoServicio,
      fechaInicio,
      fechaFin,
      mailPago,
      telefonoPago,
      habitaciones: formatHabitaciones,
    });
    return { message: response.data.message, status: response.status };
  } catch (error) {
    console.log(error.response.data.message);
    return {
      message: error.response.data.message,
      status: error.response.status,
    };
  }
};
