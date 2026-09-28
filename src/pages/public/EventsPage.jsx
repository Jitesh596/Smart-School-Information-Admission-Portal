import React, { useState, useEffect } from 'react';
import { getCollectionData } from '../../services/dataService';
import { EventCard } from '../../components/shared/EventCard';

export const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getCollectionData('events', 'events').then(setEvents);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
          Campus Calendar
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Upcoming Events & Celebrations
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Join us for annual sports meets, science exhibitions, musical performances, and cultural festivals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {events.map(evt => (
          <EventCard key={evt.id} event={evt} />
        ))}
      </div>
    </div>
  );
};
