
var app = angular.module('starter', ['ionic', 'ionic-modal-select', 'ionic-datepicker', 'pdf']);

  app.config(function($stateProvider,$urlRouterProvider){

    $stateProvider.state('home',{
      url: '/home',
      templateUrl:'partials/home.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }

    });

    $stateProvider.state('log_in',{
      url: '/login',
      templateUrl:'partials/login.html',
      onEnter: function($state, Auth){
        if(Auth.isLoggedIn()){
           $state.go('home');
        }
      }
    });

    $stateProvider.state('docs',{
      url: '/docs',
      templateUrl:'partials/docs.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    $stateProvider.state('docsEdit',{
      url: '/docsEdit',
      templateUrl:'partials/docsEdit.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    $stateProvider.state('editOrdenDeTrabajo',{
      url: '/editOrdenDeTrabajo',
      templateUrl:'partials/editOrdenDeTrabajo.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    $stateProvider.state('newWorkOrder',{
      url: '/docs/workOrder/new',
      templateUrl: 'partials/newWorkOrder.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });



    $stateProvider.state('acts',{
      url: '/acts',
      templateUrl:'partials/acts.html'
    });

    $urlRouterProvider.otherwise('/home');
  });

  app.run(function($ionicPlatform,  $rootScope, $location) {
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
