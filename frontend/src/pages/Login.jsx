import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      const resp = await api.post('/auth/login', { username, password });
      onLogin(resp.data.user || { username });
      navigate('/dashboard');
    } catch (error) {
      const msg = error?.response?.data?.message || 'Login failed';
      setErr(msg);
    }
  };

  return (
    <div className="centered">
      <div className="card">
        <h2>Daily Task Portal — Login</h2>
        <form onSubmit={submit}>
          <label>Username</label>
          <input value={username} onChange={e => setUsername(e.target.value)} required />
          <label>Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <button type="submit">Login</button>
          {err && <p className="error">{err}</p>}
        </form>
        <p style={{fontSize:12}}>Tip: Use the backend /route to register a user </p>
      </div>
    </div>
  );
}
