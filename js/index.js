function initMap() {
  var ny = {lat: 40.7291, lng: -73.9965};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: ny
  });
  var marker = new google.maps.Marker({
    position: ny,
    map: map
  });
}
