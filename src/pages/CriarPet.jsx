// src/pages/CreatePet.jsx
import React, { useState } from "react";
import { db, auth } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function CreatePet() {
  const [nome, setNome] = useState("");
  const [raca, setRaca] = useState("");
  const [idade, setIdade] = useState("");
  const [descricao, setDescricao] = useState("");
  const navigate = useNavigate();

  async function cadastrarPet(e) {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("Faça login primeiro!");
      return;
    }

    try {
      await addDoc(collection(db, "pets"), {
        nome,
        raca,
        idade,
        descricao,
        donoId: user.uid,
        criadoEm: new Date(),
      });

      alert("Pet cadastrado com sucesso!");
      navigate("/meus-pets");
    } catch (err) {
      console.error(err);
      alert("Erro ao cadastrar pet.");
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h2 style={{ color: "orange", textAlign: "center" }}>Cadastrar Pet</h2>

      <form onSubmit={cadastrarPet} style={{ display: "flex", flexDirection: "column", gap: 15 }}>

        <input
          type="text"
          placeholder="Nome do pet"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Raça"
          value={raca}
          onChange={(e) => setRaca(e.target.value)}
          required
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Idade"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          required
          style={inputStyle}
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={{ ...inputStyle, height: 100 }}
        />

        <button type="submit" style={botaoStyle}>
          Salvar Pet
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  padding: 12,
  borderRadius: 8,
  border: "2px solid orange",
  outline: "none",
  fontSize: 16,
};

const botaoStyle = {
  padding: 12,
  borderRadius: 8,
  background: "orange",
  border: "none",
  color: "#fff",
  fontSize: 18,
  cursor: "pointer",
};
