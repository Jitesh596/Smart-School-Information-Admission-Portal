import React, { useState, useEffect } from 'react';
import { getCollectionData } from '../../services/dataService';
import { FacultyCard } from '../../components/shared/FacultyCard';
import { Input } from '../../components/common/Input';
import { Search } from 'lucide-react';

export const FacultyPage = () => {
  const [faculty, setFaculty] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getCollectionData('faculty', 'faculty').then(setFaculty);
  }, []);

  const filteredFaculty = faculty.filter(f =>
    f.name.toLowerCase().includes(search.toLowerCase()) ||
    f.subject.toLowerCase().includes(search.toLowerCase()) ||
    f.qualification.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Academic Leadership
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Our Experienced Faculty
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Meet the educators driving innovation, mentorship, and student success.
        </p>
      </div>

      <div className="max-w-md mx-auto">
        <Input
          placeholder="Search by teacher name or subject (e.g. Physics, Math)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={Search}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredFaculty.map(fac => (
          <FacultyCard key={fac.id} faculty={fac} />
        ))}
      </div>
    </div>
  );
};
