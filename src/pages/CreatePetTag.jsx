import React, { useState } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function CreatePetTag() {
  const [tagId, setTagId] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!tagId.trim()) return alert("Digite o ID da TAG.");

    try {
      setLoading(true);

      await addDoc(collection(db, "tags"), {
        tagId: tagId.toUpperCase(),
        createdAt: new Date(),
      });

      alert("TAG cadastrada com sucesso!");
      setTagId("");
    } catch (err) {
      console.error("Erro ao criar TAG:", err);
      alert("Erro ao criar TAG. Veja o console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "auto" }}>
      <h2>Cadastrar TAG NFC</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <label>ID da TAG (ex: PET-001)</label>
        <input
          type="text"
          value={tagId}
          onChange={(e) => setTagId(e.target.value)}
          placeholder="Digite algo como: PET-001"
          style={{ padding: 10, borderRadius: 6, border: "1px solid #ccc" }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: 12,
            background: "#2b6cb0",
            color: "white",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading ? "Salvando..." : "Cadastrar TAG"}
        </button>
      </form>
    </div>
  );
}
