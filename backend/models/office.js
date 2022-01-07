const mongoose = require('mongoose');

const officeSchema = mongoose.Schema({
  name: {type: String, required: true},
  address: {type: String, required: true},
  email: {type: String, required: true},
  phoneNumber: {type: String, required: true},
  maxCapacity: {type: Number, required: true},
  color: {type: String},
 staff: [{type: mongoose.Schema.Types.ObjectId, ref: 'Staff'}]
});
officeSchema.pre('deleteOne', function(next) {
  const staff = mongoose.model('Staff');
  staff.deleteMany({_id: {$in: this.staff}}).then(() => next());
});
/* officeSchema.virtual('staffPresent', {
  ref: 'Staff',
  localField: '_id',
  foreignField: 'office'
});

officeSchema.set('toObject', {virtuals: true});
officeSchema.set('toJSON', {virtuals: true});
 */
module.exports = mongoose.model('Office', officeSchema);
