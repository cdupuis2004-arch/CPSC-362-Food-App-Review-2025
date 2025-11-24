import {useState} from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ReviewDisplay from "./ReviewDisplay.jsx";
import Map from "./Map.jsx";

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
      <Map />
    </>
  )
}

export default App
