import {useEffect, useState} from "react";
import './ReviewDisplay.css'

function ReviewDisplay({ restaurant, showHeader = true }) {

    const [reviews, setReviews] = useState([]);
    const [name, setName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [editingId, setEditingId] = useState(null);

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
                    _id: r._id,
                    name: r.name,
                    logo: r.logo,
                    store: r.store,
                    comment: r.comment,
                    ratingNumber: r.rating,
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

        const payload = {
            name,
            store: restaurant.name,
            comment,
            rating
        };

        try {
            const url = editingId
                ? `http://localhost:5000/api/reviews/${editingId}`
                : 'http://localhost:5000/api/reviews';
            const method = editingId ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const result = await response.json();
            
            if (response.ok) {
                setName('');
                setComment('');
                setRating(5);
                setEditingId(null);
                await fetchReviews(); // Wait for reviews to refresh
                alert(editingId ? 'Review updated!' : 'Review submitted!');
            } else {
                console.error('Error submitting review:', result);
                alert('Failed: ' + (result.message || 'Unknown error'));
            }
        } catch (error) {
            console.error('Network error:', error);
            alert('Failed to submit review. Make sure the backend is running.');
        }
    }

    function startEdit(review) {
        setEditingId(review._id);
        setName(review.name);
        setComment(review.comment);
        setRating(review.ratingNumber || 5);
    }

    function cancelEdit() {
        setEditingId(null);
        setName('');
        setComment('');
        setRating(5);
    }



    useEffect(() => {
        fetchReviews();
    }, [restaurant]);

    return (
        <div className="review-container-placer">
            {/* Restaurant Logo */}
                    {showHeader && restaurant && (
                        <div className="restaurant-header">
                            <img 
                                src={restaurant.logo}
                                alt={`${restaurant.name} logo`}
                                className="restaurant-logo"
                                onError={(e) => e.target.style.display = 'none'}
                            />
                            <h3>{restaurant.name}</h3>
                        </div>
                    )}
            
            
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
                <div className="form-actions">
                    {editingId && (
                        <button type="button" className="secondary" onClick={cancelEdit}>
                            Cancel
                        </button>
                    )}
                    <button type="submit">
                        {editingId ? 'Save Changes' : 'Submit Review'}
                    </button>
                </div>
            </form>

            {/* Reviews List */}
            <div className="reviewContainer">
                <div className="reviewScroll">
                    {reviews.length === 0 ? (
                        <p style={{padding: '10px', textAlign: 'center'}}>No reviews yet. Be the first!</p>
                    ) : (
                        reviews.map((r) => (
                            <div className="review" key={r._id}>
                                <h4>{r.name}</h4>
                                <p>{r.comment}</p>
                                <span className="rating">{r.rating}</span>
                                <button className="edit-btn" type="button" onClick={() => startEdit(r)} title="Edit review">
                                    ✏️
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default ReviewDisplay;
