const parser = require('xml2json');
var unirest = require('unirest');
const database = require('./databaseConfig');
const username = "netdetectivexml";
const password = "x1254d";

let json;
let jsonData;
let data;
let md_firstname;
let md_lastname;
let md_middlename;
let spouse_firstname;
let spouse_lastname;
let spouse_middlename;
let marriage_county;
let marriage_state;
let marriage_date;
let divorce_county;
let divorce_state;
let divorce_date;
let certificate_number;
let volume_number;
let decreetype;
let docketnumber;


function getMDRecord(firstName,lastName,apiArray){
    unirest.post('https://www.nationalpublicdata.com/feeds/FDSFeed.cfm')
    .header('Accept', 'application/json')
    .send({ "xml": "<FDSRequest><username>"+username+"</username><password>"+password+"</password><sType>MARDV</sType><detail>1</detail><testmode>false</testmode><searchParams><firstName>"+firstName+"</firstName><lastName>"+lastName+"</lastName><state></state><county></county></searchParams></FDSRequest>" })
    .end(function (response) {
        json = parser.toJson(response.body);
        jsonData = JSON.parse(json);
        marriageData = jsonData.FDSResponse.searchResults.MarriageSearch.Result;
        divorceData = jsonData.FDSResponse.searchResults.DivorceSearch.Result;

        database.insert_raw_json_md(json);
        
        if (jsonData.FDSResponse.searchResults.MarriageSearch !==''){
            for (let i =0; i < marriageData.length; i++) { 
        
                md_firstname = marriageData[i].FirstPersonFirst?marriageData[i].FirstPersonFirst:null;
                md_lastname = marriageData[i].FirstPersonLast?marriageData[i].FirstPersonLast:null;
                md_middlename = marriageData[i].FirstPersonMid?marriageData[i].FirstPersonMid:null;
                spouse_firstname = marriageData[i].SecondPersonFirst?marriageData[i].SecondPersonFirst:null;
                spouse_lastname = marriageData[i].SecondPersonLast?marriageData[i].SecondPersonLast:null;
                spouse_middlename = marriageData[i].SecondPersonMid?marriageData[i].SecondPersonMid:null;
                marriage_county = marriageData[i].marriageCounty?marriageData[i].marriageCounty:null;
                marriage_state = marriageData[i].state?marriageData[i].state:null;
                marriage_date = marriageData[i].MarriageDate?marriageData[i].MarriageDate:null;
                divorce_county = marriageData[i].divorceCounty?marriageData[i].divorceCounty:null;
                divorce_state = marriageData[i].state?marriageData[i].state:null;
                divorce_date = marriageData[i].DivorceDate?marriageData[i].DivorceDate:null;
                certificate_number = marriageData[i].certificateNumber?marriageData[i].certificateNumber:null;
                volume_number = marriageData[i].volumeNumber?marriageData[i].volumeNumber:null;
                decreetype = marriageData[i].decreetype?marriageData[i].decreetype:null;
                docketnumber = marriageData[i].docketnumber?marriageData[i].docketnumber:null;
        
                database.insert_md_data(md_firstname,md_lastname,md_middlename,spouse_firstname,spouse_lastname,spouse_middlename,marriage_county,marriage_state,marriage_date,divorce_county,divorce_state,divorce_date,certificate_number,volume_number,decreetype,docketnumber);
            }
            marriageApiCAllDone(apiArray);
        }

        if (jsonData.FDSResponse.searchResults.DivorceSearch !==''){
            for (let i =0; i < divorceData.length; i++) { 

                md_firstname = divorceData[i].FirstPersonFirst?divorceData[i].FirstPersonFirst:null;
                md_lastname = divorceData[i].FirstPersonLast?divorceData[i].FirstPersonLast:null;
                md_middlename = divorceData[i].FirstPersonMid?divorceData[i].FirstPersonMid:null;
                spouse_firstname = divorceData[i].SecondPersonFirst?divorceData[i].SecondPersonFirst:null;
                spouse_lastname = divorceData[i].SecondPersonLast?divorceData[i].SecondPersonLast:null;
                spouse_middlename = divorceData[i].SecondPersonMid?divorceData[i].SecondPersonMid:null;
                marriage_county = divorceData[i].marriageCounty?divorceData[i].marriageCounty:null;
                marriage_state = divorceData[i].state?divorceData[i].state:null;
                marriage_date = divorceData[i].MarriageDate?divorceData[i].MarriageDate:null;
                divorce_county = divorceData[i].divorceCounty?divorceData[i].divorceCounty:null;
                divorce_state = divorceData[i].state?divorceData[i].state:null;
                divorce_date = divorceData[i].DivorceDate?divorceData[i].DivorceDate:null;
                certificate_number = divorceData[i].certificateNumber?divorceData[i].certificateNumber:null;
                volume_number = divorceData[i].volumeNumber?divorceData[i].volumeNumber:null;
                decreetype = divorceData[i].decreetype?divorceData[i].decreetype:null;
                docketnumber = divorceData[i].docketnumber?divorceData[i].docketnumber:null;

                database.insert_md_data(md_firstname,md_lastname,md_middlename,spouse_firstname,spouse_lastname,spouse_middlename,marriage_county,marriage_state,marriage_date,divorce_county,divorce_state,divorce_date,certificate_number,volume_number,decreetype,docketnumber);
            }
            divorceApiCAllDone(apiArray);
        }
    });
};

function marriageApiCAllDone(apiArray){
    let arrayCopy = [...apiArray];
    arrayCopy.filter((item) => {
        if (item.marriage === 0) {
            item.marriage = 1;
        }
    });
}

function divorceApiCAllDone(apiArray){
    let arrayCopy = [...apiArray];
    arrayCopy.filter((item) => {
        if (item.divorce === 0) {
            item.divorce = 1;
        }
    });
}

module.exports ={
    getMDRecord
};