const parser = require('xml2json');
var unirest = require('unirest');
const database = require('./databaseConfig');
const showResult = require('./showResultsFromDatabase');
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
let phonenumber;

let cell_lastName;
let cell_middleName;
let cell_firstName;
let cell_dob;
let cell_fullStreet;
let cell_city;
let cell_state;
let cell_zip;
let cell_subdivisionName;
let cell_firstDate;
let cell_lastDate;
let cell_email;


let pLimit = 400;
// let pLimit = "unlimited";
let pCurrent = 300;

let cLimit = 400;
// let cLimit = "unlimited";
let cCurrent = 300;

function getDataByPhone(phone,phoneApiArray){
    if (cCurrent < cLimit || cLimit==="unlimited"){

        unirest.post('https://www.nationalpublicdata.com/feeds/FDSFeed.cfm')
        .header('Accept', 'application/json')
        .send({ "xml": "<FDSRequest><username>"+username+"</username><password>"+password+"</password><sType>CELNP</sType><detail>1</detail><testmode>false</testmode><searchParams><lastname></lastname><firstname></firstname><state></state><city></city><phone>"+phone+"</phone></searchParams></FDSRequest>" })
        .end(function (response) {
            if (response.body !==undefined){
                json = parser.toJson(response.body);
                jsonData = JSON.parse(json);
                data = jsonData.FDSResponse.searchResults.Cellphonesearch.Result;
                // console.log(json);
                database.insert_raw_json_cell(json);
                if (jsonData.FDSResponse.ResultCount >0){
                
                    for (let i =0; i < data.length; i++) { 
                        
                        if ((data[i].Names.rows > 1)){
                            for(let j =0; j < data[i].Names.Name.length; j++){
                                cell_lastName = data[i].Names.Name[j].lastName?data[i].Names.Name[j].lastName:null;
                                cell_middleName = data[i].Names.Name[j].middleName?data[i].Names.Name[j].middleName:null;
                                cell_firstName = data[i].Names.Name[j].firstName?data[i].Names.Name[j].firstName:null;
                                database.insert_cell_data_name(cell_firstName,cell_lastName,cell_middleName,phone);
                            }
                        }else{
                            cell_lastName = data[i].Names.Name.lastName?data[i].Names.Name.lastName:null;
                            cell_middleName = data[i].Names.Name.middleName?data[i].Names.Name.middleName:null;
                            cell_firstName = data[i].Names.Name.firstName?data[i].Names.Name.firstName:null;
                            database.insert_cell_data_name(cell_firstName,cell_middleName,cell_lastName);
                        }

                        if ((data[i].DOBs.rows > 1)){
                            for(let j =0; j < data[i].DOBs.DOB.length; j++){
                                cell_dob = data[i].DOBs.DOB[j]?data[i].DOBs.DOB[j]:null;
                                database.insert_cell_data_dob(cell_dob);
                            }
                        }else{
                            cell_dob = data[i].DOBs.DOB?data[i].DOBs.DOB:null;
                            database.insert_cell_data_dob(cell_dob);
                        }
        
                        if ((data[i].Addresses.rows > 1)){
                            for(let j =0; j < data[i].Addresses.Address.length; j++){
                                cell_fullStreet = data[i].Addresses.Address[j].fullStreet?data[i].Addresses.Address[j].fullStreet:null;
                                cell_city = data[i].Addresses.Address[j].city?data[i].Addresses.Address[j].city:null;
                                cell_state = data[i].Addresses.Address[j].state?data[i].Addresses.Address[j].state:null;
                                cell_zip = data[i].Addresses.Address[j].zip?data[i].Addresses.Address[j].zip:null;
                                cell_subdivisionName = data[i].Addresses.Address[j].subdivisionName?data[i].Addresses.Address[j].subdivisionName:null;
                                cell_firstDate = data[i].Addresses.Address[j].firstDate?data[i].Addresses.Address[j].firstDate:null;
                                cell_lastDate = data[i].Addresses.Address[j].lastDate?data[i].Addresses.Address[j].lastDate:null;
                                database.insert_cell_data_address(cell_fullStreet,cell_city,cell_state,cell_zip,cell_subdivisionName,cell_firstDate,cell_lastDate);
                            }
                        }else{
                            cell_fullStreet = data[i].Addresses.Address.fullStreet?data[i].Addresses.Address.fullStreet:null;
                            cell_city = data[i].Addresses.Address.city?data[i].Addresses.Address.city:null;
                            cell_state = data[i].Addresses.Address.state?data[i].Addresses.Address.state:null;
                            cell_zip = data[i].Addresses.Address.zip?data[i].Addresses.Address.zip:null;
                            cell_subdivisionName = data[i].Addresses.Address.subdivisionName;
                            cell_firstDate = data[i].Addresses.Address.firstDate?data[i].Addresses.Address.firstDate:null;
                            cell_lastDate = data[i].Addresses.Address.lastDate?data[i].Addresses.Address.lastDate:null;
                            database.insert_cell_data_address(cell_fullStreet,cell_city,cell_state,cell_zip,cell_subdivisionName,cell_firstDate,cell_lastDate);

                        }
                          
                        if ((data[i].Emails.rows > 1)){
                            for(let j =0; j < data[i].Emails.email.length; j++){
                                cell_email = data[i].Emails.email[j]?data[i].Emails.email[j]:null;
                                database.insert_cell_data_email(cell_email);
                            }
                        }else{
                            cell_email = data[i].Emails.email?data[i].Emails.email:null;
                            database.insert_cell_data_email(cell_email);
                        }
                       
                    }
                }else{
                    cellApiDone(phoneApiArray);
                }
            }else{
                cellApiDone(phoneApiArray);
            }
        });
    }else{
        cellApiDone(phoneApiArray);
    }

    if (pCurrent < pLimit || pLimit==="unlimited"){

        unirest.post('https://www.nationalpublicdata.com/feeds/FDSFeed.cfm')
        .header('Accept', 'application/json')
        .send({ "xml": "<FDSRequest><username>"+username+"</username><password>"+password+"</password><sType>PFPHN</sType><detail>1</detail><testmode>false</testmode><searchParams><phonenumber>"+phone+"</phonenumber></searchParams></FDSRequest>" })
        .end(function (response) {
            json = parser.toJson(response.body);
            // console.log(json);
            jsonData = JSON.parse(json);
            data = jsonData.FDSResponse.searchResults.PeopleFinderbyAddress.Result;


            database.insert_raw_json_phone(json);
            // if (jsonData.FDSResponse.searchResults.PeopleFinderbyAddress !==''){
            if (jsonData.FDSResponse.ResultCount >0){
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
                    phonenumber = data[i].Phone?data[i].Phone:null;

                    database.insert_phone_data(phone_firstname,phone_lastname,phone_middlename,phone_dob,phone_address,phone_city,phone_state,phone_zip,phone_county,phonenumber);
                    
                }
                
            }else{
                phoneApiDone(phoneApiArray);
            }
        });
    }else{
        phoneApiDone(phoneApiArray);
    }
    

};

function cellApiDone(phoneApiArray){
    phoneApiArray.cell = 1;
}

function phoneApiDone(phoneApiArray){
    phoneApiArray.phone = 1;
}


module.exports ={
    getDataByPhone
};

