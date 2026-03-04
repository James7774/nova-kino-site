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
      <div className="login-box glass">
        <h2 className="text-gradient">ADMIN <span>PANEL</span></h2>
        <p className="login-hint">Xavfsiz boshqaruv paneliga kirish</p>
        <form onSubmit={handleLogin}>
          <div className="input-row">
            <User size={18} />
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-row">
            <Lock size={18} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="login-error pulsate">{error}</p>}
          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? 'Tekshirilmoqda...' : 'KIRISH'}
          </button>
        </form>
        <div className="login-footer">
          <p>Yangi parol: <strong>admin</strong> / <strong>novakino777</strong></p>
          <a href="/" className="back-to-home">← Bosh sahifa</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
