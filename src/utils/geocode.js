const request = require('request');

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1Ijoicm95YWxmbHVzaCIsImEiOiJjanlwdWx0ZjMwZGtnM2VtdXcwaTBzajlkIn0.LD6M24wJNXBFVnSGRp8aaw&limit=1`;

	request({ url, json: true }, (err, { body }) => {
		if (err) {
			callback('Unable to connect to location service.', undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another search.', undefined);
		} else {
			const features = body.features[0];
			callback(undefined, {
				latitude  : features.center[1],
				longitude : features.center[0],
				location  : features.place_name
			});
		}
	});
};

module.exports = geocode;
