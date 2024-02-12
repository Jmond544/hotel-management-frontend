import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IoMail } from "react-icons/io5";
import { MdOutlineSkipNext } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import TextInput from "../components/TextInput";
import SelectRoom from "../sections/SelectRoom";
import { useNavigate } from "react-router-dom";
import { useReservationInput } from "../store/reservationInput";
import { useEffect, useState } from "react";

export default function RegisterReservation() {
  const {
    mailPago,
    telefonoPago,
    tipoServicio,
    fechaInicio,
    fechaFin,
    habitaciones,
    setMailPago,
    setTelefonoPago,
    setTipoServicio,
    setFechaInicio,
    setFechaFin,
    setHabitaciones,
    setStatusPartialComplete,
  } = useReservationInput();
  const [roomsSelected, setRoomsSelected] = useState(
    habitaciones.map((room) => room.numero)
  );

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: mailPago ? mailPago : "",
      phone: telefonoPago ? telefonoPago : "",
      tipoServicio: tipoServicio ? tipoServicio : "",
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
      habitaciones: roomsSelected,
    },

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      setMailPago({ mailPago: values.email });
      setTelefonoPago({ telefonoPago: values.phone });
      setTipoServicio({ tipoServicio: values.tipoServicio });
      setFechaInicio({
        fechaInicio: new Date(values.fechaInicio).toISOString().slice(0, 10),
      });
      setFechaFin({
        fechaFin: new Date(values.fechaFin).toISOString().slice(0, 10),
      });
      setHabitaciones({
        habitaciones: roomsSelected.map((room) => ({ numero: room })),
      });
      setStatusPartialComplete({ statusPartialComplete: true });
      navigate("/register-huespedes");
    },

    validate: (values) => {
      const errors = {};

      // verifica el teléfono
      if (!values.phone) {
        errors.phone = "El teléfono es requerido";
      } else if (!/^\d{9}$/.test(values.phone)) {
        errors.phone = "El número de teléfono debe tener exactamente 9 dígitos";
      }

      // verifica el mail
      if (!values.email) {
        errors.email = "El mail es requerido";
      } else if (
        !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(values.email)
      ) {
        errors.email = "El mail no es válido";
      }

      // verifica el tipo de servicio
      if (!values.tipoServicio) {
        errors.tipoServicio = "El tipo de servicio es requerido";
      } else if (
        !["basico", "platino", "premium"].includes(values.tipoServicio)
      ) {
        errors.tipoServicio = "El tipo de servicio no es válido";
      }

      return errors;
    },
  });

  useEffect (() => {
    if (tipoServicio) {
      formik.setFieldValue("tipoServicio", tipoServicio);
    }
  } , []);

  return (
    <div className="pt-20 pb-10 flex flex-col gap-4">
      <h1 className="text-center text-xl font-bold">Registro de reserva</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="px-10 lg:px-20 xl:px-40 flex flex-col gap-6"
      >
        <div className="flex flex-row gap-4">
          <div className="container flex flex-col gap-4 p-4 md:p-8 shadow-xl border rounded-2xl border-slate-900/20 dark:border-slate-300/20 justify-start items-start">
            <h2 className="text-lg font-bold">Información de contacto</h2>

            <TextInput
              formik={formik}
              id="email"
              placeholder="example@example.com"
              type="email"
              icon={<IoMail className="text-xl" />}
              nameLavel="Mail de pago"
              pattern="^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$"
            />

            <TextInput
              formik={formik}
              id="phone"
              placeholder="Enter phone number"
              type="tel"
              icon={<FaPhone className="text-xl" />}
              setFieldTouched={formik.touched.phone}
              nameLavel={"Teléfono"}
              pattern="[0-9]{9}"
            />
          </div>
          <div className="container flex flex-col gap-4 p-4 md:p-8 shadow-xl border rounded-2xl border-slate-900/20 dark:border-slate-300/20 justify-start items-start">
            <h2 className="text-lg font-bold">Detalles reserva</h2>
            <div className="flex flex-col gap-4">
              <label htmlFor="tipoServicio">Tipo de servicio</label>
              <select
                id="tipoServicio"
                name="tipoServicio"
                onChange={formik.handleChange}
                value={formik.values.tipoServicio}
                className="outline-none border-b border-slate-900/20 dark:border-slate-300/20 w-full"
              >
                <option value="">Selecciona el tipo de servicio</option>
                <option value="basico">Basic</option>
                <option value="platino">Platino</option>
                <option value="premium">Premium</option>
              </select>
              {formik.errors.tipoServicio && formik.touched.tipoServicio ? (
                <div className="text-red-500 text-sm">
                  * {formik.errors.tipoServicio}
                </div>
              ) : null}
            </div>

            <label htmlFor="fechaInicio">Fecha inicio:</label>
            <DatePicker
              id="fechaInicio"
              name="fechaInicio"
              selected={formik.values.fechaInicio}
              onChange={(fechaInicio) =>
                formik.setFieldValue("fechaInicio", fechaInicio)
              }
              dateFormat="dd/MM/yyyy"
              includeDateIntervals={[
                {
                  start: new Date(),
                  end: new Date().setDate(new Date().getDate() + 120),
                },
              ]}
              showIcon
              withPortal
              placeholderText="dd/mm/yyyy"
              className="outline-none border-b border-slate-900/20 dark:border-slate-300/20 w-full"
            />

            <label htmlFor="fechaFin">Fecha fin:</label>
            <DatePicker
              id="fechaFin"
              name="fechaFin"
              selected={formik.values.fechaFin}
              onChange={(fechaFin) =>
                formik.setFieldValue("fechaFin", fechaFin)
              }
              dateFormat="dd/MM/yyyy"
              includeDateIntervals={[
                {
                  start: new Date(),
                  end: new Date().setDate(new Date().getDate() + 120),
                },
              ]}
              showIcon
              withPortal
              placeholderText="dd/mm/yyyy"
              className="outline-none border-b border-slate-900/20 dark:border-slate-300/20 w-full"
            />
          </div>
        </div>
        <div className="container flex flex-col gap-4 p-4 md:p-8 shadow-xl border rounded-2xl border-slate-900/20 dark:border-slate-300/20 justify-start items-start">
          <SelectRoom
            roomsSelected={roomsSelected}
            setRoomsSelected={setRoomsSelected}
          />
        </div>
        <button
          className="flex flex-row gap-2 items-center justify-center ml-auto bg-slate-900 dark:bg-slate-300 text-slate-50 w-40 font-bold py-2 px-4 rounded-2xl mt-4 hover:bg-slate-900/90 dark:hover:bg-slate-300/90 transition-all duration-300 ease-in-out"
          type="submit"
        >
          <p>Siguiente</p>
          <MdOutlineSkipNext className="text-2xl" />
        </button>
      </form>
    </div>
  );
}
