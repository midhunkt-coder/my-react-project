import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TaskContextType, Task } from '../models/FieldTypes';
const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>(''); 
  const [isLoading, setIsLoading] = useState<boolean>(true); // Track loading state

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      try{
      setTasks(JSON.parse(savedTasks));
      setIsLoading(false);
      }
      catch (error) {
        console.error('Error fetching tasks:', error);
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'status'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now(),       
      status: 'Pending',   
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setSuccessMessage('Task added successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);  
  };
  const completeTask = (id: number) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: 'Completed' } : task)));
    setSuccessMessage('Task completed successfully!');
    setTimeout(() => setSuccessMessage(''), 3000); 
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
    setSuccessMessage('Task deleted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000); 
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, completeTask, deleteTask, successMessage, setSuccessMessage,isLoading,setIsLoading(message) {
      
    }, }}>
      {children}
    </TaskContext.Provider>
  );
};
