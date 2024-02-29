import DatePicker from "react-datepicker";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import Modal from "../../components/Modal";
import { queryReservationsRequest } from "../../api/reservation.api";
import { getRooms, markRoomAsOccupied } from "../../api/room.api";
import { Link } from "react-router-dom";
import {
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
  Badge,
} from "@tremor/react";
import { useRef } from "react";

function transformResult(result) {
  const grouped = result.reduce((acc, item) => {
    const { numero_habitacion, ...rest } = item;
    const key = JSON.stringify(rest);

    if (!acc[key]) {
      acc[key] = { ...rest, numero_habitacion: [numero_habitacion] };
    } else {
      acc[key].numero_habitacion.push(numero_habitacion);
    }

    return acc;
  }, {});

  return Object.values(grouped);
}

export default function GestionCheckIn() {
  const [filtro, setFiltro] = useState("");
  const filtroName = useRef("");
  const [search, setSearch] = useState("");
  const [fechaFin, setFechaFin] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [fechaInicio, setFechaInicio] = useState("2023-10-02");
  const [data, setData] = useState([]);
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [modalStatus, setModalStatus] = useState(false);
  const [rooms, setRooms] = useState([]);

  async function refreshRooms() {
    await getRooms().then((data) => {
      setRooms(data);
    });
  }

  function getEstadoByNumeroHabitacion(numeroHabitacion) {
    const room = rooms.find(
      (room) => room.numero_habitacion === numeroHabitacion
    );
    return room.estado;
  }

  const handleSearch = async () => {
    refreshRooms();
    if (filtro === "" || fechaInicio === "" || fechaFin === "") {
      alert("Faltan campos por llenar");
      return;
    }

    if (fechaInicio > fechaFin) {
      return;
    }

    if (search === "") {
      setSearch("all");
    }

    if (filtro === "1") {
      filtroName.current = "numeroHabitacion";
    } else {
      filtroName.current = "telefonoReserva";
    }

    const result = await queryReservationsRequest({
      tipoFiltro: filtroName.current,
      valor: search,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
    });
    setData(transformResult(result));
  };
  const handleOcupada =
    ({ listaHabitaciones }) =>
    async () => {
      let status = true;
      listaHabitaciones.forEach(async (id) => {
        const result = await markRoomAsOccupied({ numeroHabitacion: id });
        status = status & result.status === 200;
      });

      if (status) {
        setModal(true);
        setModalTitle("Proceso exitoso");
        setModalMessage("Las habitaciones se han marcado como ocupadas.");
        setModalStatus(false);
        refreshRooms();
      } else {
        setModal(true);
        setModalTitle("Error");
        setModalMessage("No se pudo marcar las habitaciones como ocupadas.");
        setModalStatus(true);
      }
      refreshRooms();
    };
  useEffect(() => {
    const fetchData = async () => {
      const result = await queryReservationsRequest({
        tipoFiltro: "numeroHabitacion",
        valor: "all",
        fechaInicio: fechaInicio,
        fechaFin: fechaFin,
      });
      setData(transformResult(result));
    };

    refreshRooms();

    fetchData();
  }, []);
  return (
    <div className="p-10 flex flex-col gap-5 w-full">
      {modal && (
        <Modal
          title={modalTitle}
          message={modalMessage}
          statusOperation={modalStatus}
          pathNavigate="/dashboard/gestionar-check-in"
          setModal={setModal}
        />
      )}
      <h1 className="font-bold text-xl text-center">Gestion Check In</h1>
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
          <option value="2">Teléfono huesped</option>
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
          <FaSearch
            className="absolute top-1/2 right-2 transform -translate-y-1/2 cursor-pointer bg-slate-900 hover:bg-slate-700 text-slate-50 p-2 rounded-full h-7 w-7 transition-all duration-300"
            onClick={handleSearch}
          />
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
                start: new Date().setDate(new Date().getDate() - 4 * 365),
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

      <Table className="mt-5">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Id Reserva</TableHeaderCell>
            <TableHeaderCell>Teléfono Titular</TableHeaderCell>
            <TableHeaderCell>Habitaciones</TableHeaderCell>
            <TableHeaderCell>Fechas</TableHeaderCell>
            <TableHeaderCell>Monto</TableHeaderCell>
            <TableHeaderCell>Estado Pago</TableHeaderCell>
            <TableHeaderCell>Operación</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.telefono_pago}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  {item.numero_habitacion.map((item, index) => (
                    <Badge key={index} color="orange">
                      {item} - {getEstadoByNumeroHabitacion(item)}
                    </Badge>
                  ))}
                </div>
              </TableCell>
              <TableCell className="">
                <div className="flex flex-col gap-1">
                  <Badge color="blue">
                    {new Date(item.fecha_inicio).toISOString().slice(0, 10)}
                  </Badge>
                  <Badge color="blue">
                    {new Date(item.fecha_fin).toISOString().slice(0, 10)}
                  </Badge>
                </div>
              </TableCell>
              <TableCell> $ {item.monto_pago} </TableCell>
              <TableCell>
                {item.estado_pago == "pendiente" ? (
                  <Badge color="red">{item.estado_pago}</Badge>
                ) : (
                  <Badge color="emerald">{item.estado_pago}</Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-1 text-slate-50 text-center text-xs font-bold">
                  <Link
                    to={`/dashboard/gestionar-check-in`}
                    className="bg-slate-900 p-1 rounded-lg"
                    onClick={handleOcupada({
                      listaHabitaciones: item.numero_habitacion,
                    })}
                  >
                    Marcar <br /> ocupada
                  </Link>
                  <Link
                    to={`/dashboard/gestionar-check-in/detalles/${item.id}`}
                    className="bg-slate-900 p-1 rounded-lg"
                  >
                    Detalles
                  </Link>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
