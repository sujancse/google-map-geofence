(function() {

    /**
     * Default map options
     *
     * @type {{zoom: number, center: {lat: number, lng: number}, mapTypeId: string, mapId: string}}
     */
    var options = {
        zoom: 11,
        center: {lat: 23.830372, lng: 90.411313},
        mapTypeId: 'terrain',
        mapId: 'mymap'
    };

    var selectId = document.getElementById.bind(document);

    /**
     * The Geofence constructor
     * Initialize the map object
     *
     * @param opt
     * @constructor
     */
    this.Geofence = function(opt) {

        this.options = Object.assign(options, opt);

        this.map = new google.maps.Map(document.getElementById(this.options.mapId), {
            zoom: this.options.zoom,
            center: this.options.center,
            mapTypeId: this.options.mapTypeId
        });
    }

    // Public Methods
    /**
     * Draw polygon using coordinates
     *
     * @param coordinates
     * @param options
     * @returns {*}
     */
    Geofence.prototype.draw = function(coordinates, options) {
        var coords = coordinatesToLatLng(coordinates);
        return draw(this.map, newPolygon(coords, options));
    }

    /**
     * Get the polygon geo bounds
     *
     * @param polygon
     * @returns {*}
     */
    Geofence.prototype.getBounds = function(polygon) {
        return getBounds(polygon);
    }

    /**
     * Get the polygon coordinates
     *
     * @param polygon
     * @returns {*}
     */
    Geofence.prototype.getCoordinates = function(polygon) {
        return getCoordinates(polygon);
    }

    /**
     * Create infowindow on clicked position
     *
     * @param contentString
     * @param event
     * @returns {*}
     */
    Geofence.prototype.createInfowindow = function(contentString, event) {
        return newInfowindow(this.map, contentString, event);
    }

    /**
     * Delete a polygon node
     *
     * @param event
     * @param polygon
     * @returns {*}
     */
    Geofence.prototype.deleteNode = function(event, polygon) {
        return deleteNode(event, polygon);
    }

    /**
     * Get coordinates string
     *
     * @param polygon
     * @returns {*}
     */
    Geofence.prototype.getCoordinatesString = function(polygon) {
        return getCoordinatesString(polygon);
    }

    /**
     * Get coords array from coords string
     *
     * @param coordsString
     * @returns {*}
     */
    Geofence.prototype.stringToArray = function(coordsString) {
        return stringToArray(coordsString);
    }

    /**
     * Coordinates array to LatLng object
     *
     * @param coordinates
     * @returns {Array}
     */
    Geofence.prototype.coordinatesToLatLng = function (coordinates) {
        return coordinatesToLatLng(coordinates);
    }

    /**
     * Update polygon path
     *
     * @param polygon
     * @param coords
     * @returns {*}
     */
    Geofence.prototype.updatePolygonPath = function (polygon, coords) {
        return updatePolygonPath(polygon, coords);
    }

    /**
     * Get all geofences
     *
     * @returns {*}
     */
    Geofence.prototype.getGeofence = function() {
        return getGeofence();
    }

    /**
     * Delete a polygon
     *
     * @param polygon
     */
    Geofence.prototype.delete = function(polygon) {
        polygon.setMap(null);
    }

    /**
     * Check wheather the dom object is ready or not
     *
     * @param object
     * @param callback
     * @returns {*}
     */
    Geofence.prototype.onDomReady = function(object, callback) {
        return onDomReady(object, callback);
    }

    /**
     * Revert polygon to previous state
     *
     * @param polygon
     * @param previousState
     * @returns {*}
     */
    Geofence.prototype.revert = function(polygon, previousState) {
        return revert(polygon, previousState);
    }

    /**
     * Handling all polygon events
     *
     * @param event
     * @param objects
     * @param callback
     */
    Geofence.prototype.on = function(event, objects = [], callback) {
        for (var i = 0; i < objects.length; i++) {
            objects[i].addListener(event, callback);
        }
    }

    /**
     * Close an infoWindow
     *
     * @param infoWindow
     */
    Geofence.prototype.close = function(infoWindow) {
        if (infoWindow instanceof google.maps.InfoWindow) {
            infoWindow.close();
        }
    }

    /**
     * Set polygon coordinates string to specific id
     *
     * @param polygon
     * @param infoId
     */
    Geofence.prototype.setInfo = function(polygon, infoId) {
        selectId(infoId).value = getCoordinatesString(polygon);
    }

    /** ******************************************************
     * Private function of plugin
     ** *************************************************** */

    /**
     * Draw a polygon on specific map
     *
     * @param map
     * @param polygon
     * @returns {*}
     */
    function draw(map, polygon) {

        polygon.setMap(map);

        poygon = initializeEvents(polygon);

        polygon.on = function(event, callback) {
            polygon.addListener(event, callback);
        };

        return polygon;
    }

    /**
     * Initialize the polygon object
     *
     * @param coords
     * @param options
     * @returns {google.maps.Polygon}
     */
    function newPolygon(coords, options) {
        // removeGeofenceByIds(polygonIds);

        var geofenceOptions = {
            strokeWeight: 1,
            editable: true,
            draggable: true
        }

        var previousState;

        geofenceOptions.path = coords;
        geofenceOptions = Object.assign(geofenceOptions, options);

        var polygon = new google.maps.Polygon(geofenceOptions);

        return polygon;
    }

    /**
     * Initialize polygon events
     *
     * @param polygon
     * @returns {*}
     */
    function initializeEvents(polygon) {
        polygon.addListener('click', function (event) {

            var coords = coordinatesToLatLng(getCoordinates(polygon));

            var match = coords.filter(function(coord) {
                return coord.equals(event.latLng);
            });

            if (match.length >= 1) {
                google.maps.event.trigger(this, 'nodeClick', event, this);
            } else {
                google.maps.event.trigger(this, 'polygonClick', event, this);
            }

        });

        polygon.addListener('dragstart', function (event) {
            google.maps.event.trigger(this, 'dragStart', event, this);

            previousState = getCoordinates(polygon);
        });

        polygon.addListener('dragend', function (event) {
            google.maps.event.trigger(this, 'dragEnd', event, this, previousState);
        });

        google.maps.event.addListener(polygon, 'mouseover', function () {

            var self = this;

            google.maps.event.addListener(polygon.getPath(), "insert_at", function () {
                google.maps.event.trigger(self, 'insertAt', event, self);
            });

            google.maps.event.addListener(polygon.getPath(), "set_at", function () {
                google.maps.event.trigger(self, 'setAt', event, self);
            });

        });

        return polygon;
    }

    /**
     * Update polygon MVC path array
     *
     * @param polygon
     * @param coords
     * @returns {*}
     */
    function updatePolygonPath(polygon, coords) {
        var map = polygon.map;
        polygon.setMap(null);
        var poly = newPolygon(coords);
        polygon.setPaths(poly.getPath());
        polygon.setMap(map);

        return polygon;
    }

    /**
     * Checking wheather the DOM object is reday
     *
     * @param object
     * @param callback
     */
    function onDomReady(object, callback) {
        return google.maps.event.addListener(object, 'domready', callback);
    }

    /**
     * Get the bounds object of a polygon
     *
     * @param polygon
     * @returns {google.maps.LatLngBounds}
     */
    function getBounds(polygon) {
        var bounds = new google.maps.LatLngBounds();
        var paths = polygon.getPaths();

        for (var i = 0; i < paths.getLength(); i++) {
            var path = paths.getAt(i);
            for (var ii = 0; ii < path.getLength(); ii++) {
                bounds.extend(path.getAt(ii));
            }
        }

        return bounds;
    }

    /**
     * Get bounds array of polygon object
     *
     * @param polygon
     * @returns {[*,*,*,*]}
     */
    function getBoundsArr(polygon) {
        var bounds = getGeobounds(polygon);

        var boundsArr = [
            bounds.getNorthEast().lat(), 
            bounds.getNorthEast().lng(), 
            bounds.getSouthWest().lat(), 
            bounds.getSouthWest().lng()
        ];

        return boundsArr;
    }

    /**
     * Create a new infoWindow in specific map
     *
     * @param map
     * @param contentString
     * @param ev
     * @returns {google.maps.InfoWindow}
     */
    function newInfowindow(map, contentString, ev) {
        var infoWindow = new google.maps.InfoWindow;
        infoWindow.setContent(contentString);
        infoWindow.setPosition(ev.latLng);
        infoWindow.open(map);

        return infoWindow;
    }

    /**
     * Delete a polygon node
     *
     * @param event
     * @param polygon
     * @returns {*}
     */
    function deleteNode(event, polygon) {

        var polygonCoords = getNodes(polygon);

        if (polygonCoords.length <= 3) {
            throw new Error('Coordinates size must be greater than 3');
        }

        var coords = polygonCoords.filter(function(coord) {
            return coord.equals(event.latLng) != true;
        });

        return updatePolygonPath(polygon, coords);
    }

    /**
     * Revert a polygon to previous state
     *
     * @param polygon
     * @param previousState
     * @returns {*}
     */
    function revert(polygon, previousState) {

        var coords = coordinatesToLatLng(previousState);

        return updatePolygonPath(polygon, coords);
    }

    /**
     * Coords string to Array
     *
     * @param coordsString
     * @returns {Array}
     */
    function stringToArray(coordsString) {
        return coordsString.split('\n').map(function(a) {
            return a.split(',').map(function(b) {
                return parseFloat(b);
            });
        });
    }

    /**
     * Coordinates to LatLng
     *
     * @param coordinates
     * @returns {Array}
     */
    function coordinatesToLatLng(coordinates) {
        var coords = [];

        if (!Array.isArray(coordinates) || coordinates.length < 3) {
            throw new Error('Coordinates size must be greater than 3');
        }

        for (var coordinate in coordinates) {
            coords.push(new google.maps.LatLng(coordinates[coordinate][0], coordinates[coordinate][1]));
        }

        return coords;
    }

    /**
     * Get coordinates of a polygon object
     *
     * @param polygon
     * @returns {*|Array}
     */
    function getCoordinates(polygon) {
        var coordsArr = [];

        for (var i = 0; i < polygon.getPath().getLength(); i++) {
            coordsArr.push(polygon.getPath().getAt(i).toUrlValue(15).split(','));
        }

        return coordsArr;
    }

    /**
     * Get coordinates string of a polygon object
     *
     * @param polygon
     * @returns {string}
     */
    function getCoordinatesString(polygon) {
        var coordinates = getCoordinates(polygon);
        var coordsString = '';

        for (var i = 0; i < coordinates.length; i++) {
            coordsString += coordinates[i][0] + ',' + coordinates[i][1] + '\n';
        }

        return coordsString;
    }

    /**
     * Get polygon nodes
     *
     * @param polygon
     * @returns {*}
     */
    function getNodes(polygon) {
        var nodes = [];

        for (var i = polygon.getPath().length - 1; i >= 0; i--) {
            nodes.push(polygon.getPath().getAt(i));
        }
        
        return nodes;
    }

    /**
     * Get map options
     *
     * @returns {{zoom: number, center: {lat: number, lng: number}, mapTypeId: string, mapId: string}}
     */
    function getOptions() {
        return options;
    }

}());