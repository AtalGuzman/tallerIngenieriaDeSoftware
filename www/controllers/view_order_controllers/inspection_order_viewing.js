angular.module('starter').controller('docsView_inspection_order_viewing',
function($scope, $state, inspectionOrder_factory, $ionicHistory) {

  $scope.data = inspectionOrder_factory.getDoc($state.params.id);

  $scope.volver = function(){
    $scope.changeState("docsView_InspectionOrderListing");
  }

  $scope.changeState = function(newstate){
    $ionicHistory.clearCache().then(function(){ $state.go(newstate); });
  }
})
