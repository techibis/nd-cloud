const mysql = require('mysql');
const moment = require('moment');
let currentTimestamp = moment().unix();
let currentDatetime = moment(currentTimestamp*1000).format("YYYY-MM-DD HH:mm:ss");
let searchedPersonId;



let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"public_record"
});


function searchedPerson(firstName, lastName, email, phone){
    let sql = "INSERT INTO searched_person ("
    if(firstName!=null) sql+="first_name,";
    if(lastName!=null) sql+="last_name,";
    if(email!=null) sql+="email,";
    if(phone!=null) sql+="phone,";
    sql+="time) VALUES (";
    if(firstName!=null) sql+="'"+firstName+"',";
    if(lastName!=null) sql+="'"+lastName+"',";
    if(email!=null) sql+="'"+email+"',";
    if(phone!=null) sql+="'"+phone+"',";
    sql+="'"+currentDatetime+"')";

    con.query(sql, function (err, result) {
        if (err) { throw err; }
        else {
            searchedPersonId = result.insertId;
        }
    });
}

function updateSearchedPersonByEmail(firstName,lastName,email){
    let sql = "UPDATE searched_person SET first_name = '"+firstName+"', last_name= '"+lastName+"' where email='"+email+"'";
    con.query(sql, function (err, result) {
    if (err) {throw err;}
    });
}


function findNameInDatabase(firstName, lastName,callback) {
    let sql = "SELECT * from searched_person where first_name='"+firstName+"' and last_name= '"+lastName+"'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function findEmailInDatabase(email,callback) {
    let sql = "SELECT * from searched_person where email='"+email+"'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function findPhoneInDatabase(phoneNumber,callback) {
    let sql = "SELECT * from searched_person where phone='"+phoneNumber+"'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        return callback(result);
    });
}

function insert_raw_json_name(jsonData){
    let sql = "INSERT INTO raw_json_name (person_data_json,data_source,searched_person_id) VALUES ('"+jsonData+"','Background Checks','"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
    if (err) throw err;
    
    });
}

function insert_persons_data(person_firstName,person_lastName,person_middleName,person_dob,person_address,person_city,person_state,person_zip,person_county,person_phone){
    let sql = "INSERT INTO persons ("
    if(person_firstName!=null && typeof person_firstName !=='object') sql+="firstName,";
    if(person_lastName!=null && typeof person_lastName !=='object') sql+="lastName,";
    if(person_middleName!=null && typeof person_middleName !=='object') sql+="middleName,";
    if(person_dob!=null && typeof person_dob !=='object') sql+="dob,";
    if(person_address!=null && typeof person_address !== 'object') sql+="address,";
    if(person_city!=null && typeof person_city !== 'object') sql+="city,";
    if(person_state!=null && typeof person_state !=='object') sql+="state,";
    if(person_zip!=null && typeof person_zip !=='object') sql+="zip,";
    if(person_county!=null && typeof person_county !=='object') sql+="county,";
    if(person_phone!=null && typeof person_phone !=='object') sql+="phone,";
    if(searchedPersonId!=null) sql+="searched_person_id) VALUES (";
    if(person_firstName!=null && typeof person_firstName !=='object') sql+="'"+person_firstName+"',";
    if(person_lastName!=null && typeof person_lastName !=='object') sql+=" '"+person_lastName+"',";
    if(person_middleName!=null && typeof person_middleName !=='object') sql+="'"+person_middleName+"',";
    if(person_dob!=null && typeof person_dob !=='object') sql+=" '"+person_dob+"',";
    if(person_address!=null && typeof person_address !== 'object') sql+="'"+person_address+"',";
    if(person_city!=null && typeof person_city !== 'object') sql+=" '"+person_city+"',";
    if(person_state!=null && typeof person_state !=='object') sql+="'"+person_state+"',";
    if(person_zip!=null && typeof person_zip !=='object') sql+=" '"+person_zip+"',";
    if(person_county!=null && typeof person_county !=='object') sql+="'"+person_county+"',";
    if(person_phone!=null && typeof person_phone !=='object') sql+=" '"+person_phone+"',";
    if(searchedPersonId!=null) sql+="'"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
}

function insert_raw_json_cell(cell_data_json){
    let sql = "INSERT INTO raw_json_cell (cell_data_json,data_source,searched_person_id,time) VALUES ('"+cell_data_json+"','Cell Phone Number Lookup','"+searchedPersonId+"', '"+currentDatetime+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
}

