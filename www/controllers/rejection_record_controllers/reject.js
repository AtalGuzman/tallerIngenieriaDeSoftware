angular.module('starter').controller('rejection_record_reject_controller',
function(
  $rootScope,
  $scope,
  $state,
  $ionicPopup,
  $ionicModal,
  $ionicHistory,
  inspectionOrder_factory,
  ionicDatePicker,
  Model,
  Camera,
  StringifyJsonService) {

  $scope.data = inspectionOrder_factory.getDoc($state.params.id);


    function initData(){
      $scope.data = inspectionOrder_factory.getDoc($state.params.id);
      $scope.rejection_data = inspectionOrder_factory.initRejectionData();
      $scope.lista_checkbox_requerimientos = [];
    }

    initData();

    // *** FUNCIONES SCOPE
    $scope.changeState = function(newstate){
      $ionicHistory.clearCache().then(function(){ $state.go(newstate); });
    };

    $scope.volver = function(){
      $scope.changeState('docsRejection')
    };

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
      $scope.error_recepcionado_por = inspectionOrder_factory.verificar_rechazo_repecionadoPor($scope.rejection_data);
      $scope.error_data_telefono = inspectionOrder_factory.verificar_rechazo_telefono($scope.rejection_data);
      $scope.error_requerimientos = verificarCheckboxRequerimientos();
      return $scope.error_recepcionado_por || $scope.error_data_telefono || $scope.error_requerimientos;;
    }

    function verificarCheckboxRequerimientos(){
      if ($scope.lista_checkbox_requerimientos.length == 0){ return "Seleccione al menos un requerimiento para firmar el acta de rechazo"; }
      return null;
    }


    function confirmarActa(){
      incluirRechazoAData();
      inspectionOrder_factory.updateDoc($scope.data);
      console.log(inspectionOrder_factory.getDoc($state.params.id));
      $scope.changeState("home");
    }

    function incluirRechazoAData(){
      $scope.rejection_data.fecha = obtenerFechaActual();
      $scope.rejection_data.firma = signatureBase64;
      $scope.rejection_data.foto_comprobante = $scope.pictureImageSource;
      $scope.data.data_rechazos.push($scope.rejection_data);
      actualizarRechazoRequerimientos();
    }

    function actualizarRechazoRequerimientos(){

      var index = 0;
      for ( var v = 0; v < $scope.data.requerimientos.length; v++){
        if ( !$scope.data.requerimientos[v].id_rechazo ){
          if ( $scope.lista_checkbox_requerimientos[index] ){ $scope.data.requerimientos[v].id_rechazo = $scope.rejection_data.id_rechazo; }
          index++;
        }
      }
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
        template: '<p style="text-align: center;">Al ingresar y confirmar tu firma, estás aceptando la información expuesta en el acta de rechazo.</p>',
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
          template: '<p style="text-align: center;">No se ha detectado una camara en el dispositivo. No es posible continuar con la firma del acta de rechazo</p>',
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
        template: '<p style="text-align: center;">Al presionar continuar estarás dando tu rechazo a los requerimientos seleccionados. No podrás volver a editar el documento despues de esto.</p>',
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
})
