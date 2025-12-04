import {useEffect, useState} from "react";
import reviewData from './reviews.json'
import './ReviewDisplay.css'

function ReviewDisplay({ restaurant }) {

    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);

    function toStars(num) {
        return "★".repeat(num) + "☆".repeat(5 - num);
    }

    async function fetchReviews() {
        try {
            const response = await fetch('http://localhost:5000/api/reviews');
            const data = await response.json();
            
            console.log('Fetched reviews:', data);
            console.log('Current restaurant:', restaurant?.name);

            const parsed = data
                .filter(r => !restaurant || r.store === restaurant.name)
                .map(r => ({
                    name: r.name,
                    store: r.store,
                    comment: r.comment,
                    rating: toStars(r.rating)
                }));

            console.log('Filtered reviews:', parsed);
            setReviews(parsed);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    }

    async function submitReview(e) {
        e.preventDefault();
        
        if (!name || !comment) {
            alert('Please fill in all fields');
            return;
        }

        const newReview = {
            name,
            store: restaurant.name,
            comment,
            rating
        };

        try {
            const response = await fetch('http://localhost:5000/api/reviews', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newReview)
            });

            const result = await response.json();
            
            if (response.ok) {
                setName('');
                setComment('');
                setRating(5);
                await fetchReviews(); // Wait for reviews to refresh
                alert('Review submitted!');
            } else {
                console.error('Error submitting review:', result);
                alert('Failed to submit review: ' + (result.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Failed to submit review. Make sure the backend is running.');
        }
    }

    useEffect(() => {
        fetchReviews();
    }, [restaurant]);

    return (
        <div className="review-container-placer">
            {/* Restaurant Logo */}
            {restaurant && (
                <div className="restaurant-header">
                    <img 
                        src={`/${restaurant.name.toLowerCase().replace(/\s+/g, '')}.png`} 
                        alt={`${restaurant.name} logo`}
                        className="restaurant-logo"
                        onError={(e) => e.target.style.display = 'none'}
                    />
                    <h3>{restaurant.name}</h3>
                </div>
            )}
            
            <h3>Reviews</h3>
            
            {/* Add Review Form */}
            <form onSubmit={submitReview} className="review-form">
                <input 
                    type="text" 
                    placeholder="Your name" 
                    value={name} 
                    onChange={e => setName(e.target.value)}
                    required
                />
                <select value={rating} onChange={e => setRating(Number(e.target.value))}>
                    <option value={5}>★★★★★</option>
                    <option value={4}>★★★★☆</option>
                    <option value={3}>★★★☆☆</option>
                    <option value={2}>★★☆☆☆</option>
                    <option value={1}>★☆☆☆☆</option>
                </select>
                <textarea 
                    placeholder="Write your review..." 
                    value={comment} 
                    onChange={e => setComment(e.target.value)}
                    required
                />
                <button type="submit">Submit Review</button>
            </form>

            {/* Reviews List */}
            <div className="reviewContainer">
                <div className="reviewScroll">
                    {reviews.length === 0 ? (
                        <p style={{padding: '10px', textAlign: 'center'}}>No reviews yet. Be the first!</p>
                    ) : (
                        reviews.map((r, idx) => (
                            <div className="review" key={idx}>
                                <h4>{r.name}</h4>
                                <p>{r.comment}</p>
                                <span className="rating">{r.rating}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default ReviewDisplay;
