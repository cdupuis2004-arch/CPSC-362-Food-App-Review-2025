import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function MapView({ onMarkerClick }) {
  const restaurants = [
    {
      id: 1,
      name: "Taco Palace",
      position: [33.8823, -117.8851],
      logo: "/taco.png"
    },
    {
      id: 2,
      name: "Panda Express",
      position: [33.881945090165964, -117.88762995880049],
      logo: "/panda.png"
    }
  ];

  return (
    <MapContainer
      center={[33.8823, -117.8851]}
      zoom={20}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {restaurants.map(r => (
        <Marker
          key={r.id}
          position={r.position}
          icon={L.icon({
            iconUrl: r.logo,
            iconSize: [40, 40],
            iconAnchor: [20, 40]
          })}
          eventHandlers={{
            click: () => onMarkerClick(r)
          }}
        />
      ))}
    </MapContainer>
  );
}
