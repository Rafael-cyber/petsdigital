import React, { useState } from "react";
import { db, auth } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import QRCode from "react-qr-code";
import { useNavigate } from "react-router-dom";
import "../styles/createpet.css";

export default function CreatePet(){
  const [nome,setNome]=useState('');
  const [raca,setRaca]=useState('');
  const [descricao,setDescricao]=useState('');
  const [qrLink,setQrLink]=useState(null);
  const [loading,setLoading]=useState(false);
  const nav = useNavigate();

  async function criar(e){
    e.preventDefault();
    const user = auth.currentUser;
    if(!user) return nav('/login');
    try{
      setLoading(true);
      const docRef = await addDoc(collection(db,'pets'), { nome, raca, descricao, donoUID: user.uid, criadoEm: new Date() });
      const link = `${window.location.origin}/pet/${docRef.id}`;
    }catch(err){ console.error(err); alert('Erro'); }
    setLoading(false);
  }

  return (
    <div className="add-container">
      <h1>🐶 Adicionar Pet</h1>
      <form onSubmit={criar} className="form">
        <input placeholder="Nome" value={nome} onChange={e=>setNome(e.target.value)} required/>
        <input placeholder="Raça" value={raca} onChange={e=>setRaca(e.target.value)} required/>
        <textarea placeholder="Descrição" value={descricao} onChange={e=>setDescricao(e.target.value)} required/>
        <button className="btn" disabled={loading}>{loading ? 'Salvando...' : 'Salvar Pet'}</button>
      </form>
    </div>
  );
}
