// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
 
app.get('/api/:date?', (req, res) => {
  let date;
  if (!req.params.date) {
    date = new Date();
  } else {
    const timestamp = parseInt(req.params.date);

    // Check if the provided date is a valid Unix timestamp
    if (isNaN(timestamp)) {
      date = new Date(req.params.date);
    } else {
      date = new Date(timestamp); // Convert Unix timestamp to milliseconds
    }
  }

  // Check if the date is valid
  if (date.toString() === 'Invalid Date') {
    return res.json({ error: 'Invalid Date' });
  }

  // Calculate Unix timestamp and UTC date string
  const unix = date.getTime(); // No need to divide by 1000
  const utc = date.toUTCString();

  // Return JSON object with Unix timestamp and UTC date string
  res.json({ unix, utc });
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
