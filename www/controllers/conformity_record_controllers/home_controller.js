angular.module('starter').controller('conformity_record_home_controller',
function($scope, $state, inspectionOrder_factory) {

  $scope.changeState = function(newstate){
    $state.go(newstate);
  }


})
