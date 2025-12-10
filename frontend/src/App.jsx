import { useEffect, useState } from "react";
import RestaurantsGrid from "./components/RestaurantsGrid";
import SearchBar from "./components/SearchBar";
import MapView from "./components/MapView";
import RestaurantDrawer from "./components/RestaurantDrawer";
import LoginDrawer from "./components/LoginDrawer";
import "./App.css";

function App() {
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null); // Tracks logged-in user

  // on mount, check /api/me to restore session (if any)
  useEffect(() => {
    fetch('/api/me', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.username) {
          setUser({ username: data.username, email: data.email });
        }
      })
      .catch(err => {
        console.error('Error fetching current user:', err);
      });
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = isDarkMode ? '#121212' : '#f5f5f5';
    document.body.style.color = isDarkMode ? '#fff' : '#333';
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = async () => {
    try {
      const res = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include'
      });
      if (res.ok) {
        setUser(null);
        alert('Logged out');
      } else {
        alert('Logout failed');
      }
    } catch (err) {
      console.error(err);
      alert('Network error while logging out');
    }
  };

  return (
    <div className={`app-container ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Theme toggle button */}
      <button className="theme-toggle" onClick={toggleTheme} title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>

      {/* Login / Logout button */}
      {!user ? (
        <button className="login-button" onClick={() => setLoginOpen(true)}>Login</button>
      ) : (
        <div style={{ display: 'inline-block', marginLeft: 10 }}>
          <span style={{ marginRight: 8 }}>Hi, {user.username}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}

      {/* Floating search bar */}
      <SearchBar onQueryClick={setSelectedRestaurant}/>

      {/* Two-column layout: cards left, interactive map right */}
      <div className="content-split">
        <div className="left-pane">
          <RestaurantsGrid isDarkMode={isDarkMode} onSelect={setSelectedRestaurant} />
        </div>
        <div className="right-pane">
          <MapView onMarkerClick={setSelectedRestaurant} selectedRestaurant={selectedRestaurant} />
        </div>
      </div>

      {/* Restaurant drawer */}
      <RestaurantDrawer
        isDarkMode={isDarkMode}
        restaurant={selectedRestaurant}
        onClose={() => setSelectedRestaurant(null)}
        user={user} // Pass logged-in user to control leave-review section
      />

      {/* Login drawer */}
      <LoginDrawer
        isDarkMode={isDarkMode}
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        setUser={setUser} // Set logged-in user after successful login
      />
    </div>
  );
}

export default App;
