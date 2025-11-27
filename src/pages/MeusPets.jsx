import { useEffect, useState } from "react";
import { db } from "../firebase";
import { auth } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "../styles/meusPets.css";

export default function MeusPets() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregar() {
      const user = auth.currentUser;
      if (!user) {
        setPets([]);
        setLoading(false);
        return;
      }

      // 🔥 Filtra apenas os pets do usuário logado
      const q = query(
        collection(db, "petsDonos"),
        where("dono", "==", user.uid)
      );

      const snap = await getDocs(q);
      const lista = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      setPets(lista);
      setLoading(false);
    }

    carregar();
  }, []);

  if (loading) return <p>Carregando seus pets...</p>;

  return (
    <div className="meus-pets-container">
      <h1>Meus Pets</h1>

      {pets.length === 0 && (
        <p>Você ainda não cadastrou nenhum pet.</p>
      )}

      <div className="pets-grid">
        {pets.map(pet => (
          <div key={pet.id} className="pet-card">
            {pet.foto && (
              <img src={pet.foto} alt={pet.nome} className="pet-foto" />
            )}

            <h3>{pet.nome}</h3>
            <p><strong>Espécie:</strong> {pet.especie}</p>
            <p><strong>Idade:</strong> {pet.idade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
