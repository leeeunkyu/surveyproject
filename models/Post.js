var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  surveycontent: {type: String, required: true, trim: true},
  surveytitle: {type: String, required: true, trim: true},
  surveycontent2: {type: String},
  surveycontent3: {type: String},
  surveycontent4: {type: String},
  surveycontent5: {type: String},
  surveycontent6: {type: String},
  surveytitle2: {type: String, required: true, trim: true},
  createdAt: {type: Date, default: Date.now},
  read: {type: Number, default: 0},
  count1: {type: Number, default: 0},
  count2: {type: Number, default: 0},
  count3: {type: Number, default: 0},
  count4: {type: Number, default: 0},
  count5: {type: Number, default: 0},
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});


var Post = mongoose.model('Post', schema);
module.exports = Post;
