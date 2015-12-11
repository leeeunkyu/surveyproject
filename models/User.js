var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  email: {type: String, required: true, trim: true},
  password: {type: String},
  name: {type: String, required: true, trim: true},
  createdAt: {type: Date, default: Date.now},
  facebook: {id: String, token: String, photo: String}
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var User = mongoose.model('User', schema);

module.exports = User;