function insert_cell_data_name(cell_firstName,cell_lastName,cell_middleName,phone){
    let sql = "INSERT INTO cell_data_name ("
    if(cell_firstName!=null && typeof cell_firstName!=='object') sql+="cell_firstName,";
    if(cell_lastName!=null && typeof cell_lastName !=='object') sql+="cell_lastName,";
    if(cell_middleName!=null && typeof cell_middleName !=='object') sql+="cell_middleName,";
    if(phone!=null && typeof phone !=='object') sql+="cellPhone,";
    if(searchedPersonId!=null) sql+="searched_person_id) VALUES (";
    if(cell_firstName!=null && typeof cell_firstName !=='object') sql+="'"+cell_firstName+"',";
    if(cell_lastName!=null && typeof cell_lastName !=='object') sql+="'"+cell_lastName+"',";
    if(cell_middleName!=null && typeof cell_middleName !=='object') sql+="'"+cell_middleName+"',";
    if(phone!=null && typeof phone !=='object') sql+="'"+phone+"',";
    if(searchedPersonId!=null) sql+="'"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
}

function insert_cell_data_dob(cell_dob){
    let sql = "INSERT INTO cell_data_dob ("
    if(cell_dob!=null && typeof cell_dob!=='object') sql+="cell_dob,";
    if(searchedPersonId!=null) sql+="searched_person_id) VALUES (";
    if(cell_dob!=null && typeof cell_dob !=='object') sql+="'"+cell_dob+"',";
    if(searchedPersonId!=null) sql+="'"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
}

function insert_cell_data_email(cell_email){
    let sql = "INSERT INTO cell_data_email ("
    if(cell_email!=null && typeof cell_email!=='object') sql+="cell_email,";
    if(searchedPersonId!=null) sql+="searched_person_id) VALUES (";
    if(cell_email!=null && typeof cell_email !=='object') sql+="'"+cell_email+"',";
    if(searchedPersonId!=null) sql+="'"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
}

function insert_cell_data_address(cell_fullStreet,cell_city,cell_state,cell_zip,cell_subdivisionName,cell_firstDate,cell_lastDate){
    let sql = "INSERT INTO cell_data_address ("
    if(cell_fullStreet!=null && typeof cell_fullStreet!=='object') sql+="cell_fullStreet,";
    if(cell_city!=null && typeof cell_city !=='object') sql+="cell_city,";
    if(cell_state!=null && typeof cell_state !=='object') sql+="cell_state,";
    if(cell_zip!=null && typeof cell_zip !== 'object') sql+="cell_zip,";
    if(cell_subdivisionName!=null && typeof cell_subdivisionName !== 'object') sql+="cell_subdivisionName,";
    if(cell_firstDate!=null && typeof cell_firstDate!=='object') sql+="cell_firstDate,";
    if(cell_lastDate!=null && typeof cell_lastDate !=='object') sql+="cell_lastDate,";
    if(searchedPersonId!=null) sql+="searched_person_id) VALUES (";
    if(cell_fullStreet!=null && typeof cell_fullStreet !=='object') sql+="'"+cell_fullStreet+"',";
    if(cell_city!=null && typeof cell_city !=='object') sql+="'"+cell_city+"',";
    if(cell_state!=null && typeof cell_state !=='object') sql+="'"+cell_state+"',";
    if(cell_zip!=null && typeof cell_zip!=='object') sql+="'"+cell_zip+"',";
    if(cell_subdivisionName!=null && typeof cell_subdivisionName !== 'object') sql+="'"+cell_subdivisionName+"',";
    if(cell_firstDate!=null && typeof cell_firstDate !=='object') sql+="'"+cell_firstDate+"',";
    if(cell_lastDate!=null && typeof cell_lastDate !=='object') sql+="'"+cell_lastDate+"',";
    if(searchedPersonId!=null) sql+="'"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
}

function insert_raw_json_phone(phoneData_str){
    let sql = "INSERT INTO raw_json_phone (phone_data_json,data_source,searched_person_id,time) VALUES ('"+phoneData_str+"','Phone Number Lookup','"+searchedPersonId+"', '"+currentDatetime+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
}

function insert_phone_data(phone_firstname,phone_lastname,phone_middlename,phone_dob,phone_address,phone_city,phone_state,phone_zip,phone_county,phone){
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
    if(phone!=null && typeof phone!=='object') sql+="phone,";
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
    if(phone!=null && typeof phone!=='object') sql+="'"+phone+"',";
    if(searchedPersonId!=null) sql+="'"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
}

function insert_raw_json_email(emailData){
    let sql = "INSERT INTO raw_json_email (email_data_json,data_source,searched_person_id) VALUES ('"+emailData+"','Email Address Lookup','"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
}

