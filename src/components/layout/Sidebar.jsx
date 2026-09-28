import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileSpreadsheet,
  Bell,
  Calendar,
  UserCheck,
  BookOpen,
  Building2,
  Image,
  Trophy,
  Info,
  User,
  PlusCircle,
  FolderOpen,
  Mail
} from 'lucide-react';

export const Sidebar = ({ mode = 'admin' }) => {
  const location = useLocation();

  const adminLinks = [
    { name: 'Dashboard Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Manage Admissions', path: '/admin/admissions', icon: FileSpreadsheet },
    { name: 'Manage Students', path: '/admin/students', icon: Users },
    { name: 'Contact Inquiries', path: '/admin/contacts', icon: Mail },
    { name: 'Notices Board', path: '/admin/notices', icon: Bell },
    { name: 'School Events', path: '/admin/events', icon: Calendar },
    { name: 'Faculty Members', path: '/admin/faculty', icon: UserCheck },
    { name: 'Academic Courses', path: '/admin/courses', icon: BookOpen },
    { name: 'Campus Facilities', path: '/admin/facilities', icon: Building2 },
    { name: 'Photo Gallery', path: '/admin/gallery', icon: Image },
    { name: 'Achievements', path: '/admin/achievements', icon: Trophy },
    { name: 'School Information', path: '/admin/school-info', icon: Info },
  ];

  const studentLinks = [
    { name: 'Student Dashboard', path: '/student/dashboard', icon: LayoutDashboard },
    { name: 'Apply for Admission', path: '/student/apply', icon: PlusCircle },
    { name: 'My Applications', path: '/student/applications', icon: FolderOpen },
    { name: 'My Profile', path: '/student/profile', icon: User },
  ];

  const links = mode === 'admin' ? adminLinks : studentLinks;

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0 min-h-[calc(100vh-73px)] hidden lg:block p-4 space-y-1">
      <div className="px-3 py-2 text-[10px] font-extrabold uppercase tracking-widest text-slate-500">
        {mode === 'admin' ? 'Administration Portal' : 'Student Workspace'}
      </div>
      {links.map((link) => {
        const Icon = link.icon;
        const isActive = location.pathname === link.path;
        return (
          <Link
            key={link.path}
            to={link.path}
            className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
              isActive
                ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                : 'hover:bg-slate-800/80 hover:text-white text-slate-400'
            }`}
          >
            <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-400'}`} />
            <span className="truncate">{link.name}</span>
          </Link>
        );
      })}
    </aside>
  );
};
