
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card from './common/Card';
import { mockQuizzes } from '../constants';
import type { Quiz, QuizQuestion } from '../types';

const QuizTaker: React.FC<{ quiz: Quiz; onFinish: (score: number) => void }> = ({ quiz, onFinish }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);

    const handleAnswer = (optionIndex: number) => {
        const newAnswers = [...selectedAnswers];
        newAnswers[currentQuestionIndex] = optionIndex;
        setSelectedAnswers(newAnswers);

        setTimeout(() => {
            if (currentQuestionIndex < quiz.questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                calculateScore(newAnswers);
                setShowResult(true);
            }
        }, 500);
    };

    const calculateScore = (finalAnswers: number[]) => {
        let correctAnswers = 0;
        quiz.questions.forEach((q, index) => {
            if (q.correctAnswer === finalAnswers[index]) {
                correctAnswers++;
            }
        });
        const finalScore = (correctAnswers / quiz.questions.length) * 100;
        setScore(finalScore);
        onFinish(finalScore);
    };

    if (showResult) {
        return (
            <div className="text-center">
                <h3 className="text-2xl font-bold">Quiz Complete!</h3>
                <p className="text-4xl font-bold my-4">{Math.round(score)}%</p>
                <p>{`You answered ${Math.round(score/100 * quiz.questions.length)} out of ${quiz.questions.length} questions correctly.`}</p>
            </div>
        );
    }
    
    const question = quiz.questions[currentQuestionIndex];
    const selectedOption = selectedAnswers[currentQuestionIndex];

    return (
        <div>
            <p className="text-sm text-slate-500">{`Question ${currentQuestionIndex + 1} of ${quiz.questions.length}`}</p>
            <h3 className="text-xl font-semibold my-4">{question.question}</h3>
            <div className="space-y-3">
                {question.options.map((option, index) => {
                    const isSelected = selectedOption === index;
                    let buttonClass = 'bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600';
                    if (isSelected) {
                        buttonClass = question.correctAnswer === index ? 'bg-green-500 text-white' : 'bg-red-500 text-white';
                    }
                    return (
                        <button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            disabled={selectedOption !== undefined}
                            className={`w-full text-left p-4 rounded-lg border border-slate-300 dark:border-slate-600 transition-colors duration-300 ${buttonClass}`}
                        >
                            {option}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

const Quizzes: React.FC = () => {
    const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
    const [performanceData, setPerformanceData] = useState([
        { name: 'JS', score: 80 },
        { name: 'History', score: 65 },
        { name: 'Science', score: 92 },
        { name: 'Math', score: 75 },
    ]);

    const handleQuizFinish = (score: number) => {
        if(selectedQuiz) {
            // In a real app, you would update the specific quiz score
            console.log(`Finished ${selectedQuiz.title} with score: ${score}`);
        }
        setTimeout(() => setSelectedQuiz(null), 3000);
    };

  if(selectedQuiz) {
    return (
        <Card className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">{selectedQuiz.title}</h2>
            <QuizTaker quiz={selectedQuiz} onFinish={handleQuizFinish}/>
        </Card>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">Quizzes & Practice</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockQuizzes.map(quiz => (
            <Card key={quiz.id} className="p-6 flex justify-between items-center">
                <div>
                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">{quiz.title}</h3>
                    <p className="text-slate-500 dark:text-slate-400">{quiz.subject}</p>
                </div>
                <button onClick={() => setSelectedQuiz(quiz)} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">
                    Start
                </button>
            </Card>
        ))}
      </div>
       <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Performance Overview</h3>
            <div style={{ width: '100%', height: 300 }}>
                <ResponsiveContainer>
                    <BarChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="score" fill="#4f46e5" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </Card>
    </div>
  );
};

export default Quizzes;
