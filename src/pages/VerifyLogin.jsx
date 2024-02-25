import { useState } from "react";
import Modal from "../components/Modal";
import { verifyLoginRequest } from "../api/user.api.js";
import { internalUser } from "../store/user.store.js";
import { useStore } from "zustand";

export default function VerifyLogin() {
  const [modal, setModal] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [messageModal, setMessageModal] = useState("");
  const [statusOperationModal, setStatusOperationModal] = useState(false);
  const [code, setCode] = useState("");
  const [pathNavigate, setPathNavigate] = useState("/");

  const { mail, password } = useStore(internalUser);

  function handleSubmit(e) {
    e.preventDefault();
    setModal(true);
    if (mail === null || password === null) {
      setTitleModal("¡¡Operacion fallida!!");
      setMessageModal(
        "No ha realizado el paso anterior correctamente. Por favor, vuelva a intentarlo."
      );
      setStatusOperationModal(false);
      setPathNavigate("/login");
    } else if (code.length < 6) {
      setTitleModal("¡¡Operacion fallida!!");
      setMessageModal("El código debe tener 6 caracteres");
      setStatusOperationModal(false);
      setPathNavigate("/verify-login");
    } else {
      verifyLoginRequest({
        data: {
          mail,
          password,
          codigo: code,
        },
      }).then((response) => {
        if (response.status === 200) {
          setTitleModal("¡¡Operacion exitosa!!");
          setMessageModal("Código correcto");
          setStatusOperationModal(true);
          setPathNavigate("/dashboard");
          console.log(response.message);
        } else {
          setTitleModal("¡¡Operacion fallida!!");
          setMessageModal(response.message);
          setStatusOperationModal(false);
          setPathNavigate("/verify-login");
          if (response.message === "El código ha expirado") {
            setPathNavigate("/login");
          }
        }
      });
    }
  }

  return (
    <div className="pt-16 justify-center flex items-center h-screen">
      {modal && (
        <Modal
          title={titleModal}
          message={messageModal}
          statusOperation={statusOperationModal}
          setModal={setModal}
          pathNavigate={pathNavigate}
        />
      )}
      <div className="flex flex-col gap-4 rounded-xl shadow-xl border p-6">
        <h1 className="text-xl font-bold">
          Ingresa el código de verificación aquí
        </h1>
        <input
          className="outline-none rounded-full w-full text-center"
          type="text"
          placeholder="XXXXXX"
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          value={code}
          maxLength={6}
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
