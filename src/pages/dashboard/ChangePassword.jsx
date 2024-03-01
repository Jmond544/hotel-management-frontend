import { useState, useEffect } from "react";
import { verifyLoginRequest } from "../../api/user.api";
import { useNavigate } from "react-router-dom";
import { getProfileRequest } from "../../api/user.api";

export default function ChangePassword() {
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    if (code.length < 6) {
      alert("El código debe tener 6 caracteres");
    } else {
      await verifyLoginRequest({
        data: {
          mail,
          password,
          codigo: code,
        },
      }).then((response) => {
        if (response.status === 200) {
          localStorage.setItem("token", response.token);
          navigate("/dashboard/new-password");
        } else {
          alert(response.message);
        }
      });
    }
  };
  console.log(password,mail,code);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const fetchData = async () => {
      try {
        const response = await getProfileRequest();
        if (response.status === 200) {
          setMail(response.data.mail);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col justify-center align-middle w-full items-center">
      <div className="flex flex-col gap-4 rounded-xl shadow-xl border p-6 w-1/3">
        <h1 className="text-xl font-bold">
          Se envió un código a su correo, ingréselo aquí:
        </h1>
        <input
          className="outline-none rounded-full w-full text-center"
          type="text"
          placeholder="XXXXXX"
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          value={code}
          maxLength={6}
        />
        <input
          className="outline-none rounded-full w-full text-center"
          type="password"
          placeholder="Ingrese su contraseña actual aquí..."
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button
          type="submit"
          className="bg-slate-900 text-slate-100 hover:bg-slate-950 w-full p-2 font-bold rounded-full"
          onClick={handleSubmit}
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
