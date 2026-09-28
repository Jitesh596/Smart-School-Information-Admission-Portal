import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getSchoolInfo } from '../../services/dataService';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const Footer = () => {
  const [info, setInfo] = useState({});
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    getSchoolInfo().then(data => setInfo(data || {}));
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    showToast("Thank you for subscribing to Apex Academy updates!", "success");
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Col 1: School Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold">
                <GraduationCap className="w-6 h-6" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                {info.schoolName || "Apex International Academy"}
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              {info.description || "Empowering young minds through academic excellence, character building, and innovative global learning programs."}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-2">
              <span className="text-xs font-bold text-slate-300 block uppercase tracking-wider">
                Subscribe to Announcements
              </span>
              <div className="flex items-center max-w-sm">
                <input
                  type="email"
                  required
                  placeholder="Enter parent email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-xs px-3.5 py-2.5 rounded-l-xl text-white focus:outline-none focus:border-brand-500"
                />
                <button
                  type="submit"
                  className="bg-brand-600 hover:bg-brand-700 text-white px-4 py-2.5 rounded-r-xl transition-colors flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-brand-500 pl-2">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/about" className="hover:text-brand-400 transition-colors">About Academy</Link></li>
              <li><Link to="/academics" className="hover:text-brand-400 transition-colors">Academic Programs</Link></li>
              <li><Link to="/courses" className="hover:text-brand-400 transition-colors">Curriculum & Courses</Link></li>
              <li><Link to="/faculty" className="hover:text-brand-400 transition-colors">Faculty & Mentors</Link></li>
              <li><Link to="/facilities" className="hover:text-brand-400 transition-colors">Campus Facilities</Link></li>
              <li><Link to="/achievements" className="hover:text-brand-400 transition-colors">Student Achievements</Link></li>
            </ul>
          </div>

          {/* Col 3: Admissions & Portal */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-emerald-500 pl-2">
              Admissions & Portal
            </h4>
            <ul className="space-y-2.5 text-xs font-medium">
              <li><Link to="/admissions" className="hover:text-emerald-400 transition-colors">Admission Process</Link></li>
              <li><Link to="/student/apply" className="hover:text-emerald-400 transition-colors">Online Application Form</Link></li>
              <li><Link to="/login" className="hover:text-emerald-400 transition-colors">Student Portal Login</Link></li>
              <li><Link to="/notices" className="hover:text-emerald-400 transition-colors">School Circulars</Link></li>
              <li><Link to="/events" className="hover:text-emerald-400 transition-colors">Upcoming Events</Link></li>
              <li><Link to="/admin/login" className="hover:text-emerald-400 transition-colors">Staff / Admin Login</Link></li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider mb-4 border-l-2 border-amber-500 pl-2">
              Contact & Location
            </h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{info.address || "450 Innovation Parkway, Knowledge City"}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{info.phone || "+1 (800) 555-APEX"}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{info.email || "admissions@apexacademy.edu"}</span>
              </li>
              <li className="flex items-start space-x-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{info.schoolTimings || "Mon - Fri: 8:00 AM - 3:30 PM"}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} {info.schoolName || "Apex International Academy"}. All Rights Reserved.</p>
          <div className="flex items-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors"><Youtube className="w-4 h-4" /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};
