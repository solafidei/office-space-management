const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({
  firstName: {type: String, require: true},
  lastName: {type: String, require: true},
  //add avatar
  //office: {type: mongoose.Schema.Types.ObjectId, ref: 'Office', require: true}
});

module.exports = mongoose.model('Staff', staffSchema);
