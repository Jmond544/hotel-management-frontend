import { changePasswordRequest } from "../../api/user.api";
import { useState } from "react";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
    if (password.length < 6) {
      alert("La contraseña debe tener al menos 6 caracteres");
    } else {
      await changePasswordRequest({ password }).then((response) => {
        if (response.status === 200) {
          alert(response.message);
        } else {
          alert(response.message);
        }
      });
    }
  };
  return (
    <div className="flex flex-col justify-center align-middle w-full items-center">
      <div className="flex flex-col gap-4 rounded-xl shadow-xl border p-6 w-1/3">
        <h1 className="text-xl font-bold">Digite su nueva contraseña:</h1>
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
