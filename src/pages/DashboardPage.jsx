import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import availableTests from '../data/quizData.json';

export default function DashboardPage({ user, testHistory, onStartTest }) {
  const [activeTab, setActiveTab] = useState('tests');
  const navigate = useNavigate();

  // Filter history for the logged-in user
  const userHistory = testHistory.filter((item) => item.userEmail === user.email);

  // Calculate total score percentage across all attempted tests
  const totalCorrect = userHistory.reduce((sum, item) => sum + item.score, 0);
  const totalPossible = userHistory.reduce((sum, item) => sum + item.total, 0);
  const overallPercentage = totalPossible > 0 
    ? ((totalCorrect / totalPossible) * 100).toFixed(1) 
    : 0;

  const handleLaunchTest = (test) => {
    onStartTest(test);
    navigate('/quiz');
  };

  return (
    <div className="dashboard">
      {/* Navigation Tabs */}
      <div className="tab-menu">
        <button
          className={`tab-btn ${activeTab === 'tests' ? 'active' : ''}`}
          onClick={() => setActiveTab('tests')}
        >
          Available Tests ({availableTests.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveTab('results')}
        >
          Test History ({userHistory.length})
        </button>
        <button
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          User Profile
        </button>
      </div>

      {/* Tab 1: Available Tests */}
      {activeTab === 'tests' && (
        <div className="tab-content">
          <h2>Available Quizzes</h2>
          <div className="test-grid">
            {availableTests.map((test) => (
              <div key={test.id} className="card test-card">
                <h3>{test.title}</h3>
                <p className="test-meta">
                  Questions: <strong>{test.questions.length}</strong>
                </p>
                <button onClick={() => handleLaunchTest(test)}>Start Test</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Test History */}
      {activeTab === 'results' && (
        <div className="tab-content">
          <h2>Completed Test Results</h2>
          {userHistory.length === 0 ? (
            <p className="no-data">No completed tests yet. Start a quiz to see your results!</p>
          ) : (
            <div className="history-list">
              {userHistory.map((record, index) => (
                <div key={index} className="card history-card">
                  <div>
                    <h4>{record.testTitle}</h4>
                    <p className="date-text">Taken on: {record.date}</p>
                  </div>
                  <div className="score-badge">
                    {record.score} / {record.total}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: User Profile */}
      {activeTab === 'profile' && (
        <div className="tab-content">
          <div className="card profile-card">
            <h2>User Profile</h2>
            <div className="profile-details">
              <p><strong>Name:</strong> {user.name || 'N/A'}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Total Tests Attempted:</strong> {userHistory.length}</p>
              <p>
                <strong>Combined Score:</strong>{' '}
                <span className="overall-score-badge">{overallPercentage}%</span>
                {totalPossible > 0 && (
                  <span className="score-subtext"> ({totalCorrect} / {totalPossible} total questions)</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
