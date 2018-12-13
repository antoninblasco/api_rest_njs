let mongoose = require('mongoose');


let Schema = mongoose.Schema;
let schemaUser = new Schema({
    name:{type:String , required:true},
    password:{type: String, required: true},
    mail:{type: String, required: true, unique:true},
    admin:{type: Boolean, defaultValue: false}
});

let User = mongoose.model('users', schemaUser);

module.exports = User;