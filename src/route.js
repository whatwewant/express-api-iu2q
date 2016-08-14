var router = require('express').Router();
var qiniu = require('qiniu');

var PictureFunc = require('./controller');

var multipart = require('connect-multiparty')


module.exports = function (conf) {
  Object.assign(qiniu.conf, conf);
  const Picture = PictureFunc(qiniu);

  router
    .route('/')
    .get(Picture.list)
    .post(
      Picture.createFileFilter,
      Picture.createFileSizeLimit,
      Picture.createFileTypeLimit,
      Picture.createFileExistFilter,
      Picture.create);

  router
    .route('/:id')
    .all(Picture.rudGetObject)
    .get(Picture.retrieve)
    .put(Picture.update)
    .delete(Picture.delete);

  return router;
}
