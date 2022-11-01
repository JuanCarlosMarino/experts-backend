//Este archivo es el punto de entrada del proyecto
var app = require("./app");//Llamado  a la app la cual se encuentra en el archivo app.js
var port = process.env.PORT || 4000;//Llamado al puerto por variables de entorno y asignación de puerto en caso de no haberla

app.listen(port, () => {//Ejecución de la función que pone en ejecución la aplicación en el puerto indicado
  console.log("servidor corriendo ok");
});
