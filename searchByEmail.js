const database = require('./databaseConfig');
const fetch = require('node-fetch');

let emailData_firstName='';
let emailData_lastName='';
let emailData_fullName;
let emailData_location;
let emailData;
let notFound;
let email_address='';

function getDataByEmail(email,res,callback) {

    email_address = email;
    fetch('https://api.fullcontact.com/v3/person.enrich', {
        method: 'POST',
        headers: {
            "Authorization": "Bearer ceG0AdLPuXm7Ah2VyBgH6Pl0MxId8yt5"
        },
        body :JSON.stringify({"emails": [email_address]})
    }).then(function (res) {
        return res.json();
    }).then(function (json) {
        if (!('status' in json)){

            database.insert_raw_json_email(emailData);
            emailData = JSON.stringify(json);

            emailData_firstName = json.details.name.given;
            emailData_lastName = json.details.name.family;
            emailData_fullName = json.fullName;
            emailData_location = json.location;

        
            database.insert_email_data(emailData_firstName, emailData_lastName, emailData_fullName, emailData_location, email_address);

            return callback({emailData_firstName,emailData_lastName});
        }else{
            res.render('searchByEmail', {emailData: 'No Data Found', error: null});
        }
    });
}

module.exports ={
    getDataByEmail
};