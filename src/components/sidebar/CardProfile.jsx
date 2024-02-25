export default function CardProfile({ image, isSidebarOpen, name, email }) {
  return (
    <div
      className={`bg-slate-950 ${isSidebarOpen ? "mx-4 py-3 px-4 gap-3 justify-between" : "justify-center mx-auto"} flex flex-row  items-center  rounded-full cursor-pointer`}
    >
      <img src={image} alt="profile" className="rounded-full h-10" />
      <div
        className={`w-full overflow-hidden ${isSidebarOpen ? "" : "hidden"} transition-all duration-300`}
      >
        <h2 className="font-bold overflow-hidden overflow-ellipsis">{name}</h2>
        <p className="overflow-hidden overflow-ellipsis font-light text-xs">
          {email}
        </p>
      </div>
    </div>
  );
}
