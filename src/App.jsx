import { BrowserRouter, Routes, Route } from "react-router-dom";

import Menu from "./components/Menu";
import Home from "./pages/Home";
import CriarTag from "./pages/CriarTag";
import MeAdote from "./pages/MeAdote";
import Rastrear from "./pages/Rastrear";
import PetPerfil from "./pages/PetPerfil";
import MeusPets from "./pages/MeusPets";
import Auth from "./pages/Auth";


export default function App() {
  return (
    <BrowserRouter>
      <Menu />

      <div style={{ marginTop: 20 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/criar-tag" element={<CriarTag />} />
          <Route path="/me-adote" element={<MeAdote />} />
          <Route path="/rastrear" element={<Rastrear />} />
          <Route path="/pet/:id" element={<PetPerfil />} />
          <Route path="/meus-pets" element={<MeusPets />} />
          <Route path="/auth" element={<Auth />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}
