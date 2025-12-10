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
        if (mounted) setReviews(parsed.reverse()); // keep all reviews for full list
      } catch (e) {
        console.error('Failed to load reviews for carousel', e);
      }
    }
    if (restaurant) load();
    return () => { mounted = false; };
  }, [restaurant]);

  useEffect(() => {
    if (!reviews || reviews.length === 0) return;
    setIndex(0);
    const id = setInterval(() => {
      setIndex(i => (i + 1) % Math.min(5, reviews.length)); // carousel shows last 5
    }, 4000);
    return () => clearInterval(id);
  }, [reviews]);

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
        track.scrollLeft = left;
      }
    }
  }, [index, reviews]);

  return reviews.slice(-5); // return last 5 for carousel display only
}

export default function RestaurantDrawer({ restaurant, onClose, isDarkMode = true, user = null }) {
  const [allReviews, setAllReviews] = useState([]);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const res = await fetch('http://localhost:5000/api/reviews');
        const data = await res.json();
        const parsed = data
          .filter(r => r.store === (restaurant?.name || ''))
          .map(r => ({ name: r.name, comment: r.comment, rating: '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating) }));
        if (mounted) setAllReviews(parsed.reverse()); // most recent first
      } catch (e) {
        console.error('Failed to load all reviews', e);
      }
    }
    if (restaurant) load();
    return () => { mounted = false; };
  }, [restaurant]);

  if (!restaurant) return null;

  return (
    <div 
      className={`restaurant-drawer ${restaurant ? "open" : ""}`}
      style={{
        backgroundColor: isDarkMode ? '#212125' : '#ffffff',
        color: isDarkMode ? '#fff' : '#333'
      }}
    >
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

      <div className="drawer-inner">
        <section className="drawer-section">
          <h2 style={{ fontSize: "32px", color: isDarkMode ? '#fff' : '#333' }}>{restaurant.name}</h2>
          {/* Carousel shows only last 5 reviews */}
          <div className="reviews-carousel">
            {allReviews.slice(0,5).length === 0 ? (
              <div className="no-reviews" style={{ color: isDarkMode ? '#777' : '#999' }}>No reviews currently</div>
            ) : (
              <div className="carousel-track">
                {allReviews.slice(0,5).map((r, idx) => (
                  <div key={idx} className="carousel-slide" style={{
                    backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5',
                    color: isDarkMode ? 'white' : '#333',
                    boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <h4>{r.name}</h4>
                    <div>{r.rating}</div>
                    <p>{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Conditional leave-review section (only for logged-in users) */}
        {user ? (
          <section className="drawer-section">
            <h3 style={{ color: isDarkMode ? '#fff' : '#333' }}>Leave a Review</h3>
            <ReviewDisplay restaurant={restaurant} showHeader={false} />
          </section>
        ) : (
          <section className="drawer-section">
            <p style={{ color: isDarkMode ? '#aaa' : '#555' }}>Login to leave a review.</p>
          </section>
        )}

        {/* Full list of all reviews */}
        <section className="drawer-section">
          <h3 style={{ color: isDarkMode ? '#fff' : '#333' }}>All Reviews</h3>
          {allReviews.length === 0 ? (
            <p style={{ color: isDarkMode ? '#aaa' : '#555' }}>No reviews yet.</p>
          ) : (
            allReviews.map((r, idx) => (
              <div key={idx} style={{
                backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5',
                color: isDarkMode ? 'white' : '#333',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '8px',
              }}>
                <h4>{r.name}</h4>
                <div>{r.rating}</div>
                <p>{r.comment}</p>
              </div>
            ))
          )}
        </section>
      </div>
    </div>
  );
}