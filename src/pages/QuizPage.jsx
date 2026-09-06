import { useState } from "react";
import { useNavigate } from "react-router-dom";
import quizData from "../data/quizData.json";

function QuizPage() {
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const question = quizData[currentQuestion];

  const handleAnswer = (answer) => {
    const updatedAnswers = [...selectedAnswers];

    updatedAnswers[currentQuestion] = answer;

    setSelectedAnswers(updatedAnswers);
  };

  const handleNext = () => {
    if (!selectedAnswers[currentQuestion]) {
      alert("Please select an answer first.");
      return;
    }

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateResult = () => {
    let score = 0;

    quizData.forEach((question, index) => {
      if (selectedAnswers[index] === question.answer) {
        score++;
      }
    });

    localStorage.setItem(
      "quizResult",
      JSON.stringify({
        score,
        total: quizData.length,
        answers: selectedAnswers,
      })
    );

    navigate("/result");
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">

        {/* Header */}
        <div className="quiz-header">
          <h1>Quiz App</h1>

          <span>
            Question {currentQuestion + 1} / {quizData.length}
          </span>
        </div>

        {/* Progress */}
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{
              width: `${
                ((currentQuestion + 1) / quizData.length) * 100
              }%`,
            }}
          ></div>
        </div>

        {/* Question */}
        <div className="question-section">
          <h2>{question.question}</h2>

          <div className="options-container">
            {question.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${
                  selectedAnswers[currentQuestion] === option
                    ? "selected"
                    : ""
                }`}
                onClick={() => handleAnswer(option)}
              >
                <span className="option-number">
                  {String.fromCharCode(65 + index)}
                </span>

                <span>{option}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="quiz-navigation">

          <button
            className="previous-button"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            ← Previous
          </button>

          <button
            className="next-button"
            onClick={handleNext}
          >
            {currentQuestion === quizData.length - 1
              ? "Finish Quiz"
              : "Next →"}
          </button>

        </div>

      </div>
    </div>
  );
}

export default QuizPage;