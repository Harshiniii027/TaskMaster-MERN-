import React, { useState, useEffect } from "react";
import TaskColumn from "./TaskColumn";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";

const TaskBoard = ({ refreshTrigger }) => {
  const [tasks, setTasks] = useState([]);

  const fetchYourTasksHere = async () => {
    try {
      const response = await axios.get("http://localhost:1000/api/v1/getTasks", {
        withCredentials: true,
        
      });
      console.log(response.data)
      setTasks(response.data.tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      console.log("server error");
    }
  };

  useEffect(() => {
    fetchYourTasksHere();
  }, [refreshTrigger]);

  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:1000/api/v1/updateTask/${taskId}`,
        { status: newStatus },
        { withCredentials: true }
      );
      setTasks((prev) =>
        prev.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex justify-around p-6 bg-gray-100 min-h-screen">
        <TaskColumn title="To Do" status="ToDo" tasks={tasks} updateTaskStatus={updateTaskStatus} />
        <TaskColumn title="In Progress" status="inProgress" tasks={tasks} updateTaskStatus={updateTaskStatus} />
        <TaskColumn title="Done" status="completed" tasks={tasks} updateTaskStatus={updateTaskStatus} />
      </div>
    </DndProvider>
  );
};

export default TaskBoard;
