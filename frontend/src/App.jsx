import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Login from './pages/Login';
import AdminPanel from './pages/AdminPanel';
import SearchPage from './pages/Search';
import Categories from './pages/Categories';
import Movies from './pages/Movies';
import Trending from './pages/Trending';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
