var express = require('express');
var router = express.Router();
let mtosController = require('../controllers/mtosController');

// aquí las rutas
/* GET home page. */
router.get('/', mtosController.index);
router.get('/mtosjson', mtosController.indexo);
router.get('/pendientes', mtosController.pendientes);
router.get('/proc/:proc', mtosController.indexe);
router.get('/id/:id', mtosController.show);
router.get('/create', mtosController.create);
router.post('/store', mtosController.store);
router.get('/results', mtosController.search);
router.post('/update', mtosController.update);
router.post('/update2', mtosController.update2);
router.post('/cargajson', mtosController.cargaJson);
router.get('/cargajson2', mtosController.cargaJson);
router.get('/byDate', mtosController.byDate);


module.exports = router;