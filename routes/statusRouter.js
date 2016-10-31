var express = require('express');

var statusRouter = express.Router(); //Mini application under express

var key = 'BN-j1xn_Wo9fyXsoGE2TkA_Wn_4Xm5fb3UlCSbgZo_abj3Xaff83sQCP0zFSrNaQ';

statusRouter.route('/')
.all(function(req,res,next){
  //res.writeHead(200,{ 'Content-Type': 'text/plain'});
  next();
})

.get(function(req,res,next){

  if(req.headers['ifttt-channel-key']==key){
  res.writeHead(200,{ 'Content-Type': 'text/plain'});
}
  else{
  res.writeHead(401,{ 'Content-Type': 'text/plain'});
}

console.log("TEST", req.headers);

res.end('IFTTT Test!');

});


module.exports = statusRouter;
