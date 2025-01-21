export interface Task {
  id: number;
  title: string;       
  description?: string;
  status: 'Pending' | 'Completed';
  priority: 'Low' | 'Medium' | 'High'; 
}
  
  export interface TaskTileProps {
    task: Task;
    onComplete: (id: number) => void;
    onDelete: (id: number) => void;
  }
  
  export interface TaskListProps {
    tasks: Task[];
    onComplete: (id: number) => void;
    onDelete: (id: number) => void;
  }
  
  export interface TaskFormProps {
    onSubmit: (task: Omit<Task, 'id' | 'status'>) => void;
  }
  export interface TaskContextType {
    tasks: Task[];
    addTask: (task: Omit<Task, 'id' | 'status'>) => void;
    completeTask: (id: number) => void;
    deleteTask: (id: number) => void;
    successMessage: string;
    setSuccessMessage: (message: string) => void; 
    isLoading: boolean;  
    setIsLoading: (id: boolean) => void; 
  }