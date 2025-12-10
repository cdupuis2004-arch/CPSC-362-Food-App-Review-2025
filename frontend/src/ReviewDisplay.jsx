import {useEffect, useState} from "react";
import './ReviewDisplay.css'

function ReviewDisplay({ restaurant, showHeader = true }) {

    const [reviews, setReviews] = useState([]);
    // removed name input - author comes from session/user
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [editingId, setEditingId] = useState(null);

    // store the currently-logged-in username to auto-fill/identify ownership for edit buttons
    const [currentUsername, setCurrentUsername] = useState(null);

    function toStars(num) {
        return "★".repeat(num) + "☆".repeat(5 - num);
    }

    async function fetchCurrentUser() {
        try {
            const res = await fetch('/api/me', { credentials: "include" });
            if (res.ok) {
                const data = await res.json();
                setCurrentUsername(data.username || null);
            }
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    }

    async function fetchReviews() {
        try {
            const response = await fetch('/api/reviews', {
                credentials: "include"
            });

            const data = await response.json();

            // Filter by restaurant if provided
            const parsed = data
                .filter(r => !restaurant || r.store === restaurant.name)
                .map(r => ({
                    _id: r._id,
                    username: r.username,   // author
                    store: r.store,
                    comment: r.comment,
                    ratingNumber: r.rating,
                    rating: toStars(r.rating)
                }));

            setReviews(parsed);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    }

    async function submitReview(e) {
        e.preventDefault();

        if (!comment) {
            alert('Please fill in all fields');
            return;
        }

        const payload = {
            store: restaurant.name,
            comment,
            rating
        };

        try {
            const url = editingId
                ? `/api/reviews/${editingId}`
                : '/api/reviews';
            const method = editingId ? 'PATCH' : 'POST';

            const response = await fetch(url, {
                method,
                credentials: "include",   // REQUIRED for Flask session auth
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const result = await response.json();

            if (response.ok) {
                setComment('');
                setRating(5);
                setEditingId(null);
                await fetchReviews(); // refresh reviews
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

    // Start editing a review (only allowed if current user is author)
    function startEdit(review) {
        if (!currentUsername) {
            alert('You must be logged in to edit a review.');
            return;
        }
        if (review.username !== currentUsername) {
            alert('You can only edit your own reviews.');
            return;
        }
        setEditingId(review._id);
        setComment(review.comment);
        setRating(review.ratingNumber || 5);
    }

    function cancelEdit() {
        setEditingId(null);
        setComment('');
        setRating(5);
    }

    useEffect(() => {
        fetchCurrentUser();
        fetchReviews();
        // re-fetch when restaurant changes
    }, [restaurant]);

    return (
        <div className="review-container-placer">
            {/* Restaurant Logo */}
            {showHeader && restaurant && (
                <div className="restaurant-header">
                    <img 
                        src={restaurant.icon}
                        alt={`${restaurant.name} logo`}
                        className="restaurant-logo"
                        onError={(e) => e.target.style.display = 'none'}
                    />
                    <h3>{restaurant.name}</h3>
                </div>
            )}

            {/* Add / Edit Review Form */}
            <form onSubmit={submitReview} className="review-form">
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
                                <h4>{r.username}</h4>
                                <p>{r.comment}</p>
                                <span className="rating">{r.rating}</span>
                                {/* show edit button only for author */}
                                {currentUsername === r.username && (
                                    <>
                                        <button className="edit-btn" type="button" onClick={() => startEdit(r)} title="Edit review">
                                            ✏️
                                        </button>
                                        <button className="delete-btn" type="button" onClick={async () => {
                                            if (!confirm('Delete this review?')) return;
                                            try {
                                                const res = await fetch(`/api/reviews/${r._id}`, {
                                                    method: 'DELETE',
                                                    credentials: 'include'
                                                });
                                                if (res.ok) {
                                                    await fetchReviews();
                                                } else {
                                                    const err = await res.json();
                                                    alert('Failed to delete: ' + (err.message || 'Unknown'));
                                                }
                                            } catch (err) {
                                                console.error('Error deleting review:', err);
                                                alert('Network error while deleting');
                                            }
                                        }}>🗑️</button>
                                    </>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default ReviewDisplay;
