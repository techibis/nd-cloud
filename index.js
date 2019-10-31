const express = require('express');
const bodyParser = require('body-parser');
// const request = require('request');
const app = express();
const port = process.env.PORT || 9000;

const database = require('./databaseConfig');
const getPersonData = require('./searchByName');
const getPhoneData = require('./searchByPhone');
const getEmailData = require('./searchByEmail');


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')


app.get('/', function (req, res) {
    res.render('index', {data: null, error: null});
})



app.post('/', function (req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    database.findNameInDatabase(firstName,lastName,function(result){
        if(result.length==0){
            database.searchedPerson(firstName,lastName,'','');
            getPersonData.getDataByName(firstName, lastName,res);
        }
    })
});

app.get('/email', function (req, res) {
    res.render('searchByEmail', {emailData: null, error: null});
})
  

app.post('/email', function (req, res) {
    let email = req.body.email;
    let emailData_firstName;
    let emailData_lastName;

    database.findEmailInDatabase(email, function(response){
        if(response.length==0){
            database.searchedPerson('','',email,'');
            getEmailData.getDataByEmail(email,res,function(response){
                emailData_firstName = response.emailData_firstName;
                emailData_lastName = response.emailData_lastName;
                database.findNameInDatabase(emailData_firstName,emailData_lastName, function(response){
                    if(response.length == 0){
                        database.updateSearchedPersonByEmail(emailData_firstName,emailData_lastName,email,'',);
                        getPersonData.getDataByName(emailData_firstName, emailData_lastName, res);
                    }
                });
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
    let phone = req.body.phoneNumber;
    database.findPhoneInDatabase(phone, function(response){
      if(response.length>0){
        console.log("phone found")
      }else{
        database.searchedPerson('','','',phone);
        getPhoneData.getDataByPhone(phone,res);
      }
    })
})

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

app.get('/Birth/:id', function (req, res) {
    let id = req.params.id;
    console.log(id);
    database.showBirthData(id,function(data){
      let data_str;
      console.log(data);
      data_str=JSON.stringify(data);
      res.render('singlePersonData', {data: data_str, error: null});
    })
})

app.get('/Death/:id', function (req, res) {
    let id = req.params.id;
    console.log(id);
    database.showDeathData(id,function(data){
      let data_str;
      console.log(data);
      data_str=JSON.stringify(data);
      res.render('singlePersonData', {data: data_str, error: null});
    })
})

app.get('/MD/:id', function (req, res) {
    let id = req.params.id;
    console.log(id);
    database.showMDData(id,function(data){
      let data_str;
      console.log(data);
      data_str=JSON.stringify(data);
      res.render('singlePersonData', {data: data_str, error: null});
    })
})

app.get('/Criminal/:id', function (req, res) {
    let id = req.params.id;
    console.log(id);
    database.showCriminalData(id,function(data){
      let data_str;
      console.log(data);
      data_str=JSON.stringify(data);
      res.render('singlePersonData', {data: data_str, error: null});
    })
})

app.listen(port, function(){
    console.log("Net Detective App Listening to Port 3000");
})

