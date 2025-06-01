import React from "react";
import { useDrag } from "react-dnd";

const getPriorityStyles = (priority) => {
  switch (priority) {
    case "low":
      return "bg-green-50 border-green-200";
    case "medium":
      return "bg-blue-50 border-blue-200";
    case "high":
      return "bg-red-50 border-red-200";
    default:
      return "bg-gray-50 border-gray-200";
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case "low":
      return "text-green-600";
    case "medium":
      return "text-blue-600";
    case "high":
      return "text-red-600";
    default:
      return "text-gray-600";
  }
};

const getPriorityBadge = (priority) => {
  switch (priority) {
    case "low":
      return "bg-green-100 text-green-800";
    case "medium":
      return "bg-blue-100 text-blue-800";
    case "high":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getPriorityBarColor = (priority) => {
  switch (priority) {
    case "low":
      return "bg-green-600";
    case "medium":
      return "bg-blue-600";
    case "high":
      return "bg-red-600";
    default:
      return "bg-gray-600";
  }
};

const TaskCard = ({ task, handleEdit, handleDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: {
      id: task._id,
      currentStatus: task.status,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`relative p-4 mb-3 rounded-lg shadow-sm cursor-move transition-all duration-200 ${
        isDragging ? "opacity-50 shadow-lg rotate-1" : "opacity-100 hover:shadow-md"
      } border ${getPriorityStyles(task.priority)}`}
    >
      {/* Priority indicator bar */}
      <div className={`absolute top-0 left-0 w-1 h-full rounded-l-lg ${getPriorityBarColor(task.priority)}`}></div>

      <div className="ml-2">
        <div className="flex justify-between items-start">
          <h3 className="text-md font-medium text-gray-800 line-clamp-2 pr-2">
            {task.title}
          </h3>
          <div className="flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(task._id);
              }}
              className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded p-1 transition"
              title="Edit"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(task._id);
              }}
              className="text-gray-500 hover:text-red-600 hover:bg-red-50 rounded p-1 transition"
              title="Delete"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {task.description && (
          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
            {task.description}
          </p>
        )}

        <div className="flex justify-between items-center mt-3">
          <span
            className={`text-xs px-2 py-1 rounded-full ${getPriorityBadge(
              task.priority
            )}`}
          >
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>

          {task.dueDate && (
            <span
              className={`text-xs ${
                new Date(task.dueDate) < new Date()
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 inline mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(task.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          )}
        </div>

        {task.assignee && (
          <div className="flex items-center mt-2">
            <div className="w-5 h-5 rounded-full bg-purple-100 flex items-center justify-center text-xs text-purple-800 mr-2">
              {task.assignee.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs text-gray-600">{task.assignee}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
