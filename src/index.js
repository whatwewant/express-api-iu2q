var assert = require('assert');

var router = require('./route');

module.exports = function (conf) {
  assert.ok(typeof conf === 'object', 'Require Object: { ACCESS_KEY, SECRET_KEY, BUCKET, DOMAIN }');

  assert.ok(conf.hasOwnProperty('ACCESS_KEY'), 'Require Object: { ACCESS_KEY, SECRET_KEY, BUCKET, DOMAIN }');
  assert.ok(conf.hasOwnProperty('SECRET_KEY'), 'Require Object: { ACCESS_KEY, SECRET_KEY, BUCKET, DOMAIN }');
  assert.ok(conf.hasOwnProperty('BUCKET'), 'Require Object: { ACCESS_KEY, SECRET_KEY, BUCKET, DOMAIN }');
  assert.ok(conf.hasOwnProperty('DOMAIN'), 'Require Object: { ACCESS_KEY, SECRET_KEY, BUCKET, DOMAIN }');

  assert.ok(conf.ACCESS_KEY !== '<YOUR ACCESS KEY>', 'Require Object: { ACCESS_KEY, SECRET_KEY, BUCKET, DOMAIN }');
  assert.ok(conf.SECRET_KEY !== '<YOUR SECRET KEY>', 'Require Object: { ACCESS_KEY, SECRET_KEY, BUCKET, DOMAIN }');
  assert.ok(conf.BUCKET !== '<YOUR BUCKET NAME>', 'Require Object: { ACCESS_KEY, SECRET_KEY, BUCKET, DOMAIN }');
  assert.ok(conf.DOMAIN !== '<YOUR DOMAIN>', 'Require Object: { ACCESS_KEY, SECRET_KEY, BUCKET, DOMAIN }');

  return router(conf);
};
