import React from 'react';
import { Card, Badge } from '../common/Card';
import { Mail, GraduationCap, Award } from 'lucide-react';

export const FacultyCard = ({ faculty }) => {
  return (
    <Card hoverable className="p-6 text-center group flex flex-col items-center">
      <div className="relative mb-4">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-brand-500/30 p-1 bg-white dark:bg-slate-800 shadow-md group-hover:scale-105 transition-transform duration-300">
          <img
            src={faculty.image || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"}
            alt={faculty.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>

      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
        {faculty.name}
      </h3>

      <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-0.5 mb-2">
        {faculty.subject}
      </p>

      <div className="space-y-1 text-xs text-slate-500 dark:text-slate-400 mb-3 w-full">
        <div className="flex items-center justify-center space-x-1">
          <GraduationCap className="w-3.5 h-3.5 text-slate-400" />
          <span className="truncate">{faculty.qualification}</span>
        </div>
        <div className="flex items-center justify-center space-x-1">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span>{faculty.experience} Experience</span>
        </div>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3 italic">
        "{faculty.description}"
      </p>

      <a
        href={`mailto:${faculty.email}`}
        className="inline-flex items-center text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
      >
        <Mail className="w-3.5 h-3.5 mr-1.5" />
        {faculty.email}
      </a>
    </Card>
  );
};

export const FacilityCard = ({ facility }) => {
  return (
    <Card hoverable className="overflow-hidden group flex flex-col h-full">
      <div className="relative h-52 w-full overflow-hidden bg-slate-800">
        <img
          src={facility.image || "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80"}
          alt={facility.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="info">
            {facility.category || "Campus"}
          </Badge>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
            {facility.name}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {facility.description}
          </p>
        </div>
      </div>
    </Card>
  );
};
