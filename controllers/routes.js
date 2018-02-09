const   Item        = require('../db/modelItem');
const   User        = require('../db/model');
var     jwt         = require('jsonwebtoken');
const   express     = require ('express');
const   app         = express();
var     config      = require('../config');

////////////////GET ALL ///////////////

function getItem(req , res){

  Item.find({}, function(err, result) {
    if (err) throw err;
    res.send(result)
    
  });

}

////////////////GET BY ID ///////////////

function getItemById (req , res){
    
    let producId = req.params.itemId;

    Item.findById(producId , (err , item) =>{

      if(err || !item){res.send({msn:'Error al Realizar la consulta'})}
      else{
        res.send({item});
      }
  
    })

}


////////////////POST /// ///////////////
    
function saveItem(req , res){

    let item = new Item ();
    
    item.titulo    = req.body.titulo;
    item.autor     = req.body.autor;
    item.cuerpo    = req.body.cuerpo;
  
    item.save((err,item)=> {
        if(err){res.send(err)
        } else{
          res.send({ mensaje :"Se ha agregado correctamente"});  
        }        
    })

}



//////////////// PUT  ///////////////

function updateItems (req , res){
    
    let producId = req.params.itemId;
    let update = req.body;

    Item.findByIdAndUpdate(producId , update , (err , itemUpdate) =>{
      if(err || !itemUpdate){
        res.send({msn:'Error al Realizar la Actualización'})
      }
        else{
          res.send({msn :"Se ha actualizado correctamente"})
        }
      })

}


////////////////DELETE ///////////////

function deleteItem(req , res){

    let producId = req.params.itemId;

    
    Item.findById(producId , (err , item) =>{
    if(err || !item){
      res.send({msn:'Error al Realizar la consulta'})
    }
      else{
        item.remove(err => {
          if(err){res.send({msn : "Ha ocurrido un error al borrar"})}
          else{
            res.send({msn:"Se ha Elimando Correctamente"})
          }
        })
      }
    })

}


//////////////// POST USERT  ///////////////

function crearUsuario (req , res){

    let user = new User ();
    
    user.nombre    = req.body.nombre;
    user.password = req.body.password;

    user.save((err,item)=> {
        if(err){res.send(err)
        } else{
          res.send({ mensaje :"Usuario Creado Correctamente"});  
        }        
    })

}


//////////////////  AUTORIZACION ///////////////////

function auth (req, res){
   
  User.findOne({
    nombre: req.body.nombre
  }, function(err, user) {

    if (err) throw err;

    if (!user || undefined) {
      res.json({ success: false, message: 'noUser' });
      //console.log("El usuario no existe");
    } else if (user) {

      if (user.password != req.body.password) {
        res.json({ success: false, message: 'noPass' });
        //console.log("Has Ingresado mal la Contraseña");
      } else {

        let payload = ({
           user : user  
        })

        var token = jwt.sign(payload, config.secret, {
          expiresIn : 60*60*24
        });

        res.json({
          success: true,
          message: 'Token Generado Correctamente , Gracias !',
          token: token
        });
      }   

    }

  });


}




module.exports = {

  getItem,
  getItemById,
  saveItem,
  updateItems,
  deleteItem,
  crearUsuario,
  auth

}