import React, { useState, useEffect } from 'react';
import { getCollectionData, addItem, updateItem, deleteItem } from '../../services/dataService';
import { uploadSchoolImage, deleteStorageFile } from '../../services/storageService';
import { Table, Loader } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select, TextArea } from '../../components/common/Select';
import { Modal, ConfirmModal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { Plus, Edit3, Trash2, Upload, Loader2 } from 'lucide-react';

export const ManageAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [form, setForm] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    category: 'Academic',
    image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80',
    storagePath: ''
  });

  const { showToast } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      const list = await getCollectionData('achievements', 'achievements');
      setAchievements(list);
    } catch (err) {
      showToast("Failed to load achievements.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleOpenAdd = () => {
    setActiveItem(null);
    setForm({
      title: '',
      description: '',
      date: new Date().toISOString().split('T')[0],
      category: 'Academic',
      image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?auto=format&fit=crop&w=800&q=80',
      storagePath: ''
    });
    setModalOpen(true);
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(10);
    try {
      const uploadRes = await uploadSchoolImage(file, 'achievements', (p) => setProgress(p));
      setForm(prev => ({
        ...prev,
        image: uploadRes.downloadURL,
        storagePath: uploadRes.path
      }));
      showToast("Achievement image uploaded to Storage!", "success");
    } catch (err) {
      showToast(err.message || "Failed to upload image.", "error");
    } finally {
      setUploading(false);
      setProgress(0);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description) {
      showToast("Title and description are required.", "error");
      return;
    }

    try {
      if (activeItem) {
        await updateItem('achievements', 'achievements', activeItem.id, form);
        showToast("Achievement record updated!", "success");
      } else {
        await addItem('achievements', 'achievements', form);
        showToast("Achievement record created!", "success");
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      showToast("Failed to save achievement.", "error");
    }
  };

  const handleDelete = async () => {
    if (!activeItem) return;
    try {
      if (activeItem.storagePath) {
        await deleteStorageFile(activeItem.storagePath);
      }
      await deleteItem('achievements', 'achievements', activeItem.id);
      showToast("Achievement deleted.", "info");
      setDeleteModal(false);
      loadData();
    } catch (err) {
      showToast("Failed to delete achievement.", "error");
    }
  };

  if (loading) return <Loader message="Loading achievement records..." />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Achievements</h1>
          <p className="text-xs text-slate-400">Add, edit, or remove student and institutional awards.</p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>Add Achievement</Button>
      </div>

      <Table headers={["Title", "Category", "Date Awarded", "Description", "Actions"]}>
        {achievements.map((ach) => (
          <tr key={ach.id} className="border-b border-slate-800 hover:bg-slate-800/60">
            <td className="px-6 py-4 text-xs font-bold text-white">{ach.title}</td>
            <td className="px-6 py-4 text-xs font-semibold text-amber-400">{ach.category}</td>
            <td className="px-6 py-4 text-xs text-slate-400">{ach.date}</td>
            <td className="px-6 py-4 text-xs text-slate-300 max-w-xs truncate">{ach.description}</td>
            <td className="px-6 py-4">
              <div className="flex items-center space-x-2">
                <button onClick={() => { setActiveItem(ach); setForm({ ...ach }); setModalOpen(true); }} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => { setActiveItem(ach); setDeleteModal(true); }} className="p-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={activeItem ? "Edit Achievement" : "Add Achievement Record"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Title" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Select label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} options={['Academic', 'Institutional', 'Technology', 'Sports']} />
            <Input label="Date Awarded" type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">Image (Upload or URL)</label>
            <div className="flex items-center space-x-4">
              {form.image && (
                <img src={form.image} alt="Preview" className="w-16 h-12 object-cover rounded-lg border border-slate-700 bg-slate-800 shrink-0" />
              )}
              <label className="flex items-center space-x-2 px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-brand-300 cursor-pointer border border-slate-700 transition-colors">
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-brand-400" />
                    <span>Uploading ({progress}%)...</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 text-brand-400" />
                    <span>Upload Image File</span>
                  </>
                )}
                <input type="file" accept="image/*" disabled={uploading} onChange={handleImageFileChange} className="hidden" />
              </label>
            </div>
            <Input label="Direct Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          </div>

          <TextArea label="Description" rows={3} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" isLoading={uploading}>Save Record</Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal isOpen={deleteModal} onClose={() => setDeleteModal(false)} onConfirm={handleDelete} title="Delete Record" message={`Delete achievement "${activeItem?.title}"?`} />
    </div>
  );
};

export default ManageAchievements;
