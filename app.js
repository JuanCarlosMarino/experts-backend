var express = require("express");//Llamado a la dependencia express
var app = express();//Creación de la aplicación utilizando el llamado de express
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var mongoose = require("./src/conexBD/conn")//Llamado a la conexión con la base de datos
var cors = require("cors");
app.use(cors());
app.use(express.json());//Comando para indicar que la aplicación utilizara json como paso de información
app.use(require('./routers/routers'));//Comando para llamar a las rutas e indicarle a la aplicación que las use
app.use(//Comando para indicar a la aplicación las caracteristicas que tendrá la misma
  express.urlencoded({
    extended: true,
  })
);
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization",
    "X-API-KEY",
    "Origin",
    "X-Requested-With",
    "Content-Type, Accept",
    "Access-Control-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

module.exports = app;//Exportación de la aplicación
