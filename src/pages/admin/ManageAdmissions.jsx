import React, { useState, useEffect } from 'react';
import { getApplications, updateApplicationStatus, deleteItem } from '../../services/dataService';
import { Card, Badge } from '../../components/common/Card';
import { Table, Loader, EmptyState } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select, TextArea } from '../../components/common/Select';
import { Modal, ConfirmModal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { Search, Eye, Edit3, Trash2, FileText, Download } from 'lucide-react';

export const ManageAdmissions = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  const [selectedApp, setSelectedApp] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [editStatusModal, setEditStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');
  const [adminNotes, setAdminNotes] = useState('');
  const [deleteModal, setDeleteModal] = useState(false);

  const { showToast } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      const list = await getApplications();
      setApplications(list);
    } catch (err) {
      showToast("Failed to load admissions applications.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenEditStatus = (app) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setAdminNotes(app.adminNotes || '');
    setEditStatusModal(true);
  };

  const handleSaveStatus = async () => {
    if (!selectedApp) return;
    try {
      await updateApplicationStatus(selectedApp.id, newStatus, adminNotes);
      showToast(`Updated application ${selectedApp.id} status to ${newStatus}`, "success");
      setEditStatusModal(false);
      loadData();
    } catch (err) {
      showToast("Failed to update status. Please try again.", "error");
    }
  };

  const handleDelete = async () => {
    if (!selectedApp) return;
    try {
      await deleteItem('applications', 'applications', selectedApp.id);
      showToast(`Deleted application ${selectedApp.id}`, "info");
      setDeleteModal(false);
      loadData();
    } catch (err) {
      showToast("Failed to delete application.", "error");
    }
  };

  const filteredApps = applications.filter(a => {
    const matchesSearch = (a.fullName || '').toLowerCase().includes(search.toLowerCase()) ||
                          (a.email || '').toLowerCase().includes(search.toLowerCase()) ||
                          (a.id || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? a.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <Loader message="Loading admission applications database..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">
            Manage Admission Applications
          </h1>
          <p className="text-xs text-slate-400">
            Review, approve, reject, or update student admission submissions.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="sm:col-span-2">
          <Input
            placeholder="Search by student name, email, or application ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={Search}
          />
        </div>
        <Select
          placeholder="All Statuses"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={['Pending', 'Under Review', 'Approved', 'Rejected']}
        />
      </div>

      {filteredApps.length === 0 ? (
        <EmptyState title="No Applications Found" description="No admission applications match your query." />
      ) : (
        <Table headers={["ID", "Student Name", "Email", "Phone", "Class Applied", "Date", "Status", "Actions"]}>
          {filteredApps.map((app) => (
            <tr key={app.id} className="border-b border-slate-800 hover:bg-slate-800/60">
              <td className="px-6 py-4 font-mono font-bold text-xs text-brand-400">{app.id}</td>
              <td className="px-6 py-4 text-xs font-bold text-white">{app.fullName}</td>
              <td className="px-6 py-4 text-xs text-slate-300">{app.email}</td>
              <td className="px-6 py-4 text-xs text-slate-400">{app.phone}</td>
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
                    onClick={() => { setSelectedApp(app); setViewModal(true); }}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleOpenEditStatus(app)}
                    className="p-1.5 rounded-lg bg-brand-900/60 hover:bg-brand-800 text-brand-300"
                    title="Update Status"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => { setSelectedApp(app); setDeleteModal(true); }}
                    className="p-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-300"
                    title="Delete Application"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}

      {/* Edit Status Modal */}
      <Modal
        isOpen={editStatusModal}
        onClose={() => setEditStatusModal(false)}
        title={`Update Application Status - ${selectedApp?.id}`}
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <Select
            label="Application Status"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            options={['Pending', 'Under Review', 'Approved', 'Rejected']}
          />
          <TextArea
            label="Admin Notes / Internal Feedback"
            rows={3}
            placeholder="Add notes visible to student..."
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
          />
          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" onClick={() => setEditStatusModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveStatus}>
              Save Status
            </Button>
          </div>
        </div>
      </Modal>

      {/* View Details Modal */}
      <Modal
        isOpen={viewModal}
        onClose={() => setViewModal(false)}
        title={`Application Overview - ${selectedApp?.id}`}
        maxWidth="max-w-2xl"
      >
        {selectedApp && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-800 text-slate-200">
              <div>Applicant Name: <strong className="text-white">{selectedApp.fullName}</strong></div>
              <div>Email: <strong>{selectedApp.email}</strong></div>
              <div>Phone: <strong>{selectedApp.phone}</strong></div>
              <div>Date of Birth: <strong>{selectedApp.dateOfBirth}</strong></div>
              <div>Previous School: <strong>{selectedApp.previousSchool}</strong></div>
              <div>Percentage / GPA: <strong>{selectedApp.percentage}</strong></div>
              <div className="col-span-2">Class Applied: <strong className="text-brand-400">{selectedApp.classApplied}</strong></div>
              <div>Father: <strong>{selectedApp.fatherName}</strong></div>
              <div>Mother: <strong>{selectedApp.motherName}</strong></div>
              <div>Guardian Phone: <strong>{selectedApp.guardianPhone}</strong></div>
              <div>Submitted: <strong>{selectedApp.submittedAt ? new Date(selectedApp.submittedAt).toLocaleString() : 'N/A'}</strong></div>
            </div>

            {selectedApp.documents && selectedApp.documents.length > 0 && (
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
                <span className="font-bold text-slate-300 block">Uploaded Storage Documents ({selectedApp.documents.length}):</span>
                <div className="flex flex-wrap gap-2">
                  {selectedApp.documents.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.downloadURL && doc.downloadURL !== '#' ? doc.downloadURL : '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-brand-300 text-xs font-semibold flex items-center space-x-1.5"
                    >
                      <FileText className="w-3.5 h-3.5 text-brand-400" />
                      <span>{doc.name} {doc.size ? `(${doc.size})` : ''}</span>
                      <Download className="w-3 h-3 text-slate-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {selectedApp.message && (
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="font-bold text-slate-300 block mb-1">Student Message:</span>
                <p className="text-slate-400">{selectedApp.message}</p>
              </div>
            )}
          </div>
        )}
      </Modal>

      {/* Delete Confirm */}
      <ConfirmModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Admission Record"
        message={`Are you sure you want to permanently delete application ${selectedApp?.id}? This action cannot be reverted.`}
      />
    </div>
  );
};
