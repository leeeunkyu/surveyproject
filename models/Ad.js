var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  password: {type: String},
  name: {type: String, required: true, trim: true},
}, {
  toJSON: { virtuals: true},
  toObject: {virtuals: true}
});

var Ad = mongoose.model('Ad', schema);

module.exports = Ad;
