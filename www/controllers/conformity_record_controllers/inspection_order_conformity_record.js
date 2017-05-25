angular.module('starter').controller('inspection_order_conformity_record',
function($scope, $state, workOrder_factory) {

  $scope.changeState = function(newstate){
    $state.go(newstate);
  }


})
