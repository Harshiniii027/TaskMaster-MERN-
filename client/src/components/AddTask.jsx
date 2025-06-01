import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTasks } from 'react-icons/fa';

const AddTask = ({ closeModal, refreshTasks, editTaskData }) => {
  const [taskValues, setTaskValues] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'ToDo',
  });

  useEffect(() => {
    if (editTaskData) {
      setTaskValues({
        title: editTaskData.title || '',
        description: editTaskData.description || '',
        priority: editTaskData.priority || 'medium',
        status: editTaskData.status || 'ToDo',
      });
    }
  }, [editTaskData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskValues({ ...taskValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editTaskData) {
        await axios.put(
          `http://localhost:1000/api/v1/editTask/${editTaskData._id}`,
          taskValues,
          { withCredentials: true }
        );
        alert('Task Updated Successfully');
      } else {
        await axios.post(
          'http://localhost:1000/api/v1/addTask',
          taskValues,
          { withCredentials: true }
        );
        alert('Task Added Successfully');
      }
      refreshTasks();
      closeModal();
    } catch (error) {
      console.error('Error saving task:', error);
      alert(error.response?.data?.error || "An unexpected error occurred.");
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-white z-50 flex items-center justify-center" // Changed to solid black
      onClick={closeModal}
    >
      <div 
        className="bg-white rounded-xl p-6 w-full max-w-md mx-4 shadow-2xl" // Increased shadow
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with centered icon and title */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center">
            <FaTasks className="h-8 w-8 text-teal-600" /> {/* Larger icon */}
            <span className="ml-3 text-2xl font-bold text-gray-800">TaskMaster</span>
          </div>
          <p className="mt-2 text-gray-600">
            {editTaskData ? 'Edit Your Task' : 'Create New Task'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              name="title"
              value={taskValues.title}
              onChange={handleChange}
              placeholder="Task Title"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              required
            />
          </div>

          <div>
            <textarea
              name="description"
              value={taskValues.description}
              onChange={handleChange}
              placeholder="Task Description"
              rows="4"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                name="priority"
                value={taskValues.priority}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                name="status"
                value={taskValues.status}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition"
              >
                <option value="ToDo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="flex gap-5 pt-3">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 py-3 border-2 border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition duration-200 shadow-md hover:shadow-lg"
            >
              {editTaskData ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;