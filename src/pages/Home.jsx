// Home.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import PetList from "./PetList";
import BotaoPix from "../components/BotaoPix";

export default function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "pets"), where("status", "==", "disponivel"));
    const unsub = onSnapshot(q, snap => setPets(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
    return () => unsub();
  }, []);

  return (
    <div className="container">
      <h2>Bem-vindo ao PetsDigital</h2>
      <p className="text-muted">Encontre pets para adoção ou cadastre o seu.</p>

      <PetList pets={pets} />
      <BotaoPix />
    </div>
  );
}
