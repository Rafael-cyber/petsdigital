// PetList.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function PetList({ pets=[] }) {
  const nav = useNavigate();
  if (!pets.length) return <div className="card">Nenhum pet disponível.</div>;

  return (
    <div className="grid-cards">
      {pets.map(p => (
        <div className="card" key={p.id}>
          {p.imageUrl && <img src={p.imageUrl} alt={p.name} />}
          <h3>{p.name}</h3>
          <p className="text-muted">{p.breed}</p>
          <div className="row">
            <button className="btn" onClick={()=>nav(`/pet/${p.id}`)}>Ver</button>
          </div>
        </div>
      ))}
    </div>
  );
}
