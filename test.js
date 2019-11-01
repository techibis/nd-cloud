const database = require('./databaseConfig');
const showResult = require('./showResultsFromDatabase');


database.findNameInDatabase(phone_firstname,phone_lastname,function(result){
    if(result.length==0){

        database.searchedPerson(phone_firstname,phone_lastname,'','');
        let apiArray =[0,0,0,0,0];
        let counter =0;
        getPersonData.getDataByName(phone_firstname, phone_lastname, peopleApiCAllDone)

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




let sql = "INSERT INTO criminal_record ("
    if(phone_firstname!=null && typeof phone_firstname!=='object') sql+="phone_firstname,";
    if(phone_lastname!=null && typeof phone_lastname!=='object') sql+="phone_lastname,";
    if(phone_middlename!=null && typeof phone_middlename!=='object') sql+="phone_middlename,";
    if(generation!=null && typeof generation !== 'object') sql+="generation,";
    if(dob!=null && typeof dob !== 'object') sql+="dob,";
    if(birth_phone_state!=null && typeof birth_phone_state !=='object') sql+="birth_phone_state,";
    if(age!=null && typeof age!=='object') sql+="age,";
    if(casenumber!=null && typeof casenumber!=='object') sql+="casenumber,";
    if(aka1!=null && typeof aka1!=='object') sql+="aka1,";
    if(aka2!=null && typeof aka2!=='object') sql+="aka2,";
    if(dobaka!=null && typeof dobaka!== 'object') sql+="dobaka,";
    if(address!=null && typeof address !== 'object') sql+="address,";
    if(address2!=null && typeof address2 !=='object') sql+="address2,";
    if(city!=null && typeof city!=='object') sql+="city,";
    if(phone_state!=null && typeof phone_state!=='object') sql+="phone_state,";
    if(zip!=null && typeof zip!=='object') sql+="zip,";
    if(haircolor!=null && typeof haircolor!=='object') sql+="haircolor,";
    if(eyecolor!=null && typeof eyecolor !=='object') sql+="eyecolor,";
    if(height!=null && typeof height !=='object') sql+="height,";
    if(weight!=null && typeof weight !== 'object') sql+="weight,";
    if(race!=null && typeof race !== 'object') sql+="race,";
    if(sex!=null && typeof sex !=='object') sql+="sex,";
    if(skintone!=null && typeof skintone!=='object') sql+="skintone,";
    if(scarsmarks!=null && typeof scarsmarks!=='object') sql+="scarsmarks,";
    if(military_service!=null && typeof military_service!=='object') sql+="military_service,";
    if(charge_category!=null && typeof charge_category!=='object') sql+="charge_category,";
    if(charges_filed_date!=null && typeof charges_filed_date!== 'object') sql+="charges_filed_date,";
    if(offense_date!=null && typeof offense_date !== 'object') sql+="offense_date,";
    if(offense_code!=null && typeof offense_code !=='object') sql+="offense_code,";
    if(offensedescription1!=null && typeof offensedescription1!=='object') sql+="offensedescription1,";
    if(offensedescription2!=null && typeof offensedescription2!=='object') sql+="offensedescription2,";
    if(ncic_code!=null && typeof ncic_code!=='object') sql+="ncic_code,";
    if(counts!=null && typeof counts!=='object') sql+="counts,";
    if(plea!=null && typeof plea !=='object') sql+="plea,";
    if(conviction_date!=null && typeof conviction_date !=='object') sql+="conviction_date,";
    if(conviction_place!=null && typeof conviction_place !== 'object') sql+="conviction_place,";
    if(court!=null && typeof court !== 'object') sql+="court,";
    if(source!=null && typeof source !=='object') sql+="source,";
    if(sentenceyyymmddd!=null && typeof sentenceyyymmddd!=='object') sql+="sentenceyyymmddd,";
    if(probationyyymmddd!=null && typeof probationyyymmddd!=='object') sql+="probationyyymmddd,";
    if(disposition!=null && typeof disposition!=='object') sql+="disposition,";
    if(crb!=null && typeof crb!=='object') sql+="crb,";
    if(dispositiondate!=null && typeof dispositiondate!== 'object') sql+="dispositiondate,";
    if(court_costs!=null && typeof court_costs !== 'object') sql+="court_costs,";
    if(arresting_agency!=null && typeof arresting_agency !=='object') sql+="arresting_agency,";
    if(case_type!=null && typeof case_type!=='object') sql+="case_type,";
    if(fines!=null && typeof fines!=='object') sql+="fines,";
    if(source_name!=null && typeof source_name!=='object') sql+="source_name,";
    if(source_phone_state!=null && typeof source_phone_state!=='object') sql+="source_phone_state,";
    if(mugshot!=null && typeof mugshot !=='object') sql+="mugshot,";
    if(searchedPersonId!=null) sql+="searched_person_id) VALUES (";
    if(phone_firstname!=null && typeof phone_firstname !=='object') sql+="'"+phone_firstname+"',";
    if(phone_lastname!=null && typeof phone_lastname !=='object') sql+="'"+phone_lastname+"',";
    if(phone_middlename!=null && typeof phone_middlename !=='object') sql+="'"+phone_middlename+"',";
    if(generation!=null && typeof generation!=='object') sql+="'"+generation+"',";
    if(dob!=null && typeof dob !== 'object') sql+="'"+dob+"',";
    if(birth_phone_state!=null && typeof birth_phone_state !== 'object') sql+="'"+birth_phone_state+"',";
    if(age!=null && typeof age!=='object') sql+="'"+age+"',";
    if(casenumber!=null && typeof casenumber!=='object') sql+="'"+casenumber+"',";
    if(aka1!=null && typeof aka1!=='object') sql+="'"+aka1+"',";
    if(aka2!=null && typeof aka2!=='object') sql+="'"+aka2+"',";
    if(dobaka!=null && typeof dobaka!=='object') sql+="'"+dobaka+"',";
    if(address!=null && typeof address!== 'object') sql+="'"+address+"',";
    if(address2!=null && typeof address2 !== 'object') sql+="'"+address2+"',";
    if(city!=null && typeof city!=='object') sql+="'"+city+"',";
    if(phone_state!=null && typeof phone_state!=='object') sql+="'"+phone_state+"',";
    if(zip!=null && typeof zip!=='object') sql+="'"+zip+"',";
    if(haircolor!=null && typeof haircolor !=='object') sql+="'"+haircolor+"',";
    if(eyecolor!=null && typeof eyecolor !=='object') sql+="'"+eyecolor+"',";
    if(height!=null && typeof height !=='object') sql+="'"+height+"',";
    if(weight!=null && typeof weight!=='object') sql+="'"+weight+"',";
    if(race!=null && typeof race !== 'object') sql+="'"+race+"',";
    if(sex!=null && typeof sex !== 'object') sql+="'"+sex+"',";
    if(skintone!=null && typeof skintone!=='object') sql+="'"+skintone+"',";
    if(scarsmarks!=null && typeof scarsmarks!=='object') sql+="'"+scarsmarks+"',";
    if(military_service!=null && typeof military_service!=='object') sql+="'"+military_service+"',";
    if(charge_category!=null && typeof charge_category!=='object') sql+="'"+charge_category+"',";
    if(charges_filed_date!=null && typeof charges_filed_date!=='object') sql+="'"+charges_filed_date+"',";
    if(offense_date!=null && typeof offense_date!== 'object') sql+="'"+offense_date+"',";
    if(offense_code!=null && typeof offense_code !== 'object') sql+="'"+offense_code+"',";
    if(offensedescription1!=null && typeof offensedescription1!=='object') sql+="'"+offensedescription1+"',";
    if(offensedescription2!=null && typeof offensedescription2!=='object') sql+="'"+offensedescription2+"',";
    if(ncic_code!=null && typeof ncic_code!=='object') sql+="'"+ncic_code+"',";
    if(counts!=null && typeof counts !=='object') sql+="'"+counts+"',";
    if(plea!=null && typeof plea !=='object') sql+="'"+plea+"',";
    if(conviction_date!=null && typeof conviction_date !=='object') sql+="'"+conviction_date+"',";
    if(conviction_place!=null && typeof conviction_place!=='object') sql+="'"+conviction_place+"',";
    if(court!=null && typeof court !== 'object') sql+="'"+court+"',";
    if(source!=null && typeof source !== 'object') sql+="'"+source+"',";
    if(sentenceyyymmddd!=null && typeof sentenceyyymmddd!=='object') sql+="'"+sentenceyyymmddd+"',";
    if(probationyyymmddd!=null && typeof probationyyymmddd!=='object') sql+="'"+probationyyymmddd+"',";
    if(disposition!=null && typeof disposition!=='object') sql+="'"+disposition+"',";
    if(crb!=null && typeof crb!=='object') sql+="'"+crb+"',";
    if(dispositiondate!=null && typeof dispositiondate!=='object') sql+="'"+dispositiondate+"',";
    if(court_costs!=null && typeof court_costs!== 'object') sql+="'"+court_costs+"',";
    if(arresting_agency!=null && typeof arresting_agency !== 'object') sql+="'"+arresting_agency+"',";
    if(case_type!=null && typeof case_type!=='object') sql+="'"+case_type+"',";
    if(fines!=null && typeof fines!=='object') sql+="'"+fines+"',";
    if(source_name!=null && typeof source_name!=='object') sql+="'"+source_name+"',";
    if(source_phone_state!=null && typeof source_phone_state !=='object') sql+="'"+source_phone_state+"',";
    if(mugshot!=null && typeof mugshot !=='object') sql+="'"+mugshot+"',";
    if(searchedPersonId!=null) sql+="'"+searchedPersonId+"')";



    
    let sql = "INSERT INTO phone_data ("
    if(phone_firstname!=null && typeof phone_firstname!=='object') sql+="phone_firstname,";
    if(phone_lastname!=null && typeof phone_lastname !=='object') sql+="phone_lastname,";
    if(phone_middlename!=null && typeof phone_middlename !=='object') sql+="phone_middlename,";
    if(phone_dob!=null && typeof phone_dob !== 'object') sql+="phone_dob,";
    if(phone_address!=null && typeof phone_address !== 'object') sql+="phone_address,";
    if(phone_city!=null && typeof phone_city !=='object') sql+="phone_city,";
    if(phone_state!=null && typeof phone_state!=='object') sql+="phone_state,";
    if(phone_zip!=null && typeof phone_zip!=='object') sql+="phone_zip,";
    if(phone_county!=null && typeof phone_county!=='object') sql+="phone_county,";
    if(searchedPersonId!=null) sql+="searched_person_id) VALUES (";
    if(phone_firstname!=null && typeof phone_firstname !=='object') sql+="'"+phone_firstname+"',";
    if(phone_lastname!=null && typeof phone_lastname !=='object') sql+="'"+phone_lastname+"',";
    if(phone_middlename!=null && typeof phone_middlename !=='object') sql+="'"+phone_middlename+"',";
    if(phone_dob!=null && typeof phone_dob!=='object') sql+="'"+phone_dob+"',";
    if(phone_address!=null && typeof phone_address !== 'object') sql+="'"+phone_address+"',";
    if(phone_city!=null && typeof phone_city !== 'object') sql+="'"+phone_city+"',";
    if(phone_state!=null && typeof phone_state !=='object') sql+="'"+phone_state+"',";
    if(phone_zip!=null && typeof phone_zip !=='object') sql+="'"+phone_zip+"',";
    if(phone_county!=null && typeof phone_county!=='object') sql+="'"+phone_county+"',";
    
    if(searchedPersonId!=null) sql+="'"+searchedPersonId+"')";