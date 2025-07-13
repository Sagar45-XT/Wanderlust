
    mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
    container: "map", // container ID
    style: 'mapbox://styles/mapbox/streets-v12',
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9// starting zoom
});
console.log('Coordinates:', listing.geometry.coordinates);

map.on('load', () => {
  map.addSource('marker-circle', {
    type: 'geojson',
    data: {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: listing.geometry.coordinates
            }
        }]
    }
});

  map.addLayer({
    id: 'marker-circle-layer',
    type: 'circle',
    source: 'marker-circle',
    paint: {
        'circle-radius': 50,
        'circle-color': '#fe424d',
        'circle-opacity': 0.3,
        'circle-stroke-width': 5,
        'circle-stroke-color': '#fff',
        'circle-stroke-opacity': 0.5,
        },
    });
});

  // Create a default Marker and add it to the map.
    const marker = new mapboxgl.Marker({color:"red"})
        .setLngLat( listing.geometry.coordinates)//listing.geometry.coordinates
        .setPopup(
            new mapboxgl.Popup({offset: 25})
            .setHTML(`<h5>${listing.title}</h5><p>Exact Location will be provided after booking</p>`)
        )   
        .addTo(map);
       

