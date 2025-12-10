export default function LoginDrawer({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="login-drawer-overlay" onClick={onClose}>
      <div className="login-drawer" onClick={(e) => e.stopPropagation()}>
        <h2>Login</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Sign In</button>
        <button>Create an Account</button>
        <button onClick={onClose} style={{ marginTop: "15px", background: "#bbb", color: "#222" }}>Cancel</button>
      </div>
    </div>
  );
}
