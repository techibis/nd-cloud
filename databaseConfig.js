const mysql = require('mysql');
const moment = require('moment');
let currentTimestamp = moment().unix();
let currentDatetime = moment(currentTimestamp*1000).format("YYYY-MM-DD HH:mm:ss");
let searchedPersonId;



let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"public_record"
});


function searchedPerson(firstName, lastName, email, phone){
    let sql = "INSERT INTO searched_person (first_name, last_name, email, phone, time) VALUES ('"+firstName+"','"+lastName+"','"+email+"','"+phone+"','"+currentDatetime+"')";
    con.query(sql, function (err, result) {
    if (err) {throw err;}
    else{
    searchedPersonId = result.insertId;
    }
    });
}

function updateSearchedPersonByEmail(firstName, lastName, email, phone){
    let sql = "UPDATE searched_person SET first_name = '"+firstName+"', last_name= '"+lastName+"' where email='"+email+"'";
    con.query(sql, function (err, result) {
    if (err) {throw err;}
    console.log('1 record updated');
    });
}

function updateSearchedPersonByPhone(firstName, lastName, email, phone){
    let sql = "UPDATE searched_person SET first_name = '"+firstName+"', last_name= '"+lastName+"' where phone='"+phone+"'";
    con.query(sql, function (err, result) {
    if (err) {throw err;}
    console.log('1 record updated');
    });
}

function findNameInDatabase(firstName, lastName,callback) {
    let sql = "SELECT * from searched_person where first_name='"+firstName+"' and last_name= '"+lastName+"'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function findEmailInDatabase(email,callback) {
    let sql = "SELECT * from searched_person where email='"+email+"'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function findPhoneInDatabase(phoneNumber,callback) {
    let sql = "SELECT * from searched_person where phone='"+phoneNumber+"'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function insert_raw_json_name(jsonData){
    let sql = "INSERT INTO raw_json_name (person_data_json,data_source,searched_person_id) VALUES ('"+jsonData+"','Background Checks','"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    });
}

function insert_persons_data(person_firstName,person_lastName,person_middleName,person_dob,person_address,person_city,person_state,person_zip,person_county,person_phone){
    let sql = "INSERT INTO persons ("
    if(person_firstName!=null && typeof person_firstName !=='object') sql+="firstName,";
    if(person_lastName!=null && typeof person_lastName !=='object') sql+="lastName,";
    if(person_middleName!=null && typeof person_middleName !=='object') sql+="middleName,";
    if(person_dob!=null && typeof person_dob !=='object') sql+="dob,";
    if(person_address!=null && typeof person_address !== 'object') sql+="address,";
    if(person_city!=null && typeof person_city !== 'object') sql+="city,";
    if(person_state!=null && typeof person_state !=='object') sql+="state,";
    if(person_zip!=null && typeof person_zip !=='object') sql+="zip,";
    if(person_county!=null && typeof person_county !=='object') sql+="county,";
    if(person_phone!=null && typeof person_phone !=='object') sql+="phone,";
    if(searchedPersonId!=null) sql+="searched_person_id) VALUES (";
    if(person_firstName!=null && typeof person_firstName !=='object') sql+="'"+person_firstName+"',";
    if(person_lastName!=null && typeof person_lastName !=='object') sql+=" '"+person_lastName+"',";
    if(person_middleName!=null && typeof person_middleName !=='object') sql+="'"+person_middleName+"',";
    if(person_dob!=null && typeof person_dob !=='object') sql+=" '"+person_dob+"',";
    if(person_address!=null && typeof person_address !== 'object') sql+="'"+person_address+"',";
    if(person_city!=null && typeof person_city !== 'object') sql+=" '"+person_city+"',";
    if(person_state!=null && typeof person_state !=='object') sql+="'"+person_state+"',";
    if(person_zip!=null && typeof person_zip !=='object') sql+=" '"+person_zip+"',";
    if(person_county!=null && typeof person_county !=='object') sql+="'"+person_county+"',";
    if(person_phone!=null && typeof person_phone !=='object') sql+=" '"+person_phone+"',";
    if(searchedPersonId!=null) sql+="'"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
}

function insert_raw_json_phone(phoneData_str){
    let sql = "INSERT INTO raw_json_phone (phone_data_json,data_source,searched_person_id,time) VALUES ('"+phoneData_str+"','Phone Number Lookup','"+searchedPersonId+"', '"+currentDatetime+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
}

