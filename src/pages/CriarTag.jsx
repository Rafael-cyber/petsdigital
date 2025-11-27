// frontend/src/pages/CriarTag.jsx
import { useState } from "react";
import { addPet } from "../services/petService";
import { auth } from "../firebaseClient"; // ajuste se seu auth vem de outro arquivo
import { useNavigate } from "react-router-dom";

export default function CriarTag() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      alert("Você precisa estar logado para cadastrar um pet.");
      return;
    }

    const data = {
      nome,
      descricao,
      foto,
      status: "disponivel",
    };

    try {
      await addPet(data, user.uid);
      alert("Pet cadastrado com sucesso!");
      // redireciona para MeusPets ou MeAdote conforme necessário
      navigate("/meus-pets");
    } catch (err) {
      console.error("Erro ao criar pet:", err);
      alert("Erro ao cadastrar pet. Veja o console.");
    }
  }

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Criar Tag</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="p-2 border rounded"
          required
        />

        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="p-2 border rounded"
        />

        <input
          placeholder="URL da foto"
          value={foto}
          onChange={(e) => setFoto(e.target.value)}
          className="p-2 border rounded"
        />

        <button type="submit" className="mt-2 bg-green-600 text-white py-2 rounded">
          Criar Tag
        </button>
      </form>
    </div>
  );
}
