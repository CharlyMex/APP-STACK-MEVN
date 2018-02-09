const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
    
////// DECLARACION MODELO DE LA DB DE ITEMS //////

var itemSchema =  Schema({
    titulo : String,
    autor  : String,
    cuerpo : String
})


module.exports = mongoose.model('Item' , itemSchema);