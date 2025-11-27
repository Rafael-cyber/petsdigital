// CreateAbandonedPet.jsx
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function CreateAbandonedPet() {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const nav = useNavigate();

  async function enviar(e) {
    e.preventDefault();
    await addDoc(collection(db, "abandoned"), {
      name, description: desc, createdAt: Date.now()
    });
    alert("Abandono cadastrado");
    nav("/abandoned-list");
  }

  return (
    <div className="container" style={{maxWidth:600}}>
      <h2>Adicionar Pet Abandonado</h2>
      <form onSubmit={enviar} className="col">
        <input placeholder="Nome" value={name} onChange={e=>setName(e.target.value)} required/>
        <textarea placeholder="Descrição" value={desc} onChange={e=>setDesc(e.target.value)} />
        <button className="btn" type="submit">Salvar</button>
      </form>
    </div>
  );
}
