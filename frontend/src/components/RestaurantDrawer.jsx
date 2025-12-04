import ReviewDisplay from '../ReviewDisplay';

export default function RestaurantDrawer({ restaurant, onClose }) {
  return (
    <div className={`restaurant-drawer ${restaurant ? "open" : ""}`}>
      {restaurant && (
        <>
          <button onClick={onClose}>Close</button>
          <h2>{restaurant.name}</h2>
          <p>Additional restaurant info can go here.</p>
          
          {/* Review system displayed here */}
          <ReviewDisplay restaurant={restaurant} />
        </>
      )}
    </div>
  );
}
