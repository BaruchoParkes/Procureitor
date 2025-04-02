var express = require('express');
var router = express.Router();
let cajaController = require('../controllers/cajaController');

// aquí las rutas
/* GET home page. */
router.get('/', cajaController.index);
router.get('/cash', cajaController.cash);
router.get('/cap', cajaController.cap);
router.get('/geo', cajaController.geo);
router.get('/is', cajaController.is);
router.get('/isv', cajaController.isv);
router.get('/la', cajaController.la);
router.get('/sag', cajaController.sag);
router.get('/mvp', cajaController.mvp);
router.get('/zcc', cajaController.zcc);
router.get('/sucesion', cajaController.sucesion);


router.get('/cajajson', cajaController.cajajson);
router.get('/id/:id', cajaController.show);
router.get('/create', cajaController.create);
router.post('/store', cajaController.store);
router.get('/results', cajaController.search);
router.post('/update', cajaController.update);
router.get('/usuario/:usuario', cajaController.usuario);

module.exports = router;