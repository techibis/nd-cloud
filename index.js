
const express = require('express');
const bodyParser = require('body-parser');
// const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

const database = require('./databaseConfig');
const getPersonData = require('./searchByName');
const getPhoneData = require('./searchByPhone');
const getEmailData = require('./searchByEmail');

// const apiKey = '8w41c2o31jhnuse1965ay4';
// const apiKey = 'px1e1vr118sjti2bu7c31q3';
// const account_sid='ACcd28b8837adf4d3ca0141ef5ad3fdec6';
// const auth_token='AUae5b345b940447be9d7cab5ebe33a7fa';
// const email_api = 'TuqyrVvTwvq2chF9NFWNOOMRqWeZ4ZlF';




app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {data: null, error: null});
})

app.post('/', function (req, res) {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  database.findNameInDatabase(firstName,lastName, function(response){
    if(response.length>0){
      console.log(response);
      database.searchedPerson(firstName,lastName,'','');
    }else{
      database.searchedPerson(firstName,lastName,'','');
      getPersonData.getDataByName(firstName,lastName,res);
    }
  });
})


app.get('/email', function (req, res) {
  res.render('searchByEmail', {emailData: null, error: null});
})

// app.post('/email', function (req, res) {
//   let email = req.body.email;
//   let api_key = 'ca414dccdf654cd4b742dc890ae64273';
//   let url = `https://api.ekata.com/4.1/email?api_key=${api_key}&email_address=${email}`;

//   request({url: url,json: true}, function (err, response, body) {
//     if(err){
//       res.render('searchByEmail', {emailData: null, error: 'Error, please try again'});
//     } else {
//       emailData = body;
//       emailData_str = JSON.stringify(emailData);

//       // database.insert_raw_json_phone(phoneData_str);
//       // getPhoneData.getDataByPhone(phoneData);

//       res.render('searchByEmail', {emailData: emailData_str, error: null});
//     }
//   });
// })


app.post('/email', function (req, res) {
  let email = req.body.email;
  database.findEmailInDatabase(email, function(response){
    if(response.length>0){
      console.log(response);
      database.searchedPerson('','',email,'');
    }else{
      database.searchedPerson('','',email,'');
      getEmailData.getDataByEmail(email,res);
    }
  });
})

app.get('/phone', function (req, res) {
  res.render('searchByPhone', {phoneData: null, error: null});
})

app.post('/phone', function (req, res) {
  let phoneNumber = req.body.phoneNumber;
  database.findPhoneInDatabase(phone, function(response){
    if(response.length>0){
      console.log(response);
      database.searchedPerson('','','',phone);
    }else{
      database.searchedPerson('','','',phone);
      getPhoneData.getDataByPhone(phoneNumber,res);
    }
  });
})


app.listen(port, function () {
  console.log('Net Detective app listening on port 3000!')
})
