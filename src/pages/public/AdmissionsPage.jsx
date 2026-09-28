import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { FileText, CheckCircle2, Calendar, CreditCard, ArrowRight, HelpCircle } from 'lucide-react';

export const AdmissionsPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Join Apex Academy
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white">
          Admission Guidelines & Process
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          We welcome applications from motivated students for Grades K-12. Learn about our simple step-by-step admission workflow below.
        </p>
        <div className="pt-2">
          <Link to="/student/apply">
            <Button variant="primary" size="lg" icon={ArrowRight}>
              Start Online Application Now
            </Button>
          </Link>
        </div>
      </div>

      {/* 4-Step Process Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 text-center space-y-3 relative">
          <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
            1
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Register Account</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Create a student/parent profile on our portal using valid contact details.</p>
        </Card>

        <Card className="p-6 text-center space-y-3 relative">
          <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
            2
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Fill Application</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Provide personal details, prior academic records, parent info, and document uploads.</p>
        </Card>

        <Card className="p-6 text-center space-y-3 relative">
          <div className="w-10 h-10 rounded-full bg-brand-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
            3
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Document Review</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">The school admission board reviews credentials and schedules an interactive interaction.</p>
        </Card>

        <Card className="p-6 text-center space-y-3 relative">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-sm flex items-center justify-center mx-auto shadow-md">
            4
          </div>
          <h3 className="font-bold text-slate-900 dark:text-white text-base">Enrollment Approval</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Receive formal offer letter and complete admission fee confirmation.</p>
        </Card>
      </div>

      {/* Checklist of Required Documents */}
      <Card className="p-8 border-l-4 border-l-brand-600">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
          <FileText className="w-5 h-5 mr-2 text-brand-600" />
          Required Documentation Checklist
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-slate-300 font-medium">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Student Official Birth Certificate Copy</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Previous 2 Years Academic Progress Report Cards</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>School Leaving / Transfer Certificate (TC)</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Recent Passport Photograph (Student & Parents)</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Proof of Residence / Address Verification</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Medical Fitness Certificate & Blood Group Report</span>
          </div>
        </div>
      </Card>

    </div>
  );
};
