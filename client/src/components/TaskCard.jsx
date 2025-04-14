// TaskCard.jsx
import React from "react";
import { useDrag } from "react-dnd";

const TaskCard = ({ task }) => {
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
      className={`bg-gray-200 p-3 my-2 rounded-md shadow-md cursor-grab ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <p>{task.title}</p>
    </div>
  );
};

export default TaskCard; 