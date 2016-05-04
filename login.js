var loginPage = angular.module("loginPage", ["firebase"]);
var ref = new Firebase("https://todotester.firebaseio.com");

function newUserAccount($scope, $firebase) {
    
$scope.newUser = function() {
        var response = confirm("REMOVE EVERYTHING IN THE COMPLETED LIST?");
        if (response == true) {
     var ref = new Firebase("https://todotester.firebaseio.com");
ref.createUser({
  email: "bobtony@firebase.com",
  password: "correcthorsebatterystaple"
}
  

)}
               }

$scope.signupEmail = function(){  
 
  var ref = new Firebase("https://todotester.firebaseio.com");
 
  ref.createUser({
    email    : $scope.data.email,
    password : $scope.data.password
  }, function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
    } else {
      console.log("Successfully created user account with uid:", userData.uid);
    }
  });
 
};

}