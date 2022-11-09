var User = require("../models/User");
var bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose")

//probar un controlador
function prueba(req, res) {
  res.status(200).send({
    message: "Aplicación Experts corriendo...",
  });
}

//Crear usuario
function saveUser(req, res) {
  var user = req.body;
  user.createDate = new Date();
  user.isExpert = false;
  user.password = bcrypt.hashSync(user.password);
  var myUser = new User(user);
  myUser.save((err, result) => {
    if (err) {
      res.send({ error: err, isAccept: false });
    } else {
      res.status(200).send({ message: result, isAccept: true });
    }
  });
}

//Login de usuario
function login(req, res) {
  const user = req.body;
  var result = User.find({ nickname: user.nickname });
  result.exec(function (err, result) {
    if (err) {
      res
        .status(500)
        .json({ message: "Error al momento de ejecutar la solicitud" });
    } else {
      if (!result) {
        res
          .send({ message: "El usuario y/o contraseña son incorrectos", access: false });
      } else {
        if (result[0] != null) {
          if (bcrypt.compareSync(user.password, result[0].password)) {
            jwt.sign(
              { user: user },
              "secretKey",
              { expiresIn: "1h" },
              (err, token) => {
                res.status(200).json({
                  token: token, access: true, nickname: user.nickname
                });
              }
            );
          } else {
            res
              .json({ message: "El usuario y/o contraseña son incorrectos", access: false });
          }
        } else {
          res
            .json({ message: "El usuario y/o contraseña son incorrectos", access: false });
        }
      }
    }
  });
}

function updateUser(req, res) {
  jwt.verify(req.token, "secretKey", (error, authData) => {
    if (error) {
      res.json({ message: error });
    } else {
      var nick = req.params.nick;
      var user = req.body;
      if (user.location) {
        user.location = mongoose.Types.ObjectId(user.location)
      }
      User.findOneAndUpdate({ nickname: nick }, user, { new: true }, function (err, expert) {
        if (err) {
          res.send(err);
        } else {
          res.json({ message: "Usuario actualizado" });
        }
      }
      );
    }
  });
}

function validToken(req, res) {
  jwt.verify(req.token, "secretKey", (error, authData) => {
    if (error) {
      res.json({ message: error, isValid: false });
    } else {
      res.json({ isValid: true })
    }
  });
}




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

function deleteUser(req, res) {
  var id = req.params.id;
  User.findByIdAndRemove(id, function (err, expert) {
    if (err) {
      return res.json(500, {
        message: "No hemos encontrado el experto",
      });
    }
    return res.json(expert);
  });
}

function buscarExperts(req, res) {
  jwt.verify(req.token, "secretKey", (error, authData) => {
    if (error) {
      res.json({ message: error });
    } else {

      var idLocation = req.params.location;
      console.log(idLocation)
      if (!idLocation) {
        var result = User.find({});
      } else {
        var result = User.find({ location: mongoose.Types.ObjectId(idLocation) });
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
  });
}

function getUserByNick(req, res) {
  jwt.verify(req.token, "secretKey", (error, authData) => {
    if (error) {
      res.json({ message: error });
    } else {

      var nick = req.params.nick;
      var result = User.findOne({ nickname: nick });

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
  });
}


module.exports = {
  prueba,
  saveUser,
  login,
  buscarData,
  listarAllData,
  updateUser,
  deleteUser,
  validToken,
  buscarExperts,
  getUserByNick
};
