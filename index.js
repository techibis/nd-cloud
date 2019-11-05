const express = require('express');
const bodyParser = require('body-parser');
// const request = require('request');
const app = express();
const port = process.env.PORT || 9000;

const database = require('./databaseConfig');
const getPersonData = require('./searchByName');
const getPhoneData = require('./searchByPhone');
const getEmailData = require('./searchByEmail');
const showResult = require('./showResultsFromDatabase');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

let apiArray ={people:0,criminal:0,birth:0,death:0,marriage:0,divorce:0};
let phoneApiArray = {phone:0};
let counter =0;
let total;

app.get('/', function (req, res) {
    res.render('index', {data: null, error: null});
})

app.post('/', function (req, res) {

    let firstName = req.body.firstName;
    let lastName = req.body.lastName;

    database.findNameInDatabase(firstName,lastName,function(result){
        
        if(result.length==0){
            database.searchedPerson(firstName,lastName,'','');
            getPersonData.getDataByName(firstName, lastName,apiArray);
        }else{
            setApiArrayValues();
        }
    })

    interval = setInterval(function(){checkIfDone(firstName,lastName,res)}, 200);
    console.log("I just defined a new interval and called it " + interval);

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
                    database.updateSearchedPersonByEmail(emailData_firstName,emailData_lastName,email,'',);

                    if(response.length == 0){
                        getPersonData.getDataByName(emailData_firstName, emailData_lastName,apiArray);
                    }else{
                        setApiArrayValues();
                    }
                });
            })
        }else{
            emailData_firstName = response[0].first_name;
            emailData_lastName = response[0].last_name;

            setApiArrayValues();
        }

        interval = setInterval(function(){checkIfDone(emailData_firstName,emailData_lastName,res)}, 200);
        console.log("I just defined a new interval and called it " + interval);
    })


});
  

app.get('/phone', function (req, res) {
    res.render('searchByPhone', {phoneData: null, error: null});
})
  
app.post('/phone', function (req, res) {

    let phone = req.body.phoneNumber;

    database.findPhoneInDatabase(phone, function(response){
        if (response.length == 0) {
            database.searchedPerson('', '', '', phone);
            getPhoneData.getDataByPhone(phone,phoneApiArray,res);
        }else{
            phoneApiArray.phone = 1;
        }
        interval = setInterval(function(){checkIfPhoneApiCallDone(phone,res)}, 200);
        console.log("cgvhbjknl");
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
    let firstName;
    let lastName;

    database.getNameWithPhone(id,function(response){
        firstName = response[0].phone_firstname;
        lastName = response[0].phone_lastname;


        database.findNameInDatabase(firstName,lastName,function(result){
            
            if(result.length==0){
                database.searchedPerson(firstName,lastName,'','');
                getPersonData.getDataByName(firstName, lastName,apiArray);
            }else{
                setApiArrayValues();
            }
        })


        interval = setInterval(function(){checkIfDone(firstName,lastName,res)}, 200);
        console.log("I just defined a new interval and called it " + interval);
    });
});

app.get('/Phone/Person/:id', function (req, res) {
    let id = req.params.id;
    database.showPersonsData(id,function(data){
      let data_str;
      data_str=JSON.stringify(data);
      res.render('singlePersonData', {data: data_str, error: null});
    })
})

// app.get('/Cellphone/:id', function (req, res) {
//     let id = req.params.id;
//     database.showCellPhoneData(id,function(data){
//       let data_str;
//       data_str=JSON.stringify(data);
//       res.render('singlePersonData', {data: data_str, error: null});
//     })
// })


app.get('/Birth/:id', function (req, res) {
    let id = req.params.id;
    database.showBirthData(id,function(data){
      let data_str;
      data_str=JSON.stringify(data);
      res.render('singlePersonData', {data: data_str, error: null});
    })
})


app.get('/Death/:id', function (req, res) {
    let id = req.params.id;
    database.showDeathData(id,function(data){
      let data_str;
      data_str=JSON.stringify(data);
      res.render('singlePersonData', {data: data_str, error: null});
    })
})


app.get('/MD/:id', function (req, res) {
    let id = req.params.id;
    database.showMDData(id,function(data){
      let data_str;
      data_str=JSON.stringify(data);
      res.render('singlePersonData', {data: data_str, error: null});
    })
})


app.get('/Criminal/:id', function (req, res) {
    let id = req.params.id;
    database.showCriminalData(id,function(data){
      let data_str;
      data_str=JSON.stringify(data);
      res.render('singlePersonData', {data: data_str, error: null});
    })
})

app.listen(port, function(){
    console.log("Net Detective App Listening to Port 9000");
})


function checkIfDone(firstName,lastName,res) { 
    counter +=1;
    
    console.log(apiArray);
    console.log(counter);
    total= apiArray['people']+apiArray['criminal']+apiArray['birth']+apiArray['death']+apiArray['marriage']+apiArray['divorce'];
    console.log(total);
    // console.log(apiArray['people']);
    console.log("The interval for this section is called " + interval);
    if ((apiArray.people)+(apiArray.criminal)+(apiArray.birth)+(apiArray.death)+(apiArray.marriage)+(apiArray.divorce)===6 || (counter==10)){
        console.log("The interval I am about to stop is " + interval);
        myStopFunction(interval);
        
        showResult.showPersonsDatafromDatabase(firstName,lastName,function(result){
            res.render('teasure', {data:result}); 
        });
    };

};

function checkIfPhoneApiCallDone(phone,res) { 

    if (phoneApiArray.phone === 1 ){
        myStopFunction(interval);
        showResult.showPhoneDataFromDatabase (phone,function(result){
            res.render('teasure', {data:result}); 
        });
    };

};


function myStopFunction(interval) {
    console.log("finalizing stop interval for " + interval)
    clearInterval(interval);
    apiArray ={people:0,criminal:0,birth:0,death:0,marriage:0,divorce:0};
}

function setApiArrayValues(){
    apiArray.people = 1;
    apiArray.criminal = 1;
    apiArray.birth = 1;
    apiArray.death = 1;
    apiArray.marriage = 1;
    apiArray.divorce = 1;
}
