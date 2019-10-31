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
    let sql = "INSERT INTO phone_data (phoneData_address,phoneData_profile,phoneData_cnam,phoneData_firstname,phoneData_lastname,phoneData_middlename,phoneData_gender,phoneData_image,phoneData_linetype,phoneData_city,phoneData_country,phoneData_state,phoneData_zip, searched_person_id) VALUES ('"+phoneData_address+"', 'no_profile','"+phoneData_cnam+"', '"+phoneData_firstname+"','"+phoneData_lastname+"', '"+phoneData_middlename+"','"+phoneData_gender+"','no_image', '"+phoneData_linetype+"','"+phoneData_city+"', '"+phoneData_country+"','"+phoneData_state+"', '"+phoneData_zip+"', '"+phoneNumber+"','"+searchedPersonId+"')";
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
    let sql = "INSERT INTO email_data (emailData_firstname,emailData_lastname,emailData_fullname,emailData_location,email,searched_person_id) VALUES ('"+emailData_firstName+"','"+emailData_lastName+"', '"+emailData_fullName+"','"+emailData_location+"','"+email+"','"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
}

function insert_raw_json_birth(json){
    let sql = "INSERT INTO raw_json_birth (birth_data_json,data_source,searched_person_id) VALUES ('"+json+"','Birth Record Checks','"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    });
}

function insert_birth_data(birthRecord_firstName,birthRecord_lastName,birthRecord_middleName,birthRecord_dob,birthRecord_gender,birthRecord_country,birthRecord_state){
    let sql = "INSERT INTO birth_record ("
    if(birthRecord_firstName!=null && typeof birthRecord_firstName !=='object') sql+="birthRecord_firstName,";
    if(birthRecord_lastName!=null && typeof birthRecord_lastName !=='object') sql+="birthRecord_lastName,";
    if(birthRecord_middleName!=null && typeof birthRecord_middleName !=='object') sql+="birthRecord_middleName,";
    if(birthRecord_dob!=null && typeof birthRecord_dob!=='object') sql+="birthRecord_dob,";
    if(birthRecord_gender!=null && typeof birthRecord_gender !== 'object') sql+="birthRecord_gender,";
    if(birthRecord_country!=null && typeof birthRecord_country !== 'object') sql+="birthRecord_country,";
    if(birthRecord_state!=null && typeof birthRecord_state !=='object') sql+="birthRecord_state,";
    if(searchedPersonId!=null) sql+="searched_person_id) VALUES (";
    if(birthRecord_firstName!=null && typeof birthRecord_firstName !=='object') sql+="'"+birthRecord_firstName+"',";
    if(birthRecord_lastName!=null && typeof birthRecord_lastName !=='object') sql+="'"+birthRecord_lastName+"',";
    if(birthRecord_middleName!=null && typeof birthRecord_middleName !=='object') sql+="'"+birthRecord_middleName+"',";
    if(birthRecord_dob!=null && typeof birthRecord_dob!=='object') sql+="'"+birthRecord_dob+"',";
    if(birthRecord_gender!=null && typeof birthRecord_gender !== 'object') sql+="'"+birthRecord_gender+"',";
    if(birthRecord_country!=null && typeof birthRecord_country !== 'object') sql+="'"+birthRecord_country+"',";
    if(birthRecord_state!=null && typeof birthRecord_state !=='object') sql+="'"+birthRecord_state+"',";
    if(searchedPersonId!=null) sql+="'"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
}

function insert_raw_json_death(json){
    let sql = "INSERT INTO raw_json_death (death_data_json,data_source,searched_person_id) VALUES ('"+json+"','Death Record Checks','"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    });
}

function insert_death_data(){

}

function insert_raw_json_md(json){
    let sql = "INSERT INTO raw_json_md (md_data_json,data_source,searched_person_id) VALUES ('"+json+"','Marriage/Divorce Record Checks','"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    });
}

function insert_md_data(){
    
}

function insert_raw_json_criminalchecks(json){
    let sql = "INSERT INTO raw_json_criminalchecks (criminal_data_json,data_source,searched_person_id) VALUES ('"+json+"','Criminal Record Checks','"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    });
}

function insert_criminal_data(){
    
}

function showSearchedPersonData(firstName,lastName,callback){
    let sql = "SELECT id,first_name,last_name,email,phone,(CASE WHEN email = '' THEN 0 ELSE 1 END) As 'Email',(CASE WHEN phone = '' THEN 0 ELSE 1 END) As 'Phone' from searched_person where first_name = '"+firstName+"' and last_name= '"+lastName+"'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        return callback(result);
    });
}


function showPersonsTeasure(id,callback){
    let sql = "SELECT id, firstName,lastName,(CASE WHEN middleName IS NULL THEN '' ELSE middleName END) AS 'middleName',(CASE WHEN dob IS NULL THEN 'N/A' ELSE dob END) AS 'age',(CASE WHEN state IS NULL THEN 'N/A' ELSE state END) AS 'state' , (CASE WHEN address IS NULL THEN 'N/A' ELSE 1 END) AS 'locations',(CASE WHEN phone IS NULL THEN 'N/A' ELSE 1 END) As contact from persons where searched_person_id in ("+id+")";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}

function showEmailTeasure(id,callback){
    let sql = "SELECT id,emailData_firstName,emailData_lastName,(CASE WHEN emailData_location IS NULL THEN 'N/A' ELSE 1 END) As 'emailData_location',(CASE WHEN email IS NULL THEN 'N/A' ELSE 1 END) AS 'email' from email_data where searched_person_id in ("+id+")";

    con.query(sql, function (err, result) {

        // if (err) throw err;

        return callback(result);
        // if (result.length>0){
        // }
    });
}

