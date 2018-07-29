# Google Maps Geofence

### geofence.js - Google maps geofence api in a more sophisticated way.
Click for demo [https://sujancse.github.io/geofence/](https://sujancse.github.io/geofence/)

## How to Use
1. Add a reference to Google Maps API
2. Add gmap-v3-geofence.min.js in your HTML
3. And don't forget to add the Google Maps API key

```html
<!DOCTYPE html>
<html>
<head>
  <title>Geofence Demo</title>
  <script src="http://maps.google.com/maps/api/js?key=YOUR_API_KEY"></script>
  <script src="gmap-v3-geofence.min.js"></script>
  <style type="text/css">
    #mymap {
      width: auto;
      height: 450px;
    }
  </style>
</head>
<body>
  <div id="mymap"></div>
  <script>
  
    var coords = [
        [23.832570352277692,90.41199964550788],
        [23.798165936805923,90.38352334497074],
        [23.79768310017011,90.43916111914064]
    ];
    
    var geofence = new Geofence({mapId: 'mymap'});
    
    geofence.draw(coords);
    
  </script>
</body>
</html>
```

## Geofence Events

#### Events list
* nodeClick
* polygonClick
* dragStart
* dragEnd
* setAt
* insertAt

## Example Usage

#### Click on the node and delete
```
geofence.on('nodeClick', [polygon], function (event, polygon) {
    // Do something with the event and clicked polygon
    
    // Your can show infoWindow or marker
    var contentString = '<button id="delete">Delete</button>';
    infoWindow = geofence.createInfowindow(contentString, event);
    
    // Then on infowindow ready click delete to delete the node
    geofence.onDomReady(infoWindow, function() {
        selectId('delete').addEventListener('click', function() {
            geofence.close(infoWindow);
            geofence.deleteNode(event, polygon);
        });
    });
});
```

#### Drag end revert the polygon
```
geofence.on('dragEnd', [polygon], function (event, polygon, previousState) {
    
    // Show the infowindow
    var contentString = '<button id="revert">Revert</button>';
    infoWindow = geofence.createInfowindow(contentString, event);
    
    // On infowindow ready revert the polygon to previous state
    geofence.onDomReady(infoWindow, function() {
        selectId('revert').addEventListener('click', function() {
            geofence.close(infoWindow);
            geofence.revert(polygon, previousState);
        });
    });
});
```

## API functions

#### Draw the polygon
```
/**
 * Draw polygon using coordinates
 *
 * @param coordinates
 * @param options optional
 * @returns {*}
 */
 
geofence.draw(coords, options);
```

## Polygon events
#### On polygon node click
```
/**
* On node click will give you the event
* which includes the node coordinates
* See demo example how to use that coordinates
*/

geofence.on('nodeClick', [polygon], function (event, polygon) {
    // Do something with the node and polygon
});
```

#### On polygon click
```
/**
* On click will give you the event
* which includes the clicked coordinates
* See demo example how to use that coordinates
*/

geofence.on('polygonClick', [polygon], function (event, polygon) {
    // Do something with the event and polygon
});
```

#### Delete the clicked node
```
/**
* Delete the node by passing the node clicked event 
* and the polygon object
*
* Use this function inside on node click event
*/

geofence.deleteNode(event, polygon);
```

#### Drag the polygon and catch the event
```
/**
* Polygon dragStart will give you the event
* which includes the current coordinates
*/

geofence.on('dragStart', function(event, polygon) {
    // Do somethong with the event and polygon
});
```

#### Polygon dragEnd event
```
/**
* Polygon dragEnd will give you the event, current polygon
* and the previous polygon state
*
* See the advanced demo to know
* How to get back to the previous demo
*/

geofence.on('dragEnd', function(event, polygon, previousState) {
    // Do somethong with the event, polygon and previousState
});
```

#### Polygon insertAt and setAt event
```
/**
* Polygon insertAt and setAt will give you the event and polygon
*
* You get the polygon coordinates and events
*/

geofence.on('insertAt', function(event, polygon) {
    // Do somethong with the event and polygon
});

geofence.on('setAt', function(event, polygon) {
    // Do somethong with the event and polygon
});
```

## Create InfoWindow and Marker
#### Create and infoWindow
```
/**
* Provide the content string
* Make sure you use this inside some events
*/

geofence.createInfowindow(contentString, event);

geofence.close(infoWindow);
```

## General helper functions
#### Revert the polygon to previous state
```
/**
* Revert the polygon to previous state
* Make sure to use inside dragEnd event
*/

geofence.revert(polygon, previousState);
```

#### Get the polygon coordinates
```
/**
 * Get the polygon coordinates
 *
 * @param polygon object
 * @returns {*|Array}
 */
 
geofence.getCoordinates(polygon);
```

#### Get the polygon coordinates string
```
/**
 * Get the polygon coordinates string
 *
 * @param polygon object
 * @returns string
 */
 
geofence.getCoordinatesString(polygon);
```

#### Coordinates string to array
```
/**
 * Get the polygon coordinates string to array
 *
 * @param polygon object
 * @returns array
 */
 
geofence.stringToArray(coordinatesString);
```

#### Coordinates to LatLng object
```
/**
 * Coordinates to LatLng object
 *
 * @param polygon object
 * @returns LatLng object
 */
 
geofence.coordinatesToLatLng(coordinates);
```