angular.module('starter').controller('editCtrl', function($scope, $state, Auth) {
  $scope.id = $state.params.id;
  
  $scope.changeState = function(newstate){
    $state.go(newstate);
  }
})
