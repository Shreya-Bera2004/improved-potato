import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import initialUsers from '../data/usersData.json';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('registeredUsers')) || [];
    const allUsers = [...initialUsers, ...storedUsers];

    if (allUsers.some((u) => u.email === email.trim())) {
      setError('Email is already registered!');
      return;
    }

    const newUser = { id: Date.now(), name: name.trim(), email: email.trim(), password };
    localStorage.setItem('registeredUsers', JSON.stringify([...storedUsers, newUser]));
    navigate('/login');
  };

  return (
    <div className="card">
      <h2>Register</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (min 6 chars)"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}