var Membre = require('../models/MembreModel');
var mongoose = require('mongoose');

let MembreController = {
    getAllMembres : function(req, res){
        Membre.find({})
            .then( (membres) => res.json({status: true, membres: membres}) )
            .catch( (err) => res.json({status:false, message:err.message}));
    },
    getMembre : function(req, res) {
        Membre.findOne({id: req.params.id})
            .then( (membre) => {
                if(membre){
                    res.json({status:true, membre : membre});
                }
                else{
                    res.json({status:false, message : "membre inexistant"});
                }})
            .catch( (err) => res.json({status:false, message:err.message}) );
    },
    newMembre : function (req,res) {
        var membre = new Membre(req.body);
        membre.validate()
            .then( () => {
                console.log("valide");
                return membre.save() // Ajout
            } )
            .then( () => res.json({status: true, message : "membre ajouté" }) )
            .catch( (err) => console.error(err.message) )
    },
    updateMembre : function (req, res) {
        var opts = { runValidators: true };
            Membre.findOneAndUpdate({id: req.body.id}, req.body, opts)
                .then((membre) => {
                    if (membre) {
                        res.json({status: true, message: "membre modifié : "});
                    }
                    else {
                        res.json({status: false, message: "membre inexistant"});
                    }
                })
                .catch((err) => res.json({status: false, message : "Erreur de validation : " + err }));


    }
};

module.exports = MembreController;