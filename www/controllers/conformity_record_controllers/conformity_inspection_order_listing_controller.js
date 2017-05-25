angular.module('starter').controller('conformity_inspection_order_listing_controller',
function($scope, $state, inspectionOrder_factory) {

  $scope.initFunction = function(){
    $scope.orderList = inspectionOrder_factory.getEditableDocs();
    console.log($scope.orderList);
  }

  $scope.initFunction();

  $scope.changeState = function(newstate){
    $state.go(newstate);
  }

  $scope.goToConfirm = function(index){
    console.log("shit son");
    $state.go("conformityInspectionOrder",{'id':index});
  }

})
