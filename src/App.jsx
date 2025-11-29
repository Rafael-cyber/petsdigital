// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreatePet from "./pages/CreatePet";
import MeusPets from "./pages/MeusPets";
import Adote from "./pages/Adote";
import VisitorView from "./pages/VisitorView";

export default function App() {
  return (
    <Router>
      <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#FFF8F0", minHeight: "100vh" }}>
        {/* Navbar sempre visível */}
        <Nav />

        <Routes>
          {/* Página inicial */}
          <Route path="/" element={<Home />} />

          {/* Login e registro */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> {/* Corrigi para inglês, consistente com padrão */}

          {/* Pets */}
          <Route path="/criar-pet" element={<CreatePet />} />
          <Route path="/meus-pets" element={<MeusPets />} />

          {/* Página pública "Me Adote" */}
          <Route path="/adote" element={<Adote />} />

          {/* Visitante acessa o Pet pelo QR Code */}
          <Route path="/pet/:id" element={<VisitorView />} />

          {/* Rota 404 simples */}
          <Route path="*" element={<h2 style={{ textAlign: "center", marginTop: "50px" }}>Página não encontrada 😢</h2>} />
        </Routes>
      </div>
    </Router>
  );
}
