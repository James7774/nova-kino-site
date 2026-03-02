import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { Play, Calendar, MapPin, Film, Star, ArrowLeft, Download, Tv } from 'lucide-react';
import VideoPlayer from '../components/VideoPlayer';
import './MovieDetail.css';

const DUMMY = {
  _id: '1',
  title: 'Avatar: Suv yo\'li',
  description: 'Pandora dunyosiga qaytish. Jeyk Salli va Neytiri o\'zlarining yangi oilasini himoya qilishlari kerak. Ular endi dengiz bo\'yidagi Metkayina urug\'idan panoh topgan. Ammo insoniyat xavfi hali ham mavjud va ular butun Pandorani saqlab qolish uchun kurashishlari shart.',
  poster: 'https://image.tmdb.org/t/p/w500/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
  coverImage: 'https://image.tmdb.org/t/p/original/198vrF8k7mfQ4FjDJsBmdQcaiyq.jpg',
  videoUrl: 'https://www.youtube.com/embed/d9MyW72ELq0',
  year: 2022, country: 'AQSH', rating: 7.8, quality: '4K',
  genres: ['Fantastika', 'Sarguzasht']
};



const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(DUMMY);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data);
      } catch {
        setMovie({ ...DUMMY, _id: id });
      }
    };
    fetchMovie();
  }, [id]);

  if (!movie) return null;

  return (
    <div className="detail-page">
      {/* Cover */}
      <div className="detail-cover">
        <img src={movie.coverImage || movie.poster} alt="" />
        <div className="detail-cover-fade" />
      </div>

      <div className="container detail-body">
        <Link to="/" className="back-btn"><ArrowLeft size={16} /> Orqaga</Link>

        <div className="detail-layout">
          <div className="detail-poster">
            <img src={movie.poster} alt={movie.title} />
          </div>

          <div className="detail-info">
            <h1>{movie.title}</h1>
            <div className="detail-meta">
              {movie.rating > 0 && (
                <span className="dm gold"><Star size={13} fill="#f5c518" color="#f5c518" /> {movie.rating}</span>
              )}
              <span className="dm"><Calendar size={13} /> {movie.year}</span>
              {movie.country && <span className="dm"><MapPin size={13} /> {movie.country}</span>}
              {movie.genres?.length > 0 && <span className="dm"><Film size={13} /> {movie.genres.join(', ')}</span>}
              <span className="dm-badge">{movie.quality}</span>
            </div>
            <p className="detail-desc">{movie.description}</p>
          </div>
        </div>

        {/* Player */}
        {movie.videoUrl && (
          <div className="player-box">
            <h3 className="section-title"><span className="bar"></span><Play size={16} /> Onlayn ko'rish</h3>
            <VideoPlayer 
              url={movie.videoUrl} 
              sourceType={movie.videoSourceType || 'auto'} 
              poster={movie.coverImage || movie.poster} 
              title={movie.title}
            />
            
            <div className="player-actions">
              <button className="action-btn watch-btn">
                <Tv size={18} />
                <span>Onlayn ko'rish</span>
              </button>
              
              <a 
                href={movie.downloadUrl || (movie.videoSourceType === 'mp4' ? movie.videoUrl : null)} 
                className={`action-btn download-btn ${(!movie.downloadUrl && movie.videoSourceType !== 'mp4') ? 'disabled' : ''}`}
                target="_blank" 
                rel="noopener noreferrer"
                download
              >
                <Download size={18} />
                <span>Yuklab olish</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetail;
