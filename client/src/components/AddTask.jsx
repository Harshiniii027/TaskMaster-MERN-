import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTask = ({ closeModal, refreshTasks, editTaskData }) => {
  const [taskValues, setTaskValues] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'ToDo',
  });

  // Pre-fill form if editing
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
          `http://localhost:1000/api/v1/updateTask/${editTaskData._id}`,
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
      const errorMessage = error.response?.data?.error || "An unexpected error occurred.";
      alert(errorMessage);
    }
  };

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 backdrop-blur-sm">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-xl p-8 shadow-2xl w-[90vw] md:w-[50vw] lg:w-[40vw] border border-gray-700/50">
        <h1 className="text-3xl font-bold text-center mb-1 text-yellow-400">
          TaskMaster
        </h1>
        <h3 className="text-center font-semibold text-gray-300 mb-6">
          {editTaskData ? 'Edit Task' : 'Add New Task'}
        </h3>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="text"
            id="title"
            name="title"
            value={taskValues.title}
            onChange={handleChange}
            required
            placeholder="Task Title"
            className="border rounded-lg px-4 py-2 border-gray-600 w-full outline-none bg-gray-700/80 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all"
          />

          <textarea
            id="description"
            name="description"
            value={taskValues.description}
            onChange={handleChange}
            required
            placeholder="Task Description"
            rows="3"
            className="border rounded-lg px-4 py-2 border-gray-600 w-full outline-none bg-gray-700/80 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all"
          />

          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="priority" className="text-sm text-gray-300 font-medium">Priority</label>
              <select
                id="priority"
                name="priority"
                value={taskValues.priority}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 border-gray-600 w-full outline-none bg-gray-700/80 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="status" className="text-sm text-gray-300 font-medium">Status</label>
              <select
                id="status"
                name="status"
                value={taskValues.status}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 border-gray-600 w-full outline-none bg-gray-700/80 text-white focus:border-yellow-400 focus:ring-1 focus:ring-yellow-400/30 transition-all"
              >
                <option value="ToDo">To Do</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 border rounded-lg px-4 py-2 border-gray-600 text-gray-300 font-semibold hover:bg-gray-700/50 hover:border-gray-500 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-teal-600 text-white font-semibold py-2 rounded-lg hover:bg-teal-500 transition-all duration-300 shadow-md hover:shadow-lg"
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