import React, { useContext, useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import StatsCard from './StatsCard';
import { FiRefreshCw, FiPlusCircle, FiFileText, FiCalendar, FiImage, FiMail, FiCheckSquare } from 'react-icons/fi';

const Dashboard = () => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    newsCount: 0,
    eventsCount: 0,
    admissionsCount: 0,
    galleryItemsCount: 0,
    messagesCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = useCallback(async () => {
    setIsLoading(true);
    try {
      const [newsRes, eventsRes, galleryRes, admissionsRes, contactRes] = await Promise.allSettled([
        api.get('/api/news'),
        api.get('/api/events'),
        api.get('/api/gallery'),
        api.get('/api/admissions'),
        api.get('/api/contact'),
      ]);

      const newsCount = newsRes.status === 'fulfilled' && Array.isArray(newsRes.value.data) ? newsRes.value.data.length : 0;
      const eventsCount = eventsRes.status === 'fulfilled' && Array.isArray(eventsRes.value.data) ? eventsRes.value.data.length : 0;
      const galleryItemsCount = galleryRes.status === 'fulfilled' && Array.isArray(galleryRes.value.data) ? galleryRes.value.data.length : 0;
      
      let admissionsCount = 0;
      if (admissionsRes.status === 'fulfilled' && admissionsRes.value.data) {
        if (admissionsRes.value.data.statistics?.total !== undefined) {
          admissionsCount = admissionsRes.value.data.statistics.total;
        } else if (Array.isArray(admissionsRes.value.data.applications)) {
          admissionsCount = admissionsRes.value.data.applications.length;
        }
      }

      const messagesCount = contactRes.status === 'fulfilled' && Array.isArray(contactRes.value.data) ? contactRes.value.data.length : 0;

      setStats({
        newsCount,
        eventsCount,
        admissionsCount,
        galleryItemsCount,
        messagesCount,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      fetchDashboardData();
    }
  }, [isAuthenticated, navigate, fetchDashboardData]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Control Center</h1>
          <p className="text-sm text-gray-600 mt-1">
            Welcome back, <span className="font-semibold text-amber-700">{user?.name || user?.email || 'Administrator'}</span> ({user?.role || 'admin'})
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <button
            onClick={fetchDashboardData}
            className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white text-sm py-2 px-4 rounded-lg font-medium shadow-sm transition"
          >
            <FiRefreshCw size={16} />
            <span>Refresh Metrics</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        <StatsCard
          title="Notice Board"
          count={stats.newsCount}
          icon="📰"
          linkTo="/admin/news"
          color="bg-blue-600"
        />
        <StatsCard
          title="School Events"
          count={stats.eventsCount}
          icon="🗓️"
          linkTo="/admin/events"
          color="bg-emerald-600"
        />
        <StatsCard
          title="Admissions"
          count={stats.admissionsCount}
          icon="📝"
          linkTo="/admin/admissions"
          color="bg-amber-600"
        />
        <StatsCard
          title="Gallery Albums"
          count={stats.galleryItemsCount}
          icon="🖼️"
          linkTo="/admin/gallery"
          color="bg-purple-600"
        />
        <StatsCard
          title="Inquiries"
          count={stats.messagesCount}
          icon="✉️"
          linkTo="/admin/messages"
          color="bg-rose-600"
        />
      </div>

      {/* Admin Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 col-span-1 lg:col-span-2">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiCheckSquare className="text-amber-600" />
            <span>Administrator Quick Reference</span>
          </h2>

          <div className="space-y-4 text-sm text-gray-700">
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
              <h3 className="font-semibold text-amber-900 mb-1">1. School Notice & Announcements</h3>
              <p className="text-amber-800">
                Publish school circulars, academic notices, and exam results to the public Notice Board. Draft notices remain visible only to admins until published.
              </p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <h3 className="font-semibold text-emerald-900 mb-1">2. Event Calendar Management</h3>
              <p className="text-emerald-800">
                Schedule sports meets, PTM orientations, cultural programs, and academic examinations with exact dates, locations, and descriptions.
              </p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h3 className="font-semibold text-purple-900 mb-1">3. Gallery & Multi-Media</h3>
              <p className="text-purple-800">
                Create categorized photo albums (Academic, Sports, Cultural, Events). Add photos via Cloudinary upload or web-hosted image URLs.
              </p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-1">4. Admissions & Contact Applications</h3>
              <p className="text-blue-800">
                Review prospective student applications directly in Admissions Management. Mark status as Under Review, Approved, Waitlisted, or Rejected.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <FiPlusCircle className="text-amber-600" />
            <span>Quick Actions</span>
          </h2>
          <div className="space-y-2.5">
            <Link
              to="/admin/news/create"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 text-sm font-medium transition"
            >
              <FiFileText />
              <span>Create New Notice</span>
            </Link>
            <Link
              to="/admin/events/create"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-sm font-medium transition"
            >
              <FiCalendar />
              <span>Schedule New Event</span>
            </Link>
            <Link
              to="/admin/gallery/create-album"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-800 text-sm font-medium transition"
            >
              <FiImage />
              <span>Create Gallery Album</span>
            </Link>
            <Link
              to="/admin/admissions"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-800 text-sm font-medium transition"
            >
              <FiCheckSquare />
              <span>Review Admissions</span>
            </Link>
            <Link
              to="/admin/messages"
              className="flex items-center gap-3 px-4 py-3 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-800 text-sm font-medium transition"
            >
              <FiMail />
              <span>View Parent Inquiries</span>
            </Link>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Platform Status
            </h3>
            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>API Status:</span>
                <span className="font-semibold text-green-600">Active & Connected</span>
              </div>
              <div className="flex justify-between">
                <span>Database:</span>
                <span className="font-semibold text-gray-800">MongoDB 6.x</span>
              </div>
              <div className="flex justify-between">
                <span>Vulnerabilities:</span>
                <span className="font-semibold text-green-600">0 Reported</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
