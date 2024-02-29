import { FaBackward } from "react-icons/fa";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

export default function Modal({
  title,
  message,
  statusOperation,
  pathNavigate,
  setModal,
}) {
  const navigate = useNavigate();

  function handleModal() {
    if (!statusOperation) {
      setModal(false);
    }
    navigate(pathNavigate);
  }

  return (
    <>
      <div className="w-screen h-screen flex items-center justify-center align-middle p-20 absolute top-0 left-0 bg-black/50 z-50 backdrop-blur">
        <div className="w-96 h-72 bg-white rounded-xl relative flex flex-col justify-around shadow-xl p-7 border border-slate-900/20 dark:border-slate-300/20">
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="text-wrap">{message}</p>
          <button
            className="flex flex-row gap-2 items-center justify-center text-slate-50 font-bold bg-slate-900 hover:bg-slate-950 py-1 px-2 rounded-xl transition-all duration-300"
            onClick={handleModal}
          >
            {statusOperation ? (
              <>
                Continuar
                <TbPlayerTrackNextFilled />
              </>
            ) : (
              <>
                <FaBackward />
                Volver
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
