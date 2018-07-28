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
  <title></title>
  <script src="http://maps.google.com/maps/api/js?key=YOUR_API_KEY"></script>
  <script src="gmap-v3-geofence.min.js.js"></script>
  <style type="text/css">
    #mymap {
      width: 400px;
      height: auto;
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