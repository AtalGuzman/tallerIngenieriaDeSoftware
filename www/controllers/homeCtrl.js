angular.module('starter').controller('homeCtrl', function($scope, $state, Auth) {

  console.log("Enter Home Controller");

  $scope.changeState = function(newstate){
    $state.go(newstate);
  }
})
