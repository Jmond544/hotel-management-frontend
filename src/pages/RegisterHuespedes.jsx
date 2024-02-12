import { useFormik } from "formik";
import TextInput from "../components/TextInput";
import TableHuespedes from "../components/TableHuespedes";
import { FaUser, FaAddressCard, FaPhoneAlt } from "react-icons/fa";
import { IoMail, IoAddCircle } from "react-icons/io5";
import { FaPaypal } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { useReservationInput } from "../store/reservationInput";
import { useNavigate } from "react-router-dom";
import { createReservationRequest } from "../api/reservation.api.js";
import { createPaymentRequest } from "../api/payment.api.js";

export default function RegisterReservation() {
  const data = useReservationInput.getState();
  const [huespedes, setHuespedes] = useState(data.huespedes);
  const { setListHuespedes, statusPartialComplete } = useReservationInput();
  const [isSending, setIsSending] = useState(false);
  const navigate = useNavigate();

  const handleButton = async () => {
    setIsSending(true);
    const resultPayment = await createPaymentRequest({
      data,
    });
    console.log(resultPayment);
    if (resultPayment.status == 200) {
      const { message, status } = await createReservationRequest({ data });
      console.log(message);
      console.log(status);
    }
    setIsSending(false);
  };

  const formik = useFormik({
    initialValues: {
      nombre: "",
      apellido: "",
      dni: "",
      telefono: "",
      mail: "",
    },

    onSubmit: (values) => {
      setHuespedes((prev) => [...prev, values]);
      setListHuespedes({ huespedes: [...huespedes, values] });
      formik.resetForm();
    },

    validate: (values) => {
      const errors = {};

      if (!values.nombre) {
        errors.nombre = "Requerido";
      } else if (values.nombre.length > 50) {
        errors.nombre = "Los nombres deben tener menos de 50 caracteres";
      }
      if (!values.apellido) {
        errors.apellido = "Requerido";
      } else if (values.apellido.length > 50) {
        errors.apellido = "Los apellidos deben tener menos de 50 caracteres";
      }
      if (!values.dni) {
        errors.dni = "Requerido";
      } else if (isNaN(values.dni)) {
        errors.dni = "El DNI debe ser un número";
      } else if (values.dni.length !== 8) {
        errors.dni = "El DNI debe tener 8 caracteres";
      }
      if (!values.telefono) {
        errors.telefono = "Requerido";
      } else if (isNaN(values.telefono)) {
        errors.telefono = "El teléfono debe ser un número";
      } else if (values.telefono.length !== 9) {
        errors.telefono = "El teléfono debe tener 9 caracteres";
      }
      if (!values.mail) {
        errors.mail = "Requerido";
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.mail)) {
        errors.mail = "El mail no es válido";
      } else if (values.mail.length > 50) {
        errors.mail = "El mail debe tener menos de 50 caracteres";
      }

      return errors;
    },
  });

  useEffect(() => {
    if (!statusPartialComplete) {
      navigate("/register-reservation");
    }
  }, []);

  return (
    <div className="pt-20 pb-10 flex flex-col gap-4">
      <h1 className="text-center text-xl font-bold">Registrar huespedes</h1>
      <div className="px-10 lg:px-20 xl:px-40 flex flex-col gap-6">
        <form onSubmit={formik.handleSubmit} className="">
          <div className="container flex flex-col gap-4 p-4 md:p-8 shadow-xl border rounded-2xl border-slate-900/20 dark:border-slate-300/20 items-start">
            <div className="flex flex-wrap justify-center gap-8">
              <TextInput
                formik={formik}
                id="nombre"
                placeholder="Ingrese sus nombres"
                type="text"
                icon={<FaUser />}
                nameLavel="Nombres"
              />
              <TextInput
                formik={formik}
                id="apellido"
                placeholder="Ingrese sus apellidos"
                type="text"
                icon={<FaUser />}
                nameLavel="Apellidos:"
              />
              <TextInput
                formik={formik}
                id="dni"
                placeholder="Ingrese su DNI"
                type="text"
                icon={<FaAddressCard />}
                nameLavel="DNI:"
              />
              <TextInput
                formik={formik}
                id="telefono"
                placeholder="Ingrese su teléfono"
                type="text"
                icon={<FaPhoneAlt />}
                nameLavel="Teléfono:"
              />

              <TextInput
                formik={formik}
                id="mail"
                placeholder="Ingrese su mail"
                type="email"
                icon={<IoMail />}
                nameLavel="Mail:"
                pattern={"^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$"}
              />
            </div>
            <button
              className="flex flex-row ml-auto items-center gap-4 bg-slate-900 dark:bg-slate-300 text-slate-50 font-bold py-2 px-4 rounded-2xl mt-4 hover:bg-slate-900/90 dark:hover:bg-slate-300/90 transition-all duration-300 ease-in-out"
              type="submit"
            >
              <IoAddCircle className="text-xl" />
              Agregar huesped
            </button>
          </div>
        </form>
        <TableHuespedes data={huespedes} />
        <button
          className="flex flex-row justify-center text-center items-center gap-4 bg-yellow-500  font-bold py-2 px-4 rounded-2xl mt-4 hover:bg-yellow-500/80 dark:hover:bg-slate-300/90 transition-all duration-300 ease-in-out"
          type="submit"
          onClick={handleButton}
          disabled={isSending}
        >
          {isSending ? (
            <p>Enviando...</p>
          ) : (
            <>
              <p>
                <span className="text-sky-950">Registrar reserva usando</span>{" "}
                <span className="text-blue-950">Pay</span>
                <span className="text-teal-600">Pal</span>
              </p>
              <FaPaypal className="text-blue-950 text-2xl" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
