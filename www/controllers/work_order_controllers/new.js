angular.module('starter').controller('work_order_new_controller',
function(
  $rootScope,
  $scope,
  $state,
  $ionicPopup,
  $ionicModal,
  $ionicHistory,
  $ionicPopover,
  Model,
  workOrder_factory,
  workOrderPDFService,
  ionicDatePicker,
  Auth,
  StringifyJsonService) {

  // Variables
  var showExitConfirmationPopUp = function(){
    var confirmPopup = $ionicPopup.confirm({
       title: 'Confirmación',
       template: '<p style="text-align: center;">¿Estas seguro que quieres salir sin haber completado ni guardado el documento?</p>'
    });
    confirmPopup.then(function(res) {
       if(res) {
         $scope.changeState("docs");
       }
    });

  };

  // Scope functions
  $scope.save = function(){
    workOrder_factory.saveDoc($scope.data);
    $scope.changeState('home');
  }

  $scope.btnCargarDatosPrueba = function(){
    $scope.data = workOrder_factory.initDebugData();
    $scope.popover.hide();
  }

  $ionicPopover.fromTemplateUrl('navbarPopover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });

  $scope.openPopover = function($event) {
    $scope.popover.show($event);
  };

  $scope.btnSalir = function(){
    showLogoutConfirmationPopUp();
  };

  function showLogoutConfirmationPopUp(){

    var confirmPopup = $ionicPopup.confirm({
       title: 'Confirmación',
       template: '¿Estas seguro que quieres salir de la aplicación?'
    });

    confirmPopup.then(function(res) {
       if(res) {
         Auth.logout();
         $state.changeState("log_in");
         $scope.popover.remove();
       }
    });

  };

  $scope.cancelNewDocument = function(){
    if (workOrder_factory.checkNotEmptyData($scope.data)){
      showExitConfirmationPopUp();
    }
    else{
      $scope.changeState("docs");
    }
  }

  $scope.changeState = function(newstate){
    $ionicHistory.clearCache().then(function(){ $state.go(newstate); });
  }

  $scope.addNuevoRequerimiento = function() {
    $scope.data.requerimientos.push(workOrder_factory.initReqData());
  };

  $scope.removeRequerimiento = function(index) {
    $scope.data.requerimientos.splice(index, 1);
    $scope.data.ctdad_requirimientos = $scope.data.requerimientos.length - 1;
  };

  function initFunction(){

    $scope.data = workOrder_factory.initData();

    $scope.data.id = new Date().getTime().toString();

    $scope.addNuevoRequerimiento();

  };

  initFunction();

  // OTROS:
  $scope.changeProyectoSeleccionado = function(){
    if ( $scope.data.dg_proyecto != $scope.proyectoSeleccionado){
      $scope.proyectoSeleccionado = $scope.data.dg_proyecto;
      $scope.optionsEtapa = Model.getEtapa($scope.proyectoSeleccionado);
      $scope.data.dg_etapa = "";
    }
  }


  $scope.changeLugarSeleccionado = function( index ){
    var value = $scope.data.requerimientos[index].lugar;
    if ($scope.lugarSeleccionado != value){
      $scope.lugarSeleccionado = value;
      $scope.optionsItem = Model.getItem( value );
      $scope.data.requerimientos[index].item = "";
    }
  }


  $scope.options = {
    loop: false,
    speed: 250,
  };

  $scope.$on("$ionicSlides.sliderInitialized", function(event, d){
    // data.slider is the instance of Swiper
    $scope.slider = d.slider;
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, d){
    // note: the indexes are 0-based
    $scope.activeIndex = d.slider.activeIndex;
    $scope.previousIndex = d.slider.previousIndex;
  });


  // ####################### MODAL DE PREVISUALIZACIÓN #########################

  var vm = this;

  // Initialize the modal view.
  $ionicModal.fromTemplateUrl('pdf-viewer.html', {
      scope: $scope,
      animation: 'slide-in-up'
  }).then(function (modal) {
      vm.modal = modal;

  });

  $scope.closeVmModal = function(){
    console.log("Heya");
    vm.modal.hide();
  }

  vm.createInvoice = function () {
      var invoice = $scope.data

      workOrderPDFService.createPdf(invoice)
        .then(function(pdf) {
            var blob = new Blob([pdf], {type: 'application/pdf'});
            $scope.pdfUrl = URL.createObjectURL(blob);

            // Display the modal view
            vm.modal.show();
        });
  };

  // Clean up the modal view.
  $scope.$on('$destroy', function () {
      vm.modal.remove();
  });


  $scope.createDocument = function(){
    for( var v in $scope.data){
      console.log($scope.data[v]);
    }
    vm.createInvoice();
  };

  // ########################### DATEPICKER ####################################
  var formatDate = function( val ) {
    var date = new Date(val);
    var dd = date.getDate();
    var mm = date.getMonth()+1; //January is 0!

    var yyyy = date.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    return dd+'/'+mm+'/'+yyyy
  }


  var toDateLimitation = function ( ){
    var date = new Date();
    var limit = new Date(date.getFullYear(), date.getMonth()+3, 1);
    return limit;
  }

  var fromDateLimitation = function ( ){
    var date = new Date();
    var limit = new Date(date.getFullYear(), date.getMonth()-3, 1);
    return limit;
  }


  var fechaRmObj = {
    callback: function (val) {  //Mandatory
      $scope.data.dg_fecha_rm = formatDate(val);
    },

    from: new Date(2012, 1, 1),
    to: new Date(),
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    closeOnSelect: true,       //Optional
    templateType: 'popup',       //Optional
    titleLabel: 'Selecciona una fecha',
    todayLabel: 'Hoy',
    closeLabel: 'Cerrar',
    mondayFirst: false,
    weeksList: ["L", "M", "W", "J", "V", "S", "D"],
    monthsList: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciciembre"],
    showTodayButton: true,
  };


  $scope.openFechaRMPicker = function(){
    ionicDatePicker.openDatePicker(fechaRmObj);
  };


  var fechaEntrega = {
    callback: function (val) {  //Mandatory
      $scope.data.dg_fecha_entrega = formatDate(val);
    },

    from: new Date( ),
    to: toDateLimitation(),
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    closeOnSelect: true,       //Optional
    templateType: 'popup',       //Optional
    titleLabel: 'Selecciona una fecha',
    todayLabel: 'Hoy',
    closeLabel: 'Cerrar',
    mondayFirst: false,
    weeksList: ["L", "M", "W", "J", "V", "S", "D"],
    monthsList: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciciembre"],
    showTodayButton: true,
  };


  $scope.openFechaEntregaPicker = function(){
    ionicDatePicker.openDatePicker(fechaEntrega);
  };


  var fechaSolicitud = {
    callback: function (val) {  //Mandatory
      $scope.data.ds_fecha_solicitud = formatDate(val);
    },

    from: fromDateLimitation(),
    to: new Date(),
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    closeOnSelect: true,       //Optional
    templateType: 'popup',       //Optional
    titleLabel: 'Selecciona una fecha',
    todayLabel: 'Hoy',
    closeLabel: 'Cerrar',
    mondayFirst: false,
    weeksList: ["L", "M", "W", "J", "V", "S", "D"],
    monthsList: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciciembre"],
    showTodayButton: true,
  };


  $scope.openFechaSolicitudPicker = function(){
    ionicDatePicker.openDatePicker(fechaSolicitud);
  };


  var fechaEjecucion = {
    callback: function (val) {  //Mandatory
      $scope.data.dt_fecha_ejecucion = formatDate(val);
    },

    from: fromDateLimitation(),
    to: toDateLimitation(),
    inputDate: new Date(),      //Optional
    mondayFirst: true,          //Optional
    closeOnSelect: true,       //Optional
    templateType: 'popup',       //Optional
    titleLabel: 'Selecciona una fecha',
    todayLabel: 'Hoy',
    closeLabel: 'Cerrar',
    mondayFirst: false,
    weeksList: ["L", "M", "W", "J", "V", "S", "D"],
    monthsList: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciciembre"],
    showTodayButton: true,
  };

  $scope.openFechaEjecucionPicker = function(){
    ionicDatePicker.openDatePicker(fechaEjecucion);
  }


})
