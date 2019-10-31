const parser = require('xml2json');
var unirest = require('unirest');
const database = require('./databaseConfig');
const username = "netdetectivexml";
const password = "x1254d";

let json;
let jsonData;
let data;
let birthRecord_firstName;
let birthRecord_lastName;
let birthRecord_middleName;
let birthRecord_dob;
let birthRecord_gender;
let birthRecord_country;
let birthRecord_state;


function getBirthRecord(firstName,lastName,apiArray){
    unirest.post('https://www.nationalpublicdata.com/feeds/FDSFeed.cfm')
    .header('Accept', 'application/json')
    .send({ "xml": "<FDSRequest><username>"+username+"</username><password>"+password+"</password><sType>GNBTH</sType><detail>1</detail><testmode>false</testmode><searchParams><firstName>"+firstName+"</firstName><lastName>"+lastName+"</lastName><middlename></middlename><state></state></searchParams></FDSRequest>" })
    .end(function (response) {
        json = parser.toJson(response.body);
        jsonData = JSON.parse(json);
        data = jsonData.FDSResponse.searchResults.BirthSearch.Result;

        database.insert_raw_json_birth(json);

        if (jsonData.FDSResponse.searchResults.BirthSearch !==''){
            for (let i =0; i < data.length; i++) { 
                birthRecord_firstName = data[i].firstName?data[i].firstName:null;
                birthRecord_lastName = data[i].lastName?data[i].lastName:null;
                birthRecord_middleName = data[i].middleName?data[i].middleName:null;
                birthRecord_dob = data[i].DOB?data[i].DOB:null;
                birthRecord_gender = data[i].gender?data[i].gender:null;
                birthRecord_country = data[i].birthCounty?data[i].birthCounty:null;
                birthRecord_state = data[i].state?data[i].state:null;
                database.insert_birth_data(birthRecord_firstName,birthRecord_lastName,birthRecord_middleName,birthRecord_dob,birthRecord_gender,birthRecord_country,birthRecord_state);
            }
            birthApiCAllDone(apiArray);
        }
    });
};

function birthApiCAllDone(apiArray){
    let arrayCopy = [...apiArray];
    arrayCopy.filter((item) => {
        if (item.birth === 0) {
            item.birth = 1;
        }
    });
}

module.exports ={
    getBirthRecord
};