angular.module('starter').controller('work_order_conformity_record_controller',
function($scope, $state, workOrder_factory, $ionicHistory, $ionicModal, $ionicPopup, Camera) {

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

  $scope.solicitarFirma = function(){
    if (!verificarErrores()){
      $scope.openSignatureModal();
    }
    else{
      $ionicPopup.alert({
        title: 'Un momento...',
        template: '<p style="text-align: center;">Antes de continuar, resuelve los errores indicados.</p>',
      });
    }
  }

  function verificarErrores(){
    $scope.error_recepcionado_por = workOrder_factory.verificar_conformidad_repecionadoPor($scope.conformity_data);
    $scope.error_data_telefono = workOrder_factory.verificar_conformidad_telefono($scope.conformity_data);
    $scope.error_requerimientos = verificarCheckboxRequerimientos();
    $scope.error_nivel = verificarNivelConformidad();
    return $scope.error_recepcionado_por || $scope.error_data_telefono || $scope.error_requerimientos;;
  }

  function verificarCheckboxRequerimientos(){
    if ($scope.lista_checkbox_requerimientos.length == 0){
      return "Seleccione al menos un requerimiento para firmar la conformidad";
    }
    return null;
  }

  function verificarNivelConformidad(){
    if(!obtenerNivelConformidad()){
      return "Seleccione un nivel de conformidad";
    }
    return null;
  }

  function confirmarActa(){

    incluirConformidadAData();
    workOrder_factory.updateDoc($scope.data);
    console.log(workOrder_factory.getDoc($state.params.id));
    $scope.changeState("home");

  }

  function incluirConformidadAData(){
    $scope.conformity_data.nivel_conformidad =  obtenerNivelConformidad();
    $scope.conformity_data.fecha = obtenerFechaActual();
    $scope.conformity_data.firma = signatureBase64;
    $scope.conformity_data.foto_comprobante = $scope.pictureImageSource;
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
          $scope.data.requerimientos[v].id_conformidad = $scope.conformity_data.id_conformidad;
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

//****************************************************************************//
// FIRMA:

  var canvas;
  var signaturePad;
  var signatureBase64;

  $scope.openSignatureModal = function() {
    $scope.signatureModal.show();
    canvas = document.getElementById("signatureCanvas");
    signaturePad = new SignaturePad(canvas);
    resizeCanvas(canvas);
  };

  $scope.clearSignature = function() { signaturePad.clear(); };

  $scope.closeSignatureModal = function() {$scope.signatureModal.hide();};

  // Cleanup the modal when we're done with it!
  $scope.$on('$destroy', function() { $scope.signatureModal.remove(); });

  $ionicModal.fromTemplateUrl('signature-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.signatureModal = modal;
  });

  $scope.openSignatureConfirmation = function(){

    $ionicPopup.confirm({
      title: '¿Estas seguro de que quieres firmar este documento?',
      template: '<p style="text-align: center;">Al ingresar y confirmar tu firma, estás aceptando la información expuesta en el acta de conformidad.</p>',
      buttons: [
        {
          text: 'Cancelar',
        },

        {
           text: '<b>Continuar</b>',
           type: 'button-positive',
           onTap: function(e) {

             if (!signaturePad || signaturePad.isEmpty()){

               $ionicPopup.alert({
                 title: 'Un momento...',
                 template: '<p style="text-align: center;">No has ingresado ninguna firma, intentalo nuevamente.</p>',
                 buttons: [
                   {
                     text: 'Volver a intentar',
                   }
                 ]});
           }

           else{

             signatureBase64 = signaturePad.toDataURL();

             $ionicPopup.alert({
               title: 'Ultimo paso...',
               template: '<p style="text-align: center;">Para finalizar, toma una foto del carnet de la persona quien firmo este documento.</p>',
               buttons: [
                 {
                   text: '<b>Continuar</b>',
                   type: 'button-positive',
                   onTap: function(e){
                     $scope.takePicture();
                  }
                 }
               ]})
           }
         }
       }
     ]});
  }

  function resizeCanvas(c) {
      // When zoomed out to less than 100%, for some very strange reason,
      // some browsers report devicePixelRatio as less than 1
      // and only part of the canvas is cleared then.
      var ratio =  Math.max(window.devicePixelRatio || 1, 1);
      c.width = c.offsetWidth * ratio;
      c.height = c.offsetHeight * ratio;
      c.getContext("2d").scale(ratio, ratio);
  }


//****************************************************************************//
// CAMARA:

  var pictureCanvas;
  var pictureCtx;
  var pictureImage;


  $scope.takePicture = function (options) {

    var options = {
       quality : 75,
       targetWidth: 400,
       targetHeight: 400,
       sourceType: 1,
       destinationType: 0,
       correctOrientation: true
    };


    $scope.openPictureModal();

    if (navigator.camera){
      Camera.getPicture(options).then(function(imageData) {
         $scope.pictureImageSource = "data:image/jpeg;base64," + imageData;
      }, function(err) {

      });
    }

    else{

      $scope.noCamera = true;

      $ionicPopup.alert({
        title: 'Error...',
        template: '<p style="text-align: center;">No se ha detectado una camara en el dispositivo. No es posible continuar con la firma del acta de conformidad</p>',
        buttons: [
          {
            text: '<b>Cerrar</b>',
          }
        ]});

        $scope.pictureImageSource = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAZAAAAGQBAMAAABykSv/AAAAG1BMVEXMzMyWlpajo6O3t7fFxcWqqqq+vr6cnJyxsbHzLcY6AAAACXBIWXMAAA7EAAAOxAGVKw4bAAADLElEQVR4nO3ZPU8jOQAG4ATyVeLsQijJP1j+QVKstiXS6a6FYntSXE/++Y3tCfagC3TnOel5CnjZDZLfZMZjm8kEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgv7H4a/Pnx/S538e/nz+mlq5C+nYKIbx9SBdsb+LXVfey+8kwNfWYisTB5NGUdMF1SEVi31y4pJZmIRV5iYMJz4N0wT4VWaSX3Q1SU/Nc5Bj+mB3C6yBdcEhFluF29zNsBqmpl1RkES+mVXxbS7qg+wBu0u+9xYvquU5NHVOReXjovm5v63TBMhc5rCdxoniqU0urcIpFpvn22NTpgtN9KtLfHq91amm/mcYieeDTsKvSv5uF11ikH3j4XqWmtnepyGO6lK7CjypF3Zy2674dywd0FZ5jket8KW2/VamlbhSpyKF/hLxVKTnFcB3KKLuisci8f4TcV6mlX2GXiuT3M765JSXLeMksyw0wO35PRfqPrKtVUkuHb5NU5Jim20U3Y5WUXIfbwdw674YdiyzzP72sq9RQvFEHRV6rlG3DbhbKIONcUBfZVKmhOIhcJM05s1jkPWUv4WlVzUixZy6yiz/uN1Vq6HQ7yUVCP/ybKmXzcLcvD7tVjPH/+vl5H6rUziyOOhfJ445F3tP5NetDeajsY8xF0s/TUKV20oTzxScSF+llZk1z2vg+kTTTfHGPxLXVe86T2fjukTRDfTFrdRNw/5SfnOeq8c1aobf+rMgilFtkev6Nh7EWOT/PH6rUuwpl0ipFzs/z9aSkdkqR8wrrqUq9x2obW4qcV1i3k5LaKUUurX47x3V5sJciY1v9Tvqb/bwLea5S1u16T6VVUu9H7qrU2LTaIYY6Zb/Cw/7D7q/eId7Uqa3p53v2buW7+nDMNco9e1/k4ilKWvkehxvfcZ6i9IukS+da87hkeRyeI47zXKsvcumk8SVeMsvhycI4Txr7IvP3E9+Som28qhZh8JDI9/Xh/cS3pKamn53GX+cK28EdEMZ5Gt/7//99BAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAMfkHuBCVO3Aw+sYAAAAASUVORK5CYII=";
    }


 };

 $ionicModal.fromTemplateUrl('picture-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.cameraModal = modal;
  });

  $scope.openPictureModal = function() {
    $scope.cameraModal.show();
  };

  $scope.closePictureModal = function() {
    $scope.cameraModal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.cameraModal.remove();
  });

  $scope.savePicture = function(){
    $ionicPopup.confirm({
      title: '¿Estas seguro de que la fotografia es correcta?',
      template: '<p style="text-align: center;">Al presionar continuar estarás dando tu conformidad a los requerimientos seleccionados. No podrás volver a editar el documento despues de esto.</p>',
      buttons: [
        {
          text: 'Cancelar',
        },

        {
           text: '<b>Confirmar</b>',
           type: 'button-positive',
           onTap: function(e) {
             confirmarActa();

           }
         }
       ]
     });
  }
});
