import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getApplications } from '../../services/dataService';
import { Card, Badge } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Table';
import { ArrowLeft, Printer, CheckCircle2, Clock, FileText, User, Users, GraduationCap, Download } from 'lucide-react';

export const ApplicationDetails = () => {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getApplications().then(list => {
      const found = list.find(item => item.id === id);
      setApp(found || null);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <Loader message="Loading application record..." />;

  if (!app) {
    return (
      <div className="text-center py-12 space-y-4">
        <h2 className="text-xl font-bold">Application Record Not Found</h2>
        <Link to="/student/applications">
          <Button variant="primary" size="sm" icon={ArrowLeft}>
            Back to Applications
          </Button>
        </Link>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <Link to="/student/applications">
          <Button variant="outline" size="sm" icon={ArrowLeft}>
            Back to List
          </Button>
        </Link>
        <Button variant="primary" size="sm" icon={Printer} onClick={handlePrint}>
          Print Application Summary
        </Button>
      </div>

      <Card className="p-8 space-y-8 border-t-4 border-t-brand-600">
        
        {/* Banner */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-mono font-bold text-slate-400 block">{app.id}</span>
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
              Admission Application Summary
            </h1>
            <p className="text-xs text-slate-500">
              Submitted on {app.submittedAt ? new Date(app.submittedAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A'}
            </p>
          </div>
          <Badge variant={app.status === 'Approved' ? 'success' : app.status === 'Rejected' ? 'danger' : 'warning'} size="lg">
            {app.status}
          </Badge>
        </div>

        {/* Section 1: Personal Details */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-brand-600 dark:text-brand-400 flex items-center">
            <User className="w-4 h-4 mr-2" /> Student Personal Profile
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div><span className="text-slate-400 block">Full Name</span><strong className="text-slate-900 dark:text-white">{app.fullName}</strong></div>
            <div><span className="text-slate-400 block">Date of Birth</span><strong className="text-slate-900 dark:text-white">{app.dateOfBirth}</strong></div>
            <div><span className="text-slate-400 block">Gender</span><strong className="text-slate-900 dark:text-white">{app.gender}</strong></div>
            <div><span className="text-slate-400 block">Email</span><strong className="text-slate-900 dark:text-white">{app.email}</strong></div>
            <div><span className="text-slate-400 block">Phone</span><strong className="text-slate-900 dark:text-white">{app.phone}</strong></div>
            <div><span className="text-slate-400 block">City / State</span><strong className="text-slate-900 dark:text-white">{app.city}, {app.state} ({app.pinCode})</strong></div>
          </div>
        </div>

        {/* Section 2: Parent Information */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 flex items-center">
            <Users className="w-4 h-4 mr-2" /> Parent / Guardian Information
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div><span className="text-slate-400 block">Father's Name</span><strong className="text-slate-900 dark:text-white">{app.fatherName}</strong></div>
            <div><span className="text-slate-400 block">Mother's Name</span><strong className="text-slate-900 dark:text-white">{app.motherName}</strong></div>
            <div><span className="text-slate-400 block">Guardian Phone</span><strong className="text-slate-900 dark:text-white">{app.guardianPhone}</strong></div>
            <div><span className="text-slate-400 block">Guardian Email</span><strong className="text-slate-900 dark:text-white">{app.guardianEmail || "N/A"}</strong></div>
          </div>
        </div>

        {/* Section 3: Academic Information */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center">
            <GraduationCap className="w-4 h-4 mr-2" /> Academic History & Class Choice
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
            <div><span className="text-slate-400 block">Previous School</span><strong className="text-slate-900 dark:text-white">{app.previousSchool}</strong></div>
            <div><span className="text-slate-400 block">Last Class</span><strong className="text-slate-900 dark:text-white">{app.previousClass}</strong></div>
            <div><span className="text-slate-400 block">Percentage / Grade</span><strong className="text-slate-900 dark:text-white">{app.percentage}</strong></div>
            <div><span className="text-slate-400 block">Applying For</span><strong className="text-brand-600 font-bold">{app.classApplied}</strong></div>
          </div>
        </div>

        {/* Attached Documents */}
        {app.documents && app.documents.length > 0 && (
          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">Attached Storage Documents</h4>
            <div className="flex flex-wrap gap-2">
              {app.documents.map((doc, idx) => (
                <a
                  key={idx}
                  href={doc.downloadURL && doc.downloadURL !== '#' ? doc.downloadURL : '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-slate-700 transition-colors flex items-center space-x-2"
                >
                  <FileText className="w-4 h-4 text-brand-500" />
                  <span>{doc.name} {doc.size ? `(${doc.size})` : ''}</span>
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                </a>
              ))}
            </div>
          </div>
        )}

        {app.adminNotes && (
          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 text-xs space-y-1">
            <span className="font-bold text-amber-800 dark:text-amber-300 block">Administrator Remarks:</span>
            <p className="text-slate-700 dark:text-slate-300">{app.adminNotes}</p>
          </div>
        )}

      </Card>
    </div>
  );
};
