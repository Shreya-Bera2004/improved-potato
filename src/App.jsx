import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import QuizPage from './pages/QuizPage';
import ReviewPage from './pages/ReviewPage';
import ResultPage from './pages/ResultPage';
import ProtectedRoute from './ProtectedRoute';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTest, setActiveTest] = useState(null);
  const [answers, setAnswers] = useState({});
  const [testHistory, setTestHistory] = useState(() => {
    return JSON.parse(localStorage.getItem('quizHistory')) || [];
  });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('quizHistory', JSON.stringify(testHistory));
  }, [testHistory]);

  const handleLogout = () => {
    setUser(null);
    setActiveTest(null);
    setAnswers({});
    navigate('/login');
  };

  const handleStartTest = (test) => {
    setActiveTest(test);
    setAnswers({});
  };

  const handleSelectAnswer = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleFinalSubmit = () => {
    if (!activeTest || !user) return;

    const questions = activeTest.questions;
    const score = questions.filter((q) => answers[q.id] === q.correctAnswer).length;

    const record = {
      userEmail: user.email,
      testTitle: activeTest.title,
      score,
      total: questions.length,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setTestHistory((prev) => [record, ...prev]);
  };

  return (
    <div className="container">
      <header className="navbar">
        <h1 onClick={() => navigate(user ? '/dashboard' : '/login')} style={{ cursor: 'pointer' }}>
          QuizApp
        </h1>
        {user && (
          <div>
            <span>Welcome, <strong>{user.name || user.email}</strong></span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>

      <Routes>
        <Route path="/login" element={<LoginPage onLogin={setUser} />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={user}>
              <DashboardPage
                user={user}
                testHistory={testHistory}
                onStartTest={handleStartTest}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/quiz"
          element={
            <ProtectedRoute user={user}>
              <QuizPage
                activeTest={activeTest}
                onSelectAnswer={handleSelectAnswer}
                answers={answers}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/review"
          element={
            <ProtectedRoute user={user}>
              <ReviewPage
                activeTest={activeTest}
                answers={answers}
                onFinalSubmit={handleFinalSubmit}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRoute user={user}>
              <ResultPage activeTest={activeTest} answers={answers} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<LoginPage onLogin={setUser} />} />
      </Routes>
    </div>
  );
}