import { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, onSnapshot } from "firebase/firestore";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Correção do ícone (Leaflet não carrega padrão no Vite)
import L from "leaflet";

const defaultIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

export default function Rastreamento() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "petsAbandonados"), (snap) => {
      const lista = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPets(lista);
    });

    return () => unsub();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Rastreamento dos Pets Abandonados</h1>

      <MapContainer
        center={[-3.888, -38.683]}
        zoom={12}
        style={{ height: "500px", width: "100%", marginTop: 20 }}
      >
        {/* Mapa */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Marcadores */}
        {pets.map((pet) =>
          pet.lat && pet.lng ? (
            <Marker
              key={pet.id}
              position={[pet.lat, pet.lng]}
              icon={defaultIcon}
            >
              <Popup>
                <b>{pet.nome}</b> <br />
                {pet.raca || "Raça não informada"} <br />
                Localização aproximada
              </Popup>
            </Marker>
          ) : null
        )}
      </MapContainer>
    </div>
  );
}
