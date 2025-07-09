import React, { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, AlertTriangle, ArrowRight, ArrowLeft } from 'lucide-react';

const QuizInterface = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<{[key: number]: any}>({});
  const [timeRemaining, setTimeRemaining] = useState(1800); // 30 minutes
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const quiz = {
    title: "React Fundamentals Assessment",
    description: "Test your knowledge of React components, hooks, and state management",
    timeLimit: 1800, // 30 minutes
    passingScore: 70,
    questions: [
      {
        id: 1,
        type: "multiple_choice",
        question: "What is the correct way to create a functional component in React?",
        options: [
          "function MyComponent() { return <div>Hello</div>; }",
          "const MyComponent = () => { return <div>Hello</div>; }",
          "class MyComponent extends React.Component { render() { return <div>Hello</div>; } }",
          "Both A and B are correct"
        ],
        correctAnswer: 3,
        points: 10
      },
      {
        id: 2,
        type: "true_false",
        question: "React hooks can only be used in functional components.",
        options: ["True", "False"],
        correctAnswer: 0,
        points: 5
      },
      {
        id: 3,
        type: "multiple_choice",
        question: "Which hook is used for managing component state in functional components?",
        options: [
          "useEffect",
          "useState",
          "useContext",
          "useReducer"
        ],
        correctAnswer: 1,
        points: 10
      },
      {
        id: 4,
        type: "true_false",
        question: "The useEffect hook runs after every render by default.",
        options: ["True", "False"],
        correctAnswer: 0,
        points: 5
      },
      {
        id: 5,
        type: "multiple_choice",
        question: "What is the purpose of the dependency array in useEffect?",
        options: [
          "To specify which state variables the effect depends on",
          "To prevent the effect from running",
          "To make the effect run only once",
          "All of the above"
        ],
        correctAnswer: 3,
        points: 15
      }
    ]
  };

  // Timer effect
  useEffect(() => {
    if (timeRemaining > 0 && !isSubmitted) {
      const timer = setTimeout(() => {
        setTimeRemaining(timeRemaining - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeRemaining === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeRemaining, isSubmitted]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    setAnswers({
      ...answers,
      [questionIndex]: answerIndex
    });
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    setShowResults(true);
  };

  const calculateScore = () => {
    let totalPoints = 0;
    let earnedPoints = 0;

    quiz.questions.forEach((question, index) => {
      totalPoints += question.points;
      if (answers[index] === question.correctAnswer) {
        earnedPoints += question.points;
      }
    });

    return {
      earned: earnedPoints,
      total: totalPoints,
      percentage: Math.round((earnedPoints / totalPoints) * 100)
    };
  };

  const getAnsweredCount = () => {
    return Object.keys(answers).length;
  };

  const getTimeColor = () => {
    if (timeRemaining > 600) return 'text-green-600'; // > 10 minutes
    if (timeRemaining > 300) return 'text-yellow-600'; // > 5 minutes
    return 'text-red-600'; // < 5 minutes
  };

  if (showResults) {
    const score = calculateScore();
    const passed = score.percentage >= quiz.passingScore;

    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
              passed ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {passed ? (
                <CheckCircle className="h-10 w-10 text-green-600" />
              ) : (
                <XCircle className="h-10 w-10 text-red-600" />
              )}
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Quiz {passed ? 'Completed!' : 'Incomplete'}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-blue-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{score.percentage}%</div>
                <div className="text-blue-700 font-medium">Final Score</div>
              </div>
              <div className="bg-green-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{score.earned}/{score.total}</div>
                <div className="text-green-700 font-medium">Points Earned</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-6">
                <div className="text-3xl font-bold text-purple-600 mb-2">{quiz.passingScore}%</div>
                <div className="text-purple-700 font-medium">Passing Score</div>
              </div>
            </div>

            <div className="space-y-4">
              {quiz.questions.map((question, index) => {
                const userAnswer = answers[index];
                const isCorrect = userAnswer === question.correctAnswer;
                
                return (
                  <div key={question.id} className="text-left border border-gray-200 rounded-xl p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">
                        Question {index + 1}: {question.question}
                      </h3>
                      <div className={`flex items-center ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {isCorrect ? (
                          <CheckCircle className="h-5 w-5" />
                        ) : (
                          <XCircle className="h-5 w-5" />
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {question.options.map((option, optionIndex) => {
                        const isUserAnswer = userAnswer === optionIndex;
                        const isCorrectAnswer = question.correctAnswer === optionIndex;
                        
                        let className = "p-3 rounded-lg border ";
                        if (isCorrectAnswer) {
                          className += "bg-green-50 border-green-200 text-green-800";
                        } else if (isUserAnswer && !isCorrectAnswer) {
                          className += "bg-red-50 border-red-200 text-red-800";
                        } else {
                          className += "bg-gray-50 border-gray-200 text-gray-700";
                        }
                        
                        return (
                          <div key={optionIndex} className={className}>
                            {option}
                            {isCorrectAnswer && <span className="ml-2 text-green-600">✓ Correct</span>}
                            {isUserAnswer && !isCorrectAnswer && <span className="ml-2 text-red-600">✗ Your answer</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 space-x-4">
              <button className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold">
                Retake Quiz
              </button>
              <button className="bg-gray-600 text-white px-8 py-3 rounded-xl hover:bg-gray-700 transition-colors font-semibold">
                Continue Course
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
              <p className="text-gray-600">{quiz.description}</p>
            </div>
            <div className={`flex items-center text-xl font-bold ${getTimeColor()}`}>
              <Clock className="h-6 w-6 mr-2" />
              {formatTime(timeRemaining)}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Question {currentQuestion + 1} of {quiz.questions.length}</span>
              <span>{getAnsweredCount()} answered</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Navigation */}
          <div className="flex flex-wrap gap-2">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuestion(index)}
                className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                  index === currentQuestion
                    ? 'bg-blue-600 text-white'
                    : answers[index] !== undefined
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Question {currentQuestion + 1}
              </h2>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {currentQ.points} points
              </span>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed">{currentQ.question}</p>
          </div>

          {/* Answer Options */}
          <div className="space-y-3">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(currentQuestion, index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  answers[currentQuestion] === index
                    ? 'border-blue-500 bg-blue-50 text-blue-900'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                    answers[currentQuestion] === index
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[currentQuestion] === index && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <span className="text-lg">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="flex items-center px-6 py-3 bg-gray-600 text-white rounded-xl hover:bg-gray-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-semibold"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Previous
          </button>

          <div className="flex items-center space-x-4">
            {getAnsweredCount() < quiz.questions.length && (
              <div className="flex items-center text-yellow-600">
                <AlertTriangle className="h-5 w-5 mr-2" />
                <span className="text-sm">
                  {quiz.questions.length - getAnsweredCount()} questions remaining
                </span>
              </div>
            )}
          </div>

          {currentQuestion === quiz.questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="flex items-center px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-semibold"
            >
              Submit Quiz
              <CheckCircle className="h-5 w-5 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-semibold"
            >
              Next
              <ArrowRight className="h-5 w-5 ml-2" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizInterface;