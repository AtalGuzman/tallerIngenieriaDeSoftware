angular.module('starter').controller('listCtrl', function($rootScope,$scope, $state, Auth,$ionicPopup) {
  $scope.id = $state.params.id;



  $scope.onInit = function(newstate){
    if ( $rootScope.ordenesDeTrabajo.length == 0){
      var alertPopup = $ionicPopup.alert({
           title: 'Editor',
           template: 'No hay documentos para editar'
        });

        alertPopup.then(function(res) {
          $state.go("home");
        });
    }
  }

  $scope.changeState = function(newstate){
    $state.go(newstate);
  }
})
