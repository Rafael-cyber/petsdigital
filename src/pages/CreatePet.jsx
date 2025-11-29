import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../services/firebase"; // seu firebase configurado
import { collection, addDoc, Timestamp } from "firebase/firestore";
import "../styles/createPet.css"; // opcional, para estilo laranja

export default function CreatePet() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [photo, setPhoto] = useState(null);

  // Função para upload de foto usando Firebase Storage (opcional)
  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let photoURL = "";

      if (photo) {
        // Importar Storage
        const { getStorage, ref, uploadBytes, getDownloadURL } = await import(
          "firebase/storage"
        );
        const storage = getStorage();
        const storageRef = ref(storage, `pets/${photo.name}`);
        await uploadBytes(storageRef, photo);
        photoURL = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "pets"), {
        name,
        age,
        photo: photoURL,
        createdAt: Timestamp.now(),
      });

      alert("Pet cadastrado com sucesso!");
      navigate("/meus-pets");
    } catch (error) {
      console.error(error);
      alert("Erro ao cadastrar pet.");
    }
  };

  return (
    <div className="create-pet-container">
      <h2>Cadastrar Pet 🐶</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          Idade:
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>

        <label>
          Foto:
          <input type="file" onChange={handlePhotoChange} />
        </label>

        <button type="submit" className="btn-orange">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
