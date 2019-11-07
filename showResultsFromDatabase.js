const database = require('./databaseConfig');
const moment = require('moment');

class Resultrecord{
    constructor (firstName,lastName,middleName,age,state,locations,background,death,marriage,divorce,contact,dataId,database){
      this.firstName = firstName;
      this.lastName = lastName;
      this.middleName = middleName;
      this.age = age;
      this.state = state;
      this.locations = locations;
      this.background = background;
      this.death = death;
      this.marriage = marriage;
      this.divorce = divorce;
      this.contact = contact;
      this.dataId = dataId;
      this.database = database;
    }
}
  
let resultData = new Array();
let names;


function showPersonsDatafromDatabase(firstName,lastName,show,callback){

   emptyArray();

    database.showSearchedPersonData(firstName,lastName, function(result){
        let dataId = '';

        for (let i=0;i<result.length;i++){
            if(i>0){
            dataId += ','; 
            }
            dataId += result[i].id;
        }

        database.showPersonsTeasure(dataId, function(result){
            if (result){

                for (let i=0;i<result.length;i++){
                    names = checkName(result[i].firstName,result[i].lastName,result[i].middleName,show);
                    firstName=names.split(",")[0];
                    lastName =names.split(",")[1];
                    middleName =names.split(",")[2];
                    resultData.push(new Resultrecord(
                    firstName,
                    lastName,
                    middleName,
                    result[i].age,
                    result[i].state,
                    result[i].locations,
                    'N/A',
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
                    names = checkName(result[i].emailData_firstName,result[i].emailData_lastName,'',show);
                    firstName=names.split(",")[0];
                    lastName =names.split(",")[1];
                    middleName =names.split(",")[2];
                    resultData.push(new Resultrecord(
                    firstName,
                    lastName,
                    middleName,
                    'N/A',
                    'N/A',
                    result[i].emailData_location,
                    'N/A',
                    'N/A',
                    'N/A',
                    'N/A',
                    result[i].email,
                    result[i].id,
                    'Email'
                    ));
                }
            }
        })

        database.showBirthTeasure(dataId, function(result){
            if(result){
                for (let i=0;i<result.length;i++){
                    names = checkName(result[i].birthRecord_firstName,result[i].birthRecord_lastName,result[i].birthRecord_middleName,show);
                    firstName=names.split(",")[0];
                    lastName =names.split(",")[1];
                    middleName =names.split(",")[2];
                    resultData.push(new Resultrecord(
                    firstName,
                    lastName,
                    middleName,
                    result[i].birthRecord_dob,
                    result[i].birthRecord_state,
                    result[i].birthRecord_country,
                    'N/A',
                    'N/A',
                    'N/A',
                    'N/A',
                    'N/A',
                    result[i].id,
                    'Birth'
                    ));
                }
            };
        });

        database.showDeathTeasure(dataId, function(result){
            if(result){
                for (let i=0;i<result.length;i++){
                    names = checkName(result[i].firstname,result[i].lastname,result[i].middlename,show);
                    firstName=names.split(",")[0];
                    lastName =names.split(",")[1];
                    middleName =names.split(",")[2];
                    resultData.push(new Resultrecord(
                    firstName,
                    lastName,
                    middleName,
                    result[i].DateofBirth,
                    result[i].State,
                    result[i].lastcounty,
                    'N/A',
                    result[i].DateofDeath,
                    'N/A',
                    'N/A',
                    'N/A',
                    result[i].id,
                    'Death'
                    ));
                }
            };
        });

        database.showMDTeasure(dataId, function(result){
            if(result){
                for (let i=0;i<result.length;i++){
                    names = checkName(result[i].md_firstname,result[i].md_lastname,result[i].md_middlename,show);
                    firstName=names.split(",")[0];
                    lastName =names.split(",")[1];
                    middleName =names.split(",")[2];
                    resultData.push(new Resultrecord(
                    firstName,
                    lastName,
                    middleName,
                    'N/A',
                    'N/A',
                    'N/A',
                    'N/A',
                    'N/A',
                    result[i].marriage_date,
                    result[i].divorce_date,
                    'N/A',
                    result[i].id,
                    'MD'
                    ));
                }
            };
        });

        database.showCriminalTeasure(dataId, function(result){
            if(result){
                for (let i=0;i<result.length;i++){
                    names = checkName(result[i].firstname,result[i].lastname,result[i].middlename,show);
                    firstName=names.split(",")[0];
                    lastName =names.split(",")[1];
                    middleName =names.split(",")[2];
                    resultData.push(new Resultrecord(
                    firstName,
                    lastName,
                    middleName,
                    result[i].dob,
                    result[i].state,
                    result[i].address,
                    result[i].crime,
                    'N/A',
                    'N/A',
                    'N/A',
                    'N/A',
                    result[i].id,
                    'Criminal'
                    ));
                }
            };
            return callback(resultData);
        });

    })

}



function showPhoneDataFromDatabase(phone,callback){
    let phoneDatas = new Array();
    let age;

    emptyPhoneDataArray(phoneDatas);
    
    database.showPhoneTeasure(phone, function(result){
        if(result){
            for (let i=0;i<result.length;i++){
                age = calculateAge(result[i].phone_dob);

                phoneDatas.push(new Resultrecord(
                result[i].phone_firstname,
                result[i].phone_lastname,
                result[i].phone_middlename,
                age,
                result[i].phone_state,
                result[i].phone_address,
                'N/A',
                'N/A',
                'N/A',
                'N/A',
                result[i].phone,
                result[i].id,
                'Phone'
                ));
            }
            return callback(phoneDatas);
        }
    })
}

function emptyArray(){
    resultData.length=0;
}

function emptyPhoneDataArray(phoneDatas){
    phoneDatas.length=0;
}

        
function checkName(firstname,lastname,middlename,show){
    let  newfirstname;
    let newlastname;
    let  newmiddlename;
    if(show==0){
        newfirstname="Available";
         newlastname = "Available";
        newmiddlename = "";
    }else{
        newfirstname=firstname;
        newlastname=lastname;
        newmiddlename=middlename;
    }
    return newfirstname+","+newlastname+","+newmiddlename;
}

function calculateAge(date){
    let age;
    if(date !== 'N/A'){
        let seconds = date;
        let year = seconds.split("/")[2];
        let d = new Date();
        let currentYear = d.getFullYear();
        age = (currentYear-year)+" Years";

    }else{
        age = date;
    }
    return age;
}

module.exports ={
    showPersonsDatafromDatabase,
    showPhoneDataFromDatabase
};