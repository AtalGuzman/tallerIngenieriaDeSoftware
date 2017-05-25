angular.module('starter').controller('docsView_work_order_viewing',
function($scope, $state, workOrder_factory, $ionicHistory) {

  $scope.data = workOrder_factory.getDoc($state.params.id);

  $scope.volver = function(){
    $scope.changeState("docsView_WorkOrderListing");
  }

  $scope.changeState = function(newstate){
    $ionicHistory.clearCache().then(function(){ $state.go(newstate); });
  }

})
