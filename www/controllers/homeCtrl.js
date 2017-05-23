angular.module('starter').controller('homeCtrl', function($scope, $state, Auth) {

  $scope.changeState = function(newstate){
    $state.go(newstate);
  }
  
})
