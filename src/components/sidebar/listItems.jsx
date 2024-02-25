import { FaRegCalendarCheck } from "react-icons/fa6";
import { FaCashRegister } from "react-icons/fa6";
import { FaBuildingCircleCheck } from "react-icons/fa6";
import { FaOutdent } from "react-icons/fa6";

export const RecepcionItems = [
  {
    title: "Gestionar reservas",
    icon: <FaRegCalendarCheck />,
    link: "/dashboard/gestionar-reservas",
  },
  {
    title: "Registrar reserva",
    icon: <FaCashRegister />,
    link: "/dashboard/registrar-reserva",
  },
  {
    title: "Gestionar Check-in",
    icon: <FaBuildingCircleCheck />,
    link: "/dashboard/gestionar-check-in",
  },
  {
    title: "Gestionar Check-out",
    icon: <FaOutdent />,
    link: "/dashboard/gestionar-check-out",
  }
];

export const AdministracionItems = [
  {
    title: "Gestionar tarifas",
    icon: <FaRegCalendarCheck />,
    link: "/dashboard/gestionar-habitaciones",
  },
];
