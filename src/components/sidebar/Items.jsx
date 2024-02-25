import { Link } from "react-router-dom";

export default function Items({ isSidebarOpen, listItems }) {
  return (
    <nav>
      <ul>
        {listItems.map((item, index) => (
          <li key={index} className="p-4 hover:bg-slate-700 cursor-pointer">
            <Link to={item.link} className="flex flex-row gap-4 items-center">
              {item.icon}
              <p className={`${isSidebarOpen ? "" : "hidden"}`}>{item.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
