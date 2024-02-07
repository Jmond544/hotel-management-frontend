import RoomClassic01 from "../assets/Rooms/Habitacion_Clasica_01.jpg";
import RoomClassic02 from "../assets/Rooms/Habitacion_Clasica_02.jpg";
import RoomClassic03 from "../assets/Rooms/Habitacion_Clasica_03.jpg";
import RoomMarried01 from "../assets/Rooms/Habitacion_Matrimonial_01.jpg";
import RoomMarried02 from "../assets/Rooms/Habitacion_Matrimonial_02.jpg";
import RoomMarried03 from "../assets/Rooms/Habitacion_Matrimonial_03.jpg";
import RoomSuit01 from "../assets/Rooms/Habitacion_Suit_01.jpg";
import RoomSuit02 from "../assets/Rooms/Habitacion_Suit_02.jpg";
import RoomSuit03 from "../assets/Rooms/Habitacion_Suit_03.jpg";
import { useEffect, useState } from "react";

export default function ImagesRooms({
  typeRoom,
  numFloor,
  roomsSelected,
  setRoomsSelected,
}) {
  const defaultImage = RoomClassic01;
  const [image, setImage] = useState(defaultImage);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const currentRoomNumber = (
    numFloor * 100 +
    (typeRoom === "Classic" ? 1 : typeRoom === "Married" ? 2 : 3)
  )
    .toString()
    .padStart(4, "0");

  const imagesMap = {
    Classic: [RoomClassic01, RoomClassic02, RoomClassic03],
    Married: [RoomMarried01, RoomMarried02, RoomMarried03],
    Suit: [RoomSuit01, RoomSuit02, RoomSuit03],
  };

  useEffect(() => {
    setIsTransitioning(true);
    const floorIndex = Math.max(1, Math.min(numFloor, 3)) - 1;
    const url = imagesMap[typeRoom]
      ? imagesMap[typeRoom][floorIndex]
      : defaultImage;
    setTimeout(() => {
      setImage(url);
      setIsTransitioning(false);
    }, 300);
  }, [typeRoom, numFloor]);

  const handleClick = () => {
    if (!roomsSelected.includes(currentRoomNumber)) {
      setRoomsSelected([...roomsSelected, currentRoomNumber]);
    }
  };

  return (
    <div className="flex h-96 w-full rounded-3xl justify-center overflow-hidden relative">
      <img
        className={`h-full w-full transition-all duration-500 hover:scale-110 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        src={image}
        alt=""
        onMouseEnter={() => setIsHovered(true)}
      />
      {isHovered && (
        <div
          className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center bg-black bg-opacity-40 text-white text-lg cursor-pointer "
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleClick}
        >
          <h2 className="font-bold text-xl">Habitación {currentRoomNumber}</h2>
          <p>Haga click para seleccionar la habitación.</p>
        </div>
      )}
    </div>
  );
}
