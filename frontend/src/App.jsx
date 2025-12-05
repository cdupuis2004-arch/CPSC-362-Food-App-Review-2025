import { useState } from "react";
import RestaurantsGrid from "./components/RestaurantsGrid";
import SearchBar from "./components/SearchBar";
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
      <SearchBar />

      {/* Restaurants grid with inline review UI */}
      <RestaurantsGrid onSelect={(r) => setSelectedRestaurant(r)} writeReview={writeReview} />
    </div>
  );
}

export default App;
