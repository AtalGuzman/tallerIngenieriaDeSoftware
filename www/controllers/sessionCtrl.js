angular.module('starter').controller('sessionCtrl', function($scope, $state, Auth) {


    $scope.clearSession = function() {
      console.log("Fuck ass");
      Auth.logout();
      $state.go('log_in');
    }
})
