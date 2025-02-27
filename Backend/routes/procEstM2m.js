var express = require('express');
var router = express.Router();
let procEstM2mController = require('../controllers/procEstM2mController.js');

// aquí las rutas
/* GET home page. */
router.get('/', procEstM2mController.index);
router.get('/procEstJson', procEstM2mController.indexo);
router.get('/proc/:proc', procEstM2mController.show);
router.get('/procesoNuevo', procEstM2mController.create);
router.post('/create', procEstM2mController.store);
router.get('/results', procEstM2mController.search);
//router.post('/update', procEstM2mController.update2); */



module.exports = router;