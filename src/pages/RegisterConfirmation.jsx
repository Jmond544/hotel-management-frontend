import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { capturePaymentRequest } from "../api/payment.api.js";
import NotAccess from "./NotAccess.jsx";
import { useState } from "react";

export default function RegisterConfirmation() {
  const location = useLocation();
  const [notAccess, setNotAccess] = useState(true);
  const [message, setMessage] = useState("");
  const [estado, setEstado] = useState(0);

  useEffect(() => {
    const queryString = new URLSearchParams(location.search);
    const token = queryString.get("token");
    const PayerID = queryString.get("PayerID");

    if (token && PayerID) {
      const capturePayment = async () => {
        const { message, status } = await capturePaymentRequest({
          token,
          PayerID,
        });

        setEstado(estado === 0 ? status : 0);

        setNotAccess(false);

        setMessage("Se registró el pago ¡Reserva realizada con éxito!");

        console.log(message, status);
      };

      capturePayment();
    }
  }, []);

  return (
    <div className="pt-16">
      {notAccess ? (
        <NotAccess />
      ) : (
        <div className="flex flex-col justify-center items-center h-screen text-center">
          <h1 className="text-4xl font-bold text-green-600">¡¡Felicitaciones!!</h1>
          <p className="mt-4 text-xl text-gray-500">
            {message}
          </p>
        </div>
      )}
    </div>
  );
}
