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
