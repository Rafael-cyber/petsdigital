import { useState } from "react";
import { uploadImageToSupabase, supabase } from "../supabaseClient";

export default function AbandonedAdd() {
  const [name, setName] = useState("");
  const [animalType, setAnimalType] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    let imageUrl = null;

    if (imageFile) {
      imageUrl = await uploadImageToSupabase(imageFile);
    }

    const { error } = await supabase.from("abandoned_pets").insert({
      name,
      type: animalType,
      description,
      image: imageUrl,
      created_at: new Date(),
    });

    setLoading(false);

    if (error) {
      alert("Erro ao cadastrar pet!");
      console.error(error);
    } else {
      alert("Pet cadastrado com sucesso!");
      setName("");
      setAnimalType("");
      setDescription("");
      setImageFile(null);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Cadastrar Pet Abandonado</h1>

      <form onSubmit={handleSubmit}>
        
        <label>Nome do Pet:</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />

        <label>Tipo do Animal:</label>
        <input value={animalType} onChange={(e) => setAnimalType(e.target.value)} />

        <label>Descrição:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Foto:</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <br /><br />

        <button type="submit" disabled={loading}>
          {loading ? "Salvando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
}

