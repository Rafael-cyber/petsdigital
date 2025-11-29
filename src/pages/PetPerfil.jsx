import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function PetPerfil() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(() => {
    async function carregar() {
      const ref = doc(db, "petsDonos", id);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        setPet(snap.data());
      } else {
        setPet(false);
      }
    }
    carregar();
  }, [id]);

  if (pet === false) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h1>Pet não encontrado ❌</h1>
        <p>Este link pode estar incorreto ou o pet foi removido.</p>
      </div>
    );
  }

  if (!pet) {
    return (
      <div style={{ padding: 20, textAlign: "center" }}>
        <h1>Carregando...</h1>
      </div>
    );
  }

  function abrirWhatsApp() {
    const numero = pet.whatsapp.replace(/\D/g, "");
    const mensagem = encodeURIComponent(`Olá! Encontrei o pet ${pet.nome}.`);
    window.open(`https://wa.me/${numero}?text=${mensagem}`, "_blank");
  }

  function ligar() {
    const numero = pet.whatsapp.replace(/\D/g, "");
    window.open(`tel:${numero}`);
  }

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", fontSize: 28, fontWeight: 700 }}>
        {pet.nome}
      </h1>

      <div
        style={{
          marginTop: 25,
          padding: 20,
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >
        <p style={{ fontSize: 18 }}>
          <strong>🐾 Nome:</strong> {pet.nome}
        </p>
        <p style={{ fontSize: 18 }}>
          <strong>🎂 Idade:</strong> {pet.idade}
        </p>
        <p style={{ fontSize: 18 }}>
          <strong>🐶 Raça:</strong> {pet.raca}
        </p>
        <p style={{ fontSize: 18 }}>
          <strong>👤 Dono:</strong> {pet.dono}
        </p>
        <p style={{ fontSize: 18 }}>
          <strong>📱 Contato:</strong> {pet.whatsapp}
        </p>

        <button
          onClick={abrirWhatsApp}
          style={{
            marginTop: 20,
            width: "100%",
            padding: 14,
            background: "#25D366",
            border: "none",
            color: "white",
            borderRadius: 10,
            fontSize: 18,
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            gap: 10
          }}
        >
          📲 Chamar no WhatsApp
        </button>

        <button
          onClick={ligar}
          style={{
            marginTop: 12,
            width: "100%",
            padding: 14,
            background: "#1576FF",
            border: "none",
            color: "white",
            borderRadius: 10,
            fontSize: 18,
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            gap: 10
          }}
        >
          📞 Ligar para o dono
        </button>

        <button
          disabled
          style={{
            marginTop: 12,
            width: "100%",
            padding: 14,
            background: "#ff7f00",
            border: "none",
            color: "white",
            borderRadius: 10,
            fontSize: 18,
            opacity: 0.6,
            fontWeight: "bold",
            display: "flex",
            justifyContent: "center",
            gap: 10
          }}
        >
          📍 Informar localização (em manutenção)
        </button>
      </div>

      <p
        style={{
          marginTop: 20,
          textAlign: "center",
          fontSize: 14,
          opacity: 0.7
        }}
      >
        Esta página foi aberta através da TAG NFC do pet.
      </p>
    </div>
  );
}
