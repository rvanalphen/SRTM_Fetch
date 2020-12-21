const button = document.getElementById('submit');
button.addEventListener('click', async event => {
    const lat = document.getElementById('lat').value;
    const lon = document.getElementById('lon').value;
    const coords = {
        lat,
        lon,
    };
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(coords)
    };
    const response = await fetch('/api', options);
    const json = await response.json();
    // console.log(json);
});
dat = []
button.addEventListener('click', async event => {
    const lat = document.getElementById('lat').value;
    const lon = document.getElementById('lon').value;
    const source = document.getElementById('source').value;
    const api_url = `elevation/${lat},${lon},${source}`
    const response = await fetch(api_url);
    const data = await response.json();
    console.log(data);
    dat.push(data)
    elevationHTMLString = `<h2>The Location is out of bounds, please choose another coordinate!</h2>`
    if (data.geoPoints) {
        const elevation = data.geoPoints[0].elevation;
        elevationHTMLString = `<h2>The Elevation at ${lat}N, ${lon}W is ${elevation}m</h2>`
    }

    const div = document.getElementById('results')
    div.innerHTML = elevationHTMLString;
});