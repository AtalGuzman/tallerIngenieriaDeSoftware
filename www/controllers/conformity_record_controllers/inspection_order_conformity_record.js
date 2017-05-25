angular.module('starter').controller('inspection_order_conformity_record_controller',
function($scope, $state, inspectionOrder_factory, $ionicHistory) {

  $scope.changeState = function(newstate){
    $ionicHistory.clearCache().then(function(){ $state.go(newstate); });
  };

  $scope.volver = function(){
    $scope.changeState('conformityInspectionOrderListing')
  };

  $scope.data = inspectionOrder_factory.getDoc($state.params.id);
  $scope.conformity_data = inspectionOrder_factory.initConformityData();

  console.log("????");
  console.log($scope.data);

  $scope.confList = [
    { text: "Muy Conforme", checked: true },
    { text: "Conforme", checked: false },
    { text: "Disconforme", checked: false },
    { text: "Incierto", checked: false }
  ];

  $scope.updateSelection = function(position, itens, title) {
    angular.forEach(itens, function(subscription, index) {
        if (position != index)
            subscription.checked = false;
            $scope.selected = title;
        }
    );
  }

  $scope.confirmarActa = function(){

    for ( v in $scope.confList){
      if (v.checked){
        var nivel_conformidad = true;
      }
    }
    $scope.conformity_data.nivel_conformidad = nivel_conformidad;
    $scope.conformity_data.fecha = formatTodayDate();
    $scope.data.conformity_data = $scope.conformity_data;
    inspectionOrder_factory.updateDoc($scope.data);
    $scope.changeState("home");

  }

  function formatTodayDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

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

});
