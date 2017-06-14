angular.module('starter').controller('work_order_conformity_record_controller',
function($scope, $state, workOrder_factory, $ionicHistory, $ionicModal) {

  // *** INICIALIZACIÓN

  function initData(){
    $scope.data = workOrder_factory.getDoc($state.params.id);
    $scope.conformity_data = workOrder_factory.initConformityData();
    $scope.lista_checkbox_requerimientos = [];
    $scope.confList = [ { text: "Muy Conforme", checked: true }, { text: "Conforme", checked: false }, { text: "Disconforme", checked: false }, { text: "Incierto", checked: false } ];
  }

  initData();

  // *** FUNCIONES SCOPE

  $scope.changeState = function(newstate){
    $ionicHistory.clearCache().then(function(){ $state.go(newstate); });
  };

  $scope.volver = function(){
    $scope.changeState('conformityWorkOrderListing')
  };

  $scope.updateSelection = function(position, itens, title) {
    angular.forEach(itens, function(subscription, index) {
        if (position != index)
            subscription.checked = false;
            $scope.selected = title;
        }
    );
  }

  $scope.confirmarActa = function(){
    $scope.openModal();
    /**
    incluirConformidadAData();
    workOrder_factory.updateDoc($scope.data);
    $scope.changeState("home");
    **/
  }

  function incluirConformidadAData(){
    $scope.conformity_data.nivel_conformidad =  obtenerNivelConformidad();
    $scope.conformity_data.fecha = obtenerFechaActual();
    $scope.data.data_conformidades.push($scope.conformity_data);
    actualizarConformidadRequerimientos();
  }

  function actualizarConformidadRequerimientos(){

    var index = 0;
    for ( var v = 0; v < $scope.data.requerimientos.length; v++){
      // Ignora los que ya tienen una conformidad asignada
      if ( !$scope.data.requerimientos[v].conformidad ){

        if ( $scope.lista_checkbox_requerimientos[index] ){
          $scope.data.requerimientos[v].conformidad = obtenerNivelConformidad();
        }

        index++;

      }
    }
  }

  function obtenerNivelConformidad(){
    var nivel_conformidad = null;
    for ( v in $scope.confList){
      if ( $scope.confList[v].checked){
        nivel_conformidad =  $scope.confList[v].text;
      }
    }
    return nivel_conformidad;
  }

  function obtenerFechaActual(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    }
    if(mm<10){
        mm='0'+mm;
    }
    var today = dd+'/'+mm+'/'+yyyy;
    return today;
  }


  // Test
  var canvas;
  var signaturePad;
  angular.element(document).ready(function () {

  });

  function resizeCanvas() {
      // When zoomed out to less than 100%, for some very strange reason,
      // some browsers report devicePixelRatio as less than 1
      // and only part of the canvas is cleared then.
      var ratio =  Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d").scale(ratio, ratio);
  }

  $scope.clearSignature = function()
  {
      signaturePad.clear();
  };

 // modal Test
 $ionicModal.fromTemplateUrl('my-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function() {
    $scope.modal.show();
    canvas = document.getElementById("signatureCanvas");
    signaturePad = new SignaturePad(canvas);
    resizeCanvas();
  };
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });
  // Execute action on hide modal
  $scope.$on('modal.hidden', function() {
    // Execute action
  });
  // Execute action on remove modal
  $scope.$on('modal.removed', function() {
    // Execute action
  });

});
