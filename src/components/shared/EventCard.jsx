import React from 'react';
import { Card, Badge } from '../common/Card';
import { Calendar, Clock, MapPin } from 'lucide-react';

export const EventCard = ({ event }) => {
  return (
    <Card hoverable className="flex flex-col h-full group">
      <div className="relative h-48 w-full overflow-hidden bg-slate-800">
        <img
          src={event.image || "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80"}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="primary" size="sm">
            {event.category || "Event"}
          </Badge>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
            {event.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-2">
            {event.description}
          </p>
        </div>

        <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div className="flex items-center">
            <Calendar className="w-3.5 h-3.5 mr-2 text-emerald-500 shrink-0" />
            <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          {event.time && (
            <div className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-2 text-brand-500 shrink-0" />
              <span>{event.time}</span>
            </div>
          )}
          {event.location && (
            <div className="flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-2 text-amber-500 shrink-0" />
              <span>{event.location}</span>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
