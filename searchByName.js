const parser = require('xml2json');
var unirest = require('unirest');
const database = require('./databaseConfig');
const showResult = require('./showResultsFromDatabase');
const criminalRecord = require('./criminalRecord.js');
const birthRecord = require('./birthRecord.js');
const mDRecord = require('./marriageAndDivorceRecord.js');
const deathRecord = require('./deathRecord.js');
const username = "netdetectivexml";
const password = "x1254d";

let json;
let jsonData;
let data;
let person_firstName;
let person_lastName;
let person_middleName;
let person_dob;
let person_address;
let person_city;
let person_state;
let person_zip;
let person_county;
let person_phone;




function getDataByName(firstName,lastName,apiArray){

    unirest.post('https://www.nationalpublicdata.com/feeds/FDSFeed.cfm')
    .header('Accept', 'application/json')
    .send({ "xml": "<FDSRequest><username>"+username+"</username><password>"+password+"</password><sType>PFSBN</sType><detail>1</detail><testmode>false</testmode><searchParams><firstName>"+firstName+"</firstName><middleName></middleName><lastName>"+lastName+"</lastName><city></city><state></state><dob></dob></searchParams></FDSRequest>" })
    .end(function (response) {
        json = parser.toJson(response.body);
        jsonData = JSON.parse(json);
        data = jsonData.FDSResponse.searchResults.PeopleFinder.Result;


        database.insert_raw_json_name(json);

        if (jsonData.FDSResponse.searchResults.PeopleFinder !==''){
            for (let i =0; i < data.length; i++) { 

                person_firstName = data[i].FirstName?data[i].FirstName:null;
                person_lastName = data[i].LastName?data[i].LastName:null;
                person_middleName = data[i].MiddleName?data[i].MiddleName:null;
                person_dob = data[i].DOB?data[i].DOB:null;
                person_address = data[i].Address?data[i].Address:null;
                person_city = data[i].City?data[i].City:null;
                person_state = data[i].State?data[i].State:null;
                person_zip = data[i].Zip?data[i].Zip:null;
                person_county = data[i].County?data[i].County:null;
                person_phone = data[i].Phone?data[i].Phone:null;
                database.insert_persons_data(person_firstName,person_lastName,person_middleName,person_dob,person_address,person_city,person_state,person_zip,person_county,person_phone)
                peopleApiCAllDone(apiArray);
            }
        }

        console.log("Sending to getCriminalRecord: " + apiArray.people.toString()+ apiArray.criminal.toString()+ apiArray.birth.toString()+  apiArray.death.toString() + apiArray.marriage.toString()+ apiArray.divorce.toString());
        criminalRecord.getCriminalRecord(firstName,lastName,apiArray);
        console.log("Now I have an array with: " + apiArray.people.toString()+ apiArray.criminal.toString()+ apiArray.birth.toString()+ + apiArray.death.toString() + apiArray.marriage.toString()+ apiArray.divorce.toString());
        console.log("Sending to getBirthRecord: " + apiArray.people.toString()+ apiArray.criminal.toString()+ apiArray.birth.toString()+ + apiArray.death.toString() + apiArray.marriage.toString()+ apiArray.divorce.toString());
        birthRecord.getBirthRecord(firstName,lastName,apiArray);
        console.log("Now I have an array with: " + apiArray.people.toString()+ apiArray.criminal.toString()+ apiArray.birth.toString()+ + apiArray.death.toString() + apiArray.marriage.toString()+ apiArray.divorce.toString());
        console.log("Sending to getDeathRecord: " + apiArray.people.toString()+ apiArray.criminal.toString()+ apiArray.birth.toString()+ + apiArray.death.toString() + apiArray.marriage.toString()+ apiArray.divorce.toString());
        deathRecord.getDeathRecord(firstName,lastName,apiArray);
        console.log("Now I have an array with: " + apiArray.people.toString()+ apiArray.criminal.toString()+ apiArray.birth.toString()+ + apiArray.death.toString() + apiArray.marriage.toString()+ apiArray.divorce.toString());
        console.log("Sending to getMDRecord: " + apiArray.people.toString()+ apiArray.criminal.toString()+ apiArray.birth.toString()+ + apiArray.death.toString() + apiArray.marriage.toString()+ apiArray.divorce.toString());
        mDRecord.getMDRecord(firstName,lastName,apiArray);
        console.log("Now I have an array with: " + apiArray.people.toString()+ apiArray.criminal.toString()+ apiArray.birth.toString()+ + apiArray.death.toString() + apiArray.marriage.toString()+ apiArray.divorce.toString());
        
    });
};



function peopleApiCAllDone(apiArray){
    apiArray.people = 1;
}



module.exports ={
    getDataByName
};
