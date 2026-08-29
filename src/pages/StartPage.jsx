import { useNavigate } from 'react-router-dom';

export default function StartPage({ user, onStartQuiz }) {
  const navigate = useNavigate();

  const handleStart = () => {
    onStartQuiz();
    navigate('/quiz');
  };

  return (
    <div className="card">
      <h2>Welcome, {user.email}!</h2>
      <p>Test your knowledge with our quick React quiz.</p>
      <button onClick={handleStart}>Start Quiz</button>
    </div>
  );
}