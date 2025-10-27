
import React from 'react';
import type { Badge as BadgeType } from '../../types';

interface BadgeProps {
  badge: BadgeType;
}

const Badge: React.FC<BadgeProps> = ({ badge }) => {
  return (
    <div className="flex flex-col items-center text-center p-4 bg-slate-100 dark:bg-slate-700 rounded-lg shadow-sm">
      <div className="text-4xl mb-2">{badge.icon}</div>
      <h3 className="font-bold text-slate-800 dark:text-white">{badge.name}</h3>
      <p className="text-xs text-slate-500 dark:text-slate-400">{badge.description}</p>
    </div>
  );
};

export default Badge;
