var map;
var service;
var locationInfo = [];
var markers = [];
var info = [];
var userLat = [];
var userLong = [];
var markerContent = [];
var currentInfoWindow = null; 

function initMap() {
	var options = {
		zoom: 9,
		center: {lat: 29.7604, lng: -95.3698}
	};

	map = new google.maps.Map(document.getElementById('map'), options);

	function addMarker(coords, info) {
		var marker = new google.maps.Marker({
			position: coords,
			map: map,
			animation : google.maps.Animation.DROP
		});

		markers.push(marker);

		var infowindow = new google.maps.InfoWindow({
          content: info
        });

		markerContent.push(infowindow);

    
		google.maps.event.addListener(marker, 'click', function() { 
		    if (currentInfoWindow != null) { 
		        currentInfoWindow.close(); 
		    } 
		    infowindow.open(map, marker); 
		    currentInfoWindow = infowindow; 
		}); 

        google.maps.event.addListener(map, "click", function(event) {
        infowindow.close();
        //autoCenter();
    	});
	}

	// //function that goes through the markers array - helps to delete markers

	function setMapOnAll(map) {
        for (var i = 0; i < markers.length; i++) {
          markers[i].setMap(map);
        }
    }

 //      //function that sets the setMapOnAll function to null - helps to delete markers

	function clearMarkers() {
        setMapOnAll(null);
     }




    $("#busy").submit(function(event) {

		event.preventDefault();	


		var userAddress = $("#input").val().trim();
		var userLocation = $("#location").val().trim();

		$("#error").empty();
		


		if (userAddress === "" || userLocation === "") {
			$("#error").html("<br>You must enter a location before clicking submit");
			
		} 

		else {
			clearMarkers();
			markers = [];
			markerContent = [];
			locationInfo = [];
			

			var geocoder = new google.maps.Geocoder();
			geocoder.geocode( { 'address': userAddress}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
		 			map.setCenter(results[0].geometry.location);
		 			userLat.push(results[0].geometry.location.lat());
		 			userLong.push(results[0].geometry.location.lng());
		 		
		 			console.log(userLat);
		 			console.log(userLong);

		 			
		 			}
				else {
					$("#error").html("<br>Geocode was not successful for the following reason: " + status + " Please try again");
				}
			

				var latLong = new google.maps.LatLng(userLat, userLong)

				var request = {
				    location: latLong,
				    radius: '8046',
				    keyword: userLocation
				};

				    service = new google.maps.places.PlacesService(map);
					service.nearbySearch(request, callback);



				function callback(results, status) {
				  var placeNum = 1
				  if (status !== google.maps.places.PlacesServiceStatus.OK) {
				    console.error(status);
				    return;
				  }
				  for (var i = 0, result; result = results[i]; i++) {
				  	console.log(result)
				  	var resultsLat = results[i].geometry.location.lat()
				  	var resultsLng = results[i].geometry.location.lng()
				  	locationInfo.push("<h4>Name: " + results[i].name + "</h4> <h4>Address: " + results[i].vicinity + "</h4><h4>ID: " + results[i].id + "</h4>")
				    addMarker({lat: resultsLat, lng: resultsLng}, locationInfo[i]);

				    $("#place-" + placeNum).attr("data-id", results[i].id);
				    $("#link-" + placeNum).attr("data-id",  results[i].id);
				    $("#link-" + placeNum).text("Go Here")
				    $("#place-" + placeNum).text("Place Name: " + results[i].name + " Address: " + results[i].vicinity);
				    
				    placeNum++
				  }
				  placeNum = 1;
				}
			})

			userLat = [];
			userLong = [];

//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=YOUR_API_KEY


		}

	})



	$("#link-1").on("click", function(){
		event.preventDefault();

		$.get("/", function(data) {

  			if (data.length !== 0) {

    			for (var i = 0; i < data.length; i++) {

			      var row = $("<div>");
			      row.addClass("comment");

			      row.append("<p>" + data[i].user + " chirped.. </p>");
			      row.append("<p>" + data[i].comment + "</p>");

      			$(".comment").prepend(row);

    }

  }

});

	})

}