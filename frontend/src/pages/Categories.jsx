import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, Film, Tv, Star, PlayCircle, Ghost, Zap, Heart, Rocket } from 'lucide-react';
import './Categories.css';

const CATS = [
  { id: 'Jangari', name: 'Jangari', icon: <Zap size={28} />, desc: 'Adrenalin va janglarga boy sarguzashtlar', color: '#ff4d4d' },
  { id: 'Drama', name: 'Drama', icon: <Heart size={28} />, desc: 'Hayotiy voqealar va chuqur his-tuyg\'ular', color: '#ff85a1' },
  { id: 'Komediya', name: 'Komediya', icon: <PlayCircle size={28} />, desc: 'Kulguli va xush kayfiyat beruvchi filmlar', color: '#ffd166' },
  { id: 'Qo\'rqinchli', name: 'Qo\'rqinchli', icon: <Ghost size={28} />, desc: 'Daxshat va sirli voqealar olami', color: '#888' },
  { id: 'Fantastika', name: 'Fantastika', icon: <Rocket size={28} />, desc: 'Kelajak va g\'ayritabiiy olamlar haqida', color: '#7c5cfc' },
  { id: 'Triller', name: 'Triller', icon: <Tv size={28} />, desc: 'Hayajonli va kutilmagan burilishlar', color: '#06d6a0' },
  { id: 'Multfilm', name: 'Multfilm', icon: <Star size={28} />, desc: 'Bolalar va kattalar uchun ajoyib animatsiya', color: '#118ab2' },
];

const Categories = () => {
  return (
    <div className="categories-premium-page fade-in">
      <div className="movies-hero">
        <div className="container hero-inner-v2">
          <h1><Layers size={32} /> JANRLAR</h1>
          <p>O'zingizga yoqqan yo'nalishni tanlang</p>
        </div>
      </div>

      <div className="container categories-content-v2">
        <div className="category-grid-v2">
          {CATS.map(cat => (
            <Link 
              to={`/movies?genre=${cat.id}`} 
              key={cat.id} 
              className="category-card-v2"
              style={{ '--cat-color': cat.color }}
            >
              <div className="cat-card-bg" />
              <div className="cat-card-icon">{cat.icon}</div>
              <div className="cat-card-info">
                <h3>{cat.name}</h3>
                <p>{cat.desc}</p>
              </div>
              <div className="cat-card-arrow">→</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
