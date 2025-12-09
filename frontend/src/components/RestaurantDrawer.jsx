import ReviewDisplay from '../ReviewDisplay';
import { useEffect, useState, useRef } from 'react';
import './RestaurantDrawer.css';

function ReviewsCarousel({ restaurant, isDarkMode = true }) {
  const [reviews, setReviews] = useState([]);
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch('http://localhost:5000/api/reviews');
        const data = await res.json();
        const parsed = data
          .filter(r => r.store === (restaurant?.name || ''))
          .map(r => ({ name: r.name, comment: r.comment, rating: '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating) }));
        // show most recent 5 (take last 5)
        const recent = parsed.slice(-5).reverse();
        if (mounted) setReviews(recent);
      } catch (e) {
        console.error('Failed to load reviews for carousel', e);
      }
    }
    if (restaurant) load();
    return () => { mounted = false; };
  }, [restaurant]);

  // Auto-advance slides every 4 seconds
  useEffect(() => {
    if (!reviews || reviews.length === 0) return;
    setIndex(0);
    const id = setInterval(() => {
      setIndex(i => (i + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(id);
  }, [reviews]);

  // Scroll horizontally to active slide when index changes (no vertical scrolling)
  useEffect(() => {
    if (!trackRef.current || reviews.length === 0) return;
    const track = trackRef.current;
    const slides = Array.from(track.children || []);
    const active = slides[index];
    if (active) {
      const left = active.offsetLeft - Math.max(0, (track.clientWidth - active.clientWidth) / 2);
      try {
        track.scrollTo({ left, behavior: 'smooth' });
      } catch (e) {
        // fallback to setting scrollLeft directly
        console.error('Failed to scroll reviews', e);
        track.scrollLeft = left;
      }
    }
  }, [index, reviews]);

  if (!restaurant) return null;

  return (
    <div className="reviews-carousel">
      {reviews.length === 0 ? (
        <div className="no-reviews" style={{ color: isDarkMode ? '#777' : '#999' }}>No reviews currently</div>
      ) : (
        <div className="carousel-track" ref={trackRef}>
          {reviews.map((r, idx) => (
            <div 
              className="carousel-slide" 
              key={idx}
              style={{
                backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5',
                color: isDarkMode ? 'white' : '#333',
                boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
              }}
            >
              <h4>{r.name}</h4>
              <div className="slide-rating">{r.rating}</div>
              <p>{r.comment}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function RestaurantDrawer({ restaurant, onClose, isDarkMode = true }) {
  return (
    <div 
      className={`restaurant-drawer ${restaurant ? "open" : ""}`}
      style={{
        backgroundColor: isDarkMode ? '#212125' : '#ffffff',
        color: isDarkMode ? '#fff' : '#333'
      }}
    >
      {restaurant && (
        <>
          {/* Banner stays fixed at the top */}
          <div className="close-btn-container" onClick={onClose}>
            <button 
              className="drawer-close" 
              onClick={onClose}
              style={{ color: isDarkMode ? '#fff' : '#333' }}
            >✕</button>
          </div>
          <div className="drawer-banner">
           <img src={restaurant.banner || '/placeholder.png'} alt={restaurant.name} onError={(e) => e.target.style.display='none'} />
          </div>

          <div className="restaurant-icon">
            <img alt={restaurant.name + " logo"} src={restaurant.icon} />
          </div>

          {/* Scrollable content below banner */}
          <div className="drawer-inner">
            {/* Recent reviews carousel */}
            <section className="drawer-section">
              <h2 style={{ fontSize: "32px", color: isDarkMode ? '#fff' : '#333' }}>{restaurant.name}</h2>
              <ReviewsCarousel restaurant={restaurant} isDarkMode={isDarkMode} />
            </section>

            {/* Review form */}
            <section className="drawer-section">
              <h3 style={{ color: isDarkMode ? '#fff' : '#333' }}>Leave a Review</h3>
              <ReviewDisplay restaurant={restaurant} showHeader={false} />
            </section>
          </div>
        </>
      )}
    </div>
  );
}

