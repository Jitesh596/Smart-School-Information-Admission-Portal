import React, { useState, useEffect } from 'react';
import { getCollectionData } from '../../services/dataService';
import { CourseCard } from '../../components/shared/CourseCard';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Search } from 'lucide-react';

export const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('');

  useEffect(() => {
    getCollectionData('courses', 'courses').then(setCourses);
  }, []);

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) ||
                          c.description.toLowerCase().includes(search.toLowerCase()) ||
                          (c.code && c.code.toLowerCase().includes(search.toLowerCase()));
    const matchesLevel = levelFilter ? c.level === levelFilter : true;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Academic Offerings
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Courses & Curricula
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Explore our structured academic programs tailored for distinct age groups and specialization streams.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex-1">
          <Input
            placeholder="Search by course name or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={Search}
          />
        </div>
        <div className="w-full sm:w-64">
          <Select
            placeholder="All Grade Levels"
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value)}
            options={[
              { value: 'Primary', label: 'Primary (Grades 1-5)' },
              { value: 'Middle', label: 'Middle (Grades 6-8)' },
              { value: 'Secondary', label: 'Secondary (Grades 9-12)' }
            ]}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
};
