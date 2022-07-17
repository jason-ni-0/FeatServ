//const axios = require('axios');
const express = require('express');
const PORT = 8000;
//const request = require('request')
const cors = require('cors')
const request = require('postman-request');

const app = express();
app.use(cors());

/*
'use strict';

const yelp = require('yelp-fusion');
const client = yelp.client('AEfs3X7p9KECSOKsLcTv4eN0aM3O-yhKQfhQeosSu-XdK3PA5cZFfgDWyXC_fQumcHs_nZ4Z_qnrwy8QmpCIaw-7m_SJAef--BmHGl6pLhiG_TVtcaMWzdWajLO3YnYx');
*/

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));

app.get('/', function(req, res){
    res.json("Landing");
})
/*
app.get('/results', function(req, res){
    //console.log(req.query.location);
    client.search({
        location: req.query.location,
        radius: req.query.distance,
        categories: req.query.categories,
        price: req.query.price,
        limit: '50',
      }).then(response => {
        //console.log(response.jsonBody.businesses[getRandomInt(response.jsonBody.businesses.length)].name);
        //res.json(response.jsonBody.businesses[getRandomInt(response.jsonBody.businesses.length)].name);
        res.json(response.jsonBody.businesses);
      }).catch(e => {
        console.log(e);
      });
})*/

app.get('/results', function(req, res){
  const options = {
    url: 'https://api.yelp.com/v3/businesses/search',
    headers: {
      'Authorization': 'Bearer AEfs3X7p9KECSOKsLcTv4eN0aM3O-yhKQfhQeosSu-XdK3PA5cZFfgDWyXC_fQumcHs_nZ4Z_qnrwy8QmpCIaw-7m_SJAef--BmHGl6pLhiG_TVtcaMWzdWajLO3YnYx'
    },
    qs: {
      location: req.query.location,
      radius: req.query.distance,
      categories: req.query.categories,
      price: req.query.price,
      limit: '50',
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
