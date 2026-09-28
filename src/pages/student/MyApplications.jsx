import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getApplications } from '../../services/dataService';
import { Card, Badge } from '../../components/common/Card';
import { Table, Loader, EmptyState } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { PlusCircle, Eye, FileSpreadsheet } from 'lucide-react';

export const MyApplications = () => {
  const { currentUser } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      getApplications(currentUser.uid || currentUser.email).then(data => {
        setApplications(data);
        setLoading(false);
      });
    }
  }, [currentUser]);

  const getStatusVariant = (status) => {
    switch (status) {
      case 'Approved': return 'success';
      case 'Rejected': return 'danger';
      case 'Under Review': return 'warning';
      default: return 'info';
    }
  };

  if (loading) return <Loader message="Fetching your submitted applications..." />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            My Submitted Applications
          </h1>
          <p className="text-xs text-slate-500">
            View status updates and details of your school admission applications.
          </p>
        </div>
        <Link to="/student/apply">
          <Button variant="primary" size="sm" icon={PlusCircle}>
            New Application
          </Button>
        </Link>
      </div>

      {applications.length === 0 ? (
        <EmptyState
          icon={FileSpreadsheet}
          title="No Applications Found"
          description="You haven't submitted any admission applications yet."
          actionButton={
            <Link to="/student/apply">
              <Button variant="primary" size="sm">
                Apply for Admission Now
              </Button>
            </Link>
          }
        />
      ) : (
        <Table headers={["Application ID", "Student Name", "Class Applied", "Submitted Date", "Status", "Action"]}>
          {applications.map((app) => (
            <tr key={app.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
              <td className="px-6 py-4 font-mono font-bold text-slate-900 dark:text-white">
                {app.id}
              </td>
              <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-200">
                {app.fullName}
              </td>
              <td className="px-6 py-4 text-xs font-medium text-slate-600 dark:text-slate-300">
                {app.classApplied}
              </td>
              <td className="px-6 py-4 text-xs text-slate-400">
                {new Date(app.submittedAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4">
                <Badge variant={getStatusVariant(app.status)}>
                  {app.status}
                </Badge>
              </td>
              <td className="px-6 py-4">
                <Link to={`/student/applications/${app.id}`}>
                  <Button variant="outline" size="sm" icon={Eye}>
                    View
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </Table>
      )}
    </div>
  );
};
