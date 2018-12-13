let mongoose = require('mongoose');


let Schema = mongoose.Schema;
let schemaMembre = new Schema({
    id: {type: Number, required: true, unique: true},
    annee: {type: Number, required: true},
    nom: {type: String, required: true, uppercase: true},
    prenom: {type: String, required: true, uppercase: true},
    categorie: {type: String, enum:["junior","senior","cadet"]},
    sexe: {type: String, enum:["Hommes","Femmes"]},
    cnu: {type: String},
    discipline: {type: String},
    corps: {type: String},
    academie: {
        code_academie : {type: Number, required: true},
        nom : {type: String, required: true}
    },
    region: {
        code_region : {type: Number},
        nom : {type: String}
    },
    etablissement : String
});

let Membre = mongoose.model('membres', schemaMembre);

module.exports = Membre;
