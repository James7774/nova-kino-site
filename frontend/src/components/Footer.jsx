import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Instagram, Send, Youtube, Heart } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-v2">
      <div className="container footer-container-v2">
        <div className="footer-top-v2">
          <div className="footer-about-v2">
            <div className="footer-logo-v2">
              <div className="logo-icon"><Film size={20} /></div>
              <span className="logo-text">Nova<span>Kino</span></span>
            </div>
            <p className="footer-desc-v2">
              Eng sara filmlar, seriallar va multfilmlarni yuqori sifatda, o'zbek tilida mutlaqo bepul onlayn ko'ring va yuklab oling.
            </p>
            <div className="footer-social-v2">
              <a href="https://t.me" className="social-link-v2" aria-label="Telegram"><Send size={20} /></a>
              <a href="https://instagram.com" className="social-link-v2" aria-label="Instagram"><Instagram size={20} /></a>
              <a href="https://youtube.com" className="social-link-v2" aria-label="YouTube"><Youtube size={20} /></a>
            </div>
          </div>

          <div className="footer-links-group-v2">
            <div className="footer-links-col-v2">
              <h4>MENU</h4>
              <Link to="/">Bosh sahifa</Link>
              <Link to="/movies">Barcha kinolar</Link>
              <Link to="/trending">Trenddagilar</Link>
              <Link to="/categories">Janrlar</Link>
            </div>
            
            <div className="footer-links-col-v2">
              <h4>JANRLAR</h4>
              <Link to="/movies?genre=Jangari">Jangari</Link>
              <Link to="/movies?genre=Drama">Drama</Link>
              <Link to="/movies?genre=Komediya">Komediya</Link>
              <Link to="/movies?genre=Fantastika">Fantastika</Link>
            </div>

            <div className="footer-links-col-v2">
              <h4>ADMIN</h4>
              <Link to="/admin/login">Admin Panel</Link>
              <a href="/search">Qidiruv</a>
              <a href="/">Yordam</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-v2">
          <p>© 2026 NovaKino. Barcha huquqlar himoyalangan.</p>
          <div className="footer-made-by">
            Made with <Heart size={14} fill="var(--accent)" color="var(--accent)" /> for movie fans
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
