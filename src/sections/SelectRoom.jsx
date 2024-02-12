import { useState } from "react";
import StatusFloorButton from "../components/StatusFloorButton";
import ImagesRooms from "../components/ImagesRooms";
import FloorButton from "../components/FloorButton";
import RoomsSelected from "../components/RoomsSelected";

export default function SelectRoom({ roomsSelected, setRoomsSelected }) {
  const [activeButton, setActiveButton] = useState(1);
  const [typeRoom, setTypeRoom] = useState("Classic");
  const [numFloor, setNumFloor] = useState(1);
  return (
    <div className="flex flex-col gap-4 w-full ">
      <h2 className="text-lg font-bold">Selecciona una habitación</h2>
      <div className="flex flex-row justify-around align-middle items-center">
        <div className="flex flex-col gap-4 justify-center min-w-52">
          <StatusFloorButton
            floorNumber={3}
            freeRooms={2}
            active={activeButton == 3}
            setActiveButton={setActiveButton}
            setNumFloor={setNumFloor}
          />
          <StatusFloorButton
            floorNumber={2}
            freeRooms={0}
            active={activeButton == 2}
            setActiveButton={setActiveButton}
            setNumFloor={setNumFloor}
          />
          <StatusFloorButton
            floorNumber={1}
            freeRooms={3}
            active={activeButton == 1}
            setActiveButton={setActiveButton}
            setNumFloor={setNumFloor}
          />
        </div>
        <div className="flex flex-col gap-4 justify-center w-full h-full">
          <RoomsSelected
            roomsSelected={roomsSelected}
            setRoomsSelected={setRoomsSelected}
          />
          <ImagesRooms
            numFloor={numFloor}
            typeRoom={typeRoom}
            roomsSelected={roomsSelected}
            setRoomsSelected={setRoomsSelected}
          />
          <div className="flex flex-row gap-4 justify-center">
            <FloorButton
              content="Classic"
              active={typeRoom === "Classic"}
              setActiveButton={setTypeRoom}
              setValue={setTypeRoom}
            />
            <FloorButton
              content="Married"
              active={typeRoom === "Married"}
              setActiveButton={setTypeRoom}
              setValue={setTypeRoom}
            />
            <FloorButton
              content="Suit"
              active={typeRoom === "Suit"}
              setActiveButton={setTypeRoom}
              setValue={setTypeRoom}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
