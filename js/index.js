
const NY_LAT_LONG = {lat: 40.7291, lng: -73.9965};

const DISTRICTS_SHAPES_URL = "https://services5.arcgis.com/GfwWNkhOj9bNBqoJ/arcgis/rest/services/nycd/FeatureServer/0/query?where=1=1&outFields=*&outSR=4326&f=geojson"

var map;

var districtPoints = [];

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: NY_LAT_LONG
  });
  var marker = new google.maps.Marker({
    position: NY_LAT_LONG,
    map: map
  });
  loadShapes(DISTRICTS_SHAPES_URL);
}


function loadShapes(URL){
  var data = $.get(URL,function() {})
    .done(function(){
      data = JSON.parse(data.responseText);
      console.log(data.features[10].geometry.coordinates);
      for (var i = 0; i < data.features.length; i++) {
        var coordinates = data.features[i].geometry.coordinates;
        var row = [];
        for (var j = 0; j < coordinates.length; j++) {
          var piece = coordinates[j];
          for (var k = 0; k < piece.length; k++) {
            row.push({lat:piece[k][1],lng:piece[k][0]});
          }
        }
        addPolygons(row);
      }

    })
    .fail(function(error){
      console.log(error);
    })
}

function addPolygons(row){
    var color = getRandomColor();
    var newDistrict = new google.maps.Polygon({
      paths: row,
      strokeColor: color,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: color,
      fillOpacity: 0.2
    });
    newDistrict.setMap(map);
}

function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
