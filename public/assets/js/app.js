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
		$("#error1").empty();
		


		if (userAddress === "" || userLocation === "") {
			$("#error1").html("<br>You must enter a location before clicking submit");
			
		} 

		else {
			clearMarkers();
			markers = [];
			markerContent = [];
			locationInfo = [];
			place_id = [];
			placeName = [];
			placeVicinity = [];

			var geocoder = new google.maps.Geocoder();
			geocoder.geocode( { 'address': userAddress}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
		 			map.setCenter(results[0].geometry.location);
		 			userLat.push(results[0].geometry.location.lat());
		 			userLong.push(results[0].geometry.location.lng());
		 		
		 			// console.log(userLat);
		 			// console.log(userLong);

		 			
		 			}
				else {
					if (status === "ZERO_RESULTS") {
						$("#error1").html("<br>Try to update your address and location information and try again!");
						return;
					}
					else {
						$("#error1").html("<br>Geocode was not successful for the following reason: " + status + " Please try again");
						return;
					}
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

				  for (var i = 0; i < 5; i++) {
				  	$("#place-" + placeNum).text("")
				  	$("#button-" + placeNum).text("")
				  	placeNum++
				  }

				  placeNum = 1

				  if (status !== google.maps.places.PlacesServiceStatus.OK) {

				  	if (status === "ZERO_RESULTS") {
				  		$("#error").html("Zero results were found. Try again!")
				  		return;
				  	}
				  	else {
					    $("#error").html(status + " Try again!");
					    return;
					}
				  }

				    if (results.length <= 5) {
					  for (var i = 0, result; result = results[i]; i++) {

					  	console.log(result)
					  	var resultsLat = results[i].geometry.location.lat()
					  	var resultsLng = results[i].geometry.location.lng()
					  	locationInfo.push("<h4>Name: " + results[i].name + "</h4> <h4>Address: " + results[i].vicinity + "</h4><h4>ID: " + results[i].id + "</h4>")
					    addMarker({lat: resultsLat, lng: resultsLng}, locationInfo[i]);

					    $("#button-" + placeNum).attr("data-id", results[i].place_id);
					    $("#button-" + placeNum).attr("data-name", results[i].name);
					    $("#button-" + placeNum).attr("data-vicinity", results[i].vicinity);
					    // $("#button-" + placeNum).attr("href", "/" + results[i].id)
					    $("#button-" + placeNum).text("Go Here!")
					    $("#place-" + placeNum).text("Place Name: " + results[i].name + " Address: " + results[i].vicinity);
					    			    
					    placeNum++
					  }
					  placeNum = 1;
					  
					}

					else {
						for (var i = 0; i < 5; i++) {

					  	console.log(results);
					  	var resultsLat = results[i].geometry.location.lat()
					  	var resultsLng = results[i].geometry.location.lng()
					  	locationInfo.push("<h4>Name: " + results[i].name + "</h4> <h4>Address: " + results[i].vicinity + "</h4><h4>ID: " + results[i].id + "</h4>")
					    addMarker({lat: resultsLat, lng: resultsLng}, locationInfo[i]);

					    $("#button-" + placeNum).attr("data-id", results[i].place_id);
					    $("#button-" + placeNum).attr("data-name", results[i].name);
					    $("#button-" + placeNum).attr("data-vicinity", results[i].vicinity);
					    // $("#button-" + placeNum).attr("href", "/" + results[i].id)
					    $("#button-" + placeNum).text("Go Here!")
					    $("#place-" + placeNum).text("Place Name: " + results[i].name + " Address: " + results[i].vicinity);
					    
					    placeNum++
					  }
					  placeNum = 1;
					  
					}
				}
			})

			userLat = [];
			userLong = [];

//https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=500&type=restaurant&keyword=cruise&key=YOUR_API_KEY


		}

	})


var thePlacePath = location.pathname;
	while(thePlacePath.charAt(0) === '/')
	{
	 	thePlacePath = thePlacePath.substr(1);
	}
	console.log(thePlacePath);

var thisPlaceId;
var thisPlaceName;
var thisPlaceVicinity;

