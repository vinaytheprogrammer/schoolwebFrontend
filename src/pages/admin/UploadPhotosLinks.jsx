import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';
import { FiPlus, FiTrash2, FiSearch, FiImage } from 'react-icons/fi';

const UploadPhotosLinks = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [galleryItems, setGalleryItems] = useState([]);
  const [selectedAlbumId, setSelectedAlbumId] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [imageAddresses, setImageAddresses] = useState(['']);

  const fetchGalleryItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/gallery');
      setGalleryItems(response.data);
    } catch (err) {
      console.error('Error fetching gallery items:', err);
      setError('Failed to load albums. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchGalleryItems();
    }
  }, [isAuthenticated]);

  const handleAlbumSelect = (e) => {
    setSelectedAlbumId(e.target.value);
  };

  const handleImageAddressChange = (e, index) => {
    const newAddresses = [...imageAddresses];
    newAddresses[index] = e.target.value;
    setImageAddresses(newAddresses);
  };

  const removeImageAddress = (index) => {
    const newAddresses = imageAddresses.filter((_, i) => i !== index);
    setImageAddresses(newAddresses.length > 0 ? newAddresses : ['']);
  };

  const addImageAddress = () => {
    setImageAddresses([...imageAddresses, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedAlbumId) {
      setError('Please select an album');
      return;
    }

    const validAddresses = imageAddresses.map((a) => a.trim()).filter((a) => a.length > 0);

    if (validAddresses.length === 0) {
      setError('Please add at least one valid image URL to upload');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const payload = {
        galleryItemId: selectedAlbumId,
        imageAddresses: validAddresses,
        uploadedBy: 'admin',
        isPublic: true,
        featured: false,
      };

      await api.post('/api/uploadImageLinks', payload);
      navigate(`/admin/gallery/view/${selectedAlbumId}`);
    } catch (err) {
      console.error('Error uploading photos:', err);
      setError(err.response?.data?.message || 'Failed to upload photo links. Please try again later.');
      setIsUploading(false);
    }
  };

  const filteredGalleryItems = galleryItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Add Image Links to Album</h1>
          <p className="text-sm text-gray-600 mt-1">Add web-hosted photo URLs directly to your gallery albums</p>
        </div>
        <Link
          to="/admin/gallery"
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Link>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg mb-6 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit}>
          {/* Album Selection */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2 text-sm">
              Select Destination Album *
            </label>
            <div className="relative mb-3">
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search album by title..."
                className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500"
              />
            </div>

            {isLoading ? (
              <p className="text-xs text-gray-500">Loading albums...</p>
            ) : (
              <select
                value={selectedAlbumId}
                onChange={handleAlbumSelect}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500"
              >
                <option value="">-- Choose an Album --</option>
                {filteredGalleryItems.map((item) => (
                  <option key={item._id} value={item._id}>
                    {item.title} ({item.category})
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Image URLs Input */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-gray-700 font-semibold text-sm">
                Photo Image URLs *
              </label>
              <button
                type="button"
                onClick={addImageAddress}
                className="text-xs text-amber-700 font-semibold hover:underline flex items-center gap-1"
              >
                <FiPlus /> Add Another URL
              </button>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Paste direct image URLs (e.g. from Cloudinary, Unsplash, or CDN).
            </p>

            <div className="space-y-3">
              {imageAddresses.map((address, index) => (
                <div key={index} className="flex gap-2 items-center">
                  <div className="relative flex-grow">
                    <FiImage className="absolute left-3 top-3 text-gray-400" />
                    <input
                      type="url"
                      value={address}
                      onChange={(e) => handleImageAddressChange(e, index)}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-amber-500"
                      required
                    />
                  </div>
                  {imageAddresses.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeImageAddress(index)}
                      className="p-2.5 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                      title="Remove URL"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* URL Live Previews */}
          {imageAddresses.some((url) => url.trim().length > 10) && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wider mb-3">
                Live URL Previews
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {imageAddresses
                  .filter((url) => url.trim().length > 10)
                  .map((url, i) => (
                    <div key={i} className="relative aspect-video rounded-lg overflow-hidden bg-gray-200">
                      <img
                        src={url}
                        alt={`Preview ${i + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x200?text=Invalid+Image+URL';
                        }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Link
              to="/admin/gallery"
              className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 font-medium"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isUploading || !selectedAlbumId}
              className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-sm font-semibold disabled:opacity-50 shadow-sm"
            >
              {isUploading ? 'Saving Links...' : 'Save Photos to Album'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadPhotosLinks;
