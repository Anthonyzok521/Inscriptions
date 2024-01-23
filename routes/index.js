const express = require('express');
const router = express.Router();
const MongoUtils = require("./config/mongoUtils");
const mongo = new MongoUtils();
const nodemailer = require('nodemailer');
require('dotenv').config();
let st_name = {};
let reference;
let pago_reference;
let pago = false;
let pago_otravez = false;
let sesion = false;
let open = true;


router.get('/', (req, res) => {
    res.render('pages/inscriptions', { title: 'AC Courses - Inscripción' , API_KEY:process.env.API_KEY, open:open});
});

router.get('/inscriptions', (req, res) => {
    res.render('pages/inscriptions', { title: 'AC Courses - Inscripción' , API_KEY:process.env.API_KEY, open:open});
});

router.post('/inscriptions', (req, res) => {
    // Obteniendo IP del usuario a través del servidor, Fecha y Hora
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    let dt = new Date();
    let time = ""

    //Formateando la Hora
    if (dt.getHours() >= 12) {
        time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + " PM";
    } else {
        time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + " AM";
    }
    let _date = dt.toLocaleString();
    let date = "";

    //Formateando la Fecha
    for (let d = 0; d <= 9; d++) {
        if (_date[d] == '/') {
            date += '-';
            continue;
        } else if (_date[d] == ',') {
            continue;
        }
        date += _date[d];
    }

    /* //Formateando la IP
    if (ip) {
        let ip_ls = ip.split(',');
        ip = ip_ls[ip_ls.length - 1];
    } else {
        console.log('IP adress not found');
    } */

    // Reciviendo datos del usuario
    let data_user = [req.body.firstname, req.body.lastname, req.body.ci, req.body.phone, req.body.email, req.body.student, req.body.season, req.body.ip, false]; //Array

    (async() => {
        let insert = await mongo.insert(req.body.firstname, req.body.lastname, req.body.ci, req.body.phone, req.body.email, req.body.student, req.body.season, req.body.ip, false);
        console.log("New Inscription: " + data_user);
    })();


    var message = {
        from: 'inscriptions@accourses.com',
        to: process.env.EMAIL_RECEPTION,
        subject: 'Nuevo inscrito',
        text: 'Nuevo inscrito',
        html: `<h1>Datos</h1>
    <ul>
    <li>Nombre: ${data_user[0]}</li>
    <li>Apellido: ${data_user[1]}</li>
    <li>CI: ${data_user[2]}</li>
    <li>Teléfono: ${data_user[3]}</li>
    <li>Email: ${data_user[4]}</li>
    <li>Estudiante: ${data_user[5]}</li>
    <li>Año/Semestre: ${data_user[6]}</li>
    <li>IP: ${data_user[7]}</li>
    <li>Origen: ${req.body.country}</li>
    <li>Hora y Fecha: ${time} ${date}</li>
    </ul>`
    };

    var transporter = nodemailer.createTransport({
        host: process.env.SMTP_URL.toString(),
        port: parseInt(process.env.SMTP_PORT),
        auth: {
            user: process.env.SMTP_USER.toString(),
            pass: process.env.SMTP_PASS.toString(),
        }
    });

    transporter.sendMail(message, (error, info) => {
        if (error) {
            console.log('Error in the sending: ' + error.message);
            console.log(error.message);
        } else {
            console.log('Email send');
        }
    });

    res.redirect("/thanks");

});


router.get('/thanks', (req, res) => {
    res.render('pages/thanks');
});

router.get('/pays', (req, res) => {
    res.render('pages/pays');
});


router.post('/pays', (req, res) => {
    sesion = true;
    (async() => {
        reference = req.body.reference;
        let find = await mongo.find(req.body.ci);
        st_name = find;

        if (st_name == null) {
            res.redirect('/payout');
        } else {

            let pagofind = await mongo.findPago(req.body.ci);
            console.log(pagofind)

            if (pagofind != null) {
                pago_otravez = true;
                pago_reference = pagofind.reference
                res.redirect('/payout');
            } else {

                setTimeout(() => {
                    console.log("Student Found: " + st_name.firstName);

                    pago = true;
                    res.redirect('/payout');
                }, 2000);
            }
        }
    })();
});


router.get('/payout', (req, res) => {
    if (sesion) {
        if (st_name == null) {
            res.render('pages/payout', { name_student: null });
        } else {

            let message;

            if (pago_otravez) {
                message = "Ya tenemos un pago de usted con refencia de #" + pago_reference;
            } else {
                message = "Ya el pago está hecho, nos vemos en el Curso :)";
                (async() => {
                    let insert = await mongo.insertPago(st_name.firstName, st_name.lastName, st_name.ci, reference, pago);
                    console.log("New pay: " + st_name.firstName + " " + reference);
                })();
                const filter = { firstName: st_name.firstName };

                // Definir los cambios que se realizarán en los documentos
                const update = { $set: { pay: pago } };
            
                // Actualizar un solo documento
                //const result = await mongo.updateDataPago(filter, update);
               // console.log(result);

                (async() => {
                    let updatepay = await mongo.updatePay(filter, update);
                    console.log(updatepay);
                })();
                var message1 = {
                    from: 'inscriptions@accourses.com',
                    to: process.env.EMAIL_RECEPTION,
                    subject: 'Nuevo pago',
                    text: 'Nuevo pago',
                    html: `<h1>Datos del pago</h1>
                    <ul>
                        <li>Nombre: ${st_name.firstName}</li>
                        <li>Apellido: ${st_name.lastName}</li>
                        <li>CI: ${st_name.ci}</li>
                        <li>Referencia: ${reference}</li>
                        <li>Monto: 6$</li>
                    </ul>`
                };
            
                var transporter = nodemailer.createTransport({
                    host: process.env.SMTP_URL.toString(),
                    port: parseInt(process.env.SMTP_PORT),
                    auth: {
                        user: process.env.SMTP_USER.toString(),
                        pass: process.env.SMTP_PASS.toString(),
                    }
                });
            
                transporter.sendMail(message1, (error, info) => {
                    if (error) {
                        console.log('Error in the sending: ' + error.message);
                        console.log(error.message);
                    } else {
                        console.log('Email send');
                    }
                });
            }
            
            res.render('pages/payout', { name_student: st_name.firstName, pagoO: message });
        }
        sesion = false;
    } else {
        res.redirect("/");
    }
});

module.exports = router;
