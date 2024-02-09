import { Badge } from "@tremor/react";
import FloorButton from "./FloorButton";

export default function StatusFloorButton({
  floorNumber,
  freeRooms,
  active,
  setActiveButton,
  setNumFloor,
}) {
  return (
    <div className="flex flex-row gap-2 font-bold">
      <FloorButton
        active={active}
        setActiveButton={setActiveButton}
        setValue={setNumFloor}
        floorNumber={floorNumber}
      />
      {freeRooms > 0 ? (
        <Badge color="green">0{freeRooms} libres</Badge>
      ) : (
        <Badge color="red">Agotado</Badge>
      )}
    </div>
  );
}
