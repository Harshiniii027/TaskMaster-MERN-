import React, { useState } from 'react';
import TaskBoard from '../components/TaskBoard';
import AddTask from '../components/AddTask';

function App() {
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [taskRefreshTrigger, setTaskRefreshTrigger] = useState(false); // Add this state

  const handleAddTaskClick = () => {
    setIsAddTaskOpen(!isAddTaskOpen);
  };

  const closeModal = () => {
    setIsAddTaskOpen(false);
  };

  const fetchTasks = () => {
    // Trigger a state change that TaskBoard can listen to
    setTaskRefreshTrigger(prev => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-1/5 bg-teal-950 text-white p-6 min-h-screen">
        <h2 className="text-3xl font-bold mb-6">📋</h2>
        <ul className="space-y-4 text-lg">
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">Dashboard</li>
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">Settings</li>
          <li className="hover:bg-gray-700 p-2 rounded-md cursor-pointer">Help</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 relative">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-gray-800">TaskMaster </h1>
          <button
            onClick={handleAddTaskClick}
            className="bg-teal-900 text-white px-6 py-2 rounded-lg hover:bg-blue-700 shadow-md transition"
          >
            ➕ Add Task
          </button>
        </div>

        {/* Pass the refresh trigger to TaskBoard */}
        <TaskBoard refreshTrigger={taskRefreshTrigger} />

        {/* AddTask Modal */}
        {isAddTaskOpen && (
          <>
            <div
              className="fixed inset-0 bg-neutral-700 bg-opacity-40 backdrop-blur-none"
              onClick={handleAddTaskClick}
            ></div>

            <div className="fixed inset-0 z-40 flex items-center justify-center px-4">
              <div className="bg-white w-full max-w-xl p-8 rounded-lg shadow-xl relative">
                <button
                  onClick={handleAddTaskClick}
                  className="absolute bg-grey-500 top-3 right-3 text-white hover:text-gray-700"
                >
                  ✖
                </button>

                {/* ✅ Pass working functions */}
                <AddTask closeModal={closeModal} refreshTasks={fetchTasks} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
