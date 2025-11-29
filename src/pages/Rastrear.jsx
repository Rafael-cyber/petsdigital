import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function Rastrear() {
  const posicaoPet = [-3.8907, -38.6228]; // Exemplo

  return (
    <div style={{ padding: 20 }}>
      <h1>Rastrear Pet</h1>

      <MapContainer
        center={posicaoPet}
        zoom={14}
        style={{ height: "400px", width: "100%", marginTop: 20 }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <Marker position={posicaoPet}>
          <Popup>Seu pet está aqui!</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
