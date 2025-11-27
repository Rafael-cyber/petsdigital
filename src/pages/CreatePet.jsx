import { addPet } from "../services/petService";
import { auth } from "../firebaseClient";

async function salvarPet() {
  const user = auth.currentUser;
  if (!user) {
    alert("Você precisa estar logado.");
    return;
  }

  await addPet(
    {
      nome,
      descricao,
      foto
    },
    user.uid
  );

  alert("Pet cadastrado!");
  window.location.href = "/meus-pets";
}
