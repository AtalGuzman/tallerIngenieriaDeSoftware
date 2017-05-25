angular.module('starter').controller('view_orders_home_controller',
function($scope, $state, inspectionOrder_factory) {

  $scope.changeState = function(newstate){
    $state.go(newstate);
  }

})
