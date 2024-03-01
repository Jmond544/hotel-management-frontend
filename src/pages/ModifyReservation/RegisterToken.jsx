import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterToken() {
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {
    if (code.length < 36) {
      alert("El código debe tener 36 caracteres");
    } else {
      navigate(`/modify/${code}`);
    }
  };
  return (
    <div className="pt-16 justify-center flex items-center h-screen">
      <div className="flex flex-col gap-4 rounded-xl shadow-xl border p-6 w-1/3">
        <h1 className="text-xl font-bold">
          Ingresa el código de verificación aquí
        </h1>
        <input
          className="outline-none rounded-full w-full text-center"
          type="text"
          placeholder="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          value={code}
          maxLength={36}
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
