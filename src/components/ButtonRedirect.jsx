import { Link } from "react-router-dom";

export default function ButtonRedirect({ path, text }) {
  return (
    <div className="p-2 rounded-lg hover:bg-slate-200 hover:underline transition-all duration-300">
      <Link to={path}>{text}</Link>
    </div>
  );
}
