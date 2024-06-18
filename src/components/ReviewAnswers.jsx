import React from 'react';

function ReviewAnswers({ quiz, results, resetQuiz }) {
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded animate-fade-in">
      <h1 className="text-3xl font-bold mb-4 text-center">Review Answers</h1>
      {quiz.questions.map((question, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-xl mb-2 font-medium">Q{index + 1} - {question.question}</h2>
          {question.options.map((option, optionIndex) => {
            const isCorrectAnswer = question.correctOption === optionIndex;
            const isUserAnswer = results.answers[index] === optionIndex;
            const isIncorrectAnswer = isUserAnswer && !isCorrectAnswer;

            return (
              <div
                key={optionIndex}
                className={`flex items-center mb-2 p-1 rounded ${
                  isCorrectAnswer ? 'bg-green-200' : ''
                } ${isIncorrectAnswer ? 'bg-red-200' : ''}`}
              >
                <input type="radio" checked={isUserAnswer} readOnly className="mr-2" />
                <label>{option}</label>
              </div>
            );
          })}
        </div>
      ))}
      <button onClick={resetQuiz} className="bg-red-500 text-white py-2 px-4 rounded mt-4">
        Reset and Create New Quiz
      </button>
    </div>
  );
}

export default ReviewAnswers;
