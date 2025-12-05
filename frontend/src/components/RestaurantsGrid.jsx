import React, { useState, useRef, useEffect } from "react";

// Using the same restaurant data as MapView so we don't change other files.
const restaurants = [
  {
    id: 1,
    name: "Test Location",
    position: [33.8823, -117.8851],
    logo: "/taco.png",
    image: "/taco.png",
    avgRating: 4.2,
    info: "Test Location description"
  },
  {
    id: 2,
    name: "Panda Express",
    position: [33.881945090165964, -117.88762995880049],
    logo: "/panda.png",
    image: "/panda.png",
    avgRating: 3.8,
    info: "Fast Chinese food"
  },
  {
    id: 3,
    name: "Burger King",
    image: "/placeholder.png",
    avgRating: 4.0,
    info: "Burgers and fries"
  },
  {
    id: 4,
    name: "Starbucks 1",
    image: "/placeholder.png",
    avgRating: 4.4,
    info: "Coffee shop"
  },
  {
    id: 5,
    name: "Starbucks 2",
    image: "/placeholder.png",
    avgRating: 4.1,
    info: "Coffee shop"
  },
  {
    id: 6,
    name: "Starbucks 3",
    image: "/placeholder.png",
    avgRating: 3.9,
    info: "Coffee shop"
  }
  ,
  {
    id: 7,
    name: "Avanti Markets",
    image: "/placeholder.png",
    avgRating: 2,
    info: "placeholder"
  },
  {
    id: 8,
    name: "Baja Fresh Express",
    image: "/placeholder.png",
    avgRating: 2,
    info: "placeholder"
  },
  {
    id: 9,
    name: "Carl's Jr.",
    image: "/placeholder.png",
    avgRating: 2,
    info: "placeholder"
  },
  {
    id: 10,
    name: "Fresh Kitchen",
    image: "/placeholder.png",
    avgRating: 2,
    info: "placeholder"
  },
  {
    id: 11,
    name: "Hibachi-San",
    image: "/placeholder.png",
    avgRating: 2,
    info: "placeholder"
  },
  {
    id: 12,
    name: "Juice It Up",
    image: "/placeholder.png",
    avgRating: 2,
    info: "placeholder"
  },
  {
    id: 13,
    name: "Pieology",
    image: "/placeholder.png",
    avgRating: 2,
    info: "placeholder"
  },
  {
    id: 14,
    name: "The Brief Stop",
    image: "/placeholder.png",
    avgRating: 2,
    info: "placeholder"
  },
  {
    id: 15,
    name: "The Yum",
    image: "/placeholder.png",
    avgRating: 2,
    info: "placeholder"
  },
  {
    id: 16,
    name: "TOGO'S",
    image: "/placeholder.png",
    avgRating: 2,
    info: "placeholder"
  }
];

export default function RestaurantsGrid({ onSelect, writeReview }) {
  const [expandedId, setExpandedId] = useState(null);
  const [text, setText] = useState("");
  const MAX = 300;
  const textareaRef = useRef(null);

  useEffect(() => {
    if (expandedId && textareaRef.current) textareaRef.current.focus();
  }, [expandedId]);

  const submitReview = (r) => {
    if (!text.trim()) return;
    writeReview && writeReview(r, text.trim());
    setText("");
    setExpandedId(null);
  };

  return (
    <div className="restaurant-grid">
      {restaurants.map((r) => (
        <div key={r.id} className="restaurant-card">
          <div className="card-top" onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}>
            <img src={r.image || r.logo || "/placeholder.png"} alt={r.name} />
            <div className="rating-badge">{r.avgRating?.toFixed(1) || "—"}</div>
          </div>
          <div className="card-bottom">
            <h3 className="card-title">{r.name}</h3>
            <p className="card-info">{r.info}</p>

            <div className="card-actions">
              <button
                onClick={() => {
                  // toggle inline review panel for this card
                  setExpandedId(expandedId === r.id ? null : r.id);
                  onSelect && onSelect(r);
                }}
              >
                Leave a Review
              </button>
            </div>

            {expandedId === r.id && (
              <div className="card-dropdown">
                <div className="dropdown-content">
                  <h4>Write a review for {r.name}</h4>
                  <textarea
                    ref={textareaRef}
                    className="review-textarea"
                    placeholder="Write your review here..."
                    value={text}
                    onChange={(e) => setText(e.target.value.slice(0, MAX))}
                    maxLength={MAX}
                    rows={6}
                  />
                  <div style={{ fontSize: 12, color: '#666', marginTop: 6 }}>{text.length}/{MAX}</div>
                  <div style={{ marginTop: 8 }}>
                    <button onClick={() => submitReview(r)} disabled={!text.trim()}>Submit Review</button>
                    <button onClick={() => { setExpandedId(null); setText(''); }} style={{ marginLeft: 8 }}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
