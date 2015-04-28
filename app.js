var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var stylus = require('stylus');
var nib = require('nib');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// view engine setup; sets it to use jade to display html
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .use(nib())
}

app.use(stylus.middleware(
  { src: __dirname + '/public'
  , compile: compile
  }
))

app.get('/', function (req, res) {
  res.render('index', {});
});

app.get('/darby', function (req, res) {
  res.send('Darby poops!');
});

app.get('/darby/eric', function (req, res) {
  res.send('A lot of information');
});

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
