import React, { useState } from "react";
import { auth, db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import "../styles/pets.css";

export default function CriarTag() {
  const [nome, setNome] = useState("");
  const [raca, setRaca] = useState("");
  const [contato, setContato] = useState("");
  const [descricao, setDescricao] = useState("");

  async function enviar(e) {
    e.preventDefault();

    if (!auth.currentUser) return alert("Você precisa estar logado!");

    await addDoc(collection(db, "pets"), {
      nome,
      raca,
      contato,
      descricao,
      donoId: auth.currentUser.uid,
      criadoEm: new Date(),
    });

    window.location.href = "/meus-pets";
  }

  return (
    <div className="pets-container">
      <h1>Criar TAG para Pet</h1>

      <form className="form" onSubmit={enviar}>
        <input placeholder="Nome" onChange={(e) => setNome(e.target.value)} />
        <input placeholder="Raça" onChange={(e) => setRaca(e.target.value)} />
        <input placeholder="Contato (WhatsApp)" onChange={(e) => setContato(e.target.value)} />
        <textarea placeholder="Descrição" onChange={(e) => setDescricao(e.target.value)} />

        <button className="btn-add" type="submit">Criar</button>
      </form>
    </div>
  );
}
