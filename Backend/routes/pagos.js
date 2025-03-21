var express = require('express');
var router = express.Router();
let pagosController = require('../controllers/pagosController');

// aquí las rutas
/* GET home page. */
router.get('/', pagosController.index);
router.get('/id/:id', pagosController.show);
router.post('/store',  pagosController.store);
router.post('/update',  pagosController.update);


module.exports = router;