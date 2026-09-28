import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Compass, Home } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 py-16 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-brand-50 dark:bg-brand-950/60 text-brand-600 flex items-center justify-center shadow-xl">
        <Compass className="w-10 h-10 animate-spin" style={{ animationDuration: '10s' }} />
      </div>
      <h1 className="text-6xl font-black text-slate-900 dark:text-white">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
        Page Not Found
      </h2>
      <p className="text-sm text-slate-500 max-w-md">
        The requested page URL does not exist or may have been moved.
      </p>
      <Link to="/">
        <Button variant="primary" size="md" icon={Home}>
          Return to Homepage
        </Button>
      </Link>
    </div>
  );
};
