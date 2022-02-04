// load up the express framework and body-parser helper
"use strict"

var express = require('express');
const { allowedNodeEnvironmentFlags } = require('process');
const { MemoryCookieStore } = require('tough-cookie');
// create an instance of express to serve our end points
var app = express();

app.listen(3000)
console.log('Node.js server is running on port 3000...')
const bodyParser = require('body-parser')



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  const allowedOrigins = ['https://editor.swagger.io', 'https://hoppscotch.io'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  // Request methods you wish to allow eg: GET, POST, OPTIONS, PUT, PATCH, DELETE
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
});
app.get('/data/2.5/hello', greeting)
app.get('/data/2.5/weather',  get_weather)

function get_weather(request, response){
    response.json({"coord":{"lon":-123.262,"lat":44.5646},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04d"}],"base":"stations","main":{"temp":282,"feels_like":282,"temp_min":280.02,"temp_max":284.57,"pressure":1027,"humidity":77},"visibility":10000,"wind":{"speed":0,"deg":0},"clouds":{"all":100},"dt":1642198763,"sys":{"type":2,"id":2040223,"country":"US","sunrise":1642175199,"sunset":1642208235},"timezone":-28800,"id":5720727,"name":"Corvallis","cod":200})
}

function greeting(request, response){
  console.log("Hello")
};
app.post('/auth',(req, res) => {
  var user_name = req.body.user;
  var password = req.body.password;
  if (user_name=='Duy' && password=='123')
  {
       res.json({"Token": "123sfed23"})
  }
  else {
        res.status(400)
        res.json("BAD REQUEST")

    }

});
