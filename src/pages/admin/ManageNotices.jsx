import React, { useState, useEffect } from 'react';
import { getCollectionData, addItem, updateItem, deleteItem } from '../../services/dataService';
import { Table, Loader, EmptyState } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select, TextArea } from '../../components/common/Select';
import { Modal, ConfirmModal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Card';
import { useToast } from '../../context/ToastContext';
import { Plus, Edit3, Trash2, Bell } from 'lucide-react';

export const ManageNotices = () => {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editNotice, setEditNotice] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Admissions',
    status: 'Active',
    important: false
  });

  const { showToast } = useToast();

  const loadNotices = async () => {
    const list = await getCollectionData('notices', 'notices');
    setNotices(list);
    setLoading(false);
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const handleOpenAdd = () => {
    setEditNotice(null);
    setForm({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Admissions',
      status: 'Active',
      important: false
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (n) => {
    setEditNotice(n);
    setForm({ ...n });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editNotice) {
      await updateItem('notices', 'notices', editNotice.id, form);
      showToast("Notice updated successfully!", "success");
    } else {
      await addItem('notices', 'notices', form);
      showToast("New notice published!", "success");
    }
    setModalOpen(false);
    loadNotices();
  };

  const handleDelete = async () => {
    if (!editNotice) return;
    await deleteItem('notices', 'notices', editNotice.id);
    showToast("Notice deleted.", "info");
    setDeleteModal(false);
    loadNotices();
  };

  if (loading) return <Loader message="Loading notice board items..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">
            Manage School Notices
          </h1>
          <p className="text-xs text-slate-400">
            Create, update, or remove circulars displayed on the public noticeboard.
          </p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>
          Add New Notice
        </Button>
      </div>

      <Table headers={["Title", "Category", "Date Published", "Status", "Urgent", "Actions"]}>
        {notices.map((n) => (
          <tr key={n.id} className="border-b border-slate-800 hover:bg-slate-800/60">
            <td className="px-6 py-4 text-xs font-bold text-white max-w-xs truncate">{n.title}</td>
            <td className="px-6 py-4 text-xs text-slate-300">{n.category}</td>
            <td className="px-6 py-4 text-xs text-slate-400">{n.date}</td>
            <td className="px-6 py-4">
              <Badge variant={n.status === 'Active' ? 'success' : 'default'}>
                {n.status}
              </Badge>
            </td>
            <td className="px-6 py-4 text-xs">
              {n.important ? <span className="text-rose-400 font-bold">YES</span> : <span className="text-slate-500">NO</span>}
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOpenEdit(n)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setEditNotice(n); setDeleteModal(true); }}
                  className="p-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-300"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      {/* Notice Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editNotice ? "Edit Notice" : "Create New Notice"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Notice Title"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              options={['Admissions', 'Academics', 'Exams', 'Sports', 'General']}
            />
            <Input
              label="Publish Date"
              type="date"
              required
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
            />
          </div>
          <TextArea
            label="Notice Description"
            rows={4}
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="flex items-center space-x-2 pt-1">
            <input
              type="checkbox"
              id="imp-check"
              checked={form.important}
              onChange={(e) => setForm({ ...form, important: e.target.checked })}
              className="rounded border-slate-700 text-brand-600"
            />
            <label htmlFor="imp-check" className="text-xs font-semibold text-slate-300 cursor-pointer">
              Mark as Urgent / Important Notification
            </label>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Save Notice</Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete Notice"
        message={`Delete notice "${editNotice?.title}"?`}
      />
    </div>
  );
};
