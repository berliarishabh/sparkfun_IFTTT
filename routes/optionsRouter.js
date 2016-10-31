var express = require('express');
var fs = require('fs');
var events = require('events');
var request = require('request');
var idgen = require('idgen');
var eventEmitter = new events.EventEmitter();

var optionsRouter = express.Router();

var key = 'BN-j1xn_Wo9fyXsoGE2TkA_Wn_4Xm5fb3UlCSbgZo_abj3Xaff83sQCP0zFSrNaQ';



optionsRouter.route('/')
    .all(function(req,res,next){
    next();
    })
    .post(function(req,res,next){

    console.log('POST');

    var phantdata = {}, i_data = {};
    i_data.data = [];

    console.log(key);
    console.log(req.headers);

    if(req.headers['ifttt-channel-key']==key){
    console.log('1');
    request("https://data.sparkfun.com/output/n1rW4K9n1DuloGzNrW44/latest.json", {method: 'GET'}, function (err, response, body){
    console.log('2');
    //console.log(res.body);
    phantdata = JSON.parse(response.body);

        console.log(phantdata);
        for (var prop in phantdata[0]) {
        temp = {};
        temp.label = prop;
        temp.value = phantdata[0][prop];
        i_data.data.push(temp);
       }

     res.status(200).jsonp(i_data);
    });
    }

    else { // Invalid key

    console.log('invalid key');

    res.status(401).jsonp({"errors": [{ "message": "Something went wrong!" }]});
    }
});

module.exports = optionsRouter;
