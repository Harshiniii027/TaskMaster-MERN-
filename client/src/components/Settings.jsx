import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTasks, FaCog, FaBell, FaMoon } from 'react-icons/fa';

const SettingsPage = () => {
  // Toggle states
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState('system');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <FaTasks className="h-6 w-6 text-teal-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">TaskMaster</span>
          </div>
          <Link to="/dashboard" className="text-sm text-gray-600 hover:text-teal-600">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="flex items-center text-2xl font-bold text-gray-800 mb-8">
          <FaCog className="h-6 w-6 text-teal-600 mr-2" />
          Settings
        </h1>

        <div className="bg-white rounded-lg shadow-sm">
          {/* Notification Settings */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
              <FaBell className="h-5 w-5 text-teal-600 mr-2" />
              Notifications
            </h2>
            
            {/* Email Toggle */}
            <div className="flex justify-between items-center py-3">
              <div>
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-gray-500">Get updates via email</p>
              </div>
              <ToggleSwitch 
                isOn={emailNotifications} 
                handleToggle={() => setEmailNotifications(!emailNotifications)}
              />
            </div>

            {/* Push Toggle */}
            <div className="flex justify-between items-center py-3">
              <div>
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-gray-500">Get real-time alerts</p>
              </div>
              <ToggleSwitch 
                isOn={pushNotifications} 
                handleToggle={() => setPushNotifications(!pushNotifications)}
              />
            </div>
          </div>

          {/* Theme Settings */}
          <div className="p-6">
            <h2 className="flex items-center text-lg font-semibold text-gray-800 mb-4">
              <FaMoon className="h-5 w-5 text-teal-600 mr-2" />
              Appearance
            </h2>
            
            <div className="flex space-x-3">
              {['light', 'dark', 'system'].map((theme) => (
                <button
                  key={theme}
                  onClick={() => setSelectedTheme(theme)}
                  className={`px-4 py-2 rounded-md text-sm font-medium ${
                    selectedTheme === theme
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600">
          © {new Date().getFullYear()} TaskMaster
        </div>
      </footer>
    </div>
  );
};

// Reusable Toggle Component
const ToggleSwitch = ({ isOn, handleToggle }) => {
  return (
    <button
      onClick={handleToggle}
      className={`w-12 h-6 rounded-full p-1 transition-colors ${isOn ? 'bg-teal-600' : 'bg-gray-300'}`}
    >
      <div className={`bg-white w-4 h-4 rounded-full transform transition-transform ${isOn ? 'translate-x-6' : ''}`} />
    </button>
  );
};

export default SettingsPage;