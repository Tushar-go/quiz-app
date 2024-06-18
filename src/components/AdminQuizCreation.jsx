import React, { useState } from 'react';

function AdminQuizCreation({ setQuizzes, quizzes, setCurrentQuiz }) {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentOptions, setCurrentOptions] = useState(['', '', '', '']);
  const [correctOption, setCorrectOption] = useState(null);
  const [error, setError] = useState('');

  const addQuestion = () => {
    if (!currentQuestion || currentOptions.some(option => !option) || correctOption === null) {
      setError('Please fill out all fields and select the correct answer.');
      return;
    }
    setQuestions([...questions, { question: currentQuestion, options: currentOptions, correctOption }]);
    setCurrentQuestion('');
    setCurrentOptions(['', '', '', '']);
    setCorrectOption(null);
    setError('');
  };

  const createQuiz = () => {
    if (!title || questions.length === 0) {
      setError('Please provide a title and at least one question.');
      return;
    }
    const newQuiz = { title, questions };
    setQuizzes([...quizzes, newQuiz]);
    setCurrentQuiz(newQuiz);
    localStorage.setItem('currentQuiz', JSON.stringify(newQuiz));
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 shadow-md rounded animate-fade-in">
      <h1 className="text-3xl font-bold mb-4 text-center">Create a Quiz</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Quiz Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Question</label>
        <input
          type="text"
          value={currentQuestion}
          onChange={(e) => setCurrentQuestion(e.target.value)}
          className="mt-1 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-4">
        {currentOptions.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="radio"
              name="correctOption"
              checked={correctOption === index}
              onChange={() => setCorrectOption(index)}
              className="mr-2"
            />
            <input
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...currentOptions];
                newOptions[index] = e.target.value;
                setCurrentOptions(newOptions);
              }}
              className="mt-1 p-2 border rounded w-full"
            />
          </div>
        ))}
      </div>
      <button onClick={addQuestion} className="bg-blue-500 font-medium text-white py-2 px-4 rounded">
        Add Question
      </button>
      <button onClick={createQuiz} className="bg-green-500 font-medium text-white py-2 px-4 rounded ml-4">
        Create Quiz
      </button>
    </div>
  );
}

export default AdminQuizCreation;
