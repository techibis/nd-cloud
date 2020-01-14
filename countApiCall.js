const database = require('./databaseConfig');

let countApiArray ={name:0,phone:0,cell:0,email:0,criminal:0,birth:0,death:0,md:0,tc:0,tac:0};

// let t = new Date();
// let year = t.getFullYear();
// let month = t.getMonth()+1;
// let day = t.getDate();

// let date = year+"-"+month+"-"+day;

// let dateFrom = "2019-11-07";
// let dateTo = "2019-11-08";
let value ;




function getData(dateFrom,dateTo,callback){

    let nameSql = "SELECT count(time) as count from `raw_json_name` where Date(`time`) BETWEEN '"+dateFrom+"' AND '"+dateTo+"'";
    let cellSql = "SELECT count(time) as count from `raw_json_cell` where Date(`time`) BETWEEN '"+dateFrom+"' AND '"+dateTo+"'";
    let phoneSql = "SELECT count(time) as count from `raw_json_phone` where Date(`time`) BETWEEN '"+dateFrom+"' AND '"+dateTo+"'";
    let emailSql = "SELECT count(time) as count from `raw_json_email` where Date(`time`) BETWEEN '"+dateFrom+"' AND '"+dateTo+"'";
    let criminalSql = "SELECT count(time) as count from `raw_json_criminalchecks` where Date(`time`) BETWEEN '"+dateFrom+"' AND '"+dateTo+"'";
    let birthSql = "SELECT count(time) as count from `raw_json_birth` where Date(`time`) BETWEEN '"+dateFrom+"' AND '"+dateTo+"'";
    let deathSql = "SELECT count(time) as count from `raw_json_death` where Date(`time`) BETWEEN '"+dateFrom+"' AND '"+dateTo+"'";
    let mdSql = "SELECT count(time) as count from `raw_json_md` where Date(`time`) BETWEEN '"+dateFrom+"' AND '"+dateTo+"'";
    let totalApiCallSql = "select count(total) as count from (select count(searched_person_id) as total from (Select searched_person_id, date(`time`) From customer_record  where Date(`time`) BETWEEN '"+dateFrom+"' AND '"+dateTo+"' GROUP BY customer_id,searched_person_id,DATE(`time`)) AS r1 GROUP By searched_person_id) AS r2";
    let totalCallSql = "select sum(total) as count from (select count(searched_person_id) as total from (Select searched_person_id, date(`time`) From customer_record  where Date(`time`) BETWEEN '"+dateFrom+"' AND '"+dateTo+"' GROUP BY customer_id,searched_person_id,DATE(`time`)) AS r1 GROUP By searched_person_id) AS r2";
    
    database.con.query(nameSql, function (err, result) {
        if (err) throw err;
        value = result[0].count;
        countApiArray.name = value;
    });

    database.con.query(phoneSql, function (err, result) {
        if (err) throw err;
        value = result[0].count;
        countApiArray.phone = value;
    });

    database.con.query(cellSql, function (err, result) {
        if (err) throw err;
        value = result[0].count;
        countApiArray.cell = value;
    });

    database.con.query(emailSql, function (err, result) {
        if (err) throw err;
        value = result[0].count;
        countApiArray.email = value;
    });

    database.con.query(criminalSql, function (err, result) {
        if (err) throw err;
        value = result[0].count;
        countApiArray.criminal = value;
    });

    database.con.query(birthSql, function (err, result) {
        if (err) throw err;
        value = result[0].count;
        countApiArray.birth = value;
    });

    database.con.query(deathSql, function (err, result) {
        if (err) throw err;
        value = result[0].count;
        countApiArray.death = value;
    });

    database.con.query(mdSql, function (err, result) {
        count=7;
        if (err) throw err;
        value = result[0].count;
        countApiArray.md = value;
        
    });

    database.con.query(totalCallSql, function (err, result) {
        if (err) throw err;
        value = result[0].count;
        console.log(result);
        countApiArray.total_call = value;
    });

    database.con.query(totalApiCallSql, function (err, result) {
        if (err) throw err;
        value = result[0].count;
        console.log(result);
        countApiArray.total_api_call = value;
        return callback(countApiArray);
    });
    
};



module.exports ={
    getData
}


// app.get('/', (req, res) => {
//     const shop = req.query.shop;
//     if (shop) {
//       const state = nonce();
//       const redirectUri = forwardingAddress;
//       const installUrl = 'https://' + shop +
//         '/admin/oauth/authorize?client_id=' + apiKey +
//         '&scope=' + scopes +
//         '&state=' + state +
//         '&redirect_uri=' + redirectUri;
  
//       res.cookie('state', state);
//       res.redirect(installUrl);
//     } else {
//       return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your query');
//     }
// });