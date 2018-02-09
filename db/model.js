const mongoose = require('mongoose');

const Schema   = mongoose.Schema;
var url = "mongodb://localhost:27017/";

////// Star Schema Model USER //////
    
var userSchema =  Schema({
    nombre: String, 
    password: String
})


module.exports = mongoose.model('User'  , userSchema);