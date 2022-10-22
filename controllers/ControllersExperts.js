var Expert = require("../models/Expert");
function prueba(req, res) {
  res.status(200).send({
    message: "Aplicación Experts corriendo...",
  });
}

function saveExpert(req, res) {
  var myExpert = new Expert(req.body);
  myExpert.save((err, result) => {
    res.status(200).send({ message: result });
  });
}

function buscarData(req, res) {
  var idExpert = req.params.id;
  console.log(idExpert);
  Expert.findById(idExpert).exec((err, result) => {
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
    var result = Expert.find({}).sort("firstname");
  } else {
    var result = Expert.find({ _id: idExpert }).sort("firstname");
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

function updateExpert(req, res) {
  var id = req.params.id;
  Expert.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true },
    function (err, expert) {
      if (err) res.send(err);
      res.json(expert);
    }
  );
}

function deleteExpert(req, res) {
  var id = req.params.id;
  Expert.findByIdAndRemove(id, function (err, expert) {
    if (err) {
      return res.json(500, {
        message: "No hemos encontrado el experto",
      });
    }
    return res.json(expert);
  });
}

module.exports = {
  prueba,
  saveExpert,
  buscarData,
  listarAllData,
  updateExpert,
  deleteExpert,
};
