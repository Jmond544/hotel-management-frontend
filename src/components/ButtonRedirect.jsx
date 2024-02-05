import { Link } from "react-router-dom";

export default function ButtonRedirect({
  path,
  text,
  setActiveButton,
  active,
}) {
  const handleClick = () => {
    setActiveButton(path); // Establecer el botón presionado como activo
  };

  return (
    <Link
      to={path}
      className={`p-2 rounded-lg hover:bg-slate-200 hover:underline transition-all duration-300 ${
        active ? "bg-slate-200" : ""
      }`}
      onClick={handleClick}
    >
      {text}
    </Link>
  );
}
