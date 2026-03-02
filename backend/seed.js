const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/userModel');
const Movie = require('./models/movieModel');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/novakino')
  .then(async () => {
    console.log('MongoDB Connected for seeding...');
    
    // Clear existing data
    await User.deleteMany();
    await Movie.deleteMany();

    // Create Admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    await User.create({
      username: 'admin',
      password: hashedPassword,
      isAdmin: true
    });

    console.log('Admin user created: admin / admin123');

    // Create Dummy Movies
    const dummyMovies = [
      {
        title: 'Avatar: Suv yo\'li',
        description: 'Pandora dunyosiga qaytish. Jeyk Salli va Neytiri o\'zlarining yangi oilasini himoya qilishlari kerak.',
        poster: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1000',
        coverImage: 'https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=80&w=2000',
        videoUrl: 'https://www.youtube.com/embed/d9MyW72ELq0',
        year: 2022,
        rating: 8.5,
        quality: '4K',
        genres: ['Ekshen', 'Fentezi'],
        isTrending: true
      },
      {
        title: 'Oppengeymer',
        description: 'Atom bombasi yaratilishining dramatik hikoyasi.',
        poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&q=80&w=1000',
        videoUrl: 'https://www.youtube.com/embed/uYPbbksJxIg',
        year: 2023,
        rating: 9.0,
        quality: 'HD',
        genres: ['Drama', 'Tarixiy'],
        isTrending: true
      },
      {
        title: 'Dyun: Ikkinchi qism',
        description: 'Pol Atreydes Chani va Fremenlar bilan birlashib, qasos yo\'liga chiqadi.',
        poster: 'https://images.unsplash.com/photo-1509281373149-e957c6296406?auto=format&fit=crop&q=80&w=1000',
        videoUrl: 'https://www.youtube.com/embed/Way9Dexny3w',
        year: 2024,
        rating: 8.8,
        quality: '4K',
        genres: ['Sarguzasht', 'Drama'],
        isTrending: true
      }
    ];

    await Movie.insertMany(dummyMovies);
    console.log('Dummy movies seeded!');

    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
