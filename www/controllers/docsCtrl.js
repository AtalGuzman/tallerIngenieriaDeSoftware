angular.module('starter').controller('docsCtrl', function($scope, $state, Auth) {

  $scope.changeState = function(newstate){
    $state.go(newstate);
  }
})
