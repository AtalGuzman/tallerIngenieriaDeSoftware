angular.module('starter').controller('work_order_listing_edit_controller', function($scope, $state) {

  if (window.localStorage['docs_workOrder']){  $scope.workOrderList = JSON.parse(window.localStorage['docs_workOrder']); }
  else{ $scope.workOrderList = []; }

  $scope.changeState = function(newstate){
    $state.go(newstate);
  }

  $scope.goToEdit = function(index){
    $state.go("editWorkOrder",{'id':index});
  }

})
