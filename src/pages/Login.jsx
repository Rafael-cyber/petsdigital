import React, { useEffect, useState } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate, Link } from "react-router-dom";
import "../styles/login.css";

export default function Login(){
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);
  const nav = useNavigate();

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (u)=>{
      setLoggedUser(u?.email ?? null);
    });
    return unsub;
  },[]);

  async function fazerLogin(e){
    e.preventDefault();
    setLoading(true);
    try{
      await signInWithEmailAndPassword(auth, email, senha);
      nav('/meus-pets');
    }catch(err){
      alert('Erro: '+err.message);
    }
    setLoading(false);
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🔐 Entrar</h1>
        {loggedUser && <p className="logged-banner">✅ Logado como <b>{loggedUser}</b></p>}

        <form onSubmit={fazerLogin}>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="seu e-mail" type="email" required/>
          <input value={senha} onChange={e=>setSenha(e.target.value)} placeholder="sua senha" type="password" required/>
          <button disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
        </form>

        <p style={{marginTop:12}}>Não tem conta? <Link to="/register">Criar conta</Link></p>
      </div>
    </div>
  );
}
