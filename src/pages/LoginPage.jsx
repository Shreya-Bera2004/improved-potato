import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usersData from "../data/usersData.json";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const savedUsers = JSON.parse(
      localStorage.getItem("users") || "null"
    ) || usersData;

    const user = savedUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user));

    navigate("/start");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Quiz App</h1>
        <p className="subtitle">Login to continue</p>

        <form onSubmit={handleLogin}>
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

          {error && <p className="error">{error}</p>}

          <button type="submit">Login</button>
        </form>

        <p className="bottom-text">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

        <div className="demo-login">
          <small>Demo Login</small>
          <p>Email: admin@gmail.com</p>
          <p>Password: 123456</p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;