import React, { useState, useEffect } from 'react';
import { getSchoolInfo, submitContact } from '../../services/dataService';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { TextArea } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const ContactPage = () => {
  const [info, setInfo] = useState({});
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    getSchoolInfo().then(setInfo).catch(err => {
      console.warn("Could not load dynamic school info:", err);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject || !form.message) {
      showToast("Please fill all required inquiry fields.", "error");
      return;
    }

    setSubmitting(true);
    try {
      await submitContact(form);
      showToast("Thank you! Your inquiry has been logged and sent to our admissions team.", "success");
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      showToast(err.message || "Unable to send message. Please check your connection.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
          Contact {info.schoolName || "Apex Academy"}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Have questions regarding admissions, campus visits, or academic programs? We're here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Col: Contact Info */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="p-6 space-y-6 border-l-4 border-l-brand-600">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Admission Helpdesk</h3>
            <div className="space-y-4 text-xs font-medium text-slate-600 dark:text-slate-300">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Campus Address</span>
                  <span>{info.address || "450 Innovation Parkway, Knowledge City, 560012"}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Phone className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Phone Lines</span>
                  <span>{info.phone || "+1 (800) 555-APEX / +1 (800) 555-0199"}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Mail className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Email Queries</span>
                  <span>{info.email || "admissions@apexacademy.edu"}</span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-brand-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Office Hours</span>
                  <span>{info.schoolTimings || "Mon - Fri: 8:00 AM - 3:30 PM"}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Interactive Map Visual */}
          <div className="rounded-2xl overflow-hidden h-52 border border-slate-200 dark:border-slate-800 bg-slate-900 relative">
            <img
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=800&q=80"
              alt="Map view"
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 flex items-center justify-center p-4 bg-slate-950/40">
              <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-xl shadow-xl text-center">
                <MapPin className="w-6 h-6 text-brand-600 mx-auto mb-1 animate-bounce" />
                <span className="text-xs font-bold text-slate-900 dark:text-white block">{info.schoolName || "Apex Main Campus"}</span>
                <span className="text-[10px] text-slate-500">Knowledge City District</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Real Contact Inquiry Form */}
        <div className="lg:col-span-7">
          <Card className="p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
              Send an Online Inquiry
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  required
                  placeholder="e.g. John Smith"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Input
                  label="Email Address"
                  type="email"
                  required
                  placeholder="parent@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
                <Input
                  label="Inquiry Subject"
                  required
                  placeholder="e.g. Grade 9 Admission Inquiry"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>

              <TextArea
                label="Message / Inquiry Details"
                rows={5}
                required
                placeholder="Write your questions or requested appointment date here..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />

              <Button
                type="submit"
                variant="primary"
                size="lg"
                isLoading={submitting}
                icon={Send}
                fullWidth
              >
                Send Message
              </Button>
            </form>
          </Card>
        </div>

      </div>
    </div>
  );
};
