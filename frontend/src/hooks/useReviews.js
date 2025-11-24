import { useState, useEffect } from "react";

function useReviews() {
    const [reviews, setReviews] = useState([]);

    function toStars(num) {
        return "★".repeat(num) + "☆".repeat(5 - num);
    }

    async function getReviews() {
        const response = await fetch('http://localhost:5000/api/reviews');
        const data = await response.json();

        const parsed = data.map(r => ({
            name: r.name,
            store: r.store,
            comment: r.comment,
            rating: toStars(r.rating)
        }));

        setReviews(parsed);
    }
    return reviews;
}

export default useReviews;