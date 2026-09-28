import React, { useState, useEffect } from 'react';
import { getCollectionData } from '../../services/dataService';
import { FacilityCard } from '../../components/shared/FacultyCard';

export const FacilitiesPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    getCollectionData('facilities', 'facilities').then(setFacilities);
  }, []);

  const categories = ['All', 'Academic', 'Sports', 'Arts', 'Amenities'];

  const filteredFacilities = facilities.filter(f =>
    categoryFilter === 'All' ? true : f.category === categoryFilter
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
          Infrastructure & Amenities
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Campus Facilities
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Explore our world-class labs, aquatic center, libraries, and performing arts suites.
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              categoryFilter === cat
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredFacilities.map(f => (
          <FacilityCard key={f.id} facility={f} />
        ))}
      </div>
    </div>
  );
};
