import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import RegisterReservation from "./pages/RegisterReservation";
import RegisterHuespedes from "./pages/RegisterHuespedes";
import ModifyReservation from "./pages/ModifyReservation";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import RegisterConfirmation from "./pages/RegisterConfirmation";
import Login from "./pages/login/Login";
import VerifyLogin from "./pages/login/VerifyLogin";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";
import GestionReservas from "./pages/dashboard/GestionReservas";
import GestionCheckIn from "./pages/dashboard/GestionCheckIn";
import GestionCheckOut from "./pages/dashboard/GestionCheckOut";
import DetailsReservation from "./pages/DetailsReservation";
import ModifyReservationByID from "./pages/ModifyReservationByID";

function App() {
  return (
    <>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </>
  );
}

function AppContent() {
  const location = useLocation();

  // Función para determinar si se debe mostrar el Header
  const shouldShowHeader = () => {
    // Verificar si la ruta actual comienza con "/dashboard"
    return !location.pathname.startsWith("/dashboard");
  };

  return (
    <div className={`flex ${shouldShowHeader() ? "flex-col" : "flex-row"}`}>
      {shouldShowHeader() ? <Header /> : <Sidebar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/register-huespedes" element={<RegisterHuespedes />} />
        <Route path="/register-reservation" element={<RegisterReservation />} />
        <Route
          path="/register-confirmation"
          element={<RegisterConfirmation />}
        />
        <Route path="/modify" element={<ModifyReservation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/verify-login" element={<VerifyLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/dashboard/gestionar-reservas"
          element={<GestionReservas />}
        />
        <Route
          path="/dashboard/gestionar-check-in"
          element={<GestionCheckIn />}
        />
        <Route
          path="/dashboard/gestionar-check-out"
          element={<GestionCheckOut />}
        />
        <Route
          path="/dashboard/gestionar-reservas/detalles/:id"
          element={<DetailsReservation />}
        />
        <Route
          path="/dashboard/gestionar-reservas/editar/:id"
          element={<ModifyReservationByID />}
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </div>
  );
}

export default App;
