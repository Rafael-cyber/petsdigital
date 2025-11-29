import React, { useEffect, useState } from "react";
import { auth, db } from "../services/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "../styles/pets.css";

export default function MeusPets() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function carregar() {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(
        collection(db, "pets"),
        where("donoId", "==", user.uid)
      );

      const snap = await getDocs(q);
      const lista = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setPets(lista);
    }

    carregar();
  }, []);

  return (
    <div className="pets-container">
      <h1>🐾 Meus Pets</h1>

      <a className="btn-add" href="/criar-tag">Adicionar Pet</a>

      <div className="pets-grid">
        {pets.map((p) => (
          <div key={p.id} className="pet-card">
            <img src={p.fotoURL} />
            <h3>{p.nome}</h3>
            <a className="btn" href={`/pet/${p.id}`}>Ver Tag</a>
          </div>
        ))}
      </div>
    </div>
  );
}
