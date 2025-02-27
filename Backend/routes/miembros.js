var express = require('express');
var router = express.Router();
let miembrosController = require('../controllers/miembrosController');

// aquí las rutas
/* GET home page. */
router.get('/', miembrosController.index);
router.get('/miembrosjson', miembrosController.indexo);
router.get('/id/:id', miembrosController.show);
router.get('/procesoNuevo', miembrosController.create);
router.post('/create', miembrosController.store);
router.get('/results', miembrosController.search);


module.exports = router;