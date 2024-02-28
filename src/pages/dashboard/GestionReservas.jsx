import DatePicker from "react-datepicker";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function GestionReservas() {
  const [filtro, setFiltro] = useState("");
  const [search, setSearch] = useState("");
  const [fechaFin, setFechaFin] = useState(new Date());
  const [fechaInicio, setFechaInicio] = useState(new Date());
  return (
    <div className="p-10 flex flex-col gap-5 w-full">
      <h1 className="font-bold text-xl text-center">Gestion Reservas</h1>
      <div className="flex flex-row justify-between">
        <select
          id="filtro"
          name="filtro"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="outline-none border-b rounded-full border-slate-900/20 dark:border-slate-300/20"
        >
          <option value="" disabled>
            Selecciona el filtro
          </option>
          <option value="1">Número habitación</option>
          <option value="2">DNI huesped</option>
        </select>
        <div className="relative">
          <input
            type="text"
            id="search"
            name="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar"
            className="outline-none border-b rounded-full border-slate-900/20 dark:border-slate-300/20 w-96"
          />
          <FaSearch className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer bg-slate-900 hover:bg-slate-700 text-slate-50 p-2 rounded-full h-7 w-7 transition-all duration-300" />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="fechaInicio">Inicio:</label>
          <DatePicker
            id="fechaInicio"
            name="fechaInicio"
            selected={fechaInicio}
            onChange={(fecha) => setFechaInicio(fecha)}
            dateFormat="dd/MM/yyyy"
            includeDateIntervals={[
              {
                start: new Date().setDate(new Date().getDate() - 120),
                end: new Date().setDate(new Date().getDate() + 120),
              },
            ]}
            showIcon
            withPortal
            placeholderText="dd/mm/yyyy"
            className="outline-none border-b rounded-full border-slate-900/20 dark:border-slate-300/20 w-32"
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="fechaFin">Fin:</label>
          <DatePicker
            id="fechaFin"
            name="fechaFin"
            selected={fechaFin}
            onChange={(fecha) => setFechaFin(fecha)}
            dateFormat="dd/MM/yyyy"
            includeDateIntervals={[
              {
                start: new Date().setDate(new Date().getDate() - 120),
                end: new Date().setDate(new Date().getDate() + 120),
              },
            ]}
            showIcon
            withPortal
            placeholderText="dd/mm/yyyy"
            className="outline-none border-b rounded-full border-slate-900/20 dark:border-slate-300/20 w-32"
          />
        </div>
      </div>
    </div>
  );
}
