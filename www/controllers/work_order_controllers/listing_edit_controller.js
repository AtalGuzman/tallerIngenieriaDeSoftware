angular.module('starter').controller('work_order_listing_edit_controller', function($scope, $state, workOrder_factory) {

  $scope.workOrderList = workOrder_factory.getAllDocs();


  $scope.changeState = function(newstate){
    $state.go(newstate);
  }

  $scope.goToEdit = function(index){
    $state.go("editWorkOrder",{'id':index});
  }

})
