import { useNavigate } from "react-router-dom";

function StartPage() {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("loggedInUser") || "null"
  );

  const handleStartQuiz = () => {
    navigate("/quiz");
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    navigate("/login");
  };

  return (
    <div className="start-container">
      <div className="start-card">
        <h1>Welcome to Quiz App 🎯</h1>

        {user && (
          <p className="welcome-text">
            Hello, <strong>{user.name}</strong>!
          </p>
        )}

        <p className="description">
          Test your knowledge and see how much you know.
        </p>

        <div className="quiz-info">
          <div>
            <span>📝</span>
            <p>5 Questions</p>
          </div>

          <div>
            <span>⏱️</span>
            <p>Multiple Choice</p>
          </div>

          <div>
            <span>🏆</span>
            <p>Get Your Score</p>
          </div>
        </div>

        <button
          className="start-button"
          onClick={handleStartQuiz}
        >
          Start Quiz
        </button>

        <button
          className="logout-button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default StartPage;