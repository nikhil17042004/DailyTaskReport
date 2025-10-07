import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import api from './api';
import Register from "./pages/Register";


function App() {
  const [user, setUser] = useState(null);

  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const resp = await api.get('/tasks');
        
        setUser({ username: 'You' });
      } catch (err) {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const onLogin = (userObj) => setUser(userObj);
  const onLogout = async () => {
    try {
      await api.post('/auth/logout');
    } catch (err) {
      // ignore
    }
    setUser(null);
  };

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Register />} /> 
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route path="/dashboard" element={user ? <Dashboard onLogout={onLogout} /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;
