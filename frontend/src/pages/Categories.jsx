import { Link } from 'react-router-dom';
import { Compass, Film, Tv, Star, PlayCircle } from 'lucide-react';
import './Categories.css';

const CATS = [
  { id: 'Jangari', name: 'Jangari', icon: <Film size={20} />, count: 124 },
  { id: 'Drama', name: 'Drama', icon: <Star size={20} />, count: 89 },
  { id: 'Komediya', name: 'Komediya', icon: <PlayCircle size={20} />, count: 56 },
  { id: 'Qo\'rqinchli', name: 'Qo\'rqinchli', icon: <Tv size={20} />, count: 34 },
  { id: 'Fantastika', name: 'Fantastika', icon: <Compass size={20} />, count: 72 },
];

const Categories = () => {
  return (
    <div className="categories-page container">
      <h2 className="section-title"><span className="bar"></span> Janrlar</h2>
      <div className="cat-grid">
        {CATS.map(cat => (
          <Link to={`/movies?genre=${cat.id}`} key={cat.id} className="cat-card">
            <div className="cat-icon">{cat.icon}</div>
            <div className="cat-info">
              <h3>{cat.name}</h3>
              <p>{cat.count} ta film</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
