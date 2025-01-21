import React from 'react';
import { TaskListProps } from '../models/FieldTypes';
import TaskTile from './TaskTile';

const TaskList: React.FC<TaskListProps> = ({ tasks, onComplete, onDelete }) => (
    
  <div className="task-list">
    {tasks.map((task) => (
      <TaskTile
        key={task.id}
        task={task}
        onComplete={onComplete}
        onDelete={onDelete}
      />
    ))}
  </div>
);

export default TaskList;
