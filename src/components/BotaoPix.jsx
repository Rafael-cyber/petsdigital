// BotaoPix.jsx
import React from "react";

export default function BotaoPix() {
  async function copiarPix() {
    try {
      await navigator.clipboard.writeText("gomes.gg42@gmail.com");
      alert("PIX copiado! Obrigado 😊");
    } catch {
      alert("Não foi possível copiar o PIX. Copie manualmente: gomes.gg42@gmail.com");
    }
  }

  return (
    <button
      onClick={copiarPix}
      style={{
        position: "fixed",
        right: 16,
        bottom: 16,
        background: "#7c3aed",
        color: "white",
        padding: "10px 16px",
        borderRadius: 999,
        boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
        border: "none",
        cursor: "pointer",
        zIndex: 50
      }}
      aria-label="Ajudar o Criador (PIX)"
    >
      💜 Ajudar (PIX)
    </button>
  );
}
