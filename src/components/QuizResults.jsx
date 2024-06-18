import React from 'react';

function QuizResults({ results, setReview }) {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded animate-fade-in">
      <h1 className="text-2xl font-bold mb-4">Quiz Results</h1>
      <p className="text-lg mb-4">You scored {results.score} out of {results.answers.length}</p>
      <button onClick={() => setReview(true)} className="bg-green-500 text-white py-2 px-4 rounded">
        Review Answers
      </button>
    </div>
  );
}

export default QuizResults;
