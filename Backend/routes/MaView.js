var express = require('express');
var router = express.Router();
let MaViewController = require('../controllers/MaViewController');

// aquí las rutas
/* GET home page. */
router.get('/', MaViewController.index);
router.get('/id/:id', MaViewController.show);
router.get('/procesoNuevo', MaViewController.create);
router.post('/create', MaViewController.store);
router.get('/results', MaViewController.search);
router.post('/updateRecord/:id', MaViewController.update);

module.exports = router;