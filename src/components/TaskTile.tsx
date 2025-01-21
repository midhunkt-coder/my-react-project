import React from 'react';
import { TaskTileProps } from '../models/FieldTypes';

const TaskTile: React.FC<TaskTileProps> = ({ task, onComplete, onDelete }) => (
  <div className="task-card">
    <h3>{task.title}</h3>
    {task.description && <p>{task.description}</p>}
    <p>Status: {task.status}</p>
    <p>Priority: {task.priority}</p>  {/* Display priority */}
    
    {task.status === 'Pending' && (
      <button onClick={() => onComplete(task.id)}>Mark as Completed</button>
    )}
    <button onClick={() => onDelete(task.id)}>Delete</button>
  </div>
);

export default TaskTile;
