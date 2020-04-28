const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

//Middlewares
app.use(cors());
app.use(morgan('common'));

//Routes
app.get('/movie', (req, res) => {
	res.json('Hello their');
});

app.listen(5000, () => {
	console.log('Server running on port 5000');
});
