const database = require('./databaseConfig');
const fetch = require('node-fetch');
const getPersonData = require('./searchByName');

let emailData_firstName;
let emailData_lastName;
let emailData_fullName;
let emailData_location;
let emailData;
let notFound;

function getDataByEmail(email, res) {
    fetch('https://api.fullcontact.com/v3/person.enrich', {
        method: 'POST',
        headers: {
            "Authorization": "Bearer TuqyrVvTwvq2chF9NFWNOOMRqWeZ4ZlF"
        },
        // body: {"email": "someone@gmail.com"}
        body :JSON.stringify({"emails": [email]})
    }).then(function (res) {
        console.log(res)
        return res.json();
    }).then(function (json) {
        if ('status' in json) {
            notFound = json.message;
            console.log(notFound);
            res.render('searchByEmail', { emailData: notFound, error: null });
        } else {

            emailData_firstName = json.details.name.given;
            emailData_lastName = json.details.name.family;
            emailData_fullName = json.fullName;
            emailData_location = json.location;
            emailData = JSON.stringify(json);
            database.insert_raw_json_email(emailData);
            database.insert_email_data(emailData_firstName, emailData_lastName, emailData_fullName, emailData_location);

            database.findNameInDatabase(emailData_firstName,emailData_lastName, function(response){
                database.updateSearchedPersonByEmail(emailData_firstName,emailData_lastName,email,'',)
                if(response.length>0){
                  console.log(response);
                }else{
                    getPersonData.getDataByName(emailData_firstName, emailData_lastName);
                }
            });
            
            // console.log(json);

            res.render('searchByEmail', { emailData: emailData, error: null });
        }
    });
}

module.exports ={
    getDataByEmail
};