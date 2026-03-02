import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import MovieCard from '../components/MovieCard';
import { TrendingUp, Clock, Flame } from 'lucide-react';
import './Home.css';

const DUMMY_MOVIES = [
  {
    _id: '1',
    title: 'Avatar: Suv yo\'li',
    description: 'Pandora dunyosiga qaytish. Jeyk Salli va Neytiri yangi oilasini himoya qilishlari kerak. Ular endi dengiz olamida yashashni o\'rganishlari shart.',
    poster: 'https://image.tmdb.org/t/p/original/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
    coverImage: 'https://image.tmdb.org/t/p/original/ovM06PdffK86GpvpIlme7rVvRws.jpg',
    year: 2022, rating: 7.8, quality: '4K',
    genres: ['Fantastika', 'Sarguzasht'], isTrending: false
  },
  {
    _id: '2',
    title: 'Oppengeymer',
    description: 'Atom bombasini yaratgan olimning hayoti haqida.',
    poster: 'https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    coverImage: 'https://image.tmdb.org/t/p/original/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg',
    year: 2023, rating: 8.9, quality: 'HD',
    genres: ['Drama', 'Tarixiy'], isTrending: true
  },
  {
    _id: '3',
    title: 'Dyun 2',
    description: 'Pol Atreydes Fremenlar bilan qasos yo\'liga chiqadi.',
    poster: 'https://image.tmdb.org/t/p/original/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    year: 2024, rating: 8.5, quality: '4K',
    genres: ['Fantastika', 'Drama'], isTrending: true
  },
  {
    _id: '4',
    title: 'Gladiator II',
    description: 'Rim imperiyasida yangi gladiator ko\'tariladi. Lucius o\'tmishini eslab, imperiya shon-sharafi uchun kurashadi.',
    poster: 'https://image.tmdb.org/t/p/original/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
    coverImage: 'https://image.tmdb.org/t/p/original/i9Y9Heio5568m7pT2y8G6F61876.jpg',
    year: 2024, rating: 7.5, quality: '4K',
    genres: ['Jangari', 'Drama'], isTrending: true
  },
  {
    _id: '5',
    title: 'Venom 3',
    description: 'Venom va Eddi oxirgi sarguzashtga chiqishadi.',
    poster: 'https://image.tmdb.org/t/p/original/k42Owka8v91bi7x6eLB1XOs6Yc.jpg',
    year: 2024, rating: 6.8, quality: 'HD',
    genres: ['Jangari', 'Fantastika']
  },
  {
    _id: '6',
    title: 'Deadpool va Wolverine',
    description: 'Ikki super qahramon birlashadi.',
    poster: 'https://image.tmdb.org/t/p/original/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg',
    year: 2024, rating: 8.0, quality: '4K',
    genres: ['Jangari', 'Komediya']
  },
  {
    _id: '7',
    title: 'Moana 2',
    description: 'Moana yangi dengiz sarguzashtiga otlanadi.',
    poster: 'https://image.tmdb.org/t/p/original/yh64qw9mgXBvlaWDi7Q9tpUBAvH.jpg',
    year: 2024, rating: 7.2, quality: 'HD',
    genres: ['Multfilm', 'Sarguzasht']
  },
  {
    _id: '8',
    title: 'Joker: Ikki aqlsizlik',
    description: 'Artur Flek qamoqda yangi dunyoni kashf etadi.',
    poster: 'https://image.tmdb.org/t/p/original/if8QiqCI7WAGImKcJCfzp6VTyKA.jpg',
    year: 2024, rating: 5.8, quality: 'HD',
    genres: ['Drama', 'Triller']
  }
];

const Home = () => {
  const [movies, setMovies] = useState(DUMMY_MOVIES);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/movies?limit=20');
        if (res.data && res.data.length > 0) {
          setMovies(res.data);
        }
      } catch (err) {
        console.log('API fetch failed, using cache/dummy data');
      }
    };
    fetchData();
  }, []);

  const trending = movies.filter(m => m.isTrending);

  return (
    <div className="home">
      <Hero movies={trending.length > 0 ? trending : movies.slice(0, 5)} />

      <section className="container home-section">
        <div className="section-header">
          <h2 className="section-title"><span className="bar"></span><Flame size={16} /> Premyeralar</h2>
          <a href="/trending" className="see-all">Barchasi →</a>
        </div>
        <div className="movie-grid">
          {movies.slice(0, 8).map(m => <MovieCard key={m._id} movie={m} />)}
        </div>
      </section>

      <section className="container home-section">
        <div className="section-header">
          <h2 className="section-title"><span className="bar"></span><TrendingUp size={16} /> Trendda</h2>
          <a href="/trending" className="see-all">Barchasi →</a>
        </div>
        <div className="movie-grid">
          {(trending.length > 0 ? trending : movies).slice(0, 8).map(m => <MovieCard key={m._id} movie={m} />)}
        </div>
      </section>

      <section className="container home-section">
        <div className="section-header">
          <h2 className="section-title"><span className="bar"></span><Clock size={16} /> So'nggi qo'shilganlar</h2>
          <a href="/movies" className="see-all">Barchasi →</a>
        </div>
        <div className="movie-grid">
          {movies.slice(0, 8).map(m => <MovieCard key={m._id} movie={m} />)}
        </div>
      </section>
    </div>
  );
};

export default Home;
