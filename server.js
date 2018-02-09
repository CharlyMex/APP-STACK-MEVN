
/////////////////////IMPORTS /////////////////////////
const    express    = require('express');
const    app        = express();
const    mongoose   = require('mongoose');
const    bodyParser = require('body-parser');
const    itemtCtrl  = require('./controllers/routes');
const    path       = require('path');
const    cors       = require('cors');


var      config      = require('./config');
var      jwt         = require('jsonwebtoken');

////////////////////// CONECCION DB  ///////////////////
mongoose.connect('mongodb://localhost:27017/test' , (err , res) =>{
  if(err) throw err
      console.log("Base de datos Conectada !");
  } )
/////////////////////PARSEO JSON /////////////////////

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


/////////////////// CORS /////////////////////////

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/////////////////////// END POINTS ////////////////////

app.get   ( '/api/item',         itemtCtrl.getItem);
app.get   ( '/api/item/:itemId', itemtCtrl.getItemById);
app.post  ( '/api/addItem',         itemtCtrl.saveItem);
app.put   ( '/api/item/:itemId', itemtCtrl.updateItems);
app.delete( '/api/deleteItem/:itemId', itemtCtrl.deleteItem);


/////////////////// ESTADO DEL SERVER Y DECLARACION DE PUERTO ///////////////////////

app.set('port' , process.env.PORT || 4000);
app.listen(app.get('port') , () => {
    console.log('Servidor en linea en el puerto :  ' + app.get('port'));
});

/////////////////// ARCHIVOS ESTATICOS  ////////////////////////

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

/////////////////// TOKEN /////////////////////////

app.post('/crearusuario' , itemtCtrl.crearUsuario);
app.post('/login' , itemtCtrl.auth);


app.use(function(req, res, next) {
    console.log('FUNCION TOKEN')
    console.log(req.body);

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, config.secret, function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Este token no es valido o a expirado.' });    
        } else {
     
          req.decoded = decoded;    
          next();
        }
      });
  
    } else {

      return res.status(403).send({ 
          success: false, 
          message: 'Lo lamento , no has generado token aún.' 
      });
  
    }
  });
  
