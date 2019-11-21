const mongoose = require('mongoose');

const userSchema = ({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  email: String,
  password:String,
  contactPhone: String,
  address: String,
  agency: Boolean,
  agencyReg: String,
  registrationDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
