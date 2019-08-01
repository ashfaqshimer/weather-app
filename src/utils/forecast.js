const request = require('request');

const forecast = (latitude, longitude, callback) => {
	const url = `https://api.darksky.net/forecast/cea59126a170785e4ff0e76bb327e8f3/${latitude},${longitude}`;

	request({ url, json: true }, (err, { body }) => {
		if (err) {
			callback('Unable to connect to the weather service', undefined);
		} else if (body.error) {
			callback('Unable to find location', undefined);
		} else {
			const currently = body.currently;
			const temperature = currently.temperature;
			const rainProbability = currently.precipProbability * 100;

			callback(
				undefined,
				`It is currently ${temperature} degrees out. There is a ${rainProbability}% chance of rain`
			);
		}
	});
};

module.exports = forecast;
