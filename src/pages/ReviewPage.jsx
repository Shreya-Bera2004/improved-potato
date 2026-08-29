import { useNavigate } from 'react-router-dom';

export default function ReviewPage({ activeTest, answers, onFinalSubmit }) {
  const navigate = useNavigate();

  if (!activeTest) return <p>No active test.</p>;

  const questions = activeTest.questions;

  const handleSubmit = () => {
    onFinalSubmit();
    navigate('/result');
  };

  return (
    <div className="card">
      <h2>Review: {activeTest.title}</h2>
      <p>Verify your responses before final submission.</p>

      <div className="review-list">
        {questions.map((q, idx) => (
          <div key={q.id} className="review-item">
            <div>
              <strong>Q{idx + 1}: {q.question}</strong>
              <p className="selected-answer">
                Selected: {answers[q.id] ? <em>{answers[q.id]}</em> : <span className="unanswered">Not Answered</span>}
              </p>
            </div>
            <button className="edit-btn" onClick={() => navigate('/quiz')}>Edit</button>
          </div>
        ))}
      </div>

      <div className="review-actions">
        <button className="secondary-btn" onClick={() => navigate('/quiz')}>Back to Quiz</button>
        <button className="submit-btn" onClick={handleSubmit}>Submit Test</button>
      </div>
    </div>
  );
}