// src/RoutingApp.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import PetList from "./pages/PetList";
import PetView from "./pages/PetView";
import CreatePetTag from "./pages/CreatePetTag";
import AbandonedAdd from "./pages/AbandonedAdd";
import AbandonedList from "./pages/AbandonedList";
import AbandonedView from "./pages/AbandonedView";
import AdminTags from "./pages/AdminTags";
import DonationPage from "./pages/DonationPage";
import CreateAbandonedPet from "./pages/CreateAbandonedPet";
import CreateOwnerPet from "./pages/CreateOwnerPet";
import Home from "./pages/Home";
import MeAdote from "./pages/MeAdote";


export default function RoutingApp() {
  return (
    <BrowserRouter>
      <div className="container">
        <h1>🐶 PetsDigital</h1>
        <nav style={{ marginBottom: 18, textAlign: "center" }}>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/abandoned/list" className="nav-link">Abandonados</Link>
          <Link to="/abandoned/add" className="nav-link">Denunciar</Link>
          <Link to="/admin/tags" className="nav-link">Admin Tags</Link>
          <Link to="/donate" className="nav-link">Doar</Link>
        </nav>

        <Routes>
          <Route path="/" element={<PetList />} />
          <Route path="/pet/:id" element={<PetView />} />
          <Route path="/add" element={<CreatePetTag />} /> {/* expects ?tag=PET-001 */}
          <Route path="/abandoned/add" element={<AbandonedAdd />} />
          <Route path="/abandoned/list" element={<AbandonedList />} />
          <Route path="/abandoned/:id" element={<AbandonedView />} />
          <Route path="/admin/tags" element={<AdminTags />} />
          <Route path="/donate" element={<DonationPage />} />
          <Route path="/cadastrar-abandonado" element={<CreateAbandonedPet />} />
          <Route path="/criar-tag-nfc" element={<CreateOwnerPet />} />
          <Route path="/" element={<Home />} />
          <Route path="/me-adote" element={<MeAdote />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
