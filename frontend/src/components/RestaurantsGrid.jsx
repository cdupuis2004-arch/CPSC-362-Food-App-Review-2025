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
    image: "/PandaExpressBanner.png",
    avgRating: 3.8,
    info: "Fast Chinese food",
    location: "Titan Student Union food court"
  },
  {
    id: 3,
    name: "Carl's Jr.",
    image: "/CarlsJrBanner.png",
    avgRating: 4.0,
    info: "Burgers and fries",
    location: "Near Gordon Hall and Langsdorf Hall"
  },
  {
    id: 4,
    name: "Starbucks 1",
    image: "/StarbucksBanner.png",
    avgRating: 4.4,
    info: "Coffee shop",
    location: "Titan Student Union food court"
  },
  {
    id: 5,
    name: "Starbucks 2",
    image: "/StarbucksBanner.png",
    avgRating: 4.1,
    info: "Coffee shop",
    location: "Pollak Library"
  },
  {
    id: 6,
    name: "Starbucks 3",
    image: "/StarbucksBanner.png",
    avgRating: 3.9,
    info: "Coffee shop",
    location: "Mihaylo Hall"
  }
  ,
  {
    id: 7,
    name: "Avanti Markets",
    image: "/AvantiBanner.png",
    avgRating: 2,
    info: "Shop, Scan, Go!",
    location: "Nutwood Café"
  },
  {
    id: 8,
    name: "Baja Fresh Express",
    image: "/BajaBanner.png",
    avgRating: 2,
    info: "Fresh Tex-Mex burritos and tacos",
    location: "Titan Student Union food court"
  },

  //id 9 was removed, replaced Burger King with Carl's Jr. (there is no BK on campus)  
  
  {
    id: 10,
    name: "Fresh Kitchen",
    image: "/FreshKitchenBanner.png",
    avgRating: 2,
    info: "Custom healthy bowls",
    location: "Titan Student Union food court"
  },
  {
    id: 11,
    name: "Hibachi-San",
    image: "/HibachiBanner.jpg",
    avgRating: 2,
    info: "Fast Japanese bowls and hibachi food",
    location: "Titan Student Union food court"
  },
  {
    id: 12,
    name: "Juice It Up",
    image: "/JuiceItUpBanner.png",
    avgRating: 2,
    info: "Fresh smoothies, juices, and superfruit bowls",
    location: "Titan Student Union food court"
  },
  {
    id: 13,
    name: "Pieology",
    image: "/PieologyBanner.jpg",
    avgRating: 2,
    info: "Custom-made personal pizzas to go",
    location: "Titan Student Union food court"
  },
  {
    id: 14,
    name: "The Brief Stop",
    image: "/TheBriefStopBanner.png", 
    avgRating: 2,
    info: "Convenience Store",
    location: "Langsdorf Hall"
  },
  {
    id: 15,
    name: "The Yum",
    image: "/TheYumBanner.png", 
    avgRating: 2,
    info: "Convenience Store",
    location: "Titan Student Union"
  },
  {
    id: 16,
    name: "TOGO'S",
    image: "/TOGOBanner.png",
    avgRating: 2,
    info: "Made-to-order sandwiches",
    location: "Titan Student Union food court"
  },
  {
    id: 17,
    name: "Aloha Java",
    image: "/AlohaJavaBanner.png",
    avgRating: 4.2,
    info: "Relaxed cafe with Hawaiian-style coffee & light bites",
    location: "Near Humanities Building and University Hall"
  }
];

export default function RestaurantsGrid({ onSelect }) {
  return (
    <div className="restaurant-grid">
      {restaurants.map((r) => (
        <div key={r.id} className="restaurant-card">
          <div className={`card-top ${r.id === 10 ? 'fresh-kitchen-image' : ''}`} onClick={() => onSelect && onSelect(r)}>
            <img src={r.image || r.logo || "/placeholder.png"} alt={r.name} />
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
                View / Leave a Review
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
