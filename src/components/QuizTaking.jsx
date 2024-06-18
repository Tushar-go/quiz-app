import React, { useState, useEffect } from 'react';

function QuizTaking({ quiz, setResults }) {
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = JSON.parse(localStorage.getItem(`quiz-${quiz.title}-answers`));
    return savedAnswers || Array(quiz.questions.length).fill(null);
  });
  const [error, setError] = useState('');

  useEffect(() => {
    localStorage.setItem(`quiz-${quiz.title}-answers`, JSON.stringify(answers));
  }, [answers]);

  useEffect(() => {
    localStorage.setItem(`quiz-${quiz.title}-questions`, JSON.stringify(quiz.questions));
  }, [quiz.questions]);

  const handleSubmit = () => {
    if (answers.some(answer => answer === null)) {
      setError('Please answer all questions before submitting.');
      return;
    }
    let score = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctOption) {
        score += 1;
      }
    });
    setResults({ score, answers });
    localStorage.removeItem(`quiz-${quiz.title}-answers`);
    localStorage.removeItem(`quiz-${quiz.title}-questions`);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded animate-fade-in">
      <h1 className="text-2xl font-bold mb-4">{quiz.title}</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {quiz.questions.map((question, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-xl mb-2 font-medium">Q{index + 1} - {question.question}</h2>
          {question.options.map((option, optionIndex) => (
            <div key={optionIndex} className="flex items-center mb-2">
              <input
                type="radio"
                name={`question-${index}`}
                checked={answers[index] === optionIndex}
                onChange={() => {
                  const newAnswers = [...answers];
                  newAnswers[index] = optionIndex;
                  setAnswers(newAnswers);
                }}
                className="mr-2"
              />
              <label>{option}</label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit} className="bg-blue-500 text-white py-2 px-4 rounded">
        Submit Quiz
      </button>
    </div>
  );
}

export default QuizTaking;
