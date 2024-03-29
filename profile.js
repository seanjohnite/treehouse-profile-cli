// Problem: We need a simple way to look at a user's badge count and JavaScript points
// Solution: Use Node.js to connect to Treehouse's API to get profile information to print out
var http = require('http');

// print out message

function printMessage(username, badgeCount, points) {
  var message = username + " has " + badgeCount + " total badge(s) and " + points + " points in JavaScript";
  console.log(message);
}

//print out error messages
function printError(error) {
  console.error(error.message);
}

// Connect to the API URL (http://teamtreehouse.com/username.json)


function get(username) {
  var request = http.get('http://teamtreehouse.com/' + username + '.json', function (response) {
    var body = "";
    // Read the data
    response.on('data', function (chunk) {
      body += chunk;
    });
    response.on('end', function () {
      if(response.statusCode === 200) {
        try {
          // Parse it
          var profile = JSON.parse(body);
          // Print it;
          printMessage(username, profile.badges.length, profile.points.JavaScript);
        } catch (error) {
          // Parse Error
          printError(error);
        }
      } else {
        //status code error
        printError({message: "There was an error getting the profile for " + username + ". (" + 
          http.STATUS_CODES[response.statusCode]+ ")"});
      }
      

    });
    
  });

  request.on('error', printError);

}

module.exports.get = get;