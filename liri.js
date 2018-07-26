require("dotenv").config();
var keys = require('./keys');
var Spotify = require('node-spotify-api');
var request = require("request");
const fs = require('fs');

// Then run a request to the OMDB API with the movie specified


// my-tweets

// spotify-this-song

// movie-this

// do-what-it-says

// What Each Command Should Do

// node liri.js my-tweets

// This will show your last 20 tweets and when they were created at in your terminal/bash window.
// node liri.js spotify-this-song '<song name here>'

// This will show the following information about the song in your terminal/bash window



// Artist(s)

// The song's name

// A preview link of the song from Spotify

// The album that the song is from




// If no song is provided then your program will default to "The Sign" by Ace of Base.

// You will utilize the node-spotify-api package in order to retrieve song information from the Spotify API.

// Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a client id and client secret:

// Step One: Visit https://developer.spotify.com/my-applications/#!/

// Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

// Step Three: Once logged in, navigate to https://developer.spotify.com/my-applications/#!/applications/create to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

// Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the node-spotify-api package.

// node liri.js movie-this '<movie name here>'

// This will output the following information to your terminal/bash window:

//   * Title of the movie.
//   * Year the movie came out.
//   * IMDB Rating of the movie.
//   * Rotten Tomatoes Rating of the movie.
//   * Country where the movie was produced.
//   * Language of the movie.
//   * Plot of the movie.
//   * Actors in the movie.
// If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'

// If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/

// It's on Netflix!

// You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use trilogy.

// node liri.js do-what-it-says

// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.

// It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.

// Feel free to change the text in that document to test out the feature for other commands.

var spotify = new Spotify(keys.spotify);


;




var myVar = process.argv[3];

// if (process.argv[2] ==  my-tweets){

// }

if (process.argv[2] == "spotify-this-song" && typeof myVar === 'string') {

  spotify.search({ type: 'track', query: process.argv[3], limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }


    console.log("RETURNED:" + process.argv[3])
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].album.artists[0].name);
    console.log(data.tracks.items[0].album.name);
    console.log(data.tracks.items[0].uri);




  });

}

if (process.argv[2] == "spotify-this-song" && typeof myVar !== 'string') {

  process.argv[3] = "The Sign Ace of Base";

  spotify.search({ type: 'track', query: process.argv[3], limit: 1 }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }

    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].album.artists[0].name);
    console.log(data.tracks.items[0].album.name);
    console.log(data.tracks.items[0].uri);

  });

}






if (process.argv[2] == "movie-this" && typeof myVar === 'string') {

  request("http://www.omdbapi.com/?t=" + process.argv[3] + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log(JSON.parse(body).Title);
      console.log(JSON.parse(body).Year);
      console.log(JSON.parse(body).Rated);
      console.log(JSON.parse(body).Ratings[1].Source + ": " + JSON.parse(body).Ratings[1].Value);
      console.log(JSON.parse(body).Country);
      console.log(JSON.parse(body).Language);
      console.log(JSON.parse(body).Plot);
      console.log(JSON.parse(body).Actors);


    }

  }
  )
}

if (process.argv[2] == "movie-this" && typeof myVar !== 'string') {

  request("http://www.omdbapi.com/?t=" + "Mr.Nobody" + "&y=&plot=short&apikey=trilogy", function (error, response, body) {

    // If the request is successful (i.e. if the response status code is 200)
    if (!error && response.statusCode === 200) {

      // Parse the body of the site and recover just the imdbRating
      // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
      console.log(JSON.parse(body).Title);
      console.log(JSON.parse(body).Year);
      console.log(JSON.parse(body).Rated);
      console.log(JSON.parse(body).Ratings[1].Source + ": " + JSON.parse(body).Ratings[1].Value);
      console.log(JSON.parse(body).Country);
      console.log(JSON.parse(body).Language);
      console.log(JSON.parse(body).Plot);
      console.log(JSON.parse(body).Actors);


    }

  }
  )

}

if (process.argv[2] == "do-what-it-says") {

  fs.readFile("random.txt", "utf8", function (error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // We will then re-display the content as an array for later use.
    console.log(dataArr);

    spotify.search({ type: 'track', query: dataArr[1], limit: 1 }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
  
  
      console.log(data.tracks.items[0].name);
      console.log(data.tracks.items[0].album.artists[0].name);
      console.log(data.tracks.items[0].album.name);
      console.log(data.tracks.items[0].uri);
  
  
  
    })

  });

 


}

