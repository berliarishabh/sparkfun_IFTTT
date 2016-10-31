var express = require('express');
var fs = require('fs');


var setupRouter = express.Router();

var key = 'BN-j1xn_Wo9fyXsoGE2TkA_Wn_4Xm5fb3UlCSbgZo_abj3Xaff83sQCP0zFSrNaQ';
var jsonFile = './ifttt.json'

setupRouter.route('/')
.all(function(req,res,next){
//  res.writeHead(200,{ 'Content-Type': 'text/plain'});
  next();
})

.post(function(req,res,next){

if(req.headers['ifttt-channel-key']==key){
    var jsonData;
          console.log('B');

    fs.readFile(jsonFile, 'utf8', function (err, data) {
      if (err)
      {
          console.log('C');

         throw err;
      }
      jsonData = JSON.parse(data);
    })
//console.log('D');

  res.writeHead(200,{ 'Content-Type': 'application/json; charset=utf-8' });
//console.log('E');
  console.log(jsonData);
 // res.end(JSON.stringify(jsonData, null, 3));
  res.end(JSON.stringify({
  "data": {
    "samples": {
  "triggers": {
        "new_data": {
          "value": "fields",
          "relationship": "rel"
        }

      }
    }
  }
  }, null, 3));
  }

else{
  res.writeHead(401,{'Content-Type': 'text/plain'});
}

console.log("TEST_2", req.headers);

res.end('IFTTT Test_2!');

});



module.exports = setupRouter;
