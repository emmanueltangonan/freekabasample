
	var map;
    var infoWindow;
    var centerPos;
    var keyword;
    var searchradius;
    var zoomlevel;
    var userLocation;
    var local;
    var city;
    var country;
    
    $(document).ready(function(){
    	$('#srch-btn').click(function(){
    	    keyword = $('#search-keyword').val();
    	    searchradius = parseInt($('#search-radius').val() == "" ? '500' : $('#search-radius').val());
    	    zoomlevel = Math.floor(16 - Math.log(searchradius/500) / Math.log(2));
    	    
    	    if(keyword != "" && searchradius != null){
    	    	searchPlace(keyword, searchradius);
    	    }else{
    	    	alert("Enter a value.");
    	    }
    	});
    	
    });
    
    
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: centerPos,
          zoom: 10
        });
        
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            centerPos = pos;
            var infoWindow = new google.maps.InfoWindow({map: map});
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            map.setCenter(pos);
            var geocoder = new google.maps.Geocoder;
     //       var test = {lat: -36.987134, lng: 174.858703}; //TEST replace with centerPos
            geocoder.geocode({'location': centerPos}, function(results, status) {
            	if(status==='OK'){
            		userLocation = results[1].formatted_address;
            		local = results[1].address_components[0].short_name;
                    city = results[1].address_components[2].short_name;
                    country = results[1].address_components[4].short_name;
                    $('#user-address').text(userLocation);
                    getCurrentWeather(local); //AJAX TO APIXU WEATHER
            		
                    createHomeMarker(map);
                     
            	}
            });
            
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
      }
    
      function searchPlace(keyword, searchradius) {
    	  
          map = new google.maps.Map(document.getElementById('map'), {
            center: centerPos,
            zoom: zoomlevel
          });
          
          var circle = new google.maps.Circle({
          	map: map,
          	center: centerPos,
          	radius: searchradius,    
          	fillColor: '#3399ff',
          	strokeOpacity: 0
            });
          
          createHomeMarker(map);
          
          infowindow = new google.maps.InfoWindow();
          var service = new google.maps.places.PlacesService(map);
         
          service.nearbySearch({
            location: centerPos,
            radius: searchradius-320, //VALUES
            keyword: keyword	//VALUES
          }, callback);
          
        }

        function callback(results, status) {
      //  	alert(JSON.stringify(results));
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
          }
        }

        function createMarker(place) {
          var placeLoc = place.geometry.location;
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location
          });
          var service = new google.maps.places.PlacesService(map);
          var address;
          //alert(place.id);
          service.getDetails({
        	  placeId: place.place_id
          }, function(place, status){
        	  address = place.formatted_address;
          });
          
          
        google.maps.event.addListener(marker, 'click', function() {
        	infowindow.setContent('<div><strong>' + place.name + '</strong><br><img src="' +
        		place.icon + '" height="12" width="12"> User Rating: ' + place.rating + '<br>' +
        		address + '</div>');
            infowindow.open(map, this);
          });
        }
        
        function createHomeMarker(map) {
        	var marker = new google.maps.Marker({
                position: centerPos,
                map: map,
                icon: 'http://maps.google.com/intl/en_us/mapfiles/ms/micons/blue-dot.png'
            });
            
            google.maps.event.addListener(marker, 'click', function() {
            	infowindow = new google.maps.InfoWindow();
                infowindow.setContent("Your Location: " + userLocation);
                infowindow.open(map, this);
            });
        }
        
        function getCurrentWeather(location){
        	var url = "http://api.apixu.com/v1/current.json?key=cccba3ec471a4b7280f83047161812&q=" + location + " " + country;

        	$.ajax({
        	    type: "POST",
        	    url: url,
        	    data: "{}",
        	    contentType: "application/json; charset=utf-8",
        	    dataType: "json",
        	    success: function(results) {
        	   // 	var weatherDetails = JSON.parse(results);
        	    //	alert(results.error != null);
        	    	if( results.error != null){
        	    		getCurrentWeather(city);
        	    	}else{
        	    		var lastUpdated = results.current.last_updated;
        	    		var mom = moment(lastUpdated).format('MMM D h:mm a');
        	    		
        	    		$('#time-updated').append('(Last updated: ' + mom + ')');
        	    		$('#curr-temp').append('<strong>' + results.current.temp_c + " °Celsius</strong>");
        	    		$('#condition-text').text(results.current.condition.text);
        	    		$('#feels-temp').append('<strong>' + results.current.feelslike_c + " °Celsius</strong>");
        	    		$('#condition-icon').prop('src', results.current.condition.icon);
        	 //   		alert(results.current.condition.icon);
        	    		
        	 //   		var format = new SimpleDateFormat("dddd, mmmm dS, yyyy, h:MM:ss TT");
        	    		
        	    		
        	    	}
        	    }
        	});
        }
        
