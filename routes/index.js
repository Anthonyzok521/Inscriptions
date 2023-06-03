const express = require('express');
const router = express.Router();
const MongoUtils = require("./config/mongoUtils");
const mongo = new MongoUtils();

/* GET home page. */
router.get('/', (req, res)=>{
  res.render('index', { title: 'AC Courses - Inscripción' });
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
  let data_user = [req.body.firstame, req.body.lastname, req.body.ci, req.body.phone, req.body.email, req.body.student, req.body.season, ip]; //Array

  (async() => {
    let insert = await mongo.insert(req.body.firstame, req.body.lastname, req.body.ci, req.body.phone, req.body.email, req.body.student, req.body.season);
    console.log("Hubo una inscription: " + data_user);
  })();

  res.render('agradecimientos');

});

module.exports = router;