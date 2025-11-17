const L = window.L;

let map = null;
let marker = null;

export function getMap(position, tooltip) {
    if (map !== null) {
        map.remove();
        map = null;
        marker = null;
    }

    map = L.map('map').setView(position, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    marker = L.marker(position).addTo(map)
        .bindPopup(tooltip)
        .openPopup();
}