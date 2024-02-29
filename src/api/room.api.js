import { instanceAxios } from "./axiosInstance";

export const getRoomByNumberRequest = async ({ numeroHabitacion }) => {
  try {
    const response = await instanceAxios.get(
      `/api/room?number=${numeroHabitacion}`
    );
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const getRooms = async () => {
  try {
    const response = await instanceAxios.get("/api/room");
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};

export const markRoomAsOccupied = async ({ numeroHabitacion }) => {
  try {
    const response = await instanceAxios.post(`/api/room/${numeroHabitacion}`, {
      estado: "ocupada",
    });
    return response.status;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
};
