import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import L from "leaflet";

export default function MapView({ onMarkerClick }) {
  const restaurants = [
    {
      id: 1,
      name: "Panda Express",
      position: [33.881945090165964, -117.88762995880049],
      logo: "/pandaexpress.png",
      size: [50, 50]
    },
    {
      id: 2,
      name: "Starbucks",
      position: [33.881395090165964, -117.88762995880049],
      logo: "/starbucks.png",
      size: [50, 50]
    },
    {
      id: 3,
      name: "Carl's Jr.",
      position: [33.879395090165964, -117.88383995880049],
      logo: "/carls.png",
      size: [50, 50]
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
      zoom={16.5}
      zoomSnap={0}     // allow ANY decimals
      zoomDelta={0.5}  // optional: scroll changes in 0.5 steps
      zoomControl={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <TileLayer url="https://api.maptiler.com/maps/base-v4-dark/256/{z}/{x}/{y}.png?key=EONVu3wPN06Rzc03jRkO" />

      {restaurants.map(r => (
        <Marker
          key={r.id}
          position={r.position}
          icon={L.divIcon({
            html: `<img src="${r.logo}" class="map-icon" />`,
            className: `marker marker-${r.id}`,
            iconSize: r.size
          })}
          eventHandlers={{
            click: () => onMarkerClick(r)
          }}
        />
      ))}
    </MapContainer>
  );
}
