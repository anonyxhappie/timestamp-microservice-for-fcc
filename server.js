// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API.'});
});

// your timestamp API endpoint... 
app.get("/api/timestamp", function (req, res) {
  let date = new Date();
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});

// timestamp/:date_string
// your timestamp API endpoint... 
app.get("/api/timestamp/:date_string", function (req, res) {
  let date_string = req.params.date_string;
  let r = {error : "Invalid Date" };

  if (isNaN(date_string)) {
    let date = new Date(date_string)
    if (date.toUTCString() === "Invalid Date" || date.getTime() < 0) {
      r = {error : "Invalid Date" };    
    } else {
      r = {unix: date.getTime(), utc: date.toUTCString()};
    }
  } else {
    let unix_timestamp = Number(date_string);
    r = {unix: unix_timestamp, utc: new Date(unix_timestamp * 1000).toUTCString()};
  }
  return res.json(r);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});