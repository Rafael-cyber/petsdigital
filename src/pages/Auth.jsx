// Auth.jsx
import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    return onAuthStateChanged(auth, u => setUser(u));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, pass);
        alert("Conta criada!");
      } else {
        await signInWithEmailAndPassword(auth, email, pass);
        alert("Logado com sucesso!");
      }
      nav("/meus-pets");
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleLogout() {
    await signOut(auth);
    setEmail(""); setPass("");
    nav("/");
  }

  if (user) {
    return (
      <div className="container">
        <h2>Olá, {user.email}</h2>
        <button className="btn" onClick={() => nav("/meus-pets")}>Meus Pets</button>
        <button className="btn btn-ghost" onClick={handleLogout} style={{marginLeft:8}}>Sair</button>
      </div>
    );
  }

  return (
    <div className="container" style={{maxWidth:420}}>
      <h2>{isRegister ? "Criar Conta" : "Entrar"}</h2>

      <form onSubmit={handleSubmit} className="col">
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
        <input placeholder="Senha" type="password" value={pass} onChange={e=>setPass(e.target.value)} required />
        <div className="row">
          <button className="btn" type="submit">{isRegister ? "Registrar" : "Entrar"}</button>
          <button type="button" className="btn btn-ghost" onClick={()=>setIsRegister(!isRegister)}>{isRegister ? "Já tenho conta" : "Criar conta"}</button>
        </div>
      </form>
    </div>
  );
}
