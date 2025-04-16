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
        shadow-sm hover:shadow-md transition-all
        ${isOver ? 'ring-1 ring-amber-300 bg-amber-50/30' : ''}
        mx-2 first:ml-0 last:mr-0
      `}
    >
      <h2 className={`
        text-center p-3 rounded-md mb-4 font-semibold
        text-white bg-gradient-to-r from-amber-500 to-yellow-500
        shadow-sm
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