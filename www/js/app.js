
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

    ///EDICION De ORDENES DE TRABAJO
    $stateProvider.state('listOrdenDeTrabajo',{
      url: '/editOrdenDeTrabajo',
      controller: 'listCtrl',
      templateUrl:'partials/listWorks.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    //MOSTRAR LOS TRABAJOS SOLICITADOS
    $stateProvider.state('listOrdenDeTrabajo2',{
      url: '/works',
      controller: 'listCtrl',
      templateUrl:'partials/listWorks2.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    //lISTA LAS ORDENES DE INSPECCIÓN PARA SU EDICIÓN
    $stateProvider.state('listOrdenInspeccion',{
      url: '/editOrdenDeInspeccion',
      controller: 'listInspectionCtrl',
      templateUrl:'partials/listInspection.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    $stateProvider.state('listEditConformity',{
      url: '/conformities',
      controller: 'listConformityCtrl',
      templateUrl:'partials/listWorks4.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    //LISTA LOS TRABAJOS PARA CREAR EL ACTA DE CONFORMIDAD ASOCIADA
    $stateProvider.state('listActaDeConformidad',{
      url: '/works2',
      controller: 'listConformityCtrl',
      templateUrl:'partials/listWorks3.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    $stateProvider.state('edit',{
      url: '/works/:id',
      controller: 'editWork',
      templateUrl:'partials/newWorkOrder.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });


    $stateProvider.state('newWorkOrder',{
      url: '/docs/workOrder/new',
      controller: 'newWorkOrderCtrl',
      templateUrl: 'partials/newWorkOrder.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    $stateProvider.state('newInspectionOrder',{
      url: '/works_inspection/:id',
      controller: 'newInspectionOrderCtrl',
      templateUrl: 'partials/newInspectionOrder.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    $stateProvider.state('newConformityAct',{
      url: '/works_conformity/:id',
      controller: 'newConformityCtrl',
      templateUrl: 'partials/newConformity.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    $stateProvider.state('editInspection',{
      url: '/inspections/:id',
      controller: 'editInspectionCtrl',
      templateUrl: 'partials/newInspectionOrder.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    $stateProvider.state('editConformity',{
      url: '/conformities/:id',
      controller: 'editConformityCtrl',
      templateUrl: 'partials/newConformity.html',
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
    $rootScope.ordenesDeTrabajo = [];
    $rootScope.ordenesDeInspeccion = [];
    $rootScope.actasDeConformidad = [];
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