function insert_email_data(emailData_firstName,emailData_lastName,emailData_fullName,emailData_location,email){
    let sql = "INSERT INTO email_data ("
    if(emailData_firstName!=null && typeof emailData_firstName!=='object') sql+="emailData_firstname,";
    if(emailData_lastName!=null && typeof emailData_lastName !=='object') sql+="emailData_lastname,";
    if(emailData_fullName!=null && typeof emailData_fullName !=='object') sql+="emailData_fullname,";
    if(emailData_location!=null && typeof emailData_location !== 'object') sql+="emailData_location,";
    if(email!=null && typeof email !== 'object') sql+="email,";
    if(searchedPersonId!=null) sql+="searched_person_id) VALUES (";
    if(emailData_firstName!=null && typeof emailData_firstName !=='object') sql+="'"+emailData_firstName+"',";
    if(emailData_lastName!=null && typeof emailData_lastName !=='object') sql+="'"+emailData_lastName+"',";
    if(emailData_fullName!=null && typeof emailData_fullName !=='object') sql+="'"+emailData_fullName+"',";
    if(emailData_location!=null && typeof emailData_location!=='object') sql+="'"+emailData_location+"',";
    if(email!=null && typeof email !== 'object') sql+="'"+email+"',";
    if(searchedPersonId!=null) sql+="'"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
}

function insert_raw_json_birth(json){
    let sql = "INSERT INTO raw_json_birth (birth_data_json,data_source,searched_person_id) VALUES ('"+json+"','Birth Record Checks','"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
    if (err) throw err;
    });
}

function insert_birth_data(birthRecord_firstName,birthRecord_lastName,birthRecord_middleName,birthRecord_dob,birthRecord_gender,birthRecord_country,birthRecord_state){
    let sql = "INSERT INTO birth_record ("
    if(birthRecord_firstName!=null && typeof birthRecord_firstName !=='object') sql+="birthRecord_firstName,";
    if(birthRecord_lastName!=null && typeof birthRecord_lastName !=='object') sql+="birthRecord_lastName,";
    if(birthRecord_middleName!=null && typeof birthRecord_middleName !=='object') sql+="birthRecord_middleName,";
    if(birthRecord_dob!=null && typeof birthRecord_dob!=='object') sql+="birthRecord_dob,";
    if(birthRecord_gender!=null && typeof birthRecord_gender !== 'object') sql+="birthRecord_gender,";
    if(birthRecord_country!=null && typeof birthRecord_country !== 'object') sql+="birthRecord_country,";
    if(birthRecord_state!=null && typeof birthRecord_state !=='object') sql+="birthRecord_state,";
    if(searchedPersonId!=null) sql+="searched_person_id) VALUES (";
    if(birthRecord_firstName!=null && typeof birthRecord_firstName !=='object') sql+="'"+birthRecord_firstName+"',";
    if(birthRecord_lastName!=null && typeof birthRecord_lastName !=='object') sql+="'"+birthRecord_lastName+"',";
    if(birthRecord_middleName!=null && typeof birthRecord_middleName !=='object') sql+="'"+birthRecord_middleName+"',";
    if(birthRecord_dob!=null && typeof birthRecord_dob!=='object') sql+="'"+birthRecord_dob+"',";
    if(birthRecord_gender!=null && typeof birthRecord_gender !== 'object') sql+="'"+birthRecord_gender+"',";
    if(birthRecord_country!=null && typeof birthRecord_country !== 'object') sql+="'"+birthRecord_country+"',";
    if(birthRecord_state!=null && typeof birthRecord_state !=='object') sql+="'"+birthRecord_state+"',";
    if(searchedPersonId!=null) sql+="'"+searchedPersonId+"')";

    con.query(sql, function (err, result) {
      if (err) throw err;
    });
}

function insert_raw_json_death(json){
    let sql = "INSERT INTO raw_json_death (death_data_json,data_source,searched_person_id) VALUES ('"+json+"','Death Record Checks','"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
    if (err) throw err;
    });
}


function insert_death_data(firstname,lastname,middlename,DateofDeath,DateofBirth,lastcounty,State){
    let sql = "INSERT INTO death_record ("
    if(firstname!=null && typeof firstname!=='object') sql+="firstname,";
    if(lastname!=null && typeof lastname !=='object') sql+="lastname,";
    if(middlename!=null && typeof middlename !=='object') sql+="middlename,";
    if(DateofDeath!=null && typeof DateofDeath !== 'object') sql+="DateofDeath,";
    if(DateofBirth!=null && typeof DateofBirth !== 'object') sql+="DateofBirth,";
    if(lastcounty!=null && typeof lastcounty !=='object') sql+="lastcounty,";
    if(State!=null && typeof State!=='object') sql+="State,";
    if(searchedPersonId!=null) sql+="searched_person_id) VALUES (";
    if(firstname!=null && typeof firstname !=='object') sql+="'"+firstname+"',";
    if(lastname!=null && typeof lastname !=='object') sql+="'"+lastname+"',";
    if(middlename!=null && typeof middlename !=='object') sql+="'"+middlename+"',";
    if(DateofDeath!=null && typeof DateofDeath!=='object') sql+="'"+DateofDeath+"',";
    if(DateofBirth!=null && typeof DateofBirth !== 'object') sql+="'"+DateofBirth+"',";
    if(lastcounty!=null && typeof lastcounty !== 'object') sql+="'"+lastcounty+"',";
    if(State!=null && typeof State !=='object') sql+="'"+State+"',";
    if(searchedPersonId!=null) sql+="'"+searchedPersonId+"')";

    con.query(sql, function (err, result) {
      if (err) throw err;
    });
}

