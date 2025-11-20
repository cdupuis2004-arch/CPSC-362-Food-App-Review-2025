import {useState} from "react";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './ReviewDisplay.jsx'
import './App.css'
import ReviewDisplay from "./ReviewDisplay.jsx";

function App() {
    const [name, setName] = useState('')
    const [message, setMessage] = useState('')

    async function sendReview() {

        // Check if there's a name entered
        if (name.length === 0) {
            console.error("Name missing")
            alert("Please enter a valid name")
            return
        }
        // Check if there's a message entered
        if (message.length === 0) {
            console.error("Message missing")
            alert("Please enter a valid message")
            return
        }

        const review = {
            name: name,
            comment: message,
        };
        await fetch('http://localhost:5000/api/reviews', {
            method: 'POST',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(review)
        });

        setName("")
        setMessage("")
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
          <input className="name-input" placeholder="Enter your name.." value={name} onChange={e => setName(e.target.value)}/>
          <textarea className="message" placeholder="Write your review here." value={message} onChange={e => setMessage(e.target.value)}/>
          <button onClick={sendReview}>Add review</button>
      </div>
      <p className="read-the-docs">
        Enter your name and comment then hit "Add review" to leave a review.
      </p>
    </>
  )
}

export default App
