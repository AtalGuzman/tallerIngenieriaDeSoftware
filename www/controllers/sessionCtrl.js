angular.module('starter').controller('sessionCtrl', function($scope, $state, Auth, $ionicPopup) {

    $scope.clearSession = function() {

      showConfirmationPopUp();
      Auth.logout();
      $state.go('log_in');

    }

    function showConfirmationPopUp(){

      console.log("show");
      var confirmPopup = $ionicPopup.confirm({
         title: 'Confirmación',
         template: '¿Estas seguro que quieres salir de la aplicación?'
      });

      confirmPopup.then(function(res) {
         if(res) {
            return true;
         } else {
            return false;
         }
      });

      };

})
