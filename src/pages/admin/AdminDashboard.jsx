import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getCollectionData,
  getApplications,
  getAllUsers,
  updateApplicationStatus
} from '../../services/dataService';
import { Card, Badge } from '../../components/common/Card';
import { Table, Loader } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { useToast } from '../../context/ToastContext';
import {
  Users,
  FileSpreadsheet,
  Clock,
  CheckCircle2,
  Bell,
  Calendar,
  ShieldCheck,
  TrendingUp,
  Check,
  X,
  UserCheck,
  XCircle,
  FileText
} from 'lucide-react';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalApps: 0,
    pendingApps: 0,
    underReviewApps: 0,
    approvedApps: 0,
    rejectedApps: 0,
    noticesCount: 0,
    eventsCount: 0,
    facultyCount: 0
  });
  const [recentApps, setRecentApps] = useState([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const apps = await getApplications();
      const users = await getAllUsers();
      const notices = await getCollectionData('notices', 'notices');
      const events = await getCollectionData('events', 'events');
      const faculty = await getCollectionData('faculty', 'faculty');

      const stdList = users.filter(u => u.role === 'student' || u.role === 'parent' || !u.role);
      const pending = apps.filter(a => a.status === 'Pending');
      const underReview = apps.filter(a => a.status === 'Under Review');
      const approved = apps.filter(a => a.status === 'Approved');
      const rejected = apps.filter(a => a.status === 'Rejected');

      setStats({
        totalStudents: stdList.length,
        totalApps: apps.length,
        pendingApps: pending.length,
        underReviewApps: underReview.length,
        approvedApps: approved.length,
        rejectedApps: rejected.length,
        noticesCount: notices.length,
        eventsCount: events.length,
        facultyCount: faculty.length
      });

      setRecentApps(apps.slice(0, 6));
    } catch (err) {
      showToast("Failed to compile administrative statistics.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboard();
  }, []);

  const handleQuickStatus = async (id, status) => {
    try {
      await updateApplicationStatus(id, status);
      showToast(`Application ${id} status updated to ${status}`, "success");
      loadDashboard();
    } catch (err) {
      showToast("Failed to update status.", "error");
    }
  };

  if (loading) return <Loader message="Compiling real-time administrative metrics..." />;

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
            Executive Control Center
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Admin Management Dashboard
          </h1>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Authenticated Administrator</span>
        </div>
      </div>

      {/* Real Statistics Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        <Card className="p-4 bg-slate-900 text-white border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Students</span>
            <Users className="w-4 h-4 text-brand-400" />
          </div>
          <div className="text-2xl font-black">{stats.totalStudents}</div>
          <div className="text-[10px] text-emerald-400 flex items-center">
            <TrendingUp className="w-3 h-3 mr-1" /> Registered Accounts
          </div>
        </Card>

        <Card className="p-4 bg-slate-900 text-white border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Applications</span>
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black">{stats.totalApps}</div>
          <div className="text-[10px] text-slate-400">Total Received</div>
        </Card>

        <Card className="p-4 bg-slate-900 text-white border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Pending</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-400">{stats.pendingApps}</div>
          <div className="text-[10px] text-amber-300">Needs Action</div>
        </Card>

        <Card className="p-4 bg-slate-900 text-white border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Approved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-400">{stats.approvedApps}</div>
          <div className="text-[10px] text-emerald-300">Enrolled Students</div>
        </Card>

        <Card className="p-4 bg-slate-900 text-white border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Rejected</span>
            <XCircle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-2xl font-black text-rose-400">{stats.rejectedApps}</div>
          <div className="text-[10px] text-rose-300">Declined Submissions</div>
        </Card>

        <Card className="p-4 bg-slate-900 text-white border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Notices</span>
            <Bell className="w-4 h-4 text-sky-400" />
          </div>
          <div className="text-2xl font-black">{stats.noticesCount}</div>
          <div className="text-[10px] text-slate-400">Published Bulletins</div>
        </Card>

        <Card className="p-4 bg-slate-900 text-white border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Events</span>
            <Calendar className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl font-black">{stats.eventsCount}</div>
          <div className="text-[10px] text-slate-400">Scheduled Events</div>
        </Card>

        <Card className="p-4 bg-slate-900 text-white border-slate-800 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] font-bold uppercase">Faculty</span>
            <UserCheck className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black">{stats.facultyCount}</div>
          <div className="text-[10px] text-slate-400">Teachers & Mentors</div>
        </Card>

      </div>

      {/* Recent Admission Applications Queue */}
      <Card className="p-6 bg-slate-900 border-slate-800 text-white space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center">
            <FileSpreadsheet className="w-5 h-5 mr-2 text-brand-400" />
            Recent Applications Stream
          </h3>
          <Link to="/admin/admissions" className="text-xs font-semibold text-brand-400 hover:underline">
            View All Admissions ({stats.totalApps})
          </Link>
        </div>

        {recentApps.length === 0 ? (
          <div className="text-center py-8 text-xs text-slate-400">
            No admission applications found in database.
          </div>
        ) : (
          <Table headers={["ID", "Student Name", "Email", "Class Applied", "Submitted Date", "Status", "Quick Action"]}>
            {recentApps.map((app) => (
              <tr key={app.id} className="border-b border-slate-800 hover:bg-slate-800/50">
                <td className="px-6 py-4 font-mono font-bold text-xs text-brand-400">{app.id}</td>
                <td className="px-6 py-4 text-xs font-bold text-white">{app.fullName}</td>
                <td className="px-6 py-4 text-xs text-slate-300">{app.email}</td>
                <td className="px-6 py-4 text-xs text-slate-300">{app.classApplied}</td>
                <td className="px-6 py-4 text-xs text-slate-400">{app.submittedAt ? new Date(app.submittedAt).toLocaleDateString() : 'N/A'}</td>
                <td className="px-6 py-4">
                  <Badge variant={app.status === 'Approved' ? 'success' : app.status === 'Rejected' ? 'danger' : 'warning'}>
                    {app.status}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleQuickStatus(app.id, 'Approved')}
                      title="Approve Application"
                      className="p-1.5 rounded-lg bg-emerald-900/60 text-emerald-300 hover:bg-emerald-800 transition-colors"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleQuickStatus(app.id, 'Rejected')}
                      title="Reject Application"
                      className="p-1.5 rounded-lg bg-rose-900/60 text-rose-300 hover:bg-rose-800 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        )}
      </Card>

    </div>
  );
};
