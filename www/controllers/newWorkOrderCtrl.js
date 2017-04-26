angular.module('starter').controller('newWorkOrderCtrl', function($scope, $state, $ionicPopup, workOrderSet) {


  $scope.cancelNewDocument = function(){

    if (!workOrderSet.checkEmptyData($scope.data)){
      showExitConfirmationPopUp();
    }

    else{
      $state.go("docs");
    }

  }


  $scope.changeState = function(newstate){
    $state.go(newstate);
  }


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

  $scope.addNuevoRequerimiento = function() {
    $scope.data.ctdad_requirimientos  = $scope.data.requerimientos.length + 1;
    $scope.data.requerimientos.push(workOrderSet.getReqData());
  };

  $scope.removeRequerimiento = function(index) {
    $scope.data.requerimientos.splice(index, 1);
    $scope.data.ctdad_requirimientos = $scope.data.requerimientos.length - 1;
  };

  $scope.initController = function(){
    //$scope.data = workOrderSet.initData();
    $scope.data = workOrderSet.initDebugData();
    $scope.addNuevoRequerimiento();
  };

  $scope.createDocument = function(){
    for( var v in $scope.data){
      console.log($scope.data[v]);
    }

    var doc = {
      content: [
        {text:[$scope.data.tipo_documento,"\n\n",$scope.data.folio],style:'header'},
        {
          table: {
            style:'tableExample',
            widths: ['*'],
            body:[
              [{text: "\n\nDATOS GENERALES\n\n",style:'subheader'}],
              [
                {
                  alignment: 'justify',
                  text: [
                  "PROYECTO         :\t",$scope.data.datos_generales.proyecto,"\n",
                  "PROPIEDAD        :\t",$scope.data.datos_generales.propiedad,"\n",
                  "TIPO DE PROPIEDAD:\t",$scope.data.datos_generales.tipo_de_propiedad,"\n",
                  "FECHA R.M.       :\t",$scope.data.datos_generales.fecha_rm,"\n",
                  "PROPIETARIO      :\t", $scope.data.datos_generales.propietario,"\n",
                  "E-MAIL           :\t",$scope.data.datos_generales.email,"\n",
                  "TELEFONOS        :\t",$scope.data.datos_generales.telefonos,"\n",
                  "ETAPA            :\t",$scope.data.datos_generales.etapa,"\n",
                  "MANZANA          :\t",$scope.data.datos_generales.manzana_lote,"\n",
                  "FECHA ENTREGA    :\t",$scope.data.datos_generales.fecha_entrega,"\n"
                  ]
                }
              ]
            ]
          } 
        },
        {text:"\n\n"},
        {
          table: {
            style:'tableExample',
            widths: ['*'],
            body:[
              [{text: "\n\nDATOS SOLICITUD\n\n",style:'subheader'}],
              [
                {
                  alignment: 'justify',
                  text: [
                      "FECHA                :\t",$scope.data.datos_solicitud.fecha_solicitud,"\n",
                      "VISITA EFECTUADA POR :\t",$scope.data.datos_solicitud.medio_solicitud,"\n",
                      "MEDIO SOLICITUD      :\t",$scope.data.datos_solicitud.visita_efectuada_por,"\n",
                      "NOMBRE QUIEN RECIBE  :\t",$scope.data.datos_solicitud.nombre_quien_recibe,"\n"
                    ]
                }
              ]
            ]
          }
        },
        {text:"\n\n"},  
        {
          table: {
            style:'tableExample',
            widths: ['*'],
            body:[
              [{text: "\n\nDATOS TRABAJO A REALIZAR\n\n",style:'subheader'}],
              [
                {
                  alignment: 'justify',
                  text: [
                      "DURACION ESTIMADA      :\t",$scope.data.datos_trabajo.duracion_estimada,"\n",
                      "RESPONSABLE            :\t",$scope.data.datos_trabajo.responsable,"\n",
                      "FECHA EJECUCION TRABAJO:\t",$scope.data.datos_trabajo.fecha_ejecucion,"\n",
                      "HORA APROXIMADA        :\t",$scope.data.datos_trabajo.hora_ejecucion,"\n"
                    ]
                }
              ]
            ]
          }
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
        },
        subheader: {
          fontSize: 15,
          bold: true,
          alignment: 'center'
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        }
      }     
    };
    pdfMake.createPdf(doc).open($scope.var);
  };

  $scope.options = {
    loop: false,
    speed: 250,
  };

  $scope.$on("$ionicSlides.sliderInitialized", function(event, data){
    // data.slider is the instance of Swiper
    $scope.slider = data.slider;
  });

  $scope.$on("$ionicSlides.slideChangeStart", function(event, data){
    console.log('Slide change is beginning');
  });

  $scope.$on("$ionicSlides.slideChangeEnd", function(event, data){
    // note: the indexes are 0-based
    $scope.activeIndex = data.slider.activeIndex;
    $scope.previousIndex = data.slider.previousIndex;
  });



})
