import React, { useEffect, useState } from 'react';
import api from '../api';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

export default function Dashboard({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchTasks = async () => {
    try {
      const resp = await api.get('/tasks');
      setTasks(resp.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleCreate = async (data) => {
    await api.post('/tasks', data);
    fetchTasks();
  };
  const handleUpdate = async (id, data) => {
    await api.put(`/tasks/${id}`, data);
    setEditing(null);
    fetchTasks();
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    await api.delete(`/tasks/${id}`);
    fetchTasks();
  };
  const handleEdit = (task) => setEditing(task);

  return (
    <div className="container">
      <header>
        <h1>Dashboard</h1>
        <div>
          <button onClick={onLogout}>Logout</button>
        </div>
      </header>

      <main>
        <section className="left">
          <TaskForm onCreate={handleCreate} onUpdate={handleUpdate} editing={editing} />
        </section>

        <section className="right">
          <TaskList tasks={tasks} onEdit={handleEdit} onDelete={handleDelete} />
        </section>
      </main>
    </div>
  );
}
