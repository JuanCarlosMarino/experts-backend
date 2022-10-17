// Forma para importar variables o funciones, cuando lo que se exporta es un objeto
const dbE = require("./src/db/crudExperts.js");

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

// Traer todos los expertos
app.get("/experts", function (req, res) {
  dbE.getExperts(function (arrayExperts) {
    res.json(arrayExperts);
  });
});

// Traer un experto específico
app.get("/experts/:id", function (req, res) {
  const uid = req.params.id;
  dbE.getExpert(uid, function (refDoc) {
    res.json(refDoc);
  });
});

// Traer un experto por ubicacion
app.get("/experts/search/:location", function (req, res) {
  const location = req.params.location;
  dbE.searchExpert(location, function (refDoc) {
    res.json(refDoc);
  });
});

// Crear un experto en la DB
app.post("/experts", function (req, res) {
  const expert = req.body;
  console.log(req.params);
  dbE.addExpert(expert, function (status) {
    if (status === "Success") {
      res.status(201).json(status);
    } else {
      res.status(503).json(status);
    }
  });
});

app.post("/experts/:id", function (req, res) {
  const uid = req.params.id;
  const expert = req.body;
  expert.id = uid;
  dbE.addExpertWithID(uid, expert, function (status) {
    res.json(status);
  });
});

// Actualizar totalmente un experto en la DB
app.put("/experts/:id", function (req, res) {
  const uid = req.params.id;
  const expert = req.body;

  dbE.updateExpertTotally(uid, expert, function (status) {
    res.json(status);
  });
});

// Actualizar parcialmente un experto en la DB
app.patch("/experts/:id", function (req, res) {
  const uid = req.params.id;
  const expert = req.body;

  dbE.updateExpertPartially(uid, expert, function (status) {
    res.json(status);
  });
});

// Borrar experto de la base de datos
app.delete("/experts/:id", function (req, res) {
  const uid = req.params.id;
  dbE.deleteExpert(uid, function (status) {
    res.json(status);
  });
});

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
