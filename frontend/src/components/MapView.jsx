import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

export default function MapView({ onMarkerClick }) {
  const restaurants = [
    {
      id: 1,
      name: "Test Location",
      position: [33.8823, -117.8851],
      logo: "/taco.png"
    },
    {
      id: 2,
      name: "Panda Express",
      position: [33.881945090165964, -117.88762995880049],
      logo: "/pandaexpress.png"
    },
    
    
    // below are new locations, need to add logo and position
    
    /*
    {
      id: 3,
      name: "Burger King", 
    },
    {
    id: 4,
    name: "Starbucks 1"
    },
    {
    id: 5,
    name: "Starbucks 2"
    },
    {
    id: 6,
    name: "Starbucks 3"
    },
    {
    id: 7,
    name: "Avanti Markets"
    },
    {
    id: 8,
    name: "Baja Fresh Express"
    },
    {
    id: 9,
    name: "Carl's Jr."
    },
    {
    id: 10,
    name: "Fresh Kitchen"
    },
    {
    id: 11,
    name: "Hibachi-San"
    },
    {
    id: 12,
    name: "Juice It Up"
    },
    {
    id: 13,
    name: "Pieology"
    },
    {
    id: 14,
    name: "The Brief Stop"
    },
    {
    id: 15,
    name: "The Yum"
    },
    {
    id: 16,
    name: "TOGO'S"
    }, */
  ];

  return (
    <MapContainer
      center={[33.8823, -117.8851]}
      zoom={20}
      zoomControl={false}   // turn off the default zoom controls
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
