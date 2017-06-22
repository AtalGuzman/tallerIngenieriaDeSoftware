angular.module('starter').controller('homeCtrl', function($scope, $state, $http, Auth) {

 var variable = $http.get("https://httpbin.org/get");
 console.log("Mi variable es:");
 console.log(variable);

  $scope.changeState = function(newstate){
    $state.go(newstate);
  }

})
