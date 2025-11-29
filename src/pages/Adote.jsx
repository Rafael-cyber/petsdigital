// src/pages/Adote.jsx
import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Adote() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    async function carregar() {
      const snap = await getDocs(collection(db, "pets"));
      const lista = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setPets(lista);
    }
    carregar();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.titulo}>🐾 Me Adote</h1>

      <div style={styles.grid}>
        {pets.map((pet) => (
          <div key={pet.id} style={styles.card}>
            <img
              src={pet.foto || "https://via.placeholder.com/200"}
              alt={pet.nome}
              style={styles.foto}
            />

            <h2 style={styles.nome}>{pet.nome}</h2>
            <p style={styles.desc}>{pet.descricao}</p>

            <a
              href={`/visitante/${pet.id}`}
              style={styles.botao}
            >
              Ver Detalhes
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "20px" },
  titulo: {
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#ff7a00",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "20px",
    marginTop: "20px",
  },
  card: {
    background: "white",
    borderRadius: "15px",
    padding: "15px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  },
  foto: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px",
  },
  nome: {
    fontSize: "22px",
    marginTop: "10px",
    color: "#ff7a00",
  },
  desc: {
    fontSize: "15px",
    color: "#555",
  },
  botao: {
    display: "block",
    marginTop: "10px",
    padding: "10px",
    background: "#ff7a00",
    color: "white",
    borderRadius: "10px",
    fontWeight: "bold",
    textDecoration: "none",
  },
};
