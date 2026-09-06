import { useNavigate } from "react-router-dom";
import quizData from "../data/quizData.json";

function ResultPage() {
  const navigate = useNavigate();

  const result = JSON.parse(
    localStorage.getItem("quizResult") || "null"
  );

  // If there is no result, go back to start page
  if (!result) {
    navigate("/start");
    return null;
  }

  const { score, total, answers } = result;

  const percentage = Math.round((score / total) * 100);

  const handleRestart = () => {
    localStorage.removeItem("quizResult");
    navigate("/quiz");
  };

  const handleHome = () => {
    localStorage.removeItem("quizResult");
    navigate("/start");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("quizResult");

    navigate("/login");
  };

  return (
    <div className="result-container">
      <div className="result-card">

        {/* Result Header */}
        <div className="result-header">
          <div className="result-icon">
            🏆
          </div>

          <h1>Quiz Completed!</h1>

          <p>Great job! Here is your result.</p>
        </div>

        {/* Score */}
        <div className="score-section">
          <div className="score-circle">
            <span className="score-number">
              {percentage}%
            </span>

            <span className="score-text">
              Score
            </span>
          </div>

          <h2>
            {score} / {total}
          </h2>

          <p>
            You answered {score} out of {total} questions correctly.
          </p>
        </div>

        {/* Result Stats */}
        <div className="result-stats">

          <div className="stat correct">
            <span>✓</span>

            <div>
              <strong>{score}</strong>
              <p>Correct</p>
            </div>
          </div>

          <div className="stat wrong">
            <span>✕</span>

            <div>
              <strong>{total - score}</strong>
              <p>Wrong</p>
            </div>
          </div>

        </div>

        {/* Answer Review */}
        <div className="answer-review">
          <h2>Answer Review</h2>

          {quizData.map((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.answer;

            return (
              <div
                className={`review-item ${
                  isCorrect ? "review-correct" : "review-wrong"
                }`}
                key={question.id}
              >
                <div className="review-question">
                  <strong>
                    {index + 1}. {question.question}
                  </strong>

                  <span>
                    {isCorrect ? "✓ Correct" : "✕ Wrong"}
                  </span>
                </div>

                <p>
                  <strong>Your answer:</strong>{" "}
                  {userAnswer || "Not answered"}
                </p>

                {!isCorrect && (
                  <p>
                    <strong>Correct answer:</strong>{" "}
                    {question.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Buttons */}
        <div className="result-buttons">

          <button
            className="restart-button"
            onClick={handleRestart}
          >
            🔄 Restart Quiz
          </button>

          <button
            className="home-button"
            onClick={handleHome}
          >
            🏠 Back to Home
          </button>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}

export default ResultPage;