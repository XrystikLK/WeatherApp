const ol = window.ol

let map = null;
let markerLayer = null;

export function getMap(position, title) {
    const latitude = position[0];
    const longitude = position[1];

    const centerCoordinate = ol.proj.fromLonLat([longitude, latitude]);

    map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            })
        ],
        view: new ol.View({
            center: centerCoordinate,
            zoom: 15
        })
    });

    const pointFeature = new ol.Feature({
        geometry: new ol.geom.Point(centerCoordinate)
    });

    const markerStyle = new ol.style.Style({
        image: new ol.style.Circle({
            radius: 6,
            fill: new ol.style.Fill({color: 'red'}),
            stroke: new ol.style.Stroke({color: 'black', width: 1})
        })
    });

    markerLayer = new ol.layer.Vector({
        source: new ol.source.Vector({
            features: [pointFeature]
        }),
        style: markerStyle
    });

    map.addLayer(markerLayer);


    const popupElement = document.createElement('div');
    popupElement.className = 'ol-popup-content';
    popupElement.innerHTML = title;

    const popup = new ol.Overlay({
        element: popupElement,
        positioning: 'bottom-center',
        stopEvent: false,
        offset: [0, -10]
    });

    map.addOverlay(popup);
    popup.setPosition(centerCoordinate);
}