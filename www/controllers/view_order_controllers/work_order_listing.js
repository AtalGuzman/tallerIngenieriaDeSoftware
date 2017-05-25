angular.module('starter').controller('docsView_work_order_listing',
function($scope, $state, workOrder_factory) {

  $scope.orderList = workOrder_factory.getAllDocs();

  $scope.changeState = function(newstate){
    $state.go(newstate);
  }

  $scope.goToView = function(index){
    $state.go("docsView_WorkOrderViewing",{'id':index});
  }

})
