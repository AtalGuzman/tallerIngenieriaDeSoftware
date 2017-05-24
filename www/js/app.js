
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
      url: '/docs_edit',
      templateUrl:'partials/docsEdit.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    ///EDICION De ORDENES DE TRABAJO
    $stateProvider.state('editWorkOrderListing',{
      url: '/docs_edit/orden_de_trabajo',
      templateUrl:'partials/work_order_partials/listing_edit.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    $stateProvider.state('editWorkOrder',{
      url: '/docs_edit/orden_de_trabajo/:id',
      templateUrl:'partials/work_order_partials/edit.html',
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
    $stateProvider.state('editInspectionOrderListing',{
      url: '/docs_edit/orden_de_inspeccion',
      controller: 'work_order_listing_edit_controller',
      templateUrl:'partials/inspection_order_partials/listing_edit.html',
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




    $stateProvider.state('newWorkOrder',{
      url: '/docs/orden_de_trabajo/new',
      controller: 'work_order_new_controller',
      templateUrl: 'partials/work_order_partials/new.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    $stateProvider.state('newInspectionOrder',{
      url: '/docs/orden_de_inspeccion/new',
      controller: 'inspection_order_new_controller',
      templateUrl: 'partials/inspection_order_partials/new.html',
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
      url: '/docs_edit/orden_de_inspeccion/new/:id',
      controller: 'inspection_order_edit_controller',
      templateUrl: 'partials/inspection_order_partials/edit.html',
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

  app.run(function($ionicPlatform,  $rootScope, $location, Model) {

    $rootScope.optionsProyecto = Model.getProyectos();

    $rootScope.optionsProyecto = Model.getProyectos();

    $rootScope.optionsPropiedad = Model.getPropiedad();

    $rootScope.optionsTipoPropiedad = Model.getTipoPropiedad();

    $rootScope.optionsRecinto = Model.getRecinto();

    $rootScope.optionsLugar = Model.getLugar();

    $rootScope.optionsProblema = Model.getProblema();

    $rootScope.optionsInstruccion = Model.getInstruccion();

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
