import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { ShieldCheck, Mail, Lock, Sparkles } from 'lucide-react';

export const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { loginAdmin } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Please provide admin email and password.", "error");
      return;
    }
    setLoading(true);
    try {
      await loginAdmin(email, password);
      showToast("Welcome to the Administration Console!", "success");
      navigate('/admin/dashboard');
    } catch (err) {
      showToast(err.message || "Failed to authenticate administrator.", "error");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoAdmin = () => {
    setEmail('admin@example.com');
    setPassword('admin123');
    showToast("Filled demo admin credentials!", "info");
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-950 text-white">
      <div className="max-w-md w-full space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-rose-600 text-white flex items-center justify-center mx-auto shadow-xl shadow-rose-600/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
            Administration Portal
          </h2>
          <p className="text-xs text-slate-400">
            Authorized administrative staff login only.
          </p>
        </div>

        {/* Quick Demo Admin Credentials Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-slate-300">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Demo: <strong className="font-semibold text-white">admin@example.com</strong></span>
          </div>
          <button
            type="button"
            onClick={fillDemoAdmin}
            className="px-2.5 py-1 rounded-lg bg-rose-600 text-white text-[11px] font-bold hover:bg-rose-700 transition-colors shadow-sm"
          >
            Auto-Fill
          </button>
        </div>

        <Card className="p-8 bg-slate-900 border-slate-800 text-slate-100">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Admin Email"
              type="email"
              required
              icon={Mail}
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Admin Secret Password"
              type="password"
              required
              icon={Lock}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button
              type="submit"
              variant="danger"
              size="lg"
              fullWidth
              isLoading={loading}
              icon={ShieldCheck}
            >
              Access Admin Console
            </Button>
          </form>

          <p className="mt-6 text-[11px] text-slate-500 text-center">
            Role-based authentication enforced. Unauthorized access attempts are logged.
          </p>
        </Card>

      </div>
    </div>
  );
};
