import { instanceAxios } from "./axiosInstance";

export const createPaymentRequest = async ({ data }) => {
  try {
    console.log(data);
    const response = await instanceAxios.post(
      "/api/payment/create-order",
      data
    );

    return { message: response.data.links[1].href, status: response.status };
  } catch (error) {
    console.log(error.response.data.message);
    return {
      message: error.response.data.message,
      status: error.response.status,
    };
  }
};
