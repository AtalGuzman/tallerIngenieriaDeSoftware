angular.module('starter').factory('workOrderPDFService', ['$q', workOrderPDFService])


  function workOrderPDFService($q) {
      function createPdf(invoice) {
          return $q(function(resolve, reject) {
              var dd = createDocumentDefinition(invoice);
              var pdf = pdfMake.createPdf(dd);

              pdf.getBase64(function (output) {
                  resolve(base64ToUint8Array(output));
              });
          });
      }

      return {
          createPdf: createPdf
      };
  }

  function base64ToUint8Array(base64) {
      var raw = atob(base64);
      var uint8Array = new Uint8Array(raw.length);
      for (var i = 0; i < raw.length; i++) {
      uint8Array[i] = raw.charCodeAt(i);
      }
      return uint8Array;
  }

  function createDocumentDefinition(data) {

    var dd = {
       content: [
         {text:[data.tipo_documento,"\n\n",data.folio],style:'header'},
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
                   "PROYECTO         :\t",data.datos_generales.proyecto,"\n",
                   "PROPIEDAD        :\t",data.datos_generales.propiedad,"\n",
                   "TIPO DE PROPIEDAD:\t",data.datos_generales.tipo_de_propiedad,"\n",
                   "FECHA R.M.       :\t",data.datos_generales.fecha_rm,"\n",
                   "PROPIETARIO      :\t", data.datos_generales.propietario,"\n",
                   "E-MAIL           :\t",data.datos_generales.email,"\n",
                   "TELEFONOS        :\t",data.datos_generales.telefonos,"\n",
                   "ETAPA            :\t",data.datos_generales.etapa,"\n",
                   "MANZANA          :\t",data.datos_generales.manzana_lote,"\n",
                   "FECHA ENTREGA    :\t",data.datos_generales.fecha_entrega,"\n"
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
                       "FECHA                :\t",data.datos_solicitud.fecha_solicitud,"\n",
                       "VISITA EFECTUADA POR :\t",data.datos_solicitud.medio_solicitud,"\n",
                       "MEDIO SOLICITUD      :\t",data.datos_solicitud.visita_efectuada_por,"\n",
                       "NOMBRE QUIEN RECIBE  :\t",data.datos_solicitud.nombre_quien_recibe,"\n"
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
                       "DURACION ESTIMADA      :\t",data.datos_trabajo.duracion_estimada,"\n",
                       "RESPONSABLE            :\t",data.datos_trabajo.responsable,"\n",
                       "FECHA EJECUCION TRABAJO:\t",data.datos_trabajo.fecha_ejecucion,"\n",
                       "HORA APROXIMADA        :\t",data.datos_trabajo.hora_ejecucion,"\n"
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

    return dd;
}
