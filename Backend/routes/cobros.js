var express = require('express');
var router = express.Router();
let cobrosController = require('../controllers/cobrosController');

// aquí las rutas
/* GET home page. */
router.get('/', cobrosController.index);
router.get('/id/:id', cobrosController.show);
router.get('/create', cobrosController.create);
router.post('/store', cobrosController.store);
router.get('/results', cobrosController.search);
router.post('/update', cobrosController.update);

module.exports = router;