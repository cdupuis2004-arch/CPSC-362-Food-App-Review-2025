import {useEffect, useState} from "react";
import reviewData from './reviews.json'
import './ReviewDisplay.css'

function ReviewDisplay() {

    const [reviews, setReviews] = useState([]);

    function toStars(num) {
        return "★".repeat(num) + "☆".repeat(5 - num);
    }

    useEffect( () => {
        function GetReviews() {
            const data = reviewData

            const parsed = data.map(r => ({
                name: r.name,
                business: r.business,
                comment: r.comment,
                rating: toStars(r.rating)
            }));

            setReviews(parsed)
        }

        GetReviews()
    }, []);

    // ------ Uncomment to fetch backend ------
    /*  useEffect(() => {
        async function getReviews() {
            const response = await fetch('http://localhost:5000/api/reviews');
            const data = await response.json();

            const parsed = data.map(r => ({
                name: r.name,
                business: r.business,
                comment: r.comment,
                rating: toStars(r.rating)
            }));

            setReviews(parsed);
        }

        getReviews();
    }, []);*/

    return (
        <div className="review-container-placer">
            <h2>Reviews</h2>
            <div className="reviewContainer">
                <div className="reviewScroll">
                    {reviews.map((r, idx) => (
                        <div className="review" key={idx}>
                            <h3>{r.name}</h3>
                            <p><a>{r.business}:</a><br />{r.comment}</p>
                            <h3>{r.rating}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ReviewDisplay;
