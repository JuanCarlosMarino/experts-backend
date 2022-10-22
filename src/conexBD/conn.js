const mongoose = require("mongoose");//Llamado a la dependencia mongoose
mongoose.connect(//Comando para conectarse con la base de datos en el caso 
  "mongodb://localhost:27017/expertsDB",  
  (err, res) => {
    if (err) {
      throw err;
    } else {
      console.log("La conexion a la base de datos fue correcta...");
    }
  }
);
module.exports = mongoose;
