import React, { useState } from "react";
import { db } from "../services/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function Denuncia() {
  const { id } = useParams();
  const [msg, setMsg] = useState("");

  async function enviar(e) {
    e.preventDefault();
    await addDoc(collection(db, "denuncias"), {
      petId: id,
      msg,
      data: new Date(),
    });

    alert("Denúncia enviada!");
    window.location.href = "/";
  }

  return (
    <div className="pets-container">
      <h1>Denunciar Pet</h1>
      <form className="form" onSubmit={enviar}>
        <textarea
          placeholder="Explique o que está acontecendo..."
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="btn-add">Enviar denúncia</button>
      </form>
    </div>
  );
}
