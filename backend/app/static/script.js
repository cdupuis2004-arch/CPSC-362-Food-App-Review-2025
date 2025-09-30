var map = L.map('map', {
    center: [33.88348879241312, -117.88525853608621],
    zoom: 16.6,
    zoomSnap: 0.1
});

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
}).addTo(map);

L.circleMarker([33.88348879241312, -117.88525853608621]).addTo(map)
    .bindPopup('This is our campus!')
    .openPopup();
