import React from 'react';
import { User } from 'firebase/auth';
import Card from './common/Card';
import ProgressBar from './common/ProgressBar';
import { Page } from '../types';
import { mockLanguages, mockInternships } from '../constants';

interface DashboardProps {
    setActivePage: (page: Page) => void;
    user: User | null;
}

const Dashboard: React.FC<DashboardProps> = ({ setActivePage, user }) => {
    
    const quickAccessItems = [
        { page: 'navigator', label: 'AI Navigator', icon: '✨', color: 'bg-purple-100 dark:bg-purple-900', textColor: 'text-purple-700 dark:text-purple-300' },
        { page: 'timetable', label: 'My Timetable', icon: '🗓️', color: 'bg-blue-100 dark:bg-blue-900', textColor: 'text-blue-700 dark:text-blue-300' },
        { page: 'resources', label: 'Find Resources', icon: '📚', color: 'bg-green-100 dark:bg-green-900', textColor: 'text-green-700 dark:text-green-300' },
        { page: 'quizzes', label: 'Practice Quizzes', icon: '✍️', color: 'bg-yellow-100 dark:bg-yellow-900', textColor: 'text-yellow-700 dark:text-yellow-300' },
    ];
    
    const displayName = user?.displayName?.split(' ')[0] || 'User';

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold mb-4 text-slate-700 dark:text-slate-200">Welcome back, {displayName}!</h2>
                <p className="text-slate-500 dark:text-slate-400">Here's a snapshot of your learning journey today.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickAccessItems.map(item => (
                    <Card key={item.page} className={`${item.color} p-6 flex flex-col items-center justify-center text-center`} onClick={() => setActivePage(item.page as Page)}>
                        <div className="text-4xl mb-3">{item.icon}</div>
                        <h3 className={`text-lg font-semibold ${item.textColor}`}>{item.label}</h3>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2 p-6">
                    <h3 className="text-xl font-semibold mb-4">Featured Micro-Internships</h3>
                    <div className="space-y-4">
                        {mockInternships.slice(0, 2).map(internship => (
                            <div key={internship.id} className="p-4 rounded-lg bg-slate-100 dark:bg-slate-700 flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-slate-800 dark:text-white">{internship.title}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{internship.company} - {internship.duration}</p>
                                </div>
                                <button onClick={() => setActivePage('internships')} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                                    View
                                </button>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Language Progress</h3>
                    <div className="space-y-4">
                        {mockLanguages.slice(0, 3).map(lang => (
                             <div key={lang.name}>
                                <div className="flex justify-between items-center mb-1">
                                    <p className="font-medium text-slate-800 dark:text-white">{lang.icon} {lang.name}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{lang.progress}%</p>
                                </div>
                                <ProgressBar progress={lang.progress} />
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
