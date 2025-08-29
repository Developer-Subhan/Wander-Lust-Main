
const geojson = {
    'type': 'FeatureCollection',
    'features': [
        {
            'type': 'Feature',
            'properties': {
                'iconSize': [30, 30],
                'image': 'https://w7.pngwing.com/pngs/848/762/png-transparent-computer-icons-home-house-home-angle-building-rectangle-thumbnail.png'
            },
            'geometry': {
                'type': 'Point',
                'coordinates': listing.geometry.coordinates
            }
        }
    ]
};

const map = new maplibregl.Map({
  container: "map",
  style: "https://api.maptiler.com/maps/0198d78c-d3ed-79bf-a216-cc28f59b42f0/style.json?key=6Gpttf2hnuKUI9LmDtv2",
  center: listing.geometry.coordinates,
  zoom: 10,
  maplibreLogo: false,
});

geojson.features.forEach((marker) => {
    // create a DOM element for the marker
    const el = document.createElement('div');
    el.className = 'marker';
    
    // Set background image to your home icon
    el.style.backgroundImage = `url(${marker.properties.image})`;
    el.style.width = `${marker.properties.iconSize[0]}px`;
    el.style.height = `${marker.properties.iconSize[1]}px`;
    el.style.backgroundSize = 'cover';   
    el.style.backgroundPosition = 'center';
    el.style.backgroundRepeat = 'no-repeat';
    
    // Make it round
    el.style.borderRadius = '50%';
    el.style.border = '2px solid white';
    el.style.cursor = 'pointer';

    // Create popup for this marker (tooltip style)
    const popup = new maplibregl.Popup({ offset: 25, closeButton: false, closeOnClick: false })
        .setHTML(`<strong>${listing.location}</strong><p>Exact location provided after booking.</p>`);

    // Add marker to map
    const markerObj = new maplibregl.Marker({ element: el })
        .setLngLat(marker.geometry.coordinates)
        .addTo(map);

    // Show popup on hover
    el.addEventListener('mouseenter', () => popup.addTo(map).setLngLat(marker.geometry.coordinates));
    el.addEventListener('mouseleave', () => popup.remove());
});

console.log("Listing object:", listing);
console.log("Coordinates:", listing.geometry?.coordinates);
