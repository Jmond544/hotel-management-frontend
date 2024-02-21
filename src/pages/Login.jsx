import { useFormik } from "formik";
import { IoMail } from "react-icons/io5";
import { RiLockPasswordFill } from "react-icons/ri";
import ErrorInput from "../components/ErrorInput";

export default function Login() {
  const formik = useFormik({
    initialValues: {
      mail: "",
      password: "",
    },

    onSubmit: (values) => {
      formik.resetForm();
      alert(JSON.stringify(values, null, 2));
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
  return (
    <div className="pt-16 justify-center flex items-center h-screen">
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
          Ingresar
        </button>
      </form>
    </div>
  );
}
