import { Link, useNavigate } from "react-router-dom";
import "../styles/nav.css";
import { auth } from "../services/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";

export default function Nav() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  async function doLogout() {
    await signOut(auth);
    navigate("/login");
  }

  return (
    <header className="nav">
      <div className="logo">🐾 PetsDigital</div>

      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/meus-pets">Meus Pets</Link>
        <Link to="/adicionar-pet">Adicionar Pet</Link>
        <Link to="/adote">Adote</Link>
        {user ? (
          <>
            <span className="user-badge">Olá, {user.email}</span>
            <button className="btn-logout" onClick={doLogout}>Sair</button>
          </>
        ) : (
          <Link to="/login">Entrar</Link>
        )}
      </nav>
    </header>
  );
}
