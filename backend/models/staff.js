const mongoose = require('mongoose');

const staffSchema = mongoose.Schema({
  firstName: {type: String, require: true},
  lastName: {type: String, require: true},
  //add avatar
  office: {type: mongoose.Schema.Types.ObjectId, ref: 'Office', require: true}
});

staffSchema.post('save', function(doc, next) {
  const office = mongoose.model('Office');
  office.findByIdAndUpdate(doc.office._id, {$push: {"staff" : {_id: doc._id}}}).then(() => next());
});

module.exports = mongoose.model('Staff', staffSchema);
