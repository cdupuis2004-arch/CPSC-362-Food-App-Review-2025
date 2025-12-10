import {useEffect, useState} from "react";
import './ReviewDisplay.css'

function ReviewDisplay({ restaurant, showHeader = true }) {
    const [reviews, setReviews] = useState([]);
    const [displayName, setDisplayName] = useState(''); // public display name per review
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [editingId, setEditingId] = useState(null);
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
            } else {
                setCurrentUsername(null);
            }
        } catch (err) {
            console.error('Error fetching current user:', err);
            setCurrentUsername(null);
        }
    }

    async function fetchReviews() {
        try {
            const url = '/api/reviews' + (restaurant ? `?store=${encodeURIComponent(restaurant.name)}` : '');
            const response = await fetch(url, { credentials: "include" });
            const data = await response.json();
            const parsed = data.map(r => ({
                _id: r._id,
                username: r.username,
                display_name: r.display_name || r.name || r.username,
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

    useEffect(() => {
        fetchCurrentUser();
        fetchReviews();
        // refresh when restaurant changes
    }, [restaurant]);

    async function submitReview(e) {
        e.preventDefault();

        if (!displayName || !comment) {
            alert('Please provide a display name and comment');
            return;
        }

        const payload = {
            display_name: displayName,
            store: restaurant.name,
            comment,
            rating
        };

        try {
            const url = editingId ? `/api/reviews/${editingId}` : '/api/reviews';
            const method = editingId ? 'PATCH' : 'POST';
            const res = await fetch(url, {
                method,
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });
            const result = await res.json();
            if (res.ok) {
                setDisplayName('');
                setComment('');
                setRating(5);
                setEditingId(null);
                await fetchReviews();
                alert(editingId ? 'Review updated!' : 'Review submitted!');
            } else {
                alert('Failed: ' + (result.message || JSON.stringify(result)));
            }
        } catch (err) {
            console.error('Network error:', err);
            alert('Failed to submit review. Make sure backend is running.');
        }
    }

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
        setDisplayName(review.display_name || '');
        setComment(review.comment || '');
        setRating(review.ratingNumber || 5);
    }

    async function deleteReview(id) {
        if (!window.confirm('Delete this review?')) return;
        try {
            const res = await fetch(`/api/reviews/${id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (res.ok) {
                await fetchReviews();
            } else {
                const data = await res.json();
                alert('Failed to delete: ' + (data.message || JSON.stringify(data)));
            }
        } catch (err) {
            console.error('Error deleting review:', err);
            alert('Network error while deleting');
        }
    }

    function cancelEdit() {
        setEditingId(null);
        setDisplayName('');
        setComment('');
        setRating(5);
    }

    return (
        <div className="review-container-placer">
            {/* header */}
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

            {/* Add/Edit review form */}
            <form onSubmit={submitReview} className="review-form">
                <input
                    type="text"
                    placeholder="Your display name"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
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
                        <button type="button" className="secondary" onClick={cancelEdit}>Cancel</button>
                    )}
                    <button type="submit">{editingId ? 'Save Changes' : 'Submit Review'}</button>
                </div>
            </form>

            {/* Reviews list */}
            <div className="reviewContainer">
                <div className="reviewScroll">
                    {reviews.length === 0 ? (
                        <p style={{ padding: '10px', textAlign: 'center' }}>No reviews yet. Be the first!</p>
                    ) : (
                        reviews.map(r => (
                            <div className="review" key={r._id}>
                                <h4>{r.display_name}</h4>
                                <p>{r.comment}</p>
                                <span className="rating">{r.rating}</span>
                                {/* Buttons only for owner */}
                                {currentUsername === r.username && (
                                    <>
                                        <button className="edit-btn" type="button" onClick={() => startEdit(r)} title="Edit review">✏️</button>
                                        <button className="delete-btn" type="button" onClick={() => deleteReview(r._id)}>🗑️</button>
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
