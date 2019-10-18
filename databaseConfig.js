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

function findPhoneInDatabase(phone,callback) {
    let sql = "SELECT * from searched_person where phone=email='"+phone+"'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function insert_raw_json_name(jsonData){
    let sql = "INSERT INTO raw_json_name (person_data_json,data_source,searched_person_id) VALUES ('"+jsonData+"','Complete Criminal Checks','"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    });
}

function insert_persons_data(data_id,db,state,state_name,full_name,dob,race,eyes,hair,height,weight,image,sex,country,address,crime_type,sentence,type,personal_sign,last_update){
    let sql = "INSERT INTO persons (data_id,db,state,state_name,full_name,dob,race,eyes,hair,height,weight,image,sex,country,address,crime_type,sentence,type,personal_sign,last_update,searched_person_id) VALUES ('"+data_id+"', '"+db+"','"+state+"', '"+state_name+"','"+full_name+"', '"+dob+"','"+race+"', '"+eyes+"','"+hair+"', '"+height+"','"+weight+"', '"+image+"','"+sex+"', '"+country+"','"+address+"', '"+crime_type+"','"+sentence+"', '"+type+"','"+personal_sign+"', '"+last_update+"','"+searchedPersonId+"')";
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

function insert_phone_data(phoneData_address,phoneData_profile,phoneData_cnam,phoneData_firstname,phoneData_lastname,phoneData_middlename,phoneData_gender,phoneData_image,phoneData_linetype,phoneData_city,phoneData_country,phoneData_state,phoneData_zip){
    let sql = "INSERT INTO phoneData (phoneData_address,phoneData_profile,phoneData_cnam,phoneData_firstname,phoneData_lastname,phoneData_middlename,phoneData_gender,phoneData_image,phoneData_linetype,phoneData_city,phoneData_country,phoneData_state,phoneData_zip, searched_person_id) VALUES ('"+phoneData_address+"', 'no_profile','"+phoneData_cnam+"', '"+phoneData_firstname+"','"+phoneData_lastname+"', '"+phoneData_middlename+"','"+phoneData_gender+"','no_image', '"+phoneData_linetype+"','"+phoneData_city+"', '"+phoneData_country+"','"+phoneData_state+"', '"+phoneData_zip+"','"+searchedPersonId+"')";
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

function insert_email_data(emailData_firstName,emailData_lastName,emailData_fullName,emailData_location){
    let sql = "INSERT INTO emailData (emailData_firstname,emailData_lastname,emailData_fullname,emailData_location, searched_person_id) VALUES ('"+emailData_firstName+"','"+emailData_lastName+"', '"+emailData_fullName+"','"+emailData_location+"','"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
}


function showSearchedPersonData(firstName,lastName,callback){
    let sql = "SELECT * from searched_person where first_name = '"+firstName+"' and last_name= '"+lastName+"'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function showPersonsData(id,callback){
    let sql = "SELECT * from persons where searched_person_id= '"+id+"'";
    
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
    showPersonsData
};