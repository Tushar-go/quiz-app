import React, { useState, useEffect } from 'react';
import AdminQuizCreation from './components/AdminQuizCreation';
import QuizTaking from './components/QuizTaking';
import QuizResults from './components/QuizResults';
import ReviewAnswers from './components/ReviewAnswers';

function App() {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(() => {
    const savedQuiz = JSON.parse(localStorage.getItem('currentQuiz'));
    return savedQuiz || null;
  });
  const [results, setResults] = useState(null);
  const [review, setReview] = useState(false);

  useEffect(() => {
    if (currentQuiz) {
      localStorage.setItem('currentQuiz', JSON.stringify(currentQuiz));
    } else {
      localStorage.removeItem('currentQuiz');
    }
  }, [currentQuiz]);

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setResults(null);
    setReview(false);
    localStorage.removeItem('currentQuiz');
  };

  return (
    <div className="min-h-screen bg-gray-500 p-4">
      {currentQuiz ? (
        review ? (
          <ReviewAnswers quiz={currentQuiz} results={results} resetQuiz={resetQuiz} />
        ) : results ? (
          <QuizResults results={results} setReview={setReview} />
        ) : (
          <QuizTaking quiz={currentQuiz} setResults={setResults} />
        )
      ) : (
        <AdminQuizCreation setQuizzes={setQuizzes} quizzes={quizzes} setCurrentQuiz={setCurrentQuiz} />
      )}
    </div>
  );
}

export default App;
