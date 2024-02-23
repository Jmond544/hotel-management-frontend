import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import RegisterReservation from "./pages/RegisterReservation";
import RegisterHuespedes from "./pages/RegisterHuespedes";
import ModifyReservation from "./pages/ModifyReservation";
import Login from "./pages/Login";
import { HashRouter, Route, Routes } from "react-router-dom";
import RegisterConfirmation from "./pages/RegisterConfirmation";
import VerifyLogin from "./pages/VerifyLogin";

function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register-huespedes" element={<RegisterHuespedes />} />
          <Route
            path="/register-reservation"
            element={<RegisterReservation />}
          />
          <Route
            path="/register-confirmation"
            element={<RegisterConfirmation />}
          />
          <Route path="/modify" element={<ModifyReservation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-login" element={<VerifyLogin />} />
        </Routes>{" "}
      </HashRouter>
    </>
  );
}

export default App;
