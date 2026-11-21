import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FiMail, FiCheck, FiTrash2, FiClock } from 'react-icons/fi';

const AdminContactMessages = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [statusMessage, setStatusMessage] = useState({ type: '', text: '' });

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const res = await api.get('/api/contact');
      setMessages(res.data);
    } catch (err) {
      console.error('Error fetching messages:', err);
      setStatusMessage({ type: 'error', text: 'Failed to load messages.' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await api.patch(`/api/contact/${id}/status`, { status });
      setMessages((prev) =>
        prev.map((msg) => (msg._id === id ? { ...msg, status } : msg))
      );
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage((prev) => ({ ...prev, status }));
      }
      setStatusMessage({ type: 'success', text: `Message marked as ${status}.` });
    } catch (err) {
      console.error('Error updating status:', err);
      setStatusMessage({ type: 'error', text: 'Failed to update message status.' });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    try {
      await api.delete(`/api/contact/${id}`);
      setMessages((prev) => prev.filter((msg) => msg._id !== id));
      if (selectedMessage && selectedMessage._id === id) {
        setSelectedMessage(null);
      }
      setStatusMessage({ type: 'success', text: 'Message deleted successfully.' });
    } catch (err) {
      console.error('Error deleting message:', err);
      setStatusMessage({ type: 'error', text: 'Failed to delete message.' });
    }
  };

  const filteredMessages = messages.filter((msg) => {
    if (filter === 'all') return true;
    return msg.status === filter;
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Contact Inquiries & Feedback</h1>
          <p className="text-sm text-gray-600 mt-1">Review and respond to messages submitted via the school website contact form</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link
            to="/admin/dashboard"
            className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
          >
            ← Back to Dashboard
          </Link>
          <button
            onClick={fetchMessages}
            className="px-4 py-2 bg-orange-600 text-white rounded-lg text-sm hover:bg-orange-700"
          >
            Refresh
          </button>
        </div>
      </div>

      {statusMessage.text && (
        <div
          className={`p-3 rounded-lg mb-6 text-sm ${
            statusMessage.type === 'success' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'
          }`}
        >
          {statusMessage.text}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200 pb-2 overflow-x-auto">
        {['all', 'unread', 'read', 'responded'].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              filter === tab ? 'bg-orange-600 text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab} ({tab === 'all' ? messages.length : messages.filter((m) => m.status === tab).length})
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Loading inquiries...</div>
      ) : filteredMessages.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          <FiMail className="mx-auto text-4xl text-gray-400 mb-3" />
          <h3 className="text-lg font-medium text-gray-800">No messages found</h3>
          <p className="text-sm text-gray-500 mt-1">There are no inquiries in this category right now.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-200 max-h-[700px] overflow-y-auto">
              {filteredMessages.map((msg) => (
                <div
                  key={msg._id}
                  onClick={() => {
                    setSelectedMessage(msg);
                    if (msg.status === 'unread') {
                      handleUpdateStatus(msg._id, 'read');
                    }
                  }}
                  className={`p-4 cursor-pointer transition-colors hover:bg-orange-50/50 ${
                    selectedMessage?._id === msg._id ? 'bg-orange-50 border-l-4 border-orange-500' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm">{msg.name}</h4>
                      <p className="text-xs text-gray-500">{msg.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full capitalize ${
                          msg.status === 'unread'
                            ? 'bg-blue-100 text-blue-800 font-semibold'
                            : msg.status === 'read'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}
                      >
                        {msg.status}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center">
                        <FiClock className="mr-1" />
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-gray-800 mt-2 truncate">{msg.subject}</p>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{msg.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Details Drawer */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 h-fit">
            {selectedMessage ? (
              <div>
                <div className="flex items-start justify-between border-b pb-4 mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{selectedMessage.subject}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      Received {new Date(selectedMessage.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(selectedMessage._id)}
                    className="text-red-500 hover:text-red-700 p-1 rounded"
                    title="Delete message"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>

                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-gray-500 block text-xs">Sender Name</span>
                    <span className="font-medium text-gray-800">{selectedMessage.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-xs">Email</span>
                    <a href={`mailto:${selectedMessage.email}`} className="text-orange-600 hover:underline">
                      {selectedMessage.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-xs">Message Content</span>
                    <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700 whitespace-pre-wrap mt-1">
                      {selectedMessage.message}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t flex gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedMessage._id, 'responded')}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white text-xs font-medium py-2 px-3 rounded-lg flex items-center justify-center space-x-1"
                  >
                    <FiCheck />
                    <span>Mark Responded</span>
                  </button>
                  <a
                    href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium py-2 px-3 rounded-lg text-center"
                  >
                    Reply via Email
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400 text-sm">
                Select a message on the left to read its full details and take action.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactMessages;
