angular.module('starter').controller('logInCtrl', function($scope, $ionicPopup) {

    $scope.data = {
      username: '',
      password: ''
    };

    $scope.error = 'ASS'

    $scope.login = function() {
      debugLogin();
    }

    function debugLogin(){

      if ($scope.data.username == "root" && $scope.data.password == "password"){
        console.log("Login Success");
      }

      else{

        var alertPopup = $ionicPopup.alert({
           title: 'Log In incorrecto',
           template: '<p style="text-align:center;">La combinación de usuario y contraseña es incorrecta o no se encuentra registrada en el sistema.</p>'
        });




        console.log("Login Unsuccessful");
      }
    }

});
