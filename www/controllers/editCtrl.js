angular.module('starter').controller('editCtrl', function($rootScope,$scope, $state, Auth,$ionicPopup) {
  $scope.id = $state.params.id;
  
  if (typeof $rootScope.ordenesDeTrabajo == "undefined"){
    var alertPopup = $ionicPopup.alert({
         title: 'Editor',
         template: 'No hay documentos para editar'
      });

      alertPopup.then(function(res) {
        $state.go("home");
      });
  }

  $scope.changeState = function(newstate){
    $state.go(newstate);
  }
})
