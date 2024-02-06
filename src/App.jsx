import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Header from "./components/Header";
import RegisterReservation from "./pages/RegisterReservation";
import ModifyReservation from "./pages/ModifyReservation";
import Login from "./pages/Login";
import { HashRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<RegisterReservation />} />
          <Route path="/modify" element={<ModifyReservation />} />
          <Route path="/login" element={<Login />} />
        </Routes>{" "}
      </HashRouter>
    </>
  );
}

export default App;
