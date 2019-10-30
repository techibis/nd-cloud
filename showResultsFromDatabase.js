const database = require('./databaseConfig');

class Resultrecord{
    constructor (firstName,lastName,age,state,locations,background,death,divorce,contact,dataId,database){
      this.firstName = firstName;
      this.lastName = lastName;
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

function showPersonsDatafromDatabase(firstName,lastName,res){
    console.log(firstName);
    database.showSearchedPersonData(firstName,lastName, function(result){
        let dataId = '';

        for (let i=0;i<result.length;i++){
            if(i>0){
            dataId += ','; 
            }
            dataId += result[i].id;
            console.log(dataId);
        }
        database.showPersonsTeasure(dataId, function(result){
            if (result){
                for (let i=0;i<result.length;i++){
                    resultData.push(new Resultrecord(
                    result[i].firstName,
                    result[i].lastName,
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
                res.render('teasure', {data:resultData});
            }
        })

       
    })

}


module.exports ={
    showPersonsDatafromDatabase
};
        