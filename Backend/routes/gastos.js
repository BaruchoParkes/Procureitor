var express = require('express');
var router = express.Router();
let gastosController = require('../controllers/gastosController');

// aquí las rutas
/* GET home page. */
router.get('/', gastosController.index);
router.get('/id/:id', gastosController.show);
router.get('/usuarios', gastosController.usuarios);



module.exports = router;