import restaurants from "../data/restaurants.json";
import './RestaurantsGrid.css'

export default function RestaurantsGrid({ onSelect, isDarkMode = true }) {
  return (
    <div className="restaurant-grid">
      {restaurants.map((r) => (
        <div 
          key={r.id} 
          className="restaurant-card"
          style={{
            backgroundColor: isDarkMode ? '#2a2a2a' : '#ffffff',
            color: isDarkMode ? '#fff' : '#333',
            boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          <div className={`card-top ${r.id === 10 ? 'fresh-kitchen-image' : ''}`} onClick={() => onSelect && onSelect(r)}>
            <img src={r.banner || r.icon || "/placeholder.png"} alt={r.name} />
            <div className="rating-badge">{r.avgRating?.toFixed(1) || "—"}</div>
          </div>
          <div className="card-bottom">
            <h3 className="card-title" style={{ color: isDarkMode ? '#fff' : '#333' }}>{r.name}</h3>
            <p className="card-info" style={{ color: isDarkMode ? '#ffffff' : '#666' }}>{r.info}</p>
            {r.location && <p className="card-location" style={{ color: isDarkMode ? '#ccc' : '#999' }}>{r.location}</p>}

            <div className="card-actions">
              <button
                onClick={() => onSelect && onSelect(r)}
              >
                Leave a Review
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
