import { useState, useEffect } from "react";
import { getReservationByIdRequest } from "../api/reservation.api";
import { Badge } from "@tremor/react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import { getRoomByNumberRequest } from "../api/room.api";

export default function DetailsReservation() {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleClicked = () => {
    navigate(-1);
  };

  const handleClickRoom = (habitacion) => async () => {
    const result = await getRoomByNumberRequest({
      numeroHabitacion: habitacion,
    });

    const text = `Tipo habitación: ${result.tipo_habitacion}. \nEstado: ${result.estado}. Precio: ${result.precio}. Piso ${result.numero_piso}.`;
    setModal(true);
    setModalTitle(`Habitación ${habitacion}`);
    setModalMessage(text);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getReservationByIdRequest({ id });
        setReservation(res[0]);
      } catch (error) {
        console.error("Error fetching reservation:", error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="w-full p-4">
      {reservation ? (
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col gap-3">
          {modal && (
            <Modal
              title={modalTitle}
              message={modalMessage}
              statusOperation={false}
              pathNavigate={location.pathname}
              setModal={setModal}
            />
          )}
          <h2 className="text-2xl font-semibold mb-4">
            Detalles de la reserva
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-semibold">ID de reserva:</p>
              <p>{reservation.id_reserva}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Estado de pago:</p>
              <p>
                {reservation.estado_pago == "pendiente" ? (
                  <Badge color="red">{reservation.estado_pago}</Badge>
                ) : (
                  <Badge color="emerald">{reservation.estado_pago}</Badge>
                )}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Fecha de inicio:</p>
              <p>
                <Badge color="emerald">
                  {new Date(reservation.fecha_inicio).toLocaleDateString()}
                </Badge>
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Fecha de fin:</p>
              <p>
                <Badge color="emerald">
                  {new Date(reservation.fecha_fin).toLocaleDateString()}
                </Badge>
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Habitaciones:</p>
              <p>
                {reservation.habitaciones.split(", ").map((habitacion) => (
                  <Badge
                    key={habitacion}
                    color="orange"
                    className="cursor-pointer hover:bg-orange-200"
                    onClick={handleClickRoom(habitacion)}
                  >
                    {habitacion}
                  </Badge>
                ))}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Huéspedes:</p>
              <p>
                {reservation.huespedes.split(", ").map((huesped) => (
                  <Badge key={huesped} color="blue">
                    {huesped}
                  </Badge>
                ))}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold">Número de huéspedes:</p>
              <p>{reservation.numero_huespedes}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Tipo de servicio:</p>
              <p>{reservation.tipo_servicio}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Correo de pago:</p>
              <p>{reservation.mail_pago}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Teléfono de pago:</p>
              <p>{reservation.telefono_pago}</p>
            </div>
            <div>
              <p className="text-sm font-semibold">Monto de pago:</p>
              <p>${reservation.monto_pago}</p>
            </div>
          </div>
          <button
            className="bg-slate-900 text-slate-50 px-2 py-1 rounded-xl"
            onClick={handleClicked}
          >
            Volver
          </button>
        </div>
      ) : (
        <p className="text-lg">Cargando...</p>
      )}
    </div>
  );
}
