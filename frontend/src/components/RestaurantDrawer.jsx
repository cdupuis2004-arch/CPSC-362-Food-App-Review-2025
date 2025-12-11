import ReviewDisplay from '../ReviewDisplay';
import { useEffect, useState, useRef } from 'react';
import './RestaurantDrawer.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function RestaurantDrawer({ restaurant, onClose, isDarkMode = true, user = null }) {
  const [allReviews, setAllReviews] = useState([]);
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);

  async function loadReviews() {
    try {
      console.log({API_URL});
      const url = `${API_URL}/api/reviews` + (restaurant ? `?store=${encodeURIComponent(restaurant.name)}` : '');
      const res = await fetch(url, { credentials: 'include' });
      const data = await res.json();
      // map to display fields: display_name (public), rating stars
      const parsed = data.map(r => ({
        _id: r._id,
        username: r.username,
        display_name: r.display_name || r.name || r.username,
        comment: r.comment,
        ratingNumber: r.rating,
        rating: '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating)
      }));
      // newest first
      setAllReviews(parsed);
    } catch (err) {
      console.error('Failed to load reviews for drawer', err);
      setAllReviews([]);
    }
  }

  useEffect(() => {
    if (restaurant) loadReviews();
    else setAllReviews([]);
  }, [restaurant]);

  // carousel logic: auto-advance index across up to 5 most recent reviews
  useEffect(() => {
    if (!allReviews || allReviews.length === 0) {
      setIndex(0);
      return;
    }
    setIndex(0);
    const id = setInterval(() => {
      setIndex(i => (i + 1) % Math.min(5, allReviews.length));
    }, 4000);
    return () => clearInterval(id);
  }, [allReviews]);

  // scroll track to active slide (center)
  useEffect(() => {
    if (!trackRef.current || allReviews.length === 0) return;
    const track = trackRef.current;
    const slides = Array.from(track.children || []);
    const active = slides[index];
    if (active) {
      const left = active.offsetLeft - Math.max(0, (track.clientWidth - active.clientWidth) / 2);
      try {
        track.scrollTo({ left, behavior: 'smooth' });
      } catch (e) {
        console.log(e)
        track.scrollLeft = left;
      }
    }
  }, [index, allReviews]);

  if (!restaurant) return null;

  // last 5 reviews for carousel: most recent first (allReviews is newest-first)
  const carouselItems = allReviews.slice(0, 5);

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
        <img alt={restaurant.name + " logo"} src={restaurant.icon} onError={(e) => e.target.style.display='none'} />
      </div>

      <div className="drawer-inner">
        <section className="drawer-section">
          <h2 style={{ fontSize: "32px", color: isDarkMode ? '#fff' : '#333' }}>{restaurant.name}</h2>

          <div className="reviews-carousel" style={{ marginBottom: 12 }}>
            {carouselItems.length === 0 ? (
              <div className="no-reviews" style={{ color: isDarkMode ? '#777' : '#999' }}>No reviews currently</div>
            ) : (
              <div className="carousel-track" ref={trackRef} style={{ display: 'flex', gap: 12, overflowX: 'auto', padding: '8px 4px' }}>
                {carouselItems.map((r) => (
                  <div key={r._id} className="carousel-slide" style={{
                    minWidth: 400,
                    maxWidth: 400,
                    padding: 12,
                    borderRadius: 8,
                    backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5',
                    color: isDarkMode ? 'white' : '#333',
                    boxShadow: isDarkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <h4 style={{ margin: '0 0 6px 0' }}>{r.display_name}</h4>
                    <div style={{ marginBottom: 8 }}>{r.rating}</div>
                    <p style={{ margin: 0 }}>{r.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Leave-review -- visible to logged-in users only */}
        {user ? (
          <section className="drawer-section">
            <h3 style={{ color: isDarkMode ? '#fff' : '#333' }}>Leave a Review</h3>
            <ReviewDisplay restaurant={restaurant} showHeader={false} showReviewForm={true}/>
          </section>
        ) : (
          <section className="drawer-section">
            <p style={{ color: isDarkMode ? '#aaa' : '#555' }}>Login to leave a review.</p>
            <ReviewDisplay restaurant={restaurant} showHeader={false} showReviewForm={false}/>
          </section>
        )}

        {/* Full list of all reviews */}
        {/*
        <section className="drawer-section">
          <h3 style={{ color: isDarkMode ? '#fff' : '#333' }}>All Reviews</h3>
          {allReviews.length === 0 ? (
            <p style={{ color: isDarkMode ? '#aaa' : '#555' }}>No reviews yet.</p>
          ) : (
            allReviews.map((r) => (
              <div key={r._id} style={{
                backgroundColor: isDarkMode ? '#2a2a2a' : '#f5f5f5',
                color: isDarkMode ? 'white' : '#333',
                padding: '12px',
                borderRadius: '8px',
                marginBottom: '8px',
              }}>
                <h4 style={{ margin: 0 }}>{r.display_name}</h4>
                <div style={{ marginBottom: 6 }}>{r.rating}</div>
                <p style={{ margin: 0 }}>{r.comment}</p>
              </div>
            ))
          )}
        </section>
        */}
      </div>
    </div>
  );
}
