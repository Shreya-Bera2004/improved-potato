import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import usersData from "../data/usersData.json";

function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Get existing users
    const savedUsers =
      JSON.parse(localStorage.getItem("users") || "null") || usersData;

    // Check if email already exists
    const existingUser = savedUsers.find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      setError("Email already registered");
      return;
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
    };

    const updatedUsers = [...savedUsers, newUser];

    // Save users
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // Login automatically
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    navigate("/start");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="subtitle">Register to start the quiz</p>

        <form onSubmit={handleRegister}>
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

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Register</button>
        </form>

        <p className="bottom-text">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;