import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { Play, Calendar, Globe, Film, Star, ArrowLeft, Download, Monitor, Share2 } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data);
      } catch {
        console.error('Fetch error');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <div className="loading-screen"><div className="spinner"></div></div>;
  if (!movie) return <div className="loading-screen">Kino topilmadi.</div>;

  return (
    <div className="movie-detail-v2 fade-in">
      {/* Immersive Background */}
      <div className="backdrop-container">
        <img src={movie.coverImage || movie.poster} alt="" className="backdrop-img" />
        <div className="backdrop-gradient-v2" />
        <div className="backdrop-gradient-bottom" />
      </div>

      <div className="container detail-content-v2">
        <Link to="/" className="back-link-v2"><ArrowLeft size={20} /> Orqaga</Link>

        <section className="detail-hero-v2">
          <div className="detail-poster-v2">
            <img src={movie.poster} alt={movie.title} />
            <div className="poster-shadow" />
            <div className="poster-quality-badge">{movie.quality || 'HD'}</div>
          </div>

          <div className="detail-info-v2">
            <h1 className="detail-title-v2">{movie.title}</h1>
            
            <div className="detail-meta-row-v2">
              <div className="detail-meta-item-v2 accent"><Star size={18} fill="currentColor" /> {movie.rating || 'N/A'}</div>
              <div className="detail-meta-item-v2"><Calendar size={18} /> {movie.year}</div>
              <div className="detail-meta-item-v2"><Globe size={18} /> {movie.country || 'Noma\'lum'}</div>
              <div className="detail-meta-item-v2"><Film size={18} /> {movie.genres?.join(', ')}</div>
            </div>

            <p className="detail-synopsis-v2">{movie.description}</p>
            
            <div className="detail-action-bubbles">
              <button 
                className="action-bubble-v2 watch" 
                onClick={() => document.getElementById('player-section').scrollIntoView({ behavior: 'smooth' })}
              >
                <Play size={22} fill="currentColor" /> Ko'rish
              </button>
              
              <a 
                href={movie.downloadUrl || (movie.videoSourceType === 'mp4' ? movie.videoUrl : null)} 
                className={`action-bubble-v2 download ${(movie.downloadUrl || movie.videoSourceType === 'mp4') ? '' : 'disabled'}`}
                target="_blank" 
                rel="noopener noreferrer"
                download
              >
                <Download size={20} /> Yuklab olish
              </a>
              
              <button className="action-bubble-v2 share" onClick={() => navigator.share({ title: movie.title, url: window.location.href })}>
                <Share2 size={20} /> Ulashish
              </button>
            </div>
          </div>
        </section>

        {/* Player Section */}
        {movie.videoUrl && (
          <section id="player-section" className="player-section-v2">
            <div className="section-header">
              <h2 className="section-title"><span className="bar"></span><Monitor size={24} /> ONLAYN KO'RISH</h2>
            </div>
            
            <div className="player-wrapper-v2">
              <VideoPlayer 
                url={movie.videoUrl} 
                sourceType={movie.videoSourceType || 'auto'} 
                poster={movie.coverImage || movie.poster} 
                title={movie.title}
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
