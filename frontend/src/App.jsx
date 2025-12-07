import { useState } from "react";
import MapView from "./components/MapView";
import SearchBar from "./components/SearchBar";
import RestaurantDrawer from "./components/RestaurantDrawer";
import ReviewDrawer from "./components/ReviewDrawer";
import "./App.css";

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isReviewDrawerOpen, setIsReviewDrawerOpen] = useState(false);
  return (
    <div className="app-container">
      
      {/* Fullscreen map */}
      <MapView onMarkerClick={setSelectedRestaurant} />

      {/* Floating search bar */}
      <SearchBar onQueryClick={setSelectedRestaurant}/>

      {/* Sliding drawer panel */}
      <RestaurantDrawer
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        createReview={() => setIsReviewDrawerOpen(true)}
      />
   {isReviewDrawerOpen && (
  <ReviewDrawer
    restaurant={selectedRestaurant}
    isOpen={isReviewDrawerOpen}
    onClose={() => setIsReviewDrawerOpen(false)}
    writeReview={(text) => {
      if (!text || !text.trim()) {
        alert("Please enter a review.");
        return;
      }
      console.log("Submitting review for", selectedRestaurant, text);
      setIsReviewDrawerOpen(false);
      setSelectedRestaurant(null);
    }}
  />
)}
    </div>
  );
}

export default App;
