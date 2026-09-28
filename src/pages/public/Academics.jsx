import React from 'react';
import { Card } from '../../components/common/Card';
import { BookOpen, Cpu, Sparkles, CheckCircle2, Calendar } from 'lucide-react';

export const Academics = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Pedagogy & Excellence
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
          Academic Philosophy
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          Our curriculum combines inquiry-based STEM learning, language arts, and critical problem solving to prepare students for top global universities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="p-6 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-100 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center font-bold">
            <BookOpen className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Inquiry-Based Learning</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Students transition from passive listeners to active researchers, testing hypotheses in our advanced science and computer labs.
          </p>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center font-bold">
            <Cpu className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">STEM & AI Integration</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Hands-on exposure to Python programming, robotics, 3D prototyping, and data science starting from Middle School.
          </p>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">Holistic Assessment</h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Continuous evaluation through capstone projects, debates, portfolios, and practical examinations alongside written tests.
          </p>
        </Card>
      </div>
    </div>
  );
};
