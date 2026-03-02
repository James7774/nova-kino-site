const fs = require('fs');
const path = require('path');

const FILE_PATH = path.join(__dirname, '../data/movies.json');

// Ensure directory exists
if (!fs.existsSync(path.join(__dirname, '../data'))) {
    fs.mkdirSync(path.join(__dirname, '../data'));
}

// Initial dummy data if file doesn't exist
if (!fs.existsSync(FILE_PATH)) {
    fs.writeFileSync(FILE_PATH, JSON.stringify([
        {
            _id: '1',
            title: 'Avatar: Suv yo\'li',
            description: 'Pandora dunyosiga qaytish. Jeyk Salli va Neytiri yangi oilasini himoya qilishlari kerak.',
            poster: 'https://image.tmdb.org/t/p/original/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
            coverImage: 'https://image.tmdb.org/t/p/original/ovM06PdffK86GpvpIlme7rVvRws.jpg',
            year: 2022, quality: '4K', genres: ['Fantastika'], isTrending: true, rating: 7.8
        },
        {
            _id: '4',
            title: 'Gladiator II',
            description: 'Rim imperiyasida yangi gladiator ko\'tariladi. Lucius o\'tmishini eslab kurashadi.',
            poster: 'https://image.tmdb.org/t/p/original/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg',
            coverImage: 'https://image.tmdb.org/t/p/original/i9Y9Heio5568m7pT2y8G6F61876.jpg',
            year: 2024, quality: '4K', genres: ['Jangari', 'Drama'], isTrending: true, rating: 8.5
        },
        {
            _id: '2',
            title: 'Oppengeymer',
            description: 'Atom bombasini yaratgan olimning hayoti haqida.',
            poster: 'https://image.tmdb.org/t/p/original/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
            year: 2023, quality: 'HD', genres: ['Drama', 'Tarixiy'], isTrending: true, rating: 8.9
        }
    ], null, 2));
}

const getJsonMovies = () => {
    try {
        const data = fs.readFileSync(FILE_PATH, 'utf8');
        return JSON.parse(data);
    } catch (e) {
        return [];
    }
};

const saveJsonMovies = (movies) => {
    fs.writeFileSync(FILE_PATH, JSON.stringify(movies, null, 2));
};

module.exports = { getJsonMovies, saveJsonMovies };
