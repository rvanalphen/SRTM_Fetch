const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.listen(3000, () => console.log('listening at 3000'));
app.use(express.static('public'));
app.use(express.json({
    limit: '1mb'
}));

app.post('/api', (request, response) => {
    console.log('I got a request');
    const coords = request.body;
    const timestamp = Date.now();
    coords.timestamp = timestamp;
    response.json({
        status: 'succcess',
        time: timestamp,
        latitude: coords.lat,
        longitude: coords.lon
    });
});

app.get('/elevation/:latlonsource', async (request, response) => {
    const latlonsource = request.params.latlonsource.split(',');
    const lat = latlonsource[0];
    const lon = latlonsource[1];
    const source = latlonsource[2];
    console.log(lat, lon, source);
    const api_url = ` https://api.elevationapi.com/api/Elevation?lat=${lat}&lon=${lon}&dataSet=${source}`
    const fetch_response = await fetch(api_url);
    const json = await fetch_response.json();
    response.json(json);
    console.log('Got Elevation');
});