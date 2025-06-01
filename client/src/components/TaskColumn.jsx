import React from 'react';
import TaskCard from './TaskCard';
import { useDrop } from 'react-dnd';

const TaskColumn = ({ title, status, tasks, updateTaskStatus, handleEdit, handleDelete }) => {
  const [{ isOver }, drop] = useDrop({
    accept: "TASK",
    drop: (item) => updateTaskStatus(item.id, status),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`
        flex flex-col
        flex-1 min-w-[280px] p-4 rounded-lg
        bg-white border border-gray-200
        shadow-sm hover:shadow-md transition-all duration-200
        ${isOver ? 'ring-2 ring-teal-400 bg-teal-50/40' : ''}
        mx-2 first:ml-0 last:mr-0
      `}
    >
      <h2 className={`
        text-center p-3 rounded-md mb-4 font-semibold
        // text-white bg-gradient-to-r from-teal-600 to-teal-600
        shadow-md
      `}>
        {title}
      </h2>

      <div className="flex flex-col gap-3 flex-1">
        {tasks
          .filter(task => task.status === status)
          .map(task => (
            <TaskCard 
              key={task._id}
              task={task}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))
        }
      </div>
    </div>
  );
};

export default TaskColumn;
