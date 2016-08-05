/*
 *  Application Setting
 * */

module.exports = {
  qiniu: {
    ACCESS_KEY: '<YOUR ACCESS KEY>',
    SECRET_KEY: '<YOUR SECRET KEY>',
    BUCKET: '<YOUR BUCKET>',
    DOMAIN: '<YOUR DOMAIN>'
  },
  limit: {
    types: [ 'png', 'jpg', 'gif', 'jpeg'],
    size: {
      min: 1,
      max: 4*1024*1024,
    },
  },
};

