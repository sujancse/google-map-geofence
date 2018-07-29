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