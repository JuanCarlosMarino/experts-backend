let express = require("express");//Llamado a la dependencia express
let router = express.Router();//Creación del router usando express
var controllerUsers = require("../controllers/ControllersUsers");//llamado al controlador experts
var controllerTokens = require("../controllers/ControllersTokens")
var controllerLocations = require('../controllers/ControllersLocations')


router.get("/app", controllerUsers.prueba);//Ruta con método get de prueba de la app

//Manejo de usuarios
router.post('/user/create',controllerUsers.saveUser);//Ruta con método post para crear cuenta de usuario
router.post('/user/login', controllerUsers.login); //Ruta con método post parra loggearse y obtener token
router.post('/user/update/:nick', controllerTokens.verifyToken,controllerUsers.updateUser);//Ruta con método put para actualizar un usuario
router.get('/user/valid/token',controllerTokens.verifyToken, controllerUsers.validToken);//Validar token

router.get('/user/locationExperts/:location' ,controllerTokens.verifyToken, controllerUsers.buscarExperts)//consultar expertos por ubicacion 
router.get('/user/userbynick/:nick' , controllerTokens.verifyToken, controllerUsers.getUserByNick)//consultar usuario por su nick


//Manejo de ubicaciones 
router.get('/location/locations', controllerTokens.verifyToken, controllerLocations.listarAllLocations)//consultar ubicaciones registradas




router.get('/user/search/:id',controllerUsers.buscarData);//Ruta con método get para traer un expert por id
router.get('/user/all/:id?',controllerUsers.listarAllData);//Ruta con método get para traer todos los experts o por id también
router.delete('/user/delete/:id',controllerUsers.deleteUser);//Ruta con método delete para eliminar un expert
router.put('/user/update/:id',controllerUsers.updateUser);//Ruta con método put para actualizar un expert
module.exports = router;//Exportación de las rutas 
