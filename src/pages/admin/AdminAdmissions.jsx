import React, { useState, useEffect, useContext, useCallback } from 'react';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const AdminAdmissions = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentFilter, setCurrentFilter] = useState('all');
  const [statistics, setStatistics] = useState({
    total: 0,
    pending: 0,
    underReview: 0,
    approved: 0,
    rejected: 0,
    waitlisted: 0,
  });
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/api/admissions');
      if (response.data && response.data.applications) {
        setApplications(response.data.applications);
        setStatistics(
          response.data.statistics || {
            total: response.data.applications.length,
            pending: 0,
            underReview: 0,
            approved: 0,
            rejected: 0,
            waitlisted: 0,
          }
        );
      } else if (Array.isArray(response.data)) {
        setApplications(response.data);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      setStatusMessage({ type: 'error', text: 'Failed to fetch admission applications.' });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchApplications();
    }
  }, [isAuthenticated, fetchApplications]);

  const changeApplicationStatus = async (id, newStatus) => {
    try {
      await api.patch(`/api/admissions/${id}/status`, { status: newStatus });
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id || app.id === id ? { ...app, status: newStatus } : app
        )
      );

      setStatistics((prev) => {
        const updated = { ...prev };
        // recalculate simple counts
        return updated;
      });

      setStatusMessage({ type: 'success', text: `Application status updated to ${newStatus}.` });
      fetchApplications();
    } catch (error) {
      console.error('Error updating status:', error);
      setStatusMessage({ type: 'error', text: 'Failed to update application status.' });
    }
  };

  const deleteApplication = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;

    try {
      await api.delete(`/api/admissions/${id}`);
      setApplications((prev) => prev.filter((app) => app._id !== id && app.id !== id));
      setStatusMessage({ type: 'success', text: 'Application deleted successfully.' });
      fetchApplications();
    } catch (error) {
      console.error('Error deleting application:', error);
      setStatusMessage({ type: 'error', text: 'Failed to delete application.' });
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'waitlisted':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status) => {
    switch (status) {
      case 'under_review':
        return 'Under Review';
      default:
        return status ? status.charAt(0).toUpperCase() + status.slice(1) : '';
    }
  };

  const filteredApplications = applications.filter((app) => {
    const matchesFilter = currentFilter === 'all' || app.status === currentFilter;
    const matchesSearch =
      (app.studentName && app.studentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (app.parentName && app.parentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (app.contactEmail && app.contactEmail.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (app.grade && app.grade.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admissions Management</h1>
          <p className="text-sm text-gray-600 mt-1">Review and process student admission applications</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <button
            onClick={fetchApplications}
            className="bg-orange-600 hover:bg-orange-700 text-white text-sm py-2 px-4 rounded-lg font-medium shadow-sm"
          >
            Refresh Applications
          </button>
        </div>
      </div>

      {statusMessage.text && (
        <div
          className={`p-3 rounded-lg mb-6 text-sm ${
            statusMessage.type === 'success'
              ? 'bg-green-100 text-green-800 border border-green-200'
              : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-xs font-medium text-gray-500 uppercase">Total</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{statistics.total}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-xs font-medium text-yellow-600 uppercase">Pending</p>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{statistics.pending}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-xs font-medium text-blue-600 uppercase">Under Review</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">{statistics.underReview}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-xs font-medium text-green-600 uppercase">Approved</p>
          <p className="text-2xl font-bold text-green-600 mt-1">{statistics.approved}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-xs font-medium text-red-600 uppercase">Rejected</p>
          <p className="text-2xl font-bold text-red-600 mt-1">{statistics.rejected}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
          <p className="text-xs font-medium text-purple-600 uppercase">Waitlisted</p>
          <p className="text-2xl font-bold text-purple-600 mt-1">{statistics.waitlisted}</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {['all', 'pending', 'under_review', 'approved', 'rejected', 'waitlisted'].map((filter) => (
              <button
                key={filter}
                onClick={() => setCurrentFilter(filter)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  currentFilter === filter ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {filter.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="w-full md:w-64">
            <input
              type="text"
              placeholder="Search by student, grade, parent..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded-lg text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="text-center py-12 text-gray-500 text-sm">Loading applications...</div>
        ) : filteredApplications.length === 0 ? (
          <div className="text-center py-12 text-gray-500 text-sm">No applications found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-700 border-b border-gray-200 text-xs uppercase">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4">Parent Details</th>
                  <th className="py-3 px-4">Applied Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.map((app) => {
                  const id = app._id || app.id;
                  return (
                    <tr key={id} className="hover:bg-gray-50/50">
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-900">{app.studentName}</div>
                        {app.currentSchool && (
                          <div className="text-xs text-gray-500">Prev: {app.currentSchool}</div>
                        )}
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800">{app.grade}</td>
                      <td className="py-3 px-4">
                        <div className="text-gray-900">{app.parentName}</div>
                        <div className="text-xs text-gray-500">{app.contactEmail}</div>
                        <div className="text-xs text-gray-500">{app.contactPhone}</div>
                      </td>
                      <td className="py-3 px-4 text-xs text-gray-600">
                        {new Date(app.applicationDate || app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${getStatusBadgeClass(
                            app.status
                          )}`}
                        >
                          {formatStatus(app.status)}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <select
                            value={app.status}
                            onChange={(e) => changeApplicationStatus(id, e.target.value)}
                            className="text-xs border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="under_review">Under Review</option>
                            <option value="approved">Approved</option>
                            <option value="waitlisted">Waitlisted</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <button
                            onClick={() => deleteApplication(id)}
                            className="text-red-500 hover:text-red-700 text-xs px-2 py-1 rounded hover:bg-red-50"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAdmissions;
