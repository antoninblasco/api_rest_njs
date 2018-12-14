var User = require('../models/UserModel');
var mongoose = require('mongoose');
var jwt = require("jsonwebtoken");

let UserController = {
    addUser: function(req,res){
        var user = new User(req.body);
        user.validate()
            .then( () => {
                console.log("valide");
                return user.save() // Ajout
            } )
            .then( () => res.json({status: true, message : "user ajouté" }) )
            .catch( (err) => console.error(err.message) )
    },
    getUsersOrToken: function(req, res){
        if(req.query.size < 1){
            User.find({})
                .then( (users) => res.json({status: true, users: users}) )
                .catch( (err) => res.json({status:false, message:err.message}));
        }
        else{
            console.log(req.query.nom + " " + req.query.password);
            if(req.query.nom && req.query.password){
                User.findOne({name: req.query.nom})
                    .then( (user) => {
                        if(user){
                            if(user.password === req.query.password){
                                var token = jwt.sign(
                                    { nom : user.name, password: user.password, admin: user.admin },
                                    'maclesecrete',
                                    {expiresIn: '1h'}
                                );
                                res.json({status:true, token : token});
                            }
                            else{
                                res.json({status:false, message : "Mot de passe erroné"});
                            }
                        }
                        else{
                            res.json({status:false, message : "user inexistant"});
                        }})
                    .catch( (err) => res.json({status:false, message:err.message}) );
            }
            else{
                res.json({status:false, message: "name et/ou password absents"});
            }
        }
    },
    verifJeton: function(req,res){
        if(req.params.token){
            var verif = jwt.verify(req.params.token, 'maclesecrete',
                function(err,payload){
                    if(err){
                        res.json({status: false, message: 'token incorrect ' + err.message});
                    }
                    else{
                        res.json({status: true, user : payload});
                    }
                });
        }
        else{
            res.json({status: false, message: 'token manquant'});
        }
    }
};

module.exports = UserController;