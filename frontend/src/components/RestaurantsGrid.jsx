import React, { useState, useRef, useEffect } from "react";

// Using the same restaurant data as MapView so we don't change other files.
const restaurants = [
  
  /*
  {
    id: 1,
    name: "Test Location",
    position: [33.8823, -117.8851],
    image: "/taco.png",
    avgRating: 4.2,
    info: "Test Location description"
  },
  */
 // Place Holder restaurant removed for cleaner UI, commented out incase needed later.
  {
    id: 2,
    name: "Panda Express",
    image: "/panda.png",
    avgRating: 3.8,
    info: "Fast Chinese food"
  },
  {
    id: 3,
    name: "Carl's Jr.",
    image: "/CarlsJrBanner.png",
    avgRating: 4.0,
    info: "Burgers and fries"
  },
  {
    id: 4,
    name: "Starbucks 1",
    image: "/StarbucksBanner.png",
    avgRating: 4.4,
    info: "Coffee shop"
  },
  {
    id: 5,
    name: "Starbucks 2",
    image: "/StarbucksBanner.png",
    avgRating: 4.1,
    info: "Coffee shop"
  },
  {
    id: 6,
    name: "Starbucks 3",
    image: "/StarbucksBanner.png",
    avgRating: 3.9,
    info: "Coffee shop"
  }
  ,
  {
    id: 7,
    name: "Avanti Markets",
    image: "/AvantiBanner.png",
    avgRating: 2,
    info: "Shop, Scan, Go!"
  },
  {
    id: 8,
    name: "Baja Fresh Express",
    image: "/BajaBanner.png",
    avgRating: 2,
    info: "Fresh Tex-Mex burritos and tacos"
  },

  //id 9 was removed, replaced Burger King with Carl's Jr. (there is no BK on campus)  
  
  {
    id: 10,
    name: "Fresh Kitchen",
    image: "/placeholder.png", // could not find a decent image that didn't say FK
    avgRating: 2,
    info: "Custom healthy bowls"
  },
  {
    id: 11,
    name: "Hibachi-San",
    image: "/HibachiBanner.jpg",
    avgRating: 2,
    info: "Fast Japanese bowls and hibachi food"
  },
  {
    id: 12,
    name: "Juice It Up",
    image: "/placeholder.png", // low quaility images so far
    avgRating: 2,
    info: "Fresh smoothies, juices, and superfruit bowls"
  },
  {
    id: 13,
    name: "Pieology",
    image: "/PieologyBanner.jpg",
    avgRating: 2,
    info: "Custom-made personal pizzas to go"
  },
  {
    id: 14,
    name: "The Brief Stop",
    image: "/placeholder.png", // need to find suitable image
    avgRating: 2,
    info: "placeholder"
  },
  {
    id: 15,
    name: "The Yum",
    image: "/placeholder.png", // need to find suitable image
    avgRating: 2,
    info: "placeholder"
  },
  {
    id: 16,
    name: "TOGO'S",
    image: "/TOGOBanner.png",
    avgRating: 2,
    info: "Made0to-order sandwiches"
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
