var express = require("express"); //For Server
var app = express(); //For Server
var bodyParser = require("body-parser"); //For Transfering data to and from Front and Back end
var Firebase = require("firebase"); //The Database Library

var db = new Firebase("URL-to-Firebase"); //Link to the Database

app.use(express.static(__dirname + '/public')); //Serves the necessary files for the frontend
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());

app.get('*', function(req, res) {
  var mainPath = __dirname + '/public/index.html'; //Put it as a Global variable
  res.sendFile(mainPath); //Only serves index.html because Angular does the routing
});


app.post("/layout/senddata", function(req, res){ //Sends data to the route then this route will use that data
  db.child("stuff"+Math.floor(Math.random()*1000)+1).set({ //Sets data parent to database
    name: req.body.formName, //Name child for stuff from name model in Angular
    description: req.body.formDescription //Description child for stuff from description model in Angular
  });
});

app.listen(8080); //Serves on specific port on localhost
console.log("Example listening on port 8080");
