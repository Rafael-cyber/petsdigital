import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MeusPets from "./pages/MeusPets";
import CreatePet from "./pages/CreatePet";
import PetView from "./pages/PetView";

export default function RoutingApp() {
  return (
    <BrowserRouter>
      <Nav />
      <main style={{ padding: 20, maxWidth: 980, margin: '0 auto' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/meus-pets" element={<MeusPets />} />
          <Route path="/adicionar-pet" element={<CreatePet />} />
          <Route path="/pet/:id" element={<PetView />} />
          <Route path="*" element={<h2>Página não encontrada</h2>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
