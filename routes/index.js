const express = require('express');
const router = express.Router();
const MongoUtils = require("./config/mongoUtils");
const mongo = new MongoUtils();

// Probando creación de una colección.

let firstName = "Anthony",
  lastName = "Carrillo",
  ci = "30659229",
  phone = "04124662193",
  email = "anthonyzok521@gmail.com",
  season = 6;

let document = [firstName, lastName, ci, phone, email, season];

/* (async() => {
    let insert = await mongo.insert(firstName, lastName, password, ci, phone, email, status);
    console.log("Se ha registrado con éxito: " + document);
})(); */

/* GET home page. */
router.get('/', (req, res)=>{
  res.render('index', { title: 'AC Courses - Inscripción' });
});

router.get('/signin', (req, res)=>{
  res.render('signin.ejs');
});

router.post('/', (req, res)=>{
  // Obteniendo IP del usuario a través del servidor, Fecha y Hora
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  let dt = new Date();
  let time = ""

  //Formateando la Hora
  if(dt.getHours() >= 12){
    time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + " PM";
  }
  else{
    time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + " AM";
  }
  let _date = dt.toLocaleString();
  let date = "";

  //Formateando la Fecha
  for(let d = 0; d <= 9; d++){
      if(_date[d] == '/'){
        date += '-';
        continue;
      }
      else if(_date[d] == ','){
        continue;
      }
      date += _date[d];
  }

  //Formateando la IP
  if(ip){
    let ip_ls = ip.split(',');
    ip = ip_ls[ip_ls.length - 1];
  }
  else{
    console.log('IP adress not found');
  }

  // Reciviendo datos del usuario
  let data_user = [req.body.username, req.body.email, req.body.password, req.body.description, date, time, ip]; //Array
});

router.post('/home', (req, res)=>{
  
}); 

router.get('/home', (req, res)=>{
 
});

module.exports = router;