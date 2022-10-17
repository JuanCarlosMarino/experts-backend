let mongoose = require("mongoose"),
  express = require("express"),
  router = express.Router();
var controllerExperts = require("../controllers/ControllersExperts");
router.get("/prueba", controllerExperts.prueba);
router.post('/expert/create',controllerExperts.saveExpert);
router.get('/expert/search/:id',controllerExperts.buscarData);
router.get('/expert/all/:id?',controllerExperts.listarAllData);
router.delete('/expert/delete/:id',controllerExperts.deleteExpert);
router.put('/expert/update/:id',controllerExperts.updateExpert);
module.exports = router;
