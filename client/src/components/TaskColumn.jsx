import React from "react";
import TaskCard from "./TaskCard";
import { useDrop } from "react-dnd";

const TaskColumn = ({ title, status, tasks, updateTaskStatus }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => updateTaskStatus(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`w-1/3 bg-white p-4 rounded-lg shadow-md ${isOver ? "bg-green-100" : ""}`}>
      <h2 className="text-center bg-teal-900 text-white p-3 rounded-md">{title}</h2>
      {tasks.filter(task => task.status === status).map(task => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskColumn;
