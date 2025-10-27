import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User, signOut } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Import the auth instance

import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Resources from './components/Resources';
import Internships from './components/Internships';
import Quizzes from './components/Quizzes';
import Career from './components/Career';
import Profile from './components/Profile';
import AINavigator from './components/AINavigator';
import Timetable from './components/Timetable';
import Exams from './components/Exams';
import Languages from './components/Languages';
import Auth from './components/Auth';
import type { Page } from './types';

const App: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true); // Add loading state
    const [activePage, setActivePage] = useState<Page>('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('isDarkMode');
        if (savedTheme !== null) {
            return JSON.parse(savedTheme);
        }
        return window.matchMedia('(prefers-color-scheme: dark)').matches;
    });

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false); // Stop loading once we have the user status
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('isDarkMode', JSON.stringify(true));
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('isDarkMode', JSON.stringify(false));
        }
    }, [isDarkMode]);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            // The onAuthStateChanged listener will handle setting currentUser to null
            setActivePage('dashboard'); // Reset to dashboard on logout
        } catch (error) {
            console.error("Error signing out: ", error);
        }
    };


    const renderPage = () => {
        switch (activePage) {
            case 'dashboard': return <Dashboard setActivePage={setActivePage} user={currentUser} />;
            case 'resources': return <Resources user={currentUser} />;
            case 'internships': return <Internships user={currentUser} />;
            case 'quizzes': return <Quizzes />;
            case 'career': return <Career />;
            case 'profile': return <Profile user={currentUser} />;
            case 'navigator': return <AINavigator />;
            case 'timetable': return <Timetable />;
            case 'exams': return <Exams />;
            case 'languages': return <Languages />;
            default: return <Dashboard setActivePage={setActivePage} user={currentUser} />;
        }
    };
    
    // Show a loading indicator while checking for user authentication
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-slate-100 dark:bg-slate-900">
                <svg className="animate-spin h-8 w-8 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        );
    }


    if (!currentUser) {
        return <Auth />;
    }

    return (
        <div className="relative min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 font-sans md:flex">
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            <Sidebar 
                user={currentUser}
                activePage={activePage} 
                setActivePage={setActivePage} 
                isDarkMode={isDarkMode} 
                setIsDarkMode={setIsDarkMode} 
                onLogout={handleLogout}
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
            />
            <div className="flex-1 flex flex-col w-full md:w-auto">
                {/* Mobile Header */}
                <header className="md:hidden sticky top-0 bg-white dark:bg-slate-800 shadow-md z-10 flex items-center justify-between p-4">
                     <div className="flex items-center">
                        <span className="text-2xl mr-2">🎓</span>
                        <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">eduAssist</h1>
                    </div>
                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                        aria-label="Open menu"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </header>

                <main className="flex-1 p-6 sm:p-8 overflow-y-auto">
                    {renderPage()}
                </main>
            </div>
        </div>
    );
};

export default App;