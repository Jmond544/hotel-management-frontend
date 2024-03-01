import { useState, useEffect } from "react";
import { useFormik } from "formik";
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import ErrorInput from "../../components/ErrorInput.jsx";
import { loginRequest } from "../../api/user.api.js";
import Modal from "../../components/Modal.jsx";
import { internalUser } from "../../store/user.store.js";
import { useStore } from "zustand";
import { Link, useNavigate } from "react-router-dom";
import { getProfileRequest } from "../../api/user.api.js";

export default function Login() {
  const [modal, setModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [messageModal, setMessageModal] = useState("");
  const [statusOperationModal, setStatusOperationModal] = useState(false);
  const [pathNavigate, setPathNavigate] = useState("/");
  const [estadoBoton, setEstadoBoton] = useState("Ingresar");

  const { setMail, setPassword } = useStore(internalUser);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      mail: "",
      password: "",
    },

    onSubmit: async (values) => {
      setEstadoBoton("Enviando...");
      formik.resetForm();
      const result = await loginRequest({ data: values });
      console.log(result);
      if (result.status === 200) {
        setTitleModal("¡¡Operacion exitosa!!");
        setMessageModal("Se ha enviado un código de verificación a su mail");
        setStatusOperationModal(true);
        setMail({ mail: values.mail });
        setPassword({ password: values.password });
        setPathNavigate("/verify-login");
      } else {
        setTitleModal("¡¡Operacion fallida!!");
        setMessageModal(result.message);
        setStatusOperationModal(false);
        setPathNavigate("/login");
      }
      setModal(true);
      setEstadoBoton("Ingresar");
    },

    validate: (values) => {
      const errors = {};

      if (!values.mail) {
        errors.mail = "Requerido";
      } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(values.mail)) {
        errors.mail = "El mail no es válido";
      } else if (values.mail.length > 50) {
        errors.mail = "El mail debe tener menos de 50 caracteres";
      }

      if (!values.password) {
        errors.password = "Requerido";
      } else if (values.password.length < 5) {
        errors.password = "Al menos 5 caracteres";
      } else if (values.password.length > 30) {
        errors.password = "Menos de 30 caracteres";
      }

      return errors;
    },
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const fetchData = async () => {
        await getProfileRequest().then((response) => {
          if (response.status === 200) {
            navigate("/dashboard");
          } else {
            localStorage.removeItem("token");
          }
        });
      };
      fetchData();
    }
  }, []);

  return (
    <div className="pt-16 justify-center flex items-center h-screen">
      {modal && (
        <Modal
          title={titleModal}
          message={messageModal}
          statusOperation={statusOperationModal}
          pathNavigate={pathNavigate}
          setModal={setModal}
        />
      )}
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-4 items-center shadow-xl p-10 border rounded-2xl border-slate-900/20 dark:border-slate-300/20"
      >
        <h1 className="font-bold text-xl">Login / Personal</h1>
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center gap-2">
            <IoMail className="text-xl" />
            <input
              className="border rounded-2xl border-slate-900/20 dark:border-slate-300/20 p-2 w-full"
              type="text"
              id="mail"
              name="mail"
              onChange={formik.handleChange}
              value={formik.values.mail}
              placeholder="Ingrese su mail aquí"
            />
          </div>
          {formik.errors.mail ? (
            <ErrorInput errors={formik.errors.mail} />
          ) : null}
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center gap-2">
            <RiLockPasswordFill className="text-xl" />
            <input
              className="border rounded-2xl border-slate-900/20 dark:border-slate-300/20 p-2 w-full"
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder="Ingrese su contraseña aquí"
            />
          </div>
          {formik.errors.password ? (
            <ErrorInput errors={formik.errors.password} />
          ) : null}
        </div>
        <button
          type="submit"
          className="bg-slate-900 text-slate-100 w-full p-2 rounded-full"
        >
          {estadoBoton}
        </button>

        <Link to="/login/update-password" className="text-slate-800 hover:text-slate-600 text-sm italic">
          ¿Olvidaste tu contraseña?
        </Link>
      </form>
    </div>
  );
}
