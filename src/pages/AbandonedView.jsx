// src/pages/AbandonedView.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export default function AbandonedView(){
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(()=>{
    async function load(){
      const snap = await getDoc(doc(db, "abandoned", id));
      if (snap.exists()) setItem({ id: snap.id, ...snap.data() });
    }
    load();
  },[id]);

  if(!item) return <div className="container">Carregando...</div>;

  return (
    <div className="container">
      {item.photoURL && <img src={item.photoURL} className="photo-large" alt="" />}
      <h2>{item.place}</h2>
      <p><strong>Observações:</strong> {item.notes}</p>
      <small className="small-muted">{item.createdAt}</small>
    </div>
  );
}
