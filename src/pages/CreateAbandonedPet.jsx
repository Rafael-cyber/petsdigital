import { useState } from "react";
import { db } from "../firebase"; 
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function CreateAbandonedPet() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("GPS não suportado no dispositivo.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      () => alert("Não foi possível obter a localização."),
      { enableHighAccuracy: true }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "pets_abandonados"), {
        nome,
        descricao,
        localizacao: location || null,
        criadoEm: Timestamp.now()
      });

      alert("Pet abandonado cadastrado!");
      setNome("");
      setDescricao("");
      setLocation(null);

    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar pet.");
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Cadastrar Pet Abandonado</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Nome do pet"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          style={styles.input}
          required
        />

        <textarea
          placeholder="Descrição do pet"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          style={styles.textarea}
          required
        />

        <button 
          type="button" 
          onClick={getLocation} 
          style={styles.button}
        >
          Obter localização
        </button>

        {location && (
          <p style={styles.locationText}>
            Localização obtida: {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
          </p>
        )}

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Salvando..." : "Cadastrar Pet"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    maxWidth: 400,
    margin: "0 auto",
    textAlign: "center"
  },
  title: {
    fontSize: 22,
    marginBottom: 20,
    fontWeight: "bold"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12
  },
  input: {
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid #ccc"
  },
  textarea: {
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    border: "1px solid #ccc",
    minHeight: 80
  },
  button: {
    padding: 12,
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    fontSize: 16,
    cursor: "pointer"
  },
  locationText: {
    fontSize: 14,
    color: "#333"
  }
};
