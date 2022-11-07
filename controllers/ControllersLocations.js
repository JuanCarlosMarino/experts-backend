var User = require("../models/User");
var Location = require("../models/Location")
var bcrypt = require("bcrypt-nodejs");
const jwt = require("jsonwebtoken");

function listarAllLocations(req, res) {
    var locations = req.params.name
    if (!locations) {
        var result = Location.find({}).sort("name");
    } else {
        var result = Location.find({ _id: locations }).sort("name");
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
    listarAllLocations
};