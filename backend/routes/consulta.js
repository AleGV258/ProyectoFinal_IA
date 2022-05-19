var express = require('express');
var router = express.Router();
var database = require("../database/database.js");



router.get('/', function (req, res, next) {
    // Pagina de inicio
    res.json({ titulo: 'Pagina de inicio' })
});

router.get('/Diagnostico-General', function (req, res, next) {
    // Enviar formulario
});
router.get('/Diagnostico-Especifico', function (req, res, next) {
    // Enviar formulario
});

router.get('/Resultados', function (req, res, next) {

    //Matriz Enfermedades x sintomas
    var matriz = [];
    //iniciar conexion
    db = database.conectar();
    //realizar consulta
    db.query("SELECT * FROM Enfermedades;",
        function (err, rows, fields) {
            if (err) {
                console.log(err)
            } else {
                for (var i = 0; i < rows.length; i++) {
                    
                    matriz.push([rows[i].manchasMarrones, rows[i].manchasBlancas, rows[i].manchasRojas, rows[i].descamacionDeLaPiel, rows[i].SangradoDeLaPiel, rows[i].Picazon, rows[i].Lunares, rows[i].ampollas, rows[i].hongos, rows[i].sudoracion, rows[i].inflamacionDeLaPiel, rows[i].pielSeca, rows[i].pielGangena, rows[i].granosConSebo, rows[i].ronchas]);
                    
                }
                console.log(matriz)
                // for(row in rows) {
                //     //nombre, manchasMarrones, manchasBlancas, manchasRojas, descamacionDeLaPiel, SangradoDeLaPiel, Picazon, Lunares, ampollas, hongos, sudoracion, inflamacionDeLaPiel, pielSeca, pielGangena, granosConSebo, ronchas, descripcion, origen
                //     //row.nombre;
                //     console.log( row.nombre)
                // }
            }
        })
    //Terminar conexion
    db.end(function (err) { err ? console.log(err) : console.log('Conexión terminada.'); });








    //procesar las respuestas

    //obtener datos de la enfermedadad con la que coincide

    var nombreEnfermedad = 'Cloasma / Melasma';
    //iniciar conexion
    db = database.conectar();
    //realizar consulta
    db.query("SELECT * FROM Enfermedades WHERE nombre = ?;", [nombreEnfermedad],
        function (err, results, fields) {
            if (err) {
                console.log(err)
            } else {

                //Obtener recomendaciones de la enfermedad
                db = database.conectar();
                //realizar consulta
                db.query("SELECT * FROM Recomendaciones WHERE idEnfermedad = ?;", [results[0].idEnfermedad],
                    function (err, results2, fields) {
                        if (err) {
                            console.log(err)
                        } else {
                            res.status(200);
                            res.json({ "Enfermedad": results[0], "Recomendaciones": results2 });
                        }
                    })
                //Terminar conexion
                db.end(function (err) { err ? console.log(err) : console.log('Conexión terminada.'); });

            }
        })
    //Terminar conexion
    db.end(function (err) { err ? console.log(err) : console.log('Conexión terminada.'); });


});

module.exports = router;






