import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Edit2, LogOut, X, Film } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: '', description: '', poster: '', videoUrl: '',
    year: 2024, genres: '', quality: 'HD', isTrending: false, country: ''
  });
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/movies');
      setMovies(data);
    } catch (e) { console.error(e); }
  };

  const getConfig = () => {
    const user = JSON.parse(localStorage.getItem('userInfo'));
    return { headers: { Authorization: `Bearer ${user?.token}` } };
  };

  useEffect(() => {
    const userInfo = localStorage.getItem('userInfo');
    if (!userInfo) { navigate('/admin/login'); return; }
    fetchMovies();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const resetForm = () => {
    setForm({ title: '', description: '', poster: '', videoUrl: '', year: 2024, genres: '', quality: 'HD', isTrending: false, country: '' });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (movie) => {
    setForm({
      title: movie.title, description: movie.description, poster: movie.poster,
      videoUrl: movie.videoUrl, year: movie.year, genres: movie.genres?.join(', ') || '',
      quality: movie.quality, isTrending: movie.isTrending, country: movie.country || ''
    });
    setEditId(movie._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = { ...form, genres: form.genres.split(',').map(g => g.trim()) };
    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/movies/${editId}`, movieData, getConfig());
      } else {
        await axios.post('http://localhost:5000/api/movies', movieData, getConfig());
      }
      resetForm();
      fetchMovies();
    } catch (err) {
      alert('Xatolik: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('O\'chirmoqchimisiz?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/movies/${id}`, getConfig());
      fetchMovies();
    } catch { alert('Xatolik!'); }
  };

  const setField = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  return (
    <div className="admin-page container">
      <div className="admin-top">
        <h1><Film size={20} /> Admin Panel</h1>
        <div className="admin-top-btns">
          <button className="ap-btn accent" onClick={() => { resetForm(); setShowForm(true); }}>
            <Plus size={16} /> Qo'shish
          </button>
          <button className="ap-btn muted" onClick={handleLogout}>
            <LogOut size={16} /> Chiqish
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="admin-stats">
        <div className="stat-card"><span className="stat-num">{movies.length}</span><span className="stat-label">Jami filmlar</span></div>
        <div className="stat-card"><span className="stat-num">{movies.filter(m => m.isTrending).length}</span><span className="stat-label">Trendda</span></div>
      </div>

      {/* Table */}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Rasm</th>
              <th>Nomi</th>
              <th>Yil</th>
              <th>Janr</th>
              <th>Sifat</th>
              <th>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {movies.length === 0 ? (
              <tr><td colSpan="6" className="empty-row">Filmlar yo'q</td></tr>
            ) : movies.map(m => (
              <tr key={m._id}>
                <td><img src={m.poster} alt="" className="tbl-img" /></td>
                <td className="tbl-title">{m.title}</td>
                <td>{m.year}</td>
                <td>{m.genres?.join(', ')}</td>
                <td><span className="tbl-badge">{m.quality}</span></td>
                <td>
                  <div className="tbl-actions">
                    <button className="act-btn edit" onClick={() => handleEdit(m)}><Edit2 size={14} /></button>
                    <button className="act-btn del" onClick={() => handleDelete(m._id)}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Form */}
      {showForm && (
        <div className="modal-bg" onClick={resetForm}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h3>{editId ? 'Filmni tahrirlash' : 'Yangi film qo\'shish'}</h3>
              <button onClick={resetForm}><X size={18} /></button>
            </div>
            <form onSubmit={handleSubmit} className="modal-form">
              <label>Film nomi *</label>
              <input type="text" value={form.title} onChange={e => setField('title', e.target.value)} required placeholder="Film nomi" />

              <label>Tavsif *</label>
              <textarea value={form.description} onChange={e => setField('description', e.target.value)} required placeholder="Film haqida..." rows={3} />

              <div className="form-row">
                <div className="form-col">
                  <label>Poster URL *</label>
                  <input type="text" value={form.poster} onChange={e => setField('poster', e.target.value)} required placeholder="https://..." />
                </div>
                <div className="form-col">
                  <label>Video URL *</label>
                  <input type="text" value={form.videoUrl} onChange={e => setField('videoUrl', e.target.value)} required placeholder="https://..." />
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <label>Yil</label>
                  <input type="number" value={form.year} onChange={e => setField('year', e.target.value)} />
                </div>
                <div className="form-col">
                  <label>Mamlakat</label>
                  <input type="text" value={form.country} onChange={e => setField('country', e.target.value)} placeholder="AQSH" />
                </div>
                <div className="form-col">
                  <label>Sifat</label>
                  <select value={form.quality} onChange={e => setField('quality', e.target.value)}>
                    <option>HD</option><option>4K</option><option>720p</option><option>1080p</option>
                  </select>
                </div>
              </div>

              <label>Janrlar (vergul bilan)</label>
              <input type="text" value={form.genres} onChange={e => setField('genres', e.target.value)} placeholder="Drama, Jangari, Komediya" />

              <label className="checkbox-row">
                <input type="checkbox" checked={form.isTrending} onChange={e => setField('isTrending', e.target.checked)} />
                Trendda ko'rsatish
              </label>

              <div className="modal-foot">
                <button type="button" className="ap-btn muted" onClick={resetForm}>Bekor</button>
                <button type="submit" className="ap-btn accent">{editId ? 'Saqlash' : 'Qo\'shish'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
