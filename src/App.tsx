import React from 'react';
import Dashboard from './components/Dashboard';
import { TaskProvider } from './services/TaskServices';  // Import TaskProvider

const App: React.FC = () => {
  return (
    <div className="App">
      <TaskProvider>
      <Dashboard />
    </TaskProvider>
    </div>
  );
};

export default App;
