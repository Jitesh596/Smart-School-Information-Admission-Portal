import React from 'react';
import { Card, Badge } from '../common/Card';
import { Calendar, BellRing } from 'lucide-react';

export const NoticeCard = ({ notice }) => {
  return (
    <Card hoverable className="p-6 relative group border-slate-200 dark:border-slate-800">
      <div className="flex items-start justify-between mb-3">
        <Badge variant={notice.important ? "danger" : "primary"}>
          {notice.category || "Notice"}
        </Badge>
        {notice.important && (
          <span className="flex items-center text-xs font-bold text-rose-600 dark:text-rose-400">
            <BellRing className="w-3.5 h-3.5 mr-1 animate-bounce" />
            URGENT
          </span>
        )}
      </div>

      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
        {notice.title}
      </h3>

      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4 line-clamp-3">
        {notice.description}
      </p>

      <div className="flex items-center text-[11px] text-slate-400 font-medium pt-3 border-t border-slate-100 dark:border-slate-800/80">
        <Calendar className="w-3.5 h-3.5 mr-1.5 text-brand-500" />
        <span>Published on {new Date(notice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
      </div>
    </Card>
  );
};
