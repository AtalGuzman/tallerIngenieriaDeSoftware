angular.module('starter').controller('logInCtrl', function($state, $scope, $ionicPopup, Auth) {

    $scope.data = {
      email: '',
      password: ''
    };

    $scope.login = function() {
      debugLogin();
      $state.go("home");
    }

    function debugLogin(){

      if ($scope.data.email == "root" && $scope.data.password == "password"){
        Auth.setUser($scope.data.email);
      }

      else{

        var alertPopup = $ionicPopup.alert({
           title: 'Log In incorrecto',
           template: '<p style="text-align:center;">La combinación de usuario y contraseña es incorrecta o no se encuentra registrada en el sistema.</p>'
        });

      }
    }

})
