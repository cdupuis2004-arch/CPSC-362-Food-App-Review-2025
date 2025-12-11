import { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function LoginDrawer({ open, onClose, setUser, isDarkMode = true }) {
  const [isSignup, setIsSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!open) return null;

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/signup`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setUser({ username: data.username, email: data.email });
        alert('Account created and logged in!');
        setUsername('');
        setEmail('');
        setPassword('');
        onClose();
      } else {
        alert('Signup failed: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('Error creating account.');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok) {
        setUser({ username: data.username, email: data.email });
        alert('Logged in successfully!');
        setUsername('');
        setPassword('');
        onClose();
      } else {
        alert('Login failed: ' + (data.message || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('Error logging in.');
    }
  };

  return (
    <div className="login-drawer-overlay" onClick={onClose}>
      <div
        className="login-drawer"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: isDarkMode ? '#212125' : '#fff',
          color: isDarkMode ? '#fff' : '#333'
        }}
      >
        {!isSignup ? (
          <>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
                  color: isDarkMode ? '#fff' : '#000',
                  borderColor: isDarkMode ? '#444' : '#ccc'
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
                  color: isDarkMode ? '#fff' : '#000',
                  borderColor: isDarkMode ? '#444' : '#ccc'
                }}
              />
              <button type="submit">Sign In</button>
            </form>

            <button onClick={() => { setIsSignup(true); setPassword(''); }} style={{ marginTop: "10px", background: "#4CAF50", color: "#fff" }}>
              Create an Account
            </button>
            <button onClick={onClose} style={{ marginTop: "10px", background: "#bbb", color: "#222" }}>
              Cancel
            </button>
          </>
        ) : (
          <>
            <h2>Create an Account</h2>
            <form onSubmit={handleSignup}>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{
                  backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
                  color: isDarkMode ? '#fff' : '#000',
                  borderColor: isDarkMode ? '#444' : '#ccc'
                }}
              />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
                  color: isDarkMode ? '#fff' : '#000',
                  borderColor: isDarkMode ? '#444' : '#ccc'
                }}
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  backgroundColor: isDarkMode ? '#2a2a2a' : '#fff',
                  color: isDarkMode ? '#fff' : '#000',
                  borderColor: isDarkMode ? '#444' : '#ccc'
                }}
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
