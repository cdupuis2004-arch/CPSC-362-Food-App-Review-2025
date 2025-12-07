import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import L from "leaflet";
import restaurants from "../data/restaurants.json";

export default function MapView({ onMarkerClick }) {
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
