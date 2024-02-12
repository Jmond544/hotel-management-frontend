export default function FloorButton({
  content,
  active,
  setActiveButton,
  setValue,
  floorNumber,
}) {
  const handleClick = () => {
    if (floorNumber) {
      setActiveButton(floorNumber);
      setValue(floorNumber);
    } else {
      setActiveButton(content);
      setValue(content);
    }
  };
  return (
    <button
      className={`py-2 px-4 font-bold rounded-3xl ${!active ? "bg-slate-300 text-slate-950 hover:bg-slate-400" : "text-slate-300 bg-slate-900"} transition-all duration-300`}
      onClick={handleClick}
      type="button"
    >
      {floorNumber ? `Piso ${floorNumber}` : `${content}`}
    </button>
  );
}
