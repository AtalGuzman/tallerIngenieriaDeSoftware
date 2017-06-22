angular.module('starter').factory('inspectionOrderPDFService', ['$q', inspectionOrderPDFService])


  function inspectionOrderPDFService($q) {
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
                   "PROYECTO         :\t",data.dg_proyecto,"\n",
                   "PROPIEDAD        :\t",data.dg_propiedad,"\n",
                   "TIPO DE PROPIEDAD:\t",data.dg_tipo_de_propiedad,"\n",
                   "FECHA R.M.       :\t",data.dg_fecha_rm,"\n",
                   "PROPIETARIO      :\t", data.dg_propietario,"\n",
                   "E-MAIL           :\t",data.dg_email,"\n",
                   "TELEFONOS        :\t",data.dg_telefonos,"\n",
                   "ETAPA           :\t",data.dg_etapa,"\n",
                   "MANZANA          :\t",data.dg_manzana_lote,"\n",
                   "FECHA ENTREGA    :\t",data.dg_fecha_entrega,"\n"
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
                       "FECHA                :\t",data.ds_fecha_solicitud,"\n",
                       "VISITA EFECTUADA POR :\t",data.ds_visita_efectuada_por,"\n",
                       "MEDIO SOLICITUD      :\t",data.ds_medio_solicitud,"\n",
                       "NOMBRE QUIEN RECIBE  :\t",data.ds_nombre_quien_recibe,"\n"
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
               [{text: "Observaciones", style: 'header'}],
               [
                 {text: data.observaciones}
               ]
             ]
           }
         },
         { text: '\nRequerimientos\n\n', style: 'header' },
        table(data.requerimientos, ['recinto', 'lugar','item','problema','instruccion','detalle_especifico']),
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

function buildTableBody(data, columns) {
    var body = [];

    body.push(columns);

    data.forEach(function(row) {
        var dataRow = [];

        columns.forEach(function(column) {
            dataRow.push(row[column]);
        })

        body.push(dataRow);
    });

    return body;
}

function table(data, columns) {
  styles: {
    tableExample: {
      width:
      margin: [0, 5, 0, 15]
    }
  }
    return {
        table: {
            style: 'tableExample',
            headerRows: 1,
            body: buildTableBody(data, columns)
        }
    };
}
