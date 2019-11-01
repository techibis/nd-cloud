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
let generation;
let dob;
let birth_state;
let age;
let casenumber;
let aka1;
let aka2;
let dobaka;
let address;
let address2;
let city;
let state;
let zip;
let haircolor;
let eyecolor;
let height;
let weight;
let race;
let sex;
let skintone;
let scarsmarks;
let military_service;
let charge_category;
let charges_filed_date;
let offense_date;
let offense_code;
let offensedescription1;
let offensedescription2;
let ncic_code;
let counts;
let plea;
let conviction_date;
let conviction_place;
let court;
let source;
let sentenceyyymmddd;
let probationyyymmddd;
let disposition;
let crb;
let dispositiondate;
let court_costs;
let arresting_agency;
let case_type;
let fines;
let source_name;
let source_state;
let mugshot;



function getCriminalRecord(firstName,lastName,apiArray){
    unirest.post('https://www.nationalpublicdata.com/feeds/FDSFeed.cfm')
    .header('Accept', 'application/json')
    .send({ "xml": "<FDSRequest><username>"+username+"</username><password>"+password+"</password><sType>CRLMG</sType><detail>1</detail><testmode>false</testmode><searchParams><LastName>"+lastName+"</LastName><FirstName>"+firstName+"</FirstName><State></State><DOB></DOB></searchParams></FDSRequest>" })
    .end(function (response) {
        json = parser.toJson(response.body);
        // console.log(json);
        jsonData = JSON.parse(json);
        data = jsonData.FDSResponse.searchResults.CriminalSearch.Result;
        let text = "This is a huge text and i cant insert that into database";

        database.insert_raw_json_criminalchecks(text);

        if (jsonData.FDSResponse.searchResults.CriminalSearch !==''){
            for (let i =0; i < data.length; i++) { 

                firstname = data[i].firstname?data[i].firstname:null;
                lastname = data[i].lastname?data[i].lastname:null;
                middlename = data[i].middlename?data[i].middlename:null;
                generation = data[i].generation?data[i].generation:null;
                dob = data[i].dob?data[i].dob:null;
                birth_state = data[i].birthState?data[i].birthState:null;
                age = data[i].age?data[i].age:null;
                casenumber = data[i].casenumber?data[i].casenumber:null;
                aka1 = data[i].AKA1?data[i].AKA1:null;
                aka2 = data[i].AKA2?data[i].AKA2:null;
                dobaka = data[i].DOBAKA?data[i].DOBAKA:null;
                address = data[i].address?data[i].address:null;
                address2 = data[i].address2?data[i].address2:null;
                city = data[i].city?data[i].city:null;
                state = data[i].state?data[i].state:null;
                zip = data[i].zip?data[i].zip:null;
                haircolor = data[i].haircolor?data[i].haircolor:null;
                eyecolor = data[i].eyecolor?data[i].eyecolor:null;
                height = data[i].height?data[i].height:null;
                weight = data[i].weight?data[i].weight:null;
                race = data[i].race?data[i].race:null;
                sex = data[i].sex?data[i].sex:null;
                skintone = data[i].skintone?data[i].skintone:null;
                scarsmarks = data[i].scarsmarks?data[i].scarsmarks:null;
                military_service = data[i].MilitaryService?data[i].MilitaryService:null;
                charge_category = data[i].ChargeCategory?data[i].ChargeCategory:null;
                charges_filed_date = data[i].ChargesFiledDate?data[i].ChargesFiledDate:null;
                offense_date = data[i].OffenseDate?data[i].OffenseDate:null;
                offense_code = data[i].OffenseCode?data[i].OffenseCode:null;
                offensedescription1 = data[i].offensedescription1?data[i].offensedescription1:null;
                offensedescription2 = data[i].offensedescription2?data[i].offensedescription2:null;
                ncic_code = data[i].NCICCode?data[i].NCICCode:null;
                counts = data[i].Counts?data[i].Counts:null;
                plea = data[i].Plea?data[i].Plea:null;
                conviction_date = data[i].ConvictionDate?data[i].ConvictionDate:null;
                conviction_place = data[i].ConvictionPlace?data[i].ConvictionPlace:null;
                court = data[i].court?data[i].court:null;
                source = data[i].source?data[i].source:null;
                sentenceyyymmddd = data[i].SentenceYYYMMDDD?data[i].SentenceYYYMMDDD:null;
                probationyyymmddd = data[i].ProbationYYYMMDDD?data[i].ProbationYYYMMDDD:null;
                disposition = data[i].Disposition?data[i].Disposition:null;
                crb = data[i].CRB?data[i].CRB:null;
                dispositiondate = data[i].Dispositiondate?data[i].Dispositiondate:null;
                court_costs = data[i].CourtCosts?data[i].CourtCosts:null;
                arresting_agency = data[i].ArrestingAgency?data[i].ArrestingAgency:null;
                case_type = data[i].caseType?data[i].caseType:null;
                fines = data[i].Fines?data[i].Fines:null;
                source_name = data[i].SourceName?data[i].SourceName:null;
                source_state = data[i].SourceState?data[i].SourceState:null;
                mugshot = data[i].mugshot?data[i].mugshot:null;

                database.insert_criminal_data(firstname,lastname,middlename,generation,dob,birth_state,age,casenumber,aka1,aka2,dobaka,address,address2,city,state,zip,haircolor,eyecolor,height,weight,race,sex,skintone,scarsmarks,military_service,charge_category,charges_filed_date,offense_date,offense_code,offensedescription1,offensedescription2,ncic_code,counts,plea,conviction_date,conviction_place,court,source,sentenceyyymmddd,probationyyymmddd,disposition,crb,dispositiondate,court_costs,arresting_agency,case_type,fines,source_name,source_state,mugshot);
            }
            criminalApiCAllDone(apiArray);
        }
    });
};

function criminalApiCAllDone(apiArray){
    let arrayCopy = [...apiArray];
    arrayCopy.filter((item) => {
        if (item.criminal === 0) {
            item.criminal = 1;
        }
    });
}

module.exports ={
    getCriminalRecord
};