function showPhoneTeasure(id,callback){
    let sql = "SELECT id,phoneData_firstName,phoneData_lastName,(CASE WHEN phoneData_middleName IS NULL THEN '' ELSE phoneData_middleName END) AS 'phoneData_middleName', phoneData_state,(CASE WHEN phone IS NULL THEN 'N/A' ELSE 1 END) AS 'phone', (CASE WHEN phoneData_address IS NULL THEN 'N/A' ELSE 1 END) AS 'phoneData_address' from phoneData where searched_person_id in ("+id+")";

    con.query(sql, function (err, result) {

        if (err) throw err;

        return callback(result);
        // if (result.length>0){
        // }
    });
}


function showBirthTeasure(id,callback){
    let sql = "SELECT id, birthRecord_firstName,birthRecord_lastName,(CASE WHEN birthRecord_middleName IS NULL THEN '' ELSE birthRecord_middleName END) AS 'birthRecord_middleName',(CASE WHEN birthRecord_dob IS NULL THEN 'N/A' ELSE birthRecord_dob END) AS 'birthRecord_dob',(CASE WHEN birthRecord_state IS NULL THEN 'N/A' ELSE birthRecord_state END) AS 'birthRecord_state' , (CASE WHEN birthRecord_country IS NULL THEN 'N/A' ELSE 1 END) AS 'birthRecord_country' from birth_record where searched_person_id in ("+id+")";


    con.query(sql, function (err, result) {

        if (err) throw err;

        return callback(result);
        // if (result.length>0){
        // }
    });
}

function showDeathTeasure(id,callback){
    let sql = "SELECT id, birthRecord_firstName,birthRecord_lastName,(CASE WHEN birthRecord_middleName IS NULL THEN '' ELSE birthRecord_middleName END) AS 'birthRecord_middleName',(CASE WHEN birthRecord_dob IS NULL THEN 'N/A' ELSE birthRecord_dob END) AS 'birthRecord_dob',(CASE WHEN birthRecord_state IS NULL THEN 'N/A' ELSE birthRecord_state END) AS 'birthRecord_state' , (CASE WHEN birthRecord_country IS NULL THEN 'N/A' ELSE 1 END) AS 'birthRecord_country' from death_record where searched_person_id in ("+id+")";


    con.query(sql, function (err, result) {

        if (err) throw err;

        return callback(result);
        // if (result.length>0){
        // }
    });
}

function showMDTeasure(id,callback){
    let sql = "SELECT id, birthRecord_firstName,birthRecord_lastName,(CASE WHEN birthRecord_middleName IS NULL THEN '' ELSE birthRecord_middleName END) AS 'birthRecord_middleName',(CASE WHEN birthRecord_dob IS NULL THEN 'N/A' ELSE birthRecord_dob END) AS 'birthRecord_dob',(CASE WHEN birthRecord_state IS NULL THEN 'N/A' ELSE birthRecord_state END) AS 'birthRecord_state' , (CASE WHEN birthRecord_country IS NULL THEN 'N/A' ELSE 1 END) AS 'birthRecord_country' from md_record where searched_person_id in ("+id+")";


    con.query(sql, function (err, result) {

        if (err) throw err;

        return callback(result);
        // if (result.length>0){
        // }
    });
}

function showCriminalTeasure(id,callback){
    let sql = "SELECT id, birthRecord_firstName,birthRecord_lastName,(CASE WHEN birthRecord_middleName IS NULL THEN '' ELSE birthRecord_middleName END) AS 'birthRecord_middleName',(CASE WHEN birthRecord_dob IS NULL THEN 'N/A' ELSE birthRecord_dob END) AS 'birthRecord_dob',(CASE WHEN birthRecord_state IS NULL THEN 'N/A' ELSE birthRecord_state END) AS 'birthRecord_state' , (CASE WHEN birthRecord_country IS NULL THEN 'N/A' ELSE 1 END) AS 'birthRecord_country' from criminal_record where searched_person_id in ("+id+")";


    con.query(sql, function (err, result) {

        if (err) throw err;

        return callback(result);
        // if (result.length>0){
        // }
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
    let sql = "SELECT * from email_data where id ='"+id+"'";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}

function showPhoneData(id,callback){
    let sql = "SELECT * from phone_data where id ='"+id+"'";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}

function showBirthData(id,callback){
    let sql = "SELECT * FROM `birth_record` WHERE id ='"+id+"'";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}

function showDeathData(id,callback){
    let sql = "SELECT * FROM `death_record` WHERE id ='"+id+"'";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}

function showMDData(id,callback){
    let sql = "SELECT * FROM `md_record` WHERE id ='"+id+"'";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}

function showCriminalData(id,callback){
    let sql = "SELECT * FROM `criminal_record` WHERE id ='"+id+"'";

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
    insert_raw_json_birth,
    insert_birth_data,
    insert_raw_json_death,
    insert_death_data,
    insert_raw_json_md,
    insert_md_data,
    insert_raw_json_criminalchecks,
    insert_criminal_data,
    findNameInDatabase,
    findEmailInDatabase,
    findPhoneInDatabase,
    updateSearchedPersonByEmail,
    updateSearchedPersonByPhone,
    showSearchedPersonData,
    showPersonsTeasure,
    showEmailTeasure,
    showPhoneTeasure,
    showBirthTeasure,
    showDeathTeasure,
    showMDTeasure,
    showCriminalTeasure,
    showPersonsData,
    showEmailData,
    showPhoneData,
    showBirthData,
    showDeathData,
    showMDData,
    showCriminalData

};