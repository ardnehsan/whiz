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
		center: {
			lat: 29.7604,
			lng: -95.3698
		}
	};

	map = new google.maps.Map(document.getElementById('map'), options);

	function addMarker(coords, info) {
		var marker = new google.maps.Marker({
			position: coords,
			map: map,
			animation: google.maps.Animation.DROP
		});

		markers.push(marker);

		var infowindow = new google.maps.InfoWindow({
			content: info
		});

		markerContent.push(infowindow);


		google.maps.event.addListener(marker, 'click', function () {
			if (currentInfoWindow != null) {
				currentInfoWindow.close();
			}
			infowindow.open(map, marker);
			currentInfoWindow = infowindow;
		});

		google.maps.event.addListener(map, "click", function (event) {
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




	$("#busy").submit(function (event) {

		event.preventDefault();


		var userAddress = $("#input").val().trim();
		var userLocation = $("#location").val().trim();
		$("#error").empty();
		$("#error1").empty();



		if (userAddress === "" || userLocation === "") {
			$("#error1").html("<br>You must enter a location before clicking submit");

		} else {
			clearMarkers();
			markers = [];
			markerContent = [];
			locationInfo = [];
			place_id = [];
			placeName = [];
			placeVicinity = [];

			var geocoder = new google.maps.Geocoder();
			geocoder.geocode({
				'address': userAddress
			}, function (results, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					map.setCenter(results[0].geometry.location);
					userLat.push(results[0].geometry.location.lat());
					userLong.push(results[0].geometry.location.lng());

					// console.log(userLat);
					// console.log(userLong);


				} else {
					if (status === "ZERO_RESULTS") {
						$("#error1").html("<br>Try to update your address and location information and try again!");
						return;
					} else {
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
					console.log("Results: ", results)
					console.log("Status: ", status)
					if (status !== google.maps.places.PlacesServiceStatus.OK) {

						if (status === "ZERO_RESULTS") {
							$("#error").html("Zero results were found. Try again!")
							return;
						} else {
							$("#error").html(status + " Try again!");
							return;
						}
					}

					if (results.length <= 5) {
						for (var i = 0, result; result = results[i]; i++) {

							// console.log(result)
							var resultsLat = results[i].geometry.location.lat()
							var resultsLng = results[i].geometry.location.lng()
							locationInfo.push("<div>Name: " + results[i].name + "</div> <div>Address: " + results[i].vicinity + "</div>")
							addMarker({
								lat: resultsLat,
								lng: resultsLng
							}, locationInfo[i]);

							$("#button-" + placeNum).attr("data-id", results[i].place_id);
							$("#button-" + placeNum).attr("data-name", results[i].name);
							$("#button-" + placeNum).attr("data-vicinity", results[i].vicinity);
							// $("#button-" + placeNum).attr("href", "/" + results[i].id)
							$("#button-" + placeNum).text("Go Here!")
							$("#place-" + placeNum).text("Place Name: " + results[i].name + " Address: " + results[i].vicinity);

							placeNum++
						}
						placeNum = 1;

					} else {
						for (var i = 0; i < 5; i++) {

							// console.log(results);
							var resultsLat = results[i].geometry.location.lat()
							var resultsLng = results[i].geometry.location.lng()
							locationInfo.push("<h4>Name: " + results[i].name + "</h4> <h4>Address: " + results[i].vicinity + "</h4><h4>ID: " + results[i].id + "</h4>")
							addMarker({
								lat: resultsLat,
								lng: resultsLng
							}, locationInfo[i]);

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
	while (thePlacePath.charAt(0) === '/') {
		thePlacePath = thePlacePath.substr(1);
	}
	// console.log(thePlacePath);

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
		}).done(function () {
			// console.log("Got comments with ID = " + allComments.placeId);
			window.location.href = '/' + allComments.placeId
		});

		// $.ajax("/store/storename", {
		// 	type: "POST",
		// 	data: allComments
		// }).done(function(){

			

		// })





		currentPlaceId = localStorage.getItem("thisPlaceId");
		currentPlaceName = localStorage.getItem("thisPlaceName");
		currentPlaceVicinity = localStorage.getItem("thisPlaceVicinity");

		$(document).ready(function () {

			if (location.pathname === "/" + currentPlaceId) {


				$("#placeInfo").html("Comments for: " + currentPlaceName + "<p>Address: " + currentPlaceVicinity + "</p>")
			}

		})

	}


	$("#button-1").click(function () {
		clickPlace("#button-1");
	})

	$("#button-2").click(function () {
		clickPlace("#button-2");
	})

	$("#button-3").click(function () {
		clickPlace("#button-3");
	})

	$("#button-4").click(function () {
		clickPlace("#button-4");
	})

	$("#button-5").click(function () {
		clickPlace("#button-5");
	})

	// console.log(location.pathname.length)

	if (location.pathname.length > 1) {


		function geocodePlaceId(geocoder, map, infowindow) {

			geocoder.geocode({
				'placeId': thePlacePath
			}, function (results, status) {
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

					window.location.href = "/"

				}
			});
		}


		geocodePlaceId(new google.maps.Geocoder(), new google.maps.Map(document.getElementById('map'), {
			zoom: 9,
			center: {
				lat: 29.7604,
				lng: -95.3698
			}
		}), new google.maps.InfoWindow)
	}





	$("#newComment").submit(function (event) {
		event.preventDefault()
		$("#error2").empty();

		var newComment = {
			user: $("#user").val().trim(),
			comment: $("#comment").val().trim(),
		}


		if (newComment.user === "" || newComment.comment === "") {
			$("#error2").text("Please fill out both fields before submitting")
		} else {

			$.ajax("/" + thePlacePath, {
				type: "POST",
				data: newComment,
			}).done(
				function () {
					// console.log("Got comments with ID = " + newComment.placeId);	        
					location.reload();
				});
		}

	})




	$(document).on("click", ".deleteComment", function (event) {
		event.stopPropagation();

		var id = {
			id_comment: $(this).data("id")
		}

		$.ajax("/" + thePlacePath + "/" + id.id_comment, {
			method: "DELETE",
			data: id
		}).done(function () {
			location.reload()
		});
	});
	var haveYouVotedDown;
	var haveYouVotedUp;
	var votedUp = 0;
	var votedDown = 0;
	var currentDownVote;
	var currentUpVote;
	var newDownVote;
	var newUpVote;



	$(document).on("click", ".dislikeComment", function (event) {
		event.stopPropagation();


		haveYouVotedDown = $(this).attr("data-voted");
		console.log(haveYouVotedDown)



		if (haveYouVotedDown === "false" && votedDown === 0 && votedUp === 0) {
			$(this).attr("data-voted", "true");
			haveYouVotedDown = $(this).attr("data-voted");
			votedDown = 1;
			console.log("Down: " + haveYouVotedDown)
			console.log("Down: " + votedDown)
			console.log("Up: " + haveYouVotedUp)
			console.log("Up: " + votedUp)


			var id = {
				id_comment: $(this).data("id"),
				downVote: "1",
				upVote: "0"
			}



			$.ajax("/" + thePlacePath + "/" + id.id_comment, {
				method: "PUT",
				data: id
			}).done(function () {

				currentDownVote = $(".downVote-" + id.id_comment).attr("data-downvote")

				newDownVote = parseInt(currentDownVote) + 1

				$(".downVote-" + id.id_comment).text(newDownVote)
				$(".downVote-" + id.id_comment).attr("data-downvote", newDownVote)

				if (newDownVote >= 10) {
					$(".busy-" + id.id_comment).text("False")
				} else {
					//do nothing
				}
			});
		} else if (haveYouVotedDown === "true" && votedDown === 1 && votedUp === 0) {

			$(this).attr("data-voted", "false");
			haveYouVotedDown = $(this).attr("data-voted");
			votedDown = 0;
			console.log("Down: " + haveYouVotedDown)
			console.log("Down: " + votedDown)
			console.log("Up: " + haveYouVotedUp)
			console.log("Up: " + votedUp)


			var id = {
				id_comment: $(this).data("id"),
				downVote: "-1",
				upVote: "0"
			}


			$.ajax("/" + thePlacePath + "/" + id.id_comment, {
				method: "PUT",
				data: id
			}).done(function () {

				currentDownVote = $(".downVote-" + id.id_comment).attr("data-downvote")

				newDownVote = parseInt(currentDownVote) - 1

				$(".downVote-" + id.id_comment).text(newDownVote)
				$(".downVote-" + id.id_comment).attr("data-downvote", newDownVote)

				if (newDownVote >= 10) {
					$(".busy-" + id.id_comment).text("False")
				} else {
					//do nothing
				}
			});
		} else if (haveYouVotedDown === "false" && votedDown === 0 && votedUp === 1) {

			votedDown = 1;
			votedUp = 0;


			var id = {
				id_comment: $(this).data("id"),
				downVote: "1",
				upVote: "-1"
			}

			$(this).attr("data-voted", "true");
			haveYouVotedDown = $(this).attr("data-voted");

			$(".likeComment[data-id='" + id.id_comment + "']").attr("data-voted", "false")
			haveYouVotedUp = $(".likeComment[data-id='" + id.id_comment + "']").attr("data-voted")

			console.log("Down: " + haveYouVotedDown)
			console.log("Down: " + votedDown)
			console.log("Up: " + haveYouVotedUp)
			console.log("Up: " + votedUp)


			$.ajax("/" + thePlacePath + "/" + id.id_comment, {
				method: "PUT",
				data: id
			}).done(function () {

				currentDownVote = $(".downVote-" + id.id_comment).attr("data-downvote")

				newDownVote = parseInt(currentDownVote) + 1

				currentUpVote = $(".upVote-" + id.id_comment).attr("data-upvote")

				newUpVote = parseInt(currentUpVote) - 1

				$(".downVote-" + id.id_comment).text(newDownVote)
				$(".downVote-" + id.id_comment).attr("data-downvote", newDownVote)
				$(".upVote-" + id.id_comment).text(newUpVote)
				$(".upVote-" + id.id_comment).attr("data-upvote", newUpVote)

				if (newDownVote >= 10) {
					$(".busy-" + id.id_comment).text("False")
				} else {
					//do nothing
				}
			});

		} else {
			console.log("Something went wrong")
			$(this).attr("data-voted", "false");
			haveYouVotedDown = $(this).attr("data-voted");
			votedDown = 0;
			votedUp = 0;

		}


	});

	$(document).on("click", ".likeComment", function (event) {

		haveYouVotedUp = $(this).attr("data-voted");

		if (haveYouVotedUp === "false" && votedDown === 0 && votedUp === 0) {
			$(this).attr("data-voted", "true");
			haveYouVotedUp = $(this).data("voted");
			votedUp = 1;
			console.log("Down: " + haveYouVotedDown)
			console.log("Down: " + votedDown)
			console.log("Up: " + haveYouVotedUp)
			console.log("Up: " + votedUp)


			var id = {
				id_comment: $(this).data("id"),
				downVote: "0",
				upVote: "1"
			}

			// Send the DELETE request.
			$.ajax("/" + thePlacePath + "/" + id.id_comment, {
				method: "PUT",
				data: id
			}).done(function () {



				currentUpVote = $(".upVote-" + id.id_comment).attr("data-upvote")

				newUpVote = parseInt(currentUpVote) + 1

				$(".upVote-" + id.id_comment).text(newUpVote)
				$(".upVote-" + id.id_comment).attr("data-upvote", newUpVote)
				var theDownVotes = $(".downVote-" + id.id_comment).attr("data-downvote")
				if (newUpVote >= 10 && theDownVotes >= 10) {
					$(".busy-" + id.id_comment).text("False")
				} else if (newUpVote >= 10) {
					$(".busy-" + id.id_comment).text("True")
				} else {
					//do nothing
				}


			});
		} else if (haveYouVotedUp === "true" && votedDown === 0 && votedUp === 1) {

			$(this).attr("data-voted", "false");
			haveYouVotedUp = $(this).attr("data-voted");
			votedUp = 0;
			console.log("Down: " + haveYouVotedDown)
			console.log("Down: " + votedDown)
			console.log("Up: " + haveYouVotedUp)
			console.log("Up: " + votedUp)



			var id = {
				id_comment: $(this).data("id"),
				downVote: "0",
				upVote: "-1"
			}


			$.ajax("/" + thePlacePath + "/" + id.id_comment, {
				method: "PUT",
				data: id
			}).done(function () {



				currentUpVote = $(".upVote-" + id.id_comment).attr("data-upvote")

				newUpVote = parseInt(currentUpVote) - 1

				$(".upVote-" + id.id_comment).text(newUpVote)
				$(".upVote-" + id.id_comment).attr("data-upvote", newUpVote)
				var theDownVotes = $(".downVote-" + id.id_comment).attr("data-downvote")
				if (newUpVote >= 10 && theDownVotes >= 10) {
					$(".busy-" + id.id_comment).text("False")
				} else if (newUpVote >= 10) {
					$(".busy-" + id.id_comment).text("True")
				} else {
					//do nothing
				}


			});
		} else if (haveYouVotedUp === "false" && votedDown === 1 && votedUp === 0) {

			votedDown = 0;
			votedUp = 1;


			var id = {
				id_comment: $(this).data("id"),
				downVote: "-1",
				upVote: "1"
			}

			$(this).attr("data-voted", "true");
			haveYouVotedUp = $(this).attr("data-voted");

			$(".dislikeComment[data-id='" + id.id_comment + "']").attr("data-voted", "false")
			haveYouVotedDown = $(".dislikeComment[data-id='" + id.id_comment + "']").attr("data-voted")
			console.log("ID.ID_comment: " + id.id_comment)
			console.log("Down: " + haveYouVotedDown)
			console.log("Down: " + votedDown)
			console.log("Up: " + haveYouVotedUp)
			console.log("Up: " + votedUp)



			$.ajax("/" + thePlacePath + "/" + id.id_comment, {
				method: "PUT",
				data: id
			}).done(function () {

				currentDownVote = $(".downVote-" + id.id_comment).attr("data-downvote")

				newDownVote = parseInt(currentDownVote) - 1


				currentUpVote = $(".upVote-" + id.id_comment).attr("data-upvote")

				newUpVote = parseInt(currentUpVote) + 1

				$(".upVote-" + id.id_comment).text(newUpVote)
				$(".upVote-" + id.id_comment).attr("data-upvote", newUpVote)
				$(".downVote-" + id.id_comment).text(newDownVote)
				$(".downVote-" + id.id_comment).attr("data-downvote", newDownVote)
				var theDownVotes = $(".downVote-" + id.id_comment).attr("data-downvote")
				if (newUpVote >= 10 && theDownVotes >= 10) {
					$(".busy-" + id.id_comment).text("False")
				} else if (newUpVote >= 10) {
					$(".busy-" + id.id_comment).text("True")
				} else {
					//do nothing
				}


			});


		} else {
			console.log("Something went wrong")
			$(this).data("voted", false);
			haveYouVoted = $(this).data("voted");
			votedDown = 0;
			votedUp = 0;
		}

	});
}