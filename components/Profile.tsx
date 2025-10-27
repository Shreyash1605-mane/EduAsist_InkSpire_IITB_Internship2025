import React from 'react';
import { User } from 'firebase/auth';
import Card from './common/Card';
import Badge from './common/Badge';
import ProgressBar from './common/ProgressBar';
import { mockBadges } from '../constants';

interface ProfileProps {
    user: User | null;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
    const profileData = {
        name: user?.displayName || 'User',
        level: 5,
        points: 4250,
        nextLevelPoints: 5000,
        avatar: user?.photoURL,
    };

    const levelProgress = (profileData.points / profileData.nextLevelPoints) * 100;
    
    const UserAvatar = () => (
      <div className="h-24 w-24 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-4xl">
        {profileData.name.charAt(0).toUpperCase()}
      </div>
    );

    return (
        <div className="space-y-8">
            <Card className="p-6">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    {profileData.avatar ? 
                      <img className="h-24 w-24 rounded-full" src={profileData.avatar} alt={profileData.name} />
                      : <UserAvatar />
                    }
                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">{profileData.name}</h2>
                        <div className="mt-2">
                            <div className="flex justify-between text-sm text-slate-500 dark:text-slate-400">
                                <span>Level {profileData.level}</span>
                                <span>{profileData.points} / {profileData.nextLevelPoints} XP</span>
                            </div>
                            <ProgressBar progress={levelProgress} className="mt-1" />
                        </div>
                    </div>
                </div>
            </Card>

            <Card className="p-6">
                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Badges & Achievements</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {mockBadges.map(badge => (
                        <Badge key={badge.id} badge={badge} />
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Profile;
