// src/pages/Auth.jsx
import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [user, setUser] = useState(null);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });
    return () => unsub();
  }, []);

  async function registrar(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, senha);
      setMensagem("Conta criada e logado!");
    } catch (err) {
      setMensagem("Erro: " + err.message);
    }
  }

  async function login(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, senha);
      setMensagem("Logado com sucesso!");
    } catch (err) {
      setMensagem("Erro: " + err.message);
    }
  }

  async function sair() {
    await signOut(auth);
    setMensagem("Desconectado.");
  }

  return (
    <div style={{ padding: 20, maxWidth: 420, margin: "auto" }}>
      <h2>Login / Registrar</h2>

      {user ? (
        <div>
          <p>Conectado como: {user.email}</p>
          <button onClick={sair} style={{ background: "#ff7f00", color: "white", padding: 10, border: "none", borderRadius: 8 }}>
            Sair
          </button>
        </div>
      ) : (
        <form style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email" />
          <input value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="senha" type="password" />

          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={login} style={{ padding: 8, background: "#25D366", color: "white", border: "none", borderRadius: 8 }}>
              Entrar
            </button>
            <button onClick={registrar} style={{ padding: 8, background: "#1576FF", color: "white", border: "none", borderRadius: 8 }}>
              Registrar
            </button>
          </div>
        </form>
      )}

      {mensagem && <p style={{ marginTop: 12 }}>{mensagem}</p>}
    </div>
  );
}
