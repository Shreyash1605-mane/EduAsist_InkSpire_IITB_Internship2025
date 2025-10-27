import React from 'react';
import { User } from 'firebase/auth';
import type { Page } from '../types';

interface SidebarProps {
    user: User | null;
    activePage: Page;
    setActivePage: (page: Page) => void;
    isDarkMode: boolean;
    setIsDarkMode: (isDark: boolean) => void;
    onLogout: () => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{
    page: Page;
    label: string;
    icon: string;
    isActive: boolean;
    onClick: (page: Page) => void;
}> = ({ page, label, icon, isActive, onClick }) => {
    return (
        <li
            onClick={() => onClick(page)}
            className={`flex items-center p-3 my-1 rounded-lg cursor-pointer transition-colors duration-200 ${
                isActive
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
        >
            <span className="text-xl mr-4 w-6 text-center">{icon}</span>
            <span className="font-medium">{label}</span>
        </li>
    );
};


const Sidebar: React.FC<SidebarProps> = ({ user, activePage, setActivePage, isDarkMode, setIsDarkMode, onLogout, isOpen, setIsOpen }) => {
    const navItems = [
        { page: 'dashboard', label: 'Dashboard', icon: '🏠' },
        { page: 'navigator', label: 'AI Navigator', icon: '✨' },
        { page: 'timetable', label: 'Timetable', icon: '🗓️' },
        { page: 'resources', label: 'Resources', icon: '📚' },
        { page: 'internships', label: 'Internships', icon: '🛠️' },
        { page: 'quizzes', label: 'Quizzes', icon: '✍️' },
        { page: 'exams', label: 'Exam Prep', icon: '🎓' },
        { page: 'career', label: 'Career Path', icon: '🗺️' },
        { page: 'languages', label: 'Languages', icon: '🌐' },
    ];
    
    const handleNavClick = (page: Page) => {
        setActivePage(page);
        setIsOpen(false);
    };
    
    const UserAvatar = () => (
      <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
        {user?.displayName ? user.displayName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
      </div>
    );

    return (
        <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-slate-800 flex flex-col p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 md:shadow-lg`}>
            <div className="flex items-center mb-8 shrink-0">
                <span className="text-2xl mr-2">🎓</span>
                <h1 className="text-xl font-bold text-indigo-600 dark:text-indigo-400">eduAssist</h1>
            </div>
            <nav className="flex-1">
                <ul>
                    {navItems.map(item => (
                        <NavItem
                            key={item.page}
                            page={item.page as Page}
                            label={item.label}
                            icon={item.icon}
                            isActive={activePage === item.page}
                            onClick={handleNavClick}
                        />
                    ))}
                </ul>
            </nav>
            <div className="mt-auto shrink-0">
                <div className="flex items-center justify-between mb-4">
                     <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Dark Mode</span>
                    <label htmlFor="theme-toggle" className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" id="theme-toggle" className="sr-only peer" checked={isDarkMode} onChange={() => setIsDarkMode(!isDarkMode)} />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-indigo-600"></div>
                    </label>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                    <div
                        onClick={() => handleNavClick('profile')}
                        className="flex items-center p-2 rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700"
                    >
                        {user?.photoURL ? 
                            <img src={user.photoURL} alt="User Avatar" className="w-10 h-10 rounded-full" />
                            : <UserAvatar />
                        }
                        <div className="ml-3 overflow-hidden">
                            <p className="font-semibold text-sm text-slate-800 dark:text-slate-200 truncate">{user?.displayName || 'User'}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">View Profile</p>
                        </div>
                    </div>
                     <button
                        onClick={() => {
                            onLogout();
                            setIsOpen(false);
                        }}
                        className="w-full mt-4 flex items-center justify-center p-2 text-sm font-medium text-red-500 bg-red-100 dark:bg-red-900/50 dark:text-red-400 rounded-lg hover:bg-red-200 dark:hover:bg-red-800/50 transition-colors"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" /></svg>
                        Logout
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;