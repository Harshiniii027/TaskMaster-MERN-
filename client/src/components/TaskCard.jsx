import React from "react";
import { useDrag } from "react-dnd";

const getPriorityStyles = (priority) => {
  switch (priority) {
    case "low":
      return "bg-green-100 border-green-300";
    case "medium":
      return "bg-blue-100 border-blue-300";
    case "high":
      return "bg-red-100 border-red-300";
    default:
      return "bg-gray-100 border-gray-300";
  }
};

const getPriorityTextColor = (priority) => {
  switch (priority) {
    case "low":
      return "text-green-800";
    case "medium":
      return "text-blue-800";
    case "high":
      return "text-red-800";
    default:
      return "text-gray-800";
  }
};

const TaskCard = ({ task, handleEdit, handleDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { id: task._id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`bg-white p-4 my-3 rounded-lg shadow-lg cursor-grab flex justify-between items-center transition-opacity duration-200 ${
        isDragging ? "opacity-70" : ""
      } border-l-4 ${getPriorityStyles(task.priority)}`}
    >
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-gray-900">{task.title}</h3>
        <span
          className={`inline-block text-xs font-bold px-2 py-1 rounded-full w-fit border-2 ${getPriorityTextColor(
            task.priority
          )} border-opacity-50`}
          style={{
            borderColor: getPriorityTextColor(task.priority),
          }}
        >
          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleEdit(task._id)}
          className="text-blue-600 hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md p-1 transition duration-150"
          title="Edit"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.687a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v5h-5l-1.28-1.28" />
          </svg>
        </button>
        <button
          onClick={() => handleDelete(task._id)}
          className="text-red-600 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400 rounded-md p-1 transition duration-150"
          title="Delete"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TaskCard;