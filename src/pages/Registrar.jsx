import React, { useState } from "react";
import { auth, db } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "../styles/auth.css";

export default function Registrar() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");

  async function registrar(e) {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(auth, email, senha);

      await setDoc(doc(db, "users", user.user.uid), {
        nome: nome,
        email: email,
        criadoEm: new Date(),
      });

      window.location.href = "/meus-pets";
    } catch (err) {
      setErro("Erro ao criar conta");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>PetsDigital</h1>
        <h2>Criar conta</h2>

        {erro && <p className="erro">{erro}</p>}

        <form onSubmit={registrar}>
          <input placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} />

          <button type="submit">Registrar</button>
        </form>

        <a className="link" href="/login">Já tenho conta</a>
      </div>
    </div>
  );
}
