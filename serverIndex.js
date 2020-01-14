const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookie = require('cookie');
const nonce = require('nonce')();
const scopes = 'read_products';
const request = require('request-promise');
const app = express();

const apiKey = process.env.SHOPIFY_API_KEY;
const apiSecret = process.env.SHOPIFY_API_SECRET;

const forwardingAddress = "https://sfshopify.com:8001"; // Replace this with your HTTPS Forwarding address
const fs = require('fs');
const http = require('http');
const https = require("https");

const database = require('./databaseConfig');
const getPersonData = require('./searchByName');
const getPhoneData = require('./searchByPhone');
const getEmailData = require('./searchByEmail');
const showResult = require('./showResultsFromDatabase');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

let apiArray ={people:0,criminal:0,birth:0,death:0,marriage:0,divorce:0};
let emailApiArray = {email:0};
let phoneApiArray = {phone:0,cell:0};
let counter =0;
let interval;


app.get('/', (req, res) => {
  const shop = req.query.shop;
  if (shop) {
    const state = nonce();
    const redirectUri = forwardingAddress;
    const installUrl = 'https://' + shop +
      '/admin/oauth/authorize?client_id=' + apiKey +
      '&scope=' + scopes +
      '&state=' + state +
      '&redirect_uri=' + redirectUri;

    res.cookie('state', state);
    res.redirect(installUrl);
  } else {
    return res.status(400).send('Missing shop parameter. Please add ?shop=your-development-shop.myshopify.com to your query');
  }
});


app.post('/', (req, res) => {
    const shop = req.query.shop;
    const  firstName = req.query.firstName;
    const lastName = req.query.lastName;
    if (shop) {

    database.findNameInDatabase(firstName,lastName,function(result){
        
        if(result.length==0){
            database.searchedPerson(firstName,lastName,null,null);
            getPersonData.getDataByName(firstName,lastName,apiArray);
        }else{
            setApiArrayValues();
        }
    })

    interval = setInterval(function(){checkIfDone(firstName,lastName,res,1)}, 200);
}
});


//app.get('/email', function (req, res) {
  //  res.render('searchByEmail', {emailData: null, error: null});
//})

  
app.post('/email', function (req, res) {
    const shop = req.query.shop;
    const email = req.query.email;
    let emailData_firstName;
    let emailData_lastName;
    if (shop) {

    database.findEmailInDatabase(email, function(response){

        if(response.length==0){
            database.searchedPerson(null,null,email,null);
            getEmailData.getDataByEmail(email,emailApiArray,function(response){

                emailData_firstName = response.emailData_firstName;
                emailData_lastName = response.emailData_lastName;
            
                if (emailData_firstName!=null && emailData_lastName !=null){
                    database.findNameInDatabase(emailData_firstName,emailData_lastName, function(response){
                        database.updateSearchedPersonByEmail(emailData_firstName,emailData_lastName,email);

                        if(response.length == 0){
                            getPersonData.getDataByName(emailData_firstName, emailData_lastName,apiArray);
                        }else{
                            setApiArrayValues();
                        }
                    });
                }
            })
        }else{
            emailData_firstName = response[0].first_name;
            emailData_lastName = response[0].last_name;
            emailApiArray.email = 1;
            setApiArrayValues();
        }

        emailApiInterval = setInterval(function(){checkIfEmailApiCallDone(emailData_firstName,emailData_lastName,res)}, 200);


    });
}

});
  


//app.get('/phone', function (req, res) {
 //   res.render('searchByPhone', {phoneData: null, error: null});
//})
  
app.post('/phone', function (req, res) {

	const shop = req.query.shop;
    	const phone = req.query.phoneNumber;
    if (shop) {

    database.findPhoneInDatabase(phone, function(response){
        if (response.length == 0) {
            database.searchedPerson(null, null, null, phone);
            getPhoneData.getDataByPhone(phone,phoneApiArray);
        }else{
            phoneApiArray.phone = 1;
            phoneApiArray.cell = 1;
        }
        phoneApiInterval = setInterval(function(){checkIfPhoneApiCallDone(phone,res)}, 200);
    });
};
});


app.post('/P/:id/:cId', function (req, res) {
    let id = req.params.id;
    let cId = req.params.cId;
    let searched_person_id;  
    database.showPersonsData(id,function(data){
    searched_person_id = data[0].searched_person_id;        
        if(cId !=null){
            database.insert_customer_id(cId,searched_person_id);
        }
        return res.status(200).send(data);
    })
})


app.post('/E/:id/:cId', function (req, res) {
    let id = req.params.id;
    let cId = req.params.cId;
    database.showEmailData(id,function(data){
        if(cId !=null){
            database.insert_customer_id(cId,id);
        }
        return res.status(200).send(data);
    })
})

app.post('/CP/:id/:cId', function (req, res) {
    let id = req.params.id;
    let cId = req.params.cId;
    database.showCellphoneData(id,function(data){
        if(cId !=null){
            database.insert_customer_id(cId,id);
        }
        return res.status(200).send(data);
      })

})


