import React, { useState, useEffect } from 'react';
import { getAllUsers, deleteItem, saveUserProfile, getApplications } from '../../services/dataService';
import { Card, Badge } from '../../components/common/Card';
import { Table, Loader } from '../../components/common/Table';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';
import { Modal, ConfirmModal } from '../../components/common/Modal';
import { useToast } from '../../context/ToastContext';
import { Search, Eye, Edit3, Trash2, Ban, CheckCircle, FileSpreadsheet } from 'lucide-react';

export const ManageStudents = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  
  const [selectedUser, setSelectedUser] = useState(null);
  const [userApplications, setUserApplications] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  
  const { showToast } = useToast();

  const loadUsers = async () => {
    setLoading(true);
    try {
      const list = await getAllUsers();
      setUsers(list);
    } catch (err) {
      showToast("Failed to load users directory.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleOpenView = async (user) => {
    setSelectedUser(user);
    setViewModal(true);
    try {
      const apps = await getApplications(user.uid);
      setUserApplications(apps);
    } catch (err) {
      setUserApplications([]);
    }
  };

  const handleToggleDisable = async (user) => {
    const updated = { ...user, disabled: !user.disabled };
    try {
      await saveUserProfile(updated);
      showToast(`User ${user.name} has been ${updated.disabled ? 'deactivated' : 'activated'}.`, "info");
      loadUsers();
    } catch (err) {
      showToast("Failed to update user status.", "error");
    }
  };

  const handleSaveEdit = async () => {
    if (!selectedUser) return;
    try {
      await saveUserProfile(selectedUser);
      showToast(`Updated profile for ${selectedUser.name}`, "success");
      setEditModal(false);
      loadUsers();
    } catch (err) {
      showToast("Failed to update user profile.", "error");
    }
  };

  const handleDelete = async () => {
    if (!selectedUser) return;
    try {
      await deleteItem('users', 'users', selectedUser.uid);
      showToast(`Removed user ${selectedUser.email}`, "info");
      setDeleteModal(false);
      loadUsers();
    } catch (err) {
      showToast("Failed to delete user.", "error");
    }
  };

  const filteredUsers = users.filter(u =>
    (u.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (u.phone || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loader message="Loading student user directory..." />;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-extrabold text-white">
            Manage Registered Students & Users
          </h1>
          <p className="text-xs text-slate-400">
            Search student records, view application history, edit profile details, or deactivate accounts.
          </p>
        </div>
      </div>

      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800">
        <Input
          placeholder="Search student by name, email, or phone number..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          icon={Search}
        />
      </div>

      <Table headers={["User UID", "Full Name", "Email Address", "Phone", "Role", "Status", "Registered Date", "Actions"]}>
        {filteredUsers.map((u) => (
          <tr key={u.uid} className="border-b border-slate-800 hover:bg-slate-800/60">
            <td className="px-6 py-4 font-mono font-bold text-xs text-brand-400 truncate max-w-[110px]">{u.uid}</td>
            <td className="px-6 py-4 text-xs font-bold text-white">{u.name}</td>
            <td className="px-6 py-4 text-xs text-slate-300">{u.email}</td>
            <td className="px-6 py-4 text-xs text-slate-400">{u.phone || "N/A"}</td>
            <td className="px-6 py-4">
              <Badge variant={u.role === 'admin' ? 'danger' : 'success'}>
                {u.role}
              </Badge>
            </td>
            <td className="px-6 py-4">
              <Badge variant={u.disabled ? 'danger' : 'success'}>
                {u.disabled ? 'Disabled' : 'Active'}
              </Badge>
            </td>
            <td className="px-6 py-4 text-xs text-slate-400">
              {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Active'}
            </td>
            <td className="px-6 py-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleOpenView(u)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="View Profile & Applications"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { setSelectedUser({ ...u }); setEditModal(true); }}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Edit Profile"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleToggleDisable(u)}
                  className={`p-1.5 rounded-lg ${u.disabled ? 'bg-emerald-900/60 text-emerald-300' : 'bg-amber-900/60 text-amber-300'}`}
                  title={u.disabled ? "Re-activate Account" : "Deactivate Account"}
                >
                  {u.disabled ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => { setSelectedUser(u); setDeleteModal(true); }}
                  className="p-1.5 rounded-lg bg-rose-900/60 hover:bg-rose-800 text-rose-300"
                  title="Delete Account"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </Table>

      {/* View Details & Application History Modal */}
      <Modal
        isOpen={viewModal}
        onClose={() => setViewModal(false)}
        title={`Student Profile & History - ${selectedUser?.name}`}
        maxWidth="max-w-xl"
      >
        {selectedUser && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-4 rounded-xl bg-slate-800 text-slate-200">
              <div>UID: <strong className="font-mono text-white block mt-0.5">{selectedUser.uid}</strong></div>
              <div>Role: <strong className="text-white block mt-0.5 capitalize">{selectedUser.role}</strong></div>
              <div>Full Name: <strong className="text-white block mt-0.5">{selectedUser.name}</strong></div>
              <div>Email: <strong className="text-white block mt-0.5">{selectedUser.email}</strong></div>
              <div>Phone: <strong className="text-white block mt-0.5">{selectedUser.phone || 'N/A'}</strong></div>
              <div>Registered Date: <strong className="text-white block mt-0.5">{selectedUser.createdAt ? new Date(selectedUser.createdAt).toLocaleString() : 'Active'}</strong></div>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 space-y-2">
              <span className="font-bold text-slate-300 flex items-center">
                <FileSpreadsheet className="w-4 h-4 mr-1.5 text-brand-400" />
                Admission Application History ({userApplications.length}):
              </span>
              {userApplications.length === 0 ? (
                <p className="text-slate-400 italic text-[11px]">No admission applications submitted yet by this user.</p>
              ) : (
                <div className="space-y-2">
                  {userApplications.map(app => (
                    <div key={app.id} className="p-2.5 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-between">
                      <div>
                        <span className="font-mono font-bold text-brand-400">{app.id}</span>
                        <span className="text-slate-300 block">{app.classApplied}</span>
                      </div>
                      <Badge variant={app.status === 'Approved' ? 'success' : app.status === 'Rejected' ? 'danger' : 'warning'}>
                        {app.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Edit User Modal */}
      <Modal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        title="Edit Permitted Profile Fields"
        maxWidth="max-w-md"
      >
        {selectedUser && (
          <div className="space-y-4">
            <Input
              label="Full Name"
              value={selectedUser.name || ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
            />
            <Input
              label="Phone Number"
              value={selectedUser.phone || ''}
              onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
            />
            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" onClick={() => setEditModal(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete User Confirm */}
      <ConfirmModal
        isOpen={deleteModal}
        onClose={() => setDeleteModal(false)}
        onConfirm={handleDelete}
        title="Delete User Record"
        message={`Are you sure you want to delete ${selectedUser?.name} (${selectedUser?.email})?`}
      />
    </div>
  );
};
