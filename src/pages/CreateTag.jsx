import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CreateTag() {
  const [nome, setNome] = useState("");
  const [raca, setRaca] = useState("");
  const [idade, setIdade] = useState("");
  const [dono, setDono] = useState("");

  const gerarTag = () => {
    return "TAG-" + Math.random().toString(36).substring(2, 10).toUpperCase();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagID = gerarTag();

    await addDoc(collection(db, "petsComDono"), {
      nome,
      raca,
      idade,
      dono,
      tagID,
      criadoEm: new Date()
    });

    alert("PET cadastrado! TAG: " + tagID);

    setNome("");
    setRaca("");
    setIdade("");
    setDono("");
  };

  return (
    <div className="container">
      <h1>Criar TAG NFC</h1>

      <form onSubmit={handleSubmit} className="formulario">
        <input
          placeholder="Nome do pet"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />

        <input
          placeholder="Raça"
          value={raca}
          onChange={(e) => setRaca(e.target.value)}
          required
        />

        <input
          placeholder="Idade"
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          required
        />

        <input
          placeholder="Nome do Dono"
          value={dono}
          onChange={(e) => setDono(e.target.value)}
          required
        />

        <button type="submit">Criar TAG</button>
      </form>
    </div>
  );
}

