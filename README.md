# demoApp
Aplicacion Demo STACK MEVN
La siguiente aplicación está hecha con el stack :
Mongodb
Vue.js
Express.js
Node.js
Sistema CURL .

TUTORIAL PARA EJECUTAR :

https://www.youtube.com/watch?v=3ak8X6sj_GY&feature=youtu.be

Instalación:

Paso 1:
Descomprimir el paquete

cd mevnApp

npm install

Paso 2 :
Deberá crear una base de datos en mongodb llamada test.

Paso 3 :
Deberá crear una colección en mongodb dentro de la base de datos llamada test con el modelo:

{
 nombre : String,
 password : String
}

E insertar un usuario y password,  en esta colección para que permita dar acceso a la creación de ítems.

Paso 4 :
En una terminal ejecutar (se ejecutara en el puerto 3000):

npm start

Paso 5 : 
En otra terminar ejecutar node.js (se ejecutara en el puerto 4000):

node server.js

Paso 6 :
Entrar en :
http://localhost:3000/

Listo :)