var currentPlaceId;
var currentPlaceName;
var currentPlaceVicinity;



	function clickPlace(button) {

			localStorage.setItem("thisPlaceId", $(button).data("id"));
			localStorage.setItem("thisPlaceName", $(button).data("name"));
			localStorage.setItem("thisPlaceVicinity", $(button).data("vicinity"));

			var allComments = {
					placeId: $(button).data("id"),
					name: $(button).data("name"),
					vicinity: $(button).data("vicinity")
			}

			

		    $.ajax("/" + allComments.placeId, {
		      type: "GET",
		      data: allComments
		    }).done(function() {
		        console.log("Got comments with ID = " + allComments.placeId);
		        

		        window.location.href='/' + allComments.placeId


		        
		      });	

		



		currentPlaceId = localStorage.getItem("thisPlaceId");
		currentPlaceName = localStorage.getItem("thisPlaceName");
		currentPlaceVicinity = localStorage.getItem("thisPlaceVicinity");

		$(document).ready(function() {
				
			if (location.pathname === "/" + currentPlaceId) { 
				

				$("#placeInfo").html("Comments for: " + currentPlaceName + "<p>Address: " + currentPlaceVicinity + "</p>")
			}

		})

	}


	$("#button-1").click(function(){	
		clickPlace("#button-1");
	})

	$("#button-2").click(function(){	
		clickPlace("#button-2");
	})

	$("#button-3").click(function(){	
		clickPlace("#button-3");
	})

	$("#button-4").click(function(){	
		clickPlace("#button-4");
	})

	$("#button-5").click(function(){	
		clickPlace("#button-5");
	})

console.log(location.pathname.length)

	if (location.pathname.length > 1) {

		
		function geocodePlaceId(geocoder, map, infowindow) {
        
        geocoder.geocode({'placeId': thePlacePath}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {
              console.log(results[0])
              map.setZoom(11);
              map.setCenter(results[0].geometry.location);
              var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
              });
              infowindow.setContent(results[0].formatted_address);
              infowindow.open(map, marker);
            } else {
              window.alert('No results found');
            }
          } else {
          	
            //This needs to throw a 404...

          }
        });
      }


      geocodePlaceId(new google.maps.Geocoder(), new google.maps.Map(document.getElementById('map'), {
          zoom: 9,
          center: {lat: 29.7604, lng: -95.3698}
        }), new google.maps.InfoWindow)
	}





	$("#newComment").submit(function(event) {
		event.preventDefault()
		$("#error2").empty();	

		var newComment = {
			user: $("#user").val().trim(),
			comment: $("#comment").val().trim(),
		}


		if (newComment.user === "" || newComment.comment === "") {
			$("#error2").text("Please fill out both fields before submitting")
		}

		else {

		 $.ajax("/" + thePlacePath, {
		      type: "POST",
		      data: newComment,
		    }).done(
		      function() {
		        console.log("Got comments with ID = " + newComment.placeId);	        
				location.reload();
		      });
		}	

	})




	$(document).on("click", ".deleteComment", function(event){
			event.stopPropagation();
	  		
			var id = {
				id_comment: $(this).data("id")
			} 
			
			$.ajax("/" + thePlacePath + "/" + id.id_comment, {
			  method: "DELETE",
			  data: id
			}).done(function() {
				location.reload()
			  }
			);
	});

	$(document).on("click", ".dislikeComment", function(event){
			event.stopPropagation();
	  		
			var id = {
				id_comment: $(this).data("id"),
				downVote: "1",
				upVote: "0"
			} 
			
			
			$.ajax("/" + thePlacePath + "/" + id.id_comment, {
			  method: "PUT",
			  data: id
			}).done(function() {
				location.reload()
			  }
			);
	});

	$(document).on("click", ".likeComment", function(event){
		
			
			// Send the DELETE request.
			$.ajax("/" + thePlacePath + "/" + id.id_comment, {
			  method: "PUT",
			  data: id
			}).done(function() {
				location.reload()
				
			  }
			);


	});








// $.fn.disableFor = function(mins, secs) {
//     var i = [],
//     play = [];

//     this.click(function() {
//         var selector = $(this),
//         inDex = $(selector).index(),
//         prevText = $(selector).text();
//         i[inDex] = 0;
//         var inSeconds = mins * 60 + secs;

//         $(selector).prop("disabled", "disabled");
        
//         play[inDex] = setInterval(function() {
//             if(inSeconds > 60){
//                 inSeconds = inSeconds - 1;
//                 var minutes = Math.floor(inSeconds / 60);
//                 var seconds = inSeconds % 60;
//                 if(minutes >= 1){
//                     if(seconds.toString().length > 1){
//                         $(selector).text(minutes + ":" + seconds + " minutes left");
//                     }else{
//                         $(selector).text(minutes + ":" + "0" + seconds + " minutes left");
//                     }
//                 }else{
//                     $(selector).text(seconds + " seconds left");
//                 }
//             }else{
//                 if(inSeconds > 1){
//                     inSeconds = inSeconds - 1;
//                     if(inSeconds.toString().length > 1){
//                         $(selector).text(inSeconds + " seconds left");
//                     }else{
//                         $(selector).text("0" + inSeconds + " seconds left");
//                     }
//                 }else{
//                     $(selector).prop("disabled", "");
//                     clearInterval(play[inDex]);
//                     $(selector).text(prevText);
//                 }                              
//             }
//         }, 1000);
//     });
// };

// $(function() {
//     $("button").disableFor(30,0); // First parameter stands for minutes and the second for the seconds.
// });








	
}