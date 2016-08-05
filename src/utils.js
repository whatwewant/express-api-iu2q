var qiniu = require('qiniu');
var path = require('path');
var crypto = require('crypto');

// var SETTING = require('./setting');
var DATE = `${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}`

// Object.assign(qiniu.conf, SETTING.qiniu);


function Md5() {}
Md5.prototype.encrypt = function (string) {
  return crypto.createHash('md5').update(string).digest('hex');
};
Md5.prototype.md5sum = Md5.prototype.encrypt;
Md5.prototype.compare = function (raw, encodedString) {
  return crypto.createHash('md5').update(string).digest('hex') === encodedString;
};
Md5.prototype.md5SumFile = function (filename, type, size) {
  return this.encrypt(`${filename};${type};${size}`);
};


function FileUpload (qiniu, key, filePath) {
  this.bucket = qiniu.conf.BUCKET;
  this.key = path.join(DATE, key);
  this.filePath = filePath;
}

FileUpload.prototype.setBucket = function (bucket) {
  this.bucket = bucket;
};

FileUpload.prototype.setKey = function (key) {
  this.key = path.join(DATE, key);
};

FileUpload.prototype.generateToken = function () {
  var putPolicy = new qiniu.rs.PutPolicy(this.bucket + ':' + this.key);
  return putPolicy.token();
};

FileUpload.prototype.upload = function (callback) {
  var extra = new qiniu.io.PutExtra();
  var token = this.generateToken();

  qiniu.io.putFile(token, this.key, this.filePath, extra, function (err, ret) {
    if (err) return callback(new Error('(' + err.code + ')' + err.error));
    callback(null, ret);
  });
};

module.exports = {
  Md5,
  FileUpload,
};
