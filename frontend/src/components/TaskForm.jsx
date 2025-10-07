import React, { useEffect, useState } from 'react';

const initial = {
  date: new Date().toISOString().slice(0,10),
  description: '',
  hoursWorked: 0,
  status: 'Pending'
};

export default function TaskForm({ onCreate, onUpdate, editing }) {
  const [form, setForm] = useState(initial);

  useEffect(() => {
    if (editing) {
      setForm({
        date: editing.date ? new Date(editing.date).toISOString().slice(0,10) : new Date().toISOString().slice(0,10),
        description: editing.description || '',
        hoursWorked: editing.hoursWorked || 0,
        status: editing.status || 'Pending'
      });
    } else {
      setForm(initial);
    }
  }, [editing]);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const payload = { ...form, hoursWorked: Number(form.hoursWorked) };
    if (editing) {
      onUpdate(editing._id, payload);
    } else {
      onCreate(payload);
      setForm(initial);
    }
  };

  return (
    <div className="card">
      <h3>{editing ? 'Edit Task' : 'New Task'}</h3>
      <form onSubmit={submit}>
        <label>Date</label>
        <input type="date" name="date" value={form.date} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />

        <label>Hours Worked</label>
        <input type="number" name="hoursWorked" min="0" step="0.5" value={form.hoursWorked} onChange={handleChange} required />

        <label>Status</label>
        <select name="status" value={form.status} onChange={handleChange}>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Completed</option>
        </select>

        <button type="submit">{editing ? 'Update' : 'Create'}</button>
      </form>
    </div>
  );
}
