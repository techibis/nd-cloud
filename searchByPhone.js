const database = require('./databaseConfig');

let phoneData_address;
let phoneData_cnam;
let phoneData_firstname;
let phoneData_lastname;
let phoneData_middlename;
let phoneData_gender;
let phoneData_image;
let phoneData_profile;
let phoneData_linetype;
let phoneData_city;
let phoneData_country;
let phoneData_state;
let phoneData_zip;

function getDataByPhone(phoneData){
    if ('data' in phoneData){
        
        phoneData_address = phoneData.data.address;
        // phoneData_profile = phoneData.data.missed[0];
        phoneData_cnam = phoneData.data.cnam;
        phoneData_firstname = phoneData.data.expanded_name.first;
        phoneData_lastname = phoneData.data.expanded_name.last;
        phoneData_middlename = phoneData.data.expanded_name.middle;
        phoneData_gender = phoneData.data.gender;
        // phoneData_image = phoneData.data.missed[1];
        phoneData_linetype = phoneData.data.linetype;
        phoneData_city = phoneData.data.location.city;
        phoneData_country = phoneData.data.location.country;
        phoneData_state = phoneData.data.location.state;
        phoneData_zip = phoneData.data.location.zip;

        database.insert_phone_data(phoneData_address,phoneData_profile,phoneData_cnam,phoneData_firstname,phoneData_lastname,phoneData_middlename,phoneData_gender,phoneData_image,phoneData_linetype,phoneData_city,phoneData_country,phoneData_state,phoneData_zip)
    }
}

module.exports ={
    getDataByPhone
};