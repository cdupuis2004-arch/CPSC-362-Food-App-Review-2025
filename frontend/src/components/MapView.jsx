import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";
import L from "leaflet";
import restaurants from "../data/restaurants.json";

// This function will zoom into the map for the fast food restaurant when selected 
function MapController({ selectedRestaurant }) {
  const map = useMap();

  useEffect(() => {
    if (!selectedRestaurant || !selectedRestaurant.position) return;
    map.flyTo(selectedRestaurant.position, 18, { duration: 0.75 });
  }, [selectedRestaurant, map]);

  return null;
}

export default function MapView({ onMarkerClick, selectedRestaurant }) {
  return (
    <MapContainer
      center={[33.8823, -117.8851]}
      zoom={16.5}
      zoomSnap={0}     // allow ANY decimals
      zoomDelta={0.5}  // optional: scroll changes in 0.5 steps
      zoomControl={false}
      style={{ height: "100vh", width: "100%" }}
    >
      <MapController selectedRestaurant={selectedRestaurant} />
      <TileLayer url="https://api.maptiler.com/maps/base-v4-dark/256/{z}/{x}/{y}.png?key=EONVu3wPN06Rzc03jRkO" />

      {restaurants.map(r => (
        <Marker
          key={r.id}
          position={r.position}
          icon={L.divIcon({
            html: `<img alt={r.name + " logo"} src="${r.icon}" class="map-icon" />`,
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
