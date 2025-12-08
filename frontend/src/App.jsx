import { useState } from "react";
import RestaurantsGrid from "./components/RestaurantsGrid";
import SearchBar from "./components/SearchBar";
import MapView from "./components/MapView";
import RestaurantDrawer from "./components/RestaurantDrawer";
import "./App.css";

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const writeReview = (restaurant, text) => {
    if (!text || !text.trim()) {
      alert("Please enter a review.");
      return;
    }
    // TODO: replace with API call to persist the review
    console.log("Submitting review for", restaurant, text);
    // optionally clear selection
    setSelectedRestaurant(null);
  };
  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Theme toggle button */}
      <button className="theme-toggle" onClick={toggleTheme} title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Floating search bar */}
      <SearchBar onQueryClick={setSelectedRestaurant}/>

      {/* Two-column layout: cards left, interactive map right */}
      <div className="content-split">
        <div className="left-pane">
          <RestaurantsGrid onSelect={(r) => setSelectedRestaurant(r)} />
        </div>
        <div className="right-pane">
          <MapView onMarkerClick={(r) => setSelectedRestaurant(r)} selectedRestaurant={selectedRestaurant} />
        </div>
      </div>

      {/* Drawer overlays the left column when a restaurant is selected */}
      <RestaurantDrawer restaurant={selectedRestaurant} onClose={() => setSelectedRestaurant(null)} />
    </div>
  );
}

export default App;
