import React, { useState } from 'react';
import { TaskFormProps } from '../models/FieldTypes';

const TaskForm: React.FC<TaskFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');  // Set default priority

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, priority });
    setTitle('');
    setDescription('');
    setPriority('Medium');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      
      <select
        value={priority}
        onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
      >
        <option value="Low">Low Priority</option>
        <option value="Medium">Medium Priority</option>
        <option value="High">High Priority</option>
      </select>
      
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
