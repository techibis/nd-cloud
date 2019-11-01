const parser = require('xml2json');
var unirest = require('unirest');
const database = require('./databaseConfig');
const username = "netdetectivexml";
const password = "x1254d";

let json;
let jsonData;
let data;
let phone_firstname;
let phone_lastname;
let phone_middlename;
let phone_dob;
let phone_address;
let phone_city;
let phone_state;
let phone_zip;
let phone_county;
let phone;

function getDataByPhone(phone,res,callback){

    unirest.post('https://www.nationalpublicdata.com/feeds/FDSFeed.cfm')
    .header('Accept', 'application/json')
    .send({ "xml": "<FDSRequest><username>"+username+"</username><password>"+password+"</password><sType>CELNP</sType><detail>1</detail><testmode>false</testmode><searchParams><lastname></lastname><firstname></firstname><state></state><city></city><phone>"+phone+"</phone></searchParams></FDSRequest>" })
    .end(function (response) {
        if (response.body !==undefined){
        json = parser.toJson(response.body);
        jsonData = JSON.parse(json);
        // data = jsonData.FDSResponse.searchResults.BirthSearch.Result;
        // console.log(json);

        // database.insert_raw_json_birth(json);

        // if (jsonData.FDSResponse.searchResults.BirthSearch !==''){
        //     for (let i =0; i < data.length; i++) { 
        //         birthRecord_firstName = data[i].firstName?data[i].firstName:null;
        //         birthRecord_lastName = data[i].lastName?data[i].lastName:null;
        //         birthRecord_middleName = data[i].middleName?data[i].middleName:null;
        //         birthRecord_dob = data[i].DOB?data[i].DOB:null;
        //         birthRecord_gender = data[i].gender?data[i].gender:null;
        //         birthRecord_country = data[i].birthCounty?data[i].birthCounty:null;
        //         birthRecord_state = data[i].state?data[i].state:null;
        //         database.insert_birth_data(birthRecord_firstName,birthRecord_lastName,birthRecord_middleName,birthRecord_dob,birthRecord_gender,birthRecord_country,birthRecord_state);
        //     }
        //     cellPhoneApiCAllDone(apiArray);
        // }
        }
    });


    unirest.post('https://www.nationalpublicdata.com/feeds/FDSFeed.cfm')
    .header('Accept', 'application/json')
    .send({ "xml": "<FDSRequest><username>"+username+"</username><password>"+password+"</password><sType>PFPHN</sType><detail>1</detail><testmode>false</testmode><searchParams><phonenumber>"+phone+"</phonenumber></searchParams></FDSRequest>" })
    .end(function (response) {
        json = parser.toJson(response.body);
        jsonData = JSON.parse(json);
        data = jsonData.FDSResponse.searchResults.PeopleFinderbyAddress.Result;
        // console.log(json);

        database.insert_raw_json_phone(json);

        if (jsonData.FDSResponse.searchResults.PeopleFinderbyAddress !==''){
            for (let i =0; i < data.length; i++) { 

                phone_firstname = data[i].FirstName?data[i].FirstName:null;
                phone_lastname = data[i].LastName?data[i].LastName:null;
                phone_middlename = data[i].MiddleName?data[i].MiddleName:null;
                phone_dob = data[i].DOB?data[i].DOB:null;
                phone_address = data[i].Address?data[i].Address:null;
                phone_city = data[i].City?data[i].City:null;
                phone_state = data[i].State?data[i].State:null;
                phone_zip = data[i].Zip?data[i].Zip:null;
                phone_county = data[i].County?data[i].County:null;
                phone_phone = data[i].phone?data[i].phone:null;

                database.insert_phone_data(phone_firstname,phone_lastname,phone_middlename,phone_dob,phone_address,phone_city,phone_state,phone_zip,phone_county,phone);
            }

            return callback({phone_firstname,phone_lastname});
        }else{
            res.render('searchByPhone', {phoneData: 'No Data Found', error: null});
        }
    });


};


module.exports ={
    getDataByPhone
};