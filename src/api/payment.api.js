import { instanceAxios } from "./axiosInstance";

export const createPaymentRequest = async ({ data }) => {
  try {
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

export const capturePaymentRequest = async ({ token, PayerID }) => {
  try {
    const response = await instanceAxios.get(
      `/api/payment/capture-order?token=${token}&PayerID=${PayerID}`
    );

    return { message: response.data, status: response.status };
  } catch (error) {
    console.log(error.response.data.message);
    return {
      message: error.response.data.message,
      status: error.response.status,
    };
  }
}