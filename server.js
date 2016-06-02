var express = require("express"); //For Server
var app = express(); //For Server
var bodyParser = require("body-parser"); //For Transfering data to and from Front and Back end
var firebase = require("firebase"); //The Database Library

var config = {
     serviceAccount: "<Look at the firebase API docs for Node>",
    databaseURL: "<URL-of-Database>"
  };
firebase.initializeApp(config);
var db = firebase.database().ref("/stuff"); //Link to the Database

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(__dirname + '/public')); //Serves the necessary files for the frontend
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());


app.get('*', function(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  var mainPath = __dirname + '/public/index.html'; //Put it as a Global variable
  res.sendFile(mainPath); //Only serves index.html because Angular does the routing
});


app.post("/layout/senddata", function(req, res, next){ //Sends data to the route then this route will use that data
  db.child("stuff"+Math.floor(Math.random()*1000)+1).set({ //Sets data parent to database
    name: req.body.formName, //Name child for stuff from name model in Angular
    description: req.body.formDescription //Description child for stuff from description model in Angular
  });
});

app.listen(8080); //Serves on specific port on localhost
console.log("Example listening on port 8080");
