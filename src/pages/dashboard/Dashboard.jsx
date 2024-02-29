import { useEffect, useState } from "react";
import { getProfileRequest } from "../../api/user.api";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [mail, setMail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    const fetchData = async () => {
      try {
        const response = await getProfileRequest();
        if (response.status === 200) {
          setImage(response.data.url_imagen);
          setName(response.data.nombres);
          setMail(response.data.mail);
        } else {
          console.log(response);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="flex flex-col gap-6 w-full p-8 justify-center align-middle items-center">
      <img src={image} alt="Cargando..." className="h-40 rounded-full" />
      <h1 className="font-bold text-2xl">
        ¡¡Bienvenido al Dashboard {name ? name : "Cargando..."}!!
      </h1>
      <p className="py-1 px-4 bg-slate-200 rounded-full">
        {mail ? mail : "Cargando..."}
      </p>
    </div>
  );
}
