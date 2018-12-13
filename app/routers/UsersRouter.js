var express = require('express');
var router = express.Router();
var userController = require('../controllers/UserController');

router.get('/', function (req, res, next) {
    userController.getAllUsers(req, res);
});

router.post('/', function (req, res, next) {
    userController.addUser(req, res);
});

module.exports = router;