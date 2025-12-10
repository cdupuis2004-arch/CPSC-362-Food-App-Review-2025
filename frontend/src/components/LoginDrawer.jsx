import { useState } from 'react';

export default function LoginDrawer({ open, onClose, setUser, isDarkMode = true }) {
  const [isSignup, setIsSignup] = useState(false);

  // username is required by backend (not "name")
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!open) return null;

  // ---------- handle signup ----------
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        credentials: 'include', // ensure cookies are set (when using proxy)
        headers: { 'Content-Type': 'application/json' },
        // backend requires username, email, password
        body: JSON.stringify({ username, email, password })
      });

      const data = await res.json();
      if (res.ok) {
        alert('Account created successfully!');
        setUser({ username: data.username, email: data.email }); // set logged-in user
        onClose();
      } else {
        alert(`Signup failed: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      alert('Error creating account.');
    }
  };

  // ---------- handle login ----------
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include', // include cookies for session auth
        headers: { 'Content-Type': 'application/json' },
        // backend requires username + password (NOT email)
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (res.ok) {
        setUser({ username: data.username, email: data.email }); // set logged-in user
        alert('Logged in successfully!');
        onClose();
      } else {
        alert(`Login failed: ${data.message}`);
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
            <button onClick={() => setIsSignup(true)} style={{ marginTop: "10px", background: "#4CAF50", color: "#fff" }}>
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
