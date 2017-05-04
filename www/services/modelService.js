
angular.module('starter').factory('Model', function () {


     return {

       getProyectos(){
         lista = ["ECO URBE", "ECO VISTA", "ECO FUTURO", "..."];
         return lista;
       },

       getEtapa ( proyecto ){

         lista = [];

         switch (proyecto) {

           case "ECO URBE":
             lista = ["ECO URBE I", "ECO URBE II"];
             break;

           case "ECO VISTA":
             lista = ["ECO VISTA"];
             break;

           case "ECO FUTURO":
             lista = ["ECO FUTURO I", "ECO FUTURO II", "ECO FUTURO III"];
             break;

          default:
             lista = ["..."];
             break;

         }

         return lista;
       },

       getPropiedad( ){
         return ["IRBII - DEPTO. 2007"];
       },

       getTipoPropiedad(){
         return ["URBIII - 2D + 2B"];
       },

       getRecinto(){
         return ["LIVING", "CLOSET PASILLO", "ESTAR", "TERRAZA", "COMEDOR", "DORMITORIO 1", "WALKING CLOSET 1"];
       },

       getLugar(){
         return ["PISO", "ENCHUFE", "PUERTA ABATIR", "..."];
       },

       getItem( lugar ){
         lista = []
         switch (lugar) {

           case "PISO":
             lista = ["PISO FLOTANTE", "CERAMICA", "CUBREJUNTA", "PORCELANATO"];
             break;

           case "ENCHUFE":
             lista = ["CAJA"];
             break;

           case "PUERTA ABATIR":
             lista = ["BARNIZ", "HOJA MADERA", "MARCO"];
             break;

           default:
             lista = ["..."];
             break;

         }
         return lista;
       },

       getProblema(){
         return ["MAL INSTALADO(A)", "DESNIVELADO(A)", "REPARACION NOTORIA", "MANCHADO(A)"];
       },

       getInstruccion(){
         return ["CORREGIR", "CAMBIAR", "REPARAR"];
       },
     }
  })
