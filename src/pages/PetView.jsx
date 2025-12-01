import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";

export default function PetView(){
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(()=>{
    async function load(){
      const d = await getDoc(doc(db,'pets', id));
      if(d.exists()) setPet({id:d.id, ...d.data()});
    }
    load();
  },[id]);

  if(!pet) return <p>Carregando...</p>;
  return (
    <div style={{padding:20}}>
      <h1>{pet.nome}</h1>
      <p><b>Raça:</b> {pet.raca}</p>
      <p>{pet.descricao}</p>
    </div>
  );
}
