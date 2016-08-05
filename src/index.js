var assert = require('assert');

var router = require('./route');

module.exports = function (conf) {
  assert.ok(typeof conf === 'object', 'Require Object: { ACCESS_KEY, SECRET_KEY, BUCKET, DOMAIN }');
  assert.ok(conf.hasOwnProperty('ACCESS_KEY'), 'Require Object: { ACCESS_KEY, SECRET_KEY, BUCKET, DOMAIN }');
  assert.ok(conf.hasOwnProperty('SECRET_KEY'), 'Require Object: { ACCESS_KEY, SECRET_KEY, BUCKET, DOMAIN }');
  assert.ok(conf.hasOwnProperty('BUCKET'), 'Require Object: { ACCESS_KEY, SECRET_KEY, BUCKET, DOMAIN }');
  assert.ok(conf.hasOwnProperty('DOMAIN'), 'Require Object: { ACCESS_KEY, SECRET_KEY, BUCKET, DOMAIN }');

  return router(conf);
};
