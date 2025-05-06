var express = require('express');
var router = express.Router();
let ojudsController = require('../controllers/ojudsController');

router.get('/', ojudsController.index);
router.get('/id/:id', ojudsController.show);
router.get('/create', ojudsController.create);
router.post('/store', ojudsController.store);
router.post('/update', ojudsController.update);

module.exports = router;