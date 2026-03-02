import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { Lock, User } from 'lucide-react';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { data } = await api.post('/users/login', { username, password });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/admin');
    } catch {
      setError('Noto\'g\'ri login yoki parol!');
    }
    setLoading(false);
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2>Admin <span>Kirish</span></h2>
        <p className="login-hint">Admin panel uchun kirish</p>
        <form onSubmit={handleLogin}>
          <div className="input-row">
            <User size={16} />
            <input type="text" placeholder="Login" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-row">
            <Lock size={16} />
            <input type="password" placeholder="Parol" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Tekshirilmoqda...' : 'Kirish'}
          </button>
        </form>
        <p className="login-note">Demo: <strong>admin</strong> / <strong>admin123</strong></p>
      </div>
    </div>
  );
};

export default Login;