app.post('/Ph/:id/:cId', function (req, res) {
    let id = req.params.id;
    let cId = req.params.cId;
    let firstName;
    let lastName;
    let searched_person_id;

    database.getNameWithPhone(id,function(response){
        firstName = response[0].phone_firstname;
        lastName = response[0].phone_lastname;
        searched_person_id = response[0].searched_person_id;

        if(cId !=null){
            database.insert_customer_id(cId,searched_person_id);
        }

        database.findNameInDatabase(firstName,lastName,function(result){
            
            if(result.length==0){
                database.searchedPerson(firstName,lastName,'','');
                getPersonData.getDataByName(firstName,lastName,apiArray,res);
            }else{
                setApiArrayValues();
            }
        })

        interval = setInterval(function(){checkIfDone(firstName,lastName,res)}, 200);
    });
});


app.post('/Ph1/:id', function (req, res) {
    let id = req.params.id;
    database.showPhoneData(id,function(data){
        return res.status(200).send(data);
    })
})


app.post('/B/:id/:cId', function (req, res) {
    let id = req.params.id;
    let cId = req.params.cId;
    database.showBirthData(id,function(data){
        if(cId !=null){
            database.insert_customer_id(cId,id);
        }
        return res.status(200).send(data);
    })
})


app.post('/D/:id/:cId', function (req, res) {
    let id = req.params.id;
    let cId = req.params.cId;
    database.showDeathData(id,function(data){
        if(cId !=null){
            database.insert_customer_id(cId,id);
        }
        return res.status(200).send(data);
    })
})


app.post('/MD/:id/:cId', function (req, res) {
    let id = req.params.id;
    let cId = req.params.cId;
    database.showMDData(id,function(data){
        if(cId !=null){
            database.insert_customer_id(cId,id);
        }
        return res.status(200).send(data);
    })
})


app.post('/C/:id/:cId', function (req, res) {
    let id = req.params.id;
    let cId = req.params.cId;
    database.showCriminalData(id,function(data){
        if(cId !=null){
            database.insert_customer_id(cId,id);
        }
        return res.status(200).send(data);
    })
})

const privateKey = fs.readFileSync('/etc/letsencrypt/live/sfshopify.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/sfshopify.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/sfshopify.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(8000, () => {
	console.log('Net Detective App listening on port 8000 for HTTP Server');
});

httpsServer.listen(8001, () => {
	console.log('Net Detective  App listening on port 8001 for HTTPS Server');
});

function checkIfDone(firstName,lastName,res,show) { 
    counter +=1;
    if ((apiArray.people)+(apiArray.criminal)+(apiArray.birth)+(apiArray.death)+(apiArray.marriage)+(apiArray.divorce)===6 || (counter==10)){
   
        stopApiInterval(interval);
        
        showResult.showPersonsDatafromDatabase(firstName,lastName,show,function(result){
		return res.status(200).send(result);
        });
    };

};

let phoneCounter =0; 
function checkIfPhoneApiCallDone(phone,res) { 
    phoneCounter +=1;

    if ((phoneApiArray.phone)+(phoneApiArray.cell) === 2 || (phoneCounter===20)){
        stopPhoneApiInterval();
        showResult.showPhoneDataFromDatabase (phone,function(result){
 		return res.status(200).send(result);
        });
    };

};

function checkIfEmailApiCallDone(emailData_firstName,emailData_lastName,res) { 

    if (emailApiArray.email === 1 ){
        stopEmailApiInterval();

        if (emailData_firstName !=null && emailData_lastName !=null ){
            interval = setInterval(function(){checkIfDone(emailData_firstName,emailData_lastName,res,0)}, 200);
        }else{
            return res.status(200).send(""); 
        }
    };

};


function stopApiInterval() {
    clearInterval(interval);
    apiArray ={people:0,criminal:0,birth:0,death:0,marriage:0,divorce:0};
}

function stopPhoneApiInterval() {
    clearInterval(phoneApiInterval);
    phoneApiArray ={phone:0,cell:0};
}

function stopEmailApiInterval() {
    clearInterval(emailApiInterval);
    emailApiArray={email:0};
}

function setApiArrayValues(){
    apiArray.people = 1;
    apiArray.criminal = 1;
    apiArray.birth = 1;
    apiArray.death = 1;
    apiArray.marriage = 1;
    apiArray.divorce = 1;
}


const countApi =require('./countApiCall');

app.post('/count',function (req, res) {
    const  dateFrom = req.query.dateFrom;
    const dateTo = req.query.dateTo;
    countApi.getData(dateFrom,dateTo,function(data){
        return res.status(200).send(data);
    });
});

app.post('/report',function (req, res) {
    let cId = req.query.cId;
    database.showReport(cId,function(data){
        return res.status(200).send(data);
    });
});

app.post('/limit',function (req, res) {

   countApi.getApiLimit(function(data){
        return res.status(200).send(data);
    });
});
