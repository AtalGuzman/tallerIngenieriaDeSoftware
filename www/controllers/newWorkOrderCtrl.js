angular.module('starter').controller('newWorkOrderCtrl', function($scope, $state, workOrderSet) {

  $scope.data = workOrderSet.initData();

  $scope.cancelNewDocument = function(){

    if (!workOrderSet.checkEmptyData($scope.data)){

      console.log("Seguro?");

    }
    else{
      $state.go("home");
    }

  }

  $scope.changeState = function(newstate){
    $state.go(newstate);
  }



})
