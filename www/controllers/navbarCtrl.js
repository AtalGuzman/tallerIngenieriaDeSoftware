angular.module('starter').controller('navbarCtrl', function($scope, $rootScope, $state, $ionicPopover, $ionicPopup, Auth) {

    $scope.btnSalir = function(){

      showLogoutConfirmationPopUp();

    };

    $ionicPopover.fromTemplateUrl('partials/navbar_popover.html', {
      scope: $scope,
    }).then(function(popover) {
      $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
      $scope.popover.show($event);
    };
    $scope.closePopover = function() {
      $scope.popover.hide();
    };
    //Cleanup the popover when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });
    // Execute action on hidden popover
    $scope.$on('popover.hidden', function() {
      // Execute action
    });
    // Execute action on remove popover
    $scope.$on('popover.removed', function() {
      // Execute action
    });

    // Show confirmation pop up
    function showLogoutConfirmationPopUp(){

      var confirmPopup = $ionicPopup.confirm({
         title: 'Confirmación',
         template: '¿Estas seguro que quieres salir de la aplicación?'
      });

      confirmPopup.then(function(res) {
         if(res) {
           LogOut();
           $scope.popover.remove();
         }
      });

    };

    function LogOut(){

      Auth.logout();

      $state.go("log_in");

    }

})
