angular.module('starter').factory('workOrderSet', function() {

  var _data = {
    tipo_documento: '',
    folio: '',
    datos_generales: {
      proyecto: '',
      etapa: '',
      propiedad: '',
      manzana_lote: '',
      tipo_de_propiedad: '',
      fecha_rm: '',
      fecha_entrega: '',
      propietario: '',
      email: '',
      telefonos: '',
    },
    datos_solicitud: {
      fecha_solicitud: '',
      medio_solicitud: '',
      visita_efectuada_por: '',
      nombre_quien_recibe: '',
    },
    datos_trabajo: {
      duracion_estimada: '',
      responsable: '',
      fecha_ejecucion: '',
      hora_ejecucion: '',
    },
    ctdad_requirimientos: 0,
    requerimientos: []
  };

  var _reqdata = {
    recinto: '',
    lugar: '',
    item: '',
    problema: '',
    instruccion: ''
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
      _data.datos_generales.proyecto =  'ECO URBE';
      _data.datos_generales.etapa = 'ECO URBE II';
      _data.datos_generales.propiedad = 'IRBII - DEPTO. 2007';
      _data.datos_generales.manzana_lote = '';
      _data.datos_generales.tipo_de_propiedad = 'URBIII - 2D + 2B';
      _data.datos_generales.fecha_rm = '30/09/2016';
      _data.datos_generales.fecha_entrega = '00/00/0000';
      _data.datos_generales.propietario = 'Sebastían Prieto';
      _data.datos_generales.email = 'sebastian.priet.s@gmail.com';
      _data.datos_generales.telefonos = '87489220';
      _data.datos_solicitud.fecha_solicitud = '07/04/2019';
      _data.datos_solicitud.medio_solicitud = 'PRE-ENTREGA RECHAZOS';
      _data.datos_solicitud.visita_efectuada_por = '';
      _data.datos_solicitud.nombre_quien_recibe = '';
      _data.datos_trabajo.duracion_estimada =  '1 día';
      _data.datos_trabajo.responsable =  'JORGE CABELLO';
      _data.datos_trabajo.fecha_ejecucion =  '2017-05-02';
      _data.datos_trabajo.hora_ejecucion =  '8:00 - 8-15';
      _data.ctdad_requirimientos = 0;
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

      if (data.ctdad_requirimientos > 0){
        return false;
      }

      return true;
    }

  };

});
