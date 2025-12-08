import ReviewDisplay from '../ReviewDisplay';
import { useEffect, useState, useRef } from 'react';
import './RestaurantDrawer.css';

function ReviewsCarousel({ restaurant }) {
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
        track.scrollLeft = left;
      }
    }
  }, [index, reviews]);

  if (!restaurant) return null;

  return (
    <div className="reviews-carousel">
      {reviews.length === 0 ? (
        <div className="no-reviews">No reviews currently</div>
      ) : (
        <div className="carousel-track" ref={trackRef}>
          {reviews.map((r, idx) => (
            <div className="carousel-slide" key={idx}>
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

export default function RestaurantDrawer({ restaurant, onClose }) {
  return (
    <div className={`restaurant-drawer ${restaurant ? "open" : ""}`}>
      {restaurant && (
        <>
          {/* Banner stays fixed at the top */}
          <div className="drawer-banner">
           <img src={restaurant.image || '/placeholder.png'} alt={restaurant.name} onError={(e) => e.target.style.display='none'} />
            <div className="drawer-title">
              <h2>{restaurant.name}</h2>
            </div>
          </div>

          {/* Scrollable content below banner */}
          <div className="drawer-inner">
            <button className="drawer-close" onClick={onClose}>✕</button>

            {/* Recent reviews carousel */}
            <section className="drawer-section">
              <h3>Recent Reviews</h3>
              <ReviewsCarousel restaurant={restaurant} />
            </section>

            {/* Review form */}
            <section className="drawer-section">
              <h3>Leave a Review</h3>
              <ReviewDisplay restaurant={restaurant} showHeader={false} />
            </section>
          </div>
        </>
      )}
    </div>
  );
}

