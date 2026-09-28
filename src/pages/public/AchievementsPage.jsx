import React, { useState, useEffect } from 'react';
import { getCollectionData } from '../../services/dataService';
import { AchievementCard } from '../../components/shared/CourseCard';

export const AchievementsPage = () => {
  const [achievements, setAchievements] = useState([]);

  useEffect(() => {
    getCollectionData('achievements', 'achievements').then(setAchievements);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
          Honors & Accolades
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Student & Institutional Achievements
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Celebrating national science olympiad victories, eco-green school awards, and sports championships.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map(ach => (
          <AchievementCard key={ach.id} achievement={ach} />
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
