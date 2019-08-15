
// ALL TWILIO REQUIREMENTS
var twilio = require('twilio');
var client = new twilio('TWILIO_ID', 'TWILIO_KEY')
cronJob = require('cron').CronJob

// ALL GOOGLE CALENDAR REQUIREMENTS
const {google} = require('googleapis');
var CLIENT_ID = '';
var API_KEY = 'GOOGLE_API_KEY'
var CAL_ID = 'akmja0ocng2ggnhndmsibdbtu0@group.calendar.google.com'
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];

// EXPRESS ROUTES TO BE USED LATER
var express = require('express');
bodyParser = require('body-parser');
var MessagingResponse = require('twilio').twiml.MessagingResponse;
app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

// var numbers = ['+17203528912', '+13035965242']
var numbers = ['+17203528912']


var bodyTest = [
    'Hi there'
]

// +16194144645
// SETS CRON JOB AND TIME TO RUN:

// AM CRON EXAMPLE '30 11 10 4 0'
// 11:30 AM OCTOBER 4th SUNDAY

// PM CRON EXAMPLE '30 21 09 10 2'
// 10:30 PM SEPTEMBER 10th TUESDAY

var textJob = new cronJob('25 12 * * *', function(){
// INFORMATION GATHERED FROM GOOGLE CALENDAR TO SEND GAME REMINDERS
gameInfo = []

function listEvents(auth) {

    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list({
      calendarId: CAL_ID,
      timeMin: (new Date()).toISOString(),
      maxResults: 1,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = res.data.items;
      if (events.length) {
        console.log('Upcoming 10 events:');
        events.map((event, i) => {
          const start = event.start.dateTime || event.start.date;
         
          console.log(`Rockies game reminder! ${start} - ${event.summary}`);
          gameInfo.push(`Rockies game reminder! ${start} - ${event.summary}`);
         
        });
      } else {
        console.log('No upcoming events found.');
      }

        for (var i = 0; i < numbers.length; i++){
        client.messages.create({ 
            to: numbers[i], 
            from:'+17207071210',
            body: gameInfo},
            function(err, data){console.log(data.body)
            }); 
    }

      console.log(gameInfo)
    });
  }
  listEvents(API_KEY)
}, null, true)

// TESTING WITHOUT CRON JOB
gameInfo = []

function listEvents(auth) {

    const calendar = google.calendar({version: 'v3', auth});
    calendar.events.list({
      calendarId: CAL_ID,
      timeMin: (new Date()).toISOString(),
      maxResults: 1,
      singleEvents: true,
      orderBy: 'startTime',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const events = res.data.items;
      if (events.length) {
        // console.log('Upcoming 10 events:');
        events.map((event, i) => {
          const start = event.start.dateTime.slice([21]) + ' PM'
          const startLong = event.start.dateTime
          const today = (new Date()).toISOString()
   
          if(startLong === today){
            console.log(`Rockies game reminder! ${start} - ${event.summary}`);
            gameInfo.push(`Rockies game reminder! ${start} - ${event.summary}`);
            console.log(gameInfo)

            for (var i = 0; i < numbers.length; i++){
              client.messages.create({ 
                  to: numbers[i], 
                  from:'+17207071210',
                  body: gameInfo},
                  function(err, data){console.log(data.body)
                  }); 
          }
            
          } else {
            for (var i = 0; i < numbers.length; i++){
              client.messages.create({ 
                  to: numbers[i], 
                  from:'+17207071210',
                  body: 'Sorry Rockies fans, no game today!'},
                  function(err, data){console.log(data.body)
                  }); 
          }
          }
         
        });
      } else {
        console.log('No upcoming events found.');
      }

    //     for (var i = 0; i < numbers.length; i++){
    //     client.messages.create({ 
    //         to: numbers[i], 
    //         from:'+17207071210',
    //         body: gameInfo},
    //         function(err, data){console.log(data.body)
    //         }); 
    // }
      // let dater = new Date()
      // console.log(dater)
      // console.log(gameInfo)
    });
  }
  listEvents(API_KEY)


// EXPRESS SERVER
var server = app.listen(3500, function() {
    console.log('Listening on port %d', server.address().port);
  });

      

     