const parser = require('xml2json');
var unirest = require('unirest');
const database = require('./databaseConfig');
const username = "netdetectivexml";
const password = "x1254d";

let json;
let jsonData;
let data;
let firstname;
let lastname;
let middlename;
let DateofDeath;
let DateofBirth;
let lastcounty;
let State;


function getDeathRecord(firstName,lastName,apiArray){
    unirest.post('https://www.nationalpublicdata.com/feeds/FDSFeed.cfm')
    .header('Accept', 'application/json')
    .send({ "xml": "<FDSRequest><username>"+username+"</username><password>"+password+"</password><sType>GNDTH</sType><detail>1</detail><testmode>false</testmode><searchParams><firstName>"+firstName+"</firstName><lastName>"+lastName+"</lastName><ssn></ssn><dob></dob></searchParams></FDSRequest>" })
    .end(function (response) {
        json = parser.toJson(response.body);
        jsonData = JSON.parse(json);
        data = jsonData.FDSResponse.searchResults.DeathSearch.Result;

        database.insert_raw_json_death(json);

        if (jsonData.FDSResponse.searchResults.DeathSearch !==''){
            for (let i =0; i < data.length; i++) { 
                firstname = data[i].firstname?data[i].firstname:null;
                lastname = data[i].lastname?data[i].lastname:null;
                middlename = data[i].middlename?data[i].middlename:null;
                DateofDeath = data[i].DateofDeath?data[i].DateofDeath:null;
                DateofBirth = data[i].DateofBirth?data[i].DateofBirth:null;
                lastcounty = data[i].lastcounty?data[i].lastcounty:null;
                State = data[i].State?data[i].State:null;
                database.insert_death_data(firstname,lastname,middlename,DateofDeath,DateofBirth,lastcounty,State);
            }
        }
        deathApiCAllDone(apiArray);
    });
};

function deathApiCAllDone(apiArray){
    apiArray.death = 1;
}

module.exports ={
    getDeathRecord
};