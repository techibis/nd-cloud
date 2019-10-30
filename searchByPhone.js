const parser = require('xml2json');
var unirest = require('unirest');
const database = require('./databaseConfig');
const getphoneData = require('./searchByName');
const username = "netdetectivexml";
const password = "x1254d";

let json;
let jsonData;
let data;
let phone_firstName;
let phone_lastName;
let phone_middleName;
let phone_dob;
let phone_address;
let phone_city;
let phone_state;
let phone_zip;
let phone_county;
let phone_phone;

function getDataByPhone(phone,res){
    unirest.post('https://www.nationalpublicdata.com/feeds/FDSFeed.cfm')
    .header('Accept', 'application/json')
    .send({ "xml": "<FDSRequest><username>"+username+"</username><password>"+password+"</password><sType>PFPHN</sType><detail>1</detail><testmode>false</testmode><searchParams><phonenumber>"+phone+"</phonenumber></searchParams></FDSRequest>" })
    .end(function (response) {
        json = parser.toJson(response.body);
        jsonData = JSON.parse(json);
        // data = jsonData.FDSResponse.searchResults.PeopleFinderbyPhone.Result;
        console.log(json);

        database.insert_raw_json_phone(json);

        // if (jsonData.FDSResponse.searchResults.PeopleFinder !==''){
        //     for (let i =0; i < data.length; i++) { 

        //         phone_firstName = data[i].FirstName?data[i].FirstName:null;
        //         phone_lastName = data[i].LastName?data[i].LastName:null;
        //         phone_middleName = data[i].MiddleName?data[i].MiddleName:null;
        //         phone_dob = data[i].DOB?data[i].DOB:null;
        //         phone_address = data[i].Address?data[i].Address:null;
        //         phone_city = data[i].City?data[i].City:null;
        //         phone_state = data[i].State?data[i].State:null;
        //         phone_zip = data[i].Zip?data[i].Zip:null;
        //         phone_county = data[i].County?data[i].County:null;
        //         phone_phone = data[i].Phone?data[i].Phone:null;
        //         database.insert_phones_data(phone_firstName,phone_lastName,phone_middleName,phone_dob,phone_address,phone_city,phone_state,phone_zip,phone_county,phone_phone)
        //     }
        // }else{
        //     console.log("no data found");
        // }

        res.render('searchByPhone', {phoneData: json, error: null});
    });
};





// let phoneData;
// let phoneData_str;
// let phoneData_address;
// let phoneData_cnam;
// let phoneData_firstname;
// let phoneData_lastname;
// let phoneData_middlename;
// let phoneData_gender;
// let phoneData_image;
// let phoneData_profile;
// let phoneData_linetype;
// let phoneData_city;
// let phoneData_country;
// let phoneData_state;
// let phoneData_zip;

// function getDataByPhone(phoneNumber,res){

//     let url = `https://api.everyoneapi.com/v1/phone/${phoneNumber}?account_sid=${account_sid}&auth_token=${auth_token}&data=name,address,location,cnam,gender,linetype,image,line_provider,profile`;

//     request({url: url,json: true}, function (err, response, body) {
//       if(err){
//         res.render('searchByPhone', {phoneData: null, error: 'Error, please try again'});
//       } else {
//         phoneData = body;
//         phoneData_str = JSON.stringify(phoneData);
//         database.insert_raw_json_phone(phoneData_str);

//         if ('data' in phoneData){
        
//           phoneData_address = phoneData.data.address;
//           // phoneData_profile = phoneData.data.missed[0];
//           phoneData_cnam = phoneData.data.cnam;
//           phoneData_firstname = phoneData.data.expanded_name.first;
//           phoneData_lastname = phoneData.data.expanded_name.last;
//           phoneData_middlename = phoneData.data.expanded_name.middle;
//           phoneData_gender = phoneData.data.gender;
//           // phoneData_image = phoneData.data.missed[1];
//           phoneData_linetype = phoneData.data.linetype;
//           phoneData_city = phoneData.data.location.city;
//           phoneData_country = phoneData.data.location.country;
//           phoneData_state = phoneData.data.location.state;
//           phoneData_zip = phoneData.data.location.zip;

//           database.insert_phone_data(phoneData_address,phoneData_profile,phoneData_cnam,phoneData_firstname,phoneData_lastname,phoneData_middlename,phoneData_gender,phoneData_image,phoneData_linetype,phoneData_city,phoneData_country,phoneData_state,phoneData_zip,phoneNumber)
          
//           database.findNameInDatabase(phoneData_firstname,phoneData_lastname, function(response){
//             if(response.length>0){
//               console.log(response);
//               database.updateSearchedphoneByPhone(phoneData_firstname,phoneData_lastname,'',phone)
//             }else{
//               database.updateSearchedphoneByEmail(emailData_firstName,emailData_lastName,'',phone)
//               getphoneData.getDataByName(phoneData_firstname, phoneData_lastname);
//             }
//           });
            
//         }
//       }
//     });
// }

module.exports ={
    getDataByPhone
};