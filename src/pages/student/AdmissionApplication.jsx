import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { submitApplication, getCollectionData } from '../../services/dataService';
import { uploadStudentDocument } from '../../services/storageService';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Select, TextArea } from '../../components/common/Select';
import { Button } from '../../components/common/Button';
import { User, GraduationCap, Users, FileUp, Send, CheckCircle2, Paperclip, X, FileText, Loader2 } from 'lucide-react';

export const AdmissionApplication = () => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [documents, setDocuments] = useState([]);

  const [form, setForm] = useState({
    fullName: '',
    dateOfBirth: '',
    gender: 'Male',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
    fatherName: '',
    motherName: '',
    guardianPhone: '',
    guardianEmail: '',
    previousSchool: '',
    previousClass: '',
    percentage: '',
    classApplied: '',
    message: ''
  });

  useEffect(() => {
    if (currentUser) {
      setForm(prev => ({
        ...prev,
        fullName: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || ''
      }));
    }
    getCollectionData('courses', 'courses').then(data => {
      setCourses(data.map(c => ({ value: c.name, label: c.name })));
    }).catch(err => {
      console.warn("Could not fetch courses list:", err);
    });
  }, [currentUser]);

  const handleFileSelect = async (e) => {
    const files = Array.from(e.target.files);
    if (!files || files.length === 0) return;

    if (!currentUser?.uid) {
      showToast("Please log in to upload documents.", "error");
      return;
    }

    const tempAppId = `DRAFT-${Date.now()}`;
    setUploadingDoc(true);

    for (const file of files) {
      try {
        setUploadProgress(10);
        const docMeta = await uploadStudentDocument(
          file,
          currentUser.uid,
          tempAppId,
          (progress) => setUploadProgress(progress)
        );
        setDocuments(prev => [...prev, docMeta]);
        showToast(`Uploaded document: ${file.name}`, "success");
      } catch (err) {
        showToast(err.message || `Failed to upload ${file.name}`, "error");
      }
    }

    setUploadingDoc(false);
    setUploadProgress(0);
    e.target.value = '';
  };

  const removeDoc = (index) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
    showToast("Attachment removed.", "info");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Field Validation
    if (!form.fullName || !form.email || !form.phone || !form.classApplied || !form.previousSchool || !form.dateOfBirth) {
      showToast("Please fill all required personal, contact, and academic fields.", "error");
      return;
    }

    if (!form.fatherName || !form.motherName || !form.guardianPhone) {
      showToast("Please fill all required parent/guardian information.", "error");
      return;
    }

    if (!currentUser?.uid) {
      showToast("Session expired. Please log in again.", "error");
      return;
    }

    setSubmitting(true);
    try {
      const appData = {
        ...form,
        studentId: currentUser.uid,
        documents: documents
      };
      const createdApp = await submitApplication(appData);
      showToast(`Application ${createdApp.id} submitted successfully!`, "success");
      navigate(`/student/applications/${createdApp.id}`);
    } catch (err) {
      showToast(err.message || "Failed to submit application. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-brand-600 dark:text-brand-400">
          Online Admission Form
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Application for Student Admission
        </h1>
        <p className="text-xs text-slate-500">
          Please fill in all sections accurately. Documents will be saved directly to your profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* SECTION 1: PERSONAL INFORMATION */}
        <Card className="p-8 border-t-4 border-t-brand-600">
          <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">1. Personal Information</h3>
              <p className="text-[11px] text-slate-400">Student's legal name, birth, and contact address</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Student Full Name"
              required
              placeholder="e.g. Rahul Sharma"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            />

            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Date of Birth"
                type="date"
                required
                value={form.dateOfBirth}
                onChange={(e) => setForm({ ...form, dateOfBirth: e.target.value })}
              />
              <Select
                label="Gender"
                required
                placeholder=""
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
                options={['Male', 'Female', 'Other']}
              />
            </div>

            <Input
              label="Student Email"
              type="email"
              required
              placeholder="student@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />

            <Input
              label="Phone Number"
              type="tel"
              required
              placeholder="+1 (555) 000-0000"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              label="City"
              required
              placeholder="Metro City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />
            <Input
              label="State / Province"
              required
              placeholder="State"
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            />
            <Input
              label="PIN / Zip Code"
              required
              placeholder="560001"
              value={form.pinCode}
              onChange={(e) => setForm({ ...form, pinCode: e.target.value })}
            />
          </div>

          <div className="mt-4">
            <Input
              label="Full Residential Address"
              required
              placeholder="House/Apt No, Street Name, Landmark"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
        </Card>

        {/* SECTION 2: PARENT / GUARDIAN INFORMATION */}
        <Card className="p-8 border-t-4 border-t-emerald-600">
          <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">2. Parent / Guardian Information</h3>
              <p className="text-[11px] text-slate-400">Parents' names and emergency phone details</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Father's Full Name"
              required
              placeholder="Father's Name"
              value={form.fatherName}
              onChange={(e) => setForm({ ...form, fatherName: e.target.value })}
            />
            <Input
              label="Mother's Full Name"
              required
              placeholder="Mother's Name"
              value={form.motherName}
              onChange={(e) => setForm({ ...form, motherName: e.target.value })}
            />
            <Input
              label="Guardian Contact Phone"
              type="tel"
              required
              placeholder="+1 (555) 987-6543"
              value={form.guardianPhone}
              onChange={(e) => setForm({ ...form, guardianPhone: e.target.value })}
            />
            <Input
              label="Guardian Email Address"
              type="email"
              placeholder="parent@example.com"
              value={form.guardianEmail}
              onChange={(e) => setForm({ ...form, guardianEmail: e.target.value })}
            />
          </div>
        </Card>

        {/* SECTION 3: ACADEMIC HISTORY & SELECTION */}
        <Card className="p-8 border-t-4 border-t-amber-500">
          <div className="flex items-center space-x-3 mb-6 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">3. Academic Record & Class Choice</h3>
              <p className="text-[11px] text-slate-400">Previous school performance and desired grade level</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Previous School Name"
              required
              placeholder="St. Jude Grammar School"
              value={form.previousSchool}
              onChange={(e) => setForm({ ...form, previousSchool: e.target.value })}
            />
            <Input
              label="Last Class Completed"
              required
              placeholder="Grade 8"
              value={form.previousClass}
              onChange={(e) => setForm({ ...form, previousClass: e.target.value })}
            />
            <Input
              label="Overall Percentage / GPA"
              required
              placeholder="e.g. 94.5%"
              value={form.percentage}
              onChange={(e) => setForm({ ...form, percentage: e.target.value })}
            />
            <Select
              label="Applying For Class / Course"
              required
              placeholder="Select Target Course / Grade"
              value={form.classApplied}
              onChange={(e) => setForm({ ...form, classApplied: e.target.value })}
              options={courses.length > 0 ? courses : [
                "Primary Elementary Program (Grades 1 - 5)",
                "Middle Years IB & National Prep (Grades 6 - 8)",
                "Senior High Science Stream (Grades 9 - 12)",
                "Senior High Commerce & Economics (Grades 9 - 12)",
                "Humanities & Liberal Arts (Grades 9 - 12)"
              ]}
            />
          </div>
        </Card>

        {/* SECTION 4: REAL FIREBASE DOCUMENTS UPLOAD */}
        <Card className="p-8 border-t-4 border-t-indigo-500 space-y-4">
          <div className="flex items-center space-x-3 mb-4 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
              <FileUp className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">4. Upload Documents & Note</h3>
              <p className="text-[11px] text-slate-400">Attach report cards, birth certificate, and optional message</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider">
              Attach Supporting Documents (PDF, PNG, JPG - Max 10MB each)
            </label>

            <div className="flex items-center justify-center w-full">
              <label className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-2xl cursor-pointer transition-colors ${
                uploadingDoc ? 'border-brand-500 bg-brand-50/20' : 'border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}>
                {uploadingDoc ? (
                  <div className="flex flex-col items-center space-y-2">
                    <Loader2 className="w-6 h-6 text-brand-600 animate-spin" />
                    <span className="text-xs font-bold text-brand-600">Uploading to Firebase Storage ({uploadProgress}%)...</span>
                  </div>
                ) : (
                  <>
                    <Paperclip className="w-6 h-6 text-slate-400 mb-2" />
                    <span className="text-xs font-bold text-brand-600 dark:text-brand-400">Click to browse & upload files</span>
                    <span className="text-[11px] text-slate-400 mt-0.5">Birth certificate, report cards, TC (PDF, JPG, PNG)</span>
                  </>
                )}
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={uploadingDoc}
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </label>
            </div>

            {documents.length > 0 && (
              <div className="mt-4 space-y-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
                  Uploaded Documents ({documents.length}):
                </span>
                {documents.map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center space-x-2 truncate">
                      <FileText className="w-4 h-4 text-brand-500 shrink-0" />
                      <a
                        href={doc.downloadURL}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-brand-600 dark:text-brand-400 hover:underline truncate"
                      >
                        {doc.name}
                      </a>
                      <span className="text-slate-400 text-[11px]">({doc.size})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDoc(idx)}
                      className="p-1 text-rose-500 hover:text-rose-700 transition-colors"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <TextArea
            label="Additional Statement / Remarks"
            rows={4}
            placeholder="Mention any special academic achievements, sports accomplishments, or specific questions..."
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end pt-4">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            isLoading={submitting}
            icon={Send}
            className="px-10 shadow-xl"
          >
            Submit Application Form
          </Button>
        </div>

      </form>
    </div>
  );
};
