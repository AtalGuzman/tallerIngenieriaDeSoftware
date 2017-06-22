
var app = angular.module('starter', ['ionic', 'ionic-modal-select', 'ionic-datepicker', 'pdf', 'ngCordova']);

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
      controler: 'docsCtrl',
      templateUrl:'partials/docsEdit.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });
    ////////////////////////////////////////////////////////////////////////////
    // VER DOCUMENTOS
    ////////////////////////////////////////////////////////////////////////////
    $stateProvider.state('docsView',{
      url: '/docs_view',
      controler: 'docsView',
      templateUrl:'partials/view_orders/home.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    $stateProvider.state('docsView_WorkOrderListing',{
      url: '/docs_view/orden_de_trabajo',
      controler: 'docsView_work_order_listing',
      templateUrl:'partials/view_orders/home_workorder_listing.html',
      cache: false,
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });


    $stateProvider.state('docsView_WorkOrderViewing',{
      url: '/docs_view/orden_de_trabajo/:id',
      controler: 'docsView_work_order_viewing',
      templateUrl:'partials/view_orders/workorder_viewing.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    $stateProvider.state('docsView_InspectionOrderListing',{
      url: '/docs_view/orden_de_inspeccion',
      controler: 'docsView_inspection_order_listing',
      templateUrl:'partials/view_orders/home_inspection_listing.html',
      cache: false,
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });


    $stateProvider.state('docsView_InspectionOrderViewing',{
      url: '/docs_view/orden_de_inspeccion/:id',
      controler: 'docsView_inspection_order_viewing',
      templateUrl:'partials/view_orders/inspectionorder_viewing.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    ////////////////////////////////////////////////////////////////////////////
    // ACTA DE CONFORMIDAD
    ////////////////////////////////////////////////////////////////////////////

    $stateProvider.state('docsConformityRecord',{
      url: '/docs_conformity',
      controller: 'conformity_record_home_controller',
      templateUrl:'partials/conformity_record_partials/docs_for_conformity_listing.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    $stateProvider.state('conformityWorkOrderListing',{
      url: '/docs_conformity/orden_de_trabajo',
      controller: 'conformity_work_order_listing_controller',
      templateUrl:'partials/conformity_record_partials/work_order_for_conformity_listing.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    $stateProvider.state('conformityWorkOrder',{
      url: '/docs_conformity/orden_de_trabajo/:id',
      controller: 'work_order_conformity_record_controller',
      templateUrl:'partials/conformity_record_partials/work_order_conformity_record.html',
      cache: false,
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    $stateProvider.state('conformityInspectionOrderListing',{
      url: '/docs_conformity/orden_de_inspeccion',
      controller: 'conformity_inspection_order_listing_controller',
      templateUrl:'partials/conformity_record_partials/inspection_order_for_conformity_listing.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });


    $stateProvider.state('conformityInspectionOrder',{
      url: '/docs_conformity/orden_de_inspeccion/:id',
      controller: 'inspection_order_conformity_record_controller',
      templateUrl:'partials/conformity_record_partials/inspection_order_conformity_record.html',
      cache: false,
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    ////////////////////////////////////////////////////////////////////////////


    $stateProvider.state('docsRejection',{
      url: '/docs_rejection',
      controller: 'rejection_records_listing_controller',
      templateUrl:'partials/rejection_record_partials/rejection_record_listing.html',
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    $stateProvider.state('rejectWork',{
      url: '/docs_rejection/:id',
      controller: 'rejection_record_reject_controller',
      templateUrl:'partials/rejection_record_partials/reject_record.html',
      cache: false,
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });


    ///EDICION De ORDENES DE TRABAJO
    $stateProvider.state('editWorkOrderListing',{
      url: '/docs_edit/orden_de_trabajo',
      controller: 'work_order_listing_edit_controller',
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
      cache: false,
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

    $stateProvider.state('newWorkOrder',{
      url: '/docs/orden_de_trabajo/new',
      controller: 'work_order_new_controller',
      templateUrl: 'partials/work_order_partials/new.html',
      cache: false,
      onEnter: function($state, Auth){
        if(!Auth.isLoggedIn()){
           $state.go('log_in');
        }
      }
    });

    $stateProvider.state('newInspectionOrder',{
      url: '/docs/orden_de_inspeccion/new',
      controller: 'inspection_order_new_controller',
      cache: false,
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
      url: '/docs_edit/orden_de_inspeccion/:id',
      controller: 'inspection_order_edit_controller',
      templateUrl: 'partials/inspection_order_partials/edit.html',
      cache: false,
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
