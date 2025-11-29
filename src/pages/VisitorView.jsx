import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import "../styles/pets.css";

export default function VisitorView() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    async function load() {
      const snap = await getDoc(doc(db, "pets", id));
      if (snap.exists()) setPet(snap.data());
    }
    load();
  }, []);

  if (!pet) return <p>Carregando...</p>;

  return (
    <div className="pets-container">
      <h1>🐾 TAG do Pet</h1>
      <h2>{pet.nome}</h2>

      <p><b>Raça:</b> {pet.raca}</p>
      <p><b>Descrição:</b> {pet.descricao}</p>

      <a className="btn" href={`https://wa.me/55${pet.contato}`}>
        Falar com o dono
      </a>

      <br /><br />

      <a className="btn" style={{ background: "red" }} href={`/denuncia/${id}`}>
        Denunciar animal abandonado
      </a>
    </div>
  );
}
