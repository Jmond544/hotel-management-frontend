import { useState } from "react";
import ButtonRedirect from "./ButtonRedirect";
import { GiDolphin } from "react-icons/gi";

export default function Header() {
  const [activeButton, setActiveButton] = useState(""); // Estado para almacenar el botón activo

  return (
    <div className="fixed top-0 w-full backdrop-blur border-b border-slate-900/10 dark:border-slate-300/10 z-50">
      <nav className="relative flex flex-row justify-between py-3 px-10 lg:px-20 xl:px-40 items-center h-16 font-bold text-slate-950 dark:text-slate-200 z-50">
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
    </div>
  );
}
