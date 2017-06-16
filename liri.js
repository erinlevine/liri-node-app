var fs = require("fs");

//Request for OMDB to function:
var request = require("request");

var command = process.argv[2];

//Creating switch statements for all the different commands available:
switch (command) {
	case "my-tweets":
		twitter();
		break;

	case "spotify-this-song":
		spotify();
		break;

	case "movie-this":
		movie();
		break;

	case "do-what-it-says":
		doWhat();
		break;
}

//Creating a function for Twitter:
function twitter() {

	var fs = require("fs");
	var keys = require("./keys.js");

	// console.log(keys.twitterKeys);
	var Twitter = require('twitter');
	 
	var client = new Twitter(keys.twitterKeys);
	 
	var params = {screen_name: 'TheWubDown'};
	// client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response) {
	//    console.log(tweets);
	// });

	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (var i = 0; i < tweets.length; i++){
		    console.log(tweets[i].text);
		    console.log(tweets[i].created_at);
		    }
	  };
  // console.log(tweets);
  // console.log(response);
});
}


// //Creating a function for Spotify:
// function spotify(){

// }


//Creating a function for OMDB:
function movie(){
	// Create an empty variable for holding the movie name
	var movieName = "";

	// Store all of the arguments in an array
	var nodeArgs = process.argv;

	//Looping through all of the words in nodeArgs
	//Adding a for-loop to handle the additional "+"
	for (var i = 2; i < nodeArgs.length; i++) {

	  if (i > 2 && i < nodeArgs.length) {

	    movieName = movieName + "+" + nodeArgs[i];

	  }

	  else {

	    movieName += nodeArgs[i];

	  }
	}

	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

	// Debugging:
	// console.log(queryUrl);

	request(queryUrl, function(error, response, body) {


	  // If the request is successful
	  if (!error && response.statusCode === 200) {

	    // Parse the body of the site and recover just the imdbRating
	    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
	    console.log("The Movie Title Is: " + JSON.parse(body).Title);
	    console.log("Release Year: " + JSON.parse(body).Year);
	    console.log("The IMDB Rating Is: " + JSON.parse(body).imdbRating);
	    console.log("The Movie was Produced In: " + JSON.parse(body).Country);
	    console.log("The Movie Is In: " + JSON.parse(body).Language);
	    console.log("The Plot of the Movie Is: " + JSON.parse(body).Plot);
	    console.log("Some Actors In The Movie Include: " + JSON.parse(body).Actors);
	    console.log("The Rotten Tomatoes Link Is: " + "https://www.rottentomatoes.com/m/" + movieName);
	  }
});
}

// //Creating a function for do-what-it-says:
// function toWhat(){

// }
// });








