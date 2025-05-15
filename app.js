mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v11',
    center: [-98.5795, 39.8283], // USA center
    zoom: 3,
    pitch: 60,
    bearing: -10,
    antialias: true
});

map.on('load', () => {
    map.addSource('mapbox-dem', {
        'type': 'raster-dem',
        'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
        'tileSize': 512,
        'maxzoom': 14
    });
    map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });

    map.addLayer({
        'id': 'sky',
        'type': 'sky',
        'paint': {
            'sky-type': 'atmosphere',
            'sky-atmosphere-sun': [0.0, 0.0],
            'sky-atmosphere-sun-intensity': 15
        }
    });

    // Sample city markers
    const cities = [
        { name: "Los Angeles", coords: [-118.25, 34.05], service: "Tech Repair Co" },
        { name: "Chicago", coords: [-87.63, 41.88], service: "Summit Roofing" },
        { name: "New York", coords: [-74.00, 40.71], service: "Anderson CPA" }
    ];

    cities.forEach(city => {
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(
            city.name + ": " + city.service
        );

        new mapboxgl.Marker()
            .setLngLat(city.coords)
            .setPopup(popup)
            .addTo(map);
    });
});
