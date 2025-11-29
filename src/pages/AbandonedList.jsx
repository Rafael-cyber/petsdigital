import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

export default function AbandonedList(){
  const [list, setList] = useState([]);
  useEffect(()=>{
    async function load(){
      const snap = await getDocs(collection(db,"abandonados"));
      setList(snap.docs.map(d=>({id:d.id, ...d.data()})));
    }
    load();
  },[]);
  return (
    <div className="card">
      <h2 className="orange">Abandonados</h2>
      <div className="grid">
        {list.map(i=>(
          <div key={i.id} className="card">
            <p className="small">{i.description}</p>
            <p className="small">Local: {i.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