function insert_raw_json_md(json){
    let sql = "INSERT INTO raw_json_md (md_data_json,data_source,searched_person_id) VALUES ('"+json+"','Marriage/Divorce Record Checks','"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
    if (err) throw err;
    });
}

function insert_md_data(md_firstname,md_lastname,md_middlename,spouse_firstname,spouse_lastname,spouse_middlename,marriage_county,marriage_state,marriage_date,divorce_county,divorce_state,divorce_date,certificate_number,volume_number,decreetype,docketnumber){
    let sql = "INSERT INTO md_record ("
    if(md_firstname!=null && typeof md_firstname!=='object') sql+="md_firstname,";
    if(md_lastname!=null && typeof md_lastname !=='object') sql+="md_lastname,";
    if(md_middlename!=null && typeof md_middlename !=='object') sql+="md_middlename,";
    if(spouse_firstname!=null && typeof spouse_firstname !== 'object') sql+="spouse_firstname,";
    if(spouse_lastname!=null && typeof spouse_lastname !== 'object') sql+="spouse_lastname,";
    if(spouse_middlename!=null && typeof spouse_middlename !=='object') sql+="spouse_middlename,";
    if(marriage_county!=null && typeof marriage_county!=='object') sql+="marriage_county,";
    if(marriage_state!=null && typeof marriage_state!=='object') sql+="marriage_state,";
    if(marriage_date!=null && typeof marriage_date!=='object') sql+="marriage_date,";
    if(divorce_county!=null && typeof divorce_county!=='object') sql+="divorce_county,";
    if(divorce_state!=null && typeof divorce_state!== 'object') sql+="divorce_state,";
    if(divorce_date!=null && typeof divorce_date !== 'object') sql+="divorce_date,";
    if(certificate_number!=null && typeof certificate_number !=='object') sql+="certificate_number,";
    if(volume_number!=null && typeof volume_number!=='object') sql+="volume_number,";
    if(decreetype!=null && typeof decreetype!=='object') sql+="decreetype,";
    if(docketnumber!=null && typeof docketnumber!=='object') sql+="docketnumber,";
    if(searchedPersonId!=null) sql+="searched_person_id) VALUES (";
    if(md_firstname!=null && typeof md_firstname !=='object') sql+="'"+md_firstname+"',";
    if(md_lastname!=null && typeof md_lastname !=='object') sql+="'"+md_lastname+"',";
    if(md_middlename!=null && typeof md_middlename !=='object') sql+="'"+md_middlename+"',";
    if(spouse_firstname!=null && typeof spouse_firstname!=='object') sql+="'"+spouse_firstname+"',";
    if(spouse_lastname!=null && typeof spouse_lastname !== 'object') sql+="'"+spouse_lastname+"',";
    if(spouse_middlename!=null && typeof spouse_middlename !== 'object') sql+="'"+spouse_middlename+"',";
    if(marriage_county!=null && typeof marriage_county!=='object') sql+="'"+marriage_county+"',";
    if(marriage_state!=null && typeof marriage_state!=='object') sql+="'"+marriage_state+"',";
    if(marriage_date!=null && typeof marriage_date!=='object') sql+="'"+marriage_date+"',";
    if(divorce_county!=null && typeof divorce_county!=='object') sql+="'"+divorce_county+"',";
    if(divorce_state!=null && typeof divorce_state!=='object') sql+="'"+divorce_state+"',";
    if(divorce_date!=null && typeof divorce_date!== 'object') sql+="'"+divorce_date+"',";
    if(certificate_number!=null && typeof certificate_number !== 'object') sql+="'"+certificate_number+"',";
    if(volume_number!=null && typeof volume_number!=='object') sql+="'"+volume_number+"',";
    if(decreetype!=null && typeof decreetype!=='object') sql+="'"+decreetype+"',";
    if(docketnumber!=null && typeof docketnumber!=='object') sql+="'"+docketnumber+"',";
    if(searchedPersonId!=null) sql+="'"+searchedPersonId+"')";

    con.query(sql, function (err, result) {
      if (err) throw err;
      
    });
}

