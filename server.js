const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const db = require('./db');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

const API_token = process.env.API_Token;

const auth = (req, res, next) => {
	if (!req.get('Authorization')) {
		return res.status(401).json('Missing credentials');
	}

	const key = req.get('Authorization').split(' ')[1];

	if (!(key === API_token)) {
		return res.status(401).json('Invalid token');
	}

	next();
};

//Middlewares
app.use(cors());
app.use(auth);
app.use(helmet());
app.use(morgan('common'));

//Routes
app.get('/movie', (req, res) => {
	const { genre, country, avg_vote } = req.query;

	let movies = [...db];

	if (genre || country || avg_vote) {
		if (genre) {
			let search = genre.toLowerCase();
			movies = movies.filter((movie) =>
				movie.genre.toLowerCase().includes(search)
			);
			return res.status(200).json(movies);
		}

		if (country) {
			let search = country.toLowerCase();
			movies = movies.filter((movie) =>
				movie.country.toLowerCase().includes(search)
			);
			return res.status(200).json(movies);
		}

		if (avg_vote) {
			let search = parseInt(avg_vote);
			movies = movies.filter((movie) => Number(movie.avg_vote) >= search);
			return res.status(200).json(movies);
		}
	}

	res.status(200).json(movies);
});

app.listen(5000, () => {
	console.log('Server running on port 5000');
});
