// AbandonedList.jsx
import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function AbandonedList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "abandoned"), snap => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, []);

  return (
    <div className="container">
      <h2>Animais Abandonados</h2>
      <div className="grid-cards">
        {items.map(it => (
          <div className="card" key={it.id}>
            <h3>{it.name}</h3>
            <p>{it.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
