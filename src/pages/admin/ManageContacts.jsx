import React, { useState, useEffect } from 'react';
import { getContacts, updateContactStatus, deleteContact } from '../../services/dataService';
import { Table, Loader, EmptyState } from '../../components/common/Table';
import { Badge } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Modal, ConfirmModal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { Search, Mail, Eye, CheckCircle2, Trash2, Clock, Check } from 'lucide-react';

export const ManageContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const [selectedContact, setSelectedContact] = useState(null);
  const [viewModal, setViewModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);

  const { showToast } = useToast();

  const loadContacts = async () => {
    setLoading(true);
    try {
      const list = await getContacts();
      setContacts(list);
    } catch (err) {
      showToast("Failed to load contact inquiries.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateContactStatus(id, status);
      showToast(`Inquiry marked as ${status}`, "success");
      if (selectedContact?.id === id) {
        setSelectedContact(prev => prev ? { ...prev, status } : null);
      }
      loadContacts();
    } catch (err) {
      showToast("Failed to update inquiry status.", "error");
    }
  };

  const handleDelete = async () => {
    if (!selectedContact) return;
    try {
      await deleteContact(selectedContact.id);
      showToast("Contact inquiry deleted.", "info");
      setDeleteModal(false);
      loadContacts();
    } catch (err) {
      showToast("Failed to delete inquiry.", "error");
    }
  };

  const filteredContacts = contacts.filter(c => {
    const matchesSearch = (c.name || '').toLowerCase().includes(search.toLowerCase()) ||
                          (c.email || '').toLowerCase().includes(search.toLowerCase()) ||
                          (c.subject || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? c.status === statusFilter : true;
    return matchesSearch && matchesStatus;
  });

  if (loading) return <Loader message="Fetching contact inquiries..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Contact Inquiries Management</h1>
          <p className="text-xs text-slate-400">View, search, and respond to incoming visitor queries.</p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <div className="sm:col-span-2">
          <Input
            placeholder="Search inquiry by name, email, or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            icon={Search}
          />
        </div>
        <Select
          placeholder="All Statuses"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          options={['New', 'Read', 'Resolved']}
        />
      </div>

      {filteredContacts.length === 0 ? (
        <EmptyState
          icon={Mail}
          title="No Inquiries Found"
          description="There are no contact inquiries matching your search criteria."
        />
      ) : (
        <Table headers={["Date Received", "Sender Name", "Email", "Phone", "Subject", "Status", "Actions"]}>
          {filteredContacts.map((c) => (
            <tr key={c.id} className="border-b border-slate-800 hover:bg-slate-800/60">
              <td className="px-6 py-4 text-xs text-slate-400">
                {c.createdAt ? new Date(c.createdAt).toLocaleDateString() : 'Recent'}
              </td>
              <td className="px-6 py-4 text-xs font-bold text-white">{c.name}</td>
              <td className="px-6 py-4 text-xs text-slate-300">{c.email}</td>
              <td className="px-6 py-4 text-xs text-slate-400">{c.phone || "N/A"}</td>
              <td className="px-6 py-4 text-xs font-semibold text-brand-300 truncate max-w-xs">{c.subject}</td>
              <td className="px-6 py-4">
                <Badge variant={c.status === 'Resolved' ? 'success' : c.status === 'Read' ? 'info' : 'warning'}>
                  {c.status || 'New'}
                </Badge>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedContact(c);
                      setViewModal(true);
                      if (c.status === 'New') {
                        handleStatusChange(c.id, 'Read');
                      }
                    }}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                    title="View Message"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {c.status !== 'Resolved' && (
                    <button
                      onClick={() => handleStatusChange(c.id, 'Resolved')}
                      className="p-1.5 rounded-lg bg-emerald-900/60 hover:bg-emerald-800 text-emerald-300"
                      title="Mark as Resolved"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => { setSelectedContact(c); setDeleteModal(true); }}
                    className="p-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-300"
                    title="Delete Inquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </Table>
      )}

      {/* View Details Modal */}
      <Modal
        isOpen={viewModal}
        onClose={() => setViewModal(false)}
        title="Contact Inquiry Details"
        maxWidth="max-w-lg"
      >
        {selectedContact && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-800 text-slate-200">
              <div>Sender Name: <strong className="text-white block mt-0.5">{selectedContact.name}</strong></div>
              <div>Email Address: <strong className="text-white block mt-0.5">{selectedContact.email}</strong></div>
              <div>Phone Number: <strong className="text-white block mt-0.5">{selectedContact.phone || 'N/A'}</strong></div>
              <div>Received: <strong className="text-white block mt-0.5">{selectedContact.createdAt ? new Date(selectedContact.createdAt).toLocaleString() : 'N/A'}</strong></div>
              <div className="col-span-2">Subject: <strong className="text-brand-300 block mt-0.5">{selectedContact.subject}</strong></div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900 border border-slate-700 space-y-1">
              <span className="font-bold text-slate-300 block">Message:</span>
              <p className="text-slate-300 whitespace-pre-wrap leading-relaxed">{selectedContact.message}</p>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                <Button
                  variant={selectedContact.status === 'Read' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => handleStatusChange(selectedContact.id, 'Read')}
                >
                  Mark as Read
                </Button>
                <Button
                  variant={selectedContact.status === 'Resolved' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => handleStatusChange(selectedContact.id, 'Resolved')}
                >
                  Mark as Resolved
                </Button>
              </div>
              <Button variant="outline" size="sm" onClick={() => setViewModal(false)}>
                Close
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirm Modal */}
      <ConfirmModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Contact Inquiry"
        message={`Are you sure you want to delete inquiry from "${selectedContact?.name}"?`}
      />
    </div>
  );
};
