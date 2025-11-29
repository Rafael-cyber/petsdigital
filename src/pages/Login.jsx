// src/pages/Login.jsx
import React, { useState } from "react";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  async function entrar(e) {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, senha);
      navigate("/meus-pets"); // ⬅ Login → redireciona para página dos próprios pets
    } catch (err) {
      setErro("Email ou senha incorretos!");
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Login</h1>

      <form onSubmit={entrar} style={styles.form}>
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

        <button style={styles.button}>Entrar</button>

        {erro && <p style={styles.erro}>{erro}</p>}

        <p style={styles.registerText}>
          Ainda não tem conta?{" "}
          <span
            style={styles.registerLink}
            onClick={() => navigate("/register")}
          >
            Criar conta
          </span>
        </p>
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
  registerText: {
    textAlign: "center",
    marginTop: "10px",
    fontSize: "16px",
  },
  registerLink: {
    color: "#ff7a00",
    cursor: "pointer",
    fontWeight: "bold",
  },
};
