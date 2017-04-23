angular.module('starter').controller('logInCtrl', function($state, $scope, $ionicPopup, Auth) {

    $scope.data = {
      username: '',
      password: ''
    };

    $scope.error = 'ASS'

    $scope.login = function() {
      debugLogin();
      $state.go("home")
    }

    function debugLogin(){

      if ($scope.data.username == "root" && $scope.data.password == "password"){
        Auth.setUser($scope.data.username);
        console.log(Auth.isLoggedIn());
      }

      else{

        var alertPopup = $ionicPopup.alert({
           title: 'Log In incorrecto',
           template: '<p style="text-align:center;">La combinación de usuario y contraseña es incorrecta o no se encuentra registrada en el sistema.</p>'
        });




        console.log("Login Unsuccessful");
      }
    }

})
