var User = require("../models/User");
var bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

function buscarData(req, res) {
    var idExpert = req.params.id;
    console.log(idExpert);
    User.findById(idExpert).exec((err, result) => {
      console.log(result);
      if (err) {
        res
          .status(500)
          .send({ message: "Error al momento de ejecutar la solicitud" });
      } else {
        if (!result) {
          res
            .status(404)
            .send({ message: "El registro a buscar no se encuentra disponible" });
        } else {
          res.status(200).send({ result });
        }
      }
    });
  }
  
  function listarAllData(req, res) {
    var idExpert = req.params.id;
    if (!idExpert) {
      var result = User.find({}).sort("firstname");
    } else {
      var result = User.find({ _id: idExpert }).sort("firstname");
    }
    result.exec(function (err, result) {
      if (err) {
        res
          .status(500)
          .send({ message: "Error al momento de ejecutar la solicitud" });
      } else {
        if (!result) {
          res
            .status(404)
            .send({ message: "El registro a buscar no se encuentra disponible" });
        } else {
          res.status(200).send({ result });
        }
      }
    });
  }

  module.exports = {
    buscarData,
    listarAllData,
  };