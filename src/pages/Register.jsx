import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Register(){
  const [email,setEmail]=useState('');
  const [senha,setSenha]=useState('');
  const nav = useNavigate();

  async function criar(e){
    e.preventDefault();
    try{
      await createUserWithEmailAndPassword(auth, email, senha);
      alert('Conta criada');
      nav('/meus-pets');
    }catch(err){
      alert(err.message);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🆕 Registrar</h1>

        <form onSubmit={criar}>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" type="email" required/>
          <input value={senha} onChange={e=>setSenha(e.target.value)} placeholder="senha" type="password" required/>
          <button>Registrar</button>
        </form>
      </div>
    </div>
  );
}
