let express = require("express");//Llamado a la dependencia express
let router = express.Router();//Creación del router usando express
var controllerExperts = require("../controllers/ControllersExperts");//llamado al controlador experts
router.get("/app", controllerExperts.prueba);//Ruta con método get de prueba de la app
router.post('/expert/create',controllerExperts.saveExpert);//Ruta con método post para crear un expert
router.get('/expert/search/:id',controllerExperts.buscarData);//Ruta con método get para traer un expert por id
router.get('/expert/all/:id?',controllerExperts.listarAllData);//Ruta con método get para traer todos los experts o por id también
router.delete('/expert/delete/:id',controllerExperts.deleteExpert);//Ruta con método delete para eliminar un expert
router.put('/expert/update/:id',controllerExperts.updateExpert);//Ruta con método put para actualizar un expert
module.exports = router;//Exportación de las rutas 
