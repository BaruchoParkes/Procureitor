var express = require('express');
var router = express.Router();
let pagosController = require('../controllers/pagosController');

// aquí las rutas
/* GET home page. */
router.get('/', pagosController.index);
router.get('/100', pagosController.index100);
router.get('/id/:id', pagosController.show);
router.get('/create',  pagosController.create);
router.post('/store',  pagosController.store);
router.get('/results',  pagosController.search);
router.post('/update',  pagosController.update);


module.exports = router;