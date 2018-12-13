var User = require('../models/UserModel');
var mongoose = require('mongoose');

let UserController = {
    getAllUsers: function(req,res){
        User.find({})
        .then( (users) => res.json({status: true, users: users}) )
        .catch( (err) => res.json({status:false, message:err.message}));
    },
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
    demandeJeton: function (req,res) {
        if(req.query.nom && req.query.password){
            User.findOne({name: req.params.name, password: req.params.password})
                .then( (user) => {
                    if(user){
                        res.json({status:true, membre : membre});
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
};

module.exports = UserController;