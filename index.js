var express = require('express');
var bodyParser = require("body-parser")
let mongoose = require('mongoose');
let routeurMembre = require('./app/routers/MembresRouter');

var app = express();
var router = express.Router();
app.use(router);
app.use(bodyParser.json());
app.use('/api/membres', routeurMembre);

console.log("test");


//CONNEXION BDD
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/collegefrance", {userNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'erreur connexion bdd:'));
db.once('open', function(){
    console.log('Connecté');
});

//Root route
router.get('/', function(req, res){
    res.send("Salut");
});




// Lancement serveur REST
var port = 5000;
app.listen(port);
console.log('le serveur REST est lancé sur le port ' + port);