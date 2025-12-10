import { useState } from 'react';


export default function LoginDrawer({ open, onClose }) {
  const [isSignup, setIsSignup] = useState(false); // toggle between login and signup
  const [email, setEmail] = useState(''); // email state
  const [password, setPassword] = useState(''); // password state
  const [name, setName] = useState(''); // name state for signup

  if (!open) return null;

// handle signup form submission
  const handleSignup = (e) => {
    e.preventDefault();
    // To do - still needs to add backend API call for account creation
    console.log('Creating account:', { name, email, password });
    alert('Account created successfully!');
    setName('');
    setEmail('');
    setPassword('');
    setIsSignup(false);
  };

// handle login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    // To Do - still needs to add backend API call for login
    console.log('Logging in:', { email, password });
    alert('Logged in successfully!');
    setEmail('');
    setPassword('');
    onClose();
  };


  return (
    <div className="login-drawer-overlay" onClick={onClose}>
      <div className="login-drawer" onClick={(e) => e.stopPropagation()}>
        {!isSignup ? (
          // This is the updated login form 
          <>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input 
                type="email" placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input 
                type="password" placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Sign In</button>
            </form>
            <button onClick={() => setIsSignup(true)} style={{ marginTop: "10px", background: "#4CAF50", color: "#fff" }}>
              Create an Account
            </button>
            <button onClick={onClose} style={{ marginTop: "10px", background: "#bbb", color: "#222" }}>
              Cancel
            </button>
          </>
        ) : (
          // Updated signup form to include full name, email, and password.
          <>
            <h2>Create an Account</h2>
            <form onSubmit={handleSignup}>
              <input 
                type="text" 
                placeholder="Full Name" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">Create Account</button>
            </form>
            <button onClick={() => setIsSignup(false)} style={{ marginTop: "10px", background: "#2196F3", color: "#fff" }}>
              Back to Login
            </button>
            <button onClick={onClose} style={{ marginTop: "10px", background: "#bbb", color: "#222" }}>
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
}
