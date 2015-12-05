var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  surveycontent: {type: String, required: true, trim: true},
  surveytitle: {type: String, required: true, trim: true},
  createdAt: {type: Date, default: Date.now}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});


var Post = mongoose.model('Post', schema);
module.exports = Post;
