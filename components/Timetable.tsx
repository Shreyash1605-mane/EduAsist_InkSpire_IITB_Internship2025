
import React, { useState } from 'react';
import { createTimetable } from '../services/geminiService';
import Card from './common/Card';

const Timetable: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [schedule, setSchedule] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        setSchedule('');
        const aiResponse = await createTimetable(prompt);
        setSchedule(aiResponse);
        setIsLoading(false);
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">Personalized Timetable Creator</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Describe your tasks and let AI create a schedule. E.g., "Tomorrow I need to study for 3 hours for a math exam, attend a 1-hour online class, and go for a run."</p>
            </div>

            <Card className="p-6">
                <form onSubmit={handleSubmit}>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe your day..."
                        className="w-full h-24 p-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        disabled={isLoading}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-4 w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-indigo-400 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? 'Generating...' : 'Create Schedule'}
                    </button>
                </form>
            </Card>

            {schedule && (
                <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Your Generated Schedule</h3>
                     <div className="prose prose-slate dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: schedule.replace(/\n/g, '<br />') }} />
                </Card>
            )}
        </div>
    );
};

export default Timetable;
