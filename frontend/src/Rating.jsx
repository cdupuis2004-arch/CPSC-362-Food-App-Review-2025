import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import "./App.css";

const API_BASE = ""; // keep '' if using Vite proxy or same origin

function App() {
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  async function loadSummary() {
    try {
      const res = await fetch(`${API_BASE}/api/reviews/summary`);
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      setAverage(data.average || 0);
      setCount(data.count || 0);
    } catch (err) {
      console.error(err);
    }
  }

  async function submitRating(newRating) {
    try {
      setSaving(true);
      setMessage("Saving your rating...");
      const res = await fetch(`${API_BASE}/api/reviews/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating: newRating })
      });
      if (!res.ok) throw new Error("failed");
      const data = await res.json();
      setAverage(data.average || 0);
      setCount(data.count || 0);
      setMessage(`Thanks! You rated ${newRating}★`);
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <div className="App">
      <div className="rating-box">
        <div className="rating-score">{average.toFixed(1)}</div>

        <ReactStars
          count={5}
          value={average}        // initial average
          isHalf={true}
          size={30}
          activeColor="#ffd700"
          onChange={(newRating) => !saving && submitRating(newRating)}
        />

        <div className="rating-count">
          {count.toLocaleString()} ratings
        </div>

        <div className="rating-message">{message}</div>
      </div>
    </div>
  );
}

export default App;