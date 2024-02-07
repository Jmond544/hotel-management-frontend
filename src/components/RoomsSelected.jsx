import { IoIosCloseCircle } from "react-icons/io";

export default function RoomsSelected({ roomsSelected, setRoomsSelected }) {
  const handleClick = (roomToRemove) => {
    const updatedRoomsSelected = roomsSelected.filter(
      (room) => room !== roomToRemove
    );
    setRoomsSelected(updatedRoomsSelected);
  };
  return (
    <div className="text-sm flex flex-row gap-4 justify-center items-center">
      <h3 className="font-bold">Seleccionadas: </h3>
      <div className="flex flex-row gap-2 justify-center">
        {roomsSelected.map((room, index) => (
          <div
            className="flex flex-row font-bold items-center gap-1 rounded-full py-1 px-2 bg-slate-400"
            key={index}
          >
            <IoIosCloseCircle
              className="hover:text-red-800 transition-all duration-300"
              onClick={() => handleClick(room)}
            />
            <p>{room}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
