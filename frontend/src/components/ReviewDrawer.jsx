import { useState } from "react";

export default function ReviewDrawer({ restaurant, isOpen, onClose, writeReview }) {
  const [text, setText] = useState("");
  const MAX = 300;

  // optional: trim to MAX if someone pastes longer text
  const handleChange = (e) => {
    const v = e.target.value;
    if (v.length <= MAX) setText(v);
    else setText(v.slice(0, MAX));
  };

  const handleSubmit = () => {
    if (!text.trim()) return; // guard
    writeReview(text.trim());
    setText("");
  };

  return (
    <div className={`review-drawer ${isOpen ? "open" : ""}`} aria-hidden={!isOpen}>
      {restaurant ? (
        <>
          <button onClick={onClose}>Close</button>
          <h2>Write a Review for {restaurant.name}</h2>

          {/* Bigger textarea with maxLength enforced */}
          <textarea
            className="review-textarea"
            placeholder="Write your review here..."
            value={text}
            onChange={handleChange}
            maxLength={MAX}
            rows={8}                /* visible height - adjust as you like */
            style={{ width: "100%", resize: "vertical" }} /* optional inline sizing */
            aria-describedby="review-count"
          />

          <div id="review-count" style={{ marginTop: 8, color: "#666", fontSize: 12 }}>
            {text.length}/{MAX} characters
          </div>

          <br />
          <button
            onClick={handleSubmit}
            disabled={!text.trim()} /* disable when empty */
          >
            Submit Review
          </button>
        </>
      ) : (
        <div style={{ paddingTop: 8, color: "#666" }}>Select a restaurant to write a review.</div>
      )}
    </div>
  );
}