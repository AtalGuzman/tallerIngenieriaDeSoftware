
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

    $stateProvider.state('inputActConformity',{
      url: '/inputActConformity',
      templateUrl:'partials/inputActConformity.html'
    });

    $stateProvider.state('inputActConformity2',{
      url: '/inputActConformity2',
      templateUrl:'partials/inputActConformity2.html'
    });

    $stateProvider.state('building',{
      url: '/building',
      templateUrl:'partials/building.html'
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
