/**/
var ImageSize = require('image-size');
var urljoin = require('url-join');

var PictureCloud = require('./model');

var { Md5, FileUpload } = require('./utils');

var SETTING = require('./setting');
var FILELIMIT = SETTING.limit;
var PREFIX = SETTING.PREFIX;

module.exports = function (qiniu) {
  Object.assign(FILELIMIT, qiniu.conf.limit);
  Object.assign(PREFIX, qiniu.conf.PREFIX);

  return {
    list: function (req, res, next) {
      var offset = +req.query.offset || 0;
      var count = +req.query.count || 10;

      PictureCloud
        .count({})
        .exec(function (err, total) {
          PictureCloud
            .find({})
            .skip(offset)
            .limit(count)
            // .select({ name: 1, url: 1, hash: 1 })
            .exec(function (err, pictures) {
              if (err) return next(err);

              res.json({
                offset,
                count: count > total ? total : count,
                total: total,
                data: pictures
              })
            });
        });
    },

    create: function (req, res, next) {
      var { originalFilename, name, path, type, size, md5 } = req.locals.file;

      new FileUpload(qiniu, md5, path, PREFIX).upload(function (err, ret) {
        if (err) return next(err);

        var { hash, key, persistentId } = ret;
        var { width, height } = ImageSize(path);
        PictureCloud
          .create({
            hash,
            persistentId,
            md5,

            name,
            // key,
            size,
            width,
            height,
            url: urljoin(qiniu.conf.DOMAIN, key),
          }, function (err, pc) {
            if (err) return next(err);

            // console.log(pc);
            res.json(pc)
          });
      });
    },

    retrieve: function (req, res, next) {
      var picture = req.locals.picture;

      res.json(picture);
    },

    update: function (req, res, next) {
      var picture = req.locals.picture;

      res.json(picture);
    },

    delete: function (req, res, next) {
      var picture = req.locals.picture;

      picture
        .remove(function (err) {
          if (err) return next();

          res.sendStatus(204);
        })
    },

    createFilesFilter: function (req, res, next) {
      req.locals = { file: req.files.file || req.files.smfile || req.files.file_data };
      if (! req.locals.file) return next(new Error('No Files'));

      next();
    },

    createFileSizeLimit: function (req, res, next) {
      const { name, size } = req.locals.file;
      
      if (size < FILELIMIT.size.min || size > FILELIMIT.size.max) {
        return res.status(403).json({
          errcode: 403,
          errmsg: `File ${name} size (${+parseInt(size/1024)})K limits in ${FILELIMIT.size.min}B - ${FILELIMIT.size.max/1024/1024}M.`,
        });
      }

      next();
    },

    createFileTypeLimit: function (req, res, next) {
      let { name, size, path, type } = req.locals.file;
      
      type = type.split('/')[1];
      if (! FILELIMIT.types.includes(type)) {
        return res.status(403).json({
          errcode: 403,
          errmsg: `File ${name} type(${type}) is not allowed. ( ${FILELIMIT.types} )`,
        });
      }

      next();
    },

    createFileExistFilter: function (req, res, next) {
      let { name, type, size } = req.locals.file;
      let md5 = new Md5().md5SumFile(name, type, size);

      PictureCloud
        .findOne({ md5 })
        .exec(function (err, pc) {
          if (err) return next(err);
          if (pc) {
            return res.json({
              name: name,
              url: pc.url,
            });
          } else {
            req.locals.file.md5 = md5;
            next();
          }
        });
    },

    rudGetObject: function (req, res, next) {
      var id = req.params.id;
      req.locals = {};
      
      PictureCloud
        .findOne({ _id: id })
        .exec(function (err, pc) {
          if (err) return next(err);
          if (! pc) return res.status(404).json({
            errcode: 404,
            errmsg: 'File Not Found',
          });

          req.locals.picture = pc;
          next();
        });
    },
  };
};  
