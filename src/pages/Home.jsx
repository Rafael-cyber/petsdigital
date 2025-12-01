import React from "react";
import { auth } from "../services/firebase";

export default function Home(){
  const user = auth.currentUser;
  return (
    <div className="home">
      <h1>Bem-vindo ao PetsDigital</h1>
      <p>{user ? `Você está logado como ${user.email}` : "Faça login para gerenciar seus pets."}</p>
    </div>
  );
}
