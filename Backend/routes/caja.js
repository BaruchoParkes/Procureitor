var express = require('express');
var router = express.Router();
let cajaController = require('../controllers/cajaController');

// aquí las rutas
/* GET home page. */
router.get('/', cajaController.index);
router.get('/cajajson', cajaController.cajajson);
router.get('/id/:id', cajaController.show);
router.get('/create', cajaController.create);
router.post('/store', cajaController.store);
router.get('/results', cajaController.search);
router.post('/update', cajaController.update);

module.exports = router;