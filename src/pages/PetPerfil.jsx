import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPetById, updatePet, updatePetStatus } from "../services/petService";
import { auth } from "../firebaseClient";

export default function PetPerfil() {
  const { id } = useParams();
  const [pet, setPet] = useState(null);
  const [form, setForm] = useState({ nome: "", descricao: "", foto: "" });

  useEffect(() => {
    async function load() {
      const p = await getPetById(id);
      const user = auth.currentUser;

      if (!p) {
        alert("Pet não encontrado.");
        return;
      }

      if (p.ownerId !== user.uid) {
        alert("Você não tem permissão para editar este pet.");
        window.location.href = "/meus-pets";
        return;
      }

      setPet(p);
      setForm({
        nome: p.nome,
        descricao: p.descricao,
        foto: p.foto
      });
    }
    load();
  }, [id]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function salvar() {
    await updatePet(id, form);
    alert("Atualizado!");
  }

  async function marcar(status) {
    await updatePetStatus(id, status);
    alert("Status atualizado!");
  }

  if (!pet) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Editar Pet</h1>

      <label>Nome:</label>
      <input name="nome" value={form.nome} onChange={handleChange} />

      <label>Descrição:</label>
      <textarea name="descricao" value={form.descricao} onChange={handleChange} />

      <label>Foto URL:</label>
      <input name="foto" value={form.foto} onChange={handleChange} />

      <button onClick={salvar}>Salvar</button>

      <hr />

      <h3>Status</h3>
      <button onClick={() => marcar("adotado")}>Marcar como Adotado</button>
      <button onClick={() => marcar("faleceu")}>Marcar como Falecido</button>
      <button onClick={() => marcar("disponivel")}>Disponível novamente</button>
    </div>
  );
}
