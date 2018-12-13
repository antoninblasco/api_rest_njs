var express = require('express');
var router = express.Router();
var membreController = require('../controllers/MembreController');

router.get('/', function (req, res, next) {
    membreController.getAllMembres(req, res);
});

router.get('/:id', function (req, res, next) {
    membreController.getMembre(req, res);
});

router.post('/', function (req, res, next) {
   membreController.newMembre(req, res);
});

router.put('/', function (req, res, next) {
    membreController.updateMembre(req, res);
});

router.delete('/:id', function (req, res, next) {
    membreController.deleteMembre(req, res);
});

module.exports = router;