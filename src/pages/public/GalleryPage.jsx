import React, { useState, useEffect } from 'react';
import { getCollectionData } from '../../services/dataService';
import { GalleryGrid, AchievementCard } from '../../components/shared/CourseCard';

export const GalleryPage = () => {
  const [gallery, setGallery] = useState([]);
  const [category, setCategory] = useState('All');

  useEffect(() => {
    getCollectionData('gallery', 'gallery').then(setGallery);
  }, []);

  const categories = ['All', 'Sports', 'Academics', 'Cultural', 'Campus', 'Arts', 'Events'];

  const filteredGallery = gallery.filter(item =>
    category === 'All' ? true : item.category === category
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Visual Memories
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Photo Gallery
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Snapshots capturing academic breakthroughs, athletic triumphs, and campus celebrations.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
              category === cat
                ? 'bg-brand-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <GalleryGrid images={filteredGallery} />
    </div>
  );
};

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
