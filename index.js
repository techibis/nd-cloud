
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

class Resultrecord{
  constructor (name,age,state,locations,background,death,divorce,contact,dataId,database){
    this.name = name;
    this.age = age;
    this.state = state;
    this.locations = locations;
    this.background = background;
    this.death = death;
    this.divorce = divorce;
    this.contact = contact;
    this.dataId = dataId;
    this.database = database;
  }
}

let resultData = new Array();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

app.get('/', function (req, res) {
  res.render('index', {data: null, error: null});
})

app.post('/', function (req, res) {
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let dataId = '';

  database.findNameInDatabase(firstName,lastName, function(response){
    if(response.length>0){
      console.log(response);
    }else{
      database.searchedPerson(firstName,lastName,'','');
      getPersonData.getDataByName(firstName,lastName,res);
    }
  });
})


app.get('/email', function (req, res) {
  res.render('searchByEmail', {emailData: null, error: null});
})


app.post('/email', function (req, res) {
  let email = req.body.email;
  let emailData_firstName;
  let emailData_lastName;
  let dataId = '';
  database.findEmailInDatabase(email, function(response){
    if(response.length>0){
    }else{
      database.searchedPerson('','',email,'');
      getEmailData.getDataByEmail(email,res);
      // console.log(getEmailData.getDataByEmail(email,res));
    // }
    emailData_firstName = response[0].first_name;
    emailData_lastName = response[0].last_name;
    database.showSearchedPersonData(emailData_firstName,emailData_lastName, function(result){

      for (let i=0;i<result.length;i++){
        if(i>0){
          dataId += ','; 
        }
        dataId += result[i].id;
      }
      database.showPersonsTeasure(dataId, function(result){
        for (let i=0;i<result.length;i++){
          resultData.push(new Resultrecord(
            result[i].full_name,
            result[i].age,
            result[i].state,
            result[i].locations,
            result[i].background,
            'N/A',
            'N/A',
            'N/A',
            result[i].id,
            'Person'
          ));
        }
      })

      database.showEmailTeasure(dataId, function(result){
        for (let i=0;i<result.length;i++){
          resultData.push(new Resultrecord(
            result[i].emailData_fullname,
            'N/A',
            'N/A',
            result[i].emailData_location,
            'N/A',
            'N/A',
            'N/A',
            result[i].email,
            result[i].id,
            'Email'
          ));
        }
      })

      database.showPhoneTeasure(dataId, function(result){
        for (let i=0;i<result.length;i++){
          resultData.push(new Resultrecord(
            result[i].phoneData_cnam,
            'N/A',
            result[i].phoneData_state,
            result[i].phoneData_address,
            'N/A',
            'N/A',
            'N/A',
            result[i].phone,
            result[i].id,
            'Phone'
          ));
        }
        res.render('teasure', {data:resultData});
      })
    })
  }
  })
});


app.get('/phone', function (req, res) {
  res.render('searchByPhone', {phoneData: null, error: null});
})

app.post('/phone', function (req, res) {
  let phoneData_firstName;
  let phoneData_lastName;
  let dataId = '';
  let phoneNumber = req.body.phoneNumber;
  database.findPhoneInDatabase(phoneNumber, function(response){
    if(response.length>0){
    }else{
      database.searchedPerson('','','',phoneNumber);
      getPhoneData.getDataByPhone(phoneNumber,res);
    }
    phoneData_firstName = response[0].first_name;
    phoneData_lastName = response[0].last_name;
    console.log(phoneData_firstName);
    database.showSearchedPersonData(phoneData_firstName,phoneData_lastName, function(result){
      for (let i=0;i<result.length;i++){
        if(i>0){
          dataId += ','; 
        }
        dataId += result[i].id;
      }
      database.showPersonsTeasure(dataId, function(result){
        for (let i=0;i<result.length;i++){
          resultData.push(new Resultrecord(
            result[i].full_name,
            result[i].age,
            result[i].state,
            result[i].locations,
            result[i].background,
            'N/A',
            'N/A',
            'N/A',
            result[i].id,
            'Person'
          ));
        }
      })

      database.showEmailTeasure(dataId, function(result){
        for (let i=0;i<result.length;i++){
          resultData.push(new Resultrecord(
            result[i].emailData_fullname,
            'N/A',
            'N/A',
            result[i].emailData_location,
            'N/A',
            'N/A',
            'N/A',
            result[i].email,
            result[i].id,
            'Email'
          ));
        }
      })

      database.showPhoneTeasure(dataId, function(result){
        for (let i=0;i<result.length;i++){
          resultData.push(new Resultrecord(
            result[i].phoneData_cnam,
            'N/A',
            result[i].phoneData_state,
            result[i].phoneData_address,
            'N/A',
            'N/A',
            'N/A',
            result[i].phone,
            result[i].id,
            'Phone'
          ));
        }
        res.render('teasure', {data:resultData});
      })
    })
  // }
  })
});

app.get('/Person/:id', function (req, res) {
  let id = req.params.id;
  database.showPersonsData(id,function(data){
    let data_str;
    data_str=JSON.stringify(data);
    res.render('singlePersonData', {data: data_str, error: null});
  })
})
app.get('/Email/:id', function (req, res) {
  let id = req.params.id;
  database.showEmailData(id,function(data){
    let data_str;
    data_str=JSON.stringify(data);
    res.render('singlePersonData', {data: data_str, error: null});
  })
})
app.get('/Phone/:id', function (req, res) {
  let id = req.params.id;
  database.showPhoneData(id,function(data){
    let data_str;
    data_str=JSON.stringify(data);
    res.render('singlePersonData', {data: data_str, error: null});
  })
})


app.listen(port, function () {
  console.log('Net Detective app listening on port 3000!')
})
