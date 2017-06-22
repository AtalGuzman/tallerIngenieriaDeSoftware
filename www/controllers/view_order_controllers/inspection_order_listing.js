angular.module('starter').controller('docsView_inspection_order_listing',
function($scope, $state, inspectionOrder_factory) {

  $scope.orderList = inspectionOrder_factory.getAllDocs();

  $scope.changeState = function(newstate){
    $state.go(newstate);
  }

  $scope.goToView = function(index){
    $state.go("docsView_InspectionOrderViewing",{'id':index});
  }
  
  $scope.tieneConformidad = function(index){
    return inspectionOrder_factory.verificarConformidad($scope.orderList[index]);
  }

})
