// CreatePetTag.jsx
import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

export default function CreatePetTag() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      alert("Faça login para cadastrar um pet.");
      return;
    }

    setLoading(true);
    try {
      let imageUrl = "";
      if (file) {
        const storage = getStorage();
        const fileRef = ref(storage, `pets/${user.uid}_${Date.now()}_${file.name}`);
        await uploadBytes(fileRef, file);
        imageUrl = await getDownloadURL(fileRef);
      }

      const payload = {
        name,
        breed,
        age,
        description,
        imageUrl,
        ownerId: user.uid,
        status: "disponivel",
        createdAt: Date.now()
      };

      await addDoc(collection(db, "pets"), payload);

      alert("Pet cadastrado com sucesso!");
      nav("/meus-pets");
    } catch (err) {
      console.error(err);
      alert("Erro ao criar pet.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{maxWidth:600}}>
      <h2>Criar Tag / Cadastrar Pet</h2>
      <form onSubmit={handleSubmit} className="col">
        <input placeholder="Nome" value={name} onChange={e=>setName(e.target.value)} required />
        <input placeholder="Raça" value={breed} onChange={e=>setBreed(e.target.value)} />
        <input placeholder="Idade" value={age} onChange={e=>setAge(e.target.value)} />
        <textarea placeholder="Descrição" value={description} onChange={e=>setDescription(e.target.value)} />
        <input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])} />
        <div className="row">
          <button className="btn" type="submit" disabled={loading}>{loading ? "Enviando..." : "Criar Pet"}</button>
        </div>
      </form>
    </div>
  );
}
