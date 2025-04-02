var express = require('express');
var router = express.Router();
let pagosController = require('../controllers/pagosController');
const authMiddleware = require('../middleware/auth');


// aquí las rutas
/* GET home page. */
router.get('/', pagosController.index);
router.get('/id/:id', pagosController.show);
router.post('/store', pagosController.store);
router.post('/update',  pagosController.update);
router.get('/usuario/:usuario', pagosController.usuario);



module.exports = router;