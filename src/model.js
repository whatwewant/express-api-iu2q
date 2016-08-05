var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var urljoin = require('url-join');

var Picture = new Schema({
  // owner: { type: ObjectId, ref: 'User' },
  // bucket: { type: String },
  hash: { type: String },
  persistendId: { type: String },
  md5: { type: String },

  // prefix: { type: String, match: /^http[s]{0,1}:\/\// },
  name: { type: String, required: true },
  // key: { type: String, required: true },
  size: { type: Number },
  width: { type: Number },
  height: { type: Number },
  url: { type: String },
}, {
  timestamps: true,
  strict: true,
  // toJSON: { virtuals: true },
}); 


module.exports = mongoose.model('PictureCloud', Picture);
