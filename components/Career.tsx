import React, { useState } from 'react';
import { getCareerRoadmap } from '../services/geminiService';
import type { CareerRoadmap } from '../types';
import Card from './common/Card';

const Career: React.FC = () => {
    const [query, setQuery] = useState('');
    const [roadmap, setRoadmap] = useState<CareerRoadmap | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;

        setIsLoading(true);
        setError(null);
        setRoadmap(null);
        try {
            const generatedRoadmap = await getCareerRoadmap(query);
            setRoadmap(generatedRoadmap);
        } catch (err) {
            setError('Failed to generate roadmap. Please try again.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">Career & Skill Development</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Enter a career goal to generate a personalized, step-by-step roadmap.</p>
            </div>

            <Card className="p-4 sm:p-6">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col sm:flex-row gap-2">
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="e.g., 'AI Engineer' or 'UX Designer'"
                            className="w-full p-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full sm:w-auto bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Generating...
                                </>
                            ) : (
                                'Generate Roadmap'
                            )}
                        </button>
                    </div>
                </form>
            </Card>

            {error && <p className="text-red-500 text-center">{error}</p>}

            {roadmap && (
                <Card className="p-6 animate-fade-in-down">
                    <h3 className="text-2xl font-bold text-center mb-6 text-slate-800 dark:text-white">{roadmap.title}</h3>
                    <div className="relative pl-6 border-l-2 border-indigo-500">
                        {roadmap.steps.map((step, index) => (
                            <div key={index} className="mb-8 last:mb-0">
                                <div className="absolute -left-3.5 mt-1.5 w-6 h-6 bg-indigo-500 rounded-full border-4 border-white dark:border-slate-900 flex items-center justify-center">
                                    <span className="text-white text-xs font-bold">{index + 1}</span>
                                </div>
                                <h4 className="text-lg font-bold text-slate-800 dark:text-white">{step.title}</h4>
                                <p className="text-slate-600 dark:text-slate-400 mt-1">{step.description}</p>
                            </div>
                        ))}
                    </div>
                </Card>
            )}
        </div>
    );
};

export default Career;
