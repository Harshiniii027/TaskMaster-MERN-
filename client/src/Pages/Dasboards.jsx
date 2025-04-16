import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskBoard from '../components/TaskBoard';
import AddTask from '../components/AddTask';
import Header from '../components/Header';

function Dashboard() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [taskRefreshTrigger, setTaskRefreshTrigger] = useState(false);
  const navigate = useNavigate();

  const handleAddTaskClick = () => setIsAddTaskOpen(true);
  const closeModal = () => setIsAddTaskOpen(false);
  const fetchTasks = () => setTaskRefreshTrigger(prev => !prev);
  const handleHelpClick = () => navigate('/help');
  const handleSettingClick = () => navigate('/settings')

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900 to-gray-900 text-gray-200 flex flex-col">
      {/* Header */}
      <Header setAddTaskDiv={setIsAddTaskOpen} />

      {/* Main Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-800/80 border-r border-gray-700 p-6 hidden md:block backdrop-blur-sm">
          <nav className="space-y-3 mt-8">
            <button className="w-full text-left px-4 py-3 text-gray-300 font-medium rounded-lg hover:bg-gray-700/50 transition-all duration-300 flex items-center gap-3 group">
              <span className="text-xl group-hover:text-yellow-400 transition-colors">📊</span> 
              <span>Dashboard</span>
            </button>
            <button className="w-full text-left px-4 py-3 text-gray-300 font-medium rounded-lg hover:bg-gray-700/50 transition-all duration-300 flex items-center gap-3 group"
            onClick={handleSettingClick}
            >
              <span className="text-xl group-hover:text-yellow-400 transition-colors">⚙️</span> 
              <span>Settings</span>
            </button>
            <button
              onClick={handleHelpClick}
              className="w-full text-left px-4 py-3 text-gray-300 font-medium rounded-lg hover:bg-gray-700/50 transition-all duration-300 flex items-center gap-3 group"
            >
              <span className="text-xl group-hover:text-yellow-400 transition-colors">❓</span> 
              <span>Help Center</span>
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-4 sm:px-6 py-6 overflow-auto">
          {/* Task Board */}
          <TaskBoard refreshTrigger={taskRefreshTrigger} />

          {/* AddTask Modal */}
          {isAddTaskOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
                onClick={closeModal}
              ></div>

              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="bg-gray-800/90 backdrop-blur-sm w-full max-w-xl p-6 rounded-xl shadow-2xl border border-gray-700 relative">
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-400 hover:text-yellow-400 text-2xl transition-colors"
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