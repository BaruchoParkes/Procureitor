var express = require('express');
var router = express.Router();
let tMtosController = require('../controllers/tMtosController');

// aquí las rutas
/* GET home page. */
router.get('/', tMtosController.index);
// para recibir solo el id del tipo de mto y el titulo
router.get('/id/:id', tMtosController.show);
router.get('/tMtoNuevo', tMtosController.create);
router.post('/create', tMtosController.store);
router.get('/results', tMtosController.search);



module.exports = router;