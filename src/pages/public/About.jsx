import React, { useState, useEffect } from 'react';
import { getSchoolInfo } from '../../services/dataService';
import { Card } from '../../components/common/Card';
import { Target, Compass, Award, ShieldCheck, Heart, Users } from 'lucide-react';

export const About = () => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    getSchoolInfo().then(setInfo);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Heritage & Leadership
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
          About {info.schoolName || "Apex International Academy"}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          {info.description}
        </p>
      </div>

      {/* Vision & Mission Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="p-8 border-l-4 border-l-brand-600 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 flex items-center justify-center">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Vision</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {info.vision}
          </p>
        </Card>

        <Card className="p-8 border-l-4 border-l-emerald-600 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {info.mission}
          </p>
        </Card>
      </div>

      {/* Core Values */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Our Core Institutional Values
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 mx-auto flex items-center justify-center">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Academic Excellence</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Pursuing rigor, analytical depth, and lifelong passion for discovery.</p>
          </Card>

          <Card className="p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 mx-auto flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Integrity & Character</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Instilling honesty, ethical choices, and personal responsibility.</p>
          </Card>

          <Card className="p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/30 text-rose-600 mx-auto flex items-center justify-center">
              <Heart className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Empathy & Respect</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Fostering kindness, inclusivity, and multi-cultural understanding.</p>
          </Card>

          <Card className="p-6 text-center space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 text-purple-600 mx-auto flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Global Citizenship</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">Preparing responsible leaders for an interconnected world.</p>
          </Card>
        </div>
      </div>

    </div>
  );
};
