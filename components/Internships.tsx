import React, { useState } from 'react';
import { User } from 'firebase/auth';
import Card from './common/Card';
import { mockInternships, mockLeaderboardData, mockBadges } from '../constants';
import type { Internship, Student, Badge as BadgeType } from '../types';

const BadgeNotification: React.FC<{ badge: BadgeType; onClose: () => void; }> = ({ badge, onClose }) => {
    return (
        <div className="fixed top-5 right-5 z-50 bg-white dark:bg-slate-800 shadow-lg rounded-lg p-4 flex items-center animate-fade-in-down">
             <div className="text-3xl mr-3">{badge.icon}</div>
             <div>
                <h4 className="font-bold text-slate-800 dark:text-white">Badge Unlocked!</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">{badge.name}</p>
             </div>
             <button onClick={onClose} className="ml-4 text-slate-400 hover:text-slate-600">&times;</button>
        </div>
    )
}

const SubmissionModal: React.FC<{
    internship: Internship;
    onClose: () => void;
    onSubmit: (submission: { link: string, notes: string }) => void;
}> = ({ internship, onClose, onSubmit }) => {
    const [link, setLink] = useState('');
    const [notes, setNotes] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(!link) {
            alert('Please provide a submission link.');
            return;
        }
        onSubmit({ link, notes });
    };
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center" onClick={onClose}>
            <div className="bg-white dark:bg-slate-800 rounded-lg p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-1">Submit: {internship.title}</h3>
                <p className="text-sm text-slate-500 mb-4">Provide a link to your work (e.g., GitHub, Figma, live URL).</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="https://github.com/your-repo" value={link} onChange={e => setLink(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-700 p-2 rounded-md border border-slate-300 dark:border-slate-600"/>
                    <textarea placeholder="Optional notes for your submission..." value={notes} onChange={e => setNotes(e.target.value)} className="w-full bg-slate-100 dark:bg-slate-700 p-2 rounded-md border border-slate-300 dark:border-slate-600 h-24"/>
                    <div className="flex justify-end gap-2">
                        <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg bg-slate-200 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500">Cancel</button>
                        <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">Submit Project</button>
                    </div>
                </form>
            </div>
        </div>
    );
};


const Leaderboard: React.FC<{ user: User | null; userPoints: number }> = ({ user, userPoints }) => {
    const UserAvatar = () => (
      <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">
        {user?.displayName ? user.displayName.charAt(0).toUpperCase() : user?.email?.charAt(0).toUpperCase()}
      </div>
    );

    return (
        <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Leaderboard</h3>
            <ul className="space-y-3">
                 {mockLeaderboardData.map((student, index) => (
                    <li key={student.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                             <span className="font-bold w-6">{index + 1}.</span>
                             <img src={student.avatar} alt={student.name} className="w-10 h-10 rounded-full mr-3" />
                             <span className="font-medium text-slate-800 dark:text-white">{student.name}</span>
                        </div>
                        <span className="font-bold text-indigo-500">{student.points} XP</span>
                    </li>
                ))}
            </ul>
             <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center">
                    <span className="font-bold w-6">You</span>
                     {user?.photoURL ? 
                        <img src={user.photoURL} alt="You" className="w-10 h-10 rounded-full mr-3" />
                        : <div className="mr-3"><UserAvatar/></div>
                     }
                    <span className="font-medium text-slate-800 dark:text-white">{user?.displayName || 'You'}</span>
                </div>
                <span className="font-bold text-green-500">{userPoints} XP</span>
            </div>
        </Card>
    );
};


const InternshipCard: React.FC<{
    internship: Internship;
    isApplied: boolean;
    isCompleted: boolean;
    onApply: (id: number) => void;
    onSubmitClick: (internship: Internship) => void;
}> = ({ internship, isApplied, isCompleted, onApply, onSubmitClick }) => {
    
    const getButton = () => {
        if (isCompleted) {
            return (
                <button disabled className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center cursor-not-allowed">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    Completed
                </button>
            );
        }
        if (isApplied) {
            return (
                 <button onClick={() => onSubmitClick(internship)} className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-600 transition-colors">
                    Submit Project
                </button>
            );
        }
        return (
            <button onClick={() => onApply(internship.id)} className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors">
                Apply Now
            </button>
        );
    }

    return (
        <Card className={`p-6 flex flex-col justify-between ${isCompleted ? 'opacity-60' : ''}`}>
             <div>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 dark:text-white">{internship.title}</h3>
                        <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{internship.company}</p>
                    </div>
                    <span className="text-xs font-semibold bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-1 rounded-full">{internship.duration}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{internship.description}</p>
                <div className="mt-4">
                    <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Skills Required</h4>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {internship.skills.map(skill => (
                            <span key={skill} className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{skill}</span>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-6 flex justify-between items-center">
                <span className="font-bold text-lg text-green-500">{internship.points} XP</span>
                {getButton()}
            </div>
        </Card>
    );
};


const Internships: React.FC<{ user: User | null }> = ({ user }) => {
  const [userPoints, setUserPoints] = useState(4250); // In a real app, this would come from a database
  const [appliedProjects, setAppliedProjects] = useState<Set<number>>(new Set());
  const [completedProjects, setCompletedProjects] = useState<Set<number>>(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  const [unlockedBadge, setUnlockedBadge] = useState<BadgeType | null>(null);

  const handleApply = (id: number) => {
    setAppliedProjects(prev => new Set(prev).add(id));
  };

  const handleSubmitClick = (internship: Internship) => {
    setSelectedInternship(internship);
    setIsModalOpen(true);
  };
  
  const handleSubmission = () => {
    if (!selectedInternship) return;

    setCompletedProjects(prev => new Set(prev).add(selectedInternship.id));
    setUserPoints(prev => prev + selectedInternship.points);
    
    if (selectedInternship.badgeId) {
        const badge = mockBadges.find(b => b.id === selectedInternship.badgeId);
        if (badge) {
            setUnlockedBadge(badge);
            setTimeout(() => setUnlockedBadge(null), 4000);
        }
    }

    setIsModalOpen(false);
    setSelectedInternship(null);
  };

  return (
    <div className="space-y-6">
        {unlockedBadge && <BadgeNotification badge={unlockedBadge} onClose={() => setUnlockedBadge(null)} />}
        {isModalOpen && selectedInternship && <SubmissionModal internship={selectedInternship} onClose={() => setIsModalOpen(false)} onSubmit={handleSubmission} />}

        <div>
            <h2 className="text-2xl font-semibold text-slate-700 dark:text-slate-200">Micro-Internships &amp; Projects</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Gain practical experience and earn points by completing real-world projects.</p>
        </div>
      
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockInternships.map(internship => (
                    <InternshipCard 
                        key={internship.id} 
                        internship={internship}
                        isApplied={appliedProjects.has(internship.id)}
                        isCompleted={completedProjects.has(internship.id)}
                        onApply={handleApply}
                        onSubmitClick={handleSubmitClick}
                    />
                ))}
            </div>
            <div className="lg:col-span-1">
                <Leaderboard user={user} userPoints={userPoints} />
            </div>
        </div>
    </div>
  );
};

export default Internships;
