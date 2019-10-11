const mysql = require('mysql');
const moment = require('moment');
let currentTimestamp = moment().unix();
let currentDatetime = moment(currentTimestamp*1000).format("YYYY-MM-DD HH:mm:ss");


let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"public_record"
});



function insert_raw_json_name(jsonData){
    let sql = "INSERT INTO raw_json_name (person_data_json,data_source,time) VALUES ('"+jsonData+"','Complete Criminal Checks', '"+currentDatetime+"')";
    con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    });
}

function insert_persons_data(data_id,db,state,state_name,full_name,dob,race,eyes,hair,height,weight,image,sex,country,address,crime_type,sentence,type,personal_sign,last_update){
    let sql = "INSERT INTO persons (data_id,db,state,state_name,full_name,dob,race,eyes,hair,height,weight,image,sex,country,address,crime_type,sentence,type,personal_sign,last_update) VALUES ('"+data_id+"', '"+db+"','"+state+"', '"+state_name+"','"+full_name+"', '"+dob+"','"+race+"', '"+eyes+"','"+hair+"', '"+height+"','"+weight+"', '"+image+"','"+sex+"', '"+country+"','"+address+"', '"+crime_type+"','"+sentence+"', '"+type+"','"+personal_sign+"', '"+last_update+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
}

function insert_raw_json_phone(phoneData_str){
    let sql = "INSERT INTO raw_json_phone (phone_data_json,data_source,time) VALUES ('"+phoneData_str+"','Phone Number Lookup', '"+currentDatetime+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
}

function insert_phone_data(phoneData_address,phoneData_profile,phoneData_cnam,phoneData_firstname,phoneData_lastname,phoneData_middlename,phoneData_gender,phoneData_image,phoneData_linetype,phoneData_city,phoneData_country,phoneData_state,phoneData_zip){
    let sql = "INSERT INTO phoneData (phoneData_address,phoneData_profile,phoneData_cnam,phoneData_firstname,phoneData_lastname,phoneData_middlename,phoneData_gender,phoneData_image,phoneData_linetype,phoneData_city,phoneData_country,phoneData_state,phoneData_zip) VALUES ('"+phoneData_address+"', 'no_profile','"+phoneData_cnam+"', '"+phoneData_firstname+"','"+phoneData_lastname+"', '"+phoneData_middlename+"','"+phoneData_gender+"','no_image', '"+phoneData_linetype+"','"+phoneData_city+"', '"+phoneData_country+"','"+phoneData_state+"', '"+phoneData_zip+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
}

module.exports ={
    insert_raw_json_name,
    insert_persons_data,
    insert_raw_json_phone,
    insert_phone_data
};