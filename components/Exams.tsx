import React, { useState } from 'react';
import Card from './common/Card';
import { mockExamPrep, mockExamQuestions } from '../constants';
import type { ExamQuestion } from '../types';

const ExamPractice: React.FC<{ examName: string; onBack: () => void; }> = ({ examName, onBack }) => {
    const questions = mockExamQuestions[examName] || [];
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);

    const question = questions[currentIndex];

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setShowAnswer(false);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setShowAnswer(false);
        }
    };

    if (!question) {
        return (
            <Card className="p-6 text-center">
                <p>No questions available for {examName}.</p>
                <button onClick={onBack} className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700">
                    Back to Exams
                </button>
            </Card>
        );
    }

    return (
        <Card className="p-6">
            <div className="flex justify-between items-center">
                 <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{examName} Practice</h2>
                 <button onClick={onBack} className="text-sm font-semibold text-indigo-600 hover:underline">Back</button>
            </div>
            <div className="mt-6 border-t border-slate-200 dark:border-slate-700 pt-6">
                <p className="text-sm text-slate-500">{`Question ${currentIndex + 1} of ${questions.length}`}</p>
                <h3 className="text-xl font-semibold my-4">{question.question}</h3>
                <div className="space-y-3">
                    {question.options.map((option, index) => {
                        const isCorrect = index === question.correctAnswer;
                        let optionClass = 'bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600';
                        if (showAnswer && isCorrect) {
                            optionClass = 'bg-green-500 text-white';
                        }
                         if (showAnswer && !isCorrect) {
                            optionClass = 'bg-slate-200 dark:bg-slate-800 opacity-70';
                        }

                        return <div key={index} className={`p-4 rounded-lg border border-slate-300 dark:border-slate-600 transition-colors duration-300 ${optionClass}`}>{option}</div>
                    })}
                </div>
                {showAnswer && (
                    <div className="mt-4 p-4 bg-indigo-50 dark:bg-indigo-900/50 rounded-lg">
                        <h4 className="font-bold text-indigo-800 dark:text-indigo-300">Explanation</h4>
                        <p className="text-indigo-700 dark:text-indigo-400 mt-1">{question.explanation}</p>
                    </div>
                )}
                <div className="mt-6 flex justify-between items-center">
                    <button onClick={handlePrev} disabled={currentIndex === 0} className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 disabled:opacity-50">Previous</button>
                    {!showAnswer && <button onClick={() => setShowAnswer(true)} className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition-colors">Show Answer</button>}
                    <button onClick={handleNext} disabled={currentIndex === questions.length - 1} className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500 disabled:opacity-50">Next</button>
                </div>
            </div>
        </Card>
    )
}

const Exams: React.FC = () => {
    const [selectedExam, setSelectedExam] = useState<string | null>(null);

    if (selectedExam) {
        return <ExamPractice examName={selectedExam} onBack={() => setSelectedExam(null)} />;
    }

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">Exam Preparation</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Mock tests and prep material for IELTS, UPSC, GRE, and more.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockExamPrep.map((exam) => (
                    <Card key={exam.name} className="p-6">
                        <div className="flex items-start">
                            <div className="text-3xl mr-4">{exam.icon}</div>
                            <div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-white">{exam.name}</h3>
                                <p className="text-slate-600 dark:text-slate-400 mt-1">{exam.description}</p>
                                <button
                                    onClick={() => setSelectedExam(exam.name)}
                                    disabled={!mockExamQuestions[exam.name]}
                                    className="mt-4 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {mockExamQuestions[exam.name] ? 'Explore Materials' : 'Coming Soon'}
                                </button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Exams;
