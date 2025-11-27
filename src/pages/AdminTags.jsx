// src/pages/AdminTags.jsx
import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, doc, setDoc } from "firebase/firestore";

export default function AdminTags() {
  const [tagId, setTagId] = useState("");
  const [created, setCreated] = useState(null);

  async function createTag(e) {
    e.preventDefault();
    if (!tagId) return;
    try {
      // create tag doc with ID = tagId
      await setDoc(doc(db, "tags", tagId), {
        used: false,
        createdAt: new Date().toISOString()
      });
      setCreated(tagId);
      setTagId("");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar tag. Veja console.");
    }
  }

  function copyTagUrl(tid) {
    const url = `${window.location.origin}/add?tag=${tid}`;
    navigator.clipboard.writeText(url);
    alert("URL copiada: " + url);
  }

  return (
    <div className="container">
      <h2>Admin - Criar TAG</h2>
      <form onSubmit={createTag}>
        <input placeholder="Ex: PET-001" value={tagId} onChange={e=>setTagId(e.target.value.toUpperCase())} />
        <button type="submit">Criar TAG</button>
      </form>

      {created && (
        <div style={{ marginTop: 16 }}>
          <p>Tag criada: <strong>{created}</strong></p>
          <button onClick={()=>copyTagUrl(created)}>Copiar URL para NFC</button>
        </div>
      )}

      <p style={{ marginTop: 20 }} className="small-muted">Observação: mantenha este painel seguro — crie tags apenas você.</p>
    </div>
  );
}
