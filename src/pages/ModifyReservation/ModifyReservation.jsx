import { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { getReservationByIdRequest, updateReservationRequest } from "../../api/reservation.api";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextInput from "../../components/TextInput";
import ErrorInput from "../../components/ErrorInput";
import SelectRoom from "../../sections/SelectRoom";
import { FaPhone } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import { MdOutlineSkipNext } from "react-icons/md";
export default function ModifyReservation() {
  const { id } = useParams();
  const [mailPago, setMailPago] = useState("");
  const [telefonoPago, setTelefonoPago] = useState("");
  const [tipoServicio, setTipoServicio] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [habitaciones, setHabitaciones] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      tipoServicio: "",
      fechaInicio: "",
      fechaFin: "",
      habitaciones: "",
    },
    onSubmit: async (values) => {
      alert(JSON.stringify(values, null, 2));
      setMailPago(values.email);
      setTelefonoPago(values.phone);
      setTipoServicio(values.tipoServicio);
      setFechaInicio(new Date(values.fechaInicio).toISOString().slice(0, 10));
      setFechaFin(new Date(values.fechaFin).toISOString().slice(0, 10));
      setHabitaciones(habitaciones);
      const result = await updateReservationRequest({
        id,
        tipoServicio: values.tipoServicio,
        fechaInicio: new Date(values.fechaInicio).toISOString().slice(0, 10),
        fechaFin: new Date(values.fechaFin).toISOString().slice(0, 10),
        mailPago: values.email,
        telefonoPago: values.phone,
        habitaciones: habitaciones,
      });
      if (result.status === 200) {
        alert("Reserva actualizada correctamente");
      }else {
        alert("Error al actualizar la reserva");
      }
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getReservationByIdRequest({ id });
        setMailPago(res[0].mail_pago);
        setTelefonoPago(res[0].telefono_pago);
        setTipoServicio(res[0].tipo_servicio);
        setFechaInicio(
          new Date(res[0].fecha_inicio).toISOString().split("T")[0]
        );
        setFechaFin(new Date(res[0].fecha_fin).toISOString().split("T")[0]);

        setHabitaciones(res[0].habitaciones.split(", "));
        formik.setValues({
          email: res[0].mail_pago,
          phone: res[0].telefono_pago,
          tipoServicio: res[0].tipo_servicio,
          fechaInicio: new Date(res[0].fecha_inicio)
            .toISOString()
            .split("T")[0],
          fechaFin: new Date(res[0].fecha_fin).toISOString().split("T")[0],
          habitaciones: res[0].habitaciones.split(", "),
        });
      } catch (error) {
        console.error("Error fetching reservation:", error);
      }
    };
    if (id) {
      fetchData();
    }
  }, [id]);

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
                <ErrorInput errors={formik.errors.tipoServicio} />
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
            roomsSelected={habitaciones}
            setRoomsSelected={setHabitaciones}
          />
        </div>
        <button
          className="flex flex-row gap-2 items-center justify-center ml-auto bg-slate-900 dark:bg-slate-300 text-slate-50 w-40 font-bold py-2 px-4 rounded-2xl mt-4 hover:bg-slate-900/90 dark:hover:bg-slate-300/90 transition-all duration-300 ease-in-out"
          type="submit"
        >
          <p>Actualizar</p>
          <MdOutlineSkipNext className="text-2xl" />
        </button>
      </form>
    </div>
  );
}
