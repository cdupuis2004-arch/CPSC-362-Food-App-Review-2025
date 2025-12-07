import { useState } from "react";
import RestaurantsGrid from "./components/RestaurantsGrid";
import SearchBar from "./components/SearchBar";
import MapView from "./components/MapView";
import "./App.css";

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

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
    <div className="app-container">
      {/* Floating search bar */}
      <SearchBar onQueryClick={setSelectedRestaurant}/>

      {/* Two-column layout: cards left, interactive map right */}
      <div className="content-split">
        <div className="left-pane">
          <RestaurantsGrid onSelect={(r) => setSelectedRestaurant(r)} writeReview={writeReview} />
        </div>
        <div className="right-pane">
          <MapView onMarkerClick={(r) => setSelectedRestaurant(r)} selectedRestaurant={selectedRestaurant} />
        </div>
      </div>
    </div>
  );
}

export default App;
