const db = require("./firebase.js");

// Obtener todos los expertos
function getExperts(callback) {
  return db
    .collection("experts")
    .get()
    .then((docs) => {
      var arrayExperts = [];
      docs.forEach((expert) => {
        const obj = expert.data();
        obj.uid = expert.id;
        arrayExperts.push(obj);
      });
      // CUANDO LLEGAMOS ACÁ, SE DEBE ENVIAR LA RESPUESTA AL GET REQUEST
      callback(arrayExperts);
    })
    .catch((error) => {
      callback(`Error to get users ${error}`);
    });
}

// Obtener un experto específico
function getExpert(uid, callback) {
  return db
    .collection("experts")
    .doc(uid)
    .get()
    .then((refDoc) => {
      callback(refDoc.data());
    })
    .catch((error) => {
      callback(`Error to get users ${error}`);
    });
}

// Crear un experto
function addExpert(expert, callback) {
  return db
    .collection("experts")
    .add(expert)
    .then(() => {
      callback("Success");
    })
    .catch((error) => {
      callback(`Error to get users ${error}`);
    });
}

function addExpertWithID(uid, expert, callback) {
  return db
    .collection("experts")
    .doc(uid)
    .set(expert)
    .then(() => {
      callback("Success");
    })
    .catch((error) => {
      callback(`Error to get users ${error}`);
    });
}

function updateExpertTotally(uid, expert, callback) {
  return db
    .collection("experts")
    .doc(uid)
    .set(expert)
    .then(() => {
      callback("Success");
    })
    .catch((error) => {
      callback(`Error to get users ${error}`);
    });
}

function updateExpertPartially(uid, expert, callback) {
  return db
    .collection("experts")
    .doc(uid)
    .update(expert)
    .then(() => {
      callback("Success");
    })
    .catch((error) => {
      callback(`Error to get users ${error}`);
    });
}

function deleteExpert(uid, callback) {
  return db
    .collection("experts")
    .doc(uid)
    .delete()
    .then(() => {
      callback("Success");
    })
    .catch((error) => {
      callback(`Error to get users ${error}`);
    });
}

function searchExpert(location, callback) {
  return db
    .collection("experts")
    .where("location", "==", location)
    .get()
    .then((refDoc) => {
      var arrayExperts = [];
      refDoc.forEach((doc) => {
        //doc.id --> El id del documento
        arrayExperts.push(doc.data());
      });
      callback(arrayExperts);
    })
    .catch((err) => {
      callback("Error to search expert ", err);
    });
}

module.exports = {
  getExperts,
  getExpert,
  addExpert,
  updateExpertPartially,
  updateExpertTotally,
  deleteExpert,
  searchExpert,
  addExpertWithID
};

// PARA PROBAR LOS METODOS
// correr node crudExperts.js

/*
// Obtener un doc, pasando un id
getExpert("aqui-va-id",(result) =>{
    console.log(result);
})

// Crear un nuevo documento
const expert = {
    "name": "Ciro",
    "location": "Bucaramanga, Colombia",
    "occupation": "Programador"
}

addExpert(expert, (status)=>{
    console.log(status);
})


const expert = {
    "location" : "Cartagena",
    "occupation": "Artista"
}

// Actualizar totalmente un documento
updateExpertTotally("Ellz8i4XbcwwlDhujAdO", expert, function(status){
    console.log(status);
})

// Actualizar parcialmente un documento
updateExpertPartially("Ellz8i4XbcwwlDhujAdO", expert, function(status){
    console.log(status);
})

// Borrar documento usando el id
deleteExpert("kH9pnrlHoFCuruwDv9a5", (status) =>{
    console.log(status);
})
*/
