var express = require('express');
var router = express.Router();
let procesosController = require('../controllers/procesosController');

// aquí las rutas
/* GET home page. */
router.get('/', procesosController.index);
router.get('/procesosajson', procesosController.indexoa);
router.get('/procesosbjson', procesosController.indexob);
router.get('/procesosjsonCAP', procesosController.indexoCAP);
router.get('/id/:id', procesosController.show);
router.get('/procesoNuevo', procesosController.create);
router.post('/create', procesosController.store);
router.get('/results', procesosController.search);
router.post('/update2', procesosController.update2);
router.post('/archivar', procesosController.archivar);


module.exports = router;