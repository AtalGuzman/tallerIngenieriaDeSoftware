angular.module('starter').factory('workOrder_factory', function(StringifyJsonService) {

  var _data = {
    tipo_documento: null,
    folio: null,
    dg_proyecto: null,
    dg_etapa: null,
    dg_propiedad: null,
    dg_manzana_lote: null,
    dg_tipo_de_propiedad: null,
    dg_fecha_rm: null,
    dg_fecha_entrega: null,
    dg_propietario: null,
    dg_email: null,
    dg_telefonos: null,
    ds_fecha_solicitud: null,
    ds_medio_solicitud: null,
    ds_visita_efectuada_por: null,
    ds_nombre_quien_recibe: null,
    dt_duracion_estimada: null,
    dt_responsable: null,
    dt_fecha_ejecucion: null,
    dt_hora_ejecucion: null,
    requerimientos: []
  };

  var _reqdata = {
    recinto: null,
    lugar: null,
    item: null,
    problema: null,
    instruccion: null
  }

  var getDoc = function(id, $rootScope){
      return $rootScope.ordenesDeTrabajo.filter(
        function(doc){
          if(doc.id == id){
          //  console.log(doc);
          }
          return doc.id == id;
        }
      );
  }
  var checkEmptyString = function(str){
    return (str.length === 0 || !str.trim());
  };

  var checkNotEmptyString = function(str){
    return (str.length > 0 && str.trim());
  };

  return {
    initData: function(){
      var dataRef = angular.copy(_data);
      dataRef.tipo_documento = "ORDEN DE TRABAJO";
      return dataRef;
    },

    initDataFromFolio: function( folio ){

      var dataRef = angular.copy(_data);
      dataRef.tipo_documento = "ORDEN DE TRABAJO";
      dataRef.folio = folio;
      return dataRef;
    },

    initDebugData: function (){
      var dataRef = angular.copy(_data);
      dataRef.tipo_documento = "ORDEN DE TRABAJO"
      dataRef.folio = "0T-URB-000777/634";
      dataRef.dg_proyecto =  'ECO URBE';
      dataRef.dg_etapa = 'ECO URBE II';
      dataRef.dg_propiedad = 'IRBII - DEPTO. 2007';
      dataRef.dg_manzana_lote = '';
      dataRef.dg_tipo_de_propiedad = 'URBIII - 2D + 2B';
      dataRef.dg_fecha_rm = '30/09/2016';
      dataRef.dg_fecha_entrega = '00/00/0000';
      dataRef.dg_propietario = 'Sebastían Prieto';
      dataRef.dg_email = 'sebastian.priet.s@gmail.com';
      dataRef.dg_telefonos = '87489220';
      dataRef.ds_fecha_solicitud = '07/04/2019';
      dataRef.ds_medio_solicitud = 'PRE-ENTREGA RECHAZOS';
      dataRef.ds_visita_efectuada_por = '';
      dataRef.ds_nombre_quien_recibe = '';
      dataRef.dt_duracion_estimada =  '1 día';
      dataRef.dt_responsable =  'JORGE CABELLO';
      dataRef.dt_fecha_ejecucion =  '2017-05-02';
      dataRef.dt_hora_ejecucion =  '8:00 - 8-15';
      return dataRef;
    },

    initReqData: function(){
      return angular.copy(_reqdata);
    },

    checkEmptyData: function(data){
      for (var t in data){
        if (checkNotEmptyString(data[t])){
          return false;
        }
      }

      return true;
    },

    saveDoc: function(work_order_data){

      if (window.localStorage['docs_workOrder']){
        var docsStorage = JSON.parse(window.localStorage['docs_workOrder']);
      }

      else {
        var docsStorage = [];
      }

      docsStorage.push(work_order_data);

      window.localStorage.setItem("docs_workOrder", StringifyJsonService.stringify(docsStorage));

    },

    updateDoc: function(work_order_data){

      if (window.localStorage['docs_workOrder']){
        var docsStorage = JSON.parse(window.localStorage['docs_workOrder']);
      }

      else {
        var docsStorage = [];
      }

      for(var i = 0; i < docsStorage.length; i++){
        if(docsStorage[i].id === work_order_data.id){
          docsStorage[i] = work_order_data;
          break;
        }
      }

      window.localStorage.setItem("docs_workOrder", StringifyJsonService.stringify(docsStorage));
    },

    getDoc: function(id){

      if (window.localStorage['docs_workOrder']){
        var docsStorage = JSON.parse(window.localStorage['docs_workOrder']);
        console.log("docs;");
        console.log(docsStorage);
        var data = docsStorage.filter( function (doc){
          return doc.id === id;
        });
        return angular.copy(data[0]);
      }

      return null;

    },

    getAllDocs: function(){
      if (window.localStorage['docs_workOrder']){
        return JSON.parse(window.localStorage['docs_workOrder']);
      }
      else{
        return null;
      }
    }

  };

});