var app = angular.module("example", ['ui.router']); //Setup Angular

app.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/layout/home'); //In case it doesn't find the urls provided below

 $stateProvider
  .state('layout',{ //Main Layout View
    url: '/layout',
    abstract: true,
    templateUrl: "views/layout.html", //Points to the HTML File
    controller: 'mainCtrl' //Angular tells the page to use this controller
  })
  .state('layout.home',{ //This is for nested views/routes in the layout page
    url: '/home', //Gives it a url that will combine with the layout url
    data: {pageTitle: 'Home'}, //Dynamically sets title in the specific page
    views: {
     'content': { //For nested views look at layout.html <div ui-view="content"></div>
       templateUrl: "views/home.html", //Points to the HTML File
       controller: 'mainCtrl' //Angular tells the page to use this controller
     }
   }
  })
  .state('layout.send',{ //This is for nested views/routes in the layout page
    url: '/senddata', //Gives it a url that will combine with the layout url
    data: {pageTitle: 'Send Data with Firebase'}, //Dynamically sets title in the specific page
    views: {
     'content': { //For nested views look at layout.html <div ui-view="content"></div>
       templateUrl: "views/senddata.html", //Points to the HTML File
       controller: 'sendCtrl' //Angular tells the page to use this controller
     }
   }
  })
  .state('layout.get',{ //This is for nested views/routes in the layout page
    url: '/getdata', //Gives it a url that will combine with the layout url
    data: {pageTitle: 'Lets get some data from Firebase'}, //Dynamically sets title in the specific page
    views: {
     'content': { //For nested views look at layout.html <div ui-view="content"></div>
       templateUrl: "views/getdata.html", //Points to the HTML File
       controller: 'getCtrl' //Angular tells the page to use this controller
     }
   }
  });
});

app.run(function ($rootScope, $state, $stateParams) {
  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;
});

app.controller("mainCtrl", function($scope, $state){ //Controls the Layout page
  $scope.goto = function(path){ //Function to control the side menu. Getting path string from the layout.html
    if(path == "home"){
      $state.go("layout.home"); //Goes to the state that I set in the app.config after $state
    }
    if(path == "sendData"){
      $state.go("layout.send"); //Goes to the state that I set in the app.config after $state
    }
    if(path == "getData"){
      $state.go("layout.get"); //Goes to the state that I set in the app.config after $state
    }
  }
});

app.controller("sendCtrl", function($scope, $state, $http){ //Controls the Send page
  $scope.formStuff = { //Sets the models to control the textbox and textarea
    formName: "",
    formDescription: ""
  }

  $scope.sendData = function(){
    $http.post("/layout/senddata", $scope.formStuff) //sends the data to the backend
      .success(function(data){
        $state.go("layout.get"); //If successful, it will go to another state which here is the GetData state
      })
      .error(function(err){
        console.log("Messed up: "+err); //If error, It will throw the area in the frontend console
      });
  }
});

app.controller("getCtrl", function($scope, $http){ //controls the Get Page
  $scope.getData = function(){
    $http.get("URL-to-your-Firebase") //Pull in the data from the Database using a http request and in json 
format
      .success(function(data){
        console.log(data); //If successful, the data will be inputed into the console as JSON
      })
      .error(function(err){
        console.log("Messed Up: "+err); //If error, It will throw an error in the frontend console
      });
  }
});
