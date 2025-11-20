import { useEffect, useState } from "react";
import './ReviewDisplay.css'

function ReviewDisplay() {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        async function getReviews() {
            const response = await fetch('http://localhost:5000/api/reviews');
            const data = await response.json();

            const parsed = data.map(r => ({
                name: r.name,
                comment: r.comment
            }));

            setReviews(parsed);
        }

        getReviews();
    }, []); // empty array = run once on mount

    return (
        <div className="review-container-placer">
            <h2>Reviews</h2>

            <div className="reviewContainer">
                <div className="reviewScroll">
                    {reviews.map((r, idx) => (
                        <div className="review" key={idx}>
                            <h3>{r.name}</h3>
                            <p>{r.comment}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ReviewDisplay;
