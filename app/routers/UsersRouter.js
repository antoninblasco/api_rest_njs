var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');

router.get('/', function (req, res, next) {
   userController.getUsersOrToken(req, res);
});

router.post('/', function (req, res, next) {
    userController.addUser(req, res);
});

router.get('/verifjeton/:token', function (req, res, next){
    userController.verifJeton(req, res);
});
router.get('/verifjeton/', function (req, res, next){
    userController.verifJeton(req, res);
});

module.exports = router;