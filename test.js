const database = require('./databaseConfig');
const showResult = require('./showResultsFromDatabase');


database.findNameInDatabase(firstName,lastName,function(result){
    if(result.length==0){

        database.searchedPerson(firstName,lastName,'','');
        let apiArray =[0,0,0,0,0];
        let counter =0;
        getPersonData.getDataByName(firstName, lastName, peopleApiCAllDone)

        var interval = setInterval(checkIfDone, 200);
        function checkIfDone(apiArray, counter){ 
            counter +=1;
            if (apiArray[0]+apiArray[1]+apiArray[2]+apiArray[3]+apiArray[4]==1|| counter==10)
            myStopFunction();
            showResult.findNameInDatabase();
        };

        function myStopFunction() {
            clearInterval(interval);
        }
    }
})


function peopleApiCAllDone(apiArray){
    apiArray[0]=1;
}
function criminalApiCAllDone(apiArray){
    apiArray[1]=1;
}
function birthApiCAllDone(apiArray){
    apiArray[2]=1;
}
function deathApiCAllDone(apiArray){
    apiArray[3]=1;
}
function divorceApiCAllDone(apiArray){
    apiArray[4]=1;
}