function insert_raw_json_criminalchecks(json){
    let sql = "INSERT INTO raw_json_criminalchecks (criminal_data_json,data_source,searched_person_id) VALUES ('"+json+"','Criminal Record Checks','"+searchedPersonId+"')";
    con.query(sql, function (err, result) {
    if (err) throw err;
    
    });
}

function insert_criminal_data(firstname,lastname,middlename,generation,dob,birth_state,age,casenumber,aka1,aka2,dobaka,address,address2,city,state,zip,haircolor,eyecolor,height,weight,race,sex,skintone,scarsmarks,military_service,charge_category,charges_filed_date,offense_date,offense_code,offensedescription1,offensedescription2,ncic_code,counts,plea,conviction_date,conviction_place,court,source,sentenceyyymmddd,probationyyymmddd,disposition,crb,dispositiondate,court_costs,arresting_agency,case_type,fines,source_name,source_state,mugshot){
    let sql = "INSERT INTO criminal_record ("
    if(firstname!=null && typeof firstname!=='object') sql+="firstname,";
    if(lastname!=null && typeof lastname!=='object') sql+="lastname,";
    if(middlename!=null && typeof middlename!=='object') sql+="middlename,";
    if(generation!=null && typeof generation !== 'object') sql+="generation,";
    if(dob!=null && typeof dob !== 'object') sql+="dob,";
    if(birth_state!=null && typeof birth_state !=='object') sql+="birth_state,";
    if(age!=null && typeof age!=='object') sql+="age,";
    if(casenumber!=null && typeof casenumber!=='object') sql+="casenumber,";
    if(aka1!=null && typeof aka1!=='object') sql+="aka1,";
    if(aka2!=null && typeof aka2!=='object') sql+="aka2,";
    if(dobaka!=null && typeof dobaka!== 'object') sql+="dobaka,";
    if(address!=null && typeof address !== 'object') sql+="address,";
    if(address2!=null && typeof address2 !=='object') sql+="address2,";
    if(city!=null && typeof city!=='object') sql+="city,";
    if(state!=null && typeof state!=='object') sql+="state,";
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
    if(source_state!=null && typeof source_state!=='object') sql+="source_state,";
    if(mugshot!=null && typeof mugshot !=='object') sql+="mugshot,";
    if(searchedPersonId!=null) sql+="searched_person_id) VALUES (";
    if(firstname!=null && typeof firstname !=='object') sql+="'"+firstname+"',";
    if(lastname!=null && typeof lastname !=='object') sql+="'"+lastname+"',";
    if(middlename!=null && typeof middlename !=='object') sql+="'"+middlename+"',";
    if(generation!=null && typeof generation!=='object') sql+="'"+generation+"',";
    if(dob!=null && typeof dob !== 'object') sql+="'"+dob+"',";
    if(birth_state!=null && typeof birth_state !== 'object') sql+="'"+birth_state+"',";
    if(age!=null && typeof age!=='object') sql+="'"+age+"',";
    if(casenumber!=null && typeof casenumber!=='object') sql+="'"+casenumber+"',";
    if(aka1!=null && typeof aka1!=='object') sql+="'"+aka1+"',";
    if(aka2!=null && typeof aka2!=='object') sql+="'"+aka2+"',";
    if(dobaka!=null && typeof dobaka!=='object') sql+="'"+dobaka+"',";
    if(address!=null && typeof address!== 'object') sql+="'"+address+"',";
    if(address2!=null && typeof address2 !== 'object') sql+="'"+address2+"',";
    if(city!=null && typeof city!=='object') sql+="'"+city+"',";
    if(state!=null && typeof state!=='object') sql+="'"+state+"',";
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
    if(source_state!=null && typeof source_state !=='object') sql+="'"+source_state+"',";
    if(mugshot!=null && typeof mugshot !=='object') sql+="'"+mugshot+"',";
    if(searchedPersonId!=null) sql+="'"+searchedPersonId+"')";

    con.query(sql, function (err, result) {
        if (err) throw err;
        
    });
}

function showSearchedPersonData(firstName,lastName,callback){
    let sql = "SELECT id,first_name,last_name,email,phone,(CASE WHEN email = '' THEN 0 ELSE 1 END) As 'Email',(CASE WHEN phone = '' THEN 0 ELSE 1 END) As 'Phone' from searched_person where first_name = '"+firstName+"' and last_name= '"+lastName+"'";
    con.query(sql, function (err, result) {
        if (err) throw err;
        return callback(result);
    });
}


