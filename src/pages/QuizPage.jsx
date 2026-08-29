import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuizPage({ activeTest, onSelectAnswer, answers }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  if (!activeTest) return <p>No test selected.</p>;

  const questions = activeTest.questions;
  const currentQuestion = questions[currentIndex];
  const selectedOption = answers[currentQuestion.id];

  const handleOptionClick = (option) => {
    onSelectAnswer(currentQuestion.id, option);
  };

  return (
    <div className="quiz-layout">
      <aside className="sidebar">
        <h3>{activeTest.title}</h3>
        <p className="sidebar-subtitle">Questions</p>
        <div className="sidebar-grid">
          {questions.map((q, idx) => {
            const isAnswered = answers[q.id] !== undefined;
            const isCurrent = idx === currentIndex;
            return (
              <button
                key={q.id}
                className={`sidebar-btn ${isCurrent ? 'active' : ''} ${isAnswered ? 'answered' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
        <button className="review-nav-btn" onClick={() => navigate('/review')}>
          Review Answers
        </button>
      </aside>

      <main className="card quiz-card">
        <h3>Question {currentIndex + 1} of {questions.length}</h3>
        <p className="question-text">{currentQuestion.question}</p>
        
        <div className="options-container">
          {currentQuestion.options.map((option, idx) => (
            <button
              key={idx}
              className={`option-btn ${selectedOption === option ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="nav-buttons">
          <button onClick={() => setCurrentIndex(currentIndex - 1)} disabled={currentIndex === 0}>
            Previous
          </button>
          <button
            className="next-btn"
            onClick={() => {
              if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
              } else {
                navigate('/review');
              }
            }}
          >
            {currentIndex === questions.length - 1 ? 'Proceed to Review' : 'Next'}
          </button>
        </div>
      </main>
    </div>
  );
}