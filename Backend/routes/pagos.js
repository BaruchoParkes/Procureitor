var express = require('express');
var router = express.Router();
let pagosController = require('../controllers/pagosController');
const authMiddleware = require('../middleware/auth');
const multer = require("multer");
const upload = multer(); // Use multer to handle file uploads


router.get('/', pagosController.index);
router.get('/id/:id', pagosController.show);
router.post('/store', pagosController.store);
router.put('/update/:id',  pagosController.update);
router.put('/update2/:id', pagosController.update2);
router.get('/usuario/:usuario', pagosController.usuario);

module.exports = router;