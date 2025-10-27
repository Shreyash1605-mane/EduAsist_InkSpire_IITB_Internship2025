import React from 'react';
import Card from './common/Card';
import ProgressBar from './common/ProgressBar';
import { mockLanguages } from '../constants';

const Languages: React.FC = () => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">Foreign Language Learning</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Learn Japanese, Korean, and other languages tailored for native learners.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockLanguages.map((lang) => (
                    <Card key={lang.name} className="p-6">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <span className="text-4xl mr-4">{lang.icon}</span>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800 dark:text-white">{lang.name}</h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{lang.level}</p>
                                </div>
                            </div>
                            <button className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-4">
                            <div className="flex justify-between text-sm mb-1 text-slate-500 dark:text-slate-400">
                                <span>Progress</span>
                                <span>{lang.progress}%</span>
                            </div>
                            <ProgressBar progress={lang.progress} />
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default Languages;
