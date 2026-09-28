import React, { useState, useEffect } from 'react';
import { Card, Badge } from '../common/Card';
import { BookOpen, Clock, CheckCircle2, ArrowUp, Trophy } from 'lucide-react';

export const CourseCard = ({ course }) => {
  return (
    <Card hoverable className="p-6 flex flex-col justify-between h-full border-l-4 border-l-brand-600">
      <div>
        <div className="flex items-center justify-between mb-3">
          <Badge variant="primary">
            {course.level || "Grade"}
          </Badge>
          <span className="text-xs font-mono font-bold text-slate-400">
            {course.code}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          {course.name}
        </h3>

        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {course.description}
        </p>

        {course.subjects && course.subjects.length > 0 && (
          <div className="mb-4">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Key Subjects Covered
            </span>
            <div className="flex flex-wrap gap-1.5">
              {course.subjects.map((sub, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center text-xs font-semibold text-brand-600 dark:text-brand-400 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Clock className="w-4 h-4 mr-2" />
        <span>Duration: {course.duration}</span>
      </div>
    </Card>
  );
};

export const AchievementCard = ({ achievement }) => {
  return (
    <Card hoverable className="overflow-hidden flex flex-col h-full group">
      <div className="relative h-48 w-full overflow-hidden bg-slate-800">
        <img
          src={achievement.image || "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80"}
          alt={achievement.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="warning">
            <Trophy className="w-3 h-3 mr-1" />
            {achievement.category || "Honors"}
          </Badge>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors mb-2">
            {achievement.title}
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {achievement.description}
          </p>
        </div>
        <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
          Awarded: {new Date(achievement.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </div>
      </div>
    </Card>
  );
};

export const GalleryGrid = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item)}
            className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-md border border-slate-200 dark:border-slate-800"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
            <div className="absolute bottom-0 inset-x-0 p-5 text-white transform group-hover:translate-y-0 transition-transform">
              <span className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-brand-600 text-white mb-1">
                {item.category || "Campus"}
              </span>
              <h4 className="text-base font-bold leading-tight">{item.title}</h4>
              <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div
          onClick={() => setSelectedImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 p-2 relative">
            <img
              src={selectedImage.image}
              alt={selectedImage.title}
              className="w-full max-h-[75vh] object-contain rounded-xl"
            />
            <div className="p-4 text-white">
              <h3 className="text-lg font-bold">{selectedImage.title}</h3>
              <p className="text-xs text-slate-400 mt-1">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 left-6 z-40 p-3 rounded-2xl bg-brand-600 text-white shadow-xl hover:bg-brand-700 transition-all duration-300 transform hover:scale-110 focus:outline-none"
      title="Back to Top"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};
