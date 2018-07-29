var selectId = document.getElementById.bind(document), infoWindow;

var coords = [
    [23.859575638725445,90.5668382075196],
    [23.795967001844076,90.59398019311526],
    [23.79517001926506,90.6678140732422],
    [23.75164296100932,90.60723709521483],
    [23.69552680957083,90.62905757812496],
    [23.73149317776876,90.57256633972167],
    [23.694533627711703,90.50646206420902],
    [23.749670811548736,90.5313383184814],
    [23.79347603001114,90.46557736572265],
    [23.794491737109826,90.5450468979493]
];

var options = {
    strokeWeight: 1,
    editable: true,
    draggable: true
};

var geofence = new Geofence({mapId: 'mymap'});

var oldPolygon = drawPolygon(geofence, 'coordinates');

function drawPolygon(geofence, infoId) {
    var polygon = geofence.draw(coords);
    var map = geofence.map;
    var bounds = geofence.getBounds(polygon);
    map.fitBounds(bounds);

    geofence.setInfo(polygon, infoId);

    geofence.on('nodeClick', [polygon], function (event, polygon) {
        var contentString = '<button id="delete">Delete</button>';
        infoWindow = geofence.createInfowindow(contentString, event);

        geofence.onDomReady(infoWindow, function() {
            selectId('delete').addEventListener('click', function() {
                geofence.close(infoWindow);
                var newPolygon = geofence.deleteNode(event, polygon);
                geofence.setInfo(newPolygon, infoId);
            });
        });
    });

    geofence.on('polygonClick', [polygon], function (event, polygon) {
        var contentString = event.latLng + '';
        infoWindow = geofence.createInfowindow(contentString, event);
    });

    geofence.on('insertAt', [polygon], function(event, polygon) {
        geofence.setInfo(polygon, infoId);
    });

    geofence.on('setAt', [polygon], function(event, polygon) {
        geofence.setInfo(polygon, infoId);
    });

    geofence.on('dragStart', [polygon], function(event, polygon) {
        geofence.close(infoWindow);
        geofence.setInfo(polygon, infoId);
    });

    geofence.on('dragEnd', [polygon], function (event, polygon, previousState) {

        var contentString = '<button id="revert">Revert</button>';
        infoWindow = geofence.createInfowindow(contentString, event);
        geofence.setInfo(polygon, infoId);

        geofence.onDomReady(infoWindow, function() {
            selectId('revert').addEventListener('click', function() {
                geofence.close(infoWindow);
                var newPolygon = geofence.revert(polygon, previousState);
                geofence.setInfo(newPolygon, infoId);
            });
        });
    });

    return polygon;
}

selectId('draw').onclick = function (e) {
    e.preventDefault();

    var coords = geofence.coordinatesToLatLng(geofence.stringToArray(selectId('coordinates').value.trim()));
    var poly = geofence.updatePolygonPath(oldPolygon, coords);
    var map = geofence.map;
    var bounds = geofence.getBounds(poly);
    map.fitBounds(bounds);
};