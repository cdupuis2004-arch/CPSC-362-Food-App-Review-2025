import { useState } from "react";
import MapView from "./components/MapView";
import SearchBar from "./components/SearchBar";
import RestaurantDrawer from "./components/RestaurantDrawer";
import "./App.css";

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  return (
    <div className="app-container">
      
      {/* Fullscreen map */}
      <MapView onMarkerClick={setSelectedRestaurant} />

      {/* Floating search bar */}
      <SearchBar />

      {/* Sliding drawer panel */}
      <RestaurantDrawer
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
      />

    </div>
  );
}

export default App;
