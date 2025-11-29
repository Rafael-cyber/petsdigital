// src/pages/Register.jsx
import React, { useState } from "react";
import { auth, db } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [erro, setErro] = useState("");

  async function registrar(e) {
    e.preventDefault();

    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, senha);

      await addDoc(collection(db, "usuarios"), {
        uid: userCred.user.uid,
        nome,
        email,
        criadoEm: new Date(),
      });

      navigate("/login");
    } catch (err) {
      setErro("Erro ao registrar: " + err.message);
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Criar Conta</h1>

      <form onSubmit={registrar} style={styles.form}>
        <input
          type="text"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="email"
          placeholder="Seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          style={styles.input}
          required
        />

        <button style={styles.button}>Registrar</button>

        {erro && <p style={styles.erro}>{erro}</p>}
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "400px",
    margin: "40px auto",
  },
  title: {
    textAlign: "center",
    color: "#ff7a00",
    fontSize: "32px",
    fontWeight: "bold",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px",
    fontSize: "16px",
    borderRadius: "10px",
    border: "2px solid #ffb36b",
  },
  button: {
    padding: "12px",
    backgroundColor: "#ff7a00",
    color: "white",
    fontWeight: "bold",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "18px",
    border: "none",
  },
  erro: {
    marginTop: "10px",
    color: "red",
    textAlign: "center",
  },
};
