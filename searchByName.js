const database = require('./databaseConfig');

let jsonData;
let data;
let data_id;
let db;
let state;
let state_name;
let full_name;
let dob;
let race;
let eyes;
let hair;
let height;
let weight;
let image;
let sex;
let country;
let address;
let crime_type;
let sentence;
let type;
let personal_sign;
let last_update;

function getDataByName(data){
    if ('person' in (data.results)){
        for (let i =0; i < data.results.person.length; i++) { 
          data_id = data.results.person[i].id;
          db = data.results.person[i].db;
          state = data.results.person[i].state;
          state_name = data.results.person[i].state_name;
          full_name = data.results.person[i].full_name;
          dob = data.results.person[i].dob;
          race = data.results.person[i].race;
          sex = data.results.person[i].sex;
          height  = data.results.person[i].height;
          weight = data.results.person[i].weight;
          hair = data.results.person[i].hair;
          eyes = data.results.person[i].eyes;
          image = data.results.person[i].image;
          address = data.results.person[i].address;
          country = data.results.person[i].county;
          crime_type = data.results.person[i].crime;
          sentence = data.results.person[i].sentence;
          personal_sign = data.results.person[i].personal;
          last_update= data.results.person[i].last_update;
          type = data.results.person[i].type;

          if (typeof crime_type === "object"){
            crime_type = JSON.stringify(crime_type);
          }

          database.insert_persons_data(data_id,db,state,state_name,full_name,dob,race,eyes,hair,height,weight,image,sex,country,address,crime_type,sentence,type,personal_sign,last_update)

        }
    }
}

module.exports ={
    getDataByName
};
