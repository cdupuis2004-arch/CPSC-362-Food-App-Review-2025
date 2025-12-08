import restaurants from "../data/restaurants.json";
import './RestaurantsGrid.css'

export default function RestaurantsGrid({ onSelect }) {
  return (
    <div className="restaurant-grid">
      {restaurants.map((r) => (
        <div key={r.id} className="restaurant-card">
          <div className={`card-top ${r.id === 10 ? 'fresh-kitchen-image' : ''}`} onClick={() => onSelect && onSelect(r)}>
            <img src={r.banner || r.icon || "/placeholder.png"} alt={r.name} />
            <div className="rating-badge">{r.avgRating?.toFixed(1) || "—"}</div>
          </div>
          <div className="card-bottom">
            <h3 className="card-title">{r.name}</h3>
            <p className="card-info">{r.info}</p>
            {r.location && <p className="card-location">{r.location}</p>}

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
