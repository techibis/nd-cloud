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


class Resultrecord{
    constructor (firstName,lastName,age,state,locations,background,death,divorce,contact,dataId,database){
      this.firstName = firstName;
      this.lastName = lastName;
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

app.get('/', function (req, res) {
    res.render('index', {data: null, error: null});
})

// json = database.json;

app.post('/', function (req, res) {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let dataId = '';
    database.findNameInDatabase(firstName,lastName,function(result){
        if(result.length>0){
            found = "name found";
            database.showSearchedPersonData(firstName,lastName, function(result){
        
                for (let i=0;i<result.length;i++){
                  if(i>0){
                    dataId += ','; 
                  }
                  dataId += result[i].id;
                }
                database.showPersonsTeasure(dataId, function(result){
                  if (result){
                    for (let i=0;i<result.length;i++){
                      resultData.push(new Resultrecord(
                        result[i].firstName,
                        result[i].lastName,
                        result[i].age,
                        result[i].state,
                        result[i].locations,
                        'N/A',
                        'N/A',
                        'N/A',
                        result[i].contact,
                        result[i].id,
                        'Person'
                      ));
                    }
                  }
                })
          
                  database.showEmailTeasure(dataId, function(result){
                  if(result){
                      for (let i=0;i<result.length;i++){
                          resultData.push(new Resultrecord(
                          result[i].emailData_firstName,
                          result[i].emailData_lastName,
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
                    }
                      res.render('teasure', {data:resultData});
                })
          
            })
        }else{
            database.searchedPerson(firstName,lastName,'','');
            getPersonData.getDataByName(firstName, lastName,function(response){

            
                database.showSearchedPersonData(firstName,lastName, function(result){
            
                    for (let i=0;i<result.length;i++){
                        if(i>0){
                        dataId += ','; 
                        }
                        dataId += result[i].id;
                    }
                    database.showPersonsTeasure(dataId, function(result){
                        if (result){
                        for (let i=0;i<result.length;i++){
                            resultData.push(new Resultrecord(
                            result[i].firstName,
                            result[i].lastName,
                            result[i].age,
                            result[i].state,
                            result[i].locations,
                            'N/A',
                            'N/A',
                            'N/A',
                            result[i].contact,
                            result[i].id,
                            'Person'
                            ));
                        }
                        res.render('teasure', {data:resultData});
                        }
                    })
                
                })
            })
        }
    })
    // res.render('index', {data: json, error: null});
});

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
            console.log("email found")
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
                if (result){
                  for (let i=0;i<result.length;i++){
                    resultData.push(new Resultrecord(
                      result[i].firstName,
                      result[i].lastName,
                      result[i].age,
                      result[i].state,
                      result[i].locations,
                      'N/A',
                      'N/A',
                      'N/A',
                      result[i].contact,
                      result[i].id,
                      'Person'
                    ));
                  }
                }
              })
        
                database.showEmailTeasure(dataId, function(result){
                if(result){
                    for (let i=0;i<result.length;i++){
                        resultData.push(new Resultrecord(
                        result[i].emailData_firstName,
                        result[i].emailData_lastName,
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
                    }
                    res.render('teasure', {data:resultData});
                })
        
            })
        }else{
            database.searchedPerson('','',email,'');
            getEmailData.getDataByEmail(email,res,function(response){
                console.log(response);
                emailData_firstName = response.emailData_firstName;
                emailData_lastName = response.emailData_lastName;
                console.log(emailData_firstName);
                database.findNameInDatabase(emailData_firstName,emailData_lastName, function(response){
                    console.log(emailData_firstName);
                    console.log(response);
                    if(response.length>0){
                        console.log(response);
                        database.showSearchedPersonData(emailData_firstName,emailData_lastName, function(result){
                        
                            for (let i=0;i<result.length;i++){
                                if(i>0){
                                dataId += ','; 
                                }
                                dataId += result[i].id;
                            }
                            database.showPersonsTeasure(dataId, function(result){
                                if (result){
                                for (let i=0;i<result.length;i++){
                                    resultData.push(new Resultrecord(
                                    result[i].firstName,
                                    result[i].lastName,
                                    result[i].age,
                                    result[i].state,
                                    result[i].locations,
                                    'N/A',
                                    'N/A',
                                    'N/A',
                                    result[i].contact,
                                    result[i].id,
                                    'Person'
                                    ));
                                }
                                }
                            })
                        
                            database.showEmailTeasure(dataId, function(result){
                                if(result){
                                    for (let i=0;i<result.length;i++){
                                        resultData.push(new Resultrecord(
                                        result[i].emailData_firstName,
                                        result[i].emailData_lastName,
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
                                }
                                res.render('teasure', {data:resultData});
                            })
                        })
                    }else{
                        database.updateSearchedPersonByEmail(emailData_firstName,emailData_lastName,email,'',);
                        getPersonData.getDataByName(emailData_firstName, emailData_lastName,function(response){


                            console.log(emailData_firstName);
                            console.log(emailData_lastName);
                        
                            database.showSearchedPersonData(emailData_firstName,emailData_lastName, function(result){
                        
                                for (let i=0;i<result.length;i++){
                                    if(i>0){
                                    dataId += ','; 
                                    }
                                    dataId += result[i].id;
                                }
                                database.showPersonsTeasure(dataId, function(result){
                                    if (result){
                                    for (let i=0;i<result.length;i++){
                                        resultData.push(new Resultrecord(
                                        result[i].firstName,
                                        result[i].lastName,
                                        result[i].age,
                                        result[i].state,
                                        result[i].locations,
                                        'N/A',
                                        'N/A',
                                        'N/A',
                                        result[i].contact,
                                        result[i].id,
                                        'Person'
                                        ));
                                    }
                                    }
                                })
                            
                                database.showEmailTeasure(dataId, function(result){
                                    if(result){
                                        for (let i=0;i<result.length;i++){
                                            resultData.push(new Resultrecord(
                                            result[i].emailData_firstName,
                                            result[i].emailData_lastName,
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
                                    }
                                    res.render('teasure', {data:resultData});
                                })
                            })
                        })
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
    let dataId = '';
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

app.listen(port, function(){
    console.log("Net Detective App Listening to Port 3000");
})