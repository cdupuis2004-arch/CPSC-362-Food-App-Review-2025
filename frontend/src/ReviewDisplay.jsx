import {useEffect, useState} from "react";
import useReviews from './hooks/useReviews.js';
import './ReviewDisplay.css';

function ReviewDisplay() {
    const reviews = useReviews();

    return (
        <div className="review-container-placer">
            <h2>Reviews</h2>
            <div className="reviewContainer">
                <div className="reviewScroll">
                    {reviews.map((r, idx) => (
                        <div className="review" key={idx}>
                            <h3>{r.name}</h3>
                            <p><a>{r.store}:</a><br />{r.comment}</p>
                            <h3>{r.rating}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ReviewDisplay;
