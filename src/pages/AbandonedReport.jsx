import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../services/firebase";

export default function AbandonedReport(){
  const [desc, setDesc] = useState("");
  const [location, setLocation] = useState("");

  async function enviar(e){
    e.preventDefault();
    await addDoc(collection(db, "abandonados"), {
      description: desc,
      location,
      createdAt: new Date()
    });
    alert("Denúncia enviada. Obrigado!");
    setDesc(""); setLocation("");
  }

  return (
    <div className="card" style={{maxWidth:640, margin:"18px auto"}}>
      <h2 className="orange">Denunciar Abandono</h2>
      <form onSubmit={enviar}>
        <textarea className="field" value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Descreva o caso"></textarea>
        <input className="field" value={location} onChange={e=>setLocation(e.target.value)} placeholder="Local (rua, bairro, cidade)" />
        <button className="btn" type="submit">Enviar Denúncia</button>
      </form>
    </div>
  );
}
