var express = require('express');
var router = express.Router();
let tEstadosController = require('../controllers/tEstadosController');

// aquí las rutas
/* GET home page. */
router.get('/', tEstadosController.index);
router.get('/id/:id', tEstadosController.show);
router.get('/tMtoNuevo', tEstadosController.create);
router.post('/create', tEstadosController.store);
router.get('/results', tEstadosController.search);



module.exports = router;