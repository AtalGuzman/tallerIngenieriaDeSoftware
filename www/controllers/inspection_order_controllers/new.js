angular.module('starter').controller('inspection_order_new_controller',
function(
  $rootScope,
  $scope,
  $state,
  $ionicPopup,
  $ionicModal,
  inspectionOrder_factory,
  ionicDatePicker,
  Model,
  StringifyJsonService) {

  // Variables
  var showExitConfirmationPopUp = function(){
    var confirmPopup = $ionicPopup.confirm({
       title: 'Confirmación',
       template: '<p style="text-align: center;">¿Estas seguro que quieres salir sin haber guardado el documento?</p>'
    });
    confirmPopup.then(function(res) {
       if(res) {
         $scope.changeState("docs");
       }
    });

  };

  var addNuevoRequerimiento = function(){
    $scope.data.requerimientos.push(inspectionOrder_factory.initReqData());
  }

  // Inicialización de componentes
  function initComponents() {

    $scope.data = inspectionOrder_factory.initData();

    $scope.data.id = new Date().getTime().toString();

    $scope.proyectoSeleccionado = ""

    $scope.lugarSeleccionado = "";

    addNuevoRequerimiento();
  }

  initComponents();


  // Funciones Scope:
  $scope.addNuevoRequerimiento = addNuevoRequerimiento;

  $scope.removeRequerimiento = function(index) {
    $scope.data.requerimientos.splice(index, 1);
  };

  $scope.changeProyectoSeleccionado = function(){
    if ( $scope.data.dg_proyecto != $scope.proyectoSeleccionado){
      $scope.proyectoSeleccionado = $scope.data.dg_proyecto;
      $scope.optionsEtapa = Model.getEtapa($scope.proyectoSeleccionado);
      $scope.data.dg_etapa = "";
    }
  };

  $scope.changeState = function(newstate){
    $state.go(newstate);
  }

  $scope.cancelNewDocument = function(){
      if (!inspectionOrder_factory.checkEmptyData($scope.data)){
        showExitConfirmationPopUp();
      }
      else{
        $state.go("docs");
      }
  };

  $scope.changeLugarSeleccionado = function( index ){
    var value = $scope.data.requerimientos[index].lugar;
    if ($scope.lugarSeleccionado != value){
      $scope.lugarSeleccionado = value;
      $scope.optionsItem = Model.getItem( value );
      $scope.data.requerimientos[index].item = "";
    }
  }

  $scope.save = function(){
    console.log($scope.data);
    inspectionOrder_factory.saveDoc($scope.data);
    $state.go('home');
  }

// OTROS:

  // Slider options
  $scope.options = {
    loop: false,
    speed: 250,
  };

  $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
    // data.slider is the instance of Swiper
    $scope.slider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
    // note: the indexes are 0-based
    $scope.activeIndex = data.slider.activeIndex;
    $scope.previousIndex = data.slider.previousIndex;
  });

  // Date Pickers function
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
    monthsList: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
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
    monthsList: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
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
    monthsList: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    showTodayButton: true,
  };


  $scope.openFechaSolicitudPicker = function(){
    ionicDatePicker.openDatePicker(fechaSolicitud);
  };


  var fechaEjecucion = {
    callback: function (val) {  //Mandatory
      $scope.data.ds_fecha_ejecucion = formatDate(val);
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
    monthsList: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    showTodayButton: true,
  };


  $scope.openFechaEjecucionPicker = function(){
    ionicDatePicker.openDatePicker(fechaEjecucion);
  }

  var fechaAcordada = {
    callback: function (val) {  //Mandatory
      $scope.data.ds_fecha_visita_acordada = formatDate(val);
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
    monthsList: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
    showTodayButton: true,
  };


  $scope.openFechaAcordadaPicker = function(){
    ionicDatePicker.openDatePicker(fechaAcordada);
  }
})
