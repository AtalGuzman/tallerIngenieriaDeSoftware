angular.module('starter').controller('inspection_order_listing_edit_controller',
function($scope, $state, inspectionOrder_factory) {

  $scope.initFunction = function(){
    $scope.inspectionOrderList = inspectionOrder_factory.getAllDocs();
  }

  $scope.$on('$ionicView.beforeEnter', function() {
       $scope.initFunction();
  });

  $scope.changeState = function(newstate){
    $state.go(newstate);
  }

  $scope.goToEdit = function(index){
    $state.go("editInspection",{'id':index});
  }

})