function showPersonsTeasure(id,callback){
    let sql = "SELECT id, firstName,lastName,(CASE WHEN middleName IS NULL THEN '' ELSE middleName END) AS 'middleName',(CASE WHEN dob IS NULL THEN 'N/A' ELSE 1 END) AS 'age',(CASE WHEN state IS NULL THEN 'N/A' ELSE state END) AS 'state' , (CASE WHEN address IS NULL THEN 'N/A' ELSE 1 END) AS 'locations',(CASE WHEN phone IS NULL THEN 'N/A' ELSE 1 END) As 'contact' from persons where searched_person_id in ("+id+") GROUP BY firstName,lastName,middleName,age,state,locations,contact ORDER BY id ASC";

    con.query(sql, function (err, result) {

        if (err) throw err;

        return callback(result);
        // if (result.length>0){
        // }
    });
}

function showEmailTeasure(id,callback){
    let sql = "SELECT id,emailData_firstName,emailData_lastName,(CASE WHEN emailData_location IS NULL THEN 'N/A' ELSE 1 END) As 'emailData_location',(CASE WHEN email IS NULL THEN 'N/A' ELSE 1 END) AS 'email' from email_data where searched_person_id in ("+id+") GROUP BY emailData_firstName,emailData_lastName,emailData_location,email ORDER BY id ASC";

    con.query(sql, function (err, result) {

        if (err) throw err;

        return callback(result);
        // if (result.length>0){
        // }
    });
}

function showPhoneNameTeasure(firstname,lastname,callback){
    let sql = "SELECT id,phone_firstname,phone_lastname,(CASE WHEN phone_middlename IS NULL THEN '' ELSE phone_middlename END) AS 'phone_middlename',(CASE WHEN phone_dob IS NULL THEN 'N/A' ELSE 1 END) AS 'phone_dob',(CASE WHEN phone_address IS NULL THEN 'N/A' ELSE phone_address END) AS 'phone_address', (CASE WHEN phone_state IS NULL THEN 'N/A' ELSE 1 END) AS 'phone_state',(CASE WHEN phone IS NULL THEN 'N/A' ELSE 1 END) AS 'phone' from phone_data where phone_firstname ='"+firstname+"' AND phone_lastname='"+lastname+"' GROUP BY phone_firstname,phone_lastname,phone_middlename,phone_dob,phone_address,phone_state,phone ORDER BY id ASC";

    con.query(sql, function (err, result) {

        if (err) throw err;

        return callback(result);
        // if (result.length>0){
        // }
    });
}


function showCellPhoneTeasure(id,callback){

    let sql = "select (select count(*) from (SELECT COUNT(cell_firstName) AS cell_firstName from cell_data_name where searched_person_id='"+id+"' GROUP BY cell_firstName) as first ) as cell_firstName,(select count(*) from (SELECT COUNT(cell_lastName) AS cell_lastName from cell_data_name where searched_person_id='"+id+"' GROUP BY cell_lastName)as last) as cell_lastName,(select count(*) from (SELECT  COUNT(cell_middleName) AS cell_middleName from cell_data_name where searched_person_id='"+id+"' GROUP BY cell_middleName) as middle) as cell_middleName,(select count(*) from (SELECT  COUNT(cellPhone) AS cellPhone from cell_data_name where searched_person_id='"+id+"' GROUP BY cellPhone) as phone) as cellPhone,(select count(*) from (SELECT COUNT(cell_email) AS email from cell_data_email where searched_person_id ='"+id+"' GROUP BY cell_email) as email ) AS cell_email,(select count(*) from (SELECT COUNT(cell_dob) AS dob from cell_data_dob where searched_person_id ='"+id+"' GROUP BY cell_dob) as dob) AS cell_dob,(select count(*) from (SELECT COUNT(cell_fullStreet) AS location from cell_data_address where searched_person_id='"+id+"' GROUP BY cell_fullStreet) as street) AS cell_fullStreet,(select count(*) from (SELECT COUNT(cell_state) AS state from cell_data_address where searched_person_id='"+id+"' GROUP BY cell_state) as state) AS cell_state";

    con.query(sql, function (err, result) {
        if (err) throw err;
        return callback(result);
    });
}


function showPhoneTeasure(phone,callback){
    let sql = "SELECT id,(CASE WHEN phone_firstname IS NULL THEN 'N/A' ELSE 'Yes' END) AS 'phone_firstname',(CASE WHEN phone_lastname IS NULL THEN 'N/A' ELSE 'Yes' END) AS 'phone_lastname',(CASE WHEN phone_middlename IS NULL THEN 'N/A' ELSE 'Yes' END) AS 'phone_middlename',(CASE WHEN phone_dob IS NULL THEN 'N/A' ELSE phone_dob END) AS 'phone_dob',(CASE WHEN phone_address IS NULL THEN 'N/A' ELSE phone_address END) AS 'phone_address', (CASE WHEN phone_state IS NULL THEN 'N/A' ELSE phone_state END) AS 'phone_state',(CASE WHEN phone IS NULL THEN 'N/A' ELSE phone END) AS 'phone' from phone_data where phone='"+phone+"' GROUP BY phone_firstname,phone_lastname,phone_middlename,phone_dob,phone_address,phone_state,phone ORDER BY id ASC";

    con.query(sql, function (err, result) {

        if (err) throw err;

        return callback(result);
        // if (result.length>0){
        // }
    });
}


