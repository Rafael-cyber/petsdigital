import React, { useEffect, useState } from "react";
import { db, auth } from "../services/firebase";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import "../styles/meuspets.css";

export default function MeusPets(){
  const [pets, setPets] = useState([]);
  const nav = useNavigate();

  useEffect(()=>{
    const user = auth.currentUser;
    if(!user) { nav('/login'); return; }
    const q = query(collection(db, "pets"), where("donoUID","==", user.uid));
    const unsub = onSnapshot(q, snap=>{
      const list = snap.docs.map(d=>({id:d.id, ...d.data()}));
      setPets(list);
    });
    return ()=>unsub();
  },[]);

  return (
    <div className="meus-pets-container">
      <h1>🐾 Meus Pets</h1>

      <div style={{display:'flex',gap:12,marginBottom:16}}>
        <Link to="/adicionar-pet" className="btn">➕ Adicionar Pet</Link>
        <Link to="/meadote" className="btn secondary">Quero ser adotado</Link>
      </div>

      {pets.length===0 ? <p>Nenhum pet cadastrado ainda.</p> : (
        <div className="lista">
          {pets.map(p=> (
            <div key={p.id} className="card">
              <h3>{p.nome}</h3>
              <p><b>Raça:</b> {p.raca}</p>
              <p>{p.descricao}</p>
              <Link to={`/pet/${p.id}`} className="ver">Ver Tag</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
