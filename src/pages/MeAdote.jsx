import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import "../styles/pets.css";

export default function MeAdote() {
  const [lista, setLista] = useState([]);

  useEffect(() => {
    async function load() {
      const snap = await getDocs(collection(db, "pets"));
      setLista(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    }
    load();
  }, []);

  return (
    <div className="pets-container">
      <h1>🐾 Quero ser adotado</h1>

      <div className="pets-grid">
        {lista.map((p) => (
          <div key={p.id} className="pet-card">
            <h3>{p.nome}</h3>
            <p>{p.raca}</p>
            <a className="btn" href={`/visitar/${p.id}`}>Ver mais</a>
          </div>
        ))}
      </div>
    </div>
  );
}
