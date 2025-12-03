import {useState} from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './ReviewDisplay.jsx'
import './App.css'
import ReviewDisplay from "./ReviewDisplay.jsx";

function App() {
    const [store, setStore] = useState('')
    const [name, setName] = useState('')
    const [comment, setComment] = useState('')
    const [rating, setRating] = useState('')

    async function sendReview() {
        // Sanity checks
        // Check if there's a name entered
        // Check if the store name is missing
        if (store.length === 0) {
            console.error("Store name missing")
            alert("Please enter a store name")
            return
        }
        if (name.length === 0) {
            console.error("Name missing")
            alert("Please enter a valid name")
            return
        }
        // Check if there's a comment entered
        if (comment.length === 0) {
            console.error("comment missing")
            alert("Please enter a valid comment")
            return
        }
        // Check if the rating is missing
        if (rating.length === 0) {
            console.error("Rating missing")
            alert("Please enter a valid rating")
            return
        }

        const review = {
            store: store,
            name: name,
            comment: comment,
            rating: rating
        };
        await fetch('http://localhost:5000/api/reviews', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(review)
        });

        // Set input fields to empty
        setStore("")
        setName("")
        setComment("")
        setRating("")
        alert("Review sent!")
    }

  return (
    <>
      <ReviewDisplay />
      <div>
        <a target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Review Tester</h1>

      <div className="card">
          <input className="name-input" placeholder="Enter store name.." value={store} onChange={e => setStore(e.target.value)}/>
          <input className="name-input" placeholder="Enter your name.." value={name} onChange={e => setName(e.target.value)}/>
          <textarea className="message" placeholder="Write your review here." value={comment} onChange={e => setComment(e.target.value)}/>
          <input className="name-input" placeholder="Enter rating 0 to 5.." value={rating} onChange={e => setRating(e.target.value)}/>

          <button onClick={sendReview}>Add review</button>
      </div>
      <p className="read-the-docs">
        Enter your name and comment then hit "Add review" to leave a review.
      </p>
    </>
  )
}

export default App
