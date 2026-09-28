import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getSchoolInfo,
  getCollectionData
} from '../../services/dataService';
import {
  GraduationCap,
  Sparkles,
  ArrowRight,
  BookOpen,
  Award,
  Users,
  Building2,
  Calendar,
  Bell,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Star
} from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { NoticeCard } from '../../components/shared/NoticeCard';
import { EventCard } from '../../components/shared/EventCard';
import { FacultyCard, FacilityCard } from '../../components/shared/FacultyCard';
import { CourseCard, AchievementCard, GalleryGrid } from '../../components/shared/CourseCard';

export const Home = () => {
  const [info, setInfo] = useState({});
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    getSchoolInfo().then(setInfo);
    getCollectionData('notices', 'notices').then(data => setNotices(data.slice(0, 3)));
    getCollectionData('events', 'events').then(data => setEvents(data.slice(0, 3)));
    getCollectionData('faculty', 'faculty').then(data => setFaculty(data.slice(0, 4)));
    getCollectionData('facilities', 'facilities').then(data => setFacilities(data.slice(0, 3)));
    getCollectionData('courses', 'courses').then(data => setCourses(data.slice(0, 3)));
    getCollectionData('achievements', 'achievements').then(data => setAchievements(data.slice(0, 3)));
    getCollectionData('gallery', 'gallery').then(data => setGallery(data.slice(0, 6)));
  }, []);

  return (
    <div className="space-y-24 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32 bg-gradient-to-b from-brand-950 via-slate-900 to-slate-950 text-white">
        {/* Background glow graphics */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-brand-900/80 border border-brand-500/30 text-brand-300 text-xs font-semibold backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>Admissions Open for Academic Session 2025-26</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] font-sans">
                {info.tagline || "Empowering Students. Building Futures."}
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-light">
                Welcome to <span className="font-semibold text-white">{info.schoolName || "Apex International Academy"}</span>. Where academic excellence meets character development, state-of-the-art STEM laboratories, and holistic global education.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link to="/student/apply" className="w-full sm:w-auto">
                  <Button variant="primary" size="lg" fullWidth icon={ArrowRight}>
                    Apply for Admission
                  </Button>
                </Link>
                <Link to="/about" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" fullWidth className="border-slate-700 text-white hover:bg-slate-800">
                    Explore School
                  </Button>
                </Link>
              </div>

              {/* Quick Trust Badges */}
              <div className="pt-6 border-t border-slate-800/80 grid grid-cols-3 gap-4 text-center lg:text-left max-w-md mx-auto lg:mx-0">
                <div>
                  <div className="text-2xl font-black text-white">{info.passPercentage || "99.4%"}</div>
                  <div className="text-[11px] text-slate-400 font-medium">Academic Pass Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{info.totalStudentsCount || "1,250"}+</div>
                  <div className="text-[11px] text-slate-400 font-medium">Active Students</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-white">{info.campusArea || "25 Acres"}</div>
                  <div className="text-[11px] text-slate-400 font-medium">Green Campus</div>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-800/60 bg-slate-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1000&q=80"
                    alt="Students studying"
                    className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Stat Card */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-between text-slate-900 dark:text-white">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
                        <Star className="w-5 h-5 fill-amber-500" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wider">Top Rated School</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">Recognized by National Board</div>
                      </div>
                    </div>
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                      Ranked #1
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* QUICK ANNOUNCEMENTS & NOTICES TICKER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-brand-600 dark:text-brand-400 font-bold text-xs uppercase tracking-widest">
              <Bell className="w-4 h-4" />
              <span>Official Circulars</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans mt-1">
              Important Announcements
            </h2>
          </div>
          <Link to="/notices">
            <Button variant="outline" size="sm" icon={ChevronRight}>
              View All Notices
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {notices.map(notice => (
            <NoticeCard key={notice.id} notice={notice} />
          ))}
        </div>
      </section>

      {/* ABOUT SCHOOL INTRODUCTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 to-brand-950 text-white rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
            <div className="space-y-6">
              <span className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-widest bg-brand-500/20 text-brand-300 border border-brand-500/30">
                Principal's Welcome
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                "Nurturing Curiosity, Integrity, and Excellence"
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {info.description}
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center space-x-4">
                <div>
                  <h4 className="text-base font-bold text-white">{info.principalName || "Dr. Evelyn Vance, Ph.D."}</h4>
                  <p className="text-xs text-brand-400 font-medium">Principal & Academic Director</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <h4 className="text-base font-bold text-amber-400 mb-1">Our Vision</h4>
                <p className="text-xs text-slate-200 leading-relaxed">{info.vision}</p>
              </div>
              <div className="p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10">
                <h4 className="text-base font-bold text-emerald-400 mb-1">Our Mission</h4>
                <p className="text-xs text-slate-200 leading-relaxed">{info.mission}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMIC COURSES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Curriculum Pathways
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Academic Programs Offered
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Comprehensive learning frameworks tailored for every development stage from Elementary to Senior Secondary.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/courses">
            <Button variant="outline" size="md">
              Explore All Courses & Syllabi
            </Button>
          </Link>
        </div>
      </section>

      {/* CAMPUS FACILITIES PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              World-Class Infrastructure
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              State-of-the-Art Facilities
            </h2>
          </div>
          <Link to="/facilities">
            <Button variant="outline" size="sm">
              View All Facilities
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {facilities.map(facility => (
            <FacilityCard key={facility.id} facility={facility} />
          ))}
        </div>
      </section>

      {/* FACULTY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Expert Educators
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Meet Our Distinguished Faculty
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Dedicated mentors holding advanced degrees from globally renowned institutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {faculty.map(fac => (
            <FacultyCard key={fac.id} faculty={fac} />
          ))}
        </div>
      </section>

      {/* UPCOMING EVENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400">
              Campus Life
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
              Upcoming School Events
            </h2>
          </div>
          <Link to="/events">
            <Button variant="outline" size="sm">
              Event Calendar
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {events.map(evt => (
            <EventCard key={evt.id} event={evt} />
          ))}
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
            Campus Snapshots
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
            Life at Apex Academy
          </h2>
        </div>

        <GalleryGrid images={gallery} />

        <div className="text-center mt-8">
          <Link to="/gallery">
            <Button variant="outline" size="md">
              View Complete Photo Gallery
            </Button>
          </Link>
        </div>
      </section>

      {/* ADMISSION CTA SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-tr from-brand-700 via-brand-600 to-indigo-600 p-8 sm:p-14 text-white text-center shadow-2xl overflow-hidden">
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Ready to Begin Your Educational Journey?
            </h2>
            <p className="text-sm sm:text-base text-brand-100 leading-relaxed">
              Join the Apex Academy community today. Submit your admission inquiry or application online in just a few minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
              <Link to="/student/apply">
                <Button variant="accent" size="lg" className="shadow-lg">
                  Submit Online Application
                </Button>
              </Link>
              <Link to="/admissions">
                <Button variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10">
                  Admission Requirements
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
