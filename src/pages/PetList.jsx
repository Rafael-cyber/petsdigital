// src/pages/PetList.jsx
import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function PetList(){
  const [pets, setPets] = useState([]);
  useEffect(()=>{
    const q = query(collection(db, "pets"), orderBy("createdAt","desc"));
    const unsub = onSnapshot(q, snap => setPets(snap.docs.map(d=>({ id: d.id, ...d.data() }))));
    return ()=>unsub();
  },[]);
  return (
    <div className="container">
      <h2>Todos os pets</h2>
      {pets.map(p => (
        <Link to={`/pet/${p.id}`} key={p.id} style={{ textDecoration: "none" }}>
          <div className="pet-card">
            <img src={p.photoURL || "/placeholder.png"} className="pet-photo" alt="" />
            <div>
              <strong>{p.name || p.nome || "—"}</strong>
              <p className="small-muted">{p.type === "owner" ? "Com dono" : "Abandonado"}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
