import React, { useState, useEffect } from 'react';
import { getSchoolInfo, updateSchoolInfo } from '../../services/dataService';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { TextArea } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { Loader } from '../../components/common/Table';
import { useToast } from '../../context/ToastContext';
import { Save, School, Globe, MapPin, Phone, Mail, Clock } from 'lucide-react';

export const ManageSchoolInfo = () => {
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    getSchoolInfo().then(data => {
      setInfo(data || {});
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateSchoolInfo(info);
      showToast("School Information updated globally across all public pages!", "success");
    } catch (err) {
      showToast("Failed to update school information.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader message="Fetching institutional settings..." />;

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-extrabold text-white">
          Manage School Information & Branding
        </h1>
        <p className="text-xs text-slate-400">
          Edit school name, principal details, contact info, vision, and mission. Public pages will update automatically.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Basic Branding */}
        <Card className="p-6 bg-slate-900 border-slate-800 text-white space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-brand-400 flex items-center">
            <School className="w-4 h-4 mr-2" /> Institutional Identity
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="School Name"
              required
              value={info.schoolName || ''}
              onChange={(e) => setInfo({ ...info, schoolName: e.target.value })}
            />
            <Input
              label="Tagline / Hero Headline"
              required
              value={info.tagline || ''}
              onChange={(e) => setInfo({ ...info, tagline: e.target.value })}
            />
            <Input
              label="Principal Name & Title"
              required
              value={info.principalName || ''}
              onChange={(e) => setInfo({ ...info, principalName: e.target.value })}
            />
            <Input
              label="Established Year"
              value={info.establishedYear || ''}
              onChange={(e) => setInfo({ ...info, establishedYear: e.target.value })}
            />
          </div>
          <TextArea
            label="School Overview Description"
            rows={3}
            required
            value={info.description || ''}
            onChange={(e) => setInfo({ ...info, description: e.target.value })}
          />
        </Card>

        {/* Vision & Mission */}
        <Card className="p-6 bg-slate-900 border-slate-800 text-white space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-emerald-400">
            Vision & Mission Statements
          </h3>
          <TextArea
            label="Vision Statement"
            rows={3}
            required
            value={info.vision || ''}
            onChange={(e) => setInfo({ ...info, vision: e.target.value })}
          />
          <TextArea
            label="Mission Statement"
            rows={3}
            required
            value={info.mission || ''}
            onChange={(e) => setInfo({ ...info, mission: e.target.value })}
          />
        </Card>

        {/* Contact Information */}
        <Card className="p-6 bg-slate-900 border-slate-800 text-white space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-amber-400 flex items-center">
            <MapPin className="w-4 h-4 mr-2" /> Address & Contact Channels
          </h3>
          <Input
            label="Full Physical Address"
            required
            value={info.address || ''}
            onChange={(e) => setInfo({ ...info, address: e.target.value })}
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Phone Numbers"
              required
              value={info.phone || ''}
              onChange={(e) => setInfo({ ...info, phone: e.target.value })}
            />
            <Input
              label="Email Address"
              type="email"
              required
              value={info.email || ''}
              onChange={(e) => setInfo({ ...info, email: e.target.value })}
            />
            <Input
              label="Official Website URL"
              value={info.website || ''}
              onChange={(e) => setInfo({ ...info, website: e.target.value })}
            />
            <Input
              label="School Timings"
              value={info.schoolTimings || ''}
              onChange={(e) => setInfo({ ...info, schoolTimings: e.target.value })}
            />
          </div>
        </Card>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={saving}
            icon={Save}
            className="px-8"
          >
            Save Global School Info
          </Button>
        </div>

      </form>
    </div>
  );
};
