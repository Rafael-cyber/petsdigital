import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../services/firebase";
import { useParams } from "react-router-dom";
import QRCode from "qrcode.react";

export default function PetProfile(){
  const { id } = useParams();
  const [pet, setPet] = useState(null);

  useEffect(()=>{
    async function fetchPet(){
      const d = await getDoc(doc(db, "pets", id));
      if (d.exists()) setPet({id:d.id, ...d.data()});
    }
    fetchPet();
  },[id]);

  if (!pet) return <div className="card center">Carregando...</div>;

  const tagData = `PET:${pet.id}`;

  return (
    <div className="card">
      <h2>{pet.name}</h2>
      {pet.photoURL && <img src={pet.photoURL} style={{width:"100%",borderRadius:8}} />}
      <p className="small">{pet.description}</p>

      <div style={{marginTop:12}}>
        <h3>QR Code da TAG</h3>
        <QRCode value={tagData} size={160} />
        <p className="small">Use este QR para identificar o pet ou gravar em TAG NFC com app apropriado.</p>
      </div>
    </div>
  );
}
