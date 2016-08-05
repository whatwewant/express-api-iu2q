var express = require('express');
var mongoose = require('mongoose');

var multipart = require('connect-multiparty');
var cors = require('cors');

var pictureCloud = require('./src');

var port = process.env.PORT || 4000;

var app = express();

var DBURL = 'mongodb://localhost/picturecloud';
mongoose.connect(DBURL, function (err) {
  if (err) {
    console.error('Mongodb Connect Error.');
  }
});

app.use(cors());
app.use(multipart());
app.use(function (err, req, res, next) {
  if (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

app.use('/', pictureCloud({
  ACCESS_KEY: '<YOUR ACCESS KEY>',
  SECRET_KEY: '<YOUR SECRET KEY>',
  BUCKET: '<YOUR BUCKET NAME>',
  DOMAIN: '<YOUR DOMAIN>',
}));

app.listen(port, "127.0.0.1", function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Server start at port ' + port);
  }
});
