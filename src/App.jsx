import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import RegisterReservation from "./pages/RegisterReservation";
import RegisterHuespedes from "./pages/RegisterHuespedes";
import ModifyReservation from "./pages/ModifyReservation";
import Login from "./pages/Login";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import RegisterConfirmation from "./pages/RegisterConfirmation";
import VerifyLogin from "./pages/VerifyLogin";
import Dashboard from "./pages/dashboard/Dashboard";
import Sidebar from "./components/sidebar/Sidebar";

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
    <div className={`flex ${shouldShowHeader()? "flex-col":"flex-row"}`}>
      {shouldShowHeader()? <Header /> : <Sidebar />}
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
      </Routes>
    </div>
  );
}

export default App;