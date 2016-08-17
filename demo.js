var express = require('express');
var mongoose = require('mongoose');

var multipart = require('connect-multiparty');
var cors = require('cors');

var pictureCloud = require('./src');

var port = process.env.PORT || 4000;

var app = express();
app.set('view engine', 'ejs');
app.set('views', './publics');

var DBURL = 'mongodb://localhost/picturecloud';
mongoose.connect(DBURL, function (err) {
  if (err) {
    console.error('Mongodb Connect Error.');
  }
});

app.use(cors({
  allowedOrigins: [
    'example.com',
    '*.example.com'
  ]
}));
app.use(multipart());
app.use(function (err, req, res, next) {
  if (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

app.get('/', function (req, res) {
  res.render('index', {});
});

app.get('/v1/image', function (req, res, next) {
    return res.sendStatus(403);
});

app.use('/v1/image', pictureCloud({
  ACCESS_KEY: '<YOUR ACCESS KEY>',
  SECRET_KEY: '<YOUR SECRET KEY>',
  BUCKET: '<YOUR BUCKET NAME>',
  DOMAIN: '<YOUR DOMAIN>',
  PREFIX: 'image-saving',
  limit: {
    types: ['png', 'gif', 'jpeg', 'jpg', 'svg+xml'],
    size: {
      min: 0,
      max: 100 * 1024 * 1024,
    }
  }
}));

app.use(function (req, res, next) {
    res.sendStatus(404);
});

app.listen(port, "127.0.0.1", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Server start at port ' + port);
  }
});
