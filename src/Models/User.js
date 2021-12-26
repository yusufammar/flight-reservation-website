const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true
  },
  Password: {
    type: String,
    required: true
  },
  Type: {
    type: String,
    required: true,
  },
  Nationality: {
    type: String,
    required: true,
  },
  PassportNo: {
    type: Number,
    required: true,
  },
  Address: {
    type: String,
    required: true,
  },
  PhoneNo: {
    type: Number,
    required: true,
  }
 
}, { timestamps: false });

const User = mongoose.model('users', userSchema);  
module.exports = User;