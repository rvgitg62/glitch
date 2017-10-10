// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  // console.log(request.query.data);
  response.sendFile(__dirname + '/views/index.html');
});

var moment = require('moment');
app.get("/:date", function (request, response) {
  var time = request.params.date;
  var date;
  if(!isNaN(time)){
    date = moment(time,"X");
  }else{
    date = moment(time,"MMMM DD, YYYY");
  }
  if(date.isValid()){
    response.json({
      unix:date.format("X"),
      natural:date.format("MMMM DD, YYYY")
    });
  }else{
    response.json({
      unix:null,
      natural:null
    })    
  }
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  response.sendStatus(200);
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
