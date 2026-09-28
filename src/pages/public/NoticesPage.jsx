import React, { useState, useEffect } from 'react';
import { getCollectionData } from '../../services/dataService';
import { NoticeCard } from '../../components/shared/NoticeCard';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Search } from 'lucide-react';

export const NoticesPage = () => {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  useEffect(() => {
    getCollectionData('notices', 'notices').then(setNotices);
  }, []);

  const filteredNotices = notices.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) ||
                          n.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter ? n.category === categoryFilter : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Official Announcements
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          School Notices & Circulars
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Stay updated with official school communications, exam schedules, and holiday announcements.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex-1">
          <Input
            placeholder="Search notice title or content..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={Search}
          />
        </div>
        <div className="w-full sm:w-64">
          <Select
            placeholder="All Categories"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={['Admissions', 'Academics', 'Exams', 'Sports', 'General']}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredNotices.map(n => (
          <NoticeCard key={n.id} notice={n} />
        ))}
      </div>
    </div>
  );
};
