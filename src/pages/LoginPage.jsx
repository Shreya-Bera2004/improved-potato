import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import initialUsers from '../data/usersData.json';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const allUsers = [...initialUsers, ...storedUsers];

    const validUser = allUsers.find(
      (u) => u.email === email.trim() && u.password === password
    );

    if (validUser) {
      onLogin(validUser);
      navigate('/dashboard'); // <-- Direct user to /dashboard after setting state
    } else {
      setError('Invalid email or password!');
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>
  );
}