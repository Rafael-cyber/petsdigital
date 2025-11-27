// MeAdote.jsx
import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, query, where, onSnapshot, updateDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function MeAdote() {
  const [pets, setPets] = useState([]);
  const nav = useNavigate();
  const currentUid = auth.currentUser?.uid;

  useEffect(() => {
    const q = query(collection(db, "pets"), where("status", "!=", "faleceu"));
    const unsub = onSnapshot(q, snap => {
      setPets(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  async function setStatus(id, status) {
    await updateDoc(doc(db, "pets", id), { status, updatedAt: Date.now() });
  }

  return (
    <div className="container">
      <h2>Quero Ser Adotado</h2>

      <div className="grid-cards" style={{marginTop:12}}>
        {pets.map(pet => {
          const isOwner = pet.ownerId === currentUid;
          return (
            <div className="card" key={pet.id}>
              {pet.imageUrl && <img src={pet.imageUrl} alt={pet.name} />}
              <h3>{pet.name}</h3>
              <p className="text-muted">{pet.breed} • {pet.age}</p>
              <p>{pet.description}</p>
              <p>
                {pet.status === "adotado" ? <span className="status-adopted">Adotado</span> :
                 <span className="status-available">{pet.status}</span>}
              </p>

              {isOwner && (
                <div className="row" style={{marginTop:8}}>
                  <button className="btn" onClick={()=>setStatus(pet.id, "adotado")}>Marcar Adotado</button>
                  <button className="btn btn-ghost" onClick={()=>setStatus(pet.id, "faleceu")}>Marcar Falecido</button>
                </div>
              )}

              <div style={{marginTop:8}}>
                <button className="btn btn-ghost" onClick={()=>nav(`/pet/${pet.id}`)}>Ver</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
