require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');

const PORT = process.env.port || 8000;
const cors = require('cors')
const request = require('postman-request');

app.use(cors());

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

app.get('/', function(req, res){
    res.send("Landing");
})

app.get('/results', function(req, res){
  var options = {
    url: 'https://api.yelp.com/v3/businesses/search',
    headers: {
      'Authorization': 'Bearer ' + process.env.YELPK
    },
    qs: {
      location: req.query.location,
      radius: req.query.distance,
      categories: req.query.categories,
      price: req.query.price,
      limit: '50',
      latitude: req.query.latitude,
      longitude: req.query.longitude
    }
  };

  function callback(error, response, body) {
    if(JSON.parse(body)["error"]){
      res.json('LOCATION_NOT_FOUND');
    }
    
    else if (!error && response.statusCode == 200) {
      const info = JSON.parse(body);
      res.json(info);
    }

    else{
      res.json(error);
    }

  }
  request(options, callback);
})

app.get('/.well-known/pki-validation/115913241F7DC604586FE1183D2BD7D7.txt', function(req, res){
  var options = {
      root: path.join(__dirname)
  };
   
  var fileName = '115913241F7DC604586FE1183D2BD7D7.txt';
  res.sendFile(fileName, options, function (err) {
      if (err) {
          next(err);
      } else {
          console.log('Sent:', fileName);
      }
  });
});
