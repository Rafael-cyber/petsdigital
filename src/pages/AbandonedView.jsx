// AbandonedView.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function AbandonedView() {
  const { id } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function load() {
      const d = await getDoc(doc(db, "abandoned", id));
      if (d.exists()) setItem({ id: d.id, ...d.data() });
    }
    load();
  }, [id]);

  if (!item) return <div className="container">Carregando...</div>;
  return (
    <div className="container">
      <div className="card">
        <h2>{item.name}</h2>
        <p>{item.description}</p>
      </div>
    </div>
  );
}
