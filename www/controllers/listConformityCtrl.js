angular.module('starter').controller('listConformityCtrl', function($rootScope,$scope, $state, Auth,$ionicPopup) {

  $scope.onInit = function(newstate){
    if ( $rootScope.actasDeConformidad.length == 0){
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
