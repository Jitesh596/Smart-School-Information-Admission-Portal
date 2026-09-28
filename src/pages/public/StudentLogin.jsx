import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Modal } from '../../components/common/Modal';
import { GraduationCap, Mail, Lock, LogIn, Sparkles } from 'lucide-react';

export const StudentLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [forgotModal, setForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');

  const { loginUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/student/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast("Please provide both email and password.", "error");
      return;
    }
    setLoading(true);
    try {
      await loginUser(email, password);
      showToast("Logged in successfully! Welcome to Student Portal.", "success");
      navigate(from, { replace: true });
    } catch (err) {
      showToast(err.message || "Invalid student credentials. Try demo login.", "error");
    } finally {
      setLoading(false);
    }
  };

  const fillDemoStudent = () => {
    setEmail('student@example.com');
    setPassword('student123');
    showToast("Filled demo student credentials!", "info");
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    showToast(`Password reset link sent to ${forgotEmail}`, "success");
    setForgotModal(false);
    setForgotEmail('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-brand-500/30">
            <GraduationCap className="w-7 h-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white font-sans">
            Student & Parent Login
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Access your admission status, profile details, and school portal.
          </p>
        </div>

        {/* Quick Demo Credentials Banner */}
        <div className="p-3.5 rounded-2xl bg-brand-50 dark:bg-brand-950/60 border border-brand-200 dark:border-brand-800/80 flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-brand-800 dark:text-brand-300">
            <Sparkles className="w-4 h-4 text-brand-600 shrink-0" />
            <span>Demo: <strong className="font-semibold">student@example.com</strong></span>
          </div>
          <button
            type="button"
            onClick={fillDemoStudent}
            className="px-2.5 py-1 rounded-lg bg-brand-600 text-white text-[11px] font-bold hover:bg-brand-700 transition-colors shadow-sm"
          >
            Auto-Fill
          </button>
        </div>

        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              required
              icon={Mail}
              placeholder="student@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"
              type="password"
              required
              icon={Lock}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center text-slate-600 dark:text-slate-400 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 mr-2"
                />
                Remember me
              </label>
              <button
                type="button"
                onClick={() => setForgotModal(true)}
                className="font-bold text-brand-600 dark:text-brand-400 hover:underline"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={loading}
              icon={LogIn}
            >
              Log In to Portal
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 text-center text-xs text-slate-500">
            Don't have a student account yet?{' '}
            <Link to="/register" className="font-bold text-brand-600 dark:text-brand-400 hover:underline">
              Create an account
            </Link>
          </div>
        </Card>

      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotModal}
        onClose={() => setForgotModal(false)}
        title="Reset Password"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleForgotSubmit} className="space-y-4">
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Enter your registered email address to receive password recovery instructions.
          </p>
          <Input
            label="Registered Email"
            type="email"
            required
            icon={Mail}
            placeholder="student@example.com"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
          />
          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" onClick={() => setForgotModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Send Reset Link
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
