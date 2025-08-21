import React, { useState, useEffect } from "react";
import TaskColumn from "./TaskColumn";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import AddTask from "./AddTask";
import { FaPlus } from "react-icons/fa";

// Change this to your deployed backend URL
const API_URL = "https://taskmaster-mern-backend.onrender.com/api/v1";

const TaskBoard = ({ refreshTrigger }) => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const token = localStorage.getItem("token"); // JWT stored in localStorage

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/getTasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error.response || error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/deleteTask/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting task:", err.response || err);
    }
  };

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      // Optimistic update
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );

      await axios.put(
        `${API_URL}/editTask/${taskId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error updating task status:", error.response || error);
      fetchTasks();
    }
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find((t) => t._id === id);
    setEditingTask(taskToEdit);
    setModalVisible(true);
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-100 min-h-[calc(100vh-68px)]">
          <TaskColumn
            title="To Do"
            status="ToDo"
            tasks={tasks}
            updateTaskStatus={updateTaskStatus}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            color="bg-blue-50"
            borderColor="border-blue-200"
          />
          <TaskColumn
            title="In Progress"
            status="inProgress"
            tasks={tasks}
            updateTaskStatus={updateTaskStatus}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            color="bg-yellow-50"
            borderColor="border-yellow-200"
          />
          <TaskColumn
            title="Done"
            status="completed"
            tasks={tasks}
            updateTaskStatus={updateTaskStatus}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            color="bg-green-50"
            borderColor="border-green-200"
          />

          <button
            onClick={() => setModalVisible(true)}
            className="fixed bottom-6 right-6 md:bottom-8 md:right-8 p-4 bg-teal-600 text-white rounded-full shadow-lg hover:bg-teal-700 transition-colors"
          >
            <FaPlus className="h-5 w-5" />
          </button>
        </div>
      </DndProvider>

      {modalVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => {
              setModalVisible(false);
              setEditingTask(null);
            }}
          ></div>
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setModalVisible(false);
                setEditingTask(null);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              ✖
            </button>
            <AddTask
              closeModal={() => {
                setModalVisible(false);
                setEditingTask(null);
              }}
              refreshTasks={fetchTasks}
              editTaskData={editingTask}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default TaskBoard;
