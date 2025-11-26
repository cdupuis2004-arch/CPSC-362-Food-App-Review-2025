import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function MapView(){
  const restaurants = [
    {
      id: 1,
      name: "Taco Palace",
      position: [33.8823, 117.8851],
      logo: "/taco.png" // Place taco.png in the public folder
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
            click: () => onRestaurantSelect(r)
          }}
        />
      ))}
    </MapContainer>
  );
}
