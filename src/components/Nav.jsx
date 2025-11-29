// src/components/Nav.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../styles/nav.css";

export default function Nav() {
  return (
    <nav className="nav">
      <Link to="/" className="logo">🐾 PetsDigital</Link>

      <div className="links">
        <Link to="/meus-pets">Meus Pets</Link>
        <Link to="/adote">Me Adote</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Registrar</Link>
      </div>
    </nav>
  );
}
