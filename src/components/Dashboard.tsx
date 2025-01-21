import React, { useState } from 'react';
import { useTaskContext } from '../services/TaskServices';

const Dashboard: React.FC = () => {
  const { tasks, completeTask, deleteTask, addTask,successMessage, isLoading  } = useTaskContext();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Completed'>('All');

  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'Low' | 'Medium' | 'High'>('Medium');

  const toggleForm = () => {
    setShowForm((prevState) => !prevState);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Title is required!');
      return;
    }

    addTask({ title, description, priority });

    setTitle('');
    setDescription('');
    setPriority('Medium');
    setShowForm(false); 

  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h2 style={{ padding : '0px'}}>Task Management Dashboard</h2>
      {successMessage && (
        <div style={{ padding: '10px', backgroundColor: '#4CAF50', color: 'white', marginBottom: '20px' }}>
          {successMessage}
        </div>
      )}

      <div>
        <input
          type="text"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ height: '23px',marginRight: '10px' }}
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'All' | 'Pending' | 'Completed')}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button onClick={toggleForm} style={{ padding: '7px 15px', marginRight: '10px' }}>
        Add New Task
      </button>
      </div>



      {showForm && (
        <form onSubmit={handleSubmit} style={{ marginTop: '10px' }}>
          <div style={{width : '25%', display:'inline-block', marginLeft: '4%'}}>
          <div style={{fontWeight: 'bold', textTransform : 'uppercase',textAlign: 'left', paddingLeft:'0px'}}>Title</div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
            />
          </div>

          <div style={{width : '25%', display:'inline-block', marginLeft: '4%'}}>
            <div style={{fontWeight: 'bold', textTransform : 'uppercase', textAlign: 'left',paddingLeft:'0px'}}>Description</div>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{ marginBottom: '10px', width: '100%', padding: '8px' }}
            />
          </div>

          <div style={{width : '25%', display:'inline-block', marginLeft: '4%'}}>
            <div style={{fontWeight: 'bold', textTransform : 'uppercase' ,textAlign: 'left',paddingLeft:'0px'}}>Priority</div>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'Low' | 'Medium' | 'High')}
              style={{ marginBottom: '0px', width: '100%', padding: '8px',  height: '37px'}}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <button type="submit" style={{ padding: '10px 20px', marginTop: '10px' }}>
            Save Task
          </button>
        </form>
      )}

    {isLoading ? (
        <div className="loader">Loading...</div>
      ) : (
      <table style={{width : '100%', marginTop: '10px'}}>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Task Title</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>
                {task.status === 'Pending' && (
                  <button onClick={() => completeTask(task.id)}>Mark as Completed</button>
                )}
                <button onClick={() => deleteTask(task.id)} style={{marginLeft: '5px'}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default Dashboard;
