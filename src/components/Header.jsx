import { useState } from "react";
import ButtonRedirect from "./ButtonRedirect";
import { GiDolphin } from "react-icons/gi";

export default function Header() {
  const [activeButton, setActiveButton] = useState(""); // Estado para almacenar el botón activo

  return (
    <nav className="flex flex-row justify-between px-10 items-center font-bold h-14 shadow-lg bg-slate-400 text-slate-950">
      <div className="flex flex-row items-center gap-4">
        <GiDolphin className="text-3xl text-slate-900" />
        <h1>DOLPHIN HOTEL</h1>
      </div>
      <ul className="flex flex-row gap-4">
        <li>
          <ButtonRedirect
            path="/"
            text="Home"
            setActiveButton={setActiveButton}
            active={activeButton === "/"}
          />
        </li>
        <li>
          <ButtonRedirect
            path="/about"
            text="About"
            setActiveButton={setActiveButton}
            active={activeButton === "/about"}
          />
        </li>
        <li>
          <ButtonRedirect
            path="/register"
            text="Registrar reserva"
            setActiveButton={setActiveButton}
            active={activeButton === "/register"}
          />
        </li>
        <li>
          <ButtonRedirect
            path="/modify"
            text="Modificar reserva"
            setActiveButton={setActiveButton}
            active={activeButton === "/modify"}
          />
        </li>
        <li>
          <ButtonRedirect
            path="/login"
            text="Log in"
            setActiveButton={setActiveButton}
            active={activeButton === "/login"}
          />
        </li>
      </ul>
    </nav>
  );
}