function showBirthTeasure(id,callback){
    let sql = "SELECT id, birthRecord_firstName,birthRecord_lastName,(CASE WHEN birthRecord_middleName IS NULL THEN '' ELSE birthRecord_middleName END) AS 'birthRecord_middleName',(CASE WHEN birthRecord_dob IS NULL THEN 'N/A' ELSE 1 END) AS 'birthRecord_dob',(CASE WHEN birthRecord_state IS NULL THEN 'N/A' ELSE birthRecord_state END) AS 'birthRecord_state' , (CASE WHEN birthRecord_country IS NULL THEN 'N/A' ELSE 1 END) AS 'birthRecord_country' from birth_record where searched_person_id in ("+id+") GROUP BY birthRecord_firstName,birthRecord_lastName,birthRecord_middleName,birthRecord_dob,birthRecord_state,birthRecord_country ORDER BY id ASC";


    con.query(sql, function (err, result) {

        if (err) throw err;

        return callback(result);
        // if (result.length>0){
        // }
    });
}

function showDeathTeasure(id,callback){
    let sql = "SELECT id, firstname,lastname,(CASE WHEN middlename IS NULL THEN '' ELSE middlename END) AS 'middlename', (CASE WHEN DateofDeath IS NULL THEN 'N/A' ELSE 1 END) AS 'DateofDeath',(CASE WHEN DateofBirth IS NULL THEN 'N/A' ELSE 1 END) AS 'DateofBirth',(CASE WHEN lastcounty IS NULL THEN 'N/A' ELSE lastcounty END) AS 'lastcounty',(CASE WHEN  State IS NULL THEN 'N/A' ELSE  State END) AS 'State' from death_record where searched_person_id in ("+id+") GROUP BY firstname,lastname,middlename,DateofDeath,DateofBirth,lastcounty,State ORDER BY id ASC";


    con.query(sql, function (err, result) {

        if (err) throw err;

        return callback(result);
        // if (result.length>0){
        // }
    });
}

function showMDTeasure(id,callback){
    let sql = "SELECT id, md_firstname,md_lastname,(CASE WHEN md_middlename IS NULL THEN '' ELSE md_middlename END) AS 'md_middlename',(CASE WHEN marriage_date IS NULL THEN 'N/A' ELSE 1 END) AS 'marriage_date',(CASE WHEN divorce_date IS NULL THEN 'N/A' ELSE 1 END) AS 'divorce_date' from md_record where searched_person_id in ("+id+") GROUP BY md_firstname,md_lastname,md_middlename,marriage_date,divorce_date ORDER BY id ASC";


    con.query(sql, function (err, result) {

        if (err) throw err;

        return callback(result);
        // if (result.length>0){
        // }
    });
}

function showCriminalTeasure(id,callback){
    let sql = "SELECT id,firstname,lastname,(CASE WHEN middlename IS NULL THEN '' ELSE middlename END) AS 'middlename',(CASE WHEN dob IS NULL THEN 'N/A' ELSE 1 END) AS 'dob',(CASE WHEN state IS NULL THEN 'N/A' ELSE state END) AS 'state', (CASE WHEN address IS NULL THEN 'N/A' ELSE 1 END) AS 'address', (CASE WHEN charge_category IS NULL THEN 'N/A' ELSE 1 END) AS 'crime' from criminal_record where searched_person_id in ("+id+") GROUP BY firstname,lastname,middlename,dob,state,address,crime ORDER BY id ASC ";

    con.query(sql, function (err, result) {

        if (err) throw err;

        return callback(result);
        // if (result.length>0){
        // }
    });
}

function showPersonsData(id,callback){
    let sql = "SELECT * from persons where id ='"+id+"'";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}

function showEmailData(id,callback){
    let sql = "SELECT * from email_data where id ='"+id+"'";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}

function showPhoneData(id,callback){

    let sql = "SELECT * from phone_data where id ='"+id+"'";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}

function showBirthData(id,callback){
    let sql = "SELECT * FROM `birth_record` WHERE id ='"+id+"'";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}


function showDeathData(id,callback){
    let sql = "SELECT * FROM `death_record` WHERE id ='"+id+"'";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}

function showMDData(id,callback){
    let sql = "SELECT * FROM `md_record` WHERE id ='"+id+"'";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}

