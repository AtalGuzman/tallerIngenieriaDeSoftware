angular.module('starter').controller('conformity_work_order_listing_controller',
function($scope, $state, workOrder_factory) {

  $scope.initFunction = function(){
    $scope.orderList = workOrder_factory.getEditableDocs();
    console.log($scope.orderList);
  }
  $scope.initFunction();

  $scope.changeState = function(newstate){
    $state.go(newstate);
  }

  $scope.goToConfirm = function(index){
    $state.go("conformityWorkOrder",{'id':index});
  }

})
