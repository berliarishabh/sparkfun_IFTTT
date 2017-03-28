var statusRouter = require('./routes/statusRouter');
var setupRouter = require('./routes/setupRouter');
var triggerRouter = require('./routes/triggerRouter');
var optionsRouter = require('./routes/optionsRouter');

var express = require('express'),
    http = require('http'),
    morgan = require('morgan'),   //Log intformation to server side
    bodyParser = require('body-parser');   //Log intformation to server side


var hostname = 'api.data.sparkfun.com';
var port = 80;

var app = express();              //The web application

app.use(bodyParser.json());//If the body of the incoming request message contains data in the form of JSON then parse it and saves it to another JS object req.body


app.use(morgan('dev'));           //That is the web app will use a middle-ware called morgan. 'dev' is one of the preformatted log outputs that morgan supports
                                  //It parses other types of data like forms etc

app.use('/ifttt/v1/status',statusRouter);        //If the user contains /status apply statusRouter application
app.use('/ifttt/v1/test/setup',setupRouter);
app.use('/ifttt/v1/triggers/new_data',triggerRouter);
app.use('/ifttt/v1/triggers/new_data/fields/value/options', optionsRouter);
//app.use('/', routes);


app.use(express.static(__dirname + '/public')); //Another middle-ware called serve static included in express
                                                //This means the public folder contains static files that the user can request from the server
app.listen(port, hostname, function(){

console.log('Server running at http://'+hostname+':'+port+'/');

});
