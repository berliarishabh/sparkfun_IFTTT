var express = require('express');
var fs = require('fs');
var events = require('events');
var request = require('request');
var idgen = require('idgen');
var eventEmitter = new events.EventEmitter();

var triggerRouter = express.Router();

var keyi = 'BN-j1xn_Wo9fyXsoGE2TkA_Wn_4Xm5fb3UlCSbgZo_abj3Xaff83sQCP0zFSrNaQ';



triggerRouter.route('/')
  .all(function(req,res,next){
    next();
  })

  .post(function(req,res,next){

    console.log('POST');

    var phantdata = {}, i_data = {};
    i_data.data = [];

    console.log(keyi);
    console.log(req.headers);

    if(req.headers['ifttt-channel-key']==keyi){
    //      console.log('lalalalal');
    //      console.log(req.body.triggerFields.relationship);
    //      console.log(req.body.triggerFields.value);

        if(!(req.body.triggerFields && req.body.triggerFields.value && req.body.triggerFields.relationship)){

        res.status(400).jsonp({"errors": [{ "message": "Something went wrong!" }]});
    }

    else{
    request("https://data.sparkfun.com/output/n1rW4K9n1DuloGzNrW44.json", {method: 'GET'}, function (err, response, body){
        //console.log(res.body);
        phantdata = JSON.parse(response.body);
        var count=0;

        phantdata.forEach(function(d){
            temp = {};
            temp.value={};

            for (var prop in d) {
            // var key = prop;

            if (prop == 'timestamp')
            {
            temp[prop] = d[prop];}
            else {

            //  temp["value"]={};
            temp.value[prop]=d[prop];
            temp.value.id=idgen(12);

            }
            temp["meta"]={};
            temp["meta"].id=idgen(16);
            temp["meta"].timestamp=parseInt((Date.now()/1000))

            count++;
    }
          i_data.data.push(temp);
});

          i_data.data.sort(function(a,b){
          if (a.meta.timestamp > b.meta.timestamp) {
            return -1;
          } else if (a.meta.timestamp < b.meta.timestamp) {
            return 1;
          }

          return 0;
          });

//console.log(i_data);

//console.log('modified data');

//res.end(JSON.stringify(i_data));

          var limit = req.body.limit;

          res.status(200);

          switch(limit)
          {
            case 0:
              res.jsonp({"data": []});
            break;
            case 1:
              res.jsonp({"data": [i_data.data[0]]});
            break;
            default:
              res.jsonp(i_data);
          }

          });

    }
}
        else { // Invalid key

        console.log('invalid key');

        res.status(401).jsonp({"errors": [{ "message": "Something went wrong!" }]});

        }

});

module.exports = triggerRouter;
