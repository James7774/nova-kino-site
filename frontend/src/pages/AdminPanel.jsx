import React, { useState, useEffect, useMemo } from 'react';
import api from '../utils/api';
import { Plus, Trash2, Edit2, LogOut, X, Film, Search, ExternalLink, Activity, Star, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
  const [movies, setMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [form, setForm] = useState({
    title: '', description: '', poster: '', videoUrl: '',
    videoSourceType: 'auto', downloadUrl: '',
    year: 2024, genres: '', quality: 'HD', isTrending: false, country: ''
  });
  
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/movies');
      setMovies(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
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
    setForm({ title: '', description: '', poster: '', videoUrl: '', videoSourceType: 'auto', downloadUrl: '', year: 2024, genres: '', quality: 'HD', isTrending: false, country: '' });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (movie) => {
    setForm({
      title: movie.title, description: movie.description, poster: movie.poster,
      videoUrl: movie.videoUrl, 
      videoSourceType: movie.videoSourceType || 'auto',
      downloadUrl: movie.downloadUrl || '',
      year: movie.year, genres: movie.genres?.join(', ') || '',
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
        await api.put(`/movies/${editId}`, movieData, getConfig());
      } else {
        await api.post('/movies', movieData, getConfig());
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
      await api.delete(`/movies/${id}`, getConfig());
      fetchMovies();
    } catch { alert('Xatolik!'); }
  };

  const setField = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const filteredMovies = useMemo(() => {
    return movies.filter(m => m.title.toLowerCase().includes(search.toLowerCase()));
  }, [movies, search]);

  return (
    <div className="admin-dashboard fade-in">
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="logo-icon"><Film size={20} /></div>
          <span className="logo-text">Nova<span>Admin</span></span>
        </div>
        
        <nav className="sidebar-nav">
          <button className="nav-item active"><Activity size={20} /> Dashboard</button>
          <button className="nav-item"><Film size={20} /> Filmlar</button>
          <button className="nav-item"><Plus size={20} /> Qo'shish</button>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn"><LogOut size={18} /> Chiqish</button>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <div className="search-box">
            <Search size={18} />
            <input 
              type="text" 
              placeholder="Qidiruv..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button className="add-btn-primary" onClick={() => { resetForm(); setShowForm(true); }}>
            <Plus size={18} /> Yangi Film
          </button>
        </header>

        <div className="admin-content-inner">
          <div className="stats-grid">
            <div className="admin-stat-card">
              <div className="stat-icon purple"><Film size={24} /></div>
              <div className="stat-info">
                <h3>{movies.length}</h3>
                <p>Jami Filmlar</p>
              </div>
            </div>
            <div className="admin-stat-card">
              <div className="stat-icon gold"><Star size={24} /></div>
              <div className="stat-info">
                <h3>{movies.filter(m => m.isTrending).length}</h3>
                <p>Trenddagilar</p>
              </div>
            </div>
          </div>

          <div className="data-section">
            <div className="data-header">
              <h2>Film Ro'yxati</h2>
              <div className="data-tabs">
                <button className="active">Hammasi</button>
                <button>Oxirgi</button>
              </div>
            </div>

            <div className="table-wrapper">
              {loading ? (
                <div className="table-loader">Yuklanmoqda...</div>
              ) : (
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>Film</th>
                      <th>Ma'lumot</th>
                      <th>Holat</th>
                      <th>Amallar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMovies.map(m => (
                      <tr key={m._id}>
                        <td>
                          <div className="table-movie-info">
                            <img src={m.poster} alt="" />
                            <div>
                              <h4>{m.title}</h4>
                              <span>{m.country || 'Noma\'lum'}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="table-movie-meta">
                            <span>{m.year}</span>
                            <span>{m.quality}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge ${m.isTrending ? 'trending' : ''}`}>
                            {m.isTrending ? 'Trend' : 'Oddiy'}
                          </span>
                        </td>
                        <td>
                          <div className="row-actions">
                            <button onClick={() => handleEdit(m)} className="row-btn edit"><Edit2 size={16} /></button>
                            <button onClick={() => handleDelete(m._id)} className="row-btn delete"><Trash2 size={16} /></button>
                            <Link to={`/movie/${m._id}`} className="row-btn view"><Eye size={16} /></Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Form Modal */}
      {showForm && (
        <div className="admin-modal-overlay">
          <div className="admin-modal-content scale-up">
            <div className="modal-top">
              <h3>{editId ? 'Filmni Tahrirlash' : 'Yangi Ekspozitsiya'}</h3>
              <button className="modal-close" onClick={resetForm}><X size={24} /></button>
            </div>
            
            <form onSubmit={handleSubmit} className="premium-form">
              <div className="form-grid">
                <div className="form-group full">
                  <label>Sarlavha</label>
                  <input type="text" value={form.title} onChange={e => setField('title', e.target.value)} required placeholder="Kino nomini kiriting" />
                </div>
                
                <div className="form-group full">
                  <label>Tavsif</label>
                  <textarea value={form.description} onChange={e => setField('description', e.target.value)} required rows={4} placeholder="Film haqida ma'lumot..." />
                </div>

                <div className="form-group">
                  <label>Poster URL</label>
                  <input type="text" value={form.poster} onChange={e => setField('poster', e.target.value)} required placeholder="https://..." />
                </div>
                
                <div className="form-group">
                  <label>Video URL / Kod</label>
                  <input type="text" value={form.videoUrl} onChange={e => setField('videoUrl', e.target.value)} required placeholder="URL yoki Iframe" />
                </div>

                <div className="form-group">
                  <label>Video Turi</label>
                  <select value={form.videoSourceType} onChange={e => setField('videoSourceType', e.target.value)}>
                    <option value="auto">Auto</option>
                    <option value="youtube">YouTube</option>
                    <option value="mp4">MP4</option>
                    <option value="embed-code">Iframe HTML</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Sifat</label>
                  <select value={form.quality} onChange={e => setField('quality', e.target.value)}>
                    <option>HD</option><option>4K</option><option>1080p</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Yil</label>
                  <input type="number" value={form.year} onChange={e => setField('year', e.target.value)} />
                </div>

                <div className="form-group">
                  <label>Mamlakat</label>
                  <input type="text" value={form.country} onChange={e => setField('country', e.target.value)} placeholder="AQSH" />
                </div>
              </div>

              <div className="form-footer">
                <label className="switch-wrapper">
                  <input type="checkbox" checked={form.isTrending} onChange={e => setField('isTrending', e.target.checked)} />
                  <span className="switch"></span>
                  Trendda ko'rsatish
                </label>
                
                <div className="form-btns">
                  <button type="button" className="admin-cancel-btn" onClick={resetForm}>Bekor qilish</button>
                  <button type="submit" className="admin-save-btn">Saqlash</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
