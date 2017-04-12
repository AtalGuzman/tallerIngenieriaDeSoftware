
(function(){
  var app = angular.module('starter', ['ionic'])

  app.config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state('home',{
      url: '/home',
      templateUrl:'partials/home.html'
    });

    $stateProvider.state('docs',{
      url: '/docs',
      templateUrl:'partials/docs.html'
    });
    
    $stateProvider.state('acts',{
      url: '/acts',
      templateUrl:'partials/acts.html'
    });

    $urlRouterProvider.otherwise('/home');
  });

  //Esta función es solo pra efectos de mostrar cosas en la maqueta
  app.controllerList(function(){
    $scope
  });

  app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  });

  }());
