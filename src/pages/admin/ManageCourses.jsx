import React, { useState, useEffect } from 'react';
import { getCollectionData, addItem, updateItem, deleteItem } from '../../services/dataService';
import { Table, Loader } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Select, TextArea } from '../../components/common/Select';
import { Modal, ConfirmModal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { Plus, Edit3, Trash2 } from 'lucide-react';

export const ManageCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);

  const [form, setForm] = useState({
    name: '',
    code: 'CRS-101',
    level: 'Primary',
    duration: '1 Academic Year',
    description: '',
    subjectsStr: 'English, Mathematics, Science'
  });

  const { showToast } = useToast();

  const loadData = async () => {
    const list = await getCollectionData('courses', 'courses');
    setCourses(list);
    setLoading(false);
  };

  useEffect(() => { loadData(); }, []);

  const handleOpenAdd = () => {
    setActiveItem(null);
    setForm({
      name: '',
      code: 'CRS-101',
      level: 'Primary',
      duration: '1 Academic Year',
      description: '',
      subjectsStr: 'English, Mathematics, Science'
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subjects = form.subjectsStr.split(',').map(s => s.trim()).filter(Boolean);
    const dataToSave = { ...form, subjects };

    if (activeItem) {
      await updateItem('courses', 'courses', activeItem.id, dataToSave);
      showToast("Course program updated!", "success");
    } else {
      await addItem('courses', 'courses', dataToSave);
      showToast("New course program added!", "success");
    }
    setModalOpen(false);
    loadData();
  };

  const handleDelete = async () => {
    if (!activeItem) return;
    await deleteItem('courses', 'courses', activeItem.id);
    showToast("Course deleted.", "info");
    setDeleteModal(false);
    loadData();
  };

  if (loading) return <Loader message="Loading courses catalog..." />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Manage Academic Courses</h1>
          <p className="text-xs text-slate-400">Add, edit, or delete stream curricula and subject offerings.</p>
        </div>
        <Button variant="primary" size="sm" icon={Plus} onClick={handleOpenAdd}>Add Course</Button>
      </div>

      <Table headers={["Code", "Course Title", "Level", "Duration", "Actions"]}>
        {courses.map((c) => (
          <tr key={c.id} className="border-b border-slate-800 hover:bg-slate-800/60">
            <td className="px-6 py-4 font-mono font-bold text-xs text-brand-400">{c.code}</td>
            <td className="px-6 py-4 text-xs font-bold text-white">{c.name}</td>
            <td className="px-6 py-4 text-xs text-slate-300">{c.level}</td>
            <td className="px-6 py-4 text-xs text-slate-400">{c.duration}</td>
            <td className="px-6 py-4">
              <div className="flex items-center space-x-2">
                <button onClick={() => { setActiveItem(c); setForm({ ...c, subjectsStr: (c.subjects || []).join(', ') }); setModalOpen(true); }} className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button onClick={() => { setActiveItem(c); setDeleteModal(true); }} className="p-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-300">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={activeItem ? "Edit Course" : "Add New Course"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input label="Course Name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <div className="grid grid-cols-3 gap-4">
            <Input label="Course Code" required value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} />
            <Select label="Grade Level" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} options={['Primary', 'Middle', 'Secondary']} />
            <Input label="Duration" required value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} />
          </div>
          <Input label="Subjects Covered (Comma-separated)" required value={form.subjectsStr} onChange={(e) => setForm({ ...form, subjectsStr: e.target.value })} placeholder="Physics, Chemistry, Math" />
          <TextArea label="Description" rows={3} required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <div className="flex justify-end space-x-2 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary">Save Course</Button>
          </div>
        </form>
      </Modal>

      <ConfirmModal isOpen={deleteModal} onClose={() => setDeleteModal(false)} onConfirm={handleDelete} title="Delete Course" message={`Delete course "${activeItem?.name}"?`} />
    </div>
  );
};