function showCriminalData(id,callback){
    let sql = "SELECT * FROM `criminal_record` WHERE id ='"+id+"'";

    con.query(sql, function (err, result) {

        if (err) throw err;

        if (result.length>0){
            return callback(result);
        }
    });
}

function getNameWithPhone(id, callback){
    let sql = "SELECT phone_firstname,phone_lastname,searched_person_id from phone_data where id='"+id+"'";

    con.query(sql, function (err, result) {

        if (err) throw err;

        return callback(result);
    });
}

function getSearchedId(phone, callback){
    let sql = "SELECT id from searched_person where phone='"+phone+"'";

    con.query(sql, function (err, result) {

        if (err) throw err;

        return callback(result);
    });
}

function showCellphoneData(id, callback){

    let cellData ={names:[],dobs:[],emails:[],addreses:[]};


    let sql1 = "SELECT cell_firstName,cell_lastName,cell_middleName,cellPhone from cell_data_name where searched_person_id='"+id+"' GROUP BY cell_firstName,cell_lastName,cell_middleName,cellPhone ORDER BY id ASC";
    
    let sql2 = "SELECT cell_dob from cell_data_dob where searched_person_id ='"+id+"' GROUP BY cell_dob ORDER BY id ASC";
    
    let sql3 = "SELECT cell_email from cell_data_email where searched_person_id ='"+id+"' GROUP BY cell_email ORDER BY id ASC";
    
    let sql4 = "SELECT * from cell_data_address where searched_person_id='"+id+"' GROUP BY cell_fullStreet,cell_city,cell_state,cell_zip,cell_subdivisionName ORDER BY id ASC";
    

    con.query(sql1, function (err, result) {

        if (err) throw err;
        cellData.names = result;
    });

    con.query(sql2, function (err, result) {

        if (err) throw err;
        cellData.dobs = result;
    });
    con.query(sql3, function (err, result) {

        if (err) throw err;
        cellData.emails = result;

    });
    con.query(sql4, function (err, result) {

        if (err) throw err;
        cellData.addreses = result;
        return callback(cellData);
    });
}

function insert_customer_id(cId,searched_person_id){
    let sql = "SELECT * from searched_person where id='"+searched_person_id+"'";
    con.query(sql, function (err, data) {
        if (err) throw err;
       let first_name = data[0].first_name;
       let  last_name = data[0].last_name;
       let  email = data[0].email;
       let  phone = data[0].phone;
       let sql = "INSERT INTO customer_record(customer_id,searched_person_id,first_name,last_name,email,phone) VALUES ('"+cId+"','"+searched_person_id+"','"+first_name+"','"+last_name+"','"+email+"','"+phone+"')";
    //    let sql = "INSERT INTO customer_record ("
    // if(cId!=null) sql+="customer_id,";
    // if(searched_person_id!=null) sql+="searched_person_id,";
    // if(first_name!=null) sql+="first_name,";
    // if(last_name!=null) sql+="last_name,";
    // if(email!=null ) sql+="email,";
    // if(phone!=null ) sql+="phone) VALUES (";
    // if(cId!=null ) sql+="'"+cId+"',";
    // if(searched_person_id!=null) sql+="'"+searched_person_id+"',";
    // if(first_name!=null ) sql+="'"+first_name+"',";
    // if(last_name!=null) sql+="'"+last_name+"',";
    // if(email!=null) sql+="'"+email+"',";
    // if(phone!=null) sql+="'"+phone+"')";
        con.query(sql, function (err, result) {
            if (err) throw err;
        });
    });
}



module.exports ={
    con,
    searchedPerson,
    insert_raw_json_name,
    insert_persons_data,
    insert_raw_json_cell,
    insert_cell_data_name,
    insert_cell_data_dob,
    insert_cell_data_email,
    insert_cell_data_address,
    insert_raw_json_phone,
    insert_phone_data,
    insert_raw_json_email,
    insert_email_data,
    insert_raw_json_birth,
    insert_birth_data,
    insert_raw_json_death,
    insert_death_data,
    insert_raw_json_md,
    insert_md_data,
    insert_raw_json_criminalchecks,
    insert_criminal_data,
    findNameInDatabase,
    findEmailInDatabase,
    findPhoneInDatabase,
    updateSearchedPersonByEmail,
    // updateSearchedPersonByPhone,
    showSearchedPersonData,
    showPersonsTeasure,
    showEmailTeasure,
    showPhoneTeasure,
    showPhoneNameTeasure,
    showBirthTeasure,
    showDeathTeasure,
    showMDTeasure,
    showCriminalTeasure,
    showPersonsData,
    showEmailData,
    showPhoneData,
    showBirthData,
    showDeathData,
    showMDData,
    showCriminalData,
    getNameWithPhone,
    getSearchedId,
    showCellPhoneTeasure,
    showCellphoneData,
    insert_customer_id
};