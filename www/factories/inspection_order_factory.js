angular.module('starter').factory('inspectionOrder_factory', function(StringifyJsonService) {

  var _data = {
    id: null,
    tipo_documento: null,
    folio: null,
    dg_proyecto: null,
    dg_etapa: null,
    dg_propiedad: null,
    dg_manzana_lote: null,
    dg_fecha_rm: null,
    dg_fecha_entrega: null,
    dg_propietario: null,
    dg_email: null,
    dg_telefonos: null,
    dg_contacto: null,
    dg_fono_de_contacto: null,
    ds_fecha_solicitud: null,
    ds_medio_solicitud: null,
    ds_fecha_visita_acordada: null,
    ds_hora: null,
    ds_visita_efectuada_por: null,
    ds_nombre_quien_recibe: null,
    observaciones: null,
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
    instruccion: null,
    detalle_especifico: null
  };

  var _confData = {
    recepcionado_por: null,
    telefono: null,
    nivel_conformidad: null,
    fecha: null
  };

  var checkEmptyString = function(str){
    return (str.length === 0 || !str.trim());
  };

  var checkNotEmptyString = function(str){
    return (str.length > 0 && str.trim());
  };

  return {
    initData: function(){
      dataRef = angular.copy(_data);
      dataRef.tipo_documento = "ORDEN DE INSPECCIÓN";
      return dataRef;
    },

    initDataFromFolio: function( folio ){

      _data.tipo_documento = "ORDEN DE INSPECCIÓN";
      _data.folio = folio;
      return anguLar.copy(_data);
    },

    initReqData: function( ){
      return angular.copy(_reqdata);
    },

    initConformityData:function(){
      return angular.copy(_confData);
    },

    checkEmptyData: function(data){

      for (var t in data){
        if (checkNotEmptyString(data[t])){
          return false;
        }
      }

      return true;
    },

    saveDoc: function(inspection_order_data){

      if (window.localStorage['docs_inspectionOrder']){
        var docsStorage = JSON.parse(window.localStorage['docs_inspectionOrder']);
      }

      else {
        var docsStorage = [];
      }

      docsStorage.push(inspection_order_data);

      window.localStorage.setItem("docs_inspectionOrder", StringifyJsonService.stringify(docsStorage));

    },

    updateDoc: function(inspection_order_data){

      if (window.localStorage['docs_inspectionOrder']){
        var docsStorage = JSON.parse(window.localStorage['docs_inspectionOrder']);
      }

      else {
        var docsStorage = [];
      }

      for(var i = 0; i < docsStorage.length; i++){
        if(docsStorage[i].id === inspection_order_data.id){
          docsStorage[i] = inspection_order_data;
          break;
        }
      }

      window.localStorage.setItem("docs_inspectionOrder", StringifyJsonService.stringify(docsStorage));
    },

    getDoc: function(id){

      console.log("heyaa");
      
      if (window.localStorage['docs_inspectionOrder']){
        var docsStorage = JSON.parse(window.localStorage['docs_inspectionOrder']);
        var data = docsStorage.filter( function (doc){
          return doc.id === id;
        });
        return angular.copy(data[0]);
      }

      return null;

    },

    getEditableDocs: function(){
      if (window.localStorage['docs_inspectionOrder']){
        var docsStorage = JSON.parse(window.localStorage['docs_inspectionOrder']);
        console.log(docsStorage);
        var data = docsStorage.filter( function (doc){
          return (!doc.conformity_data) && (!doc.rejection_data) ;
        });
        console.log(data);
        return data;
      }
      else{
        return null;
      }
    },

    getConfirmedDocs: function(){
      if (window.localStorage['docs_inspectionOrder']){
        var docsStorage = JSON.parse(window.localStorage['docs_inspectionOrder']);
        var data = docsStorage.filter( function (doc){
          return doc.conformity_data && !doc.rejection_data;
        });
        return data;
      }
      else{
        return null;
      }
    },

    getRejectionDocs: function(){
      if (window.localStorage['docs_inspectionOrder']){
        var docsStorage = JSON.parse(window.localStorage['docs_inspectionOrder']);
        var data = docsStorage.filter( function (doc){
          return !doc.conformity_data && doc.rejection_data == true;
        });
        return data;
      }
      else{
        return null;
      }
    },

    getAllDocs: function(){
      if (window.localStorage['docs_inspectionOrder']){
        return JSON.parse(window.localStorage['docs_inspectionOrder']);
      }
      else{
        return null;
      }
    }

  };

});
