import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Settings = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: true,
    darkMode: true
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Example API call - replace with your actual endpoint
      await axios.put('http://localhost:1000/api/v1/updateProfile', formData, {
        withCredentials: true
      });
      
      setMessage({ text: 'Settings updated successfully!', type: 'success' });
    } catch (error) {
      setMessage({
        text: error.response?.data?.error || 'Failed to update settings',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-gray-900 text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <button 
            onClick={() => navigate(-1)}
            className="text-yellow-400 hover:text-yellow-300 text-2xl"
          >
            ←
          </button>
          <h1 className="text-3xl font-bold text-yellow-400">Settings</h1>
        </div>

        {message.text && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-800/50 border border-green-600' 
              : 'bg-red-800/50 border border-red-600'
          }`}>
            {message.text}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Profile Settings */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-yellow-400 border-b border-gray-700 pb-2">
              Profile Information
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>

          {/* Security Settings */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-yellow-400 border-b border-gray-700 pb-2">
              Security
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-1">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all"
                />
              </div>

              <div>
                <label className="block text-gray-300 mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-gray-700/80 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </form>
          </div>

          {/* Preferences */}
          <div className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-yellow-400 border-b border-gray-700 pb-2">
              Preferences
            </h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-300 font-medium">Dark Mode</h3>
                  <p className="text-gray-400 text-sm">Toggle dark/light theme</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="darkMode"
                    checked={formData.darkMode}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-gray-300 font-medium">Email Notifications</h3>
                  <p className="text-gray-400 text-sm">Receive task notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-teal-600"></div>
                </label>
              </div>

              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-teal-600 hover:bg-teal-500 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 disabled:opacity-50"
                >
                  {loading ? 'Saving...' : 'Save Preferences'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;