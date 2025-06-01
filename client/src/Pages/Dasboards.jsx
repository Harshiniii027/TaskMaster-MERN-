import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskBoard from '../components/TaskBoard';
import AddTask from '../components/AddTask';
import Header from '../components/Header';
import { FaHome, FaCog, FaQuestionCircle, FaTasks, FaChartLine } from 'react-icons/fa';

function Dashboard() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [taskRefreshTrigger, setTaskRefreshTrigger] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => setIsAddTaskOpen(false);
  const fetchTasks = () => setTaskRefreshTrigger(prev => !prev);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <Header setAddTaskDiv={setIsAddTaskOpen} />

      {/* Main Content Area */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-gray-200 p-6 hidden md:block sticky top-0 h-screen">
          <nav className="space-y-2">
            {/* Dashboard */}
            <button 
              className={`w-full text-left px-4 py-3 text-gray-700 font-medium rounded-lg transition-all flex items-center gap-3 ${window.location.pathname === '/dashboard' ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-100'}`}
              onClick={() => navigate('/dashboard')}
            >
              <FaHome className={`${window.location.pathname === '/dashboard' ? 'text-teal-600' : 'text-gray-500'}`} />
              <span>Dashboard</span>
            </button>

            {/* Performance */}
            <button
              className={`w-full text-left px-4 py-3 text-gray-700 font-medium rounded-lg transition-all flex items-center gap-3 ${window.location.pathname === '/performance' ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-100'}`}
              onClick={() => navigate('/performance')}
            >
              <FaChartLine className={`${window.location.pathname === '/performance' ? 'text-teal-600' : 'text-gray-500'}`} />
              <span>Performance</span>
            </button>

            {/* Settings */}
            <button
              className={`w-full text-left px-4 py-3 text-gray-700 font-medium rounded-lg transition-all flex items-center gap-3 ${window.location.pathname === '/settings' ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-100'}`}
              onClick={() => navigate('/settings')}
            >
              <FaCog className={`${window.location.pathname === '/settings' ? 'text-teal-600' : 'text-gray-500'}`} />
              <span>Settings</span>
            </button>

            {/* Help Center */}
            <button
              className={`w-full text-left px-4 py-3 text-gray-700 font-medium rounded-lg transition-all flex items-center gap-3 ${window.location.pathname === '/help' ? 'bg-teal-50 text-teal-700' : 'hover:bg-gray-100'}`}
              onClick={() => navigate('/help')}
            >
              <FaQuestionCircle className={`${window.location.pathname === '/help' ? 'text-teal-600' : 'text-gray-500'}`} />
              <span>Help Center</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 py-6 overflow-auto bg-white">
          <TaskBoard refreshTrigger={taskRefreshTrigger} />

          {/* AddTask Modal */}
          {isAddTaskOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={closeModal}
              ></div>

              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="bg-white w-full max-w-xl p-6 rounded-lg shadow-xl border border-gray-200 relative">
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl transition-colors"
                  >
                    ✖
                  </button>
                  <AddTask closeModal={closeModal} refreshTasks={fetchTasks} />
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default Dashboard;