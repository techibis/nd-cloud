const database = require('./databaseConfig');

class Resultrecord{
    constructor (firstName,lastName,middleName,age,state,locations,background,death,divorce,contact,dataId,database){
      this.firstName = firstName;
      this.lastName = lastName;
      this.middleName = middleName;
      this.age = age;
      this.state = state;
      this.locations = locations;
      this.background = background;
      this.death = death;
      this.divorce = divorce;
      this.contact = contact;
      this.dataId = dataId;
      this.database = database;
    }
}
  
let resultData = new Array();


function showPersonsDatafromDatabase(firstName,lastName,callback){

    database.showSearchedPersonData(firstName,lastName, function(result){
        let dataId = '';

        for (let i=0;i<result.length;i++){
            if(i>0){
            dataId += ','; 
            }
            dataId += result[i].id;
            // console.log(dataId);
        }
        database.showPersonsTeasure(dataId, function(result){
            if (result){
                for (let i=0;i<result.length;i++){
                    resultData.push(new Resultrecord(
                    result[i].firstName,
                    result[i].lastName,
                    result[i].middleName,
                    result[i].age,
                    result[i].state,
                    result[i].locations,
                    'N/A',
                    'N/A',
                    'N/A',
                    result[i].contact,
                    result[i].id,
                    'Person'
                    ));
                }

            }
        })
        database.showEmailTeasure(dataId, function(result){
            if(result){
                for (let i=0;i<result.length;i++){
                    resultData.push(new Resultrecord(
                    result[i].emailData_firstName,
                    result[i].emailData_lastName,
                    '',
                    'N/A',
                    'N/A',
                    result[i].emailData_location,
                    'N/A',
                    'N/A',
                    'N/A',
                    result[i].email,
                    result[i].id,
                    'Email'
                    ));
                }
            }
        })
        // database.showPhoneTeasure(dataId, function(result){
        //     if(result){
        //         for (let i=0;i<result.length;i++){
        //             resultData.push(new Resultrecord(
        //             result[i].emailData_firstName,
        //             result[i].emailData_lastName,
        //             result[i].emailData_middleName,
        //             'N/A',
        //             'N/A',
        //             result[i].emailData_location,
        //             'N/A',
        //             'N/A',
        //             'N/A',
        //             result[i].email,
        //             result[i].id,
        //             'Email'
        //             ));
        //         }
        //     }
        // })

        database.showBirthTeasure(dataId, function(result){
            if(result){
                for (let i=0;i<result.length;i++){
                    resultData.push(new Resultrecord(
                    result[i].birthRecord_firstName,
                    result[i].birthRecord_lastName,
                    result[i].birthRecord_middleName,
                    result[i].birthRecord_dob,
                    result[i].birthRecord_state,
                    result[i].birthRecord_country,
                    'N/A',
                    'N/A',
                    'N/A',
                    'N/A',
                    result[i].id,
                    'Birth'
                    ));
                }
            };
            return callback(resultData);
        });

    })

}


module.exports ={
    showPersonsDatafromDatabase
};
        