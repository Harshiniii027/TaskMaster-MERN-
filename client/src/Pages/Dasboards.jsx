import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskBoard from '../components/TaskBoard';
import AddTask from '../components/AddTask';
import Header from '../components/Header';

function Dasboards() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [taskRefreshTrigger, setTaskRefreshTrigger] = useState(false);
  const navigate = useNavigate();

  const handleAddTaskClick = () => setIsAddTaskOpen(true);
  const closeModal = () => setIsAddTaskOpen(false);
  const fetchTasks = () => setTaskRefreshTrigger(prev => !prev);
  const handleHelpClick = () => navigate('/help');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 text-gray-800 flex flex-col">
      {/* Header */}
      <Header setAddTaskDiv={setIsAddTaskOpen} />

      {/* Main Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-teal-900 text-white p-6 space-y-8 shadow-md">
          <div className="text-3xl text-center text-amber-400 font-bold">📋</div>
          <nav className="space-y-2">
            <button className="w-full text-left px-4 py-2 text-white font-medium rounded-md hover:bg-slate-700 transition">
              Dashboard
            </button>
            <button className="w-full text-left px-4 py-2 text-white font-medium rounded-md hover:bg-slate-700 transition">
              Settings
            </button>
            <button
              onClick={handleHelpClick}
              className="w-full text-left px-4 py-2 text-white font-medium rounded-md hover:bg-slate-700 transition"
            >
              Help
            </button>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 px-10 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-semibold text-slate-700">Task Dashboard</h1>
            <button
              onClick={handleAddTaskClick}
              className="bg-teal-900 hover:bg-teal-600 text-white px-6 py-2 rounded-lg shadow-md transition"
            >
              ✚ Add Task
            </button>
          </div>

          {/* Task Board */}
          <TaskBoard refreshTrigger={taskRefreshTrigger} />

          {/* AddTask Modal */}
          {isAddTaskOpen && (
            <>
              <div
                className="fixed inset-0 bg-black bg-opacity-40 z-40 backdrop-blur-sm"
                onClick={closeModal}
              ></div>

              <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div className="bg-white max-w-xl w-full p-8 rounded-2xl shadow-2xl relative">
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 text-gray-600 hover:text-black text-2xl"
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

export default Dasboards;
