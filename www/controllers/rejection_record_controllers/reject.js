angular.module('starter').controller('rejection_record_reject_controller',
function(
  $rootScope,
  $scope,
  $state,
  $ionicPopup,
  $ionicModal,
  $ionicHistory,
  inspectionOrder_factory,
  ionicDatePicker,
  Model,
  StringifyJsonService) {

  $scope.data = inspectionOrder_factory.getDoc($state.params.id);

  $scope.rejection_data = {
      rechazo: false,
      descripcion: null
  };


  $scope.confirmarRechazo = function(){

    if ($scope.rejection_data.rechazo){
      $scope.data['rejection_data'] = $scope.rejection_data;
      inspectionOrder_factory.updateDoc($scope.data);
    }

    $scope.changeState("docsRejection");

  };

  $scope.volver = function(){
    $scope.changeState("docsRejection");
  }

  $scope.changeState = function(newstate){
    $ionicHistory.clearCache().then(function(){ $state.go(newstate); });
  }
})
