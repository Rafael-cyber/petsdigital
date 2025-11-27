// PetView.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams, useNavigate } from "react-router-dom";

export default function PetView() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    async function load() {
      const ref = doc(db, "pets", id);
      const snap = await getDoc(ref);
      if (!snap.exists()) {
        alert("Pet não encontrado");
        nav("/");
        return;
      }
      setPet({ id: snap.id, ...snap.data() });
    }
    load();
  }, [id, nav]);

  if (!pet) return <div className="container">Carregando...</div>;

  return (
    <div className="container">
      <div className="card" style={{display:"flex", gap:16}}>
        {pet.imageUrl && <img src={pet.imageUrl} alt={pet.name} style={{width:300}}/>}
        <div>
          <h2>{pet.name}</h2>
          <p className="text-muted">{pet.breed} • {pet.age}</p>
          <p>{pet.description}</p>
          <p>Status: {pet.status}</p>
        </div>
      </div>
    </div>
  );
}
