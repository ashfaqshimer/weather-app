const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

// Define Paths
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Weather Utilities
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// Setup handlebars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory
app.use(express.static(publicDirectory));

// Endpoints
app.get('/', (req, res) => {
	res.render('index', { title: 'Weather', name: 'Ashfaq' });
});

app.get('/help', (req, res) => {
	res.render('help', { title: 'Help', name: 'Ashfaq', message: 'Help MEEEE!!' });
});

app.get('/about', (req, res) => {
	res.render('about', { title: 'About' });
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({ error: 'You must provide an address.' });
	}

	const address = req.query.address;
	geocode(address, (error, { latitude, longitude, location } = {}) => {
		if (error) {
			return res.send({ error });
		}
		// Forecast
		forecast(latitude, longitude, (error, forecastData) => {
			if (error) {
				return res.send({ error });
			}
			res.send({ forecast: forecastData, location, address: req.query.address });
		});
	});
});

// Error handler
app.get('/help/*', (req, res) => {
	res.render('404', { message: 'Help article not found.' });
});

app.get('*', (req, res) => {
	res.render('404', { message: 'Page not found' });
});

// Server port
app.listen(3000, () => {
	console.log('Server started on port 3000');
});
