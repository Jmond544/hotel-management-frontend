import { useState } from "react";
import {
  IoIosArrowDroprightCircle,
  IoIosArrowDropleftCircle,
} from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { GiDolphin } from "react-icons/gi";
import CardProfile from "./CardProfile";
import { RecepcionItems, AdministracionItems } from "./listItems";
import Items from "./Items";
import { Button } from "@tremor/react";

export default function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [rol, setRol] = useState("Recepción");
  const [image, setImage] = useState("https://www.github.com/Jmond544.png");
  const [name, setName] = useState("Juan");
  const [email, setEmail] = useState("example@example.com");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div
      className={`bg-gray-900 h-screen text-white ${isSidebarOpen ? "w-64" : "w-16"} flex flex-col align-middle gap-4 transition-all duration-300`}
    >
      <div className="p-4 flex flex-row gap-2 items-center">
        <GiDolphin
          className={`min-w-6 ${isSidebarOpen ? "text-2xl" : "text-3xl"}`}
        />
        <h1
          className={`text-xl overflow-hidden overflow-ellipsis font-bold ${isSidebarOpen ? "" : "hidden"} transition-all duration-300`}
        >
          Panel {rol}
        </h1>
      </div>
      <CardProfile
        image={image}
        isSidebarOpen={isSidebarOpen}
        name={name}
        email={email}
      />
      <hr className="border-t border-gray-200/20 mx-4" />
      <Items isSidebarOpen={isSidebarOpen} listItems={RecepcionItems} />
      <hr className="border-t border-gray-200/20 mx-4" />

      <button className="flex flex-row items-center justify-center gap-4 p-2 mx-2 bg-slate-900 boder border-2 border-slate-800/50 hover:border-red-700/50 hover:text-red-700 text-white rounded-full transition-all duration-300">
        <LuLogOut className="text-2xl" />
        <p className={`${isSidebarOpen ? "" : "hidden"}`}>Logout</p>
      </button>

      <button
        className={`fixed top-4 ${isSidebarOpen ? "left-60" : "left-11"}  bg-slate-900 hover:bg-slate-800 text-white rounded-full text-4xl transition-all duration-300`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? (
          <IoIosArrowDropleftCircle />
        ) : (
          <IoIosArrowDroprightCircle />
        )}
      </button>
    </div>
  );
}
