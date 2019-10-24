const request = require('request');
const database = require('./databaseConfig');
const getPersonData = require('./searchByName');
// const account_sid='ACcd28b8837adf4d3ca0141ef5ad3fdec6';
// const auth_token='AUae5b345b940447be9d7cab5ebe33a7fa';
// const account_sid='ACcca8346a7f804a309e8f465d29ce3ef1';   //mark
// const auth_token='AUd276d5abef1748fbad0b5763697154b5';    //mark

let phoneData;
let phoneData_str;
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

function getDataByPhone(phoneNumber,res){

    let url = `https://api.everyoneapi.com/v1/phone/${phoneNumber}?account_sid=${account_sid}&auth_token=${auth_token}&data=name,address,location,cnam,gender,linetype,image,line_provider,profile`;

    request({url: url,json: true}, function (err, response, body) {
      if(err){
        res.render('searchByPhone', {phoneData: null, error: 'Error, please try again'});
      } else {
        phoneData = body;
        phoneData_str = JSON.stringify(phoneData);
        database.insert_raw_json_phone(phoneData_str);

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

          database.insert_phone_data(phoneData_address,phoneData_profile,phoneData_cnam,phoneData_firstname,phoneData_lastname,phoneData_middlename,phoneData_gender,phoneData_image,phoneData_linetype,phoneData_city,phoneData_country,phoneData_state,phoneData_zip,phoneNumber)
          
          database.findNameInDatabase(phoneData_firstname,phoneData_lastname, function(response){
            if(response.length>0){
              console.log(response);
              database.updateSearchedPersonByPhone(phoneData_firstname,phoneData_lastname,'',phone)
            }else{
              database.updateSearchedPersonByEmail(emailData_firstName,emailData_lastName,'',phone)
              getPersonData.getDataByName(phoneData_firstname, phoneData_lastname);
            }
          });
            
        }
      }
    });
}

module.exports ={
    getDataByPhone
};