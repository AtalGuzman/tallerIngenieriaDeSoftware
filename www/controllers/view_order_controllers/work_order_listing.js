angular.module('starter').controller('docsView_work_order_listing',
function($scope, $state, workOrder_factory) {

  $scope.orderList = workOrder_factory.getAllDocs();

  $scope.changeState = function(newstate){
    $ionicHistory.clearCache().then(function(){ $state.go(newstate); });
  }

  $scope.goToView = function(index){
    $state.go("docsView_WorkOrderViewing",{'id':index});
  }

  $scope.tieneConformidad = function(index){
    return workOrder_factory.verificarConformidad($scope.orderList[index]);
  }

})
