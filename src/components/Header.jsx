import { Link } from "react-router-dom";
import ButtonRedirect from "./ButtonRedirect";
import { GiDolphin } from "react-icons/gi";

export default function Header() {
  return (
    <nav className="flex flex-row justify-between px-10 items-center font-bold h-14 shadow-lg bg-slate-400 text-slate-950">
      <div className="flex flex-row items-center gap-4">
        <GiDolphin className="text-3xl text-white" />
        <h1>Dolphin Hotel</h1>
      </div>
      <ul className="flex flex-row gap-4">
        <li>
          <ButtonRedirect path="/" text="Home" />
        </li>
        <li>
					<ButtonRedirect path="/about" text="About" />
        </li>
        <li>
					<ButtonRedirect path="/register" text="Registrar reserva" />
        </li>
        <li>
					<ButtonRedirect path="/modify" text="Modificar reserva" />
        </li>
        <li>
					<ButtonRedirect path="/login" text="Log in" />
        </li>
      </ul>
    </nav>
  );
}
