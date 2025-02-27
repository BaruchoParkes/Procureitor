var express = require('express');
var router = express.Router();
let resumenesController = require('../controllers/resumenesController');

// aquí las rutas
/* GET home page. */
router.get('/', resumenesController.index);
router.get('/id/:id', resumenesController.show);
router.get('/resumenNuevo', resumenesController.create);
router.post('/update', resumenesController.update);
router.get('/results', resumenesController.search);


module.exports = router;