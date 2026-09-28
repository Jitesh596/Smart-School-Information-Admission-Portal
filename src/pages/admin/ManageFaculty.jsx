import React, { useState, useEffect } from 'react';
import { getCollectionData, addItem, updateItem, deleteItem } from '../../services/dataService';
import { uploadSchoolImage, deleteStorageFile } from '../../services/storageService';
import { Table, Loader } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { TextArea } from '../../components/common/Select';
import { Modal, ConfirmModal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { Plus, Edit3, Trash2, Upload, Loader2 } from 'lucide-react';

export const ManageFaculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [form, setForm] = useState({
    name: '',
    subject: '',
    qualification: '',
    experience: '5 Years',
    email: '',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    storagePath: '',
    description: ''
  });

  const { showToast } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      const list = await getCollectionData('faculty', 'faculty');
      setFaculty(list);
    } catch (err) {
      showToast("Failed to load faculty directory.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleOpenAdd = () => {
    setActiveItem(null);
    setForm({
      name: '',
      subject: '',
      qualification: '',
      experience: '5 Years',
      email: '',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      storagePath: '',
      description: ''
    });
    setModalOpen(true);
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setProgress(10);
    try {
      const uploadRes = await uploadSchoolImage(file, 'faculty', (p) => setProgress(p));
      setForm(prev => ({
        ...prev,
        image: uploadRes.downloadURL,
        storagePath: uploadRes.path
      }));
      showToast("Faculty photo uploaded to Firebase Storage!", "success");
    } catch (err) {
      showToast(err.message || "Failed to upload photo.", "error");
    } finally {
      setUploading(false);
      setProgress(0);
      e.target.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.subject || !form.email) {
      showToast("Name, subject, and email are required.", "error");
      return;
    }

    try {
      if (activeItem) {
        await updateItem('faculty', 'faculty', activeItem.id, form);
        showToast("Faculty member updated!", "success");
      } else {
        await addItem('faculty', 'faculty', form);
        showToast("New faculty member added!", "success");
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      showToast("Failed to save faculty record.", "error");
    }
  };

  const handleDelete = async () => {
    if (!activeItem) return;
    try {
      if (activeItem.storagePath) {
        await deleteStorageFile(activeItem.storagePath);
      }
      await deleteItem('faculty', 'faculty', activeItem.id);
      showToast("Faculty member removed.", "info");
      setDeleteModal(false);
      loadData();
    } catch (err) {
      showToast("Failed to remove faculty member.", "error");
    }
  };

  if (loading) return <Loader message="Loading faculty directory..." />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Faculty Members</h1>
          <p className="text-xs text-slate-400">Add, edit, or remove teacher and mentor profiles.</p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>Add Faculty</Button>
      </div>

      <Table headers={["Teacher Name", "Subject Specialization", "Qualification", "Experience", "Email", "Actions"]}>
        {faculty.map((fac) => (
          <tr key={fac.id} className="border-b border-slate-800 hover:bg-slate-800/60">
            <td className="px-6 py-4 text-xs font-bold text-white flex items-center space-x-2">
              <img src={fac.image} alt={fac.name} className="w-8 h-8 rounded-full object-cover bg-slate-800" />
              <span>{fac.name}</span>
            </td>
            <td className="px-6 py-4 text-xs font-semibold text-brand-400">{fac.subject}</td>
            <td className="px-6 py-4 text-xs text-slate-300">{fac.qualification}</td>
            <td className="px-6 py-4 text-xs text-slate-400">{fac.experience}</td>
            <td className="px-6 py-4 text-xs text-slate-300">{fac.email}</td>
            <td className="px-6 py-4">
              <div className="flex items-center space-x-2">
                <button onClick={() => { setActiveItem(fac); setForm({ ...fac }); setModalOpen(true); }} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => { setActiveItem(fac); setDeleteModal(true); }} className="p-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={activeItem ? "Edit Faculty Member" : "Add Faculty Member"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Full Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Subject Specialization" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
            <Input label="Qualification" required value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Experience" required value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
            <Input label="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-300">Photo (Upload or URL)</label>
            <div className="flex items-center space-x-4">
              {form.image && (
                <img src={form.image} alt="Preview" className="w-12 h-12 rounded-full object-cover border border-slate-700 bg-slate-800 shrink-0" />
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
                    <span>Upload Photo</span>
                  </>
                )}
                <input type="file" accept="image/*" disabled={uploading} onChange={handleImageFileChange} className="hidden" />
              </label>
            </div>
            <Input label="Direct Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          </div>

          <TextArea label="Bio / Description" rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          
          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" isLoading={uploading}>Save Faculty</Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal isOpen={deleteModal} onClose={() => setDeleteModal(false)} onConfirm={handleDelete} title="Delete Faculty Member" message={`Remove ${activeItem?.name} from faculty directory?`} />
    </div>
  );
};
