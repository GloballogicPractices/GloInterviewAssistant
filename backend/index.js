const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const server = require('http').createServer(app);
//const io = require('socket.io')(server);
const io = require('socket.io').listen(3001);

const nspChat = io.of('/chat');
const nspDefault = io.nsps['/'];


var cors = require('cors')
//================================================
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1qaz!QAZ",
  database: "glointbot"
});
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySql!");
});
//================================================
var globalSocket = null;
io.on('connection', function (socket) {
	console.log('User Connected to decepticon socket');
	globalSocket = socket;	
	var sql = "select * from bot_response";
	  con.query(sql, function (err, result) {
		if (err) throw err;
		console.log(JSON.stringify(result));
		globalSocket.emit('connected',result)
	});
	
	/*
	socket.broadcast.emit('getUsers', userList);
	socket.on('getUsers', function () {
		socket.emit('getUsers', userList);
	})
	socket.on('user count', function () {
		socket.emit('user count',userList.length );
	})
	socket.on('disconnect', function () {
		console.log('User Disconnected from decepticon socket');
    });
	*/
});
//================================================
app.use(bodyParser.json())
app.set('port', (process.env.PORT || 5000))

const REQUIRE_AUTH = true
const AUTH_TOKEN = 'glo-decepticon'


app.get('/', function (req, res) {
  res.send('Use the /webhook endpoint.')
})

app.use(express.static('public'));
app.use('/scripts', express.static(__dirname + '/scripts'));

app.get('/glibot', function (req, res) {
   res.sendFile( __dirname + "/" + "glibot.html" );
})

app.get('/results', function (req, res) {
   res.sendFile( __dirname + "/" + "results.html" );
})

app.get('/webhook', function (req, res) {
  res.send('You must POST your request')
})

app.get('/getdata', function (req, res) {

   res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   var sql = "select * from response";
   con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).json({
      dataAry: result
  })
  

  })

})

app.get('/getcountsdata', function (req, res) {

   res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   var sql = "select position_applied_for, count(position_applied_for) as application_count from response group by position_applied_for";
   con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).json({
      dataAry: result
  })
  
  })

})

app.get('/getunresolved', function (req, res) {

   res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
   var sql = "select * from unresolved_queries";
   con.query(sql, function (err, result) {
    if (err) throw err;
    res.status(200).json({
      dataAry: result
  })
  
  })

})

app.options('/makeresolved', cors()) // enable pre-flight request for DELETE request
app.post('/makeresolved', function (req, res) {
  console.log(JSON.stringify(req.body));
  res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  var intentData = {
  "contexts": [
  ],
  "events": [],
  "fallbackIntent": false,
  "name": req.body.question,
  "auto": true,
  "priority": 500000,
  "responses": [
    {
      "action": req.body.question,
      "affectedContexts": [
      ],
      "defaultResponsePlatforms": {
        "google": true
      },
      "messages": [
        {
          "platform": "google",
          "textToSpeech": req.body.answer,
          "type": "simple_response"
        },
        {
          "speech": req.body.answer,
          "type": 0
        }
      ],
      "parameters": [
      ],
      "resetContexts": false
    }
  ],
  "templates": [
  ],
  "userSays": [
    {
      "count": 0,
      "data": [
        {
          "text": req.body.question,
          "userDefinded": false
        }
      ]
    }
  ],
  "webhookForSlotFilling": false,
  "webhookUsed": false
};


//Example POST method invocation 
var Client = require('node-rest-client').Client;
 
var client = new Client();
 
// set content-type header and data as json in args parameter 
var args = {
    data: intentData,
    headers: { "Content-Type": "application/json", "Authorization": "Bearer a0e67e60511e4735bb8a931e1645fdc1"}
};
 
client.post("https://api.dialogflow.com/v1/intents?v=20150910", args, function (data, response) {
    
   var sql = "delete from unresolved_queries where id="+req.body.id;
   con.query(sql, function (err, result) {
      if (err) throw err;    
      console.log('1 row deleted from unresolved_queries');
      var sql = "select * from unresolved_queries";
       con.query(sql, function (err, result) {
          if (err) throw err;
         res.status(200).json({
            dataAry: result
          })  
       })  
    });
});

});



var rowCount = 0;
app.post('/webhook', function (req, res) {
  // we expect to receive JSON data from api.ai here.
  // the payload is stored on req.body
  //console.log('parameters: '+JSON.stringify(req.body.result.parameters));
  // we have a simple authentication
  if (REQUIRE_AUTH) {
    if (req.headers['auth-token'] !== AUTH_TOKEN) {
      return res.status(401).send('Unauthorized')
    }
  }
  // and some validation too
  if (!req.body || !req.body.result || !req.body.result.parameters) {
    return res.status(400).send('Bad Request')
  }

  var speech = req.body.result.fulfillment.speech;
  var webhookReply = speech;
  
  // the most basic response
  res.status(200).json({
    source: 'webhook',
    speech: webhookReply,
    displayText: webhookReply
  })
  
  var intentName = req.body.result.metadata.intentName || null;
  if(intentName === 'job-application-details') {
  	var name = req.body.result.parameters.name;
    var email = req.body.result.parameters.email;
    var mobile = req.body.result.parameters.mobile;
    var position = req.body.result.parameters.position;
    var experience = req.body.result.parameters.experience;
    var current_ctc = req.body.result.parameters.current_ctc;
    var expected_ctc = req.body.result.parameters.expected_ctc;
    var notice_period = req.body.result.parameters.noticeperiod;
    var negotiable = req.body.result.parameters.negotiable;
    var notice_serving = req.body.result.parameters.notice_serving;;
    var offer_inhand = req.body.result.parameters.any_offer_in_hand;
    var reason_for_change = req.body.result.parameters.reason_for_change;
    var current_job_duration = req.body.result.parameters.current_job_duration;
    var contact_time = req.body.result.parameters.contact_time;
    var job_location = req.body.result.parameters.job_location;
    var domain = req.body.result.parameters.domain;

  	var sql = "INSERT INTO response (name, email, mobile_number, position_applied_for, work_experience, current_ctc, expected_ctc, notice_period, negotiable, already_serving, any_offer_in_hand, reason_for_change, current_job_duration, prefered_time_to_contact, prefered_location, domain) VALUES ('"+name+"', '"+email+"','"+mobile+"','"+position+"','"+experience+"','"+current_ctc+"','"+expected_ctc+"','"+notice_period+"','"+negotiable+"','"+notice_serving+"','"+offer_inhand+"','"+reason_for_change+"','"+current_job_duration+"','"+contact_time+"','"+job_location+"','"+domain+"')";
  	  con.query(sql, function (err, result) {
  		if (err) throw err;
  		console.log("1 record inserted");
  		
  		// var sql = "select * from bot_response";
  	 //  con.query(sql, function (err, result) {
  		// if (err) throw err;
  		// console.log('query fetched and sent to getResults socket');
  		// globalSocket.emit('getResults',result)
	   // });
	 });
  } else if(intentName === "Default Fallback Intent") {
      var sql = "INSERT INTO unresolved_queries (query_text) VALUES ('"+req.body.result.resolvedQuery+"')";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted in unresolved_queries table");   
      });
  }
})

app.listen(app.get('port'), function () {
  console.log('* Webhook service is listening on port:' + app.get('port'))
})
