function init() {
    var myLatlng = new google.maps.LatLng(41.55020822595881, -8.41048971953753);
    
    var mapOptions = {
        zoom: 15,
        center: myLatlng,
        scrollwheel: false,
        styles: [
            {
                "featureType": "administrative.country",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "simplified"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            }
        ]
    };

    var mapElement = document.getElementById('map');
    var map = new google.maps.Map(mapElement, mapOptions);
    
    var addresses = ['Braga'];

    for (var x = 0; x < addresses.length; x++) {
        $.getJSON('https://maps.googleapis.com/maps/api/geocode/json?address=' + addresses[x] + '&key=AIzaSyAfk0LqhI_4F8HXPYfvhvwZBtLOhoDkNgI', null, function (data) {
            var p = data.results[0].geometry.location
            var latlng = new google.maps.LatLng(p.lat, p.lng);
            new google.maps.Marker({
                position: latlng,
                map: map,
                icon: {
                    url: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    scaledSize: new google.maps.Size(40, 40)
                }
            });

            // Defina o centro do mapa como a posição do marcador
            map.setCenter(latlng);
        });
    }
}

google.maps.event.addDomListener(window, 'load', init);
