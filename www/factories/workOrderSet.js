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
  };


  var checkEmptyString = function(str){
    return (str.length === 0 || !str.trim());
  };

  var checkNotEmptyString = function(str){
    return (str.length > 0 && str.trim());
  };

  var workOrderSet = function(){
    this._data.tipo_documento = "ORDEN DE TRABAJO";
  }


  return {
    initData: function(){
      _data.tipo_documento = "ORDEN DE TRABAJO";
      return angular.copy(_data);
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


    var clearData = function(){
      _data.tipo_documento = '';
      _data.folio = '';
      _data.datos_generales.proyecto =  '';
      _data.datos_generales.etapa = '';
      _data.datos_generales.propiedad = '';
      _data.datos_generales.manzana_lote = '';
      _data.datos_generales.tipo_de_propiedad = '';
      _data.datos_generales.fecha_rm = '';
      _data.datos_generales.fecha_entrega = '';
      _data.datos_generales.propietario = '';
      _data.datos_generales.email = '';
      _data.datos_generales.telefonos = '';
      _data.datos_solicitud.fecha_solicitud = '';
      _data.datos_solicitud.medio_solicitud = '';
      _data.datos_solicitud.visita_efectuada_por = '';
      _data.datos_solicitud.nombre_quien_recibe = '';
      _data.datos_trabajo.duracion_estimada =  '';
      _data.datos_trabajo.responsabl =  '';
      _data.datos_trabajo.fecha_ejecucion =  '';
      _data.datos_trabajo.hora_ejecucion =  '';
      _data.ctdad_requirimientos = 0;
    };



});
