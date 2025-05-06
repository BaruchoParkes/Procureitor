var express = require('express');
var router = express.Router();
let cobrosController = require('../controllers/cobrosController');

router.get('/', cobrosController.index);
router.get('/id/:id', cobrosController.show);
router.get('/create', cobrosController.create);
router.post('/store', cobrosController.store);
router.get('/results', cobrosController.search);
router.put('/update/:id', cobrosController.update);
router.get('/usuario/:usuario', cobrosController.usuario);
router.get('/pendientes/usuario/:usuario', cobrosController.pendientesUsuario);

module.exports = router;