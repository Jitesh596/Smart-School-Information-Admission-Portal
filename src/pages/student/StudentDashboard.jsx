import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getApplications, getCollectionData } from '../../services/dataService';
import { Card, Badge } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import {
  FileText,
  User,
  PlusCircle,
  Bell,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [notices, setNotices] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!currentUser) return;
      const apps = await getApplications(currentUser.uid || currentUser.email);
      const nots = await getCollectionData('notices', 'notices');
      const evts = await getCollectionData('events', 'events');
      setApplications(apps);
      setNotices(nots.slice(0, 3));
      setEvents(evts.slice(0, 2));
      setLoading(false);
    };
    fetchData();
  }, [currentUser]);

  const latestApp = applications[0];

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Rejected': return 'danger';
      case 'Under Review': return 'warning';
      default: return 'info';
    }
  };

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-brand-700 via-brand-600 to-indigo-600 p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 text-brand-100 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Student Portal Active</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Welcome back, {currentUser?.name || "Rahul"}!
          </h1>
          <p className="text-xs sm:text-sm text-brand-100 max-w-xl">
            Track your admission applications, stay informed with school circulars, and manage your student profile.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link to="/student/apply">
            <Button variant="accent" size="sm" icon={PlusCircle}>
              Apply Now
            </Button>
          </Link>
          <Link to="/student/profile">
            <Button variant="outline" size="sm" className="border-white/40 text-white hover:bg-white/10">
              Edit Profile
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Application Status Card */}
        <Card className="p-6 md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
              <FileText className="w-5 h-5 mr-2 text-brand-600" />
              Latest Admission Application
            </h3>
            <Link to="/student/applications" className="text-xs font-semibold text-brand-600 hover:underline">
              View All ({applications.length})
            </Link>
          </div>

          {latestApp ? (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-slate-400 block">{latestApp.id}</span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {latestApp.classApplied}
                  </h4>
                </div>
                <Badge variant={getStatusVariant(latestApp.status)} size="lg">
                  {latestApp.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 pt-2 border-t border-slate-200/60 dark:border-slate-700">
                <div>Applicant: <strong className="text-slate-800 dark:text-slate-200">{latestApp.fullName}</strong></div>
                <div>Submitted: <strong className="text-slate-800 dark:text-slate-200">{new Date(latestApp.submittedAt).toLocaleDateString()}</strong></div>
              </div>

              <div className="pt-2 flex justify-end">
                <Link to={`/student/applications/${latestApp.id}`}>
                  <Button variant="outline" size="sm" icon={ArrowRight}>
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 space-y-3">
              <p className="text-xs text-slate-500">You have not submitted an admission application yet.</p>
              <Link to="/student/apply">
                <Button variant="primary" size="sm" icon={PlusCircle}>
                  Start Admission Application
                </Button>
              </Link>
            </div>
          )}
        </Card>

        {/* Profile Completion Card */}
        <Card className="p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
            <User className="w-5 h-5 mr-2 text-emerald-600" />
            Profile Summary
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Name:</span>
              <strong className="text-slate-900 dark:text-white">{currentUser?.name}</strong>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Email:</span>
              <strong className="text-slate-900 dark:text-white truncate max-w-[140px]">{currentUser?.email}</strong>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Phone:</span>
              <strong className="text-slate-900 dark:text-white">{currentUser?.phone || "Not set"}</strong>
            </div>
            <div className="flex justify-between text-slate-600 dark:text-slate-400">
              <span>Role:</span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700">
                {currentUser?.role}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Link to="/student/profile">
              <Button variant="outline" size="sm" fullWidth>
                Update Profile Details
              </Button>
            </Link>
          </div>
        </Card>

      </div>

      {/* Notices & Events Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Recent Notices */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
              <Bell className="w-5 h-5 mr-2 text-amber-500" />
              Recent Announcements
            </h3>
            <Link to="/notices" className="text-xs text-brand-600 font-semibold hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3">
            {notices.map(notice => (
              <div key={notice.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-400 mb-1">
                  <span>{notice.category}</span>
                  <span>{new Date(notice.date).toLocaleDateString()}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {notice.title}
                </h4>
              </div>
            ))}
          </div>
        </Card>

        {/* Upcoming Events */}
        <Card className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
              Upcoming Events
            </h3>
            <Link to="/events" className="text-xs text-brand-600 font-semibold hover:underline">
              Calendar
            </Link>
          </div>

          <div className="space-y-3">
            {events.map(evt => (
              <div key={evt.id} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-brand-100 text-brand-700 flex flex-col items-center justify-center text-center font-bold shrink-0">
                  <span className="text-[10px] uppercase font-bold">{new Date(evt.date).toLocaleDateString('en-US', { month: 'short' })}</span>
                  <span className="text-sm font-black">{new Date(evt.date).getDate()}</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">{evt.title}</h4>
                  <p className="text-[11px] text-slate-500">{evt.location}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

      </div>

    </div>
  );
};