function insert_phone_data(phoneData_address,phoneData_profile,phoneData_cnam,phoneData_firstname,phoneData_lastname,phoneData_middlename,phoneData_gender,phoneData_image,phoneData_linetype,phoneData_city,phoneData_country,phoneData_state,phoneData_zip,phoneNumber){
    let sql = "INSERT INTO phoneData (phoneData_address,phoneData_profile,phoneData_cnam,phoneData_firstname,phoneData_lastname,phoneData_middlename,phoneData_gender,phoneData_image,phoneData_linetype,phoneData_city,phoneData_country,phoneData_state,phoneData_zip, searched_person_id) VALUES ('"+phoneData_address+"', 'no_profile','"+phoneData_cnam+"', '"+phoneData_firstname+"','"+phoneData_lastname+"', '"+phoneData_middlename+"','"+phoneData_gender+"','no_image', '"+phoneData_linetype+"','"+phoneData_city+"', '"+phoneData_country+"','"+phoneData_state+"', '"+phoneData_zip+"', '"+phoneNumber+"','"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
}

function insert_raw_json_email(emailData){
    let sql = "INSERT INTO raw_json_email (email_data_json,data_source,searched_person_id) VALUES ('"+emailData+"','Email Address Lookup','"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
}

function insert_email_data(emailData_firstName,emailData_lastName,emailData_fullName,emailData_location,email){
    let sql = "INSERT INTO emailData (emailData_firstname,emailData_lastname,emailData_fullname,emailData_location,email,searched_person_id) VALUES ('"+emailData_firstName+"','"+emailData_lastName+"', '"+emailData_fullName+"','"+emailData_location+"','"+email+"','"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
}


function showSearchedPersonData(firstName,lastName,callback){
    let sql = "SELECT id,first_name,last_name,email,phone,(CASE WHEN email = '' THEN 0 ELSE 1 END) As 'Email',(CASE WHEN phone = '' THEN 0 ELSE 1 END) As 'Phone' from searched_person where first_name = '"+firstName+"' and last_name= '"+lastName+"'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        return callback(result);
    });
}


function showPersonsTeasure(id,callback){
    let sql = "SELECT id, firstName,lastName,(CASE WHEN dob IS NULL THEN 'N/A' ELSE dob END) AS 'age',(CASE WHEN state IS NULL THEN 'N/A' ELSE state END) AS 'state' , (CASE WHEN address IS NULL THEN 'N/A' ELSE 1 END) AS 'locations',(CASE WHEN phone IS NULL THEN 'N/A' ELSE 1 END) As contact from persons where searched_person_id in ("+id+")";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}

function showEmailTeasure(id,callback){
    let sql = "SELECT id,emailData_firstName,emailData_lastName,(CASE WHEN emailData_location IS NULL THEN 'N/A' ELSE 1 END) As 'emailData_location',(CASE WHEN email IS NULL THEN 'N/A' ELSE 1 END) AS 'email' from emailData where searched_person_id in ("+id+")";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}

function showPhoneTeasure(id,callback){
    let sql = "SELECT id,phoneData_cnam,phoneData_state,(CASE WHEN phone IS NULL THEN 'N/A' ELSE 1 END) AS 'phone', (CASE WHEN phoneData_address IS NULL THEN 'N/A' ELSE 1 END) AS 'phoneData_address' from phoneData where searched_person_id in ("+id+")";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}

function showPersonsData(id,callback){
    let sql = "SELECT * from persons where id ='"+id+"'";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}

function showEmailData(id,callback){
    let sql = "SELECT * from emailData where id ='"+id+"'";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}

function showPhoneData(id,callback){
    let sql = "SELECT * from phoneData where id ='"+id+"'";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}

module.exports ={
    searchedPerson,
    insert_raw_json_name,
    insert_persons_data,
    insert_raw_json_phone,
    insert_phone_data,
    insert_raw_json_email,
    insert_email_data,
    findNameInDatabase,
    findEmailInDatabase,
    findPhoneInDatabase,
    updateSearchedPersonByEmail,
    updateSearchedPersonByPhone,
    showSearchedPersonData,
    showPersonsTeasure,
    showEmailTeasure,
    showPhoneTeasure,
    showPersonsData,
    showEmailData,
    showPhoneData

};