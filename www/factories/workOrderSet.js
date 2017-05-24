angular.module('starter').factory('workOrderSet', function() {

  var _data = {
    tipo_documento: '',
    folio: '',
    dg_proyecto: '',
    dg_etapa: '',
    dg_propiedad: '',
    dg_manzana_lote: '',
    dg_tipo_de_propiedad: '',
    dg_fecha_rm: '',
    dg_fecha_entrega: '',
    dg_propietario: '',
    dg_email: '',
    dg_telefonos: '',
    ds_fecha_solicitud: '',
    ds_medio_solicitud: '',
    ds_visita_efectuada_por: '',
    ds_nombre_quien_recibe: '',
    dt_duracion_estimada: '',
    dt_responsable: '',
    dt_fecha_ejecucion: '',
    dt_hora_ejecucion: '',
    requerimientos: []
  };

  var _reqdata = {
    recinto: '',
    lugar: '',
    item: '',
    problema: '',
    instruccion: ''
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
      dataRef = angular.copy(_data);
      dataRef.tipo_documento = "ORDEN DE TRABAJO";
      return dataRef;
    },

    initDataFromFolio: function( folio ){

      _data.tipo_documento = "ORDEN DE TRABAJO";
      _data.folio = folio;
      return anguar.copy(_data);
    },

    initDebugData: function (){
      _data.tipo_documento = "ORDEN DE TRABAJO"
      _data.folio = "0T-URB-000777/634";
      _data.dg_proyecto =  'ECO URBE';
      _data.dg_etapa = 'ECO URBE II';
      _data.dg_propiedad = 'IRBII - DEPTO. 2007';
      _data.dg_manzana_lote = '';
      _data.dg_tipo_de_propiedad = 'URBIII - 2D + 2B';
      _data.dg_fecha_rm = '30/09/2016';
      _data.dg_fecha_entrega = '00/00/0000';
      _data.dg_propietario = 'Sebastían Prieto';
      _data.dg_email = 'sebastian.priet.s@gmail.com';
      _data.dg_telefonos = '87489220';
      _data.ds_fecha_solicitud = '07/04/2019';
      _data.ds_medio_solicitud = 'PRE-ENTREGA RECHAZOS';
      _data.ds_visita_efectuada_por = '';
      _data.ds_nombre_quien_recibe = '';
      _data.dt_duracion_estimada =  '1 día';
      _data.dt_responsable =  'JORGE CABELLO';
      _data.dt_fecha_ejecucion =  '2017-05-02';
      _data.dt_hora_ejecucion =  '8:00 - 8-15';
      return angular.copy(_data);
    },

    getData: function(){
      return angular.copy(_data);
    },

    getReqData: function(){
      return angular.copy(_reqdata);
    },

    checkEmptyData: function(data){
      console.log(data.datos_generales);
      for (var d in data.datos_generales){
        if (checkNotEmptyString(data.datos_generales[d])){
          return false;
        }
      }

      for (var d in data.datos_solicitud){
        if (checkNotEmptyString(data.datos_solicitud[d])){
          return false;
        }
      }

      for (var d in data.datos_trabajo){
        if (checkNotEmptyString(data.datos_trabajo[d])){
          return false;
        }
      }

      if (data.requerimientos > 0){
        return false;
      }

      return true;
    }

  };

});
