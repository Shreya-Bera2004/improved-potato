import { useNavigate } from 'react-router-dom';

export default function ResultPage({ activeTest, answers }) {
  const navigate = useNavigate();

  if (!activeTest) return <p>No test data available.</p>;

  const questions = activeTest.questions;
  const correctCount = questions.filter((q) => answers[q.id] === q.correctAnswer).length;

  return (
    <div className="card">
      <h2>Test Result: {activeTest.title}</h2>
      <p className="score-text">
        Score: <strong>{correctCount} / {questions.length}</strong>
      </p>

      <div className="summary">
        {questions.map((q) => {
          const userChoice = answers[q.id];
          const isCorrect = userChoice === q.correctAnswer;
          return (
            <div key={q.id} className={`result-item ${isCorrect ? 'correct' : 'wrong'}`}>
              <p><strong>Q: {q.question}</strong></p>
              <p>Your Answer: {userChoice || 'None'}</p>
              {!isCorrect && <p>Correct Answer: {q.correctAnswer}</p>}
            </div>
          );
        })}
      </div>

      <button onClick={() => navigate('/dashboard')}>Return to Dashboard</button>
    </div>
  );
}