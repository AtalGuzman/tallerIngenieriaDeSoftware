angular.module('starter').controller('rejection_records_listing_controller',
function($scope, $state, inspectionOrder_factory) {



  $scope.initFunction = function(){
    $scope.orderList = inspectionOrder_factory.getEditableDocs();
  }

  $scope.initFunction();

  $scope.changeState = function(newstate){
    $state.go(newstate);
  }

  $scope.goToReject = function(index){
    $state.go("rejectWork",{'id':index});
  }

})
