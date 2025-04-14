import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddTask = ({ closeModal, refreshTasks }) => {
  const [taskValues, setTaskValues] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'ToDo',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskValues({ ...taskValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    try {
      await axios.post(
        'http://localhost:1000/api/v1/addTask',
        taskValues,
        { withCredentials: true }
      );
      alert('Task Added Successfully');
      refreshTasks(); 
      closeModal();   
    } catch (error) {
      console.error('Error adding task:', error);
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
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="p-6 bg-white shadow-md rounded-md w-[90vw] sm:w-[80vw] md:w-[50vw] lg:w-[30vw]">
        <h2 className="text-2xl font-bold text-center mb-4 text-teal-900">Add a New Task</h2>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            required
            placeholder="Title"
            name="title"
            value={taskValues.title}
            onChange={handleChange}
            className="border rounded px-4 py-2 border-zinc-400 outline-none"
          />

          <input
            type="text"
            required
            placeholder="Description"
            name="description"
            value={taskValues.description}
            onChange={handleChange}
            className="border rounded px-4 py-2 border-zinc-400 outline-none"
          />

          <select
            name="priority"
            value={taskValues.priority}
            onChange={handleChange}
            className="border rounded px-4 py-2 border-zinc-400 outline-none"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            name="status"
            value={taskValues.status}
            onChange={handleChange}
            className="border rounded px-4 py-2 border-zinc-400 outline-none"
          >
            <option value="ToDo">To Do</option>
            <option value="inProgress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-teal-900 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700 transition-all duration-300"
            >
              Add Task
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="border px-6 py-2 rounded hover:bg-gray-200 transition-all duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTask;
