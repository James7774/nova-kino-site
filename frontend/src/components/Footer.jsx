import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <h3 className="footer-logo">Nova<span>Kino</span></h3>
            <p className="footer-desc">Eng sara filmlar va seriallarni o'zbek tilida onlayn ko'ring.</p>
          </div>
          <div className="footer-col">
            <h4>Sahifalar</h4>
            <Link to="/">Bosh sahifa</Link>
            <Link to="/movies">Kinolar</Link>
            <Link to="/categories">Janrlar</Link>
            <Link to="/trending">Trendda</Link>
          </div>
          <div className="footer-col">
            <h4>Janrlar</h4>
            <Link to="/movies?genre=Jangari">Jangari</Link>
            <Link to="/movies?genre=Drama">Drama</Link>
            <Link to="/movies?genre=Komediya">Komediya</Link>
            <Link to="/movies?genre=Fantastika">Fantastika</Link>
          </div>
          <div className="footer-col">
            <h4>Aloqa</h4>
            <a href="https://t.me" target="_blank" rel="noreferrer">Telegram</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 NovaKino. Barcha huquqlar himoyalangan.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
