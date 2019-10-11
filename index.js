
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const parser = require('xml2json');
const app = express();
const port = process.env.PORT || 3000;

const database = require('./databaseConfig');
const getPersonData = require('./searchByName');
const getPhoneData = require('./searchByPhone');

// const apiKey = '8w41c2o31jhnuse1965ay4';
const apiKey = 'px1e1vr118sjti2bu7c31q3';
const account_sid='ACcd28b8837adf4d3ca0141ef5ad3fdec6';
const auth_token='AUae5b345b940447be9d7cab5ebe33a7fa';

let jsonData;
let data;
let phoneData;




app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {data: null, error: null});
})

app.post('/', function (req, res) {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let url = `https://completecriminalchecks.com/api/xml/?firstname=${firstName}&lastname=${lastName}&apikey=${apiKey}`;

  request({url: url,json: true}, function (err, response, body) {
    if(err){
      res.render('index', {data: null, error: 'Error, please try again'});
    } else {
      jsonData = parser.toJson(body);
      data = JSON.parse(jsonData);

     database.insert_raw_json_name(jsonData);
     getPersonData.getDataByName(data);

     res.render('index', {data: jsonData, error: null});
    }
  });
})


app.get('/phone', function (req, res) {
  res.render('searchByPhone', {phoneData: null, error: null});
})

app.post('/phone', function (req, res) {
  let phoneNumber = req.body.phoneNumber;
  let url = `https://api.everyoneapi.com/v1/phone/${phoneNumber}?account_sid=${account_sid}&auth_token=${auth_token}&data=name,address,location,cnam,gender,linetype,image,line_provider,profile`;
  // let url = `https://api.everyoneapi.com/v1/phone/${phoneNumber}?account_sid=${account_sid}&auth_token=${auth_token}&data=cnam`;

  request({url: url,json: true}, function (err, response, body) {
    if(err){
      res.render('searchByPhone', {phoneData: null, error: 'Error, please try again'});
    } else {
      phoneData = body;
      phoneData_str = JSON.stringify(phoneData);

      database.insert_raw_json_phone(phoneData_str);
      getPhoneData.getDataByPhone(phoneData);

      res.render('searchByPhone', {PhoneData: phoneData_str, error: null});
    }
  });
})


app.listen(port, function () {
  console.log('Net Detective app listening on port 3000!')
})

