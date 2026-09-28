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

export const ManageFacilities = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const [form, setForm] = useState({
    name: '',
    category: 'Academic',
    description: '',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    storagePath: ''
  });

  const { showToast } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      const list = await getCollectionData('facilities', 'facilities');
      setFacilities(list);
    } catch (err) {
      showToast("Failed to load facilities.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, []);

  const handleOpenAdd = () => {
    setActiveItem(null);
    setForm({
      name: '',
      category: 'Academic',
      description: '',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
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
      const uploadRes = await uploadSchoolImage(file, 'facilities', (p) => setProgress(p));
      setForm(prev => ({
        ...prev,
        image: uploadRes.downloadURL,
        storagePath: uploadRes.path
      }));
      showToast("Facility photo uploaded to Storage!", "success");
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
    if (!form.name || !form.description) {
      showToast("Facility name and description are required.", "error");
      return;
    }

    try {
      if (activeItem) {
        await updateItem('facilities', 'facilities', activeItem.id, form);
        showToast("Facility updated!", "success");
      } else {
        await addItem('facilities', 'facilities', form);
        showToast("Facility added!", "success");
      }
      setModalOpen(false);
      loadData();
    } catch (err) {
      showToast("Failed to save facility.", "error");
    }
  };

  const handleDelete = async () => {
    if (!activeItem) return;
    try {
      if (activeItem.storagePath) {
        await deleteStorageFile(activeItem.storagePath);
      }
      await deleteItem('facilities', 'facilities', activeItem.id);
      showToast("Facility removed.", "info");
      setDeleteModal(false);
      loadData();
    } catch (err) {
      showToast("Failed to delete facility.", "error");
    }
  };

  if (loading) return <Loader message="Loading facility records..." />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Campus Facilities</h1>
          <p className="text-xs text-slate-400">Add, edit, or remove labs, sports fields, and studios.</p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>Add Facility</Button>
      </div>

      <Table headers={["Facility Name", "Category", "Description Preview", "Actions"]}>
        {facilities.map((facil) => (
          <tr key={facil.id} className="border-b border-slate-800 hover:bg-slate-800/60">
            <td className="px-6 py-4 text-xs font-bold text-white">{facil.name}</td>
            <td className="px-6 py-4 text-xs font-semibold text-emerald-400">{facil.category}</td>
            <td className="px-6 py-4 text-xs text-slate-300 max-w-xs truncate">{facil.description}</td>
            <td className="px-6 py-4">
              <div className="flex items-center space-x-2">
                <button onClick={() => { setActiveItem(facil); setForm({ ...facil }); setModalOpen(true); }} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => { setActiveItem(facil); setDeleteModal(true); }} className="p-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={activeItem ? "Edit Facility" : "Add Facility"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Facility Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <Select label="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} options={['Academic', 'Sports', 'Arts', 'Amenities']} />
          
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
            <Button type="submit" variant="primary" isLoading={uploading}>Save Facility</Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal isOpen={deleteModal} onClose={() => setDeleteModal(false)} onConfirm={handleDelete} title="Delete Facility" message={`Remove facility "${activeItem?.name}"?`} />
    </div>
  );
